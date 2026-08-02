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
  let emerged = false;
  let landedIndex = 0;
  let side = 'right';
  let tipIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let flight = null;

  function installStyles() {
    document.getElementById('arborwise-annie-scroll-flight-v20')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v20';
    style.textContent = `
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
        font-weight:750;
        line-height:1.4;
        opacity:0;
        transform:translateY(8px) scale(.96);
        transition:opacity .16s ease,transform .16s ease;
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
      .aw-annie-scroll.is-flying .aw-annie-scroll__bubble{opacity:0;transform:translateY(10px) scale(.94)}
      .aw-annie-scroll.is-flying .aw-annie-scroll__branch,
      .aw-annie-scroll.is-emerging .aw-annie-scroll__branch{opacity:0}
      .aw-annie-scroll.is-flying .aw-annie-scroll__perch img,
      .aw-annie-scroll.is-emerging .aw-annie-scroll__perch img{
        animation:aw-annie-wingbeat .15s ease-in-out infinite alternate;
      }
      .aw-annie-scroll.is-settling .aw-annie-scroll__perch img{
        animation:aw-annie-settle .78s ease-out both;
      }
      .aw-annie-scroll.is-tapped .aw-annie-scroll__perch img{
        animation:aw-annie-tap .42s ease-out both;
      }
      .aw-annie-source-departing{animation:aw-annie-source-pulse 1.1s ease-in-out both}
      @keyframes aw-annie-wingbeat{
        from{transform:translateY(2px) rotate(-5deg) scaleX(.95)}
        to{transform:translateY(-8px) rotate(5deg) scaleX(1.05)}
      }
      @keyframes aw-annie-settle{
        0%{transform:translateY(-24px) rotate(-4deg)}
        28%{transform:translateY(-15px) rotate(4deg)}
        54%{transform:translateY(-8px) rotate(-3deg)}
        76%{transform:translateY(-3px) rotate(2deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @keyframes aw-annie-tap{
        0%{transform:translateY(0) rotate(0)}
        45%{transform:translateY(-6px) rotate(-3deg)}
        100%{transform:translateY(0) rotate(0)}
      }
      @keyframes aw-annie-source-pulse{
        0%,100%{opacity:1;transform:scale(1)}
        48%{opacity:.28;transform:scale(.93)}
      }
      @media(max-width:700px){
        .aw-annie-scroll{width:92px;top:var(--annie-top)}
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
      }
      @media(prefers-reduced-motion:reduce){
        .aw-annie-scroll__bubble{transition:none!important}
        .aw-annie-scroll__perch img,
        .aw-annie-source-departing{animation:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function getStopTop(stop) {
    return window.innerWidth <= 700 ? stop.mobileTop : stop.top;
  }

  function buildGuide() {
    installStyles();
    const oldGuide = document.getElementById('awAnnieScrollGuide');
    oldGuide?.remove();

    const guide = document.createElement('aside');
    guide.className = 'aw-annie-scroll is-right';
    guide.id = 'awAnnieScrollGuide';
    guide.setAttribute('aria-label', 'Annie tree-care guide');
    guide.innerHTML = `
      <div class="aw-annie-scroll__bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-scroll__perch" type="button" aria-label="Toggle Annie's tree-care tip">
        <img src="assets/annie.webp" alt="Annie, the Arborwise owl mascot">
        <span class="aw-annie-scroll__branch" aria-hidden="true"></span>
      </button>`;

    document.body.appendChild(guide);
    guide.querySelector('.aw-annie-scroll__perch')?.addEventListener('click', () => {
      if (!emerged || flight) return;

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

  async function emergeFromOriginal() {
    if (emerged || flight) return;

    const source = document.querySelector('.annie-callout [data-annie], .annie-callout img');
    const guide = getGuide();
    const stop = stops[0];
    guide.style.setProperty('--annie-top', `${getStopTop(stop)}vh`);
    guide.classList.add('is-visible', 'is-emerging');

    const endRect = guide.getBoundingClientRect();
    const sourceRect = source?.getBoundingClientRect();
    const dx = sourceRect ? sourceRect.left + sourceRect.width / 2 - (endRect.left + endRect.width / 2) : 0;
    const dy = sourceRect ? sourceRect.top + sourceRect.height / 2 - (endRect.top + endRect.height / 2) : 120;
    const scale = sourceRect ? Math.max(.75, Math.min(1.35, sourceRect.width / endRect.width)) : .85;

    source?.classList.add('aw-annie-source-departing');

    if (!reducedMotion.matches && guide.animate) {
      flight = guide.animate([
        {transform:`translate(${dx}px,${dy}px) scale(${scale}) rotate(0deg)`,opacity:.15,offset:0},
        {transform:`translate(${dx * .78}px,${dy * .72 - 30}px) scale(1) rotate(-7deg)`,opacity:1,offset:.25},
        {transform:`translate(${dx * .44}px,${dy * .38 - 70}px) rotate(7deg)`,opacity:1,offset:.55},
        {transform:`translate(${dx * .12}px,-36px) rotate(-4deg)`,opacity:1,offset:.8},
        {transform:'translate(0,-16px) rotate(3deg)',opacity:1,offset:.93},
        {transform:'translate(0,0) rotate(0deg)',opacity:1,offset:1}
      ], {
        duration: 1550,
        easing: 'cubic-bezier(.22,.74,.18,1)',
        fill: 'both'
      });
      try { await flight.finished; } catch (_) {}
    }

    source?.classList.remove('aw-annie-source-departing');
    guide.classList.remove('is-emerging');
    guide.classList.add('is-settling');
    window.setTimeout(() => guide.classList.remove('is-settling'), 800);
    flight = null;
    emerged = true;
    landedIndex = 0;
    tipIndex = 0;
    showTip(stop.tips[0]);
  }

  async function flyAndLand(index) {
    if (!emerged || index === landedIndex || index < 0 || flight) return;

    const guide = getGuide();
    const nextSide = side === 'right' ? 'left' : 'right';
    const stop = stops[index];
    hideTip();

    const startRect = guide.getBoundingClientRect();
    guide.classList.remove(`is-${side}`, 'is-settling');
    guide.classList.add(`is-${nextSide}`, 'is-flying');
    guide.style.setProperty('--annie-top', `${getStopTop(stop)}vh`);
    const endRect = guide.getBoundingClientRect();
    const dx = startRect.left - endRect.left;
    const dy = startRect.top - endRect.top;
    side = nextSide;
    tipIndex = 0;

    if (!reducedMotion.matches && guide.animate) {
      flight = guide.animate([
        {transform:`translate(${dx}px,${dy}px) rotate(0deg)`,offset:0},
        {transform:`translate(${dx * .78}px,${dy * .76 - 38}px) rotate(-8deg)`,offset:.22},
        {transform:`translate(${dx * .46}px,${dy * .42 - 72}px) rotate(7deg)`,offset:.5},
        {transform:`translate(${dx * .18}px,${dy * .16 - 48}px) rotate(-5deg)`,offset:.72},
        {transform:`translate(${dx * .06}px,-28px) rotate(4deg)`,offset:.84},
        {transform:'translate(0,-16px) rotate(-3deg)',offset:.91},
        {transform:'translate(0,-7px) rotate(2deg)',offset:.96},
        {transform:'translate(0,0) rotate(0deg)',offset:1}
      ], {
        duration: 1450,
        easing: 'cubic-bezier(.23,.72,.18,1)',
        fill: 'both'
      });
      try { await flight.finished; } catch (_) {}
    }

    guide.classList.remove('is-flying');
    guide.classList.add('is-settling');
    window.setTimeout(() => guide.classList.remove('is-settling'), 800);
    flight = null;
    landedIndex = index;
    showTip(stop.tips[0]);
  }

  function settleAfterScroll() {
    if (!emerged) return;
    const active = getActiveStop();
    if (active !== landedIndex) flyAndLand(active);
  }

  function onScroll() {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(settleAfterScroll, 180);
  }

  function watchOriginalAnnie() {
    const source = document.querySelector('.annie-callout [data-annie], .annie-callout img');
    if (!source) {
      window.setTimeout(emergeFromOriginal, 700);
      return;
    }

    const tryStart = () => {
      const rect = source.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight * .92) {
        emergeFromOriginal();
        return true;
      }
      return false;
    };

    if (tryStart()) return;

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        emergeFromOriginal();
      }
    }, { threshold: .18, rootMargin: '10% 0px 10% 0px' });
    observer.observe(source);
  }

  function start() {
    if (!document.querySelector('.annie-callout')) return;
    buildGuide();
    watchOriginalAnnie();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', () => {
      window.clearTimeout(scrollTimer);
      if (emerged) {
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
