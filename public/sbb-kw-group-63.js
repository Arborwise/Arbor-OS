'use strict';
(() => {
  const VERSION='73';
  const UI_KEY='arborwise-board-ui-v57';
  const SUB_KEY='arborwise-sbb-work-filter-v73';
  const MAIN_OPTIONS=[
    ['ALL','ALL CUSTOMERS'],
    ['RESIDENTIAL','RESIDENTIAL / HOMEOWNERS'],
    ['SBB','SBB MANAGEMENT'],
    ['GOODWIN','GOODWIN'],
    ['KANAM','KANAM']
  ];
  const SBB_OPTIONS=[
    ['ALL','ALL SBB WORK'],
    ['ARBORWISE','ARBORWISE TREE WORK'],
    ['KW','KW LANDSCAPING LAWNS']
  ];

  let queued=false;
  let applying=false;
  let bodyObserver=null;

  const text=value=>String(value??'').trim();
  const upper=value=>text(value).toUpperCase();
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

  function records(){
    const value=window.ARBORWISE_CURRENT_OPERATIONS?.records;
    return Array.isArray(value)?value:[];
  }

  function storedMain(){
    try{
      const saved=JSON.parse(localStorage.getItem(UI_KEY)||'{}');
      const value=upper(saved.group||'ALL');
      return MAIN_OPTIONS.some(([option])=>option===value)?value:'ALL';
    }catch{return 'ALL';}
  }

  function storedSub(){
    try{
      const value=upper(localStorage.getItem(SUB_KEY)||'ALL');
      return SBB_OPTIONS.some(([option])=>option===value)?value:'ALL';
    }catch{return 'ALL';}
  }

  function saveSub(value){
    try{localStorage.setItem(SUB_KEY,value);}catch{}
  }

  function isKw(record){
    const category=upper(record.category);
    const who=upper(record.who);
    const sourceText=upper(`${record.name||''} ${record.address||''} ${record.service||''} ${record.notes||''} ${record.subcontractor||''}`);
    return category==='KW'||who.includes('KW LANDSCAPING')||sourceText.includes('KW LANDSCAPING');
  }

  function rememberBaseCategory(record){
    if(!record.__arborwiseManagementBaseCategory){
      const current=upper(record.category||'RESIDENTIAL');
      record.__arborwiseManagementBaseCategory=current==='SBB_KW_HIDDEN'||current==='SBB_TREE_HIDDEN'?'SBB':current;
    }
    return record.__arborwiseManagementBaseCategory;
  }

  function applyRecordHierarchy(main,sub){
    for(const record of records()){
      const base=rememberBaseCategory(record);
      const kw=isKw(record);
      if(kw){
        record.managementGroup='SBB Management';
        record.subcontractor='KW Landscaping';
        record.workDivision='Lawn Maintenance';
        record.category=main==='SBB'&&sub==='ARBORWISE'?'SBB_KW_HIDDEN':'KW';
      }else if(base==='SBB'){
        record.managementGroup='SBB Management';
        record.subcontractor='Arborwise';
        record.workDivision='Tree Work';
        record.category=main==='SBB'&&sub==='KW'?'SBB_TREE_HIDDEN':'SBB';
      }else{
        record.category=base;
      }
    }
  }

  function originalGroupButtons(groupBar){
    return Array.from(groupBar.querySelectorAll(':scope > button[data-group]'));
  }

  function selectedMain(groupBar){
    const selected=originalGroupButtons(groupBar).find(button=>button.classList.contains('on'));
    return upper(selected?.dataset.group||storedMain());
  }

  function ensureGroupBar(){
    let groupBar=document.getElementById('groupFilters54');
    if(groupBar)return groupBar;
    const filters=document.getElementById('filters');
    if(!filters)return null;
    groupBar=document.createElement('section');
    groupBar.id='groupFilters54';
    groupBar.setAttribute('aria-label','Management group filters');
    filters.insertAdjacentElement('afterend',groupBar);
    return groupBar;
  }

  function hideTopLevelKw(){
    const filters=document.getElementById('filters');
    if(!filters)return;
    const kw=filters.querySelector('button[data-filter="KW"]');
    if(kw){
      kw.hidden=true;
      kw.setAttribute('aria-hidden','true');
      kw.tabIndex=-1;
      if(kw.classList.contains('on')){
        const all=filters.querySelector('button[data-filter="ALL"]');
        if(all&&!all.classList.contains('on'))all.click();
      }
    }
  }

  function closeMenus(control){
    control?.querySelectorAll('[data-management-menu]').forEach(menu=>{menu.hidden=true;});
    control?.querySelectorAll('[aria-expanded="true"]').forEach(button=>button.setAttribute('aria-expanded','false'));
  }

  function activateBoard(main,sub,{force=true}={}){
    applyRecordHierarchy(main,sub);
    hideTopLevelKw();

    const filters=document.getElementById('filters');
    const allCrew=filters?.querySelector('button[data-filter="ALL"]');
    if(main==='SBB'&&sub!=='ALL'&&allCrew&&!allCrew.classList.contains('on'))allCrew.click();

    const groupBar=document.getElementById('groupFilters54');
    const target=groupBar?.querySelector(`:scope > button[data-group="${main}"]`);
    if(target&&(force||!target.classList.contains('on')))target.click();
  }

  function buildControl(groupBar,main,sub){
    const mainLabel=MAIN_OPTIONS.find(([value])=>value===main)?.[1]||'ALL CUSTOMERS';
    const subLabel=SBB_OPTIONS.find(([value])=>value===sub)?.[1]||'ALL SBB WORK';
    const control=document.createElement('div');
    control.className='managementHierarchy73';
    control.dataset.managementHierarchy=VERSION;
    control.dataset.main=main;
    control.dataset.sub=sub;
    control.innerHTML=`
      <div class="managementLevel73">
        <button class="managementTrigger73" type="button" data-management-trigger="main" aria-haspopup="true" aria-expanded="false">
          <span>MANAGEMENT GROUPS</span><small>${esc(mainLabel)}</small><b aria-hidden="true">▾</b>
        </button>
        <div class="managementMenu73" data-management-menu="main" role="menu" hidden>
          ${MAIN_OPTIONS.map(([value,label])=>`<button type="button" role="menuitemradio" aria-checked="${main===value?'true':'false'}" data-main-choice="${value}">${esc(label)}</button>`).join('')}
        </div>
      </div>
      <div class="managementLevel73 sbbLevel73" ${main==='SBB'?'':'hidden'}>
        <button class="managementTrigger73 sbbTrigger73" type="button" data-management-trigger="sbb" aria-haspopup="true" aria-expanded="false">
          <span>SBB MANAGEMENT WORK</span><small>${esc(subLabel)}</small><b aria-hidden="true">▾</b>
        </button>
        <div class="managementMenu73 sbbMenu73" data-management-menu="sbb" role="menu" hidden>
          ${SBB_OPTIONS.map(([value,label])=>`<button type="button" role="menuitemradio" aria-checked="${sub===value?'true':'false'}" data-sbb-choice="${value}">${esc(label)}</button>`).join('')}
        </div>
      </div>`;

    control.querySelectorAll('[data-management-trigger]').forEach(trigger=>{
      trigger.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        const name=trigger.dataset.managementTrigger;
        const menu=control.querySelector(`[data-management-menu="${name}"]`);
        const opening=Boolean(menu?.hidden);
        closeMenus(control);
        if(menu){menu.hidden=!opening;trigger.setAttribute('aria-expanded',String(opening));}
      };
    });

    control.querySelectorAll('[data-main-choice]').forEach(option=>{
      option.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        const value=option.dataset.mainChoice;
        const nextSub=value==='SBB'?storedSub():'ALL';
        if(value!=='SBB')saveSub('ALL');
        closeMenus(control);
        activateBoard(value,nextSub);
        queueApply();
      };
    });

    control.querySelectorAll('[data-sbb-choice]').forEach(option=>{
      option.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        const value=option.dataset.sbbChoice;
        saveSub(value);
        closeMenus(control);
        activateBoard('SBB',value);
        queueApply();
      };
    });
    return control;
  }

  function installStyle(){
    if(document.getElementById(`management-hierarchy-${VERSION}`))return;
    const style=document.createElement('style');
    style.id=`management-hierarchy-${VERSION}`;
    style.textContent=`
      #groupFilters54{display:block!important;overflow:visible!important;padding:8px 10px!important;background:#ebe9df!important}
      #groupFilters54>button[data-group]{display:none!important}
      #filters button[data-filter="KW"]{display:none!important}
      .managementHierarchy73{display:grid;gap:8px;width:100%;position:relative;z-index:35}
      .managementLevel73{position:relative;width:100%}
      .managementLevel73[hidden]{display:none!important}
      .managementTrigger73{display:grid!important;grid-template-columns:1fr auto auto;align-items:center;gap:8px;width:100%;min-height:50px;padding:9px 13px!important;border:2px solid #17402b!important;border-radius:13px!important;background:#fff!important;color:#17402b!important;text-align:left;font-weight:950!important}
      .managementTrigger73 span{letter-spacing:.025em}
      .managementTrigger73 small{font-size:11px;color:#5d675f;text-align:right;letter-spacing:.02em}
      .managementTrigger73 b{font-size:18px}
      .sbbTrigger73{background:#e4efe6!important;border-color:#2b6441!important}
      .managementMenu73{position:absolute;z-index:80;left:0;right:0;top:55px;padding:7px;border:2px solid #17402b;border-radius:13px;background:#f7f2e8;box-shadow:0 8px 20px rgba(15,46,30,.25)}
      .managementMenu73 button{display:block!important;width:100%;min-height:45px;margin:3px 0;padding:10px 12px!important;border:0!important;border-radius:9px!important;background:#fff!important;color:#17402b!important;text-align:left;font-weight:900!important}
      .managementMenu73 button[aria-checked="true"]{background:#17402b!important;color:#fff!important}
      .sbbMenu73 button[aria-checked="true"]{background:#2b6441!important}
      @media(max-width:390px){
        .managementTrigger73{grid-template-columns:1fr auto;min-height:48px}
        .managementTrigger73 small{grid-column:1 / -1;text-align:left;margin-top:-4px}
        .managementTrigger73 b{position:absolute;right:14px;top:13px}
      }
    `;
    document.head.appendChild(style);
  }

  function apply(){
    queued=false;
    if(applying)return;
    applying=true;
    try{
      installStyle();
      hideTopLevelKw();
      const groupBar=ensureGroupBar();
      if(!groupBar)return;
      const buttons=originalGroupButtons(groupBar);
      if(!buttons.length)return;
      const main=selectedMain(groupBar);
      const sub=main==='SBB'?storedSub():'ALL';
      applyRecordHierarchy(main,sub);
      buttons.forEach(button=>{
        button.hidden=true;
        button.setAttribute('aria-hidden','true');
        button.tabIndex=-1;
      });
      const existing=groupBar.querySelector('[data-management-hierarchy]');
      if(!existing){
        groupBar.appendChild(buildControl(groupBar,main,sub));
      }else if(existing.dataset.main!==main||existing.dataset.sub!==sub){
        existing.replaceWith(buildControl(groupBar,main,sub));
      }
    }finally{
      applying=false;
    }
  }

  function queueApply(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(apply);
  }

  function handleDataReady(){
    const main=storedMain();
    const sub=main==='SBB'?storedSub():'ALL';
    applyRecordHierarchy(main,sub);
    queueApply();
    if(main==='SBB'&&sub!=='ALL')setTimeout(()=>activateBoard(main,sub),30);
  }

  function start(){
    installStyle();
    bodyObserver=new MutationObserver(mutations=>{
      if(applying)return;
      const relevant=mutations.some(mutation=>{
        const target=mutation.target;
        return target?.id==='filters'||target?.id==='groupFilters54'||target?.closest?.('#filters,#groupFilters54');
      });
      if(relevant)queueApply();
    });
    bodyObserver.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',event=>{
      if(!event.target.closest('.managementHierarchy73'))closeMenus(document.querySelector('.managementHierarchy73'));
    });
    window.addEventListener('arborwise:data-ready',handleDataReady);
    queueApply();
    setTimeout(queueApply,250);
    setTimeout(queueApply,1200);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
