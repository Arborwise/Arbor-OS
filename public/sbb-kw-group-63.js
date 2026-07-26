'use strict';
(() => {
  const UI_KEY='arborwise-board-ui-v57';
  let observer=null;
  let groupBar=null;
  let queued=false;

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
      if(category==='KANAM')record.managementGroup='KANAM';
    });
  }

  function normalizeSavedGroup(){
    try{
      const saved=JSON.parse(localStorage.getItem(UI_KEY)||'{}');
      if(String(saved.group||'').toUpperCase()==='KW'){
        saved.group='SBB';
        localStorage.setItem(UI_KEY,JSON.stringify(saved));
      }
    }catch{}
  }

  function correctButtons(){
    groupBar=document.getElementById('groupFilters54');
    if(!groupBar)return;
    observer?.disconnect();
    groupBar.querySelectorAll('button').forEach(button=>{
      const value=String(button.dataset.group||'').toUpperCase();
      const label=String(button.textContent||'').trim().toUpperCase();
      if(value==='KW'||label==='KW'){
        button.remove();
        return;
      }
      if(value==='SBB'&&button.textContent!=='SBB MANAGEMENT')button.textContent='SBB MANAGEMENT';
      if(value==='KANAM'&&button.textContent!=='KANAM')button.textContent='KANAM';
    });
    observer?.observe(groupBar,{childList:true,subtree:true});
  }

  function apply(){
    normalizeSavedGroup();
    normalizeRecords();
    correctButtons();
  }

  function queueApply(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      apply();
    });
  }

  const start=()=>{
    observer=new MutationObserver(queueApply);
    apply();
  };

  window.addEventListener('arborwise:data-ready',queueApply);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
