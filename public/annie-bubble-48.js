'use strict';
(() => {
  const STORAGE_KEY='arborwise-live-board-v24';
  const TIME_ZONE='America/Chicago';
  const SVG_NS='http://www.w3.org/2000/svg';
  const annie=document.getElementById('annieButton');
  const bubble=document.getElementById('annieBubble');
  if(!annie||!bubble)return;

  let messageIndex=0;
  let greeted=false;

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
  function isClosed(record){return Boolean(record.closed)||/complete|closed|paid|cancelled|canceled/i.test(String(record.status||''));}
  function buildMessages(){
    const today=localIsoDate();
    const records=getRecords().filter(record=>!isClosed(record));
    const todayCount=records.filter(record=>record.workDate===today).length;
    const accepted=records.filter(record=>!record.workDate&&/accepted|approved|scheduling/i.test(String(record.status||record.rawStatus||''))).length;
    const overdue=records.filter(record=>record.workDate&&record.workDate<today&&!/accepted|approved|scheduling/i.test(String(record.status||''))).length;
    const messages=[];

    if(todayCount)messages.push(`${todayCount} ${todayCount===1?'stop is':'stops are'} on the board today.`);
    if(accepted)messages.push(`${accepted} approved ${accepted===1?'job still needs':'jobs still need'} a date.`);
    if(overdue)messages.push(`${overdue} older ${overdue===1?'job needs':'jobs need'} a completion check.`);
    if(window.ARBORWISE_WEATHER?.description){
      const weather=window.ARBORWISE_WEATHER;
      messages.push(`Van Alstyne is ${Math.round(Number(weather.temperature))}° with ${Math.round(Number(weather.rainChance||0))}% rain chance.`);
    }
    messages.push('Use the call, text, email, and map buttons on each customer card.');
    messages.push('Refresh now checks Google Sheets, Calendar, and QuickBooks.');
    messages.push('Operations oversight stays with Greg. Crew assignments stay separate.');
    if(!todayCount&&!accepted&&!overdue)messages.unshift('Nothing needs immediate attention right now.');

    annie.classList.toggle('hasAttention',Boolean(accepted||overdue));
    return messages;
  }

  bubble.setAttribute('role','status');
  bubble.setAttribute('aria-live','polite');
  bubble.dataset.cloudStyle='three-soft-curves-60';
  annie.setAttribute('aria-controls','annieBubble');
  annie.setAttribute('aria-expanded','false');

  function hide(){
    bubble.hidden=true;
    annie.setAttribute('aria-expanded','false');
    clearTimeout(window.annieTimer);
  }
  function buildCloud(message){
    bubble.replaceChildren();

    const shape=document.createElementNS(SVG_NS,'svg');
    shape.classList.add('annieBubbleShape');
    shape.setAttribute('viewBox','0 0 210 100');
    shape.setAttribute('preserveAspectRatio','none');
    shape.setAttribute('aria-hidden','true');
    shape.setAttribute('focusable','false');
    const path=document.createElementNS(SVG_NS,'path');
    path.setAttribute('d','M12 32 C14 12 38 5 62 22 C78 2 112 2 128 22 C150 5 194 12 198 34 L198 77 Q198 92 182 92 H28 Q12 92 12 76 Z');
    shape.append(path);

    const trail=document.createElement('span');
    trail.className='annieBubbleTrail';
    trail.setAttribute('aria-hidden','true');
    trail.append(document.createElement('i'),document.createElement('i'),document.createElement('i'));

    const text=document.createElement('span');
    text.className='annieCloudText';
    if(message.length>64)text.classList.add('isExtraLong');
    else if(message.length>52)text.classList.add('isLong');
    text.textContent=message;

    bubble.append(shape,trail,text);
  }
  function show(next=true){
    const messages=buildMessages();
    if(!messages.length)return;
    if(next)messageIndex%=messages.length;
    buildCloud(messages[messageIndex]);
    messageIndex=(messageIndex+1)%messages.length;
    bubble.hidden=false;
    annie.setAttribute('aria-expanded','true');
    clearTimeout(window.annieTimer);
    window.annieTimer=setTimeout(hide,8000);
  }
  function greet(){
    if(greeted||sessionStorage.getItem('arborwise-annie-greeted-v60'))return;
    greeted=true;
    sessionStorage.setItem('arborwise-annie-greeted-v60','1');
    setTimeout(()=>show(false),250);
  }

  annie.onclick=event=>{
    event.preventDefault();
    event.stopPropagation();
    if(bubble.hidden)show(true);
    else hide();
  };
  bubble.onclick=event=>{event.stopPropagation();hide();};
  document.addEventListener('click',event=>{
    if(!bubble.hidden&&!bubble.contains(event.target)&&!annie.contains(event.target))hide();
  });
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hide();});
  window.addEventListener('arborwise:weather',buildMessages);
  window.addEventListener('arborwise:data-ready',()=>{buildMessages();greet();});
  window.addEventListener('arborwise:data-cleared',buildMessages);
  window.addEventListener('storage',buildMessages);

  buildMessages();
  setTimeout(greet,2600);
  window.ARBORWISE_ANNIE_VERSION='60';
})();
