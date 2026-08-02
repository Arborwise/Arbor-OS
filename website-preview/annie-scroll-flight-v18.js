(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const MESSAGE_MS = 2000;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const stops = [
    {
      selector: '.annie-callout',
      top: 28,
      mobileTop: 24,
      tips: [
        'You do not need the diagnosis before you call—just show us what changed.',
        'Trees are excellent listeners. We are pretty good at listening to them, too.',
        'A whole-tree photo tells a much better story than one mysterious leaf.'
      ]
    },
    {
      selector: '#concerns',
      top: 34,
      mobileTop: 27,
      tips: [
        'Whole tree, close-up, and trunk base—three photos give us a much better starting point.',
        'Trees usually whisper before they shout. New changes are worth noticing.',
        'A crack, lean, cavity, or sudden leaf change deserves a closer look—not a wild guess.'
      ]
    },
    {
      selector: '#services',
      top: 42,
      mobileTop: 33,
      tips: [
        'Good pruning solves a problem. Random cuts just give the tree a bad haircut.',
        'Every cut should have a reason, and every removal should have a plan.',
        'The best tree work protects both the tree and everything growing around it.'
      ]
    },
    {
      selector: '#way',
      top: 30,
      mobileTop: 26,
      tips: [
        'The right answer is sometimes “not yet.” Honest tree care includes knowing what can wait.',
        'A recommendation should make sense before a saw ever starts.',
        'We would rather explain the reason than pressure you into the work.'
      ]
    },
    {
      selector: '#areas',
      top: 41,
      mobileTop: 32,
      tips: [
        'We work where our name has to keep meaning something. That keeps us accountable.',
        'Local roots are not just for trees. Arborwise is part of these communities, too.',
        'A good reputation grows slowly—and we plan to keep nurturing ours.'
      ]
    },
    {
      selector: '#estimate',
      top: 30,
      mobileTop: 26,
      tips: [
        'Tell us what worries you most. We will look at the whole tree before recommending a thing.',
        'Photos help, but the property tells the full story. Let’s look before we guess.',
        'A clear estimate should answer questions, not create new ones.'
      ]
    }
  ];

  let launched = false;
  let launching = false;
  let landedIndex = 0;
  let side = 'right';
  let tipIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let flightAnimation = null;
  let lastScrollY = window.scrollY;

  const wait = milliseconds => new Promise(resolve => window.setTimeout(resolve, milliseconds));
  const clamp = (value, minimum, maximum) => Math.min(Math.max(value, minimum), maximum);

  function installStyles() {
    document.querySelectorAll('[id^="arborwise-annie-scroll-flight-"]').forEach(node => node.remove());
    document.getElementById('awAnnieLogoHome')?.remove();

    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v25';
    style.textContent = `
      ${SOURCE_SELECTOR}{transform-origin:50% 55%}
      ${SOURCE_SELECTOR}.aw-annie-awakening{animation:aw-annie-awaken .58s ease-in-out both}

      .aw-annie-scroll{
        --annie-top:28vh;
        position:fixed;
        z-index:80;
        top:var(--annie-top);
        bottom:auto;
        width:122px;
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
        bottom:calc(100% + 10px);
        width:min(292px,calc(100vw - 34px));
        padding:13px 15px;
        border:2px solid #c9972f;
        border-radius:19px;
        background:#fffdf6;
        color:#173f2e;
        box-shadow:0 14px 34px rgba(0,0,0,.20);
        font-size:.91rem;
        font-weight:800;
        line-height:1.38;
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
        width:122px;
        height:140px;
        margin:0!important;
        padding:0!important;
        align-items:flex-end;
        justify-content:center;
        border:0!important;
        border-radius:0!important;
        background:transparent!important;
        box-shadow:none!important;
        appearance:none!important;
        -webkit-appearance:none!important;
        -webkit-tap-highlight-color:transparent!important;
        touch-action:manipulation;
        pointer-events:auto;
        cursor:pointer;
        filter:drop-shadow(0 8px 7px rgba(0,0,0,.22));
      }
      .aw-annie-scroll__perch:focus{outline:none!important}
      .aw-annie-scroll__perch:focus-visible{outline:3px solid #d8f277!important;outline-offset:4px!important}

      .aw-annie-scroll__owl{
        position:relative;
        z-index:3;
        display:block;
        width:112px;
        height:112px;
        margin-bottom:3px;
        object-fit:contain;
        object-position:center top;
        clip-path:inset(0 0 29% 0);
        transform-origin:50% 60%;
        user-select:none;
        -webkit-user-drag:none;
        will-change:transform,opacity;
      }

      .aw-annie-scroll__branch{
        position:absolute;
        z-index:1;
        left:4px;
        right:0;
        bottom:14px;
        height:13px;
        border-radius:75% 28% 72% 32%;
        background:
          radial-gradient(circle at 28% 45%,#b07b46 0 7%,transparent 8%),
          radial-gradient(circle at 72% 52%,#3d2617 0 6%,transparent 7%),
          linear-gradient(180deg,#9a673b 0%,#704525 48%,#4d2e18 100%);
        box-shadow:0 2px 0 rgba(255,255,255,.18) inset,0 -2px 0 rgba(0,0,0,.12) inset;
        transform:translateY(6px) rotate(-2deg) scale(.92);
        opacity:0;
        transition:opacity .22s ease,transform .26s ease;
      }
      .aw-annie-scroll.branch-ready .aw-annie-scroll__branch{
        opacity:1;
        transform:translateY(0) rotate(-2deg) scale(1);
      }
      .aw-annie-scroll__branch::before{
        content:'';
        position:absolute;
        right:5px;
        top:-6px;
        width:42px;
        height:7px;
        border-radius:999px;
        background:linear-gradient(180deg,#825431,#50301b);
        transform:rotate(-25deg);
        transform-origin:right center;
      }
      .aw-annie-scroll__branch::after{
        content:'';
        position:absolute;
        left:9px;
        top:8px;
        width:34px;
        height:6px;
        border-radius:999px;
        background:linear-gradient(180deg,#825431,#50301b);
        transform:rotate(19deg);
        transform-origin:left center;
      }
      .aw-oak-leaf{
        position:absolute;
        display:block;
        width:22px;
        height:17px;
        background:linear-gradient(135deg,#5c9a49,#2f6f3f 70%);
        clip-path:polygon(50% 0,62% 17%,81% 9%,78% 32%,100% 48%,76% 58%,87% 82%,62% 75%,50% 100%,38% 75%,13% 82%,24% 58%,0 48%,22% 32%,19% 9%,38% 17%);
        filter:drop-shadow(0 1px 1px rgba(0,0,0,.16));
      }
      .aw-oak-leaf.one{right:8px;top:-20px;transform:rotate(-18deg)}
      .aw-oak-leaf.two{right:29px;top:-15px;transform:rotate(27deg) scale(.88)}
      .aw-oak-leaf.three{left:5px;top:-15px;transform:rotate(-38deg) scale(.82)}
      .aw-oak-leaf.four{left:24px;top:-20px;transform:rotate(20deg) scale(.72)}

      .aw-annie-scroll.is-flying .aw-annie-scroll__owl{animation:aw-flight-flutter .14s ease-in-out infinite alternate}
      .aw-annie-scroll.is-settling .aw-annie-scroll__owl{animation:aw-gentle-land .82s ease-out both}
      .aw-annie-scroll.is-tapped .aw-annie-scroll__owl{animation:aw-annie-tap .42s ease-out both}

      @keyframes aw-annie-awaken{
        0%{filter:none;transform:scale(1) rotate(0)}
        30%{filter:drop-shadow(0 0 12px rgba(216,242,119,.72));transform:scale(1.018) rotate(-1.5deg)}
        62%{filter:drop-shadow(0 0 18px rgba(216,242,119,.88));transform:scale(1.025) rotate(1.5deg)}
        100%{filter:none;transform:scale(1) rotate(0)}
      }
      @keyframes aw-flight-flutter{
        from{transform:translateY(2px) rotate(-6deg) scaleX(.94)}
        to{transform:translateY(-8px) rotate(6deg) scaleX(1.06)}
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
        .aw-annie-scroll{width:94px}
        .aw-annie-scroll.is-left{left:7px}
        .aw-annie-scroll.is-right{right:7px}
        .aw-annie-scroll__perch{width:94px;height:110px}
        .aw-annie-scroll__owl{width:88px;height:88px;margin-bottom:1px;clip-path:inset(0 0 29% 0)}
        .aw-annie-scroll__branch{left:2px;right:0;bottom:10px;height:10px}
        .aw-oak-leaf{width:18px;height:14px}
        .aw-oak-leaf.one{right:5px;top:-16px}
        .aw-oak-leaf.two{right:22px;top:-12px}
        .aw-oak-leaf.three{left:3px;top:-12px}
        .aw-oak-leaf.four{left:19px;top:-16px}
        .aw-annie-scroll__bubble{
          width:min(228px,calc(100vw - 20px));
          padding:11px 12px;
          font-size:.82rem;
          bottom:calc(100% + 9px);
        }
      }
      @media(prefers-reduced-motion:reduce){
        .aw-annie-scroll__bubble,.aw-annie-scroll__branch{transition:none!important}
        .aw-annie-scroll__owl,${SOURCE_SELECTOR}{animation:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function getSource() {
    return document.querySelector(SOURCE_SELECTOR);
  }

  function sourceIsVisible() {
    const source = getSource();
    if (!source) return false;
    const rect = source.getBoundingClientRect();
    return rect.bottom > window.innerHeight * .15 && rect.top < window.innerHeight * .82;
  }

  function getStopTop(stop) {
    return window.innerWidth <= 700 ? stop.mobileTop : stop.top;
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
        <span class="aw-annie-scroll__branch" aria-hidden="true">
          <i class="aw-oak-leaf one"></i>
          <i class="aw-oak-leaf two"></i>
          <i class="aw-oak-leaf three"></i>
          <i class="aw-oak-leaf four"></i>
        </span>
      </button>`;
    document.body.appendChild(guide);

    guide.querySelector('.aw-annie-scroll__perch')?.addEventListener('click', () => {
      if (!launched || flightAnimation) return;
      if (guide.classList.contains('has-tip')) {
        hideTip();
        return;
      }
      const tips = stops[landedIndex]?.tips || stops[0].tips;
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

  function prepareLaunchDestination(sourceRect) {
    const guide = getGuide();
    const estimatedHeight = window.innerWidth <= 700 ? 110 : 140;
    const top = clamp(
      sourceRect.top + sourceRect.height * .45 - estimatedHeight * .50,
      76,
      window.innerHeight - estimatedHeight - 76
    );
    guide.classList.remove('is-left','is-right','is-settling','branch-ready');
    guide.classList.add('is-right','is-visible');
    guide.style.setProperty('--annie-top', `${Math.round(top)}px`);
  }

  async function animateOwlFrom(startRect, duration, startScale = 1) {
    const guide = getGuide();
    const owl = guide.querySelector('.aw-annie-scroll__owl');
    if (!owl) return;

    const targetRect = owl.getBoundingClientRect();
    const dx = startRect.left + startRect.width / 2 - (targetRect.left + targetRect.width / 2);
    const dy = startRect.top + startRect.height / 2 - (targetRect.top + targetRect.height / 2);
    const branchTimer = window.setTimeout(
      () => guide.classList.add('branch-ready'),
      reducedMotion.matches ? 0 : duration * .74
    );

    owl.getAnimations().forEach(animation => animation.cancel());
    guide.classList.add('is-flying');

    if (!reducedMotion.matches && owl.animate) {
      flightAnimation = owl.animate([
        {transform:`translate(${dx}px,${dy}px) scale(${startScale}) rotate(0deg)`,opacity:.15,offset:0},
        {transform:`translate(${dx*.90}px,${dy*.86-18}px) scale(.92) rotate(-7deg)`,opacity:1,offset:.15},
        {transform:`translate(${dx*.68}px,${dy*.62-52}px) scale(1) rotate(7deg)`,opacity:1,offset:.38},
        {transform:`translate(${dx*.42}px,${dy*.35-72}px) rotate(-6deg)`,opacity:1,offset:.60},
        {transform:`translate(${dx*.17}px,${dy*.12-44}px) rotate(5deg)`,opacity:1,offset:.80},
        {transform:'translate(0,-18px) rotate(-4deg)',opacity:1,offset:.93},
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

  async function launchFromAskAnnie() {
    if (launched || launching || flightAnimation || !sourceIsVisible()) return;
    const source = getSource();
    if (!source) return;

    launching = true;
    source.classList.add('aw-annie-awakening');
    await wait(reducedMotion.matches ? 1 : 430);
    const startRect = source.getBoundingClientRect();
    prepareLaunchDestination(startRect);
    await animateOwlFrom(startRect, reducedMotion.matches ? 1 : 1550, .80);
    source.classList.remove('aw-annie-awakening');

    side = 'right';
    landedIndex = 0;
    tipIndex = 0;
    launched = true;
    launching = false;
    showTip('Hi, I’m Arborwise Annie. We’re glad you’re here.');
  }

  function getActiveStop() {
    const line = window.innerHeight * .52;
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
      const nextDistance = Math.abs(center - line);
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
    if (!reducedMotion.matches) await wait(150);
    const startRect = owl.getBoundingClientRect();
    const nextSide = side === 'right' ? 'left' : 'right';
    prepareDestination(index,nextSide);
    side = nextSide;
    tipIndex = 0;
    await animateOwlFrom(startRect,reducedMotion.matches ? 1 : 1400,1);
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
    buildGuide();

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      const movingDown = currentScrollY > lastScrollY + 1;
      lastScrollY = currentScrollY;

      if (!launched && !launching && movingDown && sourceIsVisible()) {
        launchFromAskAnnie();
      }

      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,190);
    },{passive:true});

    window.addEventListener('keydown', event => {
      if (!launched && sourceIsVisible() && ['ArrowDown','PageDown',' ','End'].includes(event.key)) {
        launchFromAskAnnie();
      }
    });

    window.addEventListener('resize', () => {
      hideTip();
      if (launched) {
        getGuide().style.setProperty('--annie-top', `${getStopTop(stops[landedIndex])}vh`);
      }
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,140);
    },{passive:true});
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();
