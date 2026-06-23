document.addEventListener("DOMContentLoaded", () => {
  const arLang = document.querySelector('.ins-header__language-link--active[aria-label="AR"]');
  arLang ?  document.body.classList.add("lang-ar") : document.body.classList.add("lang-en");
  const footerElement = document.querySelector('footer');
 if (footerElement) {
  const iframe = `<div aria-label="Map with a location pin" role="img" class="ins-tile__map ins-tile__animated"><div class="ins-tile__map-frame-wrapper ins-iframe-overlay"><iframe allowfullscreen="" loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;maptype=roadmap&amp;q=HCVH%2B6V+Muscat%2C+Oman" class="ins-tile__map-frame"></iframe></div></div>`;
  const FOOTER_HTML_URL = 'https://aouenshop.com/footer_div';
  const CHECK_INTERVAL = 500;                // نصف ثانية بين كل فحص
  const MAX_DURATION_MS = 5 * 60 * 1000;     // 5 دقائق كحد أقصى كلي
  const EXTRA_WATCH_DURATION_MS = 60 * 1000; // دقيقة إضافية بعد أول ظهور
  const TARGET_SELECTOR = '#tile-location-mVM3dX';
  let cachedHtml = null;          // المحتوى المُجلَب (لتجنب طلبات شبكة متكررة)
  let startTime = Date.now();     // وقت بدء المحاولات
  let foundOnce = false;          // هل تم العثور على العنصر ولو مرة؟
  let foundStartTime = null;      // وقت أول ظهور للعنصر
  let intervalId = null;
  function insertFooterContent(footerElement) {
    if (cachedHtml === null) {
      console.warn('[Ecwid Fix] لا يوجد محتوى مخزن، لا يمكن الإدراج.');
      return false;
    }
    if (document.querySelector(TARGET_SELECTOR)) {
      return true; // موجود بالفعل
    }
    footerElement.insertAdjacentHTML('beforebegin', cachedHtml);
    console.log('[Ecwid Fix] تم إدراج HTML الأساسي (لأن العنصر اختفى).');
    const addedContent = document.querySelector(TARGET_SELECTOR + ' .ins-tile__animated');
    if (addedContent) {
      addedContent.insertAdjacentHTML('afterbegin', iframe);
      console.log('[Ecwid Fix] ✅ تم إعادة إدراج الخريطة.');
      showqu();
    } else {
      console.warn('[Ecwid Fix] تم إدراج HTML لكن لم نجد العنصر الداخلي .ins-tile__animated');
    }
    return true;
  }
  function tryAddFooter() {
    const elapsed = Date.now() - startTime;
    if (elapsed >= MAX_DURATION_MS) {
      console.warn('[Ecwid Fix] ⏹️ انتهت المدة القصوى (5 دقائق)، توقف.');
      clearInterval(intervalId);
      return;
    }

    const existingTarget = document.querySelector(TARGET_SELECTOR);
    if (existingTarget && !foundOnce) {
      foundOnce = true;
      foundStartTime = Date.now();
      console.log('[Ecwid Fix] ✅ العنصر ظهر لأول مرة. بدء المراقبة الإضافية لمدة دقيقة.');
      return;
    }
    if (foundOnce) {
      if (Date.now() - foundStartTime >= EXTRA_WATCH_DURATION_MS) {
        console.log('[Ecwid Fix] ⏹️ انتهت الدقيقة الإضافية بعد أول ظهور. توقف نهائياً.');
        clearInterval(intervalId);
        return;
      }
      if (existingTarget) {
        console.log('[Ecwid Fix] العنصر موجود حالياً، ننتظر...');
        return;
      }
      console.warn('[Ecwid Fix] العنصر اختفى! نحاول إعادة إدراجه...');
      if (footerElement) {
        insertFooterContent(footerElement);
      } else {
        console.warn('[Ecwid Fix] footer غير موجود حالياً، لا يمكن إعادة الإدراج.');
      }
      return;
    }
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
      insertFooterContent(footerElement);
    }
  }

  intervalId = setInterval(tryAddFooter, CHECK_INTERVAL);
  tryAddFooter(); // تشغيل المحاولة الأولى فوراً
  intervalId = setInterval(tryAddFooter, CHECK_INTERVAL);
  tryAddFooter();
  } 
  
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
    const faqContainer = document.querySelector('.ins-accordion');
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

document.querySelector('#tile-feature-list-2gGUwN .ins-tile__wrap.ins-tile__animated').style.display="block";
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
