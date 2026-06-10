document.addEventListener("DOMContentLoaded", () => {
  const arLang = document.querySelector('.ins-header__language-link--active[aria-label="AR"]');
  arLang ?  document.body.classList.add("lang-ar") : document.body.classList.add("lang-en");
  const footerElement = document.querySelector('footer');
  if (footerElement) {
    fetch('https://tebianprinting.com/footer_div')
      .then(response => response.text())
      .then(html => {
        footerElement.insertAdjacentHTML('beforebegin', html);
        const addedContent = document.querySelector('#tile-location-BmLJgM .ins-tile__animated');
        if (addedContent) {
          const iframe = `<div aria-label="Map with a location pin" role="img" class="ins-tile__map ins-tile__animated"><div class="ins-tile__map-frame-wrapper ins-iframe-overlay"><iframe allowfullscreen="" loading="lazy" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCNCmAGyN4bJYu5qeLgbASzZafm-M5TA_o&amp;language=en&amp;zoom=16&amp;maptype=roadmap&amp;q=%D8%AA%D8%A8%D9%8A%D8%A7%D9%86+%D9%84%D9%84%D8%AA%D8%B4%D8%B1+%D9%88%D8%A7%D9%84%D8%AA%D9%88%D8%B2%D9%8A%D8%B9+-+%D8%B9%D9%85%D8%A7%D9%86%0A" class="ins-tile__map-frame"></iframe></div></div>`;
          addedContent.insertAdjacentHTML('afterbegin', iframe);
        }
        showqu();
})
      .catch(error => console.error(error));
      }
      
function waitForElement(selector, callback, timeout = 10000) {
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
    if (filteredData.length > 0 && faqContainer) {
      faqContainer.innerHTML = '';
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

document.querySelector('#tile-feature-list-tXtiuZ .ins-tile__wrap.ins-tile__animated').style.display="block";
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
})
