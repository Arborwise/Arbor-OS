'use strict';
(() => {
  const TIME_ZONE='America/Chicago';
  const ageById=new Map();

  const style=document.createElement('style');
  style.textContent=`
    .card.estimate.estimate-new{
      background:#fff3a6!important;
      border-color:#d7ad00!important;
      box-shadow:0 3px 9px rgba(154,116,0,.18)!important;
    }
    .card.estimate.estimate-new:before{background:#e0b400!important}
    .card.estimate.estimate-aged{
      background:#ffc078!important;
      border-color:#d96b00!important;
      box-shadow:0 3px 9px rgba(174,79,0,.2)!important;
    }
    .card.estimate.estimate-aged:before{background:#e4590c!important}
  `;
  document.head.appendChild(style);

  function centralIso(){
    const parts=new Intl.DateTimeFormat('en-US',{
      timeZone:TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'
    }).formatToParts(new Date());
    const map=Object.fromEntries(parts.filter(part=>part.type!=='literal').map(part=>[part.type,part.value]));
    return `${map.year}-${map.month}-${map.day}`;
  }

  function dayNumber(iso){
    const match=String(iso||'').match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if(!match)return null;
    return Math.floor(Date.UTC(Number(match[1]),Number(match[2])-1,Number(match[3]))/86400000);
  }

  function applyColors(){
    const today=dayNumber(centralIso());
    document.querySelectorAll('article.card.estimate').forEach(card=>{
      const id=card.querySelector('.recordId')?.textContent?.trim();
      const added=id?ageById.get(id):'';
      card.classList.remove('estimate-new','estimate-aged');
      const addedDay=dayNumber(added);
      if(addedDay===null||today===null)return;
      card.classList.add(today-addedDay>=7?'estimate-aged':'estimate-new');
    });
  }

  async function refreshAges(){
    try{
      const response=await fetch('/api/board',{credentials:'same-origin',cache:'no-store'});
      if(!response.ok)return;
      const payload=await response.json();
      ageById.clear();
      for(const item of payload.items||[]){
        if(item.type==='est'&&item.id&&item.dateAdded)ageById.set(String(item.id),String(item.dateAdded));
      }
      applyColors();
    }catch{}
  }

  const observer=new MutationObserver(applyColors);
  const start=()=>{
    const main=document.getElementById('main');
    if(main)observer.observe(main,{childList:true,subtree:true});
    refreshAges();
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
  window.addEventListener('arborwise:data-ready',refreshAges);
})();
