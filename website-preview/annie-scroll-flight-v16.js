(() => {
  'use strict';

  const stops = [
    {
      selector: '#concerns',
      tip: 'One close-up can fool you. Send the whole tree, the concern, and the trunk base.'
    },
    {
      selector: '#services',
      tip: 'Good pruning has a reason. Every cut should solve a specific problem.'
    },
    {
      selector: '#way',
      tip: 'The right answer is sometimes “not yet.” Honest tree care includes knowing what can wait.'
    },
    {
      selector: '#areas',
      tip: 'Local accountability matters. We work where our name has to keep meaning something.'
    },
    {
      selector: '#estimate',
      tip: 'Photos help, but the site tells the whole story. Let’s look before we guess.'
    }
  ];

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeIndex = -1;
  let landedIndex = -1;
  let side = 'right';
  let scrollTimer = 0;
  let bubbleTimer = 0;
  let flight = null;

  function installStyles() {
    if (document.getElementById('arborwise-annie-scroll-flight-v16')) return;
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v16';
    style.textContent = `
      .aw-annie-scroll{
        position:fixed;
        z-index:80;
        bottom:28px;
        width:122px;
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
      .aw-annie-scroll.is-left{left:24px;right:auto}
      .aw-annie-scroll.is-right{right:24px;left:auto}
      .aw-annie-scroll__bubble{
        position:absolute;
        bottom:calc(100% + 14px);
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
        width:122px;
        height:142px;
        display:flex;
        align-items:flex-end;
        justify-content:center;
        pointer-events:auto;
        cursor:pointer;
        filter:drop-shadow(0 8px 7px rgba(0,0,0,.24));
      }
      .aw-annie-scroll__perch:focus-visible{
        outline:3px solid #d8f277;
        outline-offset:4px;
        border-radius:18px;
      }
      .aw-annie-scroll__perch img{
        position:relative;
        z-index:2;
        display:block;
        width:112px;
        height:112px;
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
      .aw-annie-scroll.is-flying .aw-annie-scroll__bubble{opacity:0;transform:translateY(10px) scale(.94)}
      .aw-annie-scroll.is-flying .aw-annie-scroll__branch{opacity:0}
      .aw-annie-scroll.is-flying .aw-annie-scroll__perch img{
        animation:aw-annie-wingbeat .16s ease-in-out infinite alternate;
      }
      .aw-annie-scroll.is-scrolling:not(.is-flying) .aw-annie-scroll__perch img{
        animation:aw-annie-ready .42s ease-in-out infinite alternate;
      }
      @keyframes aw-annie-wingbeat{
        from{transform:translateY(1px) rotate(-4deg) scaleX(.96)}
        to{transform:translateY(-7px) rotate(4deg) scaleX(1.04)}
      }
      @keyframes aw-annie-ready{
        from{transform:translateY(0) rotate(-1deg)}
        to{transform:translateY(-4px) rotate(1deg)}
      }
      @media (max-width:700px){
        .aw-annie-scroll{
          bottom:calc(76px + env(safe-area-inset-bottom));
          width:96px;
        }
        .aw-annie-scroll.is-left{left:10px}
        .aw-annie-scroll.is-right{right:10px}
        .aw-annie-scroll__perch{width:96px;height:112px}
        .aw-annie-scroll__perch img{width:88px;height:88px}
        .aw-annie-scroll__branch{left:5px;right:1px;bottom:10px;height:8px}
        .aw-annie-scroll__bubble{
          width:min(224px,calc(100vw - 22px));
          padding:12px 13px;
          font-size:.82rem;
          bottom:calc(100% + 11px);
        }
        .aw-annie-scroll.is-left .aw-annie-scroll__bubble{left:0}
        .aw-annie-scroll.is-right .aw-annie-scroll__bubble{right:0}
      }
      @media (prefers-reduced-motion:reduce){
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
      <button class="aw-annie-scroll__perch" type="button" aria-label="Show Annie's current tree-care tip">
        <img src="assets/annie.webp" alt="Annie, the Arborwise owl mascot">
        <span class="aw-annie-scroll__branch" aria-hidden="true"></span>
      </button>`;
    document.body.appendChild(guide);
    guide.querySelector('.aw-annie-scroll__perch')?.addEventListener('click', () => {
      if (landedIndex < 0) return;
      showTip(stops[landedIndex].tip, true);
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

  function showTip(text, keepOpen = false) {
    const guide = getGuide();
    const bubble = guide.querySelector('.aw-annie-scroll__bubble');
    if (!bubble) return;
    bubble.textContent = text;
    guide.classList.add('has-tip');
    window.clearTimeout(bubbleTimer);
    if (!keepOpen) {
      bubbleTimer = window.setTimeout(() => guide.classList.remove('has-tip'), 6500);
    }
  }

  async function flyAndLand(index) {
    if (index < 0 || index === landedIndex || flight) return;
    const guide = getGuide();
    const nextSide = side === 'right' ? 'left' : 'right';

    guide.classList.add('is-visible');
    guide.classList.remove('has-tip');

    if (reducedMotion.matches || !guide.animate) {
      guide.classList.remove(`is-${side}`);
      guide.classList.add(`is-${nextSide}`);
      side = nextSide;
      landedIndex = index;
      showTip(stops[index].tip);
      return;
    }

    const startRect = guide.getBoundingClientRect();
    guide.classList.remove(`is-${side}`);
    guide.classList.add(`is-${nextSide}`);
    const endRect = guide.getBoundingClientRect();
    const dx = startRect.left - endRect.left;
    side = nextSide;
    guide.classList.add('is-flying');

    flight = guide.animate([
      { transform: `translate(${dx}px,0) rotate(0deg)`, offset: 0 },
      { transform: `translate(${dx * .78}px,-38px) rotate(-8deg)`, offset: .24 },
      { transform: `translate(${dx * .48}px,-72px) rotate(7deg)`, offset: .52 },
      { transform: `translate(${dx * .18}px,-34px) rotate(-4deg)`, offset: .80 },
      { transform: 'translate(0,0) rotate(0deg)', offset: 1 }
    ], {
      duration: 940,
      easing: 'cubic-bezier(.25,.72,.2,1)',
      fill: 'both'
    });

    try {
      await flight.finished;
    } catch (_) {
      // A newer flight or navigation can cancel the current animation safely.
    }

    guide.classList.remove('is-flying');
    flight = null;
    landedIndex = index;
    showTip(stops[index].tip);
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
    scrollTimer = window.setTimeout(settleAfterScroll, 180);
  }

  function start() {
    if (!stops.some(stop => document.querySelector(stop.selector))) return;
    getGuide();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll, 120);
    }, { passive: true });
    settleAfterScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
