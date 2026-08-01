'use strict';
(() => {
  const VERSION='87';

  const addPaidOption=()=>{
    const select=document.getElementById('ownerStatus');
    if(!select||select.dataset.paidStatusVersion===VERSION)return;

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
  };

  const observer=new MutationObserver(addPaidOption);
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('arborwise:data-ready',()=>setTimeout(addPaidOption,0));
  addPaidOption();
  setTimeout(addPaidOption,500);
  setTimeout(addPaidOption,1600);
})();
