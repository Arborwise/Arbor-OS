'use strict';
(() => {
  const reveal=()=>requestAnimationFrame(()=>document.body.classList.remove('booting'));

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

  const ready=()=>{reveal();installLiveRefresh();};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ready,{once:true});
  else ready();
  setTimeout(()=>{document.body.classList.remove('booting');installLiveRefresh();},1800);
})();
