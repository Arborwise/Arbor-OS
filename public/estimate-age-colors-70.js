'use strict';
(() => {
  const VERSION='71';
  const recordsById=new Map();
  const main=document.getElementById('main');
  const tabs=document.getElementById('tabs');
  if(!main||!tabs)return;

  const style=document.createElement('style');
  style.id=`arborwise-status-board-${VERSION}`;
  style.textContent=`
    .card.estimate.estimate-new{
      background:#fff3a6!important;
      border-color:#d7ad00!important;
      box-shadow:0 3px 9px rgba(154,116,0,.18)!important;
    }
    .card.estimate.estimate-new:before{background:#e0b400!important}
    .card.estimate.estimate-complete{
      background:#ffc078!important;
      border-color:#d96b00!important;
      box-shadow:0 3px 9px rgba(174,79,0,.20)!important;
    }
    .card.estimate.estimate-complete:before{background:#e4590c!important}
    .card.estimate.estimate-review{
      background:#f8dfdb!important;
      border-color:#bd655b!important;
      box-shadow:0 3px 9px rgba(128,45,37,.14)!important;
    }
    .card.estimate.estimate-review:before{background:#a62b24!important}
    .card.estimate.estimate-accepted{
      background:#dff0e4!important;
      border-color:#5f936c!important;
    }
    .card.estimate.estimate-accepted:before{background:#28643b!important}
    .estimateSection71{
      display:flex;align-items:center;justify-content:space-between;gap:10px;
      margin:16px 2px 8px;padding:11px 13px;border:2px solid;border-radius:13px;
      font-size:14px;font-weight:950;letter-spacing:.045em;text-transform:uppercase;
    }
    .estimateSection71 span:last-child{min-width:28px;padding:3px 8px;border-radius:999px;text-align:center;font-size:12px}
    .estimateSection71.new{background:#fff3a6;border-color:#d7ad00;color:#654e00}
    .estimateSection71.new span:last-child{background:#654e00;color:#fff}
    .estimateSection71.review{background:#f8dfdb;border-color:#bd655b;color:#762f28}
    .estimateSection71.review span:last-child{background:#762f28;color:#fff}
    .estimateSection71.complete{background:#ffc078;border-color:#d96b00;color:#743700}
    .estimateSection71.complete span:last-child{background:#9b4700;color:#fff}
    .estimateSection71.accepted{background:#dff0e4;border-color:#5f936c;color:#174b31}
    .estimateSection71.accepted span:last-child{background:#174b31;color:#fff}
    .card.job.completed{
      opacity:1!important;filter:none!important;
      background:#e1e8de!important;border-color:#78927a!important;
      box-shadow:0 3px 9px rgba(39,78,49,.12)!important;
    }
    .card.job.completed:before{background:#365f3c!important}
    .card.job.completed .name{text-decoration:none!important;color:#334238!important}
    .card.job.completed .service,.card.job.completed .notes,.card.job.completed .address{color:#526057!important}
    .card.job.completed .pill.completed{
      background:#274e31!important;border-color:#274e31!important;color:#fff!important;
      font-weight:950!important;
    }
  `;
  if(!document.getElementById(style.id))document.head.appendChild(style);

  const text=value=>String(value??'').trim();
  const lower=value=>text(value).toLowerCase();
  const dateKey=record=>text(record?.dateAdded||record?.workDate||record?.followUp||'');
  const recordForCard=card=>recordsById.get(text(card.querySelector('.recordId')?.textContent));
  const activeTab=()=>text(tabs.querySelector('button.on')?.textContent).toUpperCase();

  function estimateState(record){
    const status=lower(`${record?.status||''} ${record?.rawStatus||''}`);
    if(/approved|accepted|converted|scheduling/.test(status))return 'accepted';
    if(/needs review|review required|hold|blocked|problem|error/.test(status))return 'review';
    if(/estimate sent|sent|follow[ -]?up|quote sent|proposal sent|estimate complete|completed estimate/.test(status))return 'complete';
    return 'new';
  }

  function completionLabel(record){
    const combined=lower(`${record?.status||''} ${record?.rawStatus||''} ${record?.notes||''}`);
    return /invoic/.test(combined)?'✓ DONE • INVOICED':'✓ DONE';
  }

  function decorateCards(){
    main.querySelectorAll('article.card.estimate').forEach(card=>{
      const record=recordForCard(card);
      const state=estimateState(record);
      card.classList.remove('estimate-new','estimate-complete','estimate-review','estimate-accepted','estimate-aged');
      card.classList.add(`estimate-${state}`);
      card.dataset.estimateState=state;
      card.dataset.estimateDate=dateKey(record);
    });
    main.querySelectorAll('article.card.job.completed').forEach(card=>{
      const record=recordForCard(card);
      const pill=card.querySelector('.pill.completed');
      const label=completionLabel(record);
      if(pill&&pill.textContent!==label)pill.textContent=label;
    });
  }

  function compareCards(a,b){
    const rank={new:0,review:1,accepted:2,complete:3};
    const aState=a.dataset.estimateState||'new';
    const bState=b.dataset.estimateState||'new';
    const rankDifference=(rank[aState]??1)-(rank[bState]??1);
    if(rankDifference)return rankDifference;
    const aDate=a.dataset.estimateDate||'';
    const bDate=b.dataset.estimateDate||'';
    const dateDifference=bDate.localeCompare(aDate);
    if(dateDifference)return dateDifference;
    return text(a.querySelector('.name')?.textContent).localeCompare(text(b.querySelector('.name')?.textContent));
  }

  function heading(kind,label,count){
    const node=document.createElement('div');
    node.className=`estimateSection71 ${kind}`;
    node.dataset.estimateSection71='true';
    node.innerHTML=`<span>${label}</span><span>${count}</span>`;
    return node;
  }

  let observer=null;
  function organizeEstimates(){
    main.querySelectorAll('[data-estimate-section71]').forEach(node=>node.remove());
    if(activeTab()!=='ESTIMATES')return;
    const cards=Array.from(main.children).filter(node=>node.matches?.('article.card.estimate')).sort(compareCards);
    if(!cards.length)return;

    const groups={new:[],review:[],accepted:[],complete:[]};
    cards.forEach(card=>groups[card.dataset.estimateState||'new'].push(card));
    cards.forEach(card=>card.remove());
    const fragment=document.createDocumentFragment();
    if(groups.new.length){
      fragment.appendChild(heading('new','New • Estimate Not Completed',groups.new.length));
      groups.new.forEach(card=>fragment.appendChild(card));
    }
    if(groups.review.length){
      fragment.appendChild(heading('review','Needs Review',groups.review.length));
      groups.review.forEach(card=>fragment.appendChild(card));
    }
    if(groups.accepted.length){
      fragment.appendChild(heading('accepted','Accepted • Move to Jobs',groups.accepted.length));
      groups.accepted.forEach(card=>fragment.appendChild(card));
    }
    if(groups.complete.length){
      fragment.appendChild(heading('complete','Estimate Done • Awaiting Acceptance',groups.complete.length));
      groups.complete.forEach(card=>fragment.appendChild(card));
    }
    main.appendChild(fragment);
  }

  let queued=false;
  function apply(){
    queued=false;
    observer?.disconnect();
    decorateCards();
    organizeEstimates();
    observer?.observe(main,{childList:true,subtree:true});
  }
  function queueApply(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(apply);
  }

  function refreshRecords(){
    recordsById.clear();
    const records=window.ARBORWISE_CURRENT_OPERATIONS?.records;
    if(Array.isArray(records))for(const record of records)recordsById.set(text(record.id),record);
    queueApply();
  }

  observer=new MutationObserver(queueApply);
  observer.observe(main,{childList:true,subtree:true});
  tabs.addEventListener('click',()=>setTimeout(queueApply,0));
  window.addEventListener('arborwise:data-ready',refreshRecords);
  refreshRecords();
})();
