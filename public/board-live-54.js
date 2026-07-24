'use strict';
(() => {
  const TIME_ZONE='America/Chicago';
  const CACHE_KEY='arborwise-board-last-good-v54';
  const UI_KEY='arborwise-board-ui-v54';
  const LEGACY_KEY='arborwise-live-board-v24';
  const $=id=>document.getElementById(id);
  const main=$('main'),filters=$('filters'),tabs=$('tabs'),refresh=$('syncButton'),statusButton=$('statusButton');
  const operationsVoice=$('operationsVoice'),veil=$('veil'),sheet=$('sheet'),toastEl=$('toast'),addButton=$('addButton');
  if(!main||!filters||!tabs||!refresh||!statusButton||!veil||!sheet||!toastEl)return;

  if(addButton)addButton.hidden=true;
  const ui=safeParse(localStorage.getItem(UI_KEY),{})||{};
  const state={
    records:[],
    tab:ui.tab||'TODAY',
    filter:ui.filter||'ALL',
    group:ui.group||'ALL',
    dataVersion:null,
    lastReadAt:null,
    stale:true,
    warnings:[],
    message:'Opening Google Sheets…'
  };

  const FILTERS=['ALL','ARBORWISE','DALLAS','KW','UNASSIGNED'];
  const GROUPS=[['ALL','ALL'],['RESIDENTIAL','RESIDENTIAL'],['SBB','SBB MANAGEMENT'],['GOODWIN','GOODWIN'],['KANAM','KANAM']];
  const TABS=['TODAY','ESTIMATES','JOBS','HOLD','COMPLETED'];

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
    .sync.live{background:#e5f4e9;color:#155b2d}
    .sync.stale{background:#fff0d7;color:#7b4400}
    .status.live{background:#e5f4e9;color:#155b2d}
    .status.stale{background:#fff0d7;color:#7b4400}
    .status.locked{background:#f3e7e7;color:#7c2525}
    .pills .pill.hold{background:#fff0d7;color:#7b4400}
    .pills .pill.completed{background:#e5e8e5;color:#465048}
    .pills .pill.scheduled{background:#e8eef7;color:#244f7d}
    .pills .pill.in-progress{background:#e5f4e9;color:#155b2d}
    .pills .pill.scheduling{background:#f1eaf7;color:#65417b}
    @media(max-width:390px){#groupFilters54 button{padding:7px 10px;font-size:12px}}
  `;
  document.head.appendChild(style);

  const groupBar=document.createElement('section');
  groupBar.id='groupFilters54';
  groupBar.setAttribute('aria-label','Management group filters');
  filters.insertAdjacentElement('afterend',groupBar);

  function safeParse(value,fallback){try{return JSON.parse(value);}catch{return fallback;}}
  function esc(value=''){return String(value).replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));}
  function money(value){return Number(value)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)):'';}
  function toast(message){toastEl.textContent=message;toastEl.hidden=false;clearTimeout(toast._timer);toast._timer=setTimeout(()=>toastEl.hidden=true,3600);}
  function closeSheet(){veil.hidden=true;sheet.innerHTML='';}
  veil.onclick=event=>{if(event.target===veil)closeSheet();};
  function saveUi(){localStorage.setItem(UI_KEY,JSON.stringify({tab:state.tab,filter:state.filter,group:state.group}));}

  function centralParts(date=new Date()){
    const parts=new Intl.DateTimeFormat('en-US',{timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(date);
    const map=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
    return {year:Number(map.year),month:Number(map.month),day:Number(map.day)};
  }
  function todayIso(){const p=centralParts();return `${p.year}-${String(p.month).padStart(2,'0')}-${String(p.day).padStart(2,'0')}`;}
  function addDays(iso,count){const [year,month,day]=iso.split('-').map(Number);const date=new Date(Date.UTC(year,month-1,day+count,12));return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;}
  function dateLabel(iso){if(!iso)return '';const [year,month,day]=iso.split('-').map(Number);return new Intl.DateTimeFormat('en-US',{timeZone:'UTC',month:'short',day:'numeric'}).format(new Date(Date.UTC(year,month-1,day,12)));}
  function timeLabel(value){if(!value)return '';return new Date(value).toLocaleTimeString('en-US',{timeZone:TIME_ZONE,hour:'numeric',minute:'2-digit'});}

  function isCompleted(record){return record.status==='Completed'||Boolean(record.closed&&record.status!=='Cancelled');}
  function isCancelled(record){return record.status==='Cancelled';}
  function isHold(record){return record.status==='Hold';}
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
    const start=todayIso(),end=addDays(start,7);
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
        if(item.type==='job')return Boolean(due)&&due<=end;
        return Boolean(due)&&due<=end;
      });
    }
    return rows.sort((a,b)=>{
      const aRank=isCompleted(a)?90:isCancelled(a)?95:isHold(a)?80:10;
      const bRank=isCompleted(b)?90:isCancelled(b)?95:isHold(b)?80:10;
      return aRank-bRank||dueDate(a).localeCompare(dueDate(b))||String(a.workTime||'').localeCompare(String(b.workTime||''))||String(a.address||a.name||'').localeCompare(String(b.address||b.name||''));
    });
  }

  function statusClass(status=''){return String(status).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
  function recordCard(record){
    const due=dueDate(record);
    const classes=['card',record.type==='job'?'job':'estimate'];
    if(isHold(record))classes.push('hold');
    if(isCompleted(record))classes.push('completed');
    if(isCancelled(record))classes.push('cancelled');
    const actions=[];
    if(record.phone)actions.push(`<a href="tel:${esc(record.phone)}">CALL</a>`,`<a href="sms:${esc(record.phone)}">TEXT</a>`);
    if(record.email)actions.push(`<a href="mailto:${esc(record.email)}">EMAIL</a>`);
    if(record.address)actions.push(`<a href="https://maps.google.com/?q=${encodeURIComponent(record.address)}" target="_blank" rel="noopener">MAP</a>`);
    const completion=record.completionType?` • ${String(record.completionType).toUpperCase()}`:'';
    const costLine=record.type==='job'&&(record.laborCost||record.otherCost)?`<div class="sourceLine">Labor ${money(record.laborCost)||'$0.00'} • Other ${money(record.otherCost)||'$0.00'}</div>`:'';
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
    filters.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.filter=button.dataset.filter;saveUi();render();});
    groupBar.innerHTML=GROUPS.map(([value,label])=>`<button class="${state.group===value?'on':''}" data-group="${value}">${label}</button>`).join('');
    groupBar.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.group=button.dataset.group;saveUi();render();});
  }
  function renderTabs(){
    tabs.innerHTML=TABS.map(value=>`<button class="${state.tab===value?'on':''}" data-tab="${value}">${value}</button>`).join('');
    tabs.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.tab=button.dataset.tab;saveUi();render();window.scrollTo(0,0);});
  }
  function titleFor(rows){
    const start=todayIso(),end=addDays(start,7);
    if(state.tab==='TODAY'){
      const remaining=rows.filter(item=>!isCompleted(item)&&!isCancelled(item)).length;
      const completed=rows.filter(isCompleted).length;
      return `TODAY + 7 DAYS • ${dateLabel(start)}–${dateLabel(end)} • ${remaining} remaining${completed?` • ${completed} completed`:''}`;
    }
    if(state.tab==='HOLD')return 'HOLD — VERIFY BEFORE SCHEDULING';
    if(state.tab==='COMPLETED')return 'COMPLETED & CANCELLED';
    return state.tab;
  }
  function renderRecords(){
    const rows=visibleRecords();
    const warning=state.warnings.length?`<div class="dataWarning">DATA REVIEW: ${esc(state.warnings.slice(0,3).join(' • '))}${state.warnings.length>3?` • +${state.warnings.length-3} more`:''}</div>`:'';
    main.innerHTML=`<div class="title"><span>${esc(titleFor(rows))}</span><span class="count">${rows.length}</span></div>${warning}${rows.length?rows.map(recordCard).join(''):'<div class="empty">Nothing here for these filters.</div>'}`;
  }
  function renderStatus(){
    const label=state.stale?(state.lastReadAt?`STALE • LAST GOOD ${timeLabel(state.lastReadAt)}`:'NOT CONNECTED'):`LIVE SHEET • ${timeLabel(state.lastReadAt)}`;
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
    operationsVoice.textContent=state.records.length?`${active} active today • ${completed} completed today • ${holds} on hold`:(state.message||'No operational data loaded.');
  }
  function render(){
    renderFilters();renderTabs();renderStatus();renderRecords();
    $('dateLine').textContent=new Intl.DateTimeFormat('en-US',{timeZone:TIME_ZONE,weekday:'long',month:'long',day:'numeric',year:'numeric'}).format(new Date());
  }

  function cachePayload(payload){
    localStorage.setItem(CACHE_KEY,JSON.stringify({items:payload.items,dataVersion:payload.dataVersion,readAt:payload.readAt,warnings:payload.warnings||[]}));
  }
  function loadLastGood(){
    const cached=safeParse(localStorage.getItem(CACHE_KEY),null);
    if(!cached||!Array.isArray(cached.items)||!cached.items.length)return false;
    state.records=cached.items;
    state.dataVersion=cached.dataVersion||null;
    state.lastReadAt=cached.readAt||null;
    state.warnings=Array.isArray(cached.warnings)?cached.warnings:[];
    state.stale=true;
    state.message='Showing the last successful Sheet read.';
    publishLegacyState();
    return true;
  }
  function publishLegacyState(){
    const legacy=safeParse(localStorage.getItem(LEGACY_KEY),{})||{};
    legacy.records=state.records;
    legacy.live=!state.stale;
    legacy.lastSync=state.lastReadAt;
    legacy.liveSheetVersion=state.dataVersion;
    localStorage.setItem(LEGACY_KEY,JSON.stringify(legacy));
    window.ARBORWISE_CURRENT_OPERATIONS={updatedAt:state.lastReadAt,records:state.records};
    window.dispatchEvent(new CustomEvent('arborwise:data-ready',{detail:{version:state.dataVersion,stale:state.stale}}));
  }

  async function request(path,options={}){
    const response=await fetch(path,{credentials:'same-origin',cache:'no-store',headers:{'Content-Type':'application/json',...(options.headers||{})},...options});
    let data={};
    try{data=await response.json();}catch{}
    if(!response.ok){const error=new Error(data.error||`Request failed ${response.status}`);error.status=response.status;throw error;}
    return data;
  }
  function login(){
    statusButton.textContent='LOGIN REQUIRED';
    statusButton.classList.add('locked');
    sheet.innerHTML=`<h2>Open Arborwise management board</h2><p class="loginHelp">Enter the Arborwise OS PIN. Customer and financial data stay behind this login.</p><div class="field"><label for="boardPin">Arborwise OS PIN</label><input id="boardPin" type="password" autocomplete="current-password"></div><div class="buttons"><button class="secondary" id="loginCancel">CANCEL</button><button class="primary" id="loginOpen">OPEN BOARD</button></div>`;
    veil.hidden=false;
    $('loginCancel').onclick=closeSheet;
    const submit=async()=>{
      const pin=String($('boardPin').value||'');
      if(!pin){toast('Enter the Arborwise OS PIN');return;}
      $('loginOpen').disabled=true;
      try{await request('/api/login',{method:'POST',body:JSON.stringify({pin})});closeSheet();await refreshBoard({manual:false});}
      catch(error){toast(error.message);$('loginOpen').disabled=false;}
    };
    $('loginOpen').onclick=submit;
    $('boardPin').addEventListener('keydown',event=>{if(event.key==='Enter')submit();});
    setTimeout(()=>$('boardPin')?.focus(),60);
  }

  async function refreshBoard({manual=false}={}){
    const previousVersion=state.dataVersion;
    refresh.disabled=true;
    refresh.classList.add('spinning');
    if(manual)toast('Reading Google Sheets…');
    try{
      const payload=await request(`/api/board?ts=${Date.now()}`);
      if(!Array.isArray(payload.items))throw new Error('The Sheet feed returned an invalid response');
      state.records=payload.items;
      state.dataVersion=payload.dataVersion||null;
      state.lastReadAt=payload.readAt||new Date().toISOString();
      state.warnings=Array.isArray(payload.warnings)?payload.warnings:[];
      state.stale=false;
      state.message='Live Google Sheet data loaded.';
      cachePayload(payload);
      publishLegacyState();
      render();
      if(manual)toast(previousVersion&&previousVersion===state.dataVersion?'Sheet checked • no changes':'Updated from Google Sheets');
      return true;
    }catch(error){
      if(error.status===401){
        if(!state.records.length)loadLastGood();
        state.stale=true;
        state.message='Login is required to read Google Sheets.';
        render();
        login();
        return false;
      }
      if(!state.records.length)loadLastGood();
      state.stale=true;
      state.message=`Live Sheet read failed: ${error.message}`;
      render();
      toast(`Refresh failed • ${error.message}`);
      return false;
    }finally{
      refresh.disabled=false;
      refresh.classList.remove('spinning');
      document.body.classList.remove('booting');
    }
  }

  refresh.onclick=()=>refreshBoard({manual:true});
  statusButton.onclick=()=>toast(state.stale?(state.lastReadAt?`Stale • last successful Sheet read ${new Date(state.lastReadAt).toLocaleString('en-US',{timeZone:TIME_ZONE})}`:'Login required before data can load'):`Live Google Sheet data • read ${new Date(state.lastReadAt).toLocaleString('en-US',{timeZone:TIME_ZONE})}`);

  loadLastGood();
  render();
  refreshBoard({manual:false});
  setInterval(()=>refreshBoard({manual:false}),5*60*1000);
})();
