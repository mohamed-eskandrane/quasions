 window["mydata"] =[
    { "question": "ما هي مدة صلاحية الباقة الأساسية؟", "answer": "30 يومًا من تاريخ التفعيل." },
    { "question": "هل الدعم الفني شامل؟", "answer": "نعم، عبر التذاكر والدردشة." },
    { "question": "كيف أسترد المبلغ؟", "answer": "خلال 14 يومًا من الشراء." }
];
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
      })
      .catch(error => console.error(error));
      }
function updatload(timep) {
  setTimeout(() => {
       var cou = document.querySelector('select[aria-label="عدد المصاحف :"]');
       var cun = document.querySelector('select[aria-label="اختر مكان التوزيع :"]');
       if(cou) var couAr= String(cou.value).split("/"); 
		var tex = document.querySelector(".details-product-option--textarea");
        if(tex){
        parseInt(couAr[1])<10 ? tex.style.display="none" : tex.style.display="block";
        }
        var opts = document.getElementsByClassName("details-product-option--select")
        if(cun && opts){
        if(cun.value=="اسيا"){
        opts[2].style.display="block";
        opts[3].style.display="none";
        }else if(cun.value=="افريقيا"){
        opts[3].style.display="block";
        opts[2].style.display="none"
        }else{
        opts[2].style.display="none";
        opts[3].style.display="none";
        }
        }

  }, timep);
 }
  const observer = new MutationObserver(function(mutations) {
      updatload(100);
  });
  observer.observe(document.body, { childList: true, subtree: true });
    updatload(100);
});
