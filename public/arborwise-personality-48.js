'use strict';
(() => {
  const main=document.getElementById('main');
  if(!main)return;

  function classifyCards(){
    main.querySelectorAll('.card').forEach(card=>{
      const statusText=card.querySelector('.pill')?.textContent?.trim()||'';
      card.classList.toggle('isScheduled',/scheduled|today.?s route/i.test(statusText));
      card.classList.toggle('isAttention',/accepted|approved|needs a date|scheduling|hold/i.test(statusText));
      card.classList.toggle('isFollowUp',/follow|verify|progress/i.test(statusText));
      card.classList.toggle('isComplete',/complete|closed|paid/i.test(statusText));
      card.classList.toggle('isDanger',/failed|error|cancelled|canceled/i.test(statusText));
    });
  }

  const observer=new MutationObserver(classifyCards);
  observer.observe(main,{childList:true,subtree:true});
  classifyCards();
  window.ARBORWISE_PERSONALITY_VERSION='56';
})();