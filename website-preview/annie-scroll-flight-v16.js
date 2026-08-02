(() => {
  'use strict';

  const stops = [
    {
      selector: '.hero',
      top: 28,
      mobileTop: 26,
      tips: [
        'Welcome to Arborwise. Honest answers come before recommendations.',
        'A healthy tree starts with understanding the whole site.',
        'Sometimes a tree needs work. Sometimes it needs time.'
      ]
    },
    {
      selector: '.annie-callout',
      top: 22,
      mobileTop: 21,
      tips: [
        'You do not need to know the diagnosis before you call.',
        'Show us what changed, where it changed, and how quickly.',
        'A good answer starts with the whole tree, not one close-up.'
      ]
    },
    {
      selector: '#services',
      top: 42,
      mobileTop: 36,
      tips: [
        'Good pruning has a reason. Every cut should solve a specific problem.',
        'No topping. No random cuts. Every action should have a purpose.',
        'The best tree work protects both the tree and the property around it.'
      ]
    },
    {
      selector: '#way',
      top: 27,
      mobileTop: 25,
      tips: [
        'The right answer is sometimes “not yet.” Honest tree care includes knowing what can wait.',
        'A recommendation should make sense before a saw ever starts.',
        'Good work begins with looking at the whole tree and the whole site.'
      ]
    },
    {
      selector: '#areas',
      top: 39,
      mobileTop: 34,
      tips: [
        'Local accountability matters. We work where our name has to keep meaning something.',
        'Membership is not decoration. It means showing up for the communities we serve.',
        'Arborwise is rooted here, and our reputation has to live here too.'
      ]
    },
    {
      selector: '#estimate',
      top: 29,
      mobileTop: 27,
      tips: [
        'Photos help, but the site tells the whole story. Let’s look before we guess.',
        'Tell us what changed, when it changed, and what worries you most.',
        'A clear estimate starts with a real conversation, not pressure.'
      ]
    }
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let launched = false;
  let peeked = false;
  let landedIndex = 0;
  let side = 'right';
  let tipIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let flight = null;
  let initialScrollY = window.scrollY;

  function installStyles() {
    document.getElementById('arborwise-annie-scroll-flight-v21')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v21';
    style.textContent = `
      .aw-annie-scroll{
        --annie-top:28vh;
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
      .aw-annie-scroll.is-at-logo{right:auto}
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
        font-weight:750;
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
      .aw-annie-scroll.has-tip .aw-annie-scroll__bubble{
        opacity:1;
        transform:translateY(0) scale(1);
      }
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
        color:inherit!important;
        font:inherit!important;
        appearance:none!important;
        -webkit-appearance:none!important;
        -webkit-tap-highlight-color:transparent!important;
        touch-action:manipulation;
        pointer-events:auto;
        cursor:pointer;
        filter:drop-shadow(0 8px 7px rgba(0,0,0,.24));
      }
      .aw-annie-scroll__perch:focus{outline:none!important}
      .aw-annie-scroll__perch:focus-visible{
        outline:3px solid #d8f277!important;
        outline-offset:4px!important;
      }
      .aw-annie-scroll__owl{
        position:relative;
        z-index:3;
        display:block;
        width:108px;
        height:108px;
        object-fit:contain;
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
        transform:rotate(-3deg);
        box-shadow:0 2px 0 rgba(255,255,255,.2) inset;
        opacity:1;
        transition:opacity .18s ease;
      }
      .aw-annie-scroll.is-at-logo .aw-annie-scroll__branch{opacity:0}
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
      .aw-annie-scroll.is-flying .aw-annie-scroll__bubble{opacity:0;transform:translateY(10px) scale(.94)}
      .aw-annie-scroll.is-settling .aw-annie-scroll__owl{animation:aw-annie-settle .9s ease-out both}
      .aw-annie-scroll.is-tapped .aw-annie-scroll__owl{animation:aw-annie-tap .42s ease-out both}
      .aw-annie-scroll.is-peeking .aw-annie-scroll__owl{animation:aw-annie-peek 1.35s ease-in-out both}
      @keyframes aw-annie-peek{
        0%{opacity:0;transform:translateY(24px) scale(.72) rotate(0)}
        30%{opacity:1;transform:translateY(5px) scale(.86) rotate(-4deg)}
        53%{transform:translateY(0) scale(.9) rotate(4deg)}
        72%{transform:translateY(0) scale(.9,.84) rotate(0)}
        100%{opacity:1;transform:translateY(0) scale(.9) rotate(0)}
      }
      @keyframes aw-annie-settle{
        0%{transform:translateY(-28px) rotate(-5deg)}
        24%{transform:translateY(-19px) rotate(5deg)}
        48%{transform:translateY(-11px) rotate(-4deg)}
        68%{transform:translateY(-6px) rotate(3deg)}
        84%{transform:translateY(-2px) rotate(-1deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @keyframes aw-annie-tap{
        0%{transform:translateY(0) rotate(0)}
        45%{transform:translateY(-6px) rotate(-3deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @media(max-width:700px){
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
        .aw-annie-scroll__bubble{transition:none!important}
        .aw-annie-scroll__owl{animation:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function getStopTop(stop) {
    return window.innerWidth <= 700 ? stop.mobileTop : stop.top;
  }

  function buildGuide() {
    installStyles();
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
      if (!launched || flight) return;

      if (guide.classList.contains('has-tip')) {
        hideTip();
        return;
      }

      const tips = stops[landedIndex].tips;
      tipIndex = (tipIndex + 1) % tips.length;
      guide.classList.remove('is-tapped');
      void guide.offsetWidth;
      guide.classList.add('is-tapped');
      window.setTimeout(() => guide.classList.remove('is-tapped'), 450);
      showTip(tips[tipIndex]);
    });

    return guide;
  }

  function getGuide() {
    return document.getElementById('awAnnieScrollGuide') || buildGuide();
  }

  function getOwl() {
    return getGuide().querySelector('.aw-annie-scroll__owl');
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
    bubbleTimer = window.setTimeout(hideTip, 2000);
  }

  function getLogoSource() {
    return document.querySelector(
      '.aw-brand [data-brand-logo], .site-header [data-brand-logo], .brand [data-brand-logo], .aw-brand, .site-header .brand'
    );
  }

  function placeAtLogo() {
    if (launched) return;
    const guide = getGuide();
    const source = getLogoSource();
    const rect = source?.getBoundingClientRect();
    const width = guide.offsetWidth || (window.innerWidth <= 700 ? 92 : 118);
    const height = guide.offsetHeight || (window.innerWidth <= 700 ? 108 : 138);

    const left = rect
      ? Math.max(8, Math.min(window.innerWidth - width - 8, rect.left + rect.width * .5 - width * .5))
      : Math.max(8, window.innerWidth * .5 - width * .5);
    const top = rect
      ? Math.max(6, Math.min(window.innerHeight - height - 8, rect.top + rect.height * .34 - height * .42))
      : 18;

    guide.classList.remove('is-left', 'is-right');
    guide.classList.add('is-at-logo', 'is-visible');
    guide.style.left = `${left}px`;
    guide.style.right = 'auto';
    guide.style.top = `${top}px`;
  }

  function peekFromLogo() {
    if (launched || peeked) return;
    placeAtLogo();
    const guide = getGuide();
    guide.classList.remove('is-peeking');
    void guide.offsetWidth;
    guide.classList.add('is-peeking');
    window.setTimeout(() => guide.classList.remove('is-peeking'), 1400);
    peeked = true;
  }

  function prepareDestination(index, nextSide) {
    const guide = getGuide();
    const stop = stops[index];
    guide.classList.remove('is-at-logo', 'is-left', 'is-right', 'is-settling');
    guide.classList.add(`is-${nextSide}`, 'is-visible');
    guide.style.left = '';
    guide.style.right = '';
    guide.style.top = '';
    guide.style.setProperty('--annie-top', `${getStopTop(stop)}vh`);
  }

  async function animateOwlToDestination(startRect, duration) {
    const guide = getGuide();
    const owl = getOwl();
    if (!owl) return;

    const targetRect = owl.getBoundingClientRect();
    const dx = startRect.left + startRect.width / 2 - (targetRect.left + targetRect.width / 2);
    const dy = startRect.top + startRect.height / 2 - (targetRect.top + targetRect.height / 2);
    const startScale = Math.max(.72, Math.min(1.05, startRect.width / Math.max(targetRect.width, 1)));

    owl.getAnimations().forEach(animation => animation.cancel());
    guide.classList.add('is-flying');

    if (!reducedMotion.matches && owl.animate) {
      flight = owl.animate([
        {transform:`translate(${dx}px,${dy}px) scale(${startScale}) rotate(0deg)`,opacity:1,offset:0},
        {transform:`translate(${dx * .8}px,${dy * .76 - 38}px) scale(1) rotate(-8deg)`,opacity:1,offset:.2},
        {transform:`translate(${dx * .54}px,${dy * .48 - 76}px) rotate(8deg)`,opacity:1,offset:.46},
        {transform:`translate(${dx * .28}px,${dy * .22 - 52}px) rotate(-6deg)`,opacity:1,offset:.68},
        {transform:`translate(${dx * .1}px,-31px) rotate(5deg)`,opacity:1,offset:.82},
        {transform:'translate(0,-17px) rotate(-4deg)',opacity:1,offset:.91},
        {transform:'translate(0,-7px) rotate(2deg)',opacity:1,offset:.96},
        {transform:'translate(0,0) rotate(0deg)',opacity:1,offset:1}
      ], {
        duration,
        easing: 'cubic-bezier(.22,.72,.18,1)',
        fill: 'both'
      });
      try { await flight.finished; } catch (_) {}
    }

    guide.classList.remove('is-flying');
    guide.classList.add('is-settling');
    window.setTimeout(() => guide.classList.remove('is-settling'), 920);
    flight = null;
  }

  async function launchFromLogo() {
    if (launched || flight) return;
    const owl = getOwl();
    if (!owl) return;

    if (!peeked) peekFromLogo();
    const startRect = owl.getBoundingClientRect();
    const destinationSide = 'right';
    prepareDestination(0, destinationSide);
    side = destinationSide;

    await animateOwlToDestination(startRect, 1700);
    launched = true;
    landedIndex = 0;
    tipIndex = 0;
    showTip(stops[0].tips[0]);
  }

  function getActiveStop() {
    const guideLine = window.innerHeight * .5;
    let bestIndex = landedIndex;
    let bestDistance = Infinity;

    stops.forEach((stop, index) => {
      const section = document.querySelector(stop.selector);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      if (rect.height < 40) return;
      const center = rect.top + rect.height / 2;
      const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
      const containsLine = rect.top <= guideLine && rect.bottom >= guideLine;
      const distance = Math.abs(center - guideLine);
      if (containsLine || (onScreen && distance < bestDistance)) {
        bestIndex = index;
        bestDistance = containsLine ? 0 : distance;
      }
    });

    return bestIndex;
  }

  async function flyAndLand(index) {
    if (!launched || index === landedIndex || index < 0 || flight) return;

    const owl = getOwl();
    if (!owl) return;
    const startRect = owl.getBoundingClientRect();
    const nextSide = side === 'right' ? 'left' : 'right';
    hideTip();
    prepareDestination(index, nextSide);
    side = nextSide;
    tipIndex = 0;

    await animateOwlToDestination(startRect, 1500);
    landedIndex = index;
    showTip(stops[index].tips[0]);
  }

  function settleAfterScroll() {
    if (!launched) return;
    const active = getActiveStop();
    if (active !== landedIndex) flyAndLand(active);
  }

  function onScroll() {
    if (!launched && Math.abs(window.scrollY - initialScrollY) > 6) {
      launchFromLogo();
      return;
    }

    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(settleAfterScroll, 180);
  }

  function start() {
    buildGuide();
    placeAtLogo();
    window.setTimeout(peekFromLogo, 520);

    if (window.scrollY > 24) {
      window.setTimeout(launchFromLogo, 700);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      window.clearTimeout(scrollTimer);
      if (!launched) {
        placeAtLogo();
      } else {
        getGuide().style.setProperty('--annie-top', `${getStopTop(stops[landedIndex])}vh`);
      }
      scrollTimer = window.setTimeout(settleAfterScroll, 140);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
