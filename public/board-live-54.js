'use strict';
(() => {
  const TIME_ZONE='America/Chicago';
  const CACHE_KEY='arborwise-board-last-good-v57';
  const UI_KEY='arborwise-board-ui-v57';
  const LEGACY_KEY='arborwise-live-board-v24';
  const $=id=>document.getElementById(id);
  const main=$('main');
  const filters=$('filters');
  const tabs=$('tabs');
  const refresh=$('syncButton');
  const statusButton=$('statusButton');
  const operationsVoice=$('operationsVoice');
  const veil=$('veil');
  const sheet=$('sheet');
  const toastEl=$('toast');
  const addButton=$('addButton');
  if(!main||!filters||!tabs||!refresh||!statusButton||!operationsVoice||!veil||!sheet||!toastEl)return;

  if(addButton)addButton.hidden=true;
  const ui=safeParse(localStorage.getItem(UI_KEY),{})||{};
  let authorizedThisLoad=false;
  let refreshInFlight=false;
  const state={
    records:[],
    tab:ui.tab||'TODAY',
    filter:ui.filter||'ALL',
    group:ui.group||'ALL',
    dataVersion:null,
    lastReadAt:null,
    stale:true,
    warnings:[],
    message:'Opening live Arborwise operations…',
    sourceCounts:{}
  };

  const FILTERS=['ALL','ARBORWISE','DALLAS','KW','UNASSIGNED'];
  const GROUPS=[['ALL','ALL'],['RESIDENTIAL','RESIDENTIAL'],['SBB','SBB MANAGEMENT'],['GOODWIN','GOODWIN'],['KANAM','KANAM']];
  const TABS=['TODAY','ESTIMATES','JOBS','HOLD','COMPLETED'];
  const icons={
    call:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.27.55 3.46.55A1.14 1.14 0 0 1 21 16.65V20a1.14 1.14 0 0 1-1.14 1.14A17 17 0 0 1 2.86 4.14 1.14 1.14 0 0 1 4 3h3.35A1.14 1.14 0 0 1 8.5 4.14c0 1.2.19 2.36.55 3.46a1 1 0 0 1-.25 1z"/></svg>',
    text:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 5h10v2H7zm0 4h7v2H7z"/></svg>',
    email:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm9 7 8-5H4z"/></svg>',
    map:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11a2.5 2.5 0 0 0 0-5z"/></svg>'
  };

  const style=document.createElement('style');
  style.textContent=`
    #groupFilters54{display:flex;gap:7px;overflow-x:auto;padding:8px 10px;background:#ebe9df;border-bottom:1px solid #d9d6ca}
    #groupFilters54 button{white-space:nowrap;border:1.5px solid #17402b;border-radius:999px;background:#fff;color:#17402b;padding:8px 12px;font-weight:800}
    #groupFilters54 button.on{background:#17402b;color:#fff}
    .card.hold{border-left:7px solid #a76a22;background:#fff9ef}
    .card.completed{opacity:.62;filter:grayscale(.78);background:#f0f0ec}
    .card.completed .name{text-decoration:line-through}
    .card.cancelled{opacity:.55;background:#f3efef}
    .sourceLine{font-size:12px;color:#5d675f;margin:7px 0 0;font-weight:700}
    .dataWarning{margin:10px 0;padding:10px 12px;border-radius:12px;background:#fff2cf;border:1px solid #c9972f;color:#664400;font-weight:800}
    .loginHelp{color:#5d675f;line-height:1.45}
    .readonlyNote{font-size:12px;color:#687068;margin-top:8px}
    .sync.live,.status.live{background:#e5f4e9;color:#155b2d}
    .sync.stale,.status.stale{background:#fff0d7;color:#7b4400}
    .status.locked{background:#f3e7e7;color:#7c2525}
    .pills .pill.hold{background:#fff0d7;color:#7b4400}
    .pills .pill.completed{background:#e5e8e5;color:#465048}
    .pills .pill.scheduled{background:#e8eef7;color:#244f7d}
    .pills .pill.in-progress{background:#e5f4e9;color:#155b2d}
    .pills .pill.scheduling{background:#f1eaf7;color:#65417b}
    .recordActions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px;padding-top:11px;border-top:1px solid #e2e0d6}
    .recordAction{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:12px;text-decoration:none;border:1.5px solid #17402b;color:#17402b;background:#fff;position:relative;touch-action:manipulation}
    .recordAction svg{display:block;width:25px;height:25px;fill:currentColor}
    .recordAction span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    .recordAction.text{border-color:#e4590c;color:#b8490a}
    .recordAction.map{border-color:#f59f0a;color:#755000}
    .recordAction.email{background:#17402b;color:#fff}
    .recordAction:active{transform:scale(.96)}
    @media(max-width:390px){
      #groupFilters54 button{padding:7px 10px;font-size:12px}
      .recordActions{gap:6px}
      .recordAction{min-height:44px}
      .recordAction svg{width:22px;height:22px}
    }
  `;
  document.head.appendChild(style);

  const groupBar=document.createElement('section');
  groupBar.id='groupFilters54';
  groupBar.setAttribute('aria-label','Management group filters');
  filters.insertAdjacentElement('afterend',groupBar);

  function safeParse(value,fallback){try{return JSON.parse(value);}catch{return fallback;}}
  function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
  function money(value){return Number(value)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)):'';}
  function toast(message){toastEl.textContent=message;toastEl.hidden=false;clearTimeout(toast._timer);toast._timer=setTimeout(()=>{toastEl.hidden=true;},5200);}
  function closeSheet(){veil.hidden=true;sheet.innerHTML='';}
  veil.onclick=event=>{if(event.target===veil)closeSheet();};
  function saveUi(){localStorage.setItem(UI_KEY,JSON.stringify({tab:state.tab,filter:state.filter,group:state.group}));}
  function centralParts(date=new Date()){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
    const map=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
    return {year:Number(map.year),month:Number(map.month),day:Number(map.day)};
  }
  function todayIso(){const parts=centralParts();return `${parts.year}-${String(parts.month).padStart(2,'0')}-${String(parts.day).padStart(2,'0')}`;}
  function addDays(iso,count){
    const [year,month,day]=iso.split('-').map(Number);
    const date=new Date(Date.UTC(year,month-1,day+count,12));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
  }
  function dateLabel(iso){
    if(!iso)return '';
    const [year,month,day]=iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en-US',{timeZone:'UTC',month:'short',day:'numeric'}).format(new Date(Date.UTC(year,month-1,day,12)));
  }
  function timeLabel(value){
    if(!value)return '';
    return new Date(value).toLocaleTimeString('en-US',{timeZone:TIME_ZONE,hour:'numeric',minute:'2-digit'});
  }
  function isCompleted(record){return record.status==='Completed'||Boolean(record.closed&&record.status!=='Cancelled');}
  function isCancelled(record){return record.status==='Cancelled';}
  function isHold(record){return record.status==='Hold';}
  function isScheduling(record){return record.type==='job'&&/scheduling|approved|accepted/i.test(String(record.status||record.rawStatus||''));}
  function crewBucket(record){
    const who=String(record.who||'').toUpperCase();
    if(!who||who==='UNASSIGNED')return 'UNASSIGNED';
    if(who.includes('KW'))return 'KW';
    if(who.includes('DALLAS'))return 'DALLAS';
    return 'ARBORWISE';
  }
  function matches(record){
    if(state.filter!=='ALL'&&crewBucket(record)!==state.filter)return false;
    const category=String(record.category||'RESIDENTIAL').toUpperCase();
    if(state.group==='ALL')return true;
    if(state.group==='SBB')return category==='SBB'||category==='KW';
    return category===state.group;
  }
  function dueDate(record){return record.workDate||record.followUp||'';}
  function visibleRecords(){
    const start=todayIso();
    const end=addDays(start,7);
    let rows=state.records.filter(matches);
    if(state.tab==='ESTIMATES')rows=rows.filter(item=>item.type==='est'&&!item.closed);
    if(state.tab==='JOBS')rows=rows.filter(item=>item.type==='job'&&!item.closed&&!isHold(item));
    if(state.tab==='HOLD')rows=rows.filter(item=>isHold(item));
    if(state.tab==='COMPLETED')rows=rows.filter(item=>isCompleted(item)||isCancelled(item));
    if(state.tab==='TODAY'){
      rows=rows.filter(item=>{
        const due=dueDate(item);
        if(isHold(item)||isCancelled(item))return false;
        if(isCompleted(item))return item.workDate===start;
        if(!due)return isScheduling(item);
        return due<=end;
      });
    }
    return rows.sort((a,b)=>{
      const aRank=isScheduling(a)&&!dueDate(a)?5:isCompleted(a)?90:isCancelled(a)?95:isHold(a)?80:10;
      const bRank=isScheduling(b)&&!dueDate(b)?5:isCompleted(b)?90:isCancelled(b)?95:isHold(b)?80:10;
      return aRank-bRank
        ||dueDate(a).localeCompare(dueDate(b))
        ||String(a.workTime||'').localeCompare(String(b.workTime||''))
        ||String(a.address||a.name||'').localeCompare(String(b.address||b.name||''));
    });
  }
  function statusClass(status=''){return String(status).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function action(kind,href,label,extra=''){
    return `<a class="recordAction ${kind}" href="${href}" aria-label="${esc(label)}" title="${esc(label)}" ${extra}>${icons[kind]}<span>${kind.toUpperCase()}</span></a>`;
  }
  function recordCard(record){
    const due=dueDate(record);
    const classes=['card',record.type==='job'?'job':'estimate'];
    if(isHold(record))classes.push('hold');
    if(isCompleted(record))classes.push('completed');
    if(isCancelled(record))classes.push('cancelled');
    const actions=[];
    const safePhone=String(record.phone||'').replace(/[^0-9+]/g,'');
    if(safePhone){
      actions.push(action('call',`tel:${esc(safePhone)}`,`Call ${record.name||'customer'}`));
      actions.push(action('text',`sms:${esc(safePhone)}`,`Text ${record.name||'customer'}`));
    }
    if(record.email)actions.push(action('email',`mailto:${esc(record.email)}`,`Email ${record.name||'customer'}`));
    if(record.address){
      actions.push(action(
        'map',
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(record.address)}`,
        `Map ${record.name||'customer'}`,
        'target="_blank" rel="noopener"'
      ));
    }
    const completion=record.completionType?` • ${String(record.completionType).toUpperCase()}`:'';
    const costLine=record.type==='job'&&(record.laborCost||record.otherCost)
      ? `<div class="sourceLine">Labor ${money(record.laborCost)||'$0.00'} • Other ${money(record.otherCost)||'$0.00'}</div>`
      : '';
    return `<article class="${classes.join(' ')}">
      <div class="top"><div><span class="tag">${record.type==='job'?'JOB':'ESTIMATE'}</span><span class="recordId">${esc(record.id)}</span></div><div class="money">${money(record.amount)}</div></div>
      <div class="name">${esc(record.name)}</div>
      ${record.address?`<div class="address">${esc(record.address)}</div>`:''}
      <div class="service">${esc(record.service||'')}</div>
      ${record.notes?`<div class="notes">${esc(record.notes)}</div>`:''}
      ${costLine}
      <div class="pills"><span class="pill ${statusClass(record.status)}">${esc(record.status||'Open')}${completion}</span><span class="pill who">${esc(record.who||'Unassigned')}</span>${due?`<span class="pill date">${esc(due)}${record.workTime?' • '+esc(record.workTime):''}</span>`:''}</div>
      ${actions.length?`<div class="recordActions">${actions.join('')}</div>`:''}
      <div class="readonlyNote">Read-only • Source: ${esc(record.source||'Google Sheets')}</div>
    </article>`;
  }
  function renderFilters(){
    filters.innerHTML=FILTERS.map(value=>`<button class="${state.filter===value?'on':''}" data-filter="${value}">${value}</button>`).join('');
    filters.querySelectorAll('button').forEach(button=>{
      button.onclick=()=>{state.filter=button.dataset.filter;saveUi();render();};
    });
    groupBar.innerHTML=GROUPS.map(([value,label])=>`<button class="${state.group===value?'on':''}" data-group="${value}">${label}</button>`).join('');
    groupBar.querySelectorAll('button').forEach(button=>{
      button.onclick=()=>{state.group=button.dataset.group;saveUi();render();};
    });
  }
  function renderTabs(){
    tabs.innerHTML=TABS.map(value=>`<button class="${state.tab===value?'on':''}" data-tab="${value}">${value}</button>`).join('');
    tabs.querySelectorAll('button').forEach(button=>{
      button.onclick=()=>{state.tab=button.dataset.tab;saveUi();render();window.scrollTo(0,0);};
    });
  }
  function titleFor(rows){
    const start=todayIso(),end=addDays(start,7);
    if(state.tab==='TODAY'){
      const remaining=rows.filter(item=>!isCompleted(item)&&!isCancelled(item)).length;
      const completed=rows.filter(isCompleted).length;
      const unscheduled=rows.filter(item=>isScheduling(item)&&!dueDate(item)).length;
      return `TODAY + 7 DAYS • ${dateLabel(start)}–${dateLabel(end)} • ${remaining} remaining${unscheduled?` • ${unscheduled} unscheduled`:''}${completed?` • ${completed} completed`:''}`;
    }
    if(state.tab==='HOLD')return 'HOLD — VERIFY BEFORE SCHEDULING';
    if(state.tab==='COMPLETED')return 'COMPLETED & CANCELLED';
    return state.tab;
  }
  function renderRecords(){
    const rows=visibleRecords();
    const warning=state.warnings.length
      ? `<div class="dataWarning">DATA REVIEW: ${esc(state.warnings.slice(0,3).join(' • '))}${state.warnings.length>3?` • +${state.warnings.length-3} more`:''}</div>`
      : '';
    main.innerHTML=`<div class="title"><span>${esc(titleFor(rows))}</span><span class="count">${rows.length}</span></div>${warning}${rows.length?rows.map(recordCard).join(''):'<div class="empty">Nothing here for these filters.</div>'}`;
    main.querySelectorAll('.recordAction').forEach(link=>link.addEventListener('click',event=>event.stopPropagation()));
  }
  function renderStatus(){
    const label=state.stale
      ? (state.lastReadAt?`STALE • LAST GOOD ${timeLabel(state.lastReadAt)}`:'NOT CONNECTED')
      : `LIVE • ${state.records.length} RECORDS • ${timeLabel(state.lastReadAt)}`;
    statusButton.textContent=label;
    statusButton.classList.toggle('live',!state.stale);
    statusButton.classList.toggle('stale',state.stale&&Boolean(state.lastReadAt));
    statusButton.classList.toggle('locked',state.stale&&!state.lastReadAt);
    refresh.classList.toggle('live',!state.stale);
    refresh.classList.toggle('stale',state.stale);

    const today=todayIso();
    const todayRows=state.records.filter(item=>item.workDate===today);
    const active=todayRows.filter(item=>!isCompleted(item)&&!isHold(item)&&!isCancelled(item)).length;
    const completed=todayRows.filter(isCompleted).length;
    const holds=state.records.filter(isHold).length;
    const unscheduled=state.records.filter(item=>isScheduling(item)&&!dueDate(item)&&!item.closed).length;
    const counts=Object.entries(state.sourceCounts||{}).map(([name,count])=>`${count} ${name}`).join(' • ');
    operationsVoice.textContent=state.records.length
      ? `${active} active today • ${completed} completed today • ${unscheduled} unscheduled • ${holds} on hold${counts?` • ${counts}`:''}`
      : (state.message||'No operational data loaded.');
  }
  function render(){
    renderFilters();
    renderTabs();
    renderStatus();
    renderRecords();
    $('dateLine').textContent=new Intl.DateTimeFormat('en-US',{
      timeZone:TIME_ZONE,weekday:'long',month:'long',day:'numeric',year:'numeric'
    }).format(new Date());
  }
  function cachePayload(payload){
    try{
      localStorage.setItem(CACHE_KEY,JSON.stringify({
        items:payload.items,
        dataVersion:payload.dataVersion,
        readAt:payload.readAt,
        warnings:payload.warnings||[],
        sourceCounts:payload.sourceCounts||{}
      }));
    }catch{}
  }
  function clearLegacyState(){
    const legacy=safeParse(localStorage.getItem(LEGACY_KEY),{})||{};
    legacy.records=[];
    legacy.live=false;
    legacy.lastSync=null;
    legacy.liveSheetVersion=null;
    try{localStorage.setItem(LEGACY_KEY,JSON.stringify(legacy));}catch{}
    window.ARBORWISE_CURRENT_OPERATIONS=null;
    window.dispatchEvent(new CustomEvent('arborwise:data-cleared'));
  }
  function loadLastGood(){
    if(!authorizedThisLoad)return false;
    const cached=safeParse(localStorage.getItem(CACHE_KEY),null);
    if(!cached||!Array.isArray(cached.items)||!cached.items.length)return false;
    state.records=cached.items;
    state.dataVersion=cached.dataVersion||null;
    state.lastReadAt=cached.readAt||null;
    state.warnings=Array.isArray(cached.warnings)?cached.warnings:[];
    state.sourceCounts=cached.sourceCounts||{};
    state.stale=true;
    state.message='Showing the last successful Arborwise operations read.';
    publishLegacyState();
    return true;
  }
  function publishLegacyState(){
    const legacy=safeParse(localStorage.getItem(LEGACY_KEY),{})||{};
    legacy.records=state.records;
    legacy.live=!state.stale;
    legacy.lastSync=state.lastReadAt;
    legacy.liveSheetVersion=state.dataVersion;
    try{localStorage.setItem(LEGACY_KEY,JSON.stringify(legacy));}catch{}
    window.ARBORWISE_CURRENT_OPERATIONS={updatedAt:state.lastReadAt,records:state.records};
    window.dispatchEvent(new CustomEvent('arborwise:data-ready',{
      detail:{version:state.dataVersion,stale:state.stale}
    }));
  }
  async function request(path,options={},timeoutMs=30000){
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),timeoutMs);
    try{
      const response=await fetch(path,{
        credentials:'same-origin',
        cache:'no-store',
        headers:{'Content-Type':'application/json',...(options.headers||{})},
        ...options,
        signal:options.signal||controller.signal
      });
      let data={};
      try{data=await response.json();}catch{}
      if(!response.ok){
        const error=new Error(data.error||`Request failed ${response.status}`);
        error.status=response.status;
        throw error;
      }
      return data;
    }catch(error){
      if(error.name==='AbortError'){
        const timeoutError=new Error('The server took too long to answer');
        timeoutError.status=504;
        throw timeoutError;
      }
      throw error;
    }finally{
      clearTimeout(timer);
    }
  }
  function login(){
    statusButton.textContent='LOGIN REQUIRED';
    statusButton.classList.add('locked');
    sheet.innerHTML=`<h2>Open Arborwise management board</h2>
      <p class="loginHelp">Enter the Arborwise OS PIN. Customer and financial data stay behind this login.</p>
      <div class="field"><label for="boardPin">Arborwise OS PIN</label><input id="boardPin" type="password" autocomplete="current-password"></div>
      <div class="buttons"><button class="secondary" id="loginCancel">CANCEL</button><button class="primary" id="loginOpen">OPEN BOARD</button></div>`;
    veil.hidden=false;
    $('loginCancel').onclick=closeSheet;
    const submit=async()=>{
      const pin=String($('boardPin').value||'');
      if(!pin){toast('Enter the Arborwise OS PIN');return;}
      $('loginOpen').disabled=true;
      try{
        await request('/api/login',{method:'POST',body:JSON.stringify({pin})},20000);
        closeSheet();
        await refreshBoard({manual:false});
      }catch(error){
        toast(error.message);
        $('loginOpen').disabled=false;
      }
    };
    $('loginOpen').onclick=submit;
    $('boardPin').addEventListener('keydown',event=>{if(event.key==='Enter')submit();});
    setTimeout(()=>$('boardPin')?.focus(),60);
  }
  function syncSummaryText(summary){
    if(!summary)return '';
    const connected=[];
    const failed=[];
    if(summary.google?.status==='success')connected.push('Google');
    if(summary.quickbooks?.status==='success')connected.push('QuickBooks');
    if(summary.google?.status==='error')failed.push('Google');
    if(summary.quickbooks?.status==='error')failed.push('QuickBooks');
    if(failed.length)return `${failed.join(' and ')} sync had an error`;
    if(connected.length)return `${connected.join(' and ')} synchronized`;
    return 'No provider connection is authorized yet';
  }
  async function refreshBoard({manual=false}={}){
    if(refreshInFlight)return false;
    refreshInFlight=true;
    const previousVersion=state.dataVersion;
    refresh.disabled=true;
    refresh.classList.add('spinning');
    let syncWarning='';
    let syncSummary=null;
    if(manual)toast('Refreshing Google, Calendar, and QuickBooks…');

    try{
      if(manual){
        try{
          const synced=await request('/api/sync?scheduled=board-refresh',{method:'POST'},55000);
          syncSummary=synced.summary||null;
        }catch(error){
          if(error.status===401)throw error;
          syncWarning=`Provider sync: ${error.message}`;
        }
      }

      const payload=await request(`/api/board?ts=${Date.now()}`,{},30000);
      if(!Array.isArray(payload.items))throw new Error('The live feed returned an invalid response');

      authorizedThisLoad=true;
      state.records=payload.items;
      state.dataVersion=payload.dataVersion||null;
      state.lastReadAt=payload.readAt||new Date().toISOString();
      state.warnings=Array.isArray(payload.warnings)?payload.warnings:[];
      if(syncWarning)state.warnings.unshift(syncWarning);
      state.sourceCounts=payload.sourceCounts||{};
      state.stale=Array.isArray(payload.staleSources)&&payload.staleSources.length>0;
      state.message=state.stale?'Live providers are partially unavailable.':'Live operations data loaded.';
      cachePayload({...payload,warnings:state.warnings});
      publishLegacyState();
      render();

      if(manual){
        const changed=!previousVersion||previousVersion!==state.dataVersion;
        const providerText=syncSummaryText(syncSummary);
        const resultText=changed
          ? `Updated • ${state.records.length} records`
          : `Checked • ${state.records.length} records • no board changes`;
        toast(providerText?`${resultText} • ${providerText}`:resultText);
        window.dispatchEvent(new CustomEvent('arborwise:connections-changed'));
      }
      return true;
    }catch(error){
      if(error.status===401){
        authorizedThisLoad=false;
        state.records=[];
        state.dataVersion=null;
        state.lastReadAt=null;
        state.warnings=[];
        state.sourceCounts={};
        state.stale=true;
        state.message='Login is required to read Arborwise operations.';
        clearLegacyState();
        render();
        login();
        return false;
      }
      if(error.status)authorizedThisLoad=true;
      if(!state.records.length&&authorizedThisLoad)loadLastGood();
      state.stale=true;
      state.message=`Live read failed: ${error.message}`;
      render();
      toast(`Refresh failed • ${error.message}`);
      return false;
    }finally{
      refreshInFlight=false;
      refresh.disabled=false;
      refresh.classList.remove('spinning');
      document.body.classList.remove('booting');
    }
  }

  refresh.onclick=()=>refreshBoard({manual:true});
  clearLegacyState();
  render();
  refreshBoard({manual:false});
  setInterval(()=>refreshBoard({manual:false}),5*60*1000);
  window.addEventListener('online',()=>refreshBoard({manual:false}));
  document.addEventListener('visibilitychange',()=>{
    if(document.visibilityState==='visible')refreshBoard({manual:false});
  });
})();
