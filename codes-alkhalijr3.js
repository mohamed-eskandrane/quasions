document.addEventListener("DOMContentLoaded", () => {
  const arLang = document.querySelector('.ins-header__language-link--active[aria-label="AR"]');
  arLang ?  document.body.classList.add("lang-ar") : document.body.classList.add("lang-en");
  const iframe = `<div aria-label="Map with a location pin" role="img" class="ins-tile__map ins-tile__animated"><div class="ins-tile__map-frame-wrapper ins-iframe-overlay"><iframe allowfullscreen="" loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;maptype=roadmap&amp;q=%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC+%D8%A7%D9%84%D8%B1%D8%A7%D8%A6%D8%AF%D8%A9+%2C+%D9%85%D8%B3%D9%82%D8%B7" aria-label="الموقع على خرائط جوجل" title="الموقع على خرائط جوجل" class="ins-tile__map-frame"></iframe><!----></div></div>`;
  const el =`<div class="social-profile__icon-wrapper w-fit"><a href="https://x.com/alkalijom/" title="X (former Twitter)" aria-label="X (former Twitter)" target="_blank" class="ins-tile__icon ins-tile__icon--plain"><svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M19.269 13.62 29.714 2h-4.571l-7.977 8.867L10.286 2H0l11.634 15.05L0 30h4.571l9.189-10.243L21.714 30H32L19.269 13.62Zm-13.6-8.843H8.96L26.331 27.27H23.04L5.669 4.777Z" fill="currentColor"></path></svg><!----><!----><!----><!----></a></div>`
  const FOOTER_HTML_URL = 'https://alkhalijr.com/footer_div';
  const CHECK_INTERVAL = 500;                // نصف ثانية
  const MAX_DURATION_MS = 5 * 60 * 1000;     // 5 دقائق كحد أقصى
  const EXTRA_WATCH_DURATION_MS = 60 * 1000; // دقيقة إضافية بعد أول ظهور
  const TARGET_SELECTOR = '#tile-location-Wtm2BK';

  let cachedHtml = null;
  let startTime = Date.now();
  let foundOnce = false;
  let foundStartTime = null;
  let intervalId = null;

  // ---------- دالة آمنة لإدراج المحتوى (تتجنب الخطأ) ----------
  function insertFooterContent(footerElement) {
    if (!footerElement) {
      console.warn('[Ecwid Fix] footerElement غير موجود، لا يمكن الإدراج.');
      return false;
    }

    if (cachedHtml === null) {
      console.warn('[Ecwid Fix] لا يوجد محتوى مخزن، لا يمكن الإدراج.');
      return false;
    }

    // تجنب الإدراج المزدوج (تحقق سريع)
    if (document.querySelector(TARGET_SELECTOR)) {
      return true; // موجود بالفعل
    }

    // **الجزء الأهم**: نتحقق من وجود الأب
    const parent = footerElement.parentNode;
    if (!parent) {
      console.warn('[Ecwid Fix] footerElement ليس له أب (مفصول عن DOM)، لن نتمكن من الإدراج.');
      return false;
    }

    try {
      // الطريقة الآمنة: الإدراج قبل الـ footer مباشرة باستخدام الأب
      // نحول HTML إلى عناصر فعلية
      const tempContainer = document.createElement('div');
      tempContainer.innerHTML = cachedHtml;

      // ننقل جميع أبناء tempContainer ليصبحوا قبل footerElement
      while (tempContainer.firstChild) {
        parent.insertBefore(tempContainer.firstChild, footerElement);
      }

      console.log('[Ecwid Fix] تم إدراج HTML الأساسي بنجاح (باستخدام insertBefore).');
    } catch (error) {
      console.error('[Ecwid Fix] فشل إدراج المحتوى:', error);
      return false;
    }

    // محاولة إضافة الخريطة داخل العنصر الداخلي
    const addedContent = document.querySelector(TARGET_SELECTOR + ' .ins-tile__body.ins-tile__animated');
    if (addedContent) {
      addedContent.insertAdjacentHTML('afterbegin', iframe);
        const el2=document.querySelector(".ins-tile__row-inner.ins-component__social-profiles")
    if(el2){
     el2.insertAdjacentHTML("beforeend", el);
    }
      showqu();
      console.log('[Ecwid Fix] ✅ تم إدراج الخريطة.');
    } else {
      console.warn('[Ecwid Fix] تم إدراج HTML لكن لم نجد العنصر الداخلي .ins-tile__animated');
    }

    return true;
  }

  // ---------- الدالة الأساسية التي تُنفذ كل فترة ----------
  function tryAddFooter() {
    const elapsed = Date.now() - startTime;

    // 1. التحقق من انتهاء المدة القصوى (5 دقائق)
    if (elapsed >= MAX_DURATION_MS) {
      console.warn('[Ecwid Fix] ⏹️ انتهت المدة القصوى (5 دقائق)، توقف.');
      clearInterval(intervalId);
      return;
    }

    const existingTarget = document.querySelector(TARGET_SELECTOR);
    const footerElement = document.querySelector('footer');

    // 2. حالة الظهور لأول مرة
    if (existingTarget && !foundOnce) {
      foundOnce = true;
      foundStartTime = Date.now();
      console.log('[Ecwid Fix] ✅ العنصر ظهر لأول مرة. بدء المراقبة الإضافية لمدة دقيقة.');
      // نستمر في المراقبة (لا نوقف)
      return;
    }

    // 3. مرحلة ما بعد الظهور الأول (foundOnce === true)
    if (foundOnce) {
      // انتهت الدقيقة الإضافية؟
      if (Date.now() - foundStartTime >= EXTRA_WATCH_DURATION_MS) {
        console.log('[Ecwid Fix] ⏹️ انتهت الدقيقة الإضافية. توقف نهائياً.');
        clearInterval(intervalId);
        return;
      }

      // إذا كان العنصر موجوداً الآن، نتركه
      if (existingTarget) {
        console.log('[Ecwid Fix] العنصر موجود حالياً، لا حاجة للإدراج.');
        return;
      }

      // العنصر اختفى → نحاول إعادة إدراجه
      console.warn('[Ecwid Fix] العنصر اختفى! نحاول إعادة إدراجه...');
      if (footerElement) {
        insertFooterContent(footerElement);
      } else {
        console.warn('[Ecwid Fix] footer غير موجود حالياً، لا يمكن إعادة الإدراج.');
      }
      return;
    }

    // 4. لم نجد العنصر ولم نره من قبل (foundOnce === false)
    if (!footerElement) {
      console.log('[Ecwid Fix] ⏳ footer غير موجود، انتظر الدورة القادمة.');
      return;
    }

    // نحتاج إلى جلب المحتوى (إن لم يكن مخزناً)
    if (cachedHtml === null) {
      console.log('[Ecwid Fix] جلب المحتوى من الخادم لأول مرة...');
      fetch(FOOTER_HTML_URL)
        .then(response => {
          if (!response.ok) throw new Error(`HTTP ${response.status}`);
          return response.text();
        })
        .then(html => {
          cachedHtml = html;
          insertFooterContent(footerElement);
        })
        .catch(error => {
          console.error('[Ecwid Fix] خطأ في الجلب:', error);
        });
    } else {
      // لدينا محتوى مخزن، نضيفه مباشرة
      insertFooterContent(footerElement);
    }
  }

  // ---------- بدء التشغيل ----------
  intervalId = setInterval(tryAddFooter, CHECK_INTERVAL);
  tryAddFooter(); // تنفيذ المحاولة الأولى فو
      
function waitForElement(selector, callback, timeout = 15000) {
  const startTime = Date.now();
  const interval = setInterval(() => {
    const element = document.querySelector(selector);
    if (element) {
      clearInterval(interval);
      callback(element);
    } else if (Date.now() - startTime > timeout) {
      clearInterval(interval);
      console.error(`Timeout: لم يتم العثور على العنصر ${selector}`);
    }
  }, 200);
}

 function showqu(){
         var proN =document.querySelector('h1.product-details__product-title')
        waitForElement('h1.product-details__product-title', (proN) => {
        const productName = proN.textContent.trim();
  if (mydata && Array.isArray(mydata) && mydata.length) {
  const filteredData = mydata.filter(item => item.package === productName);
    const faqContainer = document.querySelector('.ins-accordion.ins-accordion--with-margin');
    faqContainer.innerHTML = '';
    if (filteredData.length > 0 && faqContainer) {
        filteredData.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        const questionEl = document.createElement('h3');
        questionEl.textContent = `${index + 1}. ${item.question}`;
        questionEl.className = 'question';
        const answerEl = document.createElement('p');
        answerEl.textContent = item.answer;
        answerEl.style.display = 'none';
        answerEl.className = 'answer';
        questionEl.addEventListener('click', (e) => {
          e.stopPropagation();
          const isHidden = answerEl.style.display === 'none';
          answerEl.style.display = isHidden ? 'block' : 'none';
          isHidden ? questionEl.classList.add('open') :questionEl.classList.remove('open');
        });
        faqItem.appendChild(questionEl);
        faqItem.appendChild(answerEl);
        faqContainer.appendChild(faqItem);
      });
    }
  } 

document.querySelector('#tile-feature-list-BzyZWZ .ins-tile__wrap.ins-tile__animated').style.display="block";
})}
 function observeProductTitleChange() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };
  let lastProductName = '';
  const observer = new MutationObserver(() => {
    const titleEl = document.querySelector('h1.product-details__product-title');
    if (titleEl) {
      const currentName = titleEl.textContent.trim();
      if (currentName !== lastProductName) {
        lastProductName = currentName;
        showqu();
      }
    }
  });
  
  observer.observe(targetNode, config);
  showqu();
  return observer;
}
   observeProductTitleChange();
})
