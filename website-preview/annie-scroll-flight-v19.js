(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const MESSAGE_MS = 4600;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const stops = [
    {
      selector: '.intro-section', top: 26, mobileTop: 22,
      lines: [
        'No pressure and no mystery—just an honest answer with a reason behind it.',
        'The right tree company should lower your blood pressure, not raise it.',
        'Sometimes the smartest recommendation is to leave the tree alone for now.'
      ]
    },
    {
      selector: '#concerns', top: 34, mobileTop: 27,
      lines: [
        'Three pictures beat one panic: the whole tree, the problem, and the trunk base.',
        'Trees usually whisper before they shout. New changes are worth noticing.',
        'A crack, lean, cavity, or sudden leaf change deserves a closer look—not a wild guess.'
      ]
    },
    {
      selector: '#services', top: 42, mobileTop: 33,
      lines: [
        'Good pruning has a reason. Random cuts are just a bad haircut with a chainsaw.',
        'Every cut should solve a problem, and every removal should have a plan.',
        'The best tree work protects the tree, the property, and the people underneath both.'
      ]
    },
    {
      selector: '#planting', top: 37, mobileTop: 30,
      lines: [
        'Planting too deep is like burying a tree’s ankles. Roots need air, too.',
        'The right tree in the wrong place becomes tomorrow’s expensive lesson.',
        'A young tree needs correct depth, visible root flare, mulch, and a real watering plan.'
      ]
    },
    {
      selector: '#way', top: 30, mobileTop: 26,
      lines: [
        'The right answer is sometimes “not yet.” Trees appreciate patience—and so does your wallet.',
        'A recommendation should make sense before a saw ever starts.',
        'We would rather explain the reason than pressure you into the work.'
      ]
    },
    {
      selector: '#areas', top: 41, mobileTop: 32,
      lines: [
        'We work where our name has to keep meaning something. Local roots keep us accountable.',
        'Local roots are not just for trees. Arborwise is part of these communities, too.',
        'A good reputation grows slowly. We plan to keep nurturing ours.'
      ]
    },
    {
      selector: '#estimate', top: 30, mobileTop: 26,
      lines: [
        'Tell us what changed and what worries you most. We’ll look before we guess.',
        'Photos help, but the property tells the full story.',
        'A clear estimate should answer questions, not create new ones.'
      ]
    }
  ];

  let launched = false;
  let launching = false;
  let landedIndex = 0;
  let side = 'right';
  let lineIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let flightAnimation = null;
  let pendingIndex = null;
  let lastScrollY = window.scrollY;

  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function installStyles() {
    document.querySelectorAll('[id^="arborwise-annie-scroll-flight-"]').forEach(node => node.remove());
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v26';
    style.textContent = `
      ${SOURCE_SELECTOR}{transform-origin:50% 55%;transition:opacity .24s ease,filter .24s ease,transform .24s ease}
      ${SOURCE_SELECTOR}.aw-annie-awakening{animation:aw-annie-awaken .88s ease-in-out both}
      ${SOURCE_SELECTOR}.aw-annie-departed{opacity:0!important;filter:none!important;transform:scale(.96)!important}

      .aw-annie-scroll{--annie-top:24vh;position:fixed;z-index:80;top:var(--annie-top);bottom:auto;width:118px;height:138px;pointer-events:none;opacity:0;visibility:hidden;contain:layout style}
      .aw-annie-scroll.is-visible{opacity:1;visibility:visible}
      .aw-annie-scroll.is-left{left:14px;right:auto}
      .aw-annie-scroll.is-right{right:14px;left:auto}

      .aw-annie-scroll__bubble{position:absolute;z-index:12;bottom:calc(100% + 8px);width:min(300px,calc(100vw - 30px));padding:13px 15px;border:2px solid #c9972f;border-radius:18px;background:#fffdf6;color:#173f2e;box-shadow:0 14px 34px rgba(0,0,0,.20);font-size:.91rem;font-weight:800;line-height:1.38;opacity:0;transform:translateY(8px) scale(.96);transition:opacity .15s ease,transform .15s ease}
      .aw-annie-scroll.is-left .aw-annie-scroll__bubble{left:0}
      .aw-annie-scroll.is-right .aw-annie-scroll__bubble{right:0}
      .aw-annie-scroll__bubble::after{content:'';position:absolute;bottom:-10px;width:17px;height:17px;background:#fffdf6;border-right:2px solid #c9972f;border-bottom:2px solid #c9972f;transform:rotate(45deg)}
      .aw-annie-scroll.is-left .aw-annie-scroll__bubble::after{left:42px}
      .aw-annie-scroll.is-right .aw-annie-scroll__bubble::after{right:42px}
      .aw-annie-scroll.has-tip .aw-annie-scroll__bubble{opacity:1;transform:translateY(0) scale(1)}

      .aw-annie-scroll__perch{position:relative;display:block;width:118px;height:138px;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;appearance:none!important;-webkit-appearance:none!important;-webkit-tap-highlight-color:transparent!important;pointer-events:auto;cursor:pointer;touch-action:manipulation}
      .aw-annie-scroll__perch:focus{outline:none!important}
      .aw-annie-scroll__perch:focus-visible{outline:3px solid #d8f277!important;outline-offset:3px!important}

      .aw-annie-character{position:absolute;z-index:5;left:50%;top:2px;width:108px;height:112px;transform:translateX(-50%);transform-origin:50% 70%;filter:drop-shadow(0 7px 6px rgba(0,0,0,.24));will-change:transform,opacity}
      .aw-annie-body-crop{position:absolute;z-index:3;left:50%;top:0;width:102px;height:76px;transform:translateX(-50%);overflow:hidden;pointer-events:none}
      .aw-annie-scroll__owl{display:block;width:102px;height:102px;object-fit:contain;object-position:center top;transform:scale(1.05) translateY(-1px);transform-origin:50% 8%;user-select:none;-webkit-user-drag:none}

      .aw-annie-wing{position:absolute;z-index:4;top:40px;width:30px;height:42px;border:2px solid rgba(91,49,25,.54);background:radial-gradient(ellipse at 58% 22%,rgba(245,205,125,.34) 0 10%,transparent 11%),repeating-linear-gradient(155deg,rgba(255,255,255,.10) 0 3px,transparent 3px 9px),linear-gradient(145deg,#a86732 0%,#7c431f 58%,#5a2f18 100%);box-shadow:0 2px 0 rgba(255,255,255,.14) inset;opacity:.98}
      .aw-annie-wing.left{left:1px;border-radius:72% 34% 76% 36%;transform-origin:100% 20%;transform:rotate(22deg)}
      .aw-annie-wing.right{right:1px;border-radius:34% 72% 36% 76%;transform-origin:0 20%;transform:rotate(-22deg)}

      .aw-annie-foot{position:absolute;z-index:7;top:73px;width:20px;height:15px;border-radius:50%;background:#e5a62b;border:2px solid #9a5b12;box-shadow:0 2px 0 rgba(255,255,255,.24) inset}
      .aw-annie-foot.left{left:31px;transform:rotate(6deg)}
      .aw-annie-foot.right{right:31px;transform:rotate(-6deg)}
      .aw-annie-foot::before,.aw-annie-foot::after{content:'';position:absolute;bottom:-6px;width:3px;height:10px;border-radius:999px;background:#d89016;border:1px solid #8e510d;transform-origin:50% 0}
      .aw-annie-foot::before{left:4px;transform:rotate(23deg)}
      .aw-annie-foot::after{right:4px;transform:rotate(-23deg)}

      .aw-annie-wink{position:absolute;z-index:9;left:30px;top:29px;width:23px;height:13px;border-radius:50% 50% 45% 45%;background:linear-gradient(180deg,#b56d34 0%,#7b3f1f 100%);border-bottom:2px solid #4b2616;opacity:0;transform:scaleY(.12);transform-origin:50% 100%;pointer-events:none}
      .aw-annie-scroll.is-winking .aw-annie-wink{animation:aw-annie-wink .72s ease-in-out both}

      .aw-annie-scroll__branch{position:absolute;z-index:2;left:0;right:0;bottom:9px;height:12px;border-radius:64% 28% 62% 34%;background:linear-gradient(180deg,#91613a 0%,#66401f 56%,#452915 100%);box-shadow:0 2px 0 rgba(255,255,255,.18) inset,0 5px 8px rgba(0,0,0,.18);opacity:0;transform:translateY(7px) scale(.90) rotate(-2deg);transition:opacity .20s ease,transform .22s ease}
      .aw-annie-scroll__branch::before{content:'';position:absolute;right:4px;top:-3px;width:40px;height:7px;border-radius:999px;background:#65401f;transform:rotate(-24deg);transform-origin:0 50%}
      .aw-annie-scroll.branch-ready .aw-annie-scroll__branch{opacity:1;transform:translateY(0) scale(1) rotate(-2deg)}
      .aw-oak-leaf{position:absolute;display:block;width:20px;height:15px;border-radius:70% 0 70% 0;background:linear-gradient(135deg,#6aa747 0%,#2f743e 70%,#20572e 100%);box-shadow:0 1px 0 rgba(255,255,255,.20) inset}
      .aw-oak-leaf.one{right:1px;top:-20px;transform:rotate(27deg)}
      .aw-oak-leaf.two{right:22px;top:-15px;transform:rotate(-15deg) scale(.90)}
      .aw-oak-leaf.three{left:5px;top:-16px;transform:rotate(-38deg) scale(.84)}
      .aw-oak-leaf.four{left:25px;top:-20px;transform:rotate(20deg) scale(.74)}

      .aw-annie-scroll.is-flying .aw-annie-wing.left{animation:aw-left-wing .18s ease-in-out infinite alternate}
      .aw-annie-scroll.is-flying .aw-annie-wing.right{animation:aw-right-wing .18s ease-in-out infinite alternate}
      .aw-annie-scroll.is-flying .aw-annie-foot.left{animation:aw-left-foot .32s ease-in-out infinite alternate}
      .aw-annie-scroll.is-flying .aw-annie-foot.right{animation:aw-right-foot .32s ease-in-out infinite alternate}
      .aw-annie-scroll.is-settling .aw-annie-character{animation:aw-gentle-land .78s ease-out both}
      .aw-annie-scroll.is-tapped .aw-annie-character{animation:aw-annie-tap .42s ease-out both}

      @keyframes aw-annie-awaken{0%{filter:none;transform:scale(1) rotate(0)}28%{filter:drop-shadow(0 0 12px rgba(216,242,119,.74));transform:scale(1.018) rotate(-1.5deg)}58%{filter:drop-shadow(0 0 18px rgba(216,242,119,.90));transform:scale(1.028) rotate(1.5deg)}76%{transform:scale(1.012,.94) rotate(0)}100%{filter:none;transform:scale(1) rotate(0)}}
      @keyframes aw-left-wing{from{transform:rotate(28deg) translateY(2px) scaleY(.90)}to{transform:rotate(-58deg) translateY(-7px) scaleY(1.06)}}
      @keyframes aw-right-wing{from{transform:rotate(-28deg) translateY(2px) scaleY(.90)}to{transform:rotate(58deg) translateY(-7px) scaleY(1.06)}}
      @keyframes aw-left-foot{from{transform:rotate(6deg) translateY(0)}to{transform:rotate(13deg) translateY(-2px)}}
      @keyframes aw-right-foot{from{transform:rotate(-6deg) translateY(-2px)}to{transform:rotate(-13deg) translateY(0)}}
      @keyframes aw-annie-wink{0%,12%,88%,100%{opacity:0;transform:scaleY(.12)}28%,66%{opacity:1;transform:scaleY(1)}}
      @keyframes aw-gentle-land{0%{transform:translateX(-50%) translateY(-24px) rotate(-5deg)}32%{transform:translateX(-50%) translateY(-13px) rotate(4deg)}60%{transform:translateX(-50%) translateY(-5px) rotate(-3deg)}80%{transform:translateX(-50%) translateY(2px) rotate(1deg)}100%{transform:translateX(-50%) translateY(0) rotate(0)}}
      @keyframes aw-annie-tap{0%{transform:translateX(-50%) translateY(0) rotate(0)}45%{transform:translateX(-50%) translateY(-5px) rotate(-3deg)}100%{transform:translateX(-50%) translateY(0) rotate(0)}}

      @media(max-width:700px){
        .aw-annie-scroll{width:96px;height:118px}.aw-annie-scroll.is-left{left:6px}.aw-annie-scroll.is-right{right:6px}
        .aw-annie-scroll__perch{width:96px;height:118px}.aw-annie-character{width:88px;height:96px;top:1px}
        .aw-annie-body-crop{width:84px;height:62px}.aw-annie-scroll__owl{width:84px;height:84px;transform:scale(1.05) translateY(-1px)}
        .aw-annie-wing{top:33px;width:25px;height:35px}.aw-annie-wing.left{left:0}.aw-annie-wing.right{right:0}
        .aw-annie-foot{top:59px;width:17px;height:13px}.aw-annie-foot.left{left:25px}.aw-annie-foot.right{right:25px}
        .aw-annie-wink{left:24px;top:23px;width:19px;height:11px}
        .aw-annie-scroll__branch{left:0;right:0;bottom:7px;height:10px}
        .aw-oak-leaf{width:17px;height:13px}.aw-oak-leaf.one{right:2px;top:-16px}.aw-oak-leaf.two{right:18px;top:-12px}.aw-oak-leaf.three{left:3px;top:-12px}.aw-oak-leaf.four{left:19px;top:-16px}
        .aw-annie-scroll__bubble{width:min(236px,calc(100vw - 18px));padding:11px 12px;font-size:.82rem;bottom:calc(100% + 7px)}
      }
      @media(prefers-reduced-motion:reduce){.aw-annie-scroll__bubble,.aw-annie-scroll__branch,${SOURCE_SELECTOR}{transition:none!important}.aw-annie-character,.aw-annie-wing,.aw-annie-foot,.aw-annie-wink,${SOURCE_SELECTOR}{animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function getSource(){ return document.querySelector(SOURCE_SELECTOR); }
  function sourceIsVisible(){
    const source = getSource();
    if(!source) return false;
    const rect = source.getBoundingClientRect();
    return rect.bottom > window.innerHeight * .12 && rect.top < window.innerHeight * .82;
  }
  function getStopTop(stop){ return window.innerWidth <= 700 ? stop.mobileTop : stop.top; }

  function buildGuide(){
    document.getElementById('awAnnieScrollGuide')?.remove();
    const guide = document.createElement('aside');
    guide.className = 'aw-annie-scroll is-right';
    guide.id = 'awAnnieScrollGuide';
    guide.setAttribute('aria-label','Annie tree-care guide');
    guide.innerHTML = `
      <div class="aw-annie-scroll__bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-scroll__perch" type="button" aria-label="Toggle Annie's tree-care tip">
        <span class="aw-annie-character" aria-hidden="true">
          <span class="aw-annie-wing left"></span>
          <span class="aw-annie-wing right"></span>
          <span class="aw-annie-body-crop"><img class="aw-annie-scroll__owl" src="assets/annie.webp" alt=""></span>
          <span class="aw-annie-foot left"></span>
          <span class="aw-annie-foot right"></span>
          <span class="aw-annie-wink"></span>
        </span>
        <span class="aw-annie-scroll__branch" aria-hidden="true">
          <i class="aw-oak-leaf one"></i><i class="aw-oak-leaf two"></i><i class="aw-oak-leaf three"></i><i class="aw-oak-leaf four"></i>
        </span>
      </button>`;
    document.body.appendChild(guide);
    guide.querySelector('.aw-annie-scroll__perch')?.addEventListener('click',()=>{
      if(!launched || flightAnimation) return;
      if(guide.classList.contains('has-tip')){ hideTip(); return; }
      const lines = stops[landedIndex]?.lines || stops[0].lines;
      lineIndex = (lineIndex + 1) % lines.length;
      bounceAndWink();
      showTip(lines[lineIndex]);
    });
    return guide;
  }

  function getGuide(){ return document.getElementById('awAnnieScrollGuide') || buildGuide(); }
  function hideTip(){ window.clearTimeout(bubbleTimer); getGuide().classList.remove('has-tip'); }
  function showTip(text){
    const guide = getGuide();
    const bubble = guide.querySelector('.aw-annie-scroll__bubble');
    if(!bubble || !text) return;
    bubble.textContent = text;
    guide.classList.add('has-tip');
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(hideTip, MESSAGE_MS);
  }
  function bounceAndWink(){
    const guide = getGuide();
    guide.classList.remove('is-tapped','is-winking');
    void guide.offsetWidth;
    guide.classList.add('is-tapped','is-winking');
    window.setTimeout(()=>guide.classList.remove('is-tapped'),440);
    window.setTimeout(()=>guide.classList.remove('is-winking'),760);
  }

  function prepareDestination(index,nextSide){
    const guide = getGuide();
    guide.classList.remove('is-left','is-right','is-settling','is-winking');
    guide.classList.add(`is-${nextSide}`,'is-visible','branch-ready');
    guide.style.setProperty('--annie-top',`${getStopTop(stops[index])}vh`);
  }

  function prepareLaunchDestination(sourceRect){
    const guide = getGuide();
    const estimatedHeight = window.innerWidth <= 700 ? 118 : 138;
    const top = clamp(sourceRect.top + sourceRect.height * .48 - estimatedHeight * .48,70,window.innerHeight-estimatedHeight-72);
    guide.classList.remove('is-left','is-right','is-settling','is-winking');
    guide.classList.add('is-right','is-visible','branch-ready');
    guide.style.setProperty('--annie-top',`${Math.round(top)}px`);
  }

  async function animateCharacterFrom(startRect,duration,startScale=1){
    const guide = getGuide();
    const character = guide.querySelector('.aw-annie-character');
    if(!character) return;
    const targetRect = character.getBoundingClientRect();
    const dx = startRect.left + startRect.width/2 - (targetRect.left + targetRect.width/2);
    const dy = startRect.top + startRect.height/2 - (targetRect.top + targetRect.height/2);

    character.getAnimations().forEach(animation=>animation.cancel());
    guide.classList.remove('is-settling','is-winking');
    guide.classList.add('is-flying','branch-ready');

    if(!reducedMotion.matches && character.animate){
      flightAnimation = character.animate([
        {transform:`translateX(-50%) translate(${dx}px,${dy}px) scale(${startScale}) rotate(0deg)`,opacity:.18,offset:0},
        {transform:`translateX(-50%) translate(${dx*.91}px,${dy*.87-18}px) scale(.94) rotate(-7deg)`,opacity:1,offset:.14},
        {transform:`translateX(-50%) translate(${dx*.70}px,${dy*.64-54}px) scale(1) rotate(7deg)`,opacity:1,offset:.37},
        {transform:`translateX(-50%) translate(${dx*.43}px,${dy*.36-72}px) rotate(-6deg)`,opacity:1,offset:.60},
        {transform:`translateX(-50%) translate(${dx*.18}px,${dy*.13-42}px) rotate(5deg)`,opacity:1,offset:.80},
        {transform:'translateX(-50%) translate(0,-17px) rotate(-3deg)',opacity:1,offset:.93},
        {transform:'translateX(-50%) translate(0,0) rotate(0deg)',opacity:1,offset:1}
      ],{duration,easing:'cubic-bezier(.22,.72,.18,1)',fill:'both'});
      try{ await flightAnimation.finished; }catch(_){ }
    }

    guide.classList.remove('is-flying');
    guide.classList.add('is-settling','is-winking','branch-ready');
    window.setTimeout(()=>guide.classList.remove('is-settling'),820);
    window.setTimeout(()=>guide.classList.remove('is-winking'),760);
    flightAnimation = null;
  }

  function screenLine(index){
    const stop = stops[index] || stops[0];
    const section = document.querySelector(stop.selector);
    const text = String(section?.innerText || '').toLowerCase();
    if(/pressure|informed|what can wait/.test(text)) return 'No pressure and no mystery—just an honest answer with a reason behind it.';
    if(/three photos|whole tree|trunk base|what are you seeing/.test(text)) return 'Three pictures beat one panic: the whole tree, the problem, and the trunk base.';
    if(/planting|root flare|watering plan|young tree/.test(text)) return 'Planting too deep is like burying a tree’s ankles. Roots need air, too.';
    if(/pruning|every cut|no topping/.test(text)) return 'Good pruning has a reason. Random cuts are just a bad haircut with a chainsaw.';
    if(/removal|rigging|drop zone|utilities/.test(text)) return 'A safe removal is planned before the first cut. Gravity is not a crew member.';
    if(/not yet|honest|recommendation/.test(text)) return 'The right answer is sometimes “not yet.” Trees appreciate patience—and so does your wallet.';
    if(/local|community|service areas|north texas/.test(text)) return 'We work where our name has to keep meaning something. Local roots keep us accountable.';
    if(/estimate|tell us|photos help/.test(text)) return 'Tell us what changed and what worries you most. We’ll look before we guess.';
    return stop.lines[lineIndex % stop.lines.length];
  }

  async function launchFromAskAnnie(){
    if(launched || launching || flightAnimation || !sourceIsVisible()) return;
    const source = getSource();
    if(!source) return;
    launching = true;
    source.classList.add('aw-annie-awakening');
    await wait(reducedMotion.matches ? 1 : 500);
    const startRect = source.getBoundingClientRect();
    prepareLaunchDestination(startRect);
    source.classList.add('aw-annie-departed');
    await animateCharacterFrom(startRect,reducedMotion.matches ? 1 : 1600,.78);
    source.classList.remove('aw-annie-awakening');
    side = 'right';
    landedIndex = getActiveStop();
    lineIndex = 0;
    launched = true;
    launching = false;
    showTip('Hi, I’m Arborwise Annie. We’re glad you’re here.');
    queuePendingLanding();
  }

  function getActiveStop(){
    const line = window.innerHeight * .52;
    let best = landedIndex;
    let distance = Infinity;
    stops.forEach((stop,index)=>{
      const section = document.querySelector(stop.selector);
      if(!section) return;
      const rect = section.getBoundingClientRect();
      if(rect.height < 40) return;
      const center = rect.top + rect.height/2;
      const visible = rect.bottom > 0 && rect.top < window.innerHeight;
      const contains = rect.top <= line && rect.bottom >= line;
      const nextDistance = Math.abs(center-line);
      if(contains || (visible && nextDistance < distance)){
        best = index;
        distance = contains ? 0 : nextDistance;
      }
    });
    return best;
  }

  async function flyAndLand(index){
    if(!launched || index < 0 || launching) return;
    if(flightAnimation){ pendingIndex = index; return; }
    if(index === landedIndex) return;
    const guide = getGuide();
    const character = guide.querySelector('.aw-annie-character');
    if(!character) return;
    hideTip();
    if(!reducedMotion.matches) await wait(110);
    const startRect = character.getBoundingClientRect();
    const nextSide = side === 'right' ? 'left' : 'right';
    prepareDestination(index,nextSide);
    side = nextSide;
    lineIndex = (lineIndex + 1) % 3;
    await animateCharacterFrom(startRect,reducedMotion.matches ? 1 : 1400,1);
    landedIndex = index;
    showTip(screenLine(index));
    queuePendingLanding();
  }

  function queuePendingLanding(){
    window.setTimeout(()=>{
      const next = pendingIndex;
      pendingIndex = null;
      const active = getActiveStop();
      const target = next !== null && next !== undefined ? next : active;
      if(target !== landedIndex) flyAndLand(target);
    },120);
  }

  function settleAfterScroll(){
    if(!launched || launching) return;
    const active = getActiveStop();
    if(flightAnimation){ pendingIndex = active; return; }
    if(active !== landedIndex) flyAndLand(active);
  }

  function start(){
    installStyles();
    buildGuide();
    window.addEventListener('scroll',()=>{
      const currentScrollY = window.scrollY;
      const movingDown = currentScrollY > lastScrollY + 1;
      lastScrollY = currentScrollY;
      if(!launched && !launching && movingDown && sourceIsVisible()) launchFromAskAnnie();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,150);
    },{passive:true});
    window.addEventListener('keydown',event=>{
      if(!launched && sourceIsVisible() && ['ArrowDown','PageDown',' ','End'].includes(event.key)) launchFromAskAnnie();
    });
    window.addEventListener('resize',()=>{
      hideTip();
      if(launched) getGuide().style.setProperty('--annie-top',`${getStopTop(stops[landedIndex])}vh`);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,140);
    },{passive:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
