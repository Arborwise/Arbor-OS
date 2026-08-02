(() => {
  'use strict';

  const stops = [
    {
      selector: '#concerns',
      top: 34,
      mobileTop: 31,
      tips: [
        'One close-up can fool you. Send the whole tree, the concern, and the trunk base.',
        'Leaves tell part of the story. The trunk, roots, and recent changes tell the rest.',
        'A photo helps us start. A full-site look helps us answer.'
      ]
    },
    {
      selector: '#services',
      top: 48,
      mobileTop: 42,
      tips: [
        'Good pruning has a reason. Every cut should solve a specific problem.',
        'The best tree work protects both the tree and the property around it.',
        'No topping. No random cuts. Every action should have a purpose.'
      ]
    },
    {
      selector: '#way',
      top: 28,
      mobileTop: 27,
      tips: [
        'The right answer is sometimes “not yet.” Honest tree care includes knowing what can wait.',
        'A recommendation should make sense before a saw ever starts.',
        'Good work begins with looking at the whole tree and the whole site.'
      ]
    },
    {
      selector: '#areas',
      top: 44,
      mobileTop: 39,
      tips: [
        'Local accountability matters. We work where our name has to keep meaning something.',
        'Membership is not decoration. It means showing up for the communities we serve.',
        'Arborwise is rooted here, and our reputation has to live here too.'
      ]
    },
    {
      selector: '#estimate',
      top: 31,
      mobileTop: 29,
      tips: [
        'Photos help, but the site tells the whole story. Let’s look before we guess.',
        'Tell us what changed, when it changed, and what worries you most.',
        'A clear estimate starts with a real conversation, not pressure.'
      ]
    }
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = -1;
  let landedIndex = -1;
  let side = 'right';
  let scrollTimer = 0;
  let bubbleTimer = 0;
  let flight = null;
  let tipIndex = 0;

  function installStyles() {
    document.getElementById('arborwise-annie-scroll-flight-v19')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v19';
    style.textContent = `
      .aw-annie-scroll{
        --annie-top:34vh;
        position:fixed;
        z-index:80;
        top:var(--annie-top);
        bottom:auto;
        width:118px;
        pointer-events:none;
        opacity:0;
        visibility:hidden;
        transition:opacity .2s ease;
        contain:layout style;
      }
      .aw-annie-scroll.is-visible{
        opacity:1;
        visibility:visible;
      }
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
        font-weight:750;
        line-height:1.4;
        opacity:0;
        transform:translateY(8px) scale(.96);
        transition:opacity .2s ease,transform .2s ease;
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
        width:118px;
        height:138px;
        display:flex;
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
      .aw-annie-scroll__perch img{
        position:relative;
        z-index:2;
        display:block;
        width:108px;
        height:108px;
        object-fit:contain;
        transform-origin:50% 78%;
        user-select:none;
        -webkit-user-drag:none;
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
      .aw-annie-scroll.is-flying .aw-annie-scroll__bubble{
        opacity:0;
        transform:translateY(10px) scale(.94);
      }
      .aw-annie-scroll.is-flying .aw-annie-scroll__branch{opacity:0}
      .aw-annie-scroll.is-flying .aw-annie-scroll__perch img{
        animation:aw-annie-wingbeat .15s ease-in-out infinite alternate;
      }
      .aw-annie-scroll.is-scrolling:not(.is-flying) .aw-annie-scroll__perch img{
        animation:aw-annie-ready .42s ease-in-out infinite alternate;
      }
      .aw-annie-scroll.is-settling .aw-annie-scroll__perch img{
        animation:aw-annie-settle .72s ease-out both;
      }
      .aw-annie-scroll.is-tapped .aw-annie-scroll__perch img{
        animation:aw-annie-tap .46s ease-out both;
      }
      @keyframes aw-annie-wingbeat{
        from{transform:translateY(1px) rotate(-5deg) scaleX(.95)}
        to{transform:translateY(-8px) rotate(5deg) scaleX(1.05)}
      }
      @keyframes aw-annie-ready{
        from{transform:translateY(0) rotate(-1deg)}
        to{transform:translateY(-4px) rotate(1deg)}
      }
      @keyframes aw-annie-settle{
        0%{transform:translateY(-16px) rotate(-3deg)}
        35%{transform:translateY(-8px) rotate(3deg)}
        68%{transform:translateY(-3px) rotate(-2deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @keyframes aw-annie-tap{
        0%{transform:translateY(0) rotate(0)}
        38%{transform:translateY(-7px) rotate(-3deg)}
        72%{transform:translateY(-2px) rotate(2deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @media(max-width:700px){
        .aw-annie-scroll{
          top:var(--annie-top);
          bottom:auto;
          width:92px;
        }
        .aw-annie-scroll.is-left{left:8px}
        .aw-annie-scroll.is-right{right:8px}
        .aw-annie-scroll__perch{width:92px;height:108px}
        .aw-annie-scroll__perch img{width:84px;height:84px}
        .aw-annie-scroll__branch{left:5px;right:1px;bottom:10px;height:8px}
        .aw-annie-scroll__bubble{
          width:min(224px,calc(100vw - 22px));
          padding:12px 13px;
          font-size:.82rem;
          bottom:calc(100% + 10px);
        }
        .aw-annie-scroll.is-left .aw-annie-scroll__bubble{left:0}
        .aw-annie-scroll.is-right .aw-annie-scroll__bubble{right:0}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-annie-scroll,
        .aw-annie-scroll__bubble{transition:none!important}
        .aw-annie-scroll__perch img{animation:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function buildGuide() {
    installStyles();
    const guide = document.createElement('aside');
    guide.className = 'aw-annie-scroll is-right';
    guide.id = 'awAnnieScrollGuide';
    guide.setAttribute('aria-label', 'Annie tree-care guide');
    guide.innerHTML = `
      <div class="aw-annie-scroll__bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-scroll__perch" type="button" aria-label="Hear another Annie tree-care tip">
        <img src="assets/annie.webp" alt="Annie, the Arborwise owl mascot">
        <span class="aw-annie-scroll__branch" aria-hidden="true"></span>
      </button>`;
    document.body.appendChild(guide);
    guide.querySelector('.aw-annie-scroll__perch')?.addEventListener('click', () => {
      if (landedIndex < 0) return;
      const currentTips = stops[landedIndex].tips;
      tipIndex = (tipIndex + 1) % currentTips.length;
      guide.classList.remove('is-tapped');
      void guide.offsetWidth;
      guide.classList.add('is-tapped');
      window.setTimeout(() => guide.classList.remove('is-tapped'), 500);
      showTip(currentTips[tipIndex], true);
    });
    return guide;
  }

  function getGuide() {
    return document.getElementById('awAnnieScrollGuide') || buildGuide();
  }

  function getActiveStop() {
    const guideLine = window.innerHeight * .54;
    let bestIndex = -1;
    let bestDistance = Infinity;

    stops.forEach((stop, index) => {
      const section = document.querySelector(stop.selector);
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const onScreen = rect.bottom > 0 && rect.top < window.innerHeight;
      const containsLine = rect.top <= guideLine && rect.bottom >= guideLine;
      const distance = Math.abs(sectionCenter - guideLine);
      if (containsLine || (onScreen && distance < bestDistance)) {
        if (containsLine || bestIndex < 0 || distance < bestDistance) {
          bestIndex = index;
          bestDistance = containsLine ? 0 : distance;
        }
      }
    });

    return bestIndex;
  }

  function getStopTop(stop) {
    return window.innerWidth <= 700 ? stop.mobileTop : stop.top;
  }

  function showTip(text, keepOpen = false) {
    const guide = getGuide();
    const bubble = guide.querySelector('.aw-annie-scroll__bubble');
    if (!bubble) return;
    bubble.textContent = text;
    guide.classList.add('has-tip');
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(() => guide.classList.remove('has-tip'), keepOpen ? 8500 : 6500);
  }

  async function flyAndLand(index) {
    if (index < 0 || index === landedIndex || flight) return;
    const guide = getGuide();
    const nextSide = side === 'right' ? 'left' : 'right';
    const stop = stops[index];

    guide.classList.add('is-visible');
    guide.classList.remove('has-tip', 'is-settling');

    const startRect = guide.getBoundingClientRect();
    guide.classList.remove(`is-${side}`);
    guide.classList.add(`is-${nextSide}`);
    guide.style.setProperty('--annie-top', `${getStopTop(stop)}vh`);
    const endRect = guide.getBoundingClientRect();
    const dx = startRect.left - endRect.left;
    const dy = startRect.top - endRect.top;
    side = nextSide;
    tipIndex = 0;

    if (reducedMotion.matches || !guide.animate) {
      landedIndex = index;
      showTip(stop.tips[0]);
      return;
    }

    guide.classList.add('is-flying');
    flight = guide.animate([
      { transform: `translate(${dx}px,${dy}px) rotate(0deg)`, offset: 0 },
      { transform: `translate(${dx * .80}px,${dy * .80 - 42}px) rotate(-8deg)`, offset: .22 },
      { transform: `translate(${dx * .48}px,${dy * .48 - 76}px) rotate(7deg)`, offset: .50 },
      { transform: `translate(${dx * .20}px,${dy * .20 - 52}px) rotate(-5deg)`, offset: .72 },
      { transform: `translate(${dx * .08}px,-30px) rotate(4deg)`, offset: .84 },
      { transform: `translate(${dx * .03}px,-16px) rotate(-3deg)`, offset: .92 },
      { transform: `translate(${dx * .01}px,-6px) rotate(2deg)`, offset: .97 },
      { transform: 'translate(0,0) rotate(0deg)', offset: 1 }
    ], {
      duration: 1380,
      easing: 'cubic-bezier(.23,.72,.18,1)',
      fill: 'both'
    });

    try {
      await flight.finished;
    } catch (_) {
      // A newer flight or navigation can cancel the current animation safely.
    }

    guide.classList.remove('is-flying');
    guide.classList.add('is-settling');
    window.setTimeout(() => guide.classList.remove('is-settling'), 760);
    flight = null;
    landedIndex = index;
    showTip(stop.tips[0]);
  }

  function settleAfterScroll() {
    const guide = getGuide();
    guide.classList.remove('is-scrolling');
    activeIndex = getActiveStop();
    if (activeIndex >= 0) flyAndLand(activeIndex);
  }

  function onScroll() {
    const guide = getGuide();
    if (landedIndex >= 0) guide.classList.add('is-scrolling');
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(settleAfterScroll, 220);
  }

  function start() {
    if (!stops.some(stop => document.querySelector(stop.selector))) return;
    getGuide();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      window.clearTimeout(scrollTimer);
      if (landedIndex >= 0) {
        getGuide().style.setProperty('--annie-top', `${getStopTop(stops[landedIndex])}vh`);
      }
      scrollTimer = window.setTimeout(settleAfterScroll, 140);
    }, { passive: true });
    settleAfterScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
