(() => {
  'use strict';

  const stops = [
    {
      selector: '.annie-callout',
      top: 24,
      mobileTop: 22,
      tips: [
        'You do not need to know the diagnosis before you call.',
        'Show us what changed, where it changed, and how quickly.',
        'A good answer starts with the whole tree, not one close-up.'
      ]
    },
    {
      selector: '#services',
      top: 43,
      mobileTop: 35,
      tips: [
        'Good pruning has a reason. Every cut should solve a specific problem.',
        'No topping. No random cuts. Every action should have a purpose.',
        'The best tree work protects both the tree and the property around it.'
      ]
    },
    {
      selector: '#way',
      top: 28,
      mobileTop: 25,
      tips: [
        'The right answer is sometimes “not yet.” Honest tree care includes knowing what can wait.',
        'A recommendation should make sense before a saw ever starts.',
        'Good work begins with looking at the whole tree and the whole site.'
      ]
    },
    {
      selector: '#areas',
      top: 42,
      mobileTop: 33,
      tips: [
        'Local accountability matters. We work where our name has to keep meaning something.',
        'Membership means showing up for the communities we serve.',
        'Arborwise is rooted here, and our reputation has to live here too.'
      ]
    },
    {
      selector: '#estimate',
      top: 29,
      mobileTop: 25,
      tips: [
        'Photos help, but the site tells the whole story. Let’s look before we guess.',
        'Tell us what changed, when it changed, and what worries you most.',
        'A clear estimate starts with a real conversation, not pressure.'
      ]
    }
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const MESSAGE_MS = 2000;
  let launched = false;
  let launching = false;
  let landedIndex = 0;
  let side = 'right';
  let tipIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let flightAnimation = null;

  const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));

  function installStyles() {
    document.querySelectorAll('[id^="arborwise-annie-scroll-flight-"]').forEach(node => node.remove());
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v24';
    style.textContent = `
      .brand,.aw-brand{position:relative!important;overflow:visible!important;isolation:isolate}
      .brand>img,.aw-brand>img{position:relative;z-index:5}
      .aw-annie-logo-home{
        position:absolute;
        z-index:4;
        right:3%;
        bottom:3%;
        display:block;
        width:76px;
        height:76px;
        border:0;
        background:transparent;
        box-shadow:none;
        pointer-events:none;
        opacity:1;
        transform:translateY(10px) scale(.88);
        transition:opacity .22s ease,transform .22s ease,visibility .22s ease;
      }
      .aw-annie-logo-home img{
        display:block;
        width:100%;
        height:100%;
        object-fit:contain;
        user-select:none;
        -webkit-user-drag:none;
        filter:drop-shadow(0 5px 6px rgba(0,0,0,.26));
      }
      .aw-annie-logo-home.is-peeking img{animation:aw-logo-peek 1.1s ease-in-out both}
      .aw-annie-logo-home.is-gone{opacity:0;transform:translateY(16px) scale(.68);visibility:hidden}

      .aw-annie-scroll{
        --annie-top:24vh;
        position:fixed;
        z-index:80;
        top:var(--annie-top);
        bottom:auto;
        width:118px;
        pointer-events:none;
        opacity:0;
        visibility:hidden;
        contain:layout style;
      }
      .aw-annie-scroll.is-visible{opacity:1;visibility:visible}
      .aw-annie-scroll.is-left{left:18px;right:auto}
      .aw-annie-scroll.is-right{right:18px;left:auto}
      .aw-annie-scroll__bubble{
        position:absolute;
        bottom:calc(100% + 12px);
        width:min(286px,calc(100vw - 34px));
        padding:14px 16px;
        border:2px solid #c9972f;
        border-radius:18px;
        background:#fffdf6;
        color:#173f2e;
        box-shadow:0 14px 34px rgba(0,0,0,.2);
        font-size:.91rem;
        font-weight:800;
        line-height:1.4;
        opacity:0;
        transform:translateY(8px) scale(.96);
        transition:opacity .14s ease,transform .14s ease;
      }
      .aw-annie-scroll.is-left .aw-annie-scroll__bubble{left:0}
      .aw-annie-scroll.is-right .aw-annie-scroll__bubble{right:0}
      .aw-annie-scroll__bubble::after{
        content:'';
        position:absolute;
        bottom:-11px;
        width:18px;
        height:18px;
        background:#fffdf6;
        border-right:2px solid #c9972f;
        border-bottom:2px solid #c9972f;
        transform:rotate(45deg);
      }
      .aw-annie-scroll.is-left .aw-annie-scroll__bubble::after{left:42px}
      .aw-annie-scroll.is-right .aw-annie-scroll__bubble::after{right:42px}
      .aw-annie-scroll.has-tip .aw-annie-scroll__bubble{opacity:1;transform:translateY(0) scale(1)}

      .aw-annie-scroll__perch{
        position:relative;
        display:flex;
        width:118px;
        height:138px;
        margin:0!important;
        padding:0!important;
        align-items:flex-end;
        justify-content:center;
        border:0!important;
        border-radius:18px!important;
        background:transparent!important;
        box-shadow:none!important;
        appearance:none!important;
        -webkit-appearance:none!important;
        -webkit-tap-highlight-color:transparent!important;
        touch-action:manipulation;
        pointer-events:auto;
        cursor:pointer;
        filter:drop-shadow(0 8px 7px rgba(0,0,0,.24));
      }
      .aw-annie-scroll__perch:focus{outline:none!important}
      .aw-annie-scroll__perch:focus-visible{outline:3px solid #d8f277!important;outline-offset:4px!important}
      .aw-annie-scroll__owl{
        position:relative;
        z-index:3;
        display:block;
        width:108px;
        height:108px;
        object-fit:contain;
        object-position:center top;
        clip-path:inset(0 0 17% 0);
        transform-origin:50% 78%;
        user-select:none;
        -webkit-user-drag:none;
        will-change:transform,opacity;
      }
      .aw-annie-scroll__branch{
        position:absolute;
        z-index:1;
        left:8px;
        right:3px;
        bottom:13px;
        height:10px;
        border-radius:999px;
        background:linear-gradient(180deg,#85522e,#4f2d17);
        transform:translateY(4px) rotate(-3deg) scale(.94);
        opacity:0;
        transition:opacity .22s ease,transform .24s ease;
        box-shadow:0 2px 0 rgba(255,255,255,.2) inset;
      }
      .aw-annie-scroll.branch-ready .aw-annie-scroll__branch{
        opacity:1;
        transform:translateY(0) rotate(-3deg) scale(1);
      }
      .aw-annie-scroll__branch::before,
      .aw-annie-scroll__branch::after{
        content:'';
        position:absolute;
        width:22px;
        height:12px;
        border-radius:100% 0 100% 0;
        background:#4f7d38;
      }
      .aw-annie-scroll__branch::before{left:13px;top:-9px;transform:rotate(-24deg)}
      .aw-annie-scroll__branch::after{right:17px;top:-7px;transform:scaleX(-1) rotate(-18deg)}
      .aw-annie-scroll.is-flying .aw-annie-scroll__owl{animation:aw-flight-flutter .15s ease-in-out infinite alternate}
      .aw-annie-scroll.is-settling .aw-annie-scroll__owl{animation:aw-gentle-land .82s ease-out both}
      .aw-annie-scroll.is-tapped .aw-annie-scroll__owl{animation:aw-annie-tap .42s ease-out both}

      @keyframes aw-logo-peek{
        0%{opacity:0;transform:translateY(20px) scale(.66) rotate(0)}
        38%{opacity:1;transform:translateY(7px) scale(.90) rotate(-5deg)}
        65%{transform:translateY(3px) scale(.92) rotate(5deg)}
        82%{transform:translateY(4px) scale(.88,.80) rotate(0)}
        100%{opacity:1;transform:translateY(10px) scale(.88) rotate(0)}
      }
      @keyframes aw-flight-flutter{
        from{transform:translateY(2px) rotate(-5deg) scaleX(.95)}
        to{transform:translateY(-8px) rotate(5deg) scaleX(1.05)}
      }
      @keyframes aw-gentle-land{
        0%{transform:translateY(-28px) rotate(-6deg)}
        28%{transform:translateY(-18px) rotate(5deg)}
        56%{transform:translateY(-8px) rotate(-3deg)}
        78%{transform:translateY(3px) rotate(2deg)}
        90%{transform:translateY(-2px) rotate(-1deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @keyframes aw-annie-tap{
        0%{transform:translateY(0) rotate(0)}
        45%{transform:translateY(-6px) rotate(-3deg)}
        100%{transform:translateY(0) rotate(0)}
      }

      @media(max-width:700px){
        .aw-annie-logo-home{right:1%;bottom:1%;width:58px;height:58px}
        .aw-annie-scroll{width:92px;top:var(--annie-top)}
        .aw-annie-scroll.is-left{left:8px}
        .aw-annie-scroll.is-right{right:8px}
        .aw-annie-scroll__perch{width:92px;height:108px}
        .aw-annie-scroll__owl{width:84px;height:84px}
        .aw-annie-scroll__branch{left:5px;right:1px;bottom:10px;height:8px}
        .aw-annie-scroll__bubble{
          width:min(224px,calc(100vw - 22px));
          padding:12px 13px;
          font-size:.82rem;
          bottom:calc(100% + 10px);
        }
      }
      @media(prefers-reduced-motion:reduce){
        .aw-annie-scroll__bubble,.aw-annie-scroll__branch{transition:none!important}
        .aw-annie-scroll__owl,.aw-annie-logo-home img{animation:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function getStopTop(stop) {
    return window.innerWidth <= 700 ? stop.mobileTop : stop.top;
  }

  function buildLaunchpad() {
    let home = document.getElementById('awAnnieLogoHome');
    if (home) return home;
    const brand = document.querySelector('.brand') || document.querySelector('.aw-brand') || document.querySelector('.site-header');
    if (!brand) return null;
    home = document.createElement('span');
    home.id = 'awAnnieLogoHome';
    home.className = 'aw-annie-logo-home';
    home.setAttribute('aria-label', 'Annie, the Arborwise owl mascot');
    home.innerHTML = '<img src="assets/annie.webp" alt="">';
    brand.appendChild(home);
    return home;
  }

  function buildGuide() {
    document.getElementById('awAnnieScrollGuide')?.remove();
    const guide = document.createElement('aside');
    guide.className = 'aw-annie-scroll is-right';
    guide.id = 'awAnnieScrollGuide';
    guide.setAttribute('aria-label', 'Annie tree-care guide');
    guide.innerHTML = `
      <div class="aw-annie-scroll__bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-scroll__perch" type="button" aria-label="Toggle Annie's tree-care tip">
        <img class="aw-annie-scroll__owl" src="assets/annie.webp" alt="Annie, the Arborwise owl mascot">
        <span class="aw-annie-scroll__branch" aria-hidden="true"></span>
      </button>`;
    document.body.appendChild(guide);

    guide.querySelector('.aw-annie-scroll__perch')?.addEventListener('click', () => {
      if (!launched || flightAnimation) return;
      if (guide.classList.contains('has-tip')) {
        hideTip();
        return;
      }
      const tips = stops[landedIndex].tips;
      tipIndex = (tipIndex + 1) % tips.length;
      guide.classList.remove('is-tapped');
      void guide.offsetWidth;
      guide.classList.add('is-tapped');
      window.setTimeout(() => guide.classList.remove('is-tapped'), 430);
      showTip(tips[tipIndex]);
    });
    return guide;
  }

  function getGuide() {
    return document.getElementById('awAnnieScrollGuide') || buildGuide();
  }

  function hideTip() {
    window.clearTimeout(bubbleTimer);
    getGuide().classList.remove('has-tip');
  }

  function showTip(text) {
    const guide = getGuide();
    const bubble = guide.querySelector('.aw-annie-scroll__bubble');
    if (!bubble) return;
    bubble.textContent = text;
    guide.classList.add('has-tip');
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(hideTip, MESSAGE_MS);
  }

  function prepareDestination(index, nextSide) {
    const guide = getGuide();
    guide.classList.remove('is-left','is-right','is-settling','branch-ready');
    guide.classList.add(`is-${nextSide}`,'is-visible');
    guide.style.setProperty('--annie-top', `${getStopTop(stops[index])}vh`);
  }

  async function animateOwlFrom(startRect, duration) {
    const guide = getGuide();
    const owl = guide.querySelector('.aw-annie-scroll__owl');
    if (!owl) return;
    const targetRect = owl.getBoundingClientRect();
    const dx = startRect.left + startRect.width / 2 - (targetRect.left + targetRect.width / 2);
    const dy = startRect.top + startRect.height / 2 - (targetRect.top + targetRect.height / 2);
    const scale = Math.max(.65, Math.min(1.12, startRect.width / Math.max(targetRect.width,1)));
    const branchTimer = window.setTimeout(() => guide.classList.add('branch-ready'), reducedMotion.matches ? 0 : duration * .70);

    owl.getAnimations().forEach(animation => animation.cancel());
    guide.classList.add('is-flying');

    if (!reducedMotion.matches && owl.animate) {
      flightAnimation = owl.animate([
        {transform:`translate(${dx}px,${dy}px) scale(${scale}) rotate(0deg)`,opacity:1,offset:0},
        {transform:`translate(${dx*.82}px,${dy*.78-36}px) scale(1) rotate(-8deg)`,opacity:1,offset:.20},
        {transform:`translate(${dx*.56}px,${dy*.49-72}px) rotate(8deg)`,opacity:1,offset:.46},
        {transform:`translate(${dx*.30}px,${dy*.23-48}px) rotate(-6deg)`,opacity:1,offset:.69},
        {transform:`translate(${dx*.11}px,-34px) rotate(5deg)`,opacity:1,offset:.83},
        {transform:'translate(0,-18px) rotate(-4deg)',opacity:1,offset:.92},
        {transform:'translate(0,0) rotate(0deg)',opacity:1,offset:1}
      ],{duration,easing:'cubic-bezier(.22,.72,.18,1)',fill:'both'});
      try { await flightAnimation.finished; } catch (_) {}
    }

    window.clearTimeout(branchTimer);
    guide.classList.add('branch-ready');
    guide.classList.remove('is-flying');
    guide.classList.add('is-settling');
    window.setTimeout(() => guide.classList.remove('is-settling'), 850);
    flightAnimation = null;
  }

  async function launchFromLogo() {
    if (launched || launching || flightAnimation) return;
    const home = buildLaunchpad();
    const homeImage = home?.querySelector('img');
    if (!homeImage) return;

    launching = true;
    const startRect = homeImage.getBoundingClientRect();
    prepareDestination(0,'right');
    home.classList.add('is-gone');
    await animateOwlFrom(startRect, reducedMotion.matches ? 1 : 1600);
    side = 'right';
    landedIndex = 0;
    tipIndex = 0;
    launched = true;
    launching = false;
    showTip('Hi, my name is Annie.');
    settleAfterScroll();
  }

  function getActiveStop() {
    const line = window.innerHeight * .5;
    let best = landedIndex;
    let distance = Infinity;
    stops.forEach((stop,index) => {
      const section = document.querySelector(stop.selector);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.height < 40) return;
      const center = rect.top + rect.height / 2;
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      const contains = rect.top <= line && rect.bottom >= line;
      const nextDistance = Math.abs(center-line);
      if (contains || (visible && nextDistance < distance)) {
        best = index;
        distance = contains ? 0 : nextDistance;
      }
    });
    return best;
  }

  async function flyAndLand(index) {
    if (!launched || index === landedIndex || index < 0 || flightAnimation || launching) return;
    const guide = getGuide();
    const owl = guide.querySelector('.aw-annie-scroll__owl');
    if (!owl) return;

    hideTip();
    guide.classList.remove('branch-ready');
    if (!reducedMotion.matches) await wait(170);
    const startRect = owl.getBoundingClientRect();
    const nextSide = side === 'right' ? 'left' : 'right';
    prepareDestination(index,nextSide);
    side = nextSide;
    tipIndex = 0;
    await animateOwlFrom(startRect,reducedMotion.matches ? 1 : 1450);
    landedIndex = index;
    showTip(stops[index].tips[0]);
  }

  function settleAfterScroll() {
    if (!launched || launching || flightAnimation) return;
    const active = getActiveStop();
    if (active !== landedIndex) flyAndLand(active);
  }

  function start() {
    installStyles();
    const home = buildLaunchpad();
    buildGuide();
    window.setTimeout(() => home?.classList.add('is-peeking'), 260);

    window.addEventListener('scroll', () => {
      if (!launched && !launching && window.scrollY > 4) launchFromLogo();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,180);
    },{passive:true});

    window.addEventListener('keydown', event => {
      if (!launched && ['ArrowDown','PageDown',' ','End'].includes(event.key)) launchFromLogo();
    });

    window.addEventListener('resize', () => {
      if (launched) getGuide().style.setProperty('--annie-top', `${getStopTop(stops[landedIndex])}vh`);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,140);
    },{passive:true});

    if (window.scrollY > 4) window.setTimeout(launchFromLogo,180);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
