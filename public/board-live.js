'use strict';
(() => {
  const VERSION = '24';
  const STORAGE_KEY = `arborwise-live-board-v${VERSION}`;
  const LEGACY_KEY = 'arborwise-os-v12';
  const $ = id => document.getElementById(id);
  const main = $('main');
  const filters = $('filters');
  const tabs = $('tabs');
  const veil = $('veil');
  const sheet = $('sheet');
  const toastEl = $('toast');
  const statusButton = $('statusButton');
  const refreshButton = $('syncButton');
  if (!main || !filters || !tabs || !veil || !sheet || !statusButton || !refreshButton) return;

  const records = [
    {id:'GTC-0006',type:'est',name:'Christi Mahon',address:'245 Austin Place, Van Alstyne, TX',phone:'(972) 342-2999',email:'ChristiMahon@yahoo.com',service:'Light pruning and structure clearance; final scope after property assessment.',amount:0,category:'RESIDENTIAL',who:'Brandon',status:'Follow-Up',workDate:'',workTime:'',followUp:'',notes:'Reschedule estimate for a later date; date TBD.',closed:false},
    {id:'GTC-0002',type:'est',name:'Susan Garrison',address:'4145 Red Spruce Way, McKinney, TX',phone:'(214) 578-9488',email:'',service:'Assess multiple trees with emphasis on declining red oak; document treatment versus removal recommendation.',amount:1136.63,category:'RESIDENTIAL',who:'Brandon',status:'PHC Opportunity',workDate:'',workTime:'',followUp:'2026-07-23',notes:'QuickBooks Estimate 2008 drafted from Brandon field notes. Greg must confirm scope before sending.',closed:false},
    {id:'2002',type:'est',name:'SBB Management',address:'407 Walnut Drive, Murphy, TX',phone:'214-779-7128',email:'jsloan@sbbmanagement.com',service:'Remove mature live oak by controlled rigging; grind stump and surface roots; haul off debris.',amount:4113.50,category:'SBB',who:'Greg',status:'Estimate Sent',workDate:'',workTime:'',followUp:'2026-07-22',notes:'QuickBooks Estimate 2002. Pricing decision and follow-up due.',closed:false},
    {id:'2004',type:'est',name:'Jessica Farias',address:'236 Creekview Dr, Anna, TX 75409',phone:'(469) 767-6677',email:'fariasjess93@gmail.com',service:'Prune two front-yard live oaks; inspect third tree with bird nests before any pruning.',amount:757.75,category:'RESIDENTIAL',who:'Greg',status:'Estimate Sent',workDate:'',workTime:'',followUp:'2026-07-22',notes:'QuickBooks Estimate 2004. Follow up on nest activity and decision.',closed:false},
    {id:'2010',type:'est',name:'Sicily Laguna Azure',address:'3110 Giovanni Way, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2010 accepted 7/22/2026.',closed:false},
    {id:'2011',type:'est',name:'Sicily Laguna Azure',address:'2902 Cremini Falls, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved - Verify Possible Duplicate',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2011 accepted 7/22/2026. Review possible duplicate before scheduling.',closed:false},
    {id:'2012',type:'est',name:'Sicily Laguna Azure',address:'3107 Lucia Way, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2012 accepted 7/22/2026.',closed:false},
    {id:'2013',type:'est',name:'Sicily Laguna Azure',address:'3016 Isla Terrace, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2013 accepted 7/22/2026.',closed:false},
    {id:'2014',type:'est',name:'Sicily Laguna Azure',address:'3116 Lucia Way, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2014 accepted 7/22/2026.',closed:false},
    {id:'2015',type:'est',name:'Sicily Laguna Azure',address:'517 Parrino Parkway, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Tree removal and replacement',amount:866,category:'SBB',who:'Greg',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'QuickBooks Estimate 2015 accepted 7/22/2026.',closed:false},
    {id:'2016',type:'est',name:'Venetian HOA',address:'1737 Barnwood, Celina, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'8:30 AM route',followUp:'',notes:'QuickBooks Estimate 2016 accepted; Friday KW route.',closed:false},
    {id:'2017',type:'est',name:'Venetian HOA',address:'437 Hoot Owl, Celina, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'Friday route',followUp:'',notes:'QuickBooks Estimate 2017 accepted; Friday KW route.',closed:false},
    {id:'2018',type:'est',name:'Sicily Laguna Azure',address:'3007 Isla Terrace, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'Friday route',followUp:'',notes:'QuickBooks Estimate 2018 accepted; Friday KW route.',closed:false},
    {id:'2019',type:'est',name:'Sicily Laguna Azure',address:'3004 Cremini Falls, Princeton, TX',phone:'',email:'j.deguzman@sbbmanagement.com',service:'Mow, edge, and pull weeds',amount:162.38,category:'KW',who:'KW Landscaping',status:'Approved',workDate:'2026-07-24',workTime:'Friday route',followUp:'',notes:'QuickBooks Estimate 2019 accepted; Friday KW route.',closed:false},
    {id:'WO-GTC-0005',type:'job',name:'Rick Lanicek',address:'379 John Douglas Drive, Van Alstyne, TX',phone:'(214) 552-6125',email:'rlanicek@gmail.com',service:'Remove dead mulberry and broken hackberry leader; fence-line reduction; structural pruning, elevation, clearance and oak canker work.',amount:2200,category:'RESIDENTIAL',who:'Brandon',status:'Scheduled',workDate:'2026-07-25',workTime:'8:00 AM-12:00 PM',followUp:'',notes:'Three-person crew. Climbing, rigging and haul-off equipment.',closed:false},
    {id:'WO-GTC-0007',type:'job',name:'Deborah Stock',address:'3517 Jersey Rd, Melissa, TX 75454',phone:'(254) 855-8842',email:'chefteddy@aol.com',service:'Remove dead front-yard tree; cut stump flush; apply stump treatment; clean up and haul off debris.',amount:703.63,category:'RESIDENTIAL',who:'Dallas crew',status:'Scheduled',workDate:'2026-07-25',workTime:'12:00 PM-1:00 PM',followUp:'',notes:'Accepted QuickBooks Estimate 2007. Scheduled between Rick Lanicek and Johanna Friedel.',closed:false},
    {id:'WO-GTC-0009',type:'job',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',phone:'512-585-8082',email:'jlfriedel@gmail.com',service:'Remove lower visible red-oak deadwood over roof and rear fence; climb and rig as needed; clean up debris.',amount:650,category:'RESIDENTIAL',who:'Dallas crew',status:'Scheduled',workDate:'2026-07-25',workTime:'1:00 PM-5:00 PM',followUp:'',notes:'Approved QuickBooks Estimate 2009.',closed:false},
    {id:'WO-1977',type:'job',name:'Dana & Tom Pierson',address:'9905 County Road 626, Blue Ridge, TX 75424',phone:'214-901-5732',email:'',service:'Full-day personalized tree care; front hackberry removal; rear live-oak clearance; root-collar excavation; pruning, balance and elevation.',amount:2706.25,category:'RESIDENTIAL',who:'Brandon',status:'Approved - Scheduling Needed',workDate:'',workTime:'',followUp:'',notes:'Three-person crew, climbing/rigging, pruning tools and haul-off equipment.',closed:false},
    {id:'FU-1663',type:'job',name:'Marijane Ellisor',address:'1136 Hester St, Nevada, TX 75173',phone:'469-338-9121',email:'Mje.lssbb@gmail.com',service:'Reset and replant displaced shrubs from prior work.',amount:0,category:'RESIDENTIAL',who:'Brandon',status:'In Progress Follow-Up',workDate:'2026-07-18',workTime:'2:45 PM-3:30 PM',followUp:'',notes:'Service follow-up, not a new estimate.',closed:false},
    {id:'SV-0719-CARL',type:'job',name:'Carl Diehl',address:'2111 Knobhill Rd, Van Alstyne, TX 75495',phone:'903-436-5483',email:'carlbdiehl@gmail.com',service:'Rebolt / two-bolt cable service at oak tree.',amount:0,category:'RESIDENTIAL',who:'Brandon',status:'Scheduled Service - Verify Completion',workDate:'2026-07-19',workTime:'10:00 AM-4:00 PM',followUp:'',notes:'Confirmed calendar service; verify final completion state.',closed:false},
    {id:'WO-1978',type:'job',name:'Johanna Friedel',address:'1103 Hyde Park Dr, McKinney, TX 75069',phone:'512-585-8082',email:'jlfriedel@gmail.com',service:'Prune, shape and train rear cypress; remove bagworms; clean up debris.',amount:311.22,category:'RESIDENTIAL',who:'Brandon',status:'Complete',workDate:'2026-07-18',workTime:'1:10 PM-2:10 PM',followUp:'',notes:'Invoice 1666 paid in full, including gratuity.',closed:true},
    {id:'FU-1980',type:'job',name:'Michael Lawrence',address:'1272 Lester Burt Rd, Farmersville, TX 75442',phone:'972-814-0915',email:'mdlawrence1961@gmail.com',service:'Remove pine at house and stump grind.',amount:2760.38,category:'RESIDENTIAL',who:'Brandon',status:'Complete',workDate:'2026-07-18',workTime:'8:00 AM-9:30 AM',followUp:'',notes:'Invoice 1664 paid in full.',closed:true}
  ];

  const people = [
    {name:'Greg',role:'Co-founder / owner / management / sales',email:'greg@arborwisetreecare.com',group:'Arborwise'},
    {name:'Brandon',role:'Co-founder / owner / operations / estimator / crew lead',email:'brandon@arborwisetreecare.com',group:'Arborwise'},
    {name:'Toby Palmer',role:'Estimator',email:'',group:'Arborwise'},
    {name:'Dallas crew',role:'Three-person subcontract crew',email:'',group:'Crew / subcontractor'},
    {name:'KW Landscaping',role:'SBB mowing subcontractor',email:'',group:'SBB Management'}
  ];
  const managementGroups = [
    {name:'Residential',detail:'Homeowners and direct Arborwise customers'},
    {name:'SBB Management',detail:'Sicily Laguna Azure, Venetian HOA, AnaCapri, and related work'},
    {name:'Goodwin Management',detail:'Castlebrook and related managed communities'},
    {name:'Kanam Management',detail:'Kanam Realty Group managed properties'}
  ];
  const equipment = [
    {group:'Vehicles & Trailers',name:'2022 Chevy 2500 HD, four-wheel drive',task:'Weekly wash and tire-pressure check'},
    {group:'Vehicles & Trailers',name:'16 ft dump trailer (lowboy)',task:'Grease, wash, inspect tires, brakes, lights, hitch, chains, wiring and doors'},
    {group:'Vehicles & Trailers',name:'16 ft flatbed trailer',task:'Inspect deck, tires, lights, hitch, chains and tie-down points'},
    {group:'Saws & Power Tools',name:'Stihl MS 500i chainsaw',task:'Clean filter and cover; inspect and sharpen chain'},
    {group:'Saws & Power Tools',name:'Stihl MS 261 chainsaw',task:'Clean filter and cover; inspect and sharpen chain'},
    {group:'Saws & Power Tools',name:'Stihl MS 194 chainsaw',task:'Clean filter and cover; inspect and sharpen chain'},
    {group:'Saws & Power Tools',name:'Echo CS400 chainsaw',task:'Clean filter and cover; inspect and sharpen chain'},
    {group:'Saws & Power Tools',name:'Stihl backpack blower',task:'Clean filter; inspect condition and controls'},
    {group:'Saws & Power Tools',name:'Stihl power pruner 1',task:'Inspect filter, saw head, chain and pole'},
    {group:'Saws & Power Tools',name:'Stihl power pruner 2',task:'Inspect filter, saw head, chain and pole'},
    {group:'Saws & Power Tools',name:'Stihl auger drill',task:'Inspect filter, auger and controls'},
    {group:'Saws & Power Tools',name:'Stihl hedge trimmer / attachment',task:'Clean and inspect filter and cutting head'},
    {group:'Saws & Power Tools',name:'Milwaukee drill with 5 ft bit',task:'Inspect battery, chuck, bit, fasteners and condition'},
    {group:'Climbing & Rigging',name:'Climbing gear',task:'Inspect ropes, saddles, carabiners, friction devices and wear points'},
    {group:'Climbing & Rigging',name:'Rigging gear including quarter wraps',task:'Inspect ropes, blocks, slings, hardware and wear points'},
    {group:'Climbing & Rigging',name:'Porta-Wrap',task:'Inspect attachment point, welds, surface damage and hardware'},
    {group:'Climbing & Rigging',name:'6 manual poles',task:'Inspect for breaks, cracks, bends and unsafe wear'},
    {group:'Climbing & Rigging',name:'Saw heads for poles',task:'Account for, clean and inspect every saw head'},
    {group:'Climbing & Rigging',name:'Pruning heads for poles',task:'Clean with bleach and sharpen weekly'}
  ];

  function safeParse(value, fallback) { try { return JSON.parse(value); } catch { return fallback; } }
  const saved = safeParse(localStorage.getItem(STORAGE_KEY), null);
  const legacy = safeParse(localStorage.getItem(LEGACY_KEY), null);
  const state = saved && Array.isArray(saved.records)
    ? saved
    : {records:records.map(item => ({...item})), hours:Array.isArray(legacy?.hours)?legacy.hours:[], mileage:Array.isArray(legacy?.mileage)?legacy.mileage:[], notes:Array.isArray(legacy?.notes)?legacy.notes:[], filter:'ALL', groupFilter:'ALL', tab:'TODAY'};
  state.tab = 'TODAY';
  state.filter = 'ALL';
  state.groupFilter = 'ALL';
  state.records = Array.isArray(state.records) ? state.records : records.map(item => ({...item}));
  const currentById = new Map(state.records.map(item => [String(item.id), item]));
  for (const item of records) if (!currentById.has(item.id)) currentById.set(item.id, {...item});
  state.records = [...currentById.values()];
  state.hours = Array.isArray(state.hours) ? state.hours : [];
  state.mileage = Array.isArray(state.mileage) ? state.mileage : [];
  state.notes = Array.isArray(state.notes) ? state.notes : [];

  const FILTERS = ['ALL','GREG','BRANDON','DALLAS','KW'];
  const GROUPS = [['ALL','ALL'],['RESIDENTIAL','RESIDENTIAL'],['SBB','SBB MANAGEMENT'],['GOODWIN','GOODWIN'],['KANAM','KANAM']];
  const TABS = ['TODAY','ESTIMATES','JOBS','PEOPLE','EQUIPMENT','COMPLETED','HOURS','FLEET','NOTES'];

  const style = document.createElement('style');
  style.textContent = `
    header .logo{display:block;width:min(300px,68vw);height:88px;object-fit:contain;margin:0 auto 2px}
    .filters{display:flex;overflow-x:auto;justify-content:flex-start}.filters button{min-width:118px;flex:0 0 auto}
    #groupFilters{display:flex;gap:7px;overflow-x:auto;padding:8px 10px;background:#ebe9df;border-bottom:1px solid #d9d6ca}
    #groupFilters button{white-space:nowrap;border:1.5px solid #17402b;border-radius:999px;background:#fff;color:#17402b;padding:8px 12px;font-weight:800}
    #groupFilters button.on{background:#17402b;color:#fff}
    nav{justify-content:flex-start}nav button{min-width:92px;flex:0 0 auto}
    .directoryCard,.equipmentCard{background:#fff;border:1px solid #ddd9cc;border-radius:14px;padding:14px;margin:10px 0;box-shadow:0 1px 3px rgba(0,0,0,.06)}
    .directoryCard strong,.equipmentCard strong{font-size:20px;color:#17402b}.directoryCard small,.equipmentCard small{display:block;color:#687068;margin-top:4px;line-height:1.4}
    .sectionLabel{font-size:20px;font-weight:900;color:#17402b;margin:20px 0 8px;text-transform:uppercase}
    .contactRow{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.contactRow a{padding:8px 12px;border:1px solid #17402b;border-radius:999px;color:#17402b;text-decoration:none;font-weight:800}
    .recordActions{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.recordActions a{padding:7px 11px;border:1px solid #17402b;border-radius:999px;color:#17402b;text-decoration:none;font-weight:800;font-size:13px}
    @media(max-width:390px){header .logo{width:58vw}.sync{font-size:12px;padding:8px 9px}}
  `;
  document.head.appendChild(style);

  const groupBar = document.createElement('section');
  groupBar.id = 'groupFilters';
  filters.insertAdjacentElement('afterend', groupBar);

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function esc(value='') { return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot',"'":'&#39;'}[char])); }
  function money(value) { return Number(value) ? new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)) : ''; }
  function today() { const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function addDays(iso, count) { const d=new Date(`${iso}T12:00:00`); d.setDate(d.getDate()+count); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; }
  function toast(message) { toastEl.textContent=message; toastEl.hidden=false; clearTimeout(toast._t); toast._t=setTimeout(()=>toastEl.hidden=true,2600); }
  function closeSheet() { veil.hidden=true; sheet.innerHTML=''; }
  veil.onclick = event => { if (event.target===veil) closeSheet(); };

  function matches(record) {
    const who=String(record.who||'').toUpperCase();
    const category=String(record.category||'RESIDENTIAL').toUpperCase();
    let employee=true;
    if(state.filter==='GREG') employee=who.includes('GREG')||who.includes('TOBY');
    if(state.filter==='BRANDON') employee=who.includes('BRANDON');
    if(state.filter==='DALLAS') employee=who.includes('DALLAS');
    if(state.filter==='KW') employee=who.includes('KW');
    let group=true;
    if(state.groupFilter==='RESIDENTIAL') group=category==='RESIDENTIAL'||category==='ARBORWISE';
    if(state.groupFilter==='SBB') group=category==='SBB'||category==='KW';
    if(state.groupFilter==='GOODWIN') group=category==='GOODWIN';
    if(state.groupFilter==='KANAM') group=category==='KANAM';
    return employee&&group;
  }

  function visibleRecords() {
    let rows=state.records.filter(matches);
    if(state.tab==='ESTIMATES') rows=rows.filter(item=>item.type==='est'&&!item.closed);
    if(state.tab==='JOBS') rows=rows.filter(item=>item.type==='job'&&!item.closed);
    if(state.tab==='COMPLETED') rows=rows.filter(item=>item.closed);
    if(state.tab==='TODAY') {
      const start=today(), end=addDays(start,7);
      rows=rows.filter(item=>{
        if(item.closed) return false;
        const due=item.workDate||item.followUp||'';
        if(!due) return /approved|follow|progress|verify/i.test(String(item.status||''));
        return (due>=start&&due<=end)||due<start;
      });
    }
    return rows.sort((a,b)=>(a.workDate||a.followUp||'9999-99-99').localeCompare(b.workDate||b.followUp||'9999-99-99')||String(a.workTime||'').localeCompare(String(b.workTime||''))||String(a.name||'').localeCompare(String(b.name||'')));
  }

  function recordCard(record) {
    const due=record.workDate||record.followUp||'';
    const actions=[];
    if(record.phone) actions.push(`<a href="tel:${esc(record.phone)}" onclick="event.stopPropagation()">CALL</a>`,`<a href="sms:${esc(record.phone)}" onclick="event.stopPropagation()">TEXT</a>`);
    if(record.email) actions.push(`<a href="mailto:${esc(record.email)}" onclick="event.stopPropagation()">EMAIL</a>`);
    if(record.address) actions.push(`<a href="https://maps.google.com/?q=${encodeURIComponent(record.address)}" target="_blank" rel="noopener" onclick="event.stopPropagation()">MAP</a>`);
    return `<article class="card ${record.type==='job'?'job':'estimate'} ${record.closed?'done':''}" data-record="${esc(record.id)}"><div class="top"><div><span class="tag">${record.type==='job'?'JOB':'ESTIMATE'}</span><span class="recordId">${esc(record.id)}</span></div><div class="money">${money(record.amount)}</div></div><div class="name">${esc(record.name)}</div>${record.address?`<div class="address">${esc(record.address)}</div>`:''}<div class="service">${esc(record.service||'')}</div>${record.notes?`<div class="notes">${esc(record.notes)}</div>`:''}<div class="pills"><span class="pill">${esc(record.status||'Open')}</span><span class="pill who">${esc(record.who||'Unassigned')}</span>${due?`<span class="pill date">${esc(due)}${record.workTime?' • '+esc(record.workTime):''}</span>`:''}</div>${actions.length?`<div class="recordActions">${actions.join('')}</div>`:''}</article>`;
  }

  function renderFilters() {
    filters.innerHTML=FILTERS.map(value=>`<button class="${state.filter===value?'on':''}" data-filter="${value}">${value}</button>`).join('');
    filters.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.filter=button.dataset.filter;save();render();});
    groupBar.innerHTML=GROUPS.map(([value,label])=>`<button class="${state.groupFilter===value?'on':''}" data-group="${value}">${label}</button>`).join('');
    groupBar.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.groupFilter=button.dataset.group;save();render();});
  }
  function renderTabs() {
    tabs.innerHTML=TABS.map(value=>`<button class="${state.tab===value?'on':''}" data-tab="${value}">${value}</button>`).join('');
    tabs.querySelectorAll('button').forEach(button=>button.onclick=()=>{state.tab=button.dataset.tab;save();render();window.scrollTo(0,0);});
  }
  function renderRecords() {
    const rows=visibleRecords();
    const title=state.tab==='TODAY'?'Today + Next 7 Days + Unscheduled':state.tab==='COMPLETED'?'Completed — Tap to reopen':state.tab;
    main.innerHTML=`<div class="title"><span>${title}</span><span class="count">${rows.length}</span></div>${rows.length?rows.map(recordCard).join(''):'<div class="empty">Nothing here for these filters.</div>'}`;
    main.querySelectorAll('[data-record]').forEach(element=>element.onclick=()=>openRecord(element.dataset.record));
  }
  function renderPeople() {
    main.innerHTML=`<div class="title"><span>People & Management Groups</span><span class="count">${people.length+managementGroups.length}</span></div><div class="sectionLabel">Employees & Crew</div>${people.map(person=>`<div class="directoryCard"><strong>${esc(person.name)}</strong><small>${esc(person.role)} • ${esc(person.group)}</small>${person.email?`<div class="contactRow"><a href="mailto:${esc(person.email)}">EMAIL</a></div>`:''}</div>`).join('')}<div class="sectionLabel">Management Groups</div>${managementGroups.map(group=>`<div class="directoryCard"><strong>${esc(group.name)}</strong><small>${esc(group.detail)}</small></div>`).join('')}`;
  }
  function renderEquipment() {
    const groups=[...new Set(equipment.map(item=>item.group))];
    main.innerHTML=`<div class="title"><span>Equipment & Maintenance</span><span class="count">${equipment.length}</span></div>${groups.map(group=>`<div class="sectionLabel">${esc(group)}</div>${equipment.filter(item=>item.group===group).map(item=>`<div class="equipmentCard"><strong>${esc(item.name)}</strong><small>${esc(item.task)}</small></div>`).join('')}`).join('')}`;
  }
  function renderHours() {
    main.innerHTML=`<div class="title"><span>Hours</span><span class="count">${state.hours.length}</span></div>${state.hours.length?state.hours.slice().reverse().map(item=>`<div class="hoursCard"><strong>${esc(item.employee)}</strong><span class="right">${Number(item.hours||0).toFixed(2)} hrs</span><div>${esc(item.date)} • ${esc(item.start)}-${esc(item.end)}</div><div class="notes">${esc(item.job||'')}${item.notes?' • '+esc(item.notes):''}</div></div>`).join(''):'<div class="empty">No hours logged yet. Tap +.</div>'}`;
  }
  function renderFleet() {
    main.innerHTML=`<div class="title"><span>Mileage</span><span class="count">${state.mileage.length}</span></div>${state.mileage.length?state.mileage.slice().reverse().map(item=>`<div class="hoursCard"><strong>${esc(item.date)}</strong><span class="right">${Number(item.miles||0).toFixed(1)} mi</span><div>${esc(item.from)} → ${esc(item.to)}</div><div class="notes">${esc(item.why||'')}</div></div>`).join(''):'<div class="empty">No mileage logged yet. Tap +.</div>'}`;
  }
  function renderNotes() {
    main.innerHTML=`<div class="title"><span>Notes</span><span class="count">${state.notes.length}</span></div>${state.notes.length?state.notes.slice().reverse().map(item=>`<div class="noteCard">${esc(item.body)}<div class="notes">${esc(item.author||'')} • ${esc(item.time||'')}</div></div>`).join(''):'<div class="empty">No notes yet. Tap +.</div>'}`;
  }
  function render() {
    renderFilters();renderTabs();
    $('dateLine').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric',year:'numeric'});
    statusButton.textContent='CURRENT OPERATIONS SNAPSHOT • QUICKBOOKS CONNECTION PAUSED';
    if(['TODAY','ESTIMATES','JOBS','COMPLETED'].includes(state.tab)) renderRecords();
    else if(state.tab==='PEOPLE') renderPeople();
    else if(state.tab==='EQUIPMENT') renderEquipment();
    else if(state.tab==='HOURS') renderHours();
    else if(state.tab==='FLEET') renderFleet();
    else renderNotes();
  }

  function field(id,label,value='',type='text') { return `<div class="field"><label for="${id}">${label}</label><input id="${id}" type="${type}" value="${esc(value)}"></div>`; }
  function persistRecord(record, oldId='') {
    state.records=state.records.filter(item=>String(item.id)!==String(oldId||record.id));state.records.push(record);save();render();
  }
  function openRecord(id='') {
    const original=id?state.records.find(item=>String(item.id)===String(id)):null;
    const record=original||{id:'',type:'est',name:'',address:'',phone:'',email:'',service:'',amount:'',category:'RESIDENTIAL',who:'Greg',status:'Estimate Sent',workDate:'',workTime:'',followUp:'',notes:'',closed:false};
    sheet.innerHTML=`<h2>${original?'Edit':'Add'} record</h2><div class="row">${field('r-id','Record ID',record.id)}<div class="field"><label>Type</label><select id="r-type"><option value="est" ${record.type==='est'?'selected':''}>Estimate</option><option value="job" ${record.type==='job'?'selected':''}>Job</option></select></div></div>${field('r-name','Customer',record.name)}${field('r-address','Address',record.address)}<div class="row">${field('r-phone','Phone',record.phone)}${field('r-email','Email',record.email)}</div><div class="field"><label>Service</label><textarea id="r-service">${esc(record.service)}</textarea></div><div class="row">${field('r-amount','Amount',record.amount,'number')}${field('r-category','Management group',record.category)}</div><div class="row">${field('r-who','Assigned to',record.who)}${field('r-status','Status',record.status)}</div><div class="row">${field('r-work','Work date',record.workDate,'date')}${field('r-follow','Follow-up',record.followUp,'date')}</div>${field('r-time','Time window',record.workTime)}<div class="field"><label>Notes</label><textarea id="r-notes">${esc(record.notes)}</textarea></div>${original?`<button class="wideButton ${record.closed?'primary':'secondary'}" id="toggleComplete">${record.closed?'REOPEN / MARK INCOMPLETE':'MARK COMPLETE'}</button>`:''}<div class="buttons"><button class="secondary" id="cancel">CANCEL</button>${original?'<button class="danger" id="delete">DELETE</button>':''}<button class="primary" id="saveRecord">SAVE</button></div>`;
    veil.hidden=false;
    $('cancel').onclick=closeSheet;
    const collect=closed=>({id:$('r-id').value.trim()||`${$('r-type').value==='job'?'WO':'EST'}-${Date.now()}`,type:$('r-type').value,name:$('r-name').value.trim(),address:$('r-address').value.trim(),phone:$('r-phone').value.trim(),email:$('r-email').value.trim(),service:$('r-service').value.trim(),amount:Number($('r-amount').value)||0,category:$('r-category').value.trim()||'RESIDENTIAL',who:$('r-who').value.trim(),status:$('r-status').value.trim(),workDate:$('r-work').value,followUp:$('r-follow').value,workTime:$('r-time').value.trim(),notes:$('r-notes').value.trim(),closed:Boolean(closed)});
    if(original) $('delete').onclick=()=>{state.records=state.records.filter(item=>String(item.id)!==String(original.id));save();closeSheet();render();toast('Record removed');};
    if(original) $('toggleComplete').onclick=()=>{const next=collect(!original.closed);if(!next.name){toast('Customer name is required');return;}next.status=next.closed?'Complete':'Reopened — Needs Attention';persistRecord(next,original.id);closeSheet();toast(next.closed?'Moved to Completed':'Reopened and returned to active work');};
    $('saveRecord').onclick=()=>{const next=collect(Boolean(original?.closed));if(!next.name){toast('Customer name is required');return;}persistRecord(next,original?.id||'');closeSheet();toast('Saved');};
  }
  function openHours() {
    sheet.innerHTML=`<h2>Add hours</h2>${field('h-date','Date',today(),'date')}${field('h-employee','Employee','Brandon')}${field('h-job','Job / customer','')}<div class="row">${field('h-start','Start','','time')}${field('h-end','End','','time')}</div>${field('h-break','Unpaid break minutes','0','number')}<div class="field"><label>Notes</label><textarea id="h-notes"></textarea></div><div class="buttons"><button class="secondary" id="cancel">CANCEL</button><button class="primary" id="saveHours">SAVE</button></div>`;veil.hidden=false;$('cancel').onclick=closeSheet;$('saveHours').onclick=()=>{const start=$('h-start').value,end=$('h-end').value;const [sh,sm]=start.split(':').map(Number),[eh,em]=end.split(':').map(Number);let minutes=(eh*60+em)-(sh*60+sm);if(minutes<0)minutes+=1440;minutes-=Number($('h-break').value||0);const entry={date:$('h-date').value,employee:$('h-employee').value.trim(),job:$('h-job').value.trim(),start,end,hours:Math.max(0,minutes/60),notes:$('h-notes').value.trim()};if(!entry.date||!entry.employee||!start||!end||entry.hours<=0){toast('Check the date and times');return;}state.hours.push(entry);save();closeSheet();render();};
  }
  function openMileage() {
    sheet.innerHTML=`<h2>Log mileage</h2>${field('m-date','Date',today(),'date')}${field('m-from','From')}${field('m-to','To')}${field('m-miles','Miles','','number')}${field('m-why','Purpose')}<div class="buttons"><button class="secondary" id="cancel">CANCEL</button><button class="primary" id="saveMileage">SAVE</button></div>`;veil.hidden=false;$('cancel').onclick=closeSheet;$('saveMileage').onclick=()=>{const entry={date:$('m-date').value,from:$('m-from').value.trim(),to:$('m-to').value.trim(),miles:Number($('m-miles').value)||0,why:$('m-why').value.trim()};if(!entry.date||!entry.miles){toast('Date and miles are required');return;}state.mileage.push(entry);save();closeSheet();render();};
  }
  function openNote() {
    sheet.innerHTML=`<h2>Add note</h2>${field('n-author','Author','Greg')}<div class="field"><label>Note</label><textarea id="n-body"></textarea></div><div class="buttons"><button class="secondary" id="cancel">CANCEL</button><button class="primary" id="saveNote">SAVE</button></div>`;veil.hidden=false;$('cancel').onclick=closeSheet;$('saveNote').onclick=()=>{const entry={body:$('n-body').value.trim(),author:$('n-author').value.trim(),time:new Date().toLocaleString()};if(!entry.body)return;state.notes.push(entry);save();closeSheet();render();};
  }

  $('addButton').onclick=()=>{if(['TODAY','ESTIMATES','JOBS'].includes(state.tab))openRecord();else if(state.tab==='HOURS')openHours();else if(state.tab==='FLEET')openMileage();else if(state.tab==='NOTES')openNote();else toast('Open Today, Estimates, Jobs, Hours, Fleet, or Notes to add an item');};
  refreshButton.onclick=()=>{refreshButton.classList.add('spinning');state.tab='TODAY';state.filter='ALL';state.groupFilter='ALL';save();render();setTimeout(()=>refreshButton.classList.remove('spinning'),450);toast('Current board loaded');};
  statusButton.onclick=()=>toast('Working snapshot is available while QuickBooks authorization is paused');
  const annieButton=$('annieButton'),annieBubble=$('annieBubble');
  if(annieButton&&annieBubble)annieButton.onclick=()=>{const lines=['Six approved SBB tree replacements are unscheduled.','Friday has four approved mowing stops assigned to KW Landscaping.','Saturday: Rick 8–12, Deborah 12–1, Johanna 1–5.','Dana and Tom are approved and waiting for a crew date.','Completed work can always be reopened.'];annieBubble.textContent=lines[Math.floor(Math.random()*lines.length)];annieBubble.hidden=false;clearTimeout(window.annieTimer);window.annieTimer=setTimeout(()=>annieBubble.hidden=true,6000);};

  save();render();
})();
