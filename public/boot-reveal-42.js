'use strict';
(() => {
  const reveal=()=>{
    try{
      document.body.classList.remove('booting');
      document.body.style.visibility='visible';
    }catch{}
  };

  // Fail open: Arborwise OS must never stay hidden because an enhancement failed.
  reveal();

  try{
    localStorage.setItem('arborwise-owner-device','1');
    if(localStorage.getItem('arborwise-cache-reset-v78')!=='1'){
      localStorage.removeItem('arborwise-board-last-good-v57');
      localStorage.removeItem('arborwise-board-last-good-v56');
      localStorage.removeItem('arborwise-live-board-v24');
      localStorage.removeItem('arborwise-sbb-work-filter-v73');
      localStorage.removeItem('arborwise-pmg-sbb-v75');
      localStorage.removeItem('arborwise-pmg-sbb-v76');
      localStorage.removeItem('arborwise-pmg-sbb-v77');
      localStorage.setItem('arborwise-cache-reset-v78','1');
    }
  }catch{}

  const loadContactIcons=()=>{
    if(document.querySelector('script[data-arborwise-contact-icons]'))return;
    const script=document.createElement('script');
    script.src='/contact-icons-66.js?v=78';
    script.defer=true;
    script.dataset.arborwiseContactIcons='78';
    document.head.appendChild(script);
  };

  const loadWorkflowStatusBoard=()=>{
    if(document.querySelector('script[data-arborwise-workflow-status-board]'))return;
    const script=document.createElement('script');
    script.src='/estimate-age-colors-70.js?v=78';
    script.defer=true;
    script.dataset.arborwiseWorkflowStatusBoard='78';
    document.head.appendChild(script);
  };

  const installTopPropertyManagementTab=()=>{
    const filters=document.getElementById('filters');
    if(!filters)return;

    const oldSection=document.getElementById('propertyManagementGroups75');
    if(oldSection&&!oldSection.hidden)oldSection.hidden=true;

    if(!document.getElementById('top-pmg-style-78')){
      const style=document.createElement('style');
      style.id='top-pmg-style-78';
      style.textContent=`
        #filters{grid-template-columns:repeat(4,minmax(0,1fr))!important;overflow:visible!important}
        #filters button[data-filter="KW"],#filters button[data-filter="UNASSIGNED"]{display:none!important}
        #propertyManagementGroups75{display:none!important}
        .topPmgTab78{display:block;min-width:0;position:relative}
        .topPmgSelect78{display:block!important;width:100%!important;min-width:0!important;min-height:39px!important;border:1.5px solid #17402b!important;border-radius:999px!important;background:#fff!important;color:#17402b!important;padding:8px 18px 8px 5px!important;font:inherit!important;font-size:10px!important;font-weight:900!important;text-align:center!important;text-transform:uppercase!important;touch-action:manipulation!important}
        .topPmgSelect78.isActive{background:#17402b!important;color:#fff!important}
        #propertyManagementSubrow78{display:flex;align-items:center;gap:8px;padding:7px 9px;background:#e4efe6;border-bottom:1px solid #c7d8ca;position:relative;z-index:14}
        #propertyManagementSubrow78[hidden]{display:none!important}
        #propertyManagementSubrow78 label{flex:0 0 auto;color:#17402b;font-size:11px;font-weight:950;letter-spacing:.04em}
        #propertyManagementSubrow78 select{flex:1;min-width:0;min-height:43px;border:2px solid #2b6441;border-radius:12px;background:#fff;color:#17402b;padding:8px 36px 8px 11px;font:inherit;font-size:13px;font-weight:900}
        @media(max-width:390px){
          .topPmgSelect78{font-size:9px!important;padding-left:2px!important;padding-right:12px!important}
          #propertyManagementSubrow78 label{font-size:10px}
          #propertyManagementSubrow78 select{font-size:12px}
        }
      `;
      document.head.appendChild(style);
    }

    let tab=filters.querySelector('[data-top-pmg-tab="78"]');
    if(!tab){
      // Remove only our older injected controls, never the core crew buttons.
      filters.querySelectorAll('[data-top-pmg-tab="77"],[data-top-pmg-tab="76"]').forEach(node=>node.remove());
      tab=document.createElement('div');
      tab.className='topPmgTab78';
      tab.dataset.topPmgTab='78';
      tab.innerHTML=`
        <select id="topPmgSelect78" class="topPmgSelect78" aria-label="Property management groups">
          <option value="ALL">PROPERTY MGMT</option>
          <option value="RESIDENTIAL">RESIDENTIAL</option>
          <option value="SBB">SBB MGMT</option>
          <option value="GOODWIN">GOODWIN</option>
          <option value="KANAM">KANAM</option>
        </select>`;
      filters.appendChild(tab);
    }

    let subrow=document.getElementById('propertyManagementSubrow78');
    if(!subrow){
      document.getElementById('propertyManagementSubrow77')?.remove();
      subrow=document.createElement('section');
      subrow.id='propertyManagementSubrow78';
      subrow.hidden=true;
      subrow.innerHTML=`
        <label for="topPmgSbbSelect78">SBB WORK</label>
        <select id="topPmgSbbSelect78" aria-label="SBB management work">
          <option value="ALL">ALL SBB WORK</option>
          <option value="ARBORWISE">ARBORWISE TREE WORK</option>
          <option value="KW">KW LANDSCAPING LAWNS</option>
        </select>`;
      filters.insertAdjacentElement('afterend',subrow);
    }

    const mainSelect=document.getElementById('topPmgSelect78');
    const sbbSelect=document.getElementById('topPmgSbbSelect78');
    if(!mainSelect||!sbbSelect)return;

    const UI_KEY='arborwise-board-ui-v57';
    const SUB_KEY='arborwise-pmg-sbb-v78';
    const validMain=new Set(['ALL','RESIDENTIAL','SBB','GOODWIN','KANAM']);
    const validSub=new Set(['ALL','ARBORWISE','KW']);
    const readUi=()=>{try{return JSON.parse(localStorage.getItem(UI_KEY)||'{}')||{};}catch{return {};}};
    const readSub=()=>{try{const value=String(localStorage.getItem(SUB_KEY)||'ALL').toUpperCase();return validSub.has(value)?value:'ALL';}catch{return 'ALL';}};
    const saveSub=value=>{try{localStorage.setItem(SUB_KEY,value);}catch{}};
    const clickWhenReady=(selector,attempt=0)=>{
      const button=document.querySelector(selector);
      if(button){button.click();return true;}
      if(attempt<12)setTimeout(()=>clickWhenReady(selector,attempt+1),120);
      return false;
    };
    const activeMain=()=>{
      const active=document.querySelector('#groupFilters54 > button[data-group].on');
      const value=String(active?.dataset.group||readUi().group||'ALL').toUpperCase();
      return validMain.has(value)?value:'ALL';
    };
    const applySub=value=>{
      const crew=value==='KW'?'KW':value==='ARBORWISE'?'ARBORWISE':'ALL';
      clickWhenReady(`#filters button[data-filter="${crew}"]`);
    };
    const syncControls=()=>{
      const main=activeMain();
      const sub=readSub();
      mainSelect.value=main;
      sbbSelect.value=sub;
      subrow.hidden=main!=='SBB';
      mainSelect.classList.toggle('isActive',main!=='ALL');
    };

    if(mainSelect.dataset.bound!=='78'){
      mainSelect.dataset.bound='78';
      mainSelect.onchange=()=>{
        const value=validMain.has(mainSelect.value)?mainSelect.value:'ALL';
        if(value!=='SBB')saveSub('ALL');
        clickWhenReady(`#groupFilters54 > button[data-group="${value}"]`);
        if(value==='SBB')applySub(readSub());
        else applySub('ALL');
        setTimeout(syncControls,180);
      };
    }

    if(sbbSelect.dataset.bound!=='78'){
      sbbSelect.dataset.bound='78';
      sbbSelect.onchange=()=>{
        const value=validSub.has(sbbSelect.value)?sbbSelect.value:'ALL';
        saveSub(value);
        clickWhenReady('#groupFilters54 > button[data-group="SBB"]');
        applySub(value);
        setTimeout(syncControls,180);
      };
    }

    syncControls();
  };

  const safeInstallTopPropertyManagementTab=()=>{
    try{installTopPropertyManagementTab();}
    catch(error){console.error('Property management control failed safely',error);reveal();}
  };

  const installLiveRefresh=()=>{
    const button=document.getElementById('syncButton');
    if(!button||button.dataset.liveSyncInstalled==='true')return;
    const readBoard=typeof button.onclick==='function'?button.onclick.bind(button):null;
    if(!readBoard)return;
    button.dataset.liveSyncInstalled='true';
    let working=false;

    button.onclick=async event=>{
      if(working)return;
      working=true;
      try{
        let quickBooksAuthorized=false;
        try{
          const response=await fetch('/api/connections',{credentials:'same-origin',cache:'no-store'});
          if(response.ok){const connections=await response.json();quickBooksAuthorized=Boolean(connections.quickbooks?.authorized);}
        }catch{}
        if(quickBooksAuthorized){
          try{await fetch('/api/sync',{method:'POST',credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json'}});}catch{}
        }
        return await readBoard(event);
      }finally{
        working=false;
      }
    };
  };

  const ready=()=>{
    reveal();
    loadContactIcons();
    loadWorkflowStatusBoard();
    safeInstallTopPropertyManagementTab();
    installLiveRefresh();
    window.addEventListener('arborwise:data-ready',()=>setTimeout(safeInstallTopPropertyManagementTab,0));
    setTimeout(safeInstallTopPropertyManagementTab,350);
    setTimeout(safeInstallTopPropertyManagementTab,1400);
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();

  setTimeout(()=>{
    reveal();
    loadContactIcons();
    loadWorkflowStatusBoard();
    safeInstallTopPropertyManagementTab();
    installLiveRefresh();
  },1800);
})();