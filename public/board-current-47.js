'use strict';
(() => {
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const updatedAt = '2026-07-23T14:33:00-05:00';
  const treeCrew = 'Toby Palmer; Hannah McElrae; Jonathan McElrae';
  const treeNotes = 'Today’s six-stop Sicily Laguna route. Six 30-gallon live oaks: three container-grown and three field-dug. Shades of Green receipt $1,513.34 allocated equally at $252.22 per job. Crew labor $550 allocated equally at $91.67 per job. Before and after photos required. Operations oversight: Greg.';

  const records = [
    {id:'2010',type:'job',name:'Sicily Laguna Azure',address:'3110 Giovanni Way, Princeton, TX',phone:'972-707-4862',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:treeCrew,status:"Today's Route",workDate:'2026-07-23',workTime:'8:30 AM–5:00 PM route',notes:treeNotes,closed:false,oversight:'Greg'},
    {id:'2011',type:'job',name:'Sicily Laguna Azure',address:'2902 Cremini Falls, Princeton, TX',phone:'972-707-4862',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:treeCrew,status:"Today's Route",workDate:'2026-07-23',workTime:'8:30 AM–5:00 PM route',notes:treeNotes,closed:false,oversight:'Greg'},
    {id:'2012',type:'job',name:'Sicily Laguna Azure',address:'3107 Lucia Way, Princeton, TX',phone:'972-707-4862',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:treeCrew,status:"Today's Route",workDate:'2026-07-23',workTime:'8:30 AM–5:00 PM route',notes:treeNotes,closed:false,oversight:'Greg'},
    {id:'2013',type:'job',name:'Sicily Laguna Azure',address:'3016 Isla Terrace, Princeton, TX',phone:'972-707-4862',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:treeCrew,status:"Today's Route",workDate:'2026-07-23',workTime:'8:30 AM–5:00 PM route',notes:treeNotes,closed:false,oversight:'Greg'},
    {id:'2014',type:'job',name:'Sicily Laguna Azure',address:'3116 Lucia Way, Princeton, TX',phone:'972-707-4862',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:treeCrew,status:"Today's Route",workDate:'2026-07-23',workTime:'8:30 AM–5:00 PM route',notes:treeNotes,closed:false,oversight:'Greg'},
    {id:'2015',type:'job',name:'Sicily Laguna Azure',address:'517 Parrino Parkway, Princeton, TX',phone:'972-707-4862',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:treeCrew,status:"Today's Route",workDate:'2026-07-23',workTime:'8:30 AM–5:00 PM route',notes:treeNotes,closed:false,oversight:'Greg'},
    {id:'2016',type:'job',name:'Venetian HOA',address:'1737 Barnwood, Celina, TX',phone:'972-707-4862',service:'Mow, edge, and pull weeds.',amount:162.38,category:'KW',who:'KW Landscaping',status:'Scheduled',workDate:'2026-07-24',workTime:'8:30 AM–12:30 PM route',notes:'Friday KW Landscaping route. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'2017',type:'job',name:'Venetian HOA',address:'437 Hoot Owl, Celina, TX',phone:'972-707-4862',service:'Mow, edge, and pull weeds.',amount:162.38,category:'KW',who:'KW Landscaping',status:'Scheduled',workDate:'2026-07-24',workTime:'8:30 AM–12:30 PM route',notes:'Friday KW Landscaping route. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'2018',type:'job',name:'Sicily Laguna Azure',address:'3007 Isla Terrace, Princeton, TX',phone:'972-707-4862',service:'Mow, edge, and pull weeds.',amount:162.38,category:'KW',who:'KW Landscaping',status:'Scheduled',workDate:'2026-07-24',workTime:'8:30 AM–12:30 PM route',notes:'Friday KW Landscaping route. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'2019',type:'job',name:'Sicily Laguna Azure',address:'3004 Cremini Falls, Princeton, TX',phone:'972-707-4862',service:'Mow, edge, and pull weeds.',amount:162.38,category:'KW',who:'KW Landscaping',status:'Scheduled',workDate:'2026-07-24',workTime:'8:30 AM–12:30 PM route',notes:'Friday KW Landscaping route. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'FU-1663',type:'job',name:'Marijane Ellisor',address:'1136 Hester St, Nevada, TX 75173',phone:'469-338-9121',email:'Mje.lssbb@gmail.com',service:'Reset and replant displaced shrubs from prior work.',amount:0,category:'RESIDENTIAL',who:treeCrew,status:'Scheduled',workDate:'2026-07-24',workTime:'Time TBD',notes:'Friday service follow-up. All three crew members assigned. Invoice 1663 was paid in full; no new estimate. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'1977',type:'job',name:'Dana & Tom Pierson',address:'9905 County Road 626, Blue Ridge, TX 75424',phone:'214-901-5732',service:'Full-day personalized tree care, hackberry removal, live oak clearance, pruning, balance and elevation.',amount:2706.25,category:'RESIDENTIAL',who:'Brandon',status:'Accepted',workDate:'',workTime:'',notes:'Accepted estimate. Scheduling pending; no date, arrival window, or crew assigned. Brandon owns scheduling follow-up. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'WO-GTC-0005',type:'job',name:'Rick Lanicek',address:'379 John Douglas Drive, Van Alstyne, TX',phone:'(214) 552-6125',service:'Remove dead mulberry and broken hackberry leader; reduce fence-line overgrowth; structural pruning, elevation, balance, clearance, and oak canker work.',amount:2200,category:'RESIDENTIAL',who:'Brandon',status:'Scheduled',workDate:'2026-07-25',workTime:'8:00 AM–12:00 PM',notes:'Saturday route. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'WO-GTC-0007',type:'job',name:'Deborah Stock',address:'3517 Jersey Rd, Melissa, TX 75454',phone:'(254) 855-8842',service:'Remove dead front-yard tree; cut stump flush; apply stump treatment; clean up and haul off debris.',amount:703.63,category:'RESIDENTIAL',who:'Dallas crew',status:'Scheduled',workDate:'2026-07-25',workTime:'11:30 AM–1:00 PM',notes:'Saturday route. Operations oversight: Greg.',closed:false,oversight:'Greg'},
    {id:'WO-GTC-0009',type:'job',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',phone:'512-585-8082',service:'Remove lower visible red-oak deadwood over roof and rear fence; climb and rig as needed; clean up debris.',amount:703.63,category:'RESIDENTIAL',who:'Dallas 3-man crew',status:'Scheduled',workDate:'2026-07-25',workTime:'1:00 PM–5:00 PM',notes:'Saturday route. Operations oversight: Greg.',closed:false,oversight:'Greg'}
  ];

  function normalizeId(value) {
    const text = String(value || '').trim();
    const workOrder = text.match(/^WO-(\d+)$/i);
    return workOrder ? workOrder[1] : text;
  }

  let state = {};
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { state = {}; }
  const remoteUpdatedAt = state.remoteDataUpdatedAt || null;
  const remoteIsNewer = Number.isFinite(Date.parse(remoteUpdatedAt || '')) && Date.parse(remoteUpdatedAt) > Date.parse(updatedAt);

  if (remoteIsNewer) {
    window.ARBORWISE_CURRENT_OPERATIONS = null;
    return;
  }

  window.ARBORWISE_CURRENT_OPERATIONS = {updatedAt, records};
  const existing = Array.isArray(state.records) ? state.records : [];
  const byId = new Map(existing.map(item => [normalizeId(item.id), item]));
  for (const record of records) byId.set(normalizeId(record.id), {...byId.get(normalizeId(record.id)), ...record});
  state = {...state, records:[...byId.values()], currentOperationsUpdatedAt:updatedAt, currentSnapshotVersion:47, live:false, lastSync:updatedAt};
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
})();
