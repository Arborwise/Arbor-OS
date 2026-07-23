'use strict';
(() => {
  const VERSION='45';
  const STORAGE_KEY='arborwise-live-board-v24';
  const AUTO_SYNC_KEY='arborwise-live-sync-last';
  const FINGERPRINT_KEY='arborwise-live-sync-fingerprint';
  const BOOT_SYNC_KEY='arborwise-live-boot-sync-v45';
  const CHECKED_KEY='arborwise-live-refresh-checked-v45';
  const AUTO_SYNC_INTERVAL=5*60*1000;
  const $=id=>document.getElementById(id);
  const refresh=$('syncButton'),status=$('statusButton'),veil=$('veil'),sheet=$('sheet'),toastEl=$('toast');
  if(!refresh||!status||!veil||!sheet)return;
  let live=false,lastSync=null,lastChecked=localStorage.getItem(CHECKED_KEY)||null,writingStatus=false,statusMode='offline';
  const bridgeStyle=document.createElement('style');bridgeStyle.textContent='.connection{border:1px solid #ddd9cc;border-radius:14px;padding:13px;margin:10px 0}.connection h3{margin:0 0 6px;color:#17402b}.connection .good{color:#176b38;font-weight:900}.connection .warn{color:#9b4d00;font-weight:900}';document.head.appendChild(bridgeStyle);

  function safeParse(value,fallback){try{return JSON.parse(value);}catch{return fallback;}}
  function authority(){const value=window.ARBORWISE_CURRENT_OPERATIONS;return value&&Array.isArray(value.records)?value:null;}
  function normalizeId(value){const text=String(value||'').trim();const match=text.match(/^WO-(\d+)$/i);return match?match[1]:text;}
  function timeValue(value){const parsed=Date.parse(value||'');return Number.isFinite(parsed)?parsed:0;}
  function remoteBeatsCurrent(remoteAt,currentAt){return timeValue(remoteAt)>timeValue(currentAt);}
  function remotePreservesCurrent(records,current){
    if(!current)return true;
    const remoteById=new Map((records||[]).map(item=>[normalizeId(item.id),item]));
    for(const protectedRecord of current.records||[]){
      if(!protectedRecord.workDate)continue;
      const remote=remoteById.get(normalizeId(protectedRecord.id));
      if(!remote)continue;
      if(!remote.workDate||/needs a date|scheduling needed/i.test(String(remote.status||'')))return false;
      if(protectedRecord.who&&!/^greg$/i.test(String(protectedRecord.who).trim())&&/^greg$/i.test(String(remote.who||'').trim()))return false;
    }
    return true;
  }
  function mergeAuthority(records,remoteAt=null,preferRemote=false){
    const current=authority();
    if(!current)return records;
    const remoteWins=preferRemote&&remoteBeatsCurrent(remoteAt,current.updatedAt)&&remotePreservesCurrent(records,current);
    if(remoteWins){
      const byId=new Map((current.records||[]).map(item=>[normalizeId(item.id),item]));
      for(const record of records||[])byId.set(normalizeId(record.id),{...(byId.get(normalizeId(record.id))||{}),...record});
      return [...byId.values()];
    }
    const byId=new Map((records||[]).map(item=>[normalizeId(item.id),item]));
    for(const record of current.records||[])byId.set(normalizeId(record.id),{...(byId.get(normalizeId(record.id))||{}),...record});
    return [...byId.values()];
  }
  function applyAuthorityToLocalState(){const current=authority();if(!current)return false;const state=safeParse(localStorage.getItem(STORAGE_KEY),{})||{};state.records=mergeAuthority(Array.isArray(state.records)?state.records:[]);state.currentOperationsUpdatedAt=current.updatedAt;state.currentSnapshotVersion=45;state.live=false;state.lastSync=current.updatedAt;localStorage.setItem(STORAGE_KEY,JSON.stringify(state));lastSync=current.updatedAt;live=false;statusMode='current';return true;}
  function toast(message){if(!toastEl)return;toastEl.textContent=message;toastEl.hidden=false;clearTimeout(toast._liveTimer);toast._liveTimer=setTimeout(()=>toastEl.hidden=true,3400);}
  function closeSheet(){veil.hidden=true;sheet.innerHTML='';}
  function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
  async function api(path,options={}){const response=await fetch(path,{credentials:'same-origin',headers:{'Content-Type':'application/json',...(options.headers||{})},...options});let data={};try{data=await response.json();}catch{}if(!response.ok){const error=new Error(data.error||`Request failed ${response.status}`);error.status=response.status;throw error;}return data;}
  function setStatus(text){if(status.textContent===text)return;writingStatus=true;status.textContent=text;writingStatus=false;}
  function shortTime(value){if(!value)return '';return new Date(value).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});}
  function markChecked(){lastChecked=new Date().toISOString();localStorage.setItem(CHECKED_KEY,lastChecked);setStatus(liveLabel());}
  function liveLabel(){
    const checked=lastChecked?` • CHECKED ${shortTime(lastChecked)}`:'';
    if(statusMode==='current')return `CURRENT OPERATIONS${checked}`;
    if(statusMode==='locked')return `SHARED DATA LOCKED${checked}`;
    if(statusMode==='database')return `SHARED SYNC UNAVAILABLE${checked}`;
    if(statusMode==='live')return `LIVE SHARED DATA${lastSync?` • ${new Date(lastSync).toLocaleString()}`:''}${checked}`;
    return `OFFLINE SNAPSHOT${checked}`;
  }
  function enforceStatus(){if(!writingStatus)setStatus(liveLabel());}
  new MutationObserver(enforceStatus).observe(status,{childList:true,subtree:true,characterData:true});

  function operationalType(item){const raw=String(item.status||'');if(item.type==='job'||/approved|accepted|scheduled|converted|invoiced|overdue|paid|complete/i.test(raw))return 'job';return 'est';}
  function closed(item){return Boolean(item.closed)||/rejected|declined|converted|closed|paid|completed|complete|done/i.test(String(item.status||''));}
  function fingerprintState(state){
    const records=Array.isArray(state.records)?state.records:[];
    const hours=Array.isArray(state.hours)?state.hours:[];
    const mileage=Array.isArray(state.mileage)?state.mileage:[];
    const notes=Array.isArray(state.notes)?state.notes:[];
    return JSON.stringify({records:records.map(item=>[item.id,item.status,item.workDate,item.workTime,item.who,item.notes,item.closed]),hours,mileage,notes});
  }
  function currentFingerprint(){return fingerprintState(safeParse(localStorage.getItem(STORAGE_KEY),{})||{});}
  function mapState(data,{preferRemote=false}={}){
    const current=safeParse(localStorage.getItem(STORAGE_KEY),{})||{};
    const remote=(data.items||[]).map(item=>({
      id:String(item.id||''),type:operationalType(item),name:item.name||'',address:item.addr||'',phone:item.phone||'',email:item.email||'',service:item.service||item.desc||'',
      amount:Number(String(item.money||'').replace(/[$,]/g,''))||0,category:item.category||'RESIDENTIAL',who:item.who||'Greg',status:item.status||'Open',
      workDate:item.date||'',workTime:item.time||'',followUp:item.fuDate||'',notes:item.notes||item.desc||'',closed:closed(item),sentDate:item.sentDate||'',secondFollowUp:item.secondFollowUp||''
    })).filter(item=>item.id);
    const currentAuthority=authority();
    const remoteUpdatedAt=data.lastSync?.finished_at||data.lastSync?.started_at||null;
    const remoteWins=Boolean(preferRemote&&remote.length&&(!currentAuthority||(remoteBeatsCurrent(remoteUpdatedAt,currentAuthority.updatedAt)&&remotePreservesCurrent(remote,currentAuthority))));
    const records=mergeAuthority(remote.length?remote:(current.records||[]),remoteUpdatedAt,preferRemote);
    const hours=(data.hours||[]).map(item=>({date:String(item.work_date||'').slice(0,10),employee:item.employee||'',job:item.job_ref||'',start:String(item.start_time||'').slice(0,5),end:String(item.end_time||'').slice(0,5),breakMinutes:Number(item.break_minutes||0),hours:Number(item.hours_worked||0),notes:item.notes||'',status:item.status||'Submitted'}));
    const mileage=(data.mileage||[]).map(item=>({date:String(item.trip_date||'').slice(0,10),from:item.origin||'',to:item.destination||'',miles:Number(item.miles||0),why:item.purpose||''}));
    const notes=(data.notes||[]).map(item=>({body:item.body||'',author:item.author||'',time:item.created_at?new Date(item.created_at).toLocaleString():''}));
    const syncedAt=remoteWins?remoteUpdatedAt:(currentAuthority?.updatedAt||remoteUpdatedAt||current.lastSync||null);
    const next={...current,records,hours,mileage,notes,live:remoteWins||!currentAuthority,lastSync:syncedAt,currentOperationsUpdatedAt:currentAuthority?.updatedAt||current.currentOperationsUpdatedAt||null,remoteDataUpdatedAt:remoteWins?remoteUpdatedAt:(current.remoteDataUpdatedAt||null)};
    localStorage.setItem(STORAGE_KEY,JSON.stringify(next));
    lastSync=syncedAt;live=next.live;statusMode=remoteWins||!currentAuthority?'live':'current';
    return fingerprintState(next);
  }
  function reloadFor(fingerprint){const prior=sessionStorage.getItem(FINGERPRINT_KEY);if(prior!==fingerprint){sessionStorage.setItem(FINGERPRINT_KEY,fingerprint);location.reload();return true;}return false;}
  async function loadShared(showError=false,reload=true){
    if(authority()){applyAuthorityToLocalState();setStatus(liveLabel());return true;}
    try{const data=await api('/api/data');if(data.localMode){live=false;statusMode='database';setStatus(liveLabel());if(showError)toast('Shared database is not configured');return false;}const fingerprint=mapState(data,{preferRemote:true});if(reload&&reloadFor(fingerprint))return true;setStatus(liveLabel());return true;}
    catch(error){live=false;statusMode=error.status===401?'locked':'offline';setStatus(liveLabel());if(showError&&error.status!==401)toast(error.message);return false;}
  }
  function field(id,label,type='text'){return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}"></div>`;}
  function login(){sheet.innerHTML=`<h2>Open shared Arborwise data</h2><p>Enter the shared Arborwise OS PIN.</p>${field('livePin','Shared PIN','password')}<div class="buttons"><button class="secondary" id="liveCancel">CANCEL</button><button class="primary" id="liveLogin">OPEN</button></div>`;veil.hidden=false;$('liveCancel').onclick=closeSheet;$('liveLogin').onclick=async()=>{try{await api('/api/login',{method:'POST',body:JSON.stringify({pin:$('livePin').value})});closeSheet();sessionStorage.removeItem(BOOT_SYNC_KEY);await sync(false,true);}catch(error){toast(error.message);}};}
  function connections(info){const qb=info.quickbooks||{},google=info.google||{};sheet.innerHTML=`<h2>Shared data connections</h2><div class="connection"><h3>QuickBooks</h3><div class="${qb.authorized?'good':'warn'}">${qb.authorized?'CONNECTED':qb.configured?'RECONNECT REQUIRED':'APP SETUP REQUIRED'}</div><p>${qb.authorized?'Estimates, invoices and payment status can synchronize.':'Authorize the Arborwise app directly; the ChatGPT connection is separate.'}</p>${qb.configured?'<button class="wideButton primary" id="liveQB">CONNECT / RECONNECT QUICKBOOKS</button>':''}</div><div class="connection"><h3>Google</h3><div class="${google.authorized?'good':'warn'}">${google.authorized?'CONNECTED':google.configured?'RECONNECT REQUIRED':'APP SETUP REQUIRED'}</div><p>${google.authorized?'Sheets, Gmail and Calendar can synchronize.':'Authorize Google for the shared schedule.'}</p>${google.configured?'<button class="wideButton primary" id="liveGoogle">CONNECT / RECONNECT GOOGLE</button>':''}</div><div class="buttons"><button class="secondary" id="liveClose">CLOSE</button>${qb.authorized||google.authorized?'<button class="primary" id="liveSync">SYNC NOW</button>':''}</div>`;veil.hidden=false;$('liveClose').onclick=closeSheet;if($('liveQB'))$('liveQB').onclick=()=>location.assign('/api/oauth/quickbooks/start');if($('liveGoogle'))$('liveGoogle').onclick=()=>location.assign('/api/oauth/google/start');if($('liveSync'))$('liveSync').onclick=()=>{closeSheet();sync(false,true);};}
  async function connectionInfo(){return api('/api/connections');}
  async function sync(silent=false,forceRemote=false){
    refresh.disabled=true;refresh.classList.add('spinning');if(!silent)toast('Checking current operations...');
    const before=currentFingerprint();
    try{
      if(authority()&&!forceRemote){applyAuthorityToLocalState();setStatus(liveLabel());return true;}
      let info;try{info=await connectionInfo();}catch(error){if(error.status===401){statusMode='locked';if(!silent){markChecked();toast('Checked • shared sync needs login');login();}return false;}throw error;}
      if(!info.quickbooks?.authorized&&!info.google?.authorized){statusMode='database';if(!silent){markChecked();toast('Checked • no live connection available');connections(info);}return false;}
      const result=await api('/api/sync',{method:'POST'});
      localStorage.setItem(AUTO_SYNC_KEY,String(Date.now()));
      const data=await api('/api/data');
      const fingerprint=mapState(data,{preferRemote:true});
      if(!silent)markChecked();
      sessionStorage.setItem(FINGERPRINT_KEY,fingerprint);
      if(fingerprint!==before){
        if(!silent){const qb=result.summary?.quickbooks||{},google=result.summary?.google||{};toast(`Updated • ${qb.estimates||0} estimates • ${qb.invoices||0} invoices • ${google.sheetRecords||0} sheet records • ${google.calendarRecords||0} schedule records`);}
        setTimeout(()=>location.reload(),180);
      }else if(!silent){
        setStatus(liveLabel());
        toast('Checked now • no changes');
      }
      return true;
    }catch(error){if(!silent){markChecked();toast(`Refresh failed • ${error.message}`);}return false;}
    finally{refresh.disabled=false;refresh.classList.remove('spinning');}
  }
  async function autoSync(){if(authority())return;const last=Number(localStorage.getItem(AUTO_SYNC_KEY)||0);if(!navigator.onLine||Date.now()-last<AUTO_SYNC_INTERVAL)return;await sync(true,true);}

  function value(id){return String($(id)?.value||'').trim();}
  function recordPayload(closedValue){const id=value('r-id')||`${value('r-type')==='job'?'WO':'EST'}-${Date.now()}`;return {id,type:value('r-type')||'est',name:value('r-name'),addr:value('r-address'),phone:value('r-phone'),email:value('r-email'),service:value('r-service'),money:Number(value('r-amount'))||0,category:value('r-category')||'RESIDENTIAL',who:value('r-who'),status:value('r-status'),date:value('r-work')||null,fuDate:value('r-follow')||null,time:value('r-time'),notes:value('r-notes'),closed:Boolean(closedValue),sharedVersion:45};}
  async function saveRecord(payload){try{await api('/api/records',{method:'POST',body:JSON.stringify(payload)});toast('Saved to shared Arborwise data');}catch(error){toast(`Saved on this device; shared save failed: ${error.message}`);}}
  document.addEventListener('click',event=>{const button=event.target.closest?.('button');if(!button)return;if(button.id==='saveRecord'){const wasClosed=/REOPEN/i.test($('toggleComplete')?.textContent||'');const payload=recordPayload(wasClosed);if(payload.name)setTimeout(()=>saveRecord(payload),40);}else if(button.id==='toggleComplete'){const completing=/MARK COMPLETE/i.test(button.textContent);const payload=recordPayload(completing);payload.status=completing?'Complete':'Reopened — Needs Attention';if(payload.name)setTimeout(()=>saveRecord(payload),40);}else if(button.id==='delete'){const id=value('r-id');if(id)setTimeout(async()=>{try{await api('/api/records',{method:'DELETE',body:JSON.stringify({id})});toast('Removed from shared Arborwise data');}catch(error){toast(`Shared delete failed: ${error.message}`);}},40);}else if(button.id==='saveHours'){const start=value('h-start'),end=value('h-end');const [sh,sm]=start.split(':').map(Number),[eh,em]=end.split(':').map(Number);let minutes=(eh*60+em)-(sh*60+sm);if(minutes<0)minutes+=1440;const breakMinutes=Number(value('h-break'))||0;minutes-=breakMinutes;const payload={action:'hours',date:value('h-date'),employee:value('h-employee'),job:value('h-job'),start,end,breakMinutes,hours:Math.max(0,minutes/60),notes:value('h-notes'),status:'Submitted'};if(payload.date&&payload.employee&&start&&end&&payload.hours>0)setTimeout(()=>api('/api/state',{method:'POST',body:JSON.stringify(payload)}).catch(error=>toast(`Shared hours save failed: ${error.message}`)),40);}else if(button.id==='saveMileage'){const payload={action:'mileage',date:value('m-date'),from:value('m-from'),to:value('m-to'),miles:Number(value('m-miles'))||0,why:value('m-why')};if(payload.date&&payload.miles>0)setTimeout(()=>api('/api/state',{method:'POST',body:JSON.stringify(payload)}).catch(error=>toast(`Shared mileage save failed: ${error.message}`)),40);}else if(button.id==='saveNote'){const payload={action:'note',body:value('n-body'),author:value('n-author'),lane:'general'};if(payload.body)setTimeout(()=>api('/api/state',{method:'POST',body:JSON.stringify(payload)}).catch(error=>toast(`Shared note save failed: ${error.message}`)),40);}},true);

  refresh.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();sync(false,true);},true);
  status.addEventListener('click',async event=>{event.preventDefault();event.stopImmediatePropagation();try{connections(await connectionInfo());}catch(error){if(error.status===401)login();else toast(error.message);}},true);
  const connected=new URLSearchParams(location.search).get('connected');if(connected){history.replaceState({},'',location.pathname);setTimeout(()=>{toast(`${connected} connected`);sessionStorage.removeItem(BOOT_SYNC_KEY);sync(false,true);},400);}
  async function boot(){if(authority()){applyAuthorityToLocalState();setStatus(liveLabel());setTimeout(enforceStatus,50);return;}await loadShared(false,true);if(!sessionStorage.getItem(BOOT_SYNC_KEY)){sessionStorage.setItem(BOOT_SYNC_KEY,'1');await sync(true,true);}setTimeout(enforceStatus,50);}
  boot();
  setInterval(autoSync,60*1000);document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')autoSync();});window.addEventListener('online',autoSync);
})();
