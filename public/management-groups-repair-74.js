'use strict';
(() => {
  const VERSION='74';
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
  let installing=false;
  let lastWakeRefresh=0;

  const upper=value=>String(value??'').trim().toUpperCase();
  const esc=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));

  function savedUi(){
    try{return JSON.parse(localStorage.getItem(UI_KEY)||'{}')||{};}catch{return {};}
  }

  function selectedMain(){
    const selected=document.querySelector('#groupFilters54 > button[data-group].on');
    const value=upper(selected?.dataset.group||savedUi().group||'ALL');
    return MAIN_OPTIONS.some(([option])=>option===value)?value:'ALL';
  }

  function selectedSub(){
    try{
      const value=upper(localStorage.getItem(SUB_KEY)||'ALL');
      return SBB_OPTIONS.some(([option])=>option===value)?value:'ALL';
    }catch{return 'ALL';}
  }

  function saveSub(value){
    try{localStorage.setItem(SUB_KEY,value);}catch{}
  }

  function closeMenus(control){
    control?.querySelectorAll('[data-repair-menu]').forEach(menu=>{menu.hidden=true;});
    control?.querySelectorAll('[aria-expanded="true"]').forEach(button=>button.setAttribute('aria-expanded','false'));
  }

  function notifyHierarchy(){
    window.dispatchEvent(new CustomEvent('arborwise:data-ready',{detail:{managementRepair:VERSION}}));
  }

  function activateMain(value){
    if(value!=='SBB')saveSub('ALL');
    const target=document.querySelector(`#groupFilters54 > button[data-group="${value}"]`);
    if(target)target.click();
    notifyHierarchy();
    queueInstall();
    setTimeout(queueInstall,80);
  }

  function activateSbb(value){
    saveSub(value);
    const allCrew=document.querySelector('#filters button[data-filter="ALL"]');
    if(allCrew&&!allCrew.classList.contains('on'))allCrew.click();
    const sbb=document.querySelector('#groupFilters54 > button[data-group="SBB"]');
    if(sbb&&!sbb.classList.contains('on'))sbb.click();
    notifyHierarchy();
    queueInstall();
    setTimeout(()=>{notifyHierarchy();queueInstall();},80);
  }

  function buildControl(main,sub){
    const mainLabel=MAIN_OPTIONS.find(([value])=>value===main)?.[1]||'ALL CUSTOMERS';
    const subLabel=SBB_OPTIONS.find(([value])=>value===sub)?.[1]||'ALL SBB WORK';
    const control=document.createElement('div');
    control.className='managementRepair74';
    control.dataset.managementRepair=VERSION;
    control.dataset.main=main;
    control.dataset.sub=sub;
    control.innerHTML=`
      <div class="managementRepairLevel74">
        <button class="managementRepairTrigger74" type="button" data-repair-trigger="main" aria-haspopup="true" aria-expanded="false">
          <span>MANAGEMENT GROUPS</span><small>${esc(mainLabel)}</small><b aria-hidden="true">▾</b>
        </button>
        <div class="managementRepairMenu74" data-repair-menu="main" role="menu" hidden>
          ${MAIN_OPTIONS.map(([value,label])=>`<button type="button" role="menuitemradio" aria-checked="${main===value?'true':'false'}" data-repair-main="${value}">${esc(label)}</button>`).join('')}
        </div>
      </div>
      <div class="managementRepairLevel74 managementRepairSbb74" ${main==='SBB'?'':'hidden'}>
        <button class="managementRepairTrigger74 managementRepairSbbTrigger74" type="button" data-repair-trigger="sbb" aria-haspopup="true" aria-expanded="false">
          <span>SBB MANAGEMENT WORK</span><small>${esc(subLabel)}</small><b aria-hidden="true">▾</b>
        </button>
        <div class="managementRepairMenu74" data-repair-menu="sbb" role="menu" hidden>
          ${SBB_OPTIONS.map(([value,label])=>`<button type="button" role="menuitemradio" aria-checked="${sub===value?'true':'false'}" data-repair-sbb="${value}">${esc(label)}</button>`).join('')}
        </div>
      </div>`;

    control.querySelectorAll('[data-repair-trigger]').forEach(trigger=>{
      trigger.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        const name=trigger.dataset.repairTrigger;
        const menu=control.querySelector(`[data-repair-menu="${name}"]`);
        const opening=Boolean(menu?.hidden);
        closeMenus(control);
        if(menu){menu.hidden=!opening;trigger.setAttribute('aria-expanded',String(opening));}
      };
    });

    control.querySelectorAll('[data-repair-main]').forEach(option=>{
      option.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        closeMenus(control);
        activateMain(option.dataset.repairMain);
      };
    });

    control.querySelectorAll('[data-repair-sbb]').forEach(option=>{
      option.onclick=event=>{
        event.preventDefault();
        event.stopPropagation();
        closeMenus(control);
        activateSbb(option.dataset.repairSbb);
      };
    });
    return control;
  }

  function installStyle(){
    if(document.getElementById('management-repair-74-style'))return;
    const style=document.createElement('style');
    style.id='management-repair-74-style';
    style.textContent=`
      .managementHierarchy73{display:none!important}
      #groupFilters54{display:block!important;overflow:visible!important;min-height:66px!important;padding:8px 10px!important;background:#ebe9df!important}
      #groupFilters54 > button[data-group]{display:none!important}
      .managementRepair74{display:grid!important;gap:8px;width:100%;position:relative;z-index:95}
      .managementRepairLevel74{position:relative;width:100%}
      .managementRepairLevel74[hidden]{display:none!important}
      .managementRepairTrigger74{display:grid!important;grid-template-columns:1fr auto auto;align-items:center;gap:8px;width:100%;min-height:50px;padding:9px 13px!important;border:2px solid #17402b!important;border-radius:13px!important;background:#fff!important;color:#17402b!important;text-align:left;font-weight:950!important}
      .managementRepairTrigger74 small{font-size:11px;color:#5d675f;text-align:right;letter-spacing:.02em}
      .managementRepairTrigger74 b{font-size:18px}
      .managementRepairSbbTrigger74{background:#e4efe6!important;border-color:#2b6441!important}
      .managementRepairMenu74{position:absolute;z-index:120;left:0;right:0;top:55px;padding:7px;border:2px solid #17402b;border-radius:13px;background:#f7f2e8;box-shadow:0 8px 20px rgba(15,46,30,.25)}
      .managementRepairMenu74 button{display:block!important;width:100%;min-height:45px;margin:3px 0;padding:10px 12px!important;border:0!important;border-radius:9px!important;background:#fff!important;color:#17402b!important;text-align:left;font-weight:900!important}
      .managementRepairMenu74 button[aria-checked="true"]{background:#17402b!important;color:#fff!important}
      @media(max-width:390px){
        .managementRepairTrigger74{grid-template-columns:1fr auto;min-height:48px}
        .managementRepairTrigger74 small{grid-column:1 / -1;text-align:left;margin-top:-4px}
        .managementRepairTrigger74 b{position:absolute;right:14px;top:13px}
      }
    `;
    document.head.appendChild(style);
  }

  function install(){
    queued=false;
    if(installing)return;
    installing=true;
    try{
      installStyle();
      const groupBar=document.getElementById('groupFilters54');
      if(!groupBar)return;
      const main=selectedMain();
      const sub=main==='SBB'?selectedSub():'ALL';
      const existing=groupBar.querySelector('[data-management-repair]');
      if(!existing){
        groupBar.appendChild(buildControl(main,sub));
      }else if(existing.dataset.main!==main||existing.dataset.sub!==sub){
        existing.replaceWith(buildControl(main,sub));
      }
    }finally{
      installing=false;
    }
  }

  function queueInstall(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(install);
  }

  function refreshOnWake(){
    if(document.visibilityState==='hidden')return;
    const now=Date.now();
    if(now-lastWakeRefresh<5000)return;
    lastWakeRefresh=now;
    setTimeout(()=>{
      const refresh=document.getElementById('syncButton');
      if(refresh&&!refresh.disabled)refresh.click();
    },180);
  }

  function start(){
    installStyle();
    const observer=new MutationObserver(()=>queueInstall());
    observer.observe(document.body,{childList:true,subtree:true});
    document.addEventListener('click',event=>{
      if(!event.target.closest('.managementRepair74'))closeMenus(document.querySelector('.managementRepair74'));
    });
    window.addEventListener('arborwise:data-ready',queueInstall);
    window.addEventListener('pageshow',refreshOnWake);
    window.addEventListener('focus',refreshOnWake);
    document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')refreshOnWake();});
    queueInstall();
    setTimeout(queueInstall,250);
    setTimeout(queueInstall,1000);
    setInterval(queueInstall,2000);
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();