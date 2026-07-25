'use strict';
(() => {
  const TIME_ZONE='America/Chicago';
  const UI_KEY='arborwise-board-ui-v57';
  const main=document.getElementById('main');
  if(!main)return;

  try{
    const ui=JSON.parse(localStorage.getItem(UI_KEY)||'{}')||{};
    localStorage.setItem(UI_KEY,JSON.stringify({...ui,filter:'ALL',group:'ALL'}));
  }catch{}

  const style=document.createElement('style');
  style.textContent=`
    .scheduleDateHeading{
      margin:18px 2px 7px;
      padding:8px 10px;
      border-left:5px solid #1d4b34;
      border-radius:7px;
      background:#e8efe8;
      color:#173f2d;
      font-size:13px;
      font-weight:950;
      letter-spacing:.07em;
      text-transform:uppercase;
    }
  `;
  document.head.appendChild(style);

  function centralIso(date=new Date()){
    const parts=new Intl.DateTimeFormat('en-US',{
      timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(date);
    const values=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function addDays(iso,count){
    const [year,month,day]=iso.split('-').map(Number);
    const date=new Date(Date.UTC(year,month-1,day+count,12));
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth()+1).padStart(2,'0')}-${String(date.getUTCDate()).padStart(2,'0')}`;
  }

  function fullDateLabel(iso){
    const [year,month,day]=iso.split('-').map(Number);
    return new Intl.DateTimeFormat('en-US',{
      timeZone:'UTC',weekday:'long',month:'long',day:'numeric'
    }).format(new Date(Date.UTC(year,month-1,day,12)));
  }

  function dateHeading(iso){
    if(!iso)return 'UNSCHEDULED';
    const today=centralIso();
    if(iso===today)return `TODAY • ${fullDateLabel(iso)}`;
    if(iso===addDays(today,1))return `TOMORROW • ${fullDateLabel(iso)}`;
    if(iso===addDays(today,7))return `NEXT ${fullDateLabel(iso).toUpperCase()}`;
    return fullDateLabel(iso);
  }

  function dateFromCard(card){
    const text=card.querySelector('.pill.date')?.textContent?.trim()||'';
    const match=text.match(/^\d{4}-\d{2}-\d{2}/);
    return match?match[0]:'';
  }

  let observer;
  function decorateBoard(){
    observer?.disconnect();

    main.querySelectorAll('.scheduleDateHeading').forEach(heading=>heading.remove());
    const cards=[...main.querySelectorAll(':scope > .card')];
    let previousDate=null;
    cards.forEach(card=>{
      const statusText=card.querySelector('.pill')?.textContent?.trim()||'';
      card.classList.toggle('isScheduled',/scheduled|today.?s route/i.test(statusText));
      card.classList.toggle('isAttention',/accepted|approved|needs a date|scheduling|hold/i.test(statusText));
      card.classList.toggle('isFollowUp',/follow|verify|progress/i.test(statusText));
      card.classList.toggle('isComplete',/complete|closed|paid/i.test(statusText));
      card.classList.toggle('isDanger',/failed|error|cancelled|canceled/i.test(statusText));

      const cardDate=dateFromCard(card);
      if(cardDate!==previousDate){
        const heading=document.createElement('div');
        heading.className='scheduleDateHeading';
        heading.textContent=dateHeading(cardDate);
        card.before(heading);
        previousDate=cardDate;
      }
    });

    observer?.observe(main,{childList:true,subtree:true});
  }

  observer=new MutationObserver(decorateBoard);
  observer.observe(main,{childList:true,subtree:true});

  const allCrew=document.querySelector('#filters button[data-filter="ALL"]');
  if(allCrew&&!allCrew.classList.contains('on'))allCrew.click();
  const allGroup=document.querySelector('#groupFilters54 button[data-group="ALL"]');
  if(allGroup&&!allGroup.classList.contains('on'))allGroup.click();

  decorateBoard();
  window.ARBORWISE_PERSONALITY_VERSION='59';
})();
