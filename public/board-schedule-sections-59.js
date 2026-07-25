'use strict';
(() => {
  const UI_KEY='arborwise-board-ui-v57';
  try{
    const saved=JSON.parse(localStorage.getItem(UI_KEY)||'{}');
    localStorage.setItem(UI_KEY,JSON.stringify({...saved,filter:'ALL',group:'ALL'}));
  }catch{}

  const main=document.getElementById('main');
  const tabs=document.getElementById('tabs');
  if(!main||!tabs)return;

  const style=document.createElement('style');
  style.textContent=`
    .scheduleSection{
      display:flex;
      align-items:center;
      justify-content:space-between;
      gap:12px;
      margin:17px 0 9px;
      padding:12px 14px;
      border:2px solid;
      border-radius:14px;
      font-size:15px;
      font-weight:950;
      line-height:1.05;
      letter-spacing:.06em;
      text-transform:uppercase;
      box-shadow:0 2px 6px rgba(20,35,27,.08);
    }
    .scheduleSection small{font-size:11px;font-weight:900;letter-spacing:.025em;opacity:.9;text-align:right}
    .scheduleSection.today{background:#174b31;border-color:#174b31;color:#fff}
    .scheduleSection.coming{background:#dcecff;border-color:#6e9fcf;color:#183f66}
    .scheduleSection.unscheduled{background:#eee9de;border-color:#a99d88;color:#51483b}
    .scheduleSection.review{background:#f7dfdb;border-color:#c6786f;color:#762f28}
    .scheduleEmpty{margin:0 0 10px;padding:11px 13px;border-radius:12px;background:#eef6ef;color:#31563c;font-weight:800}

    #main>.card.scheduleToday{
      background:linear-gradient(90deg,#e8f5eb 0,#f8fcf9 34%,#fff 100%)!important;
      border-color:#70a67d!important;
      box-shadow:0 4px 12px rgba(23,75,49,.11)!important;
    }
    #main>.card.scheduleToday:before{background:#1f7042!important}
    #main>.card.scheduleToday .pill.date{background:#d9efde!important;border-color:#3c7e53!important;color:#174b31!important}

    #main>.card.scheduleComing{
      background:linear-gradient(90deg,#edf6ff 0,#f8fbff 36%,#fff 100%)!important;
      border-color:#8db4d9!important;
      box-shadow:0 4px 12px rgba(48,94,137,.10)!important;
    }
    #main>.card.scheduleComing:before{background:#4b83b8!important}
    #main>.card.scheduleComing .pill.date{background:#dcecff!important;border-color:#6794bf!important;color:#234f76!important}

    #main>.card.scheduleUnscheduled{
      background:linear-gradient(90deg,#f5f1e9 0,#fff 38%)!important;
      border-color:#b7aa94!important;
    }
    #main>.card.scheduleUnscheduled:before{background:#8a7657!important}

    #main>.card.scheduleReview{
      background:linear-gradient(90deg,#fbebe8 0,#fff 38%)!important;
      border-color:#ca8279!important;
    }
    #main>.card.scheduleReview:before{background:#ad493e!important}

    @media(max-width:390px){
      .scheduleSection{font-size:14px;padding:11px 12px}
      .scheduleSection small{font-size:10px}
    }
  `;
  document.head.appendChild(style);

  function centralIsoDate(){
    const parts=new Intl.DateTimeFormat('en-US',{
      timeZone:'America/Chicago',year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(new Date());
    const map=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  }

  function friendlyDate(iso){
    if(!iso)return '';
    const [year,month,day]=iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en-US',{
      timeZone:'UTC',weekday:'short',month:'short',day:'numeric'
    }).format(new Date(Date.UTC(year,month-1,day,12)));
  }

  function cardDate(card){
    const value=(card.querySelector('.pill.date')?.textContent||'').split(' • ')[0].trim();
    if(/^\d{4}-\d{2}-\d{2}$/.test(value))return value;
    const match=value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if(match)return `${match[3]}-${match[1].padStart(2,'0')}-${match[2].padStart(2,'0')}`;
    return '';
  }

  function heading(kind,label,detail,count){
    const section=document.createElement('div');
    section.className=`scheduleSection ${kind}`;
    section.dataset.scheduleSection='true';
    section.innerHTML=`<span>${label}</span><small>${detail} • ${count}</small>`;
    return section;
  }

  function activeTab(){
    return tabs.querySelector('button.on')?.textContent?.trim().toUpperCase()||'';
  }

  let observer;
  function organize(){
    if(activeTab()!=='TODAY'){
      main.querySelectorAll('[data-schedule-section],.scheduleEmpty').forEach(node=>node.remove());
      main.querySelectorAll('.scheduleToday,.scheduleComing,.scheduleUnscheduled,.scheduleReview').forEach(card=>{
        card.classList.remove('scheduleToday','scheduleComing','scheduleUnscheduled','scheduleReview');
      });
      return;
    }

    const cards=Array.from(main.children).filter(node=>node.classList?.contains('card'));
    if(!cards.length)return;

    const today=centralIsoDate();
    const groups={today:[],coming:[],unscheduled:[],review:[]};
    cards.forEach(card=>{
      card.classList.remove('scheduleToday','scheduleComing','scheduleUnscheduled','scheduleReview');
      const due=cardDate(card);
      if(!due){card.classList.add('scheduleUnscheduled');groups.unscheduled.push(card);return;}
      if(due===today){card.classList.add('scheduleToday');groups.today.push(card);return;}
      if(due>today){card.classList.add('scheduleComing');groups.coming.push(card);return;}
      card.classList.add('scheduleReview');groups.review.push(card);
    });

    observer?.disconnect();
    main.querySelectorAll('[data-schedule-section],.scheduleEmpty').forEach(node=>node.remove());
    cards.forEach(card=>card.remove());

    const fragment=document.createDocumentFragment();
    fragment.appendChild(heading('today','Today',friendlyDate(today),groups.today.length));
    if(groups.today.length)groups.today.forEach(card=>fragment.appendChild(card));
    else{
      const empty=document.createElement('div');
      empty.className='scheduleEmpty';
      empty.textContent='No work is scheduled for today.';
      fragment.appendChild(empty);
    }

    if(groups.coming.length){
      fragment.appendChild(heading('coming','Coming Up','Tomorrow and later',groups.coming.length));
      groups.coming.forEach(card=>fragment.appendChild(card));
    }
    if(groups.unscheduled.length){
      fragment.appendChild(heading('unscheduled','Unscheduled','Needs a date',groups.unscheduled.length));
      groups.unscheduled.forEach(card=>fragment.appendChild(card));
    }
    if(groups.review.length){
      fragment.appendChild(heading('review','Needs Review','Older open dates',groups.review.length));
      groups.review.forEach(card=>fragment.appendChild(card));
    }

    main.appendChild(fragment);
    observer?.observe(main,{childList:true,subtree:true});
  }

  let queued=false;
  function queueOrganize(){
    if(queued)return;
    queued=true;
    requestAnimationFrame(()=>{
      queued=false;
      organize();
    });
  }

  observer=new MutationObserver(queueOrganize);
  observer.observe(main,{childList:true,subtree:true});
  tabs.addEventListener('click',()=>setTimeout(queueOrganize,0));
  window.addEventListener('arborwise:data-ready',queueOrganize);
  queueOrganize();
})();
