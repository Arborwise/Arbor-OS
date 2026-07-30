'use strict';
(() => {
  try{
    localStorage.setItem('arborwise-owner-device','1');
    if(localStorage.getItem('arborwise-cache-reset-v76')!=='1'){
      localStorage.removeItem('arborwise-board-last-good-v57');
      localStorage.removeItem('arborwise-board-last-good-v56');
      localStorage.removeItem('arborwise-live-board-v24');
      localStorage.removeItem('arborwise-sbb-work-filter-v73');
      localStorage.removeItem('arborwise-pmg-sbb-v75');
      localStorage.setItem('arborwise-cache-reset-v76','1');
    }
  }catch{}

  const reveal=()=>requestAnimationFrame(()=>document.body.classList.remove('booting'));

  const loadContactIcons=()=>{
    if(document.querySelector('script[data-arborwise-contact-icons]'))return;
    const script=document.createElement('script');
    script.src='/contact-icons-66.js?v=76';
    script.defer=true;
    script.dataset.arborwiseContactIcons='76';
    document.head.appendChild(script);
  };

  const loadWorkflowStatusBoard=()=>{
    if(document.querySelector('script[data-arborwise-workflow-status-board]'))return;
    const script=document.createElement('script');
    script.src='/estimate-age-colors-70.js?v=76';
    script.defer=true;
    script.dataset.arborwiseWorkflowStatusBoard='76';
    document.head.appendChild(script);
  };

  const installNativePropertyManagement=()=>{
    const section=document.getElementById('propertyManagementGroups75');
    if(!section||section.dataset.nativePropertyManagement==='76')return;

    section.dataset.nativePropertyManagement='76';
    section.innerHTML=`
      <label class="nativePmgLabel76" for="nativePmgMain76">PROPERTY MANAGEMENT GROUPS</label>
      <select id="nativePmgMain76" class="nativePmgSelect76" aria-label="Property management groups">
        <option value="ALL">ALL CUSTOMERS</option>
        <option value="RESIDENTIAL">RESIDENTIAL / HOMEOWNERS</option>
        <option value="SBB">SBB MANAGEMENT</option>
        <option value="GOODWIN">GOODWIN</option>
        <option value="KANAM">KANAM</option>
      </select>
      <div id="nativePmgSbbWrap76" class="nativePmgSbbWrap76" hidden>
        <label class="nativePmgLabel76" for="nativePmgSbb76">SBB MANAGEMENT WORK</label>
        <select id="nativePmgSbb76" class="nativePmgSelect76 nativePmgSbb76" aria-label="SBB management work">
          <option value="ALL">ALL SBB WORK</option>
          <option value="ARBORWISE">ARBORWISE TREE WORK</option>
          <option value="KW">KW LANDSCAPING LAWNS</option>
        </select>
      </div>`;

    if(!document.getElementById('native-pmg-style-76')){
      const style=document.createElement('style');
      style.id='native-pmg-style-76';
      style.textContent=`
        #propertyManagementGroups75{display:grid!important;gap:8px!important;position:relative!important;z-index:70!important;padding:9px 10px!important;background:#ebe9df!important;border-bottom:1px solid #d9d6ca!important;overflow:visible!important}
        .nativePmgLabel76{display:block;color:#17402b;font-size:12px;font-weight:950;letter-spacing:.055em}
        .nativePmgSelect76{display:block!important;width:100%!important;min-height:54px!important;border:2px solid #17402b!important;border-radius:13px!important;background:#fff!important;color:#17402b!important;padding:9px 42px 9px 13px!important;font:inherit!important;font-size:16px!important;font-weight:950!important;touch-action:manipulation!important}
        .nativePmgSbbWrap76{display:grid;gap:6px}
        .nativePmgSbbWrap76[hidden]{display:none!important}
        .nativePmgSbb76{background:#e4efe6!important;border-color:#2b6441!important}
      `;
      document.head.appendChild(style);
    }

    const mainSelect=document.getElementById('nativePmgMain76');
    const sbbWrap=document.getElementById('nativePmgSbbWrap76');
    const sbbSelect=document.getElementById('nativePmgSbb76');
    if(!mainSelect||!sbbWrap||!sbbSelect)return;

    const UI_KEY='arborwise-board-ui-v57';
    const SUB_KEY='arborwise-pmg-sbb-v76';
    const validMain=new Set(['ALL','RESIDENTIAL','SBB','GOODWIN','KANAM']);
    const validSub=new Set(['ALL','ARBORWISE','KW']);
    const readUi=()=>{try{return JSON.parse(localStorage.getItem(UI_KEY)||'{}')||{};}catch{return {};}};
    const readSub=()=>{try{const value=String(localStorage.getItem(SUB_KEY)||'ALL').toUpperCase();return validSub.has(value)?value:'ALL';}catch{return 'ALL';}};
    const saveSub=value=>{try{localStorage.setItem(SUB_KEY,value);}catch{}};
    const clickWhenReady=(selector,attempt=0)=>{
      const button=document.querySelector(selector);
      if(button){button.click();return true;}
      if(attempt<20)setTimeout(()=>clickWhenReady(selector,attempt+1),100);
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
      sbbWrap.hidden=main!=='SBB';
    };

    mainSelect.onchange=()=>{
      const value=validMain.has(mainSelect.value)?mainSelect.value:'ALL';
      if(value!=='SBB')saveSub('ALL');
      clickWhenReady(`#groupFilters54 > button[data-group="${value}"]`);
      sbbWrap.hidden=value!=='SBB';
      if(value==='SBB')applySub(readSub());
      else applySub('ALL');
      setTimeout(syncControls,180);
    };

    sbbSelect.onchange=()=>{
      const value=validSub.has(sbbSelect.value)?sbbSelect.value:'ALL';
      saveSub(value);
      clickWhenReady('#groupFilters54 > button[data-group="SBB"]');
      applySub(value);
      setTimeout(syncControls,180);
    };

    window.addEventListener('arborwise:data-ready',()=>setTimeout(syncControls,0));
    setInterval(syncControls,2000);
    syncControls();
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

    const params=new URLSearchParams(location.search);
    const connected=params.get('connected');
    if(connected){
      params.delete('connected');
      const query=params.toString();
      history.replaceState({},'',`${location.pathname}${query?`?${query}`:''}${location.hash}`);
      setTimeout(()=>button.click(),450);
    }
  };

  const ready=()=>{loadContactIcons();loadWorkflowStatusBoard();installNativePropertyManagement();reveal();installLiveRefresh();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
  setTimeout(()=>{loadContactIcons();loadWorkflowStatusBoard();installNativePropertyManagement();document.body.classList.remove('booting');installLiveRefresh();},1800);
})();