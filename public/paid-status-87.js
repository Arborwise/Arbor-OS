'use strict';
(() => {
  const VERSION='88';
  const STYLE_ID='arborwise-paid-status-88';

  if(!document.getElementById(STYLE_ID)){
    const style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=`
      #main > article.card.paid{
        opacity:1!important;
        filter:none!important;
        background:#e0f3e5!important;
        border-color:#72a37e!important;
      }
      #main > article.card.paid:before{background:#1f6d3a!important}
      .pills .pill.paid{background:#cce8d3!important;color:#14582c!important}
    `;
    document.head.appendChild(style);
  }

  const addPaidOption=()=>{
    const select=document.getElementById('ownerStatus');
    if(select&&select.dataset.paidStatusVersion!==VERSION){
      const options=[...select.options];
      if(!options.some(option=>option.value==='Paid')){
        const paid=document.createElement('option');
        paid.value='Paid';
        paid.textContent='Paid';
        const completed=options.find(option=>option.value==='Completed');
        if(completed)completed.insertAdjacentElement('afterend',paid);
        else select.appendChild(paid);
      }
      select.dataset.paidStatusVersion=VERSION;
    }

    document.querySelectorAll('#main > article.card').forEach(card=>{
      card.classList.toggle('paid',Boolean(card.querySelector('.pill.paid')));
    });
  };

  const observer=new MutationObserver(addPaidOption);
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('arborwise:data-ready',()=>setTimeout(addPaidOption,0));
  addPaidOption();
  setTimeout(addPaidOption,500);
  setTimeout(addPaidOption,1600);
})();
