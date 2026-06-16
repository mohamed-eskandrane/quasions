document.addEventListener("DOMContentLoaded", () => {
  const arLang = document.querySelector('.ins-header__language-link--active[aria-label="AR"]');
  arLang ?  document.body.classList.add("lang-ar") : document.body.classList.add("lang-en");
  const footerElement = document.querySelector('footer');
  if (footerElement) {
    fetch('https://alkhalijr.com/footer_div')
      .then(response => response.text())
      .then(html => {
        footerElement.insertAdjacentHTML('beforebegin', html);
        const addedContent = document.querySelector('#tile-location-Wtm2BK .ins-tile__animated');
        if (addedContent) {
          const iframe = `<div aria-label="Map with a location pin" role="img" class="ins-tile__map ins-tile__animated"><div class="ins-tile__map-frame-wrapper ins-iframe-overlay"><iframe allowfullscreen="" loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;maptype=roadmap&amp;q=%D8%A7%D9%84%D8%AE%D9%84%D9%8A%D8%AC+%D8%A7%D9%84%D8%B1%D8%A7%D8%A6%D8%AF%D8%A9+%2C+%D9%85%D8%B3%D9%82%D8%B7" aria-label="الموقع على خرائط جوجل" title="الموقع على خرائط جوجل" class="ins-tile__map-frame"></iframe><!----></div></div>`;
          addedContent.insertAdjacentHTML('beforeend', iframe);
        }
  const el2=document.querySelector(".ins-tile__row-inner.ins-component__social-profiles")
if(el2){
  const el =`<div class="social-profile__icon-wrapper w-fit"><a href="https://x.com/alkalijom/" title="X (former Twitter)" aria-label="X (former Twitter)" target="_blank" class="ins-tile__icon ins-tile__icon--plain"><svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M19.269 13.62 29.714 2h-4.571l-7.977 8.867L10.286 2H0l11.634 15.05L0 30h4.571l9.189-10.243L21.714 30H32L19.269 13.62Zm-13.6-8.843H8.96L26.331 27.27H23.04L5.669 4.777Z" fill="currentColor"></path></svg><!----><!----><!----><!----></a></div>`
 el2.insertAdjacentHTML("beforeend", el);
  }
         showqu();
})
      .catch(error => console.error(error));

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
