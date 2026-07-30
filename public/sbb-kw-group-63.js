'use strict';
(() => {
  const VERSION='72';
  const UI_KEY='arborwise-board-ui-v57';
  const OPTIONS=[
    ['ALL','ALL CUSTOMERS'],
    ['RESIDENTIAL','RESIDENTIAL / HOMEOWNERS'],
    ['SBB','SBB MANAGEMENT'],
    ['GOODWIN','GOODWIN'],
    ['KANAM','KANAM']
  ];
  let observer=null;
  let groupBar=null;
  let queued=false;

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

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
      if(category==='GOODWIN')record.managementGroup='GOODWIN';
      if(category==='KANAM')record.managementGroup='KANAM';
    });
  }

  function savedGroup(){
    try{
      const saved=JSON.parse(localStorage.getItem(UI_KEY)||'{}');
      const value=String(saved.group||'ALL').toUpperCase();
      if(value==='KW'){
        saved.group='SBB';
        localStorage.setItem(UI_KEY,JSON.stringify(saved));
        return 'SBB';
      }
      return OPTIONS.some(([option])=>option===value)?value:'ALL';
    }catch{return 'ALL';}
  }

  function closeMenu(){
    const menu=groupBar?.querySelector('.managementGroupMenu72');
    const trigger=groupBar?.querySelector('.managementGroupTrigger72');
    if(menu)menu.hidden=true;
    if(trigger)trigger.setAttribute('aria-expanded','false');
  }

  function buildDropdown(originalButtons){
    const selected=savedGroup();
    const selectedLabel=OPTIONS.find(([value])=>value===selected)?.[1]||'ALL CUSTOMERS';
    const control=document.createElement('div');
    control.className='managementGroupControl72';
    control.dataset.managementGroupControl=VERSION;
    control.innerHTML=`
      <button class="managementGroupTrigger72" type="button" aria-haspopup="true" aria-expanded="false">
        <span>MANAGEMENT GROUPS</span><small>${esc(selectedLabel)}</small><b aria-hidden="true">▾</b>
      </button>
      <div class="managementGroupMenu72" role="menu" hidden>
        ${OPTIONS.map(([value,label])=>`<button type="button" role="menuitemradio" aria-checked="${selected===value?'true':'false'}" data-management-choice="${value}">${esc(label)}</button>`).join('')}
      </div>`;

    const trigger=control.querySelector('.managementGroupTrigger72');
    const menu=control.querySelector('.managementGroupMenu72');
    trigger.onclick=event=>{
      event.preventDefault();
      event.stopPropagation();
      const opening=menu.hidden;
      menu.hidden=!opening;
      trigger.setAttribute('aria-expanded',String(opening));
    };
    control.querySelectorAll('[data-management-choice]').forEach(option=>{
      option.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        const value=option.dataset.managementChoice;
        const target=originalButtons.find(button=>String(button.dataset.group||'').toUpperCase()===value);
        closeMenu();
        if(target)target.click();
        setTimeout(queueApply,0);
      };
    });
    return control;
  }

  function applyDropdown(){
    groupBar=document.getElementById('groupFilters54');
    if(!groupBar)return;
    const originalButtons=Array.from(groupBar.querySelectorAll(':scope > button[data-group]'));
    if(!originalButtons.length)return;

    observer?.disconnect();
    originalButtons.forEach(button=>{
      button.hidden=true;
      button.setAttribute('aria-hidden','true');
      button.tabIndex=-1;
    });
    groupBar.querySelector('[data-management-group-control]')?.remove();
    groupBar.appendChild(buildDropdown(originalButtons));
    observer?.observe(groupBar,{childList:true,subtree:false});
  }

  function installStyle(){
    if(document.getElementById(`management-groups-${VERSION}`))return;
    const style=document.createElement('style');
    style.id=`management-groups-${VERSION}`;
    style.textContent=`
      #groupFilters54{overflow:visible!important;padding:8px 10px!important}
      .managementGroupControl72{position:relative;width:100%}
      .managementGroupTrigger72{display:grid!important;grid-template-columns:1fr auto auto;align-items:center;gap:8px;width:100%;min-height:48px;padding:8px 13px!important;border:2px solid #17402b!important;border-radius:13px!important;background:#fff!important;color:#17402b!important;text-align:left;font-weight:950!important}
      .managementGroupTrigger72 small{font-size:11px;color:#5d675f;text-align:right;letter-spacing:.025em}
      .managementGroupTrigger72 b{font-size:18px}
      .managementGroupMenu72{position:absolute;z-index:60;left:0;right:0;top:54px;padding:7px;border:2px solid #17402b;border-radius:13px;background:#f7f2e8;box-shadow:0 8px 20px rgba(15,46,30,.25)}
      .managementGroupMenu72 button{display:block!important;width:100%;min-height:45px;margin:3px 0;padding:10px 12px!important;border:0!important;border-radius:9px!important;background:#fff!important;color:#17402b!important;text-align:left;font-weight:900!important}
      .managementGroupMenu72 button[aria-checked="true"]{background:#17402b!important;color:#fff!important}
    `;
    document.head.appendChild(style);
  }

  function apply(){
    queued=false;
    normalizeRecords();
    installStyle();
    applyDropdown();
  }

  function queueApply(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(apply);
  }

  const start=()=>{
    groupBar=document.getElementById('groupFilters54');
    observer=new MutationObserver(queueApply);
    if(groupBar)observer.observe(groupBar,{childList:true,subtree:false});
    document.addEventListener('click',event=>{
      if(!event.target.closest('.managementGroupControl72'))closeMenu();
    });
    apply();
  };

  window.addEventListener('arborwise:data-ready',queueApply);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();