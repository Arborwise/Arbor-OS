'use strict';
(() => {
  if(typeof state==='undefined'||!Array.isArray(state.records))return;

  const snapshot=[
    {id:'2019',type:'est',name:'Sicily Laguna Azure',address:'3004 Cremini Falls, Princeton, TX',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',closed:false},
    {id:'2018',type:'est',name:'Sicily Laguna Azure',address:'3007 Isla Terrace, Princeton, TX',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',closed:false},
    {id:'2017',type:'est',name:'Venetian HOA',address:'437 Hoot Owl, Celina, TX',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',closed:false},
    {id:'2016',type:'est',name:'Venetian HOA',address:'1737 Barnwood, Celina, TX',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'Approved mowing assigned to KW Landscaping for Friday, July 24, 2026.',closed:false},
    {id:'2015',type:'est',name:'Sicily Laguna Azure',address:'517 Parrino Parkway, Princeton, TX',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false},
    {id:'2014',type:'est',name:'Sicily Laguna Azure',address:'3116 Lucia Way, Princeton, TX',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false},
    {id:'2013',type:'est',name:'Sicily Laguna Azure',address:'3016 Isla Terrace, Princeton, TX',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false},
    {id:'2012',type:'est',name:'Sicily Laguna Azure',address:'3107 Lucia Way, Princeton, TX',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false},
    {id:'2011',type:'est',name:'Sicily Laguna Azure',address:'2902 Cremini Falls, Princeton, TX',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false},
    {id:'2010',type:'est',name:'Sicily Laguna Azure',address:'3110 Giovanni Way, Princeton, TX',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Approved tree work; not scheduled yet.',closed:false},
    {id:'TASK-20260722-REVIEW',type:'job',name:'Arborwise Operations',address:'',service:'Review today’s open follow-ups, approved work, crew assignments, and plant-health opportunities.',amount:0,category:'GREG',who:'Greg',status:'Due Today',workDate:'2026-07-22',workTime:'8:00 AM – 8:20 AM',followUp:'',notes:'Google Calendar: Arborwise Daily Follow-Up Review.',closed:false},
    {id:'TASK-20260723-REVIEW',type:'job',name:'Arborwise Operations',address:'',service:'Review overdue calls, estimates waiting for decisions, approved unscheduled work, and Friday crew readiness.',amount:0,category:'GREG',who:'Greg',status:'Scheduled',workDate:'2026-07-23',workTime:'8:00 AM – 8:20 AM',followUp:'',notes:'Google Calendar: Arborwise Daily Follow-Up Review.',closed:false},
    {id:'TASK-20260724-REVIEW',type:'job',name:'Arborwise Operations',address:'',service:'Friday operations review: confirm KW mowing route, open follow-ups, and Saturday crew readiness.',amount:0,category:'GREG',who:'Greg',status:'Scheduled',workDate:'2026-07-24',workTime:'8:00 AM – 8:20 AM',followUp:'',notes:'Google Calendar: Arborwise Daily Follow-Up Review.',closed:false},
    {id:'2002',type:'est',name:'SBB Management',address:'407 Walnut Drive, Murphy, TX',service:'Remove mature live oak by controlled rigging; grind stump and surface roots; haul off debris.',amount:4113.50,category:'SBB',who:'Greg',status:'Follow-Up Due',workDate:'',workTime:'',followUp:'2026-07-22',notes:'QuickBooks Estimate 2002. Follow-up remains open.',closed:false},
    {id:'2004',type:'est',name:'Jessica Farias',address:'236 Creekview Dr, Anna, TX 75409',service:'Prune two live oaks: interior cleanout, deadwood removal, canopy balance/elevation, and structure clearance.',amount:757.75,category:'ARBORWISE',who:'Greg',status:'Follow-Up Due',workDate:'',workTime:'',followUp:'2026-07-22',notes:'QuickBooks Estimate 2004. Follow-up remains open.',closed:false},
    {id:'2007',type:'est',name:'Deborah Stock',address:'',service:'Remove dead front-yard tree, cut stump flush, apply stump treatment, clean up and haul off debris.',amount:703.63,category:'ARBORWISE',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Accepted July 20. Approved work; not scheduled yet.',closed:false},
    {id:'2008',type:'est',name:'Susan Garrison',address:'',service:'NutriRoot soil treatments for three oak trees as an ongoing plant-health-care program.',amount:1136.63,category:'ARBORWISE',who:'Greg',status:'Estimate Sent',workDate:'',workTime:'',followUp:'2026-07-23',notes:'QuickBooks Estimate 2008 is pending. Follow up Thursday, July 23.',closed:false},
    {id:'WO-1977',type:'job',name:'Dana & Tom Pierson',address:'9905 County Road 626, Blue Ridge, TX 75424',service:'Full-day personalized tree care, hackberry removal, live oak clearance, pruning, balance and elevation.',amount:2706.25,category:'ARBORWISE',who:'Brandon',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'Accepted July 20. Scheduling pending.',closed:false},
    {id:'WO-GTC-0005',type:'job',name:'Rick Lanicek',address:'379 John Douglas Drive, Van Alstyne, TX',service:'Mulberry removal, broken hackberry leader, fence-line reduction, structural pruning, elevation, clearance and oak canker work.',amount:2200,category:'ARBORWISE',who:'Brandon',status:'Scheduled',workDate:'2026-07-25',workTime:'8:00 AM – 12:00 PM',followUp:'',notes:'Google Calendar job. Three-person crew; haul-off included.',closed:false},
    {id:'WO-GTC-0009',type:'job',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',service:'Remove lower visible red-oak deadwood over the roof and rear fence; climb and rig as needed; clean up debris.',amount:650,category:'ARBORWISE',who:'Dallas 3-man crew',status:'Scheduled',workDate:'2026-07-25',workTime:'1:00 PM – 5:00 PM',followUp:'',notes:'Google Calendar job. Approved at $650.',closed:false}
  ];

  const LOCAL_SNAPSHOT_KEY='arborwise-ops-snapshot-2026-07-22-v2';
  const snapshotAlreadyApplied=localStorage.getItem(LOCAL_SNAPSHOT_KEY)==='1';
  state.records=state.records.filter(record=>!/^WO-20(10|11|12|13|14|15|16|17|18|19)$/.test(String(record.id||'')));
  const recordsById=new Map(state.records.map(record=>[String(record.id||''),record]));
  for(const record of snapshot){
    const existing=recordsById.get(record.id);
    if(!existing)recordsById.set(record.id,record);
    else if(!snapshotAlreadyApplied)recordsById.set(record.id,{...existing,...record,closed:Boolean(existing.closed),status:existing.closed?(existing.status||'Complete'):record.status});
  }
  state.records=[...recordsById.values()];
  localStorage.setItem(LOCAL_SNAPSHOT_KEY,'1');

  if(!TABS.includes('COMPLETED'))TABS.splice(3,0,'COMPLETED');

  visibleRecords=()=>{
    let rows=state.records.filter(matches);
    if(state.tab==='ESTIMATES')rows=rows.filter(record=>record.type==='est'&&!record.closed);
    if(state.tab==='JOBS')rows=rows.filter(record=>record.type==='job'&&!record.closed);
    if(state.tab==='COMPLETED')rows=rows.filter(record=>record.closed);
    if(state.tab==='TODAY'){
      const start=today();
      const endDate=new Date(`${start}T12:00:00`);
      endDate.setDate(endDate.getDate()+7);
      const end=`${endDate.getFullYear()}-${String(endDate.getMonth()+1).padStart(2,'0')}-${String(endDate.getDate()).padStart(2,'0')}`;
      rows=rows.filter(record=>{
        if(record.closed)return false;
        const due=record.workDate||record.followUp||'';
        if(!due)return true;
        if(due>=start&&due<=end)return true;
        return !record.workDate&&due<start&&/due|overdue|follow/i.test(String(record.status||''));
      });
    }
    return rows.sort((a,b)=>{
      const aDue=a.workDate||a.followUp||'9999-99-99';
      const bDue=b.workDate||b.followUp||'9999-99-99';
      return aDue.localeCompare(bDue)||String(a.workTime||'').localeCompare(String(b.workTime||''))||String(a.name||'').localeCompare(String(b.name||''));
    });
  };

  renderRecords=()=>{
    const rows=visibleRecords();
    const heading=state.tab==='TODAY'?'Today + Next 7 Days / Unscheduled':state.tab==='COMPLETED'?'Completed — Tap Any Item to Reopen':state.tab;
    main.innerHTML=`<div class="title"><span>${heading}</span><span class="count">${rows.length}</span></div>${rows.length?rows.map(card).join(''):'<div class="empty">Nothing here.</div>'}`;
    main.querySelectorAll('[data-record]').forEach(element=>element.onclick=()=>openRecord(element.dataset.record));
  };

  render=()=>{
    renderFilters();
    renderTabs();
    $('dateLine').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    if(['TODAY','ESTIMATES','JOBS','COMPLETED'].includes(state.tab))renderRecords();
    else if(state.tab==='HOURS')renderHours();
    else if(state.tab==='FLEET')renderFleet();
    else renderNotes();
  };

  const persistRecord=async(record,isExisting=true)=>{
    state.records=state.records.filter(item=>item.id!==record.id);
    state.records.push(record);
    save();
    render();
    if(state.live){
      try{
        await api('/api/records',{method:isExisting?'PATCH':'POST',body:JSON.stringify({id:record.id,type:record.type,name:record.name,addr:record.address,service:record.service,money:record.amount,category:record.category,who:record.who,status:record.status,date:record.workDate,fuDate:record.followUp,time:record.workTime,notes:record.notes,closed:record.closed})});
      }catch(error){toast('Saved on this phone; shared-board save failed');}
    }
  };

  openRecord=id=>{
    const original=id?state.records.find(record=>record.id===id):null;
    const record=original||{id:'',type:'est',name:'',address:'',service:'',amount:'',category:'ARBORWISE',who:'Greg',status:'Estimate Sent',followUp:'',workDate:'',workTime:'',notes:'',closed:false};
    const completionButton=original?`<button class="${record.closed?'primary':'secondary'}" id="toggleComplete">${record.closed?'REOPEN / MARK INCOMPLETE':'MARK COMPLETE'}</button>`:'';
    sheet.innerHTML=`<h2>${original?'Edit':'Add'} record</h2><div class="row">${field('r-id','Record ID',record.id)}<div class="field"><label>Type</label><select id="r-type"><option value="est" ${record.type==='est'?'selected':''}>Estimate</option><option value="job" ${record.type==='job'?'selected':''}>Job</option></select></div></div>${field('r-name','Customer',record.name)}${field('r-address','Address',record.address)}<div class="field"><label>Service</label><textarea id="r-service">${esc(record.service)}</textarea></div><div class="row">${field('r-amount','Amount',record.amount,'number')}${field('r-category','Category',record.category)}</div><div class="row">${field('r-who','Assigned to',record.who)}${field('r-status','Status',record.status)}</div><div class="row">${field('r-work','Work date',record.workDate,'date')}${field('r-follow','Follow-up',record.followUp,'date')}</div>${field('r-time','Time window',record.workTime)}<div class="field"><label>Notes</label><textarea id="r-notes">${esc(record.notes)}</textarea></div>${completionButton}<div class="buttons"><button class="secondary" id="cancel">CANCEL</button>${original?'<button class="danger" id="delete">DELETE</button>':''}<button class="primary" id="saveRecord">SAVE</button></div>`;
    veil.hidden=false;
    $('cancel').onclick=closeSheet;

    const collect=closed=>({
      id:$('r-id').value.trim()||`${$('r-type').value==='job'?'WO':'EST'}-${Date.now()}`,
      type:$('r-type').value,
      name:$('r-name').value.trim(),
      address:$('r-address').value.trim(),
      service:$('r-service').value.trim(),
      amount:Number($('r-amount').value)||0,
      category:$('r-category').value.trim()||'ARBORWISE',
      who:$('r-who').value.trim(),
      status:$('r-status').value.trim(),
      workDate:$('r-work').value,
      followUp:$('r-follow').value,
      workTime:$('r-time').value.trim(),
      notes:$('r-notes').value.trim(),
      closed:Boolean(closed)
    });

    if(original)$('delete').onclick=async()=>{
      state.records=state.records.filter(item=>item.id!==original.id);
      save();closeSheet();render();
      if(state.live)try{await api('/api/records',{method:'DELETE',body:JSON.stringify({id:original.id})});}catch{}
    };

    if(original)$('toggleComplete').onclick=async()=>{
      const next=collect(!original.closed);
      if(!next.name){toast('Customer name is required');return;}
      next.status=next.closed?'Complete':'Reopened — Needs Attention';
      closeSheet();
      await persistRecord(next,true);
      toast(next.closed?'Moved to Completed':'Reopened and returned to the active board');
    };

    $('saveRecord').onclick=async()=>{
      const next=collect(original?.closed||false);
      if(!next.name){toast('Customer name is required');return;}
      closeSheet();
      await persistRecord(next,Boolean(original));
    };
  };

  $('addButton').onclick=()=>{
    if(['TODAY','ESTIMATES','JOBS'].includes(state.tab))openRecord();
    else if(state.tab==='COMPLETED')toast('Open Today, Estimates, or Jobs to add new work');
    else if(state.tab==='HOURS')openHours();
    else if(state.tab==='FLEET')openMileage();
    else openNote();
  };

  const sync=document.getElementById('syncButton');
  if(sync)sync.onclick=async()=>{
    sync.disabled=true;
    sync.classList.add('spinning');
    try{
      let connections=null;
      try{connections=await connectionInfo();}catch(error){if(error.status===401){showLogin();return;}}
      if(connections&&(connections.quickbooks?.authorized||connections.google?.authorized)){
        await manualSync(false);
        return;
      }
      const loaded=await loadServer(true);
      save();render();
      toast(loaded?'Board refreshed from the shared operations snapshot':'Board refreshed from the saved operations snapshot');
    }catch(error){toast(error.message||'Board refresh failed');}
    finally{sync.disabled=false;sync.classList.remove('spinning');}
  };

  setInterval(()=>loadServer(false).catch(()=>{}),60*60*1000);

  const annieButton=document.getElementById('annieButton');
  const annieBubble=document.getElementById('annieBubble');
  if(annieButton&&annieBubble)annieButton.onclick=()=>{
    const lines=[
      'Completed work can always be reopened from the Completed tab.',
      'Thursday includes the daily review and Susan Garrison follow-up.',
      'Friday has four approved mowing stops assigned to KW Landscaping.',
      'Saturday has Rick Lanicek from 8–12 and Johanna Friedel from 1–5.',
      'Approved unscheduled work remains visible on the main board.'
    ];
    annieBubble.textContent=lines[Math.floor(Math.random()*lines.length)];
    annieBubble.hidden=false;
    clearTimeout(window.annieTimer);
    window.annieTimer=setTimeout(()=>annieBubble.hidden=true,6000);
  };

  save();
  render();
})();