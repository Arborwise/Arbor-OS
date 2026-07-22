'use strict';
(() => {
  if (typeof state === 'undefined' || !Array.isArray(state.records)) return;

  const snapshot = [
    {id:'GTC-0006',type:'est',name:'Christi Mahon',address:'245 Austin Place, Van Alstyne, TX',phone:'(972) 342-2999',email:'ChristiMahon@yahoo.com',service:'Light pruning and structure clearance; final scope after property assessment.',amount:0,category:'RESIDENTIAL',who:'Brandon',status:'Follow-Up',workDate:'',workTime:'',followUp:'',notes:'Reschedule estimate for a later date; date TBD.',closed:false},
    {id:'GTC-0002',type:'est',name:'Susan Garrison',address:'4145 Red Spruce Way, McKinney, TX',phone:'(214) 578-9488',email:'',service:'Assess multiple trees with emphasis on declining red oak; document treatment versus removal recommendation.',amount:1136.63,category:'RESIDENTIAL',who:'Brandon',status:'PHC Opportunity',workDate:'',workTime:'',followUp:'2026-07-23',notes:'QuickBooks Estimate 2008 drafted from Brandon field notes. Greg must confirm scope before sending.',closed:false},
    {id:'2002',type:'est',name:'SBB Management',address:'407 Walnut Drive, Murphy, TX',phone:'214-779-7128',email:'jsloan@sbbmanagement.com',service:'Remove mature live oak by controlled rigging; grind stump and surface roots; haul off debris.',amount:4113.50,category:'SBB',who:'Greg',status:'Estimate Sent',workDate:'',workTime:'',followUp:'2026-07-22',notes:'QuickBooks Estimate 2002. Pricing decision and follow-up due.',closed:false},
    {id:'2004',type:'est',name:'Jessica Farias',address:'236 Creekview Dr, Anna, TX 75409',phone:'(469) 767-6677',email:'fariasjess93@gmail.com',service:'Prune two front-yard live oaks; inspect third tree with bird nests before any pruning.',amount:757.75,category:'RESIDENTIAL',who:'Toby Palmer',status:'Estimate Sent',workDate:'',workTime:'',followUp:'2026-07-22',notes:'QuickBooks Estimate 2004. Follow up on nest activity and decision.',closed:false},

    {id:'2010',type:'est',name:'Sicily Laguna Azure',address:'3110 Giovanni Way, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2010 accepted 7/22/2026. Scheduling needed.',closed:false},
    {id:'2011',type:'est',name:'Sicily Laguna Azure',address:'2902 Cremini Falls, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2011 accepted 7/22/2026. Review possible duplicate before scheduling.',closed:false},
    {id:'2012',type:'est',name:'Sicily Laguna Azure',address:'3107 Lucia Way, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2012 accepted 7/22/2026. Scheduling needed.',closed:false},
    {id:'2013',type:'est',name:'Sicily Laguna Azure',address:'3016 Isla Terrace, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2013 accepted 7/22/2026. Scheduling needed.',closed:false},
    {id:'2014',type:'est',name:'Sicily Laguna Azure',address:'3116 Lucia Way, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2014 accepted 7/22/2026. Scheduling needed.',closed:false},
    {id:'2015',type:'est',name:'Sicily Laguna Azure',address:'517 Parrino Parkway, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2015 accepted 7/22/2026. Scheduling needed.',closed:false},
    {id:'2016',type:'est',name:'Venetian HOA',address:'1737 Barnwood, Celina, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'QuickBooks Estimate 2016 accepted; Friday KW route.',closed:false},
    {id:'2017',type:'est',name:'Venetian HOA',address:'437 Hoot Owl, Celina, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'QuickBooks Estimate 2017 accepted; Friday KW route.',closed:false},
    {id:'2018',type:'est',name:'Sicily Laguna Azure',address:'3007 Isla Terrace, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'QuickBooks Estimate 2018 accepted; Friday KW route.',closed:false},
    {id:'2019',type:'est',name:'Sicily Laguna Azure',address:'3004 Cremini Falls, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'',followUp:'',notes:'QuickBooks Estimate 2019 accepted; Friday KW route.',closed:false},

    {id:'WO-GTC-0005',type:'job',name:'Rick Lanicek',address:'379 John Douglas Drive, Van Alstyne, TX',phone:'(214) 552-6125',email:'rlanicek@gmail.com',service:'Remove dead mulberry and broken hackberry leader; fence-line reduction; structural pruning, elevation, clearance and oak canker work.',amount:2200,category:'RESIDENTIAL',who:'Brandon',status:'Scheduled',workDate:'2026-07-25',workTime:'8:00 AM-12:00 PM',followUp:'',notes:'Three-person crew. Climbing, rigging and haul-off equipment.',closed:false},
    {id:'WO-GTC-0007',type:'job',name:'Deborah Stock',address:'3517 Jersey Rd, Melissa, TX 75454',phone:'(254) 855-8842',email:'chefteddy@aol.com',service:'Remove dead front-yard tree; cut stump flush; apply stump treatment; clean up and haul off debris.',amount:703.63,category:'RESIDENTIAL',who:'Dallas crew',status:'Scheduled',workDate:'2026-07-25',workTime:'12:00 PM-1:00 PM',followUp:'',notes:'Accepted QuickBooks Estimate 2007. Scheduled between Rick Lanicek and Johanna Friedel.',closed:false},
    {id:'WO-GTC-0009',type:'job',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',phone:'512-585-8082',email:'jlfriedel@gmail.com',service:'Remove lower visible red-oak deadwood over roof and rear fence; climb and rig as needed; clean up debris.',amount:650,category:'RESIDENTIAL',who:'Dallas crew',status:'Scheduled',workDate:'2026-07-25',workTime:'1:00 PM-5:00 PM',followUp:'',notes:'Approved QuickBooks Estimate 2009.',closed:false},
    {id:'WO-1977',type:'job',name:'Dana & Tom Pierson',address:'9905 County Road 626, Blue Ridge, TX 75424',phone:'214-901-5732',email:'',service:'Full-day personalized tree care; front hackberry removal; rear live-oak clearance; root-collar excavation; pruning, balance and elevation.',amount:2706.25,category:'RESIDENTIAL',who:'Brandon',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'Three-person crew, climbing/rigging, pruning tools and haul-off equipment.',closed:false},
    {id:'FU-1663',type:'job',name:'Marijane Ellisor',address:'1136 Hester St, Nevada, TX 75173',phone:'469-338-9121',email:'',service:'Reset and replant displaced shrubs from prior work.',amount:0,category:'RESIDENTIAL',who:'Brandon',status:'In Progress Follow-Up',workDate:'2026-07-18',workTime:'2:45 PM-3:30 PM',followUp:'',notes:'Service follow-up, not a new estimate.',closed:false},
    {id:'SV-0719-CARL',type:'job',name:'Carl Diehl',address:'2111 Knobhill Rd, Van Alstyne, TX 75495',phone:'903-436-5483',email:'',service:'Rebolt / two-bolt cable service at oak tree.',amount:0,category:'RESIDENTIAL',who:'Brandon',status:'Scheduled Service - Verify Completion',workDate:'2026-07-19',workTime:'10:00 AM-4:00 PM',followUp:'',notes:'Confirmed calendar service; verify final completion state.',closed:false},
    {id:'WO-1978',type:'job',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',phone:'512-585-8082',email:'jlfriedel@gmail.com',service:'Prune, shape and train rear cypress; remove bagworms; clean up debris.',amount:311.22,category:'RESIDENTIAL',who:'Brandon',status:'Complete',workDate:'2026-07-18',workTime:'1:10 PM-2:10 PM',followUp:'',notes:'Invoice 1666 paid in full, including gratuity.',closed:true},
    {id:'FU-1980',type:'job',name:'Michael Lawrence',address:'1272 Lester Burt Rd, Farmersville, TX 75442',phone:'972-814-0915',email:'',service:'Remove pine at house and stump grind.',amount:2760.38,category:'RESIDENTIAL',who:'Brandon',status:'Complete',workDate:'2026-07-18',workTime:'8:00 AM-9:30 AM',followUp:'',notes:'Invoice 1664 paid in full.',closed:true}
  ];

  const people = [
    {name:'Greg',role:'Owner / management / sales',email:'greg@arborwisetreecare.com',group:'Arborwise'},
    {name:'Brandon',role:'Operations / estimator / crew lead',email:'brandon@arborwisetreecare.com',group:'Arborwise'},
    {name:'Toby Palmer',role:'Estimator',email:'',group:'Arborwise'},
    {name:'Dallas crew',role:'Three-person subcontract crew',email:'',group:'Crew / subcontractor'},
    {name:'KW Landscaping',role:'SBB mowing subcontractor',email:'',group:'SBB Management'}
  ];

  const managementGroups = [
    {name:'Residential',detail:'Homeowners and direct Arborwise customers'},
    {name:'SBB Management',detail:'Includes Sicily Laguna Azure, Venetian HOA, AnaCapri and KW Landscaping work'},
    {name:'Goodwin Management',detail:'Includes Castlebrook and related managed communities'},
    {name:'Kanam Management',detail:'Kanam Realty Group managed properties'}
  ];

  const equipment = [
    {group:'Vehicles & Trailers',name:'2022 Chevy 2500 HD, four-wheel drive',task:'Weekly wash and tire-pressure check'},
    {group:'Vehicles & Trailers',name:'16 ft dump trailer (lowboy)',task:'Weekly grease, wash, tires, brakes, lights, hitch, chains, wiring and doors'},
    {group:'Vehicles & Trailers',name:'16 ft flatbed trailer',task:'Inspect deck, tires, lights, hitch, chains and tie-down points'},
    {group:'Stihl Saws & Power Tools',name:'Stihl MS 500i chainsaw',task:'Clean filter/cover; inspect and sharpen chain'},
    {group:'Stihl Saws & Power Tools',name:'Stihl MS 261 chainsaw',task:'Clean filter/cover; inspect and sharpen chain'},
    {group:'Stihl Saws & Power Tools',name:'Stihl MS 194 chainsaw',task:'Clean filter/cover; inspect and sharpen chain'},
    {group:'Stihl Saws & Power Tools',name:'Stihl power pruner (pole)',task:'Inspect filter, saw head, chain and pole'},
    {group:'Stihl Saws & Power Tools',name:'Hedge trimmer attachment',task:'Clean and inspect filter and cutting head'},
    {group:'Stihl Saws & Power Tools',name:'Milwaukee drill with 5 ft bit',task:'Inspect battery, chuck, bit, fasteners and condition'},
    {group:'Climbing & Rigging',name:'Climbing gear',task:'Inspect ropes, saddles, carabiners, friction devices and wear points'},
    {group:'Climbing & Rigging',name:'Rigging gear including quarter wraps',task:'Inspect ropes, blocks, slings, hardware and wear points'},
    {group:'Climbing & Rigging',name:'Porta-Wrap',task:'Inspect attachment point, welds, surface damage and hardware'},
    {group:'Climbing & Rigging',name:'6 manual poles',task:'Inspect for breaks, cracks, bends and unsafe wear'},
    {group:'Climbing & Rigging',name:'Saw heads for poles',task:'Account for, clean and inspect every saw head'},
    {group:'Climbing & Rigging',name:'Pruning heads for poles',task:'Clean with bleach and sharpen weekly'}
  ];

  const SNAPSHOT_KEY='arborwise-operations-source-2026-07-22-v4';
  const applied=localStorage.getItem(SNAPSHOT_KEY)==='1';
  const byId=new Map(state.records.map(record=>[String(record.id||''),record]));
  for(const record of snapshot){
    const existing=byId.get(record.id);
    if(!existing)byId.set(record.id,record);
    else if(!applied)byId.set(record.id,{...existing,...record,closed:Boolean(existing.closed),status:existing.closed?(existing.status||'Complete'):record.status});
  }
  state.records=[...byId.values()].filter(record=>!/^WO-20(10|11|12|13|14|15|16|17|18|19)$/.test(String(record.id||'')));
  state.groupFilter=state.groupFilter||'ALL';
  localStorage.setItem(SNAPSHOT_KEY,'1');

  FILTERS.splice(0,FILTERS.length,'ALL','GREG','BRANDON','DALLAS','KW');
  TABS.splice(0,TABS.length,'TODAY','ESTIMATES','JOBS','PEOPLE','EQUIPMENT','COMPLETED','HOURS','FLEET','NOTES');

  const style=document.createElement('style');
  style.textContent=`
    .filters{overflow-x:auto;justify-content:flex-start;scrollbar-width:none}.filters::-webkit-scrollbar{display:none}
    #groupFilters{display:flex;gap:7px;overflow-x:auto;padding:8px 14px;background:#ebe9df;border-bottom:1px solid #d9d6ca;scrollbar-width:none}
    #groupFilters::-webkit-scrollbar{display:none}#groupFilters button{white-space:nowrap;border:1.5px solid #17402b;border-radius:999px;background:#fff;color:#17402b;padding:7px 12px;font-weight:700}
    #groupFilters button.on{background:#17402b;color:#fff}nav{overflow-x:auto;justify-content:flex-start}nav button{min-width:88px;flex:0 0 auto}
    .directoryCard,.equipmentCard{background:#fff;border:1px solid #ddd9cc;border-radius:14px;padding:14px;margin:10px 0;box-shadow:0 1px 3px rgba(0,0,0,.06)}
    .directoryCard strong,.equipmentCard strong{font-size:20px;color:#17402b}.directoryCard small,.equipmentCard small{display:block;color:#687068;margin-top:4px}.sectionLabel{font-size:22px;font-weight:800;color:#17402b;margin:20px 0 8px;text-transform:uppercase}
    .contactRow{display:flex;gap:8px;flex-wrap:wrap;margin-top:10px}.contactRow a{padding:7px 12px;border:1px solid #17402b;border-radius:999px;color:#17402b;text-decoration:none;font-weight:700}
    .phoneLine{margin-top:6px}.phoneLine a{color:#17402b;font-weight:700}
  `;
  document.head.appendChild(style);

  const groupBar=document.createElement('section');
  groupBar.id='groupFilters';
  filters.insertAdjacentElement('afterend',groupBar);

  const groupOptions=[['ALL','ALL'],['RESIDENTIAL','RESIDENTIAL'],['SBB','SBB MANAGEMENT'],['GOODWIN','GOODWIN MANAGEMENT'],['KANAM','KANAM MANAGEMENT']];
  const renderGroupFilters=()=>{
    groupBar.innerHTML=groupOptions.map(([value,label])=>`<button class="${state.groupFilter===value?'on':''}" data-group="${value}">${label}</button>`).join('');
    groupBar.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.groupFilter=button.dataset.group;save();render();});
  };

  matches=record=>{
    const who=String(record.who||'').toUpperCase();
    const category=String(record.category||'RESIDENTIAL').toUpperCase();
    let employee=true;
    if(state.filter==='GREG')employee=who.includes('GREG')||who.includes('TOBY');
    if(state.filter==='BRANDON')employee=who.includes('BRANDON');
    if(state.filter==='DALLAS')employee=who.includes('DALLAS');
    if(state.filter==='KW')employee=who.includes('KW');
    let group=true;
    if(state.groupFilter==='RESIDENTIAL')group=category==='RESIDENTIAL'||category==='ARBORWISE';
    if(state.groupFilter==='SBB')group=category==='SBB'||category==='KW';
    if(state.groupFilter==='GOODWIN')group=category==='GOODWIN';
    if(state.groupFilter==='KANAM')group=category==='KANAM';
    return employee&&group;
  };

  card=record=>{
    const due=record.workDate||record.followUp||'';
    const phone=record.phone?`<div class="phoneLine"><a href="tel:${esc(record.phone)}">${esc(record.phone)}</a></div>`:'';
    return `<article class="card ${record.type==='job'?'job':'estimate'} ${record.closed?'done':''}" data-record="${esc(record.id)}"><div class="top"><div><span class="tag">${record.type==='job'?'JOB':'ESTIMATE'}</span><span class="recordId">${esc(record.id)}</span></div><div class="money">${money(record.amount)}</div></div><div class="name">${esc(record.name)}</div>${record.address?`<div class="address">${esc(record.address)}</div>`:''}${phone}<div class="service">${esc(record.service||'')}</div>${record.notes?`<div class="notes">${esc(record.notes)}</div>`:''}<div class="pills"><span class="pill">${esc(record.status||'Open')}</span><span class="pill who">${esc(record.who||'Unassigned')}</span>${due?`<span class="pill date">${esc(due)}${record.workTime?' • '+esc(record.workTime):''}</span>`:''}</div></article>`;
  };

  visibleRecords=()=>{
    let rows=state.records.filter(matches);
    if(state.tab==='ESTIMATES')rows=rows.filter(record=>record.type==='est'&&!record.closed);
    if(state.tab==='JOBS')rows=rows.filter(record=>record.type==='job'&&!record.closed);
    if(state.tab==='COMPLETED')rows=rows.filter(record=>record.closed);
    if(state.tab==='TODAY'){
      const start=today();
      const endDate=new Date(`${start}T12:00:00`);endDate.setDate(endDate.getDate()+7);
      const end=`${endDate.getFullYear()}-${String(endDate.getMonth()+1).padStart(2,'0')}-${String(endDate.getDate()).padStart(2,'0')}`;
      rows=rows.filter(record=>{
        if(record.closed)return false;
        const due=record.workDate||record.followUp||'';
        if(!due)return /approved|follow|progress|verify/i.test(String(record.status||''));
        return (due>=start&&due<=end)||(!record.workDate&&due<start);
      });
    }
    return rows.sort((a,b)=>(a.workDate||a.followUp||'9999-99-99').localeCompare(b.workDate||b.followUp||'9999-99-99')||String(a.workTime||'').localeCompare(String(b.workTime||''))||String(a.name||'').localeCompare(String(b.name||'')));
  };

  renderRecords=()=>{
    const rows=visibleRecords();
    const heading=state.tab==='TODAY'?'My Day + Next 7 Days / Unscheduled':state.tab==='COMPLETED'?'Completed — Tap an item to reopen':state.tab;
    main.innerHTML=`<div class="title"><span>${heading}</span><span class="count">${rows.length}</span></div>${rows.length?rows.map(card).join(''):'<div class="empty">Nothing here for these filters.</div>'}`;
    main.querySelectorAll('[data-record]').forEach(element=>element.onclick=()=>openRecord(element.dataset.record));
  };

  const renderPeople=()=>{
    main.innerHTML=`<div class="title"><span>People & Management Groups</span><span class="count">${people.length+managementGroups.length}</span></div><div class="sectionLabel">Employees & Crew</div>${people.map(person=>`<div class="directoryCard"><strong>${esc(person.name)}</strong><small>${esc(person.role)} • ${esc(person.group)}</small>${person.email?`<div class="contactRow"><a href="mailto:${esc(person.email)}">EMAIL</a></div>`:''}</div>`).join('')}<div class="sectionLabel">Management Groups</div>${managementGroups.map(group=>`<div class="directoryCard"><strong>${esc(group.name)}</strong><small>${esc(group.detail)}</small></div>`).join('')}`;
  };

  const renderEquipment=()=>{
    const groups=[...new Set(equipment.map(item=>item.group))];
    main.innerHTML=`<div class="title"><span>Equipment & Maintenance</span><span class="count">${equipment.length}</span></div>${groups.map(group=>`<div class="sectionLabel">${esc(group)}</div>${equipment.filter(item=>item.group===group).map(item=>`<div class="equipmentCard"><strong>${esc(item.name)}</strong><small>${esc(item.task)}</small></div>`).join('')}`).join('')}`;
  };

  const originalRenderFilters=renderFilters;
  renderFilters=()=>{originalRenderFilters();renderGroupFilters();};
  render=()=>{
    renderFilters();renderTabs();
    $('dateLine').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    if(['TODAY','ESTIMATES','JOBS','COMPLETED'].includes(state.tab))renderRecords();
    else if(state.tab==='PEOPLE')renderPeople();
    else if(state.tab==='EQUIPMENT')renderEquipment();
    else if(state.tab==='HOURS')renderHours();
    else if(state.tab==='FLEET')renderFleet();
    else renderNotes();
  };

  const persistRecord=async(record,isExisting=true)=>{
    state.records=state.records.filter(item=>item.id!==record.id);state.records.push(record);save();render();
    if(state.live)try{await api('/api/records',{method:isExisting?'PATCH':'POST',body:JSON.stringify({id:record.id,type:record.type,name:record.name,addr:record.address,phone:record.phone,email:record.email,service:record.service,money:record.amount,category:record.category,who:record.who,status:record.status,date:record.workDate,fuDate:record.followUp,time:record.workTime,notes:record.notes,closed:record.closed})});}catch{toast('Saved on this phone; shared-board save failed');}
  };

  openRecord=id=>{
    const original=id?state.records.find(record=>record.id===id):null;
    const record=original||{id:'',type:'est',name:'',address:'',phone:'',email:'',service:'',amount:'',category:'RESIDENTIAL',who:'Greg',status:'Estimate Sent',followUp:'',workDate:'',workTime:'',notes:'',closed:false};
    const completionButton=original?`<button class="${record.closed?'primary':'secondary'}" id="toggleComplete">${record.closed?'REOPEN / MARK INCOMPLETE':'MARK COMPLETE'}</button>`:'';
    sheet.innerHTML=`<h2>${original?'Edit':'Add'} record</h2><div class="row">${field('r-id','Record ID',record.id)}<div class="field"><label>Type</label><select id="r-type"><option value="est" ${record.type==='est'?'selected':''}>Estimate</option><option value="job" ${record.type==='job'?'selected':''}>Job</option></select></div></div>${field('r-name','Customer',record.name)}${field('r-address','Address',record.address)}<div class="row">${field('r-phone','Phone',record.phone)}${field('r-email','Email',record.email)}</div><div class="field"><label>Service</label><textarea id="r-service">${esc(record.service)}</textarea></div><div class="row">${field('r-amount','Amount',record.amount,'number')}${field('r-category','Management group',record.category)}</div><div class="row">${field('r-who','Assigned to',record.who)}${field('r-status','Status',record.status)}</div><div class="row">${field('r-work','Work date',record.workDate,'date')}${field('r-follow','Follow-up',record.followUp,'date')}</div>${field('r-time','Time window',record.workTime)}<div class="field"><label>Notes</label><textarea id="r-notes">${esc(record.notes)}</textarea></div>${completionButton}<div class="buttons"><button class="secondary" id="cancel">CANCEL</button>${original?'<button class="danger" id="delete">DELETE</button>':''}<button class="primary" id="saveRecord">SAVE</button></div>`;
    veil.hidden=false;$('cancel').onclick=closeSheet;
    const collect=closed=>({id:$('r-id').value.trim()||`${$('r-type').value==='job'?'WO':'EST'}-${Date.now()}`,type:$('r-type').value,name:$('r-name').value.trim(),address:$('r-address').value.trim(),phone:$('r-phone').value.trim(),email:$('r-email').value.trim(),service:$('r-service').value.trim(),amount:Number($('r-amount').value)||0,category:$('r-category').value.trim()||'RESIDENTIAL',who:$('r-who').value.trim(),status:$('r-status').value.trim(),workDate:$('r-work').value,followUp:$('r-follow').value,workTime:$('r-time').value.trim(),notes:$('r-notes').value.trim(),closed:Boolean(closed)});
    if(original)$('delete').onclick=async()=>{state.records=state.records.filter(item=>item.id!==original.id);save();closeSheet();render();if(state.live)try{await api('/api/records',{method:'DELETE',body:JSON.stringify({id:original.id})});}catch{}};
    if(original)$('toggleComplete').onclick=async()=>{const next=collect(!original.closed);if(!next.name){toast('Customer name is required');return;}next.status=next.closed?'Complete':'Reopened — Needs Attention';closeSheet();await persistRecord(next,true);toast(next.closed?'Moved to Completed':'Reopened and returned to active work');};
    $('saveRecord').onclick=async()=>{const next=collect(original?.closed||false);if(!next.name){toast('Customer name is required');return;}closeSheet();await persistRecord(next,Boolean(original));};
  };

  $('addButton').onclick=()=>{if(['TODAY','ESTIMATES','JOBS'].includes(state.tab))openRecord();else if(state.tab==='COMPLETED')toast('Open Today, Estimates, or Jobs to add work');else if(state.tab==='HOURS')openHours();else if(state.tab==='FLEET')openMileage();else if(state.tab==='NOTES')openNote();else toast('This section is managed from the operating source list');};

  autoSync=async()=>{
    if(!navigator.onLine)return;
    const now=new Date();
    const hour=now.getHours();
    if(hour!==6&&hour!==18)return;
    const slot=`${today()}-${hour}`;
    if(localStorage.getItem('arborwise-last-scheduled-slot')===slot)return;
    localStorage.setItem('arborwise-last-scheduled-slot',slot);
    await manualSync(true);
  };

  const annieButton=document.getElementById('annieButton');
  const annieBubble=document.getElementById('annieBubble');
  if(annieButton&&annieBubble)annieButton.onclick=()=>{
    const lines=['Six approved SBB tree replacements are unscheduled.','Friday has four approved SBB mowing stops assigned to KW Landscaping.','Saturday: Rick 8–12, Deborah 12–1, Johanna 1–5.','Dana and Tom are approved and waiting for a crew date.','Completed work can always be reopened.'];
    annieBubble.textContent=lines[Math.floor(Math.random()*lines.length)];annieBubble.hidden=false;clearTimeout(window.annieTimer);window.annieTimer=setTimeout(()=>annieBubble.hidden=true,6000);
  };

  save();render();
})();