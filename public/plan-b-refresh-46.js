'use strict';
(() => {
  const VERSION='46';
  const CHECKED_KEY='arborwise-plan-b-refresh-checked-v46';
  const ASSET_PATTERN=/(?:board-current|live-sync|plan-b-refresh)-\d+\.js/g;
  const oldRefresh=document.getElementById('syncButton');
  const oldStatus=document.getElementById('statusButton');
  const veil=document.getElementById('veil');
  const sheet=document.getElementById('sheet');
  const toastEl=document.getElementById('toast');
  if(!oldRefresh||!oldStatus)return;

  if(veil)veil.hidden=true;
  if(sheet)sheet.innerHTML='';

  const refresh=oldRefresh.cloneNode(true);
  const status=oldStatus.cloneNode(true);
  oldRefresh.replaceWith(refresh);
  oldStatus.replaceWith(status);

  let checked=localStorage.getItem(CHECKED_KEY)||'';

  function shortTime(value){
    if(!value)return '';
    return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});
  }

  function renderStatus(){
    status.textContent=`CURRENT OPERATIONS${checked?` • CHECKED ${shortTime(checked)}`:''}`;
  }

  function toast(message){
    if(!toastEl)return;
    toastEl.textContent=message;
    toastEl.hidden=false;
    clearTimeout(toast._timer);
    toast._timer=setTimeout(()=>{toastEl.hidden=true;},3400);
  }

  function localAssets(){
    return [...document.scripts]
      .map(script=>{try{return new URL(script.src,location.href).pathname.split('/').pop()||'';}catch{return '';}})
      .filter(name=>ASSET_PATTERN.test(name))
      .sort()
      .join('|');
  }

  function remoteAssets(html){
    ASSET_PATTERN.lastIndex=0;
    return [...new Set(html.match(ASSET_PATTERN)||[])].sort().join('|');
  }

  function markChecked(){
    checked=new Date().toISOString();
    localStorage.setItem(CHECKED_KEY,checked);
    renderStatus();
  }

  async function checkForNewBoard(){
    refresh.disabled=true;
    refresh.classList.add('spinning');
    toast('Checking current operations...');
    try{
      const checkUrl=new URL('/board-now.html',location.origin);
      checkUrl.searchParams.set('_check',String(Date.now()));
      const response=await fetch(checkUrl.toString(),{cache:'no-store',credentials:'same-origin',headers:{'Cache-Control':'no-cache'}});
      if(!response.ok)throw new Error(`Check failed ${response.status}`);
      const html=await response.text();
      const remote=remoteAssets(html);
      const local=localAssets();
      markChecked();
      if(remote&&remote!==local){
        toast('New operations available • updating...');
        const next=new URL(location.href);
        next.searchParams.set('board',VERSION);
        next.searchParams.set('_refresh',String(Date.now()));
        setTimeout(()=>location.replace(next.toString()),180);
        return;
      }
      toast('Checked now • no changes');
    }catch(error){
      markChecked();
      toast('Checked local board • online update unavailable');
    }finally{
      refresh.disabled=false;
      refresh.classList.remove('spinning');
    }
  }

  refresh.addEventListener('click',event=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    checkForNewBoard();
  },true);

  status.addEventListener('click',event=>{
    event.preventDefault();
    event.stopImmediatePropagation();
    toast('Current operations are maintained through the Arborwise shared workflow.');
  },true);

  renderStatus();
  window.ARBORWISE_PLAN_B_REFRESH_VERSION=VERSION;
})();
