(() => {
  'use strict';

  const style = document.createElement('style');
  style.id = 'arborwise-annie-character-v27-fix';
  style.textContent = `
    .aw26-body{
      background-image:none!important;
      background-size:100% 100%!important;
      background-position:center!important;
      clip-path:none!important;
      height:88%!important;
    }
    .aw26-bubble{
      width:176px!important;
      max-width:176px!important;
      padding:9px 11px!important;
      border-radius:20px 22px 19px 23px!important;
      font-size:13.5px!important;
      line-height:1.24!important;
      text-align:center!important;
      z-index:40!important;
    }
    .aw26-bubble::after{
      right:-13px!important;
      bottom:16px!important;
      width:21px!important;
      height:18px!important;
    }
    @media(max-width:430px){
      .aw26-bubble{
        width:158px!important;
        max-width:158px!important;
        padding:8px 10px!important;
        font-size:12.5px!important;
      }
    }
  `;
  document.head.appendChild(style);

  async function installCleanAnnie(){
    const body = document.querySelector('.aw26-body');
    if(!body){
      requestAnimationFrame(installCleanAnnie);
      return;
    }

    try{
      const response = await fetch('assets/annie-clean-v26.b64?v=20260802-2025', {cache:'no-store'});
      if(!response.ok) throw new Error(`Clean Annie asset returned ${response.status}`);
      const base64 = (await response.text()).trim();
      body.style.setProperty('background-image', `url("data:image/webp;base64,${base64}")`, 'important');
      body.dataset.cleanAnnie = 'true';
    }catch(error){
      console.error('The clean Annie body could not be loaded.', error);
      body.style.setProperty('display','none','important');
    }
  }

  function placeBubble(){
    const stage = document.getElementById('aw26Stage');
    const flyer = document.getElementById('aw26Flyer');
    const bubble = stage?.querySelector('.aw26-bubble');
    if(!stage || !flyer || !bubble) return false;
    if(flyer.parentElement !== stage) return false;

    const flyerLeft = parseFloat(flyer.style.left) || flyer.offsetLeft;
    const flyerTop = parseFloat(flyer.style.top) || flyer.offsetTop;
    const flyerWidth = flyer.offsetWidth || 112;
    const bubbleWidth = window.innerWidth <= 430 ? 158 : 176;

    const left = Math.max(10, flyerLeft - bubbleWidth - 14);
    const top = Math.max(12, flyerTop + Math.max(8, flyerWidth * .16));

    bubble.style.setProperty('left', `${left}px`, 'important');
    bubble.style.setProperty('top', `${top}px`, 'important');
    return true;
  }

  function watchLanding(){
    if(placeBubble()) return;
    const observer = new MutationObserver(() => {
      if(placeBubble()) observer.disconnect();
    });
    observer.observe(document.body, {childList:true, subtree:true});
    window.setTimeout(() => observer.disconnect(), 12000);
  }

  installCleanAnnie();
  watchLanding();
  window.addEventListener('resize', placeBubble, {passive:true});
})();