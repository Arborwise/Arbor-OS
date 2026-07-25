'use strict';
(() => {
  const UI_KEY='arborwise-board-ui-v57';

  function normalizeRecords(){
    const records=window.ARBORWISE_CURRENT_OPERATIONS?.records;
    if(!Array.isArray(records))return;
    records.forEach(record=>{
      const category=String(record.category||'').trim().toUpperCase();
      const crew=String(record.who||'').trim().toUpperCase();
      const sourceText=`${record.name||''} ${record.address||''} ${record.notes||''}`.toUpperCase();
      if(category==='KW'||crew.includes('KW LANDSCAPING')||sourceText.includes('KW LANDSCAPING')){
        record.category='SBB';
        record.managementGroup='SBB Management';
        record.subcontractor='KW Landscaping';
      }
      if(category==='CONDOM'||String(record.managementGroup||'').toUpperCase()==='CONDOM'){
        record.category='KANAM';
        record.managementGroup='KANAM';
      }
    });
  }

  function normalizeSavedGroup(){
    try{
      const saved=JSON.parse(localStorage.getItem(UI_KEY)||'{}');
      const group=String(saved.group||'').toUpperCase();
      if(group==='KW')saved.group='SBB';
      if(group==='CONDOM')saved.group='KANAM';
      localStorage.setItem(UI_KEY,JSON.stringify(saved));
    }catch{}
  }

  function correctButtons(){
    const groupBar=document.getElementById('groupFilters54');
    if(!groupBar)return;
    groupBar.querySelectorAll('button').forEach(button=>{
      const value=String(button.dataset.group||'').toUpperCase();
      const label=String(button.textContent||'').trim().toUpperCase();
      if(value==='KW'||label==='KW')button.remove();
      if(value==='CONDOM'||label==='CONDOM'){
        button.dataset.group='KANAM';
        button.textContent='KANAM';
      }
      if(value==='SBB')button.textContent='SBB MANAGEMENT';
    });
  }

  function apply(){
    normalizeSavedGroup();
    normalizeRecords();
    correctButtons();
  }

  window.addEventListener('arborwise:data-ready',apply);
  const observer=new MutationObserver(correctButtons);
  const start=()=>{
    apply();
    const groupBar=document.getElementById('groupFilters54');
    if(groupBar)observer.observe(groupBar,{childList:true,subtree:true,characterData:true});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
