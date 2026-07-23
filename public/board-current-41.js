'use strict';
(() => {
  const KEY='arborwise-live-board-v24';
  const crew='Toby Palmer; Hannah McElrae; Jonathan McElrae';
  const treeNotes='Six 30-gallon live oaks. Three container-grown and three field-dug. Shades of Green receipt $1,513.34 allocated equally: $252.22 per job. Crew labor $550 allocated equally: $91.67 per job. Before and after photos required.';
  const updates=[
    {id:'2010',type:'job',name:'Sicily Laguna Azure',address:'3110 Giovanni Way, Princeton, TX',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:crew,status:'Scheduled',workDate:'2026-07-23',workTime:'Route',notes:treeNotes,closed:false},
    {id:'2011',type:'job',name:'Sicily Laguna Azure',address:'2902 Cremini Falls, Princeton, TX',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:crew,status:'Scheduled - Needs Review',workDate:'2026-07-23',workTime:'Route',notes:`${treeNotes} Previously flagged as a possible duplicate; confirmation remains pending.`,closed:false},
    {id:'2012',type:'job',name:'Sicily Laguna Azure',address:'3107 Lucia Way, Princeton, TX',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:crew,status:'Scheduled',workDate:'2026-07-23',workTime:'Route',notes:treeNotes,closed:false},
    {id:'2013',type:'job',name:'Sicily Laguna Azure',address:'3016 Isla Terrace, Princeton, TX',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:crew,status:'Scheduled',workDate:'2026-07-23',workTime:'Route',notes:treeNotes,closed:false},
    {id:'2014',type:'job',name:'Sicily Laguna Azure',address:'3116 Lucia Way, Princeton, TX',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:crew,status:'Scheduled',workDate:'2026-07-23',workTime:'Route',notes:treeNotes,closed:false},
    {id:'2015',type:'job',name:'Sicily Laguna Azure',address:'517 Parrino Parkway, Princeton, TX',service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',amount:866,category:'SBB',who:crew,status:'Scheduled',workDate:'2026-07-23',workTime:'Route',notes:treeNotes,closed:false},
    {id:'FU-1663',type:'job',name:'Marijane Ellisor',address:'1136 Hester St, Nevada, TX 75173',phone:'469-338-9121',email:'Mje.lssbb@gmail.com',service:'Reset and replant displaced shrubs from prior work.',amount:0,category:'RESIDENTIAL',who:crew,status:'Scheduled',workDate:'2026-07-24',workTime:'Time TBD',notes:'Service follow-up; original Invoice 1663 was paid in full. All three crew members assigned. No new estimate.',closed:false}
  ];
  let state={};
  try{state=JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch{state={};}
  const records=Array.isArray(state.records)?state.records:[];
  if(state.live||records.length)return;
  state={...state,records:updates,offlineFallbackVersion:41};
  localStorage.setItem(KEY,JSON.stringify(state));
})();
