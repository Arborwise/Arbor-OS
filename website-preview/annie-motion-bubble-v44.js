(() => {
  'use strict';

  document.getElementById('arborwise-annie-motion-bubble-v44')?.remove();

  const OPENING = "Hi! I'm Arborwise Annie & we're glad you're here!";
  const TAP_TIPS = [
    'Show the whole tree, concern, and trunk base.',
    'Cavities are clues—not automatic removals.',
    'Good pruning always has a reason.',
    'Keep mulch off the trunk flare.',
    'Send the address with clear photos.'
  ];

  const TARGETS = [
    ['.hero', OPENING],
    ['.trust-band', 'Certified guidance. Local accountability.'],
    ['#concerns', 'Start with what changed—not a guess.'],
    ['#services', 'Every service should solve a real problem.'],
    ['#planting, .growth-section', 'Keep the root flare visible.'],
    ['#way', 'Good advice explains what can wait.'],
    ['#estimate', 'Send the address and three clear photos.'],
    ['.faq-section', 'Tap a question for a straight answer.']
  ];

  const style = document.createElement('style');
  style.id = 'arborwise-annie-motion-bubble-v44';
  style.textContent = `
    .aw-v44-guide{
      width:180px!important;
      height:124px!important;
      bottom:116px!important;
    }

    .aw-v44-guide .aw-v44-bubble{
      position:absolute!important;
      z-index:15!important;
      top:-34px!important;
      width:112px!important;
      min-height:38px!important;
      padding:7px 9px!important;
      border:2px solid #153c30!important;
      border-radius:50% / 46%!important;
      background:#fffdf5!important;
      color:#123d31!important;
      font:850 10px/1.18 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      letter-spacing:-.01em!important;
      text-align:center!important;
      box-shadow:3px 4px 0 rgba(18,45,35,.13),0 7px 15px rgba(15,48,37,.12)!important;
      opacity:0!important;
      transform:translateY(4px) scale(.97)!important;
      transition:opacity .22s ease,transform .22s ease!important;
      pointer-events:none!important;
      overflow:visible!important;
    }
    .aw-v44-guide .aw-v44-bubble.long{
      width:148px!important;
      min-height:50px!important;
      padding:9px 11px!important;
      font-size:10.4px!important;
    }
    .aw-v44-guide .aw-v44-bubble.show{
      opacity:1!important;
      transform:none!important;
    }
    .aw-v44-guide.right .aw-v44-bubble{left:4px!important;right:auto!important}
    .aw-v44-guide.left .aw-v44-bubble{right:4px!important;left:auto!important}

    .aw-v44-guide .aw-v44-bubble::before,
    .aw-v44-guide .aw-v44-bubble::after{
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
    .aw-v44-guide.right .aw-v44-bubble::before{
      right:13px!important;left:auto!important;bottom:-14px!important;
      border-left:7px solid transparent!important;
      border-right:3px solid transparent!important;
      border-top:14px solid #153c30!important;
      border-bottom:0!important;
    }
    .aw-v44-guide.right .aw-v44-bubble::after{
      right:14px!important;left:auto!important;bottom:-10px!important;
      border-left:5px solid transparent!important;
      border-right:2px solid transparent!important;
      border-top:11px solid #fffdf5!important;
      border-bottom:0!important;
    }
    .aw-v44-guide.left .aw-v44-bubble::before{
      left:13px!important;right:auto!important;bottom:-14px!important;
      border-right:7px solid transparent!important;
      border-left:3px solid transparent!important;
      border-top:14px solid #153c30!important;
      border-bottom:0!important;
    }
    .aw-v44-guide.left .aw-v44-bubble::after{
      left:14px!important;right:auto!important;bottom:-10px!important;
      border-right:5px solid transparent!important;
      border-left:2px solid transparent!important;
      border-top:11px solid #fffdf5!important;
      border-bottom:0!important;
    }

    .aw-v44-guide .aw-v39-annie{
      z-index:16!important;
    }

    @media(max-width:700px){
      .aw-v44-guide{width:174px!important;height:120px!important;bottom:116px!important}
      .aw-v44-guide .aw-v44-bubble{
        top:-32px!important;
        width:108px!important;
        min-height:36px!important;
        padding:6px 8px!important;
        font-size:9.7px!important;
      }
      .aw-v44-guide .aw-v44-bubble.long{
        width:142px!important;
        min-height:48px!important;
        padding:8px 10px!important;
        font-size:10px!important;
      }
    }
  `;
  document.head.appendChild(style);

  function install() {
    const oldGuide = document.querySelector('.aw-v39-guide');
    if (!oldGuide) return false;

    const guide = oldGuide.cloneNode(true);
    oldGuide.remove();

    guide.classList.add('aw-v44-guide');
    guide.classList.remove('show', 'landed', 'left');
    guide.classList.add('right');

    const bubble = guide.querySelector('.aw-v43-bubble, .aw-v39-bubble');
    const annie = guide.querySelector('.aw-v39-annie');
    if (!bubble || !annie) return false;

    bubble.className = 'aw-v44-bubble';
    bubble.textContent = '';
    guide.appendChild(bubble);
    guide.appendChild(annie);
    document.body.appendChild(guide);

    const targets = TARGETS.map(([selector, message]) => {
      const element = document.querySelector(selector);
      return element ? {element, message} : null;
    }).filter(Boolean);

    let activeTarget = -1;
    let tipIndex = 0;
    let bubbleTimer = 0;
    let blinkTimer = 0;
    let idleTimer = 0;
    let moveTimer = 0;
    let frame = 0;

    const isVisible = () =>
      document.visibilityState === 'visible' &&
      guide.classList.contains('show') &&
      guide.classList.contains('landed');

    function scheduleIdleTip() {
      window.clearTimeout(idleTimer);
      if (!isVisible()) return;
      idleTimer = window.setTimeout(() => {
        if (!isVisible()) return;
        showBubble(TAP_TIPS[tipIndex++ % TAP_TIPS.length]);
        scheduleIdleTip();
      }, 10000);
    }

    function showBubble(message) {
      window.clearTimeout(bubbleTimer);
      window.clearTimeout(blinkTimer);
      bubble.textContent = message;
      bubble.classList.toggle('long', message.length > 40);
      bubble.classList.add('show');
      annie.classList.remove('blink');
      blinkTimer = window.setTimeout(() => {
        annie.classList.add('blink');
        window.setTimeout(() => annie.classList.remove('blink'), 430);
      }, 2400);
      bubbleTimer = window.setTimeout(() => bubble.classList.remove('show'), 4000);
      scheduleIdleTip();
    }

    function landAt(index, immediate = false) {
      if (index === activeTarget && guide.classList.contains('landed')) return;
      activeTarget = index;
      const side = index % 2 === 0 ? 'right' : 'left';
      const message = targets[index]?.message || OPENING;

      window.clearTimeout(moveTimer);
      window.clearTimeout(idleTimer);
      guide.classList.add('show');
      guide.classList.remove('landed');
      bubble.classList.remove('show');

      moveTimer = window.setTimeout(() => {
        guide.classList.toggle('right', side === 'right');
        guide.classList.toggle('left', side === 'left');
        void guide.offsetWidth;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          guide.classList.add('landed');
          window.setTimeout(() => showBubble(message), immediate ? 220 : 480);
        }));
      }, immediate ? 40 : 130);
    }

    function nearestTarget() {
      const focus = window.innerHeight * 0.56;
      let best = 0;
      let distance = Infinity;
      targets.forEach((target, index) => {
        const rect = target.element.getBoundingClientRect();
        const center = rect.top + Math.min(rect.height, window.innerHeight) / 2;
        const candidate = Math.abs(center - focus);
        if (candidate < distance) {
          distance = candidate;
          best = index;
        }
      });
      return best;
    }

    function update() {
      frame = 0;
      if (!targets.length) return;
      landAt(nearestTarget());
      scheduleIdleTip();
    }

    function requestUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    annie.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showBubble(TAP_TIPS[tipIndex++ % TAP_TIPS.length]);
    });

    window.addEventListener('scroll', requestUpdate, {passive:true});
    window.addEventListener('resize', requestUpdate, {passive:true});
    window.addEventListener('pointerdown', scheduleIdleTip, {passive:true});
    document.addEventListener('visibilitychange', scheduleIdleTip);

    if (targets.length) landAt(0, true);
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (install() || attempts > 70) window.clearInterval(timer);
  }, 100);
})();