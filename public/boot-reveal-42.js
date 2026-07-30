'use strict';
(() => {
  try{
    localStorage.setItem('arborwise-owner-device','1');
    if(localStorage.getItem('arborwise-cache-reset-v74')!=='1'){
      localStorage.removeItem('arborwise-board-last-good-v57');
      localStorage.removeItem('arborwise-board-last-good-v56');
      localStorage.removeItem('arborwise-live-board-v24');
      localStorage.removeItem('arborwise-sbb-work-filter-v73');
      localStorage.setItem('arborwise-cache-reset-v74','1');
    }
  }catch{}

  const reveal=()=>requestAnimationFrame(()=>document.body.classList.remove('booting'));

  const loadContactIcons=()=>{
    if(document.querySelector('script[data-arborwise-contact-icons]'))return;
    const script=document.createElement('script');
    script.src='/contact-icons-66.js?v=67';
    script.defer=true;
    script.dataset.arborwiseContactIcons='67';
    document.head.appendChild(script);
  };

  const loadWorkflowStatusBoard=()=>{
    if(document.querySelector('script[data-arborwise-workflow-status-board]'))return;
    const script=document.createElement('script');
    script.src='/estimate-age-colors-70.js?v=71';
    script.defer=true;
    script.dataset.arborwiseWorkflowStatusBoard='71';
    document.head.appendChild(script);
  };

  const loadManagementGroupsRepair=()=>{
    if(document.querySelector('script[data-management-groups-repair]'))return;
    const script=document.createElement('script');
    script.src='/management-groups-repair-74.js?v=74';
    script.defer=true;
    script.dataset.managementGroupsRepair='74';
    document.head.appendChild(script);
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

  const ready=()=>{loadContactIcons();loadWorkflowStatusBoard();loadManagementGroupsRepair();reveal();installLiveRefresh();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
  setTimeout(()=>{loadContactIcons();loadWorkflowStatusBoard();loadManagementGroupsRepair();document.body.classList.remove('booting');installLiveRefresh();},1800);
})();