(()=>{
  'use strict';

  const BASE_BUILD='https://cdn.jsdelivr.net/gh/Arborwise/Arbor-OS@93fd4b46ea4cf59f11897bb23f47f10aef55bc56/public/sbb-kw-group-63.js';
  const CLEAN_VERSION='84';
  let cleanupQueued=false;

  function decodeEntities(value=''){
    const named={nbsp:' ',amp:'&',lt:'<',gt:'>',quot:'"',apos:"'"};
    return String(value).replace(/&(#x?[0-9a-f]+|nbsp|amp|lt|gt|quot|apos);/gi,(match,entity)=>{
      const key=String(entity).toLowerCase();
      if(Object.prototype.hasOwnProperty.call(named,key))return named[key];
      try{
        const numeric=key.startsWith('#x')
          ? Number.parseInt(key.slice(2),16)
          : Number.parseInt(key.slice(1),10);
        return Number.isFinite(numeric)?String.fromCodePoint(numeric):match;
      }catch{return match;}
    });
  }

  function removeInternalIds(value=''){
    return String(value)
      .replace(/\s*Google Calendar event\s+[a-z0-9_-]+\s+(?:created|updated)\.?/gi,'')
      .replace(/\s*Calendar event ID\s*[:#-]?\s*[a-z0-9_-]+\.?/gi,'')
      .replace(/[ \t]{2,}/g,' ')
      .replace(/\s+([.,;:])/g,'$1')
      .trim();
  }

  function readableText(value=''){
    let text=decodeEntities(value);
    if(/[<&]/.test(text)){
      text=text
        .replace(/<\s*br\s*\/?>/gi,'\n')
        .replace(/<\s*li\b[^>]*>/gi,'• ')
        .replace(/<\s*\/\s*li\s*>/gi,'\n')
        .replace(/<\s*\/\s*(?:p|div|section|article|h[1-6]|ul|ol|tr)\s*>/gi,'\n')
        .replace(/<\s*(?:p|div|section|article|h[1-6]|ul|ol|tr)\b[^>]*>/gi,'')
        .replace(/<[^>]+>/g,' ')
        .replace(/\r\n?/g,'\n')
        .replace(/[ \t]+\n/g,'\n')
        .replace(/\n[ \t]+/g,'\n')
        .replace(/[ \t]{2,}/g,' ')
        .replace(/\n{3,}/g,'\n\n');
    }
    return removeInternalIds(text);
  }

  function cleanElement(element){
    if(!element)return;
    if(element instanceof HTMLTextAreaElement){
      const cleaned=readableText(element.value);
      if(cleaned!==element.value)element.value=cleaned;
      return;
    }
    const original=element.textContent||'';
    const cleaned=readableText(original);
    if(cleaned!==original.trim())element.textContent=cleaned;
  }

  function cardDate(card){
    const text=String(card.querySelector('.pill.date')?.textContent||'');
    const value=text.split('•')[0].trim();
    if(/^\d{4}-\d{2}-\d{2}$/.test(value))return value;
    const match=value.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    return match?`${match[3]}-${match[1].padStart(2,'0')}-${match[2].padStart(2,'0')}`:'9999-12-31';
  }

  function cardStartMinutes(card){
    const text=String(card.querySelector('.pill.date')?.textContent||'');
    const timeText=text.split('•').slice(1).join(' ').trim();
    if(!timeText)return Number.POSITIVE_INFINITY;

    const normalized=timeText
      .replace(/[–—]/g,'-')
      .replace(/\./g,'')
      .trim();
    const match=normalized.match(/(?:^|\s)(\d{1,2})(?::(\d{2}))?\s*(AM|PM)?\b/i);
    if(!match)return Number.POSITIVE_INFINITY;

    let hour=Number(match[1]);
    const minute=Number(match[2]||0);
    const meridiem=String(match[3]||'').toUpperCase();
    if(hour>23||minute>59)return Number.POSITIVE_INFINITY;

    if(meridiem){
      hour%=12;
      if(meridiem==='PM')hour+=12;
    }else if(hour>=1&&hour<=6){
      hour+=12;
    }
    return hour*60+minute;
  }

  function cardName(card){
    return String(card.querySelector('.name')?.textContent||'').trim();
  }

  function compareScheduleCards(a,b){
    return cardDate(a).localeCompare(cardDate(b))
      ||cardStartMinutes(a)-cardStartMinutes(b)
      ||cardName(a).localeCompare(cardName(b),undefined,{sensitivity:'base'});
  }

  function sortCardGroup(main,className){
    const cards=Array.from(main.querySelectorAll(`:scope > .card.${className}`));
    if(cards.length<2)return;

    const sorted=[...cards].sort(compareScheduleCards);
    if(cards.every((card,index)=>card===sorted[index]))return;

    const afterGroup=cards[cards.length-1].nextSibling;
    const fragment=document.createDocumentFragment();
    sorted.forEach(card=>fragment.appendChild(card));
    main.insertBefore(fragment,afterGroup);
  }

  function sortSchedule(){
    const main=document.getElementById('main');
    if(!main)return;
    const activeTab=document.querySelector('#tabs button.on')?.textContent?.trim().toUpperCase()||'';
    if(activeTab!=='TODAY'&&activeTab!=='JOBS')return;

    [
      'scheduleToday',
      'scheduleComing',
      'scheduleScheduled',
      'scheduleReview',
      'scheduleUnscheduled'
    ].forEach(className=>sortCardGroup(main,className));
  }

  function sweep(){
    cleanupQueued=false;
    document.querySelectorAll([
      '.service','.notes','.sourceLine','.ownerCurrentNotes','.ownerSource',
      '.invoiceFact72','.invoiceChoice72','#sheet textarea'
    ].join(',')).forEach(cleanElement);
    sortSchedule();
  }

  function queueSweep(){
    if(cleanupQueued)return;
    cleanupQueued=true;
    requestAnimationFrame(sweep);
  }

  function installCleanup(){
    if(document.documentElement.dataset.boardMarkupCleanup===CLEAN_VERSION)return;
    document.documentElement.dataset.boardMarkupCleanup=CLEAN_VERSION;
    const style=document.createElement('style');
    style.id=`board-markup-cleanup-${CLEAN_VERSION}`;
    style.textContent='.service,.notes,.sourceLine,.ownerCurrentNotes,.ownerSource,.invoiceFact72,.invoiceChoice72{white-space:pre-line}';
    document.head.appendChild(style);
    const observer=new MutationObserver(queueSweep);
    observer.observe(document.documentElement,{childList:true,subtree:true});
    window.addEventListener('arborwise:data-ready',queueSweep);
    document.getElementById('tabs')?.addEventListener('click',()=>setTimeout(queueSweep,0));
    queueSweep();
  }

  installCleanup();

  const base=document.createElement('script');
  base.src=BASE_BUILD;
  base.async=false;
  base.onerror=()=>console.error('The Arborwise PMG filter base build could not be loaded.');
  document.head.appendChild(base);
})();
