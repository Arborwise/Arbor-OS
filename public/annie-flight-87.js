'use strict';
(() => {
  if(window.ARBORWISE_ANNIE_FLIGHT_VERSION==='87')return;

  const oldAnnie=document.getElementById('annieButton');
  const oldBubble=document.getElementById('annieBubble');
  const logo=document.querySelector('header .logo');
  if(!oldAnnie||!oldBubble||!logo)return;

  /* Replace the original nodes so the older Annie click/greeting handlers cannot fight this behavior. */
  const annie=oldAnnie.cloneNode(true);
  const bubble=oldBubble.cloneNode(false);
  oldAnnie.replaceWith(annie);
  oldBubble.replaceWith(bubble);

  const STORAGE_KEY='arborwise-live-board-v24';
  const TIME_ZONE='America/Chicago';
  const MESSAGE_MS=2000;
  const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  annie.classList.add('annieFlight');
  bubble.className='bubble annieFlightBubble';
  bubble.hidden=true;
  bubble.setAttribute('role','status');
  bubble.setAttribute('aria-live','polite');
  annie.setAttribute('aria-controls','annieBubble');
  annie.setAttribute('aria-expanded','false');

  const branch=document.createElement('div');
  branch.id='anniePerchBranch';
  branch.setAttribute('aria-hidden','true');
  branch.innerHTML='<i class="leaf leafOne"></i><i class="leaf leafTwo"></i><i class="leaf leafThree"></i>';
  document.body.appendChild(branch);

  let messageIndex=0;
  let messageTimer=0;
  let currentStage=-1;
  let requestedStage=null;
  let flying=false;
  let departed=false;
  let scrollFrame=0;

  const clamp=(value,min,max)=>Math.min(Math.max(value,min),max);

  function localIsoDate(date=new Date()){
    const parts=new Intl.DateTimeFormat('en-US',{
      timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(date);
    const values=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
    return `${values.year}-${values.month}-${values.day}`;
  }

  function getRecords(){
    if(Array.isArray(window.ARBORWISE_CURRENT_OPERATIONS?.records))return window.ARBORWISE_CURRENT_OPERATIONS.records;
    try{
      const state=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
      return Array.isArray(state.records)?state.records:[];
    }catch{return [];}
  }

  function isClosed(record){
    return Boolean(record.closed)||/complete|closed|paid|cancelled|canceled|declined/i.test(String(record.status||''));
  }

  function nearestVisibleCardText(){
    const cards=[...document.querySelectorAll('#main .card')];
    if(!cards.length)return '';
    const center=window.innerHeight/2;
    let best=null;
    let distance=Infinity;
    for(const card of cards){
      const rect=card.getBoundingClientRect();
      if(rect.bottom<0||rect.top>window.innerHeight)continue;
      const cardCenter=rect.top+(rect.height/2);
      const candidate=Math.abs(cardCenter-center);
      if(candidate<distance){best=card;distance=candidate;}
    }
    return String(best?.innerText||'').replace(/\s+/g,' ').trim();
  }

  function pageSpecificMessage(){
    const text=nearestVisibleCardText();
    if(!text)return '';
    if(/leave.{0,35}(wood|debris|brush).{0,25}(on|at).{0,10}site|no haul|leave on site/i.test(text)){
      return 'Don’t forget: this one says leave the wood and debris on site.';
    }
    if(/follow[- ]?up visit|not a new estimate/i.test(text))return 'This is a follow-up visit, not a new estimate.';
    if(/widowmaker|hazard limb|dangerous limb/i.test(text))return 'Hazard limb noted—confirm the drop zone before work begins.';
    if(/stump grind|stump removal|stump treatment/i.test(text))return 'Check the stump instructions before the crew wraps up.';
    if(/prun|clearance|elevat|balance/i.test(text))return 'Pruning job: confirm clearance, structure, and cleanup before leaving.';
    if(/remove|removal/i.test(text))return 'Removal job: confirm the drop zone and cleanup notes first.';
    return '';
  }

  function buildMessages(){
    const today=localIsoDate();
    const records=getRecords().filter(record=>!isClosed(record));
    const todayCount=records.filter(record=>String(record.workDate||record.work_date||'').slice(0,10)===today).length;
    const accepted=records.filter(record=>!record.workDate&&!record.work_date&&/accepted|approved|scheduling/i.test(String(record.status||record.rawStatus||''))).length;
    const overdue=records.filter(record=>{
      const date=String(record.workDate||record.work_date||'').slice(0,10);
      return date&&date<today&&!/accepted|approved|scheduling/i.test(String(record.status||''));
    }).length;
    const messages=[];
    const pageMessage=pageSpecificMessage();

    if(pageMessage)messages.push(pageMessage);
    if(todayCount)messages.push(`${todayCount} ${todayCount===1?'stop is':'stops are'} on the board today.`);
    if(accepted)messages.push(`${accepted} approved ${accepted===1?'job still needs':'jobs still need'} a date.`);
    if(overdue)messages.push(`${overdue} older ${overdue===1?'job needs':'jobs need'} a completion check.`);
    if(window.ARBORWISE_WEATHER?.description){
      const weather=window.ARBORWISE_WEATHER;
      messages.push(`Van Alstyne is ${Math.round(Number(weather.temperature))}° with ${Math.round(Number(weather.rainChance||0))}% rain chance.`);
    }
    messages.push('Use the call, text, email, and map buttons on each customer card.');
    messages.push('Refresh checks Google Sheets, Calendar, and QuickBooks.');
    messages.push('Operations oversight stays with Greg. Crew assignments stay separate.');
    if(!pageMessage&&!todayCount&&!accepted&&!overdue)messages.unshift('Nothing needs immediate attention right now.');

    annie.classList.toggle('hasAttention',Boolean(accepted||overdue));
    return messages;
  }

  function hideMessage(){
    window.clearTimeout(messageTimer);
    bubble.hidden=true;
    annie.setAttribute('aria-expanded','false');
  }

  function positionBubble(){
    if(bubble.hidden)return;
    const rect=annie.getBoundingClientRect();
    const width=bubble.offsetWidth;
    const height=bubble.offsetHeight;
    const center=rect.left+(rect.width/2);
    const left=clamp(center-(width/2),8,window.innerWidth-width-8);
    let top=rect.top-height-14;
    let below=false;
    if(top<8){top=rect.bottom+12;below=true;}
    bubble.style.left=`${Math.round(left)}px`;
    bubble.style.top=`${Math.round(top)}px`;
    bubble.style.setProperty('--annie-tail-x',`${Math.round(clamp(center-left,20,width-20))}px`);
    bubble.classList.toggle('belowAnnie',below);
  }

  function showNextMessage(){
    const messages=buildMessages();
    if(!messages.length)return;
    bubble.textContent=messages[messageIndex%messages.length];
    messageIndex=(messageIndex+1)%messages.length;
    bubble.hidden=false;
    annie.setAttribute('aria-expanded','true');
    requestAnimationFrame(positionBubble);
    window.clearTimeout(messageTimer);
    messageTimer=window.setTimeout(hideMessage,MESSAGE_MS);
  }

  function buttonSize(){return annie.getBoundingClientRect().width||58;}

  function logoPosition(){
    const rect=logo.getBoundingClientRect();
    const size=buttonSize();
    return {
      x:clamp(rect.left+(rect.width*.50)-(size/2),8,window.innerWidth-size-8),
      y:clamp(rect.top+(rect.height*.34)-(size/2),8,window.innerHeight-size-8)
    };
  }

  function destination(stage){
    const size=buttonSize();
    const lowerY=clamp(window.innerHeight-size-112,118,window.innerHeight-size-88);
    const upperY=clamp(126,92,Math.max(92,window.innerHeight-size-105));
    if(stage===1)return {x:window.innerWidth-size-14,y:upperY};
    if(stage===2)return {x:window.innerWidth-size-14,y:lowerY};
    if(stage===3)return {x:14,y:upperY};
    return {x:14,y:lowerY};
  }

  function hideBranch(){branch.classList.remove('isVisible');}

  function placeBranch(point,show=true){
    const size=buttonSize();
    const width=96;
    branch.style.left=`${Math.round(clamp(point.x+(size/2)-(width/2),4,window.innerWidth-width-4))}px`;
    branch.style.top=`${Math.round(clamp(point.y+size-9,20,window.innerHeight-34))}px`;
    if(show)branch.classList.add('isVisible');
  }

  function setAnniePosition(point){
    annie.style.left=`${Math.round(point.x)}px`;
    annie.style.top=`${Math.round(point.y)}px`;
    annie.style.right='auto';
    annie.style.bottom='auto';
  }

  function setAtLogo(){
    hideMessage();
    hideBranch();
    annie.classList.remove('isFlying','justLanded','isPerched');
    annie.classList.add('atLogo');
    setAnniePosition(logoPosition());
    currentStage=-1;
  }

  async function flyTo(stage){
    if(stage===currentStage&&!flying)return;
    if(flying){requestedStage=stage;return;}
    flying=true;
    requestedStage=null;
    hideMessage();
    hideBranch();

    const start=annie.getBoundingClientRect();
    const end=destination(stage);
    const distance=Math.hypot(end.x-start.left,end.y-start.top);
    const duration=reducedMotion?1:clamp(650+(distance*.55),720,1120);
    const midX=start.left+((end.x-start.left)*.52);
    const midY=clamp(Math.min(start.top,end.y)-Math.min(105,48+(distance*.10)),18,window.innerHeight-90);

    annie.classList.remove('atLogo','justLanded','isPerched');
    annie.classList.add('isFlying');

    const landingTimer=window.setTimeout(()=>{
      placeBranch(end,false);
      requestAnimationFrame(()=>branch.classList.add('isVisible'));
    },Math.max(0,duration*.70));

    const animation=annie.animate([
      {left:`${start.left}px`,top:`${start.top}px`,transform:'rotate(0deg) scale(1)',offset:0},
      {left:`${start.left+((midX-start.left)*.58)}px`,top:`${midY+18}px`,transform:'rotate(-7deg) scale(1.06)',offset:.34},
      {left:`${midX}px`,top:`${midY}px`,transform:'rotate(6deg) scale(1.08)',offset:.58},
      {left:`${end.x}px`,top:`${end.y-5}px`,transform:'rotate(-2deg) scale(1.02)',offset:.90},
      {left:`${end.x}px`,top:`${end.y}px`,transform:'rotate(0deg) scale(1)',offset:1}
    ],{duration,easing:'cubic-bezier(.35,.04,.18,1)',fill:'forwards'});

    try{await animation.finished;}catch{}
    window.clearTimeout(landingTimer);
    animation.cancel();
    setAnniePosition(end);
    placeBranch(end,true);
    annie.classList.remove('isFlying');
    annie.classList.add('isPerched','justLanded');
    window.setTimeout(()=>annie.classList.remove('justLanded'),420);
    currentStage=stage;
    flying=false;
    showNextMessage();

    if(requestedStage!==null&&requestedStage!==currentStage){
      const next=requestedStage;
      requestedStage=null;
      window.setTimeout(()=>flyTo(next),80);
    }
  }

  function stageForScroll(){
    const max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight);
    const progress=window.scrollY/max;
    if(progress<.34)return 0;
    if(progress<.67)return 1;
    if(progress<.88)return 2;
    return 3;
  }

  function handleScroll(){
    scrollFrame=0;
    if(!departed){
      if(window.scrollY>12){departed=true;flyTo(0);}
      return;
    }
    const stage=stageForScroll();
    if(stage!==currentStage)flyTo(stage);
    else positionBubble();
  }

  function queueScroll(){
    if(!scrollFrame)scrollFrame=requestAnimationFrame(handleScroll);
  }

  annie.onclick=event=>{
    event.preventDefault();
    event.stopPropagation();
    if(!bubble.hidden)hideMessage();
    else showNextMessage();
  };
  bubble.onclick=event=>{event.preventDefault();event.stopPropagation();hideMessage();};
  document.addEventListener('click',event=>{
    if(!bubble.hidden&&!bubble.contains(event.target)&&!annie.contains(event.target))hideMessage();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hideMessage();});
  window.addEventListener('scroll',queueScroll,{passive:true});
  window.addEventListener('resize',()=>{
    hideMessage();
    if(!departed)setAtLogo();
    else{
      const point=destination(Math.max(0,currentStage));
      setAnniePosition(point);
      placeBranch(point,true);
    }
  });
  window.addEventListener('arborwise:data-ready',buildMessages);
  window.addEventListener('arborwise:weather',buildMessages);

  setAtLogo();
  if(window.scrollY>12){departed=true;window.setTimeout(()=>flyTo(stageForScroll()),160);}
  window.ARBORWISE_ANNIE_FLIGHT_VERSION='87';
})();
