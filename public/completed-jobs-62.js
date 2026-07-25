'use strict';
(() => {
  const tabs=document.getElementById('tabs');
  const main=document.getElementById('main');
  if(!tabs||!main)return;

  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const money=value=>Number(value)?new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)):'';
  const completed=item=>{
    const status=String(item?.status||item?.rawStatus||'').toLowerCase();
    return item?.type==='job'&&(/complete|paid|done/.test(status)||Boolean(item?.closed&&!/cancel|declin|reject/.test(status)));
  };
  const cancelled=item=>{
    const status=String(item?.status||item?.rawStatus||'').toLowerCase();
    return item?.type==='job'&&/cancel|declin|reject/.test(status);
  };
  const dateValue=item=>String(item?.workDate||item?.followUp||'');
  const action=(kind,href,label,extra='')=>`<a class="recordAction ${kind}" href="${href}" aria-label="${esc(label)}" title="${esc(label)}" ${extra}><span class="completedActionText">${kind.toUpperCase()}</span></a>`;
  const card=item=>{
    const phone=String(item.phone||'').replace(/[^0-9+]/g,'');
    const actions=[];
    if(phone){
      actions.push(action('call',`tel:${esc(phone)}`,`Call ${item.name||'customer'}`));
      actions.push(action('text',`sms:${esc(phone)}`,`Text ${item.name||'customer'}`));
    }
    if(item.email)actions.push(action('email',`mailto:${esc(item.email)}`,`Email ${item.name||'customer'}`));
    if(item.address)actions.push(action('map',`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.address)}`,`Map ${item.name||'customer'}`,'target="_blank" rel="noopener"'));
    const due=dateValue(item);
    const costs=item.laborCost||item.otherCost?`<div class="sourceLine">Labor ${money(item.laborCost)||'$0.00'} • Other ${money(item.otherCost)||'$0.00'}</div>`:'';
    return `<article class="card job completed completedJob62">
      <div class="top"><div><span class="tag">JOB</span><span class="recordId">${esc(item.id)}</span></div><div class="money">${money(item.amount)}</div></div>
      <div class="name">${esc(item.name)}</div>
      ${item.address?`<div class="address">${esc(item.address)}</div>`:''}
      <div class="service">${esc(item.service||'')}</div>
      ${item.notes?`<div class="notes">${esc(item.notes)}</div>`:''}
      ${costs}
      <div class="pills"><span class="pill completed">${esc(item.status||'Completed')}</span><span class="pill who">${esc(item.who||'Unassigned')}</span>${due?`<span class="pill date">${esc(due)}${item.workTime?' • '+esc(item.workTime):''}</span>`:''}</div>
      ${actions.length?`<div class="recordActions">${actions.join('')}</div>`:''}
      <div class="readonlyNote">Completed history • Source: ${esc(item.source||'Google Sheets')}</div>
    </article>`;
  };

  const style=document.createElement('style');
  style.textContent=`
    .completedHeading62{display:flex;align-items:center;justify-content:space-between;gap:12px;margin:14px 2px 9px;padding:12px 14px;border:2px solid #6f9974;border-radius:14px;background:#e8f3e8;color:#274e31;font-size:16px;font-weight:950;text-transform:uppercase;letter-spacing:.05em}
    .completedHeading62.cancelled{margin-top:20px;border-color:#b68b86;background:#f3e9e7;color:#6f3731}
    .completedHeading62 span:last-child{min-width:28px;padding:3px 8px;border-radius:999px;background:#274e31;color:#fff;text-align:center;font-size:12px}
    .completedHeading62.cancelled span:last-child{background:#6f3731}
    .completedJob62{opacity:1!important;filter:none!important;background:linear-gradient(90deg,#eef6ed 0,#fff 38%)!important;border-color:#9fba9f!important}
    .completedJob62 .name{text-decoration:none!important}
    .completedJob62:before{background:#6f9974!important}
    .completedActionText{position:static!important;width:auto!important;height:auto!important;margin:0!important;clip:auto!important;overflow:visible!important;font-size:11px;font-weight:950}
  `;
  document.head.appendChild(style);

  function active(){return tabs.querySelector('button.on')?.textContent?.trim().toUpperCase()==='COMPLETED';}
  function forceAllVisual(){
    document.querySelectorAll('#filters button').forEach(button=>button.classList.toggle('on',button.dataset.filter==='ALL'));
    document.querySelectorAll('#groupFilters54 button').forEach(button=>button.classList.toggle('on',button.dataset.group==='ALL'));
    try{
      const key='arborwise-board-ui-v57';
      const saved=JSON.parse(localStorage.getItem(key)||'{}');
      localStorage.setItem(key,JSON.stringify({...saved,tab:'COMPLETED',filter:'ALL',group:'ALL'}));
    }catch{}
  }
  function records(){return Array.isArray(window.ARBORWISE_CURRENT_OPERATIONS?.records)?window.ARBORWISE_CURRENT_OPERATIONS.records:[];}
  function render(){
    if(!active())return;
    const all=records();
    if(!all.length)return;
    forceAllVisual();
    const done=all.filter(completed).sort((a,b)=>dateValue(b).localeCompare(dateValue(a))||String(a.name||'').localeCompare(String(b.name||'')));
    const stopped=all.filter(cancelled).sort((a,b)=>dateValue(b).localeCompare(dateValue(a))||String(a.name||'').localeCompare(String(b.name||'')));
    let html=`<div class="completedHeading62"><span>Completed Jobs</span><span>${done.length}</span></div>`;
    html+=done.length?done.map(card).join(''):'<div class="empty">No completed jobs were returned from the Jobs sheet.</div>';
    if(stopped.length)html+=`<div class="completedHeading62 cancelled"><span>Cancelled Jobs</span><span>${stopped.length}</span></div>${stopped.map(card).join('')}`;
    main.innerHTML=html;
    main.querySelectorAll('.recordAction').forEach(link=>link.addEventListener('click',event=>event.stopPropagation()));
  }

  let queued=false;
  const queue=()=>{
    if(queued)return;
    queued=true;
    setTimeout(()=>{queued=false;render();},40);
  };
  tabs.addEventListener('click',event=>{
    if(event.target.closest('button')?.textContent?.trim().toUpperCase()==='COMPLETED')queue();
  });
  window.addEventListener('arborwise:data-ready',queue);
  const observer=new MutationObserver(()=>{if(active())queue();});
  observer.observe(tabs,{childList:true,subtree:true});
  queue();
})();
