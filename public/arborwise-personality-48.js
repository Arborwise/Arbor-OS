'use strict';
(() => {
  const TIME_ZONE='America/Chicago';
  const UI_KEY='arborwise-board-ui-v57';
  const main=document.getElementById('main');
  const operationsVoice=document.getElementById('operationsVoice');
  const statusButton=document.getElementById('statusButton');
  const googleLink=document.getElementById('connectGoogleDirect');
  const quickBooksLink=document.getElementById('connectQuickBooksDirect');
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
    header{
      min-height:268px!important;
      padding-bottom:10px!important;
    }
    .status{
      width:min(470px,88%)!important;
      padding:6px 9px!important;
      font-size:10.5px!important;
      letter-spacing:.035em!important;
    }
    .connectionLinks{
      width:min(500px,88%)!important;
      margin:7px auto 0!important;
      gap:6px!important;
    }
    .connectionLinks a{
      min-height:38px!important;
      border-width:1px!important;
      padding:0 9px!important;
      font-size:11px!important;
      letter-spacing:.025em!important;
      box-shadow:none!important;
    }
    .operationsVoice{
      width:min(470px,88%)!important;
      margin:6px auto 0!important;
      padding:5px 9px!important;
      border:1px solid rgba(255,255,255,.16);
      border-radius:999px;
      background:rgba(255,255,255,.07);
      color:#edf5ef!important;
      font-size:11px!important;
      font-weight:900!important;
      line-height:1!important;
      letter-spacing:.045em;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
    }
    @media(max-width:430px){
      header{min-height:258px!important}
      .connectionLinks{width:90%!important}
      .connectionLinks a{min-height:36px!important;font-size:10.5px!important}
      .operationsVoice,.status{width:90%!important}
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

  function compactOperationsSummary(){
    if(!operationsVoice)return;
    const text=operationsVoice.textContent?.trim()||'';
    const match=text.match(/(\d+)\s+active today\s*•\s*(\d+)\s+completed today\s*•\s*(\d+)\s+unscheduled\s*•\s*(\d+)\s+on hold/i);
    if(!match)return;

    const active=Number(match[1]);
    const completed=Number(match[2]);
    const unscheduled=Number(match[3]);
    const holds=Number(match[4]);
    const summary=[];

    if(active)summary.push(`${active} TODAY`);
    if(unscheduled)summary.push(`${unscheduled} TO SCHEDULE`);
    if(holds)summary.push(`${holds} HOLD`);
    if(completed)summary.push(`${completed} DONE`);

    operationsVoice.hidden=!summary.length;
    if(summary.length)operationsVoice.textContent=summary.join(' • ');
  }

  function compactStatus(){
    if(!statusButton)return;
    const text=statusButton.textContent?.trim()||'';
    const live=text.match(/^LIVE\s*•\s*\d+\s+RECORDS\s*•\s*(.+)$/i);
    if(live){statusButton.textContent=`LIVE • ${live[1]}`;return;}
    const stale=text.match(/^STALE\s*•\s*LAST GOOD\s*(.+)$/i);
    if(stale)statusButton.textContent=`STALE • ${stale[1]}`;
  }

  function compactConnectionLabel(link,name){
    if(!link)return;
    const text=link.textContent?.trim().toUpperCase()||'';
    if(text.includes('CONNECTED')){
      const next=`${name} ✓`;
      if(link.textContent!==next)link.textContent=next;
      return;
    }
    if(text.startsWith('CONNECT')){
      const next=`CONNECT ${name}`;
      if(link.textContent!==next)link.textContent=next;
    }
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

  if(operationsVoice){
    const operationsObserver=new MutationObserver(compactOperationsSummary);
    operationsObserver.observe(operationsVoice,{childList:true,characterData:true,subtree:true});
    compactOperationsSummary();
  }

  if(statusButton){
    const statusObserver=new MutationObserver(compactStatus);
    statusObserver.observe(statusButton,{childList:true,characterData:true,subtree:true});
    compactStatus();
  }

  [[googleLink,'GOOGLE'],[quickBooksLink,'QUICKBOOKS']].forEach(([link,name])=>{
    if(!link)return;
    const connectionObserver=new MutationObserver(()=>compactConnectionLabel(link,name));
    connectionObserver.observe(link,{childList:true,characterData:true,subtree:true});
    compactConnectionLabel(link,name);
  });

  const allCrew=document.querySelector('#filters button[data-filter="ALL"]');
  if(allCrew&&!allCrew.classList.contains('on'))allCrew.click();
  const allGroup=document.querySelector('#groupFilters54 button[data-group="ALL"]');
  if(allGroup&&!allGroup.classList.contains('on'))allGroup.click();

  decorateBoard();
  window.ARBORWISE_PERSONALITY_VERSION='61';
})();
