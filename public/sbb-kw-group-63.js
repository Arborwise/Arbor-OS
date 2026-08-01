(()=>{
  'use strict';

  const BASE_BUILD='https://cdn.jsdelivr.net/gh/Arborwise/Arbor-OS@93fd4b46ea4cf59f11897bb23f47f10aef55bc56/public/sbb-kw-group-63.js';
  const CLEAN_VERSION='83';
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

  function sweep(){
    cleanupQueued=false;
    document.querySelectorAll([
      '.service','.notes','.sourceLine','.ownerCurrentNotes','.ownerSource',
      '.invoiceFact72','.invoiceChoice72','#sheet textarea'
    ].join(',')).forEach(cleanElement);
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
    queueSweep();
  }

  installCleanup();

  const base=document.createElement('script');
  base.src=BASE_BUILD;
  base.async=false;
  base.onerror=()=>console.error('The Arborwise PMG filter base build could not be loaded.');
  document.head.appendChild(base);
})();
