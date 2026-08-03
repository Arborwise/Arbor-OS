(() => {
  'use strict';

  document.getElementById('arborwise-annie-idle-v43')?.remove();

  const OPENING = "Hi! I'm Arborwise Annie & we're glad you're here!";
  const SHORT_OPENING = "Hi! I'm Annie. Glad you're here!";

  const style = document.createElement('style');
  style.id = 'arborwise-annie-idle-v43';
  style.textContent = `
    .aw-v43-bubble{
      position:absolute!important;
      z-index:12!important;
      top:-5px!important;
      width:126px!important;
      min-height:44px!important;
      padding:8px 10px!important;
      border:2px solid #153c30!important;
      border-radius:50% / 46%!important;
      background:#fffdf5!important;
      color:#123d31!important;
      font:850 10.2px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      letter-spacing:-.01em!important;
      text-align:center!important;
      box-shadow:3px 4px 0 rgba(18,45,35,.14),0 7px 15px rgba(15,48,37,.12)!important;
      opacity:0;
      transform:translateY(5px) scale(.97);
      transition:opacity .24s ease,transform .24s ease;
      pointer-events:none!important;
      overflow:visible!important;
    }
    .aw-v43-bubble.show{opacity:1!important;transform:none!important}
    .aw-v39-guide.right .aw-v43-bubble{left:4px!important;right:auto!important}
    .aw-v39-guide.left .aw-v43-bubble{right:4px!important;left:auto!important}
    .aw-v43-bubble::before,
    .aw-v43-bubble::after{
      content:""!important;
      position:absolute!important;
      top:auto!important;
      width:0!important;
      height:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      transform:none!important;
    }
    .aw-v39-guide.right .aw-v43-bubble::before{
      right:16px!important;bottom:-13px!important;
      border-left:7px solid transparent!important;
      border-right:3px solid transparent!important;
      border-top:13px solid #153c30!important;
    }
    .aw-v39-guide.right .aw-v43-bubble::after{
      right:17px!important;bottom:-9px!important;
      border-left:5px solid transparent!important;
      border-right:2px solid transparent!important;
      border-top:10px solid #fffdf5!important;
    }
    .aw-v39-guide.left .aw-v43-bubble::before{
      left:16px!important;bottom:-13px!important;
      border-right:7px solid transparent!important;
      border-left:3px solid transparent!important;
      border-top:13px solid #153c30!important;
    }
    .aw-v39-guide.left .aw-v43-bubble::after{
      left:17px!important;bottom:-9px!important;
      border-right:5px solid transparent!important;
      border-left:2px solid transparent!important;
      border-top:10px solid #fffdf5!important;
    }
    @media(max-width:700px){
      .aw-v43-bubble{width:120px!important;min-height:42px!important;padding:7px 9px!important;font-size:9.8px!important}
    }
  `;
  document.head.appendChild(style);

  function install() {
    const guide = document.querySelector('.aw-v39-guide');
    const annie = guide?.querySelector('.aw-v39-annie');
    const bubble = guide?.querySelector('.aw-v39-bubble');
    if (!guide || !annie || !bubble) return false;

    bubble.classList.remove('aw-v39-bubble');
    bubble.classList.add('aw-v43-bubble');
    if (bubble.textContent.trim() === SHORT_OPENING) bubble.textContent = OPENING;

    let idleTimer = 0;

    const isPerchedAndVisible = () =>
      document.visibilityState === 'visible' &&
      guide.classList.contains('show') &&
      guide.classList.contains('landed');

    const scheduleIdleTip = () => {
      window.clearTimeout(idleTimer);
      if (!isPerchedAndVisible()) return;
      idleTimer = window.setTimeout(() => {
        if (!isPerchedAndVisible()) return;
        annie.click();
        scheduleIdleTip();
      }, 10000);
    };

    annie.addEventListener('click', scheduleIdleTip);
    window.addEventListener('scroll', scheduleIdleTip, {passive:true});
    window.addEventListener('pointerdown', scheduleIdleTip, {passive:true});
    document.addEventListener('visibilitychange', scheduleIdleTip);

    const guideObserver = new MutationObserver(scheduleIdleTip);
    guideObserver.observe(guide, {attributes:true, attributeFilter:['class']});

    scheduleIdleTip();
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (install() || attempts > 60) window.clearInterval(timer);
  }, 100);
})();