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

  state.records=state.records.filter(record=>!/^WO-20(10|11|12|13|14|15|16|17|18|19)$/.test(String(record.id||'')));
  const recordsById=new Map(state.records.map(record=>[String(record.id||''),record]));
  for(const record of snapshot)recordsById.set(record.id,{...(recordsById.get(record.id)||{}),...record});
  state.records=[...recordsById.values()];

  visibleRecords=()=>{
    let rows=state.records.filter(matches);
    if(state.tab==='ESTIMATES')rows=rows.filter(record=>record.type==='est'&&!record.closed);
    if(state.tab==='JOBS')rows=rows.filter(record=>record.type==='job'&&!record.closed);
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
    const heading=state.tab==='TODAY'?'Today + Next 7 Days / Unscheduled':state.tab;
    main.innerHTML=`<div class="title"><span>${heading}</span><span class="count">${rows.length}</span></div>${rows.length?rows.map(card).join(''):'<div class="empty">Nothing here.</div>'}`;
    main.querySelectorAll('[data-record]').forEach(element=>element.onclick=()=>openRecord(element.dataset.record));
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
      'Today includes two estimate follow-ups and the daily operations review.',
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