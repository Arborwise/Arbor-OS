(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const MESSAGE_MS = 4800;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const stops = [
    {selector:'.intro-section', side:'right', anchor:.70, lines:[
      'No pressure and no mystery—just an honest answer with a reason behind it.',
      'The right tree company should lower your blood pressure, not raise it.',
      'Sometimes the smartest recommendation is to leave the tree alone for now.'
    ]},
    {selector:'#concerns', side:'left', anchor:.72, lines:[
      'Three pictures beat one panic: the whole tree, the problem, and the trunk base.',
      'Trees usually whisper before they shout. New changes are worth noticing.',
      'A crack, lean, cavity, or sudden leaf change deserves a closer look—not a wild guess.'
    ]},
    {selector:'#services', side:'right', anchor:.72, lines:[
      'Good pruning has a reason. Random cuts are just a bad haircut with a chainsaw.',
      'Every cut should solve a problem, and every removal should have a plan.',
      'The best tree work protects the tree, the property, and the people underneath both.'
    ]},
    {selector:'#planting', side:'left', anchor:.70, lines:[
      'Planting too deep is like burying a tree’s ankles. Roots need air, too.',
      'The right tree in the wrong place becomes tomorrow’s expensive lesson.',
      'A young tree needs correct depth, visible root flare, mulch, and a real watering plan.'
    ]},
    {selector:'#way', side:'right', anchor:.72, lines:[
      'The right answer is sometimes “not yet.” Trees appreciate patience—and so does your wallet.',
      'A recommendation should make sense before a saw ever starts.',
      'We would rather explain the reason than pressure you into the work.'
    ]},
    {selector:'#areas', side:'left', anchor:.72, lines:[
      'We work where our name has to keep meaning something. Local roots keep us accountable.',
      'Local roots are not just for trees. Arborwise is part of these communities, too.',
      'A good reputation grows slowly. We plan to keep nurturing ours.'
    ]},
    {selector:'#estimate', side:'right', anchor:.68, lines:[
      'Tell us what changed and what worries you most. We’ll look before we guess.',
      'Photos help, but the property tells the full story.',
      'A clear estimate should answer questions, not create new ones.'
    ]}
  ];

  let launched = false;
  let launching = false;
  let landedIndex = -1;
  let lineIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let flightAnimation = null;
  let pendingIndex = null;
  let lastScrollY = window.scrollY;

  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  function installStyles(){
    document.querySelectorAll('[id^="arborwise-annie-scroll-flight-"]').forEach(node => node.remove());
    const style = document.createElement('style');
    style.id = 'arborwise-annie-scroll-flight-v27';
    style.textContent = `
      ${SOURCE_SELECTOR}{transform-origin:50% 55%;transition:filter .25s ease,transform .25s ease}
      ${SOURCE_SELECTOR}.aw-annie-awakening{animation:aw-portrait-awaken 1.05s ease-in-out both}

      #awAnnieBranchLayer{position:absolute;z-index:26;inset:0 0 auto 0;width:100%;height:0;pointer-events:none;overflow:visible}
      .aw-site-oak-branch{position:absolute;width:154px;height:48px;filter:drop-shadow(0 7px 8px rgba(0,0,0,.18));transform-origin:50% 70%}
      .aw-site-oak-branch__wood{position:absolute;left:2px;right:2px;bottom:10px;height:14px;border-radius:65% 28% 62% 34%;background:linear-gradient(180deg,#9d6a3c 0%,#6c431f 56%,#482a14 100%);box-shadow:0 2px 0 rgba(255,255,255,.18) inset}
      .aw-site-oak-branch__wood::before{content:'';position:absolute;right:5px;top:-4px;width:54px;height:8px;border-radius:999px;background:#68401e;transform:rotate(-25deg);transform-origin:0 50%}
      .aw-site-oak-branch__leaf{position:absolute;width:24px;height:18px;border-radius:72% 0 72% 0;background:linear-gradient(135deg,#75ae4d 0%,#347844 68%,#205b32 100%);box-shadow:0 1px 0 rgba(255,255,255,.22) inset;transform-origin:100% 100%}
      .aw-site-oak-branch__leaf.one{right:3px;top:2px;transform:rotate(26deg)}
      .aw-site-oak-branch__leaf.two{right:30px;top:9px;transform:rotate(-15deg) scale(.92)}
      .aw-site-oak-branch__leaf.three{left:8px;top:8px;transform:rotate(-38deg) scale(.88)}
      .aw-site-oak-branch__leaf.four{left:35px;top:1px;transform:rotate(18deg) scale(.78)}
      .aw-site-oak-branch.is-landed{animation:aw-branch-settle .60s ease-out both}
      .aw-site-oak-branch.is-landed .aw-site-oak-branch__leaf{animation:aw-leaf-rustle .65s ease-out both}

      .aw-annie-scroll{position:fixed;z-index:82;left:0;top:0;width:112px;height:122px;pointer-events:none;opacity:0;visibility:hidden;contain:layout style}
      .aw-annie-scroll.is-visible{opacity:1;visibility:visible}
      .aw-annie-scroll.is-left .aw-annie-scroll__bubble{left:0;right:auto}
      .aw-annie-scroll.is-right .aw-annie-scroll__bubble{right:0;left:auto}
      .aw-annie-scroll__bubble{position:absolute;z-index:14;bottom:calc(100% + 8px);width:min(300px,calc(100vw - 28px));padding:13px 15px;border:2px solid #c9972f;border-radius:18px;background:#fffdf6;color:#173f2e;box-shadow:0 14px 34px rgba(0,0,0,.20);font-size:.91rem;font-weight:800;line-height:1.38;opacity:0;transform:translateY(8px) scale(.96);transition:opacity .15s ease,transform .15s ease}
      .aw-annie-scroll__bubble::after{content:'';position:absolute;bottom:-10px;width:17px;height:17px;background:#fffdf6;border-right:2px solid #c9972f;border-bottom:2px solid #c9972f;transform:rotate(45deg)}
      .aw-annie-scroll.is-left .aw-annie-scroll__bubble::after{left:40px}
      .aw-annie-scroll.is-right .aw-annie-scroll__bubble::after{right:40px}
      .aw-annie-scroll.has-tip .aw-annie-scroll__bubble{opacity:1;transform:translateY(0) scale(1)}

      .aw-annie-scroll__button{position:relative;display:block;width:112px;height:122px;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;appearance:none!important;-webkit-appearance:none!important;-webkit-tap-highlight-color:transparent!important;pointer-events:auto;cursor:pointer;touch-action:manipulation}
      .aw-annie-scroll__button:focus{outline:none!important}
      .aw-annie-scroll__button:focus-visible{outline:3px solid #d8f277!important;outline-offset:3px!important}

      .aw-annie-character{position:absolute;z-index:5;left:50%;top:0;width:104px;height:108px;transform:translateX(-50%);transform-origin:50% 70%;filter:drop-shadow(0 7px 6px rgba(0,0,0,.24));will-change:transform,opacity}
      .aw-annie-body-crop{position:absolute;z-index:5;left:50%;top:0;width:98px;height:74px;transform:translateX(-50%);overflow:hidden;pointer-events:none}
      .aw-annie-body{display:block;width:98px;height:98px;object-fit:contain;object-position:center top;transform:scale(1.04) translateY(-1px);transform-origin:50% 8%;user-select:none;-webkit-user-drag:none}

      .aw-annie-wing{position:absolute;z-index:4;top:39px;width:27px;height:37px;border:2px solid rgba(111,67,31,.50);box-shadow:0 2px 0 rgba(255,255,255,.35) inset;background:repeating-linear-gradient(168deg,rgba(116,66,29,.16) 0 2px,transparent 2px 7px),linear-gradient(150deg,#f3ddb0 0%,#dfb779 46%,#b8783a 100%)}
      .aw-annie-wing.left{left:6px;border-radius:78% 28% 72% 42%;transform-origin:100% 18%;transform:rotate(18deg)}
      .aw-annie-wing.right{right:6px;border-radius:28% 78% 42% 72%;transform-origin:0 18%;transform:rotate(-18deg)}
      .aw-annie-scroll.is-flying .aw-annie-wing.left{animation:aw-wing-left .17s ease-in-out infinite alternate}
      .aw-annie-scroll.is-flying .aw-annie-wing.right{animation:aw-wing-right .17s ease-in-out infinite alternate}

      .aw-annie-foot{position:absolute;z-index:7;top:71px;width:19px;height:14px;border-radius:50%;background:#e6a72b;border:2px solid #9a5b12;box-shadow:0 2px 0 rgba(255,255,255,.25) inset;transition:transform .18s ease,top .18s ease}
      .aw-annie-foot.left{left:30px;transform:rotate(6deg)}
      .aw-annie-foot.right{right:30px;transform:rotate(-6deg)}
      .aw-annie-foot::before,.aw-annie-foot::after{content:'';position:absolute;bottom:-6px;width:3px;height:10px;border-radius:999px;background:#d99116;border:1px solid #8e510d;transform-origin:50% 0}
      .aw-annie-foot::before{left:4px;transform:rotate(24deg)}
      .aw-annie-foot::after{right:4px;transform:rotate(-24deg)}
      .aw-annie-scroll.is-flying .aw-annie-foot.left{top:67px;transform:translateX(5px) rotate(24deg)}
      .aw-annie-scroll.is-flying .aw-annie-foot.right{top:67px;transform:translateX(-5px) rotate(-24deg)}

      .aw-annie-wink{position:absolute;z-index:9;left:29px;top:28px;width:22px;height:13px;border-radius:50% 50% 45% 45%;background:linear-gradient(180deg,#b56d34 0%,#7b3f1f 100%);border-bottom:2px solid #4b2616;opacity:0;transform:scaleY(.12);transform-origin:50% 100%;pointer-events:none}
      .aw-annie-scroll.is-winking .aw-annie-wink{animation:aw-wink .72s ease-in-out both}
      .aw-annie-scroll.is-settling .aw-annie-character{animation:aw-gentle-land .78s ease-out both}
      .aw-annie-scroll.is-tapped .aw-annie-character{animation:aw-tap .42s ease-out both}

      @keyframes aw-portrait-awaken{0%{filter:none;transform:scale(1) rotate(0)}28%{filter:drop-shadow(0 0 12px rgba(216,242,119,.72));transform:scale(1.015) rotate(-1deg)}58%{filter:drop-shadow(0 0 18px rgba(216,242,119,.88));transform:scale(1.025) rotate(1deg)}78%{transform:scale(1.008,.97)}100%{filter:none;transform:scale(1) rotate(0)}}
      @keyframes aw-wing-left{from{transform:rotate(34deg) translateY(2px) scaleY(.92)}to{transform:rotate(-50deg) translateY(-7px) scaleY(1.06)}}
      @keyframes aw-wing-right{from{transform:rotate(-34deg) translateY(2px) scaleY(.92)}to{transform:rotate(50deg) translateY(-7px) scaleY(1.06)}}
      @keyframes aw-wink{0%,12%,88%,100%{opacity:0;transform:scaleY(.12)}28%,66%{opacity:1;transform:scaleY(1)}}
      @keyframes aw-gentle-land{0%{transform:translateX(-50%) translateY(-24px) rotate(-5deg)}32%{transform:translateX(-50%) translateY(-13px) rotate(4deg)}60%{transform:translateX(-50%) translateY(-5px) rotate(-3deg)}80%{transform:translateX(-50%) translateY(2px) rotate(1deg)}100%{transform:translateX(-50%) translateY(0) rotate(0)}}
      @keyframes aw-tap{0%{transform:translateX(-50%) translateY(0)}45%{transform:translateX(-50%) translateY(-5px) rotate(-3deg)}100%{transform:translateX(-50%) translateY(0)}}
      @keyframes aw-branch-settle{0%{transform:translateY(0) rotate(0)}35%{transform:translateY(3px) rotate(-1.5deg)}70%{transform:translateY(-1px) rotate(.7deg)}100%{transform:translateY(0) rotate(0)}}
      @keyframes aw-leaf-rustle{0%{filter:none}40%{filter:brightness(1.12)}100%{filter:none}}

      @media(max-width:700px){
        .aw-site-oak-branch{width:112px;height:40px}.aw-site-oak-branch__wood{bottom:8px;height:11px}.aw-site-oak-branch__wood::before{width:40px;height:6px}.aw-site-oak-branch__leaf{width:19px;height:14px}
        .aw-annie-scroll{width:94px;height:105px}.aw-annie-scroll__button{width:94px;height:105px}.aw-annie-character{width:88px;height:94px}.aw-annie-body-crop{width:84px;height:62px}.aw-annie-body{width:84px;height:84px}
        .aw-annie-wing{top:32px;width:23px;height:32px}.aw-annie-wing.left{left:4px}.aw-annie-wing.right{right:4px}
        .aw-annie-foot{top:58px;width:16px;height:12px}.aw-annie-foot.left{left:25px}.aw-annie-foot.right{right:25px}.aw-annie-scroll.is-flying .aw-annie-foot{top:55px}
        .aw-annie-wink{left:24px;top:23px;width:18px;height:11px}
        .aw-annie-scroll__bubble{width:min(236px,calc(100vw - 18px));padding:11px 12px;font-size:.82rem;bottom:calc(100% + 7px)}
      }
      @media(prefers-reduced-motion:reduce){.aw-annie-scroll__bubble,${SOURCE_SELECTOR}{transition:none!important}.aw-annie-character,.aw-annie-wing,.aw-annie-foot,.aw-annie-wink,.aw-site-oak-branch,${SOURCE_SELECTOR}{animation:none!important}}
    `;
    document.head.appendChild(style);
  }

  function getSource(){ return document.querySelector(SOURCE_SELECTOR); }
  function sourceIsVisible(){
    const source = getSource();
    if(!source) return false;
    const rect = source.getBoundingClientRect();
    return rect.bottom > window.innerHeight * .12 && rect.top < window.innerHeight * .84;
  }

  function buildBranchLayer(){
    document.getElementById('awAnnieBranchLayer')?.remove();
    const layer = document.createElement('div');
    layer.id = 'awAnnieBranchLayer';
    layer.setAttribute('aria-hidden','true');
    document.body.appendChild(layer);
    stops.forEach((stop,index)=>{
      if(!document.querySelector(stop.selector)) return;
      const branch = document.createElement('span');
      branch.className = `aw-site-oak-branch is-${stop.side}`;
      branch.dataset.awBranchIndex = String(index);
      branch.innerHTML = '<span class="aw-site-oak-branch__wood"></span><i class="aw-site-oak-branch__leaf one"></i><i class="aw-site-oak-branch__leaf two"></i><i class="aw-site-oak-branch__leaf three"></i><i class="aw-site-oak-branch__leaf four"></i>';
      layer.appendChild(branch);
    });
    layoutBranches();
    return layer;
  }

  function getBranch(index){ return document.querySelector(`[data-aw-branch-index="${index}"]`); }

  function layoutBranches(){
    const mobile = window.innerWidth <= 700;
    const width = mobile ? 112 : 154;
    const edge = mobile ? 5 : 18;
    stops.forEach((stop,index)=>{
      const section = document.querySelector(stop.selector);
      const branch = getBranch(index);
      if(!section || !branch) return;
      const rect = section.getBoundingClientRect();
      const pageTop = window.scrollY + rect.top;
      const safeHeight = Math.max(rect.height, 240);
      const y = pageTop + clamp(safeHeight * stop.anchor, 130, safeHeight - 76);
      const x = stop.side === 'left' ? edge : Math.max(edge, window.innerWidth - width - edge);
      branch.style.left = `${Math.round(x)}px`;
      branch.style.top = `${Math.round(y)}px`;
    });
  }

  function buildGuide(){
    document.getElementById('awAnnieScrollGuide')?.remove();
    const guide = document.createElement('aside');
    guide.className = 'aw-annie-scroll is-right';
    guide.id = 'awAnnieScrollGuide';
    guide.setAttribute('aria-label','Annie tree-care guide');
    guide.innerHTML = `
      <div class="aw-annie-scroll__bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-scroll__button" type="button" aria-label="Toggle Annie's tree-care tip">
        <span class="aw-annie-character" aria-hidden="true">
          <span class="aw-annie-wing left"></span><span class="aw-annie-wing right"></span>
          <span class="aw-annie-body-crop"><img class="aw-annie-body" src="assets/annie.webp" alt=""></span>
          <span class="aw-annie-foot left"></span><span class="aw-annie-foot right"></span><span class="aw-annie-wink"></span>
        </span>
      </button>`;
    document.body.appendChild(guide);
    guide.querySelector('.aw-annie-scroll__button')?.addEventListener('click',()=>{
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

  function positionGuideAtBranch(index){
    const branch = getBranch(index);
    const guide = getGuide();
    if(!branch) return null;
    const rect = branch.getBoundingClientRect();
    const guideWidth = window.innerWidth <= 700 ? 94 : 112;
    const guideHeight = window.innerWidth <= 700 ? 105 : 122;
    const left = clamp(rect.left + rect.width / 2 - guideWidth / 2, 4, window.innerWidth - guideWidth - 4);
    const top = clamp(rect.top - guideHeight + 19, 58, window.innerHeight - guideHeight - 58);
    guide.classList.remove('is-left','is-right');
    guide.classList.add(stops[index]?.side === 'left' ? 'is-left' : 'is-right','is-visible');
    guide.style.left = `${Math.round(left)}px`;
    guide.style.top = `${Math.round(top)}px`;
    return rect;
  }

  function syncToCurrentBranch(){
    if(landedIndex >= 0 && !flightAnimation && !launching) positionGuideAtBranch(landedIndex);
  }

  async function animateCharacterFrom(startRect,duration,startScale=1){
    const guide = getGuide();
    const character = guide.querySelector('.aw-annie-character');
    if(!character) return;
    const target = character.getBoundingClientRect();
    const dx = startRect.left + startRect.width/2 - (target.left + target.width/2);
    const dy = startRect.top + startRect.height/2 - (target.top + target.height/2);
    character.getAnimations().forEach(animation=>animation.cancel());
    guide.classList.remove('is-settling','is-winking');
    guide.classList.add('is-flying');
    if(!reducedMotion.matches && character.animate){
      flightAnimation = character.animate([
        {transform:`translateX(-50%) translate(${dx}px,${dy}px) scale(${startScale}) rotate(0deg)`,opacity:.10,offset:0},
        {transform:`translateX(-50%) translate(${dx*.88}px,${dy*.84-18}px) scale(.94) rotate(-7deg)`,opacity:1,offset:.16},
        {transform:`translateX(-50%) translate(${dx*.65}px,${dy*.58-55}px) rotate(7deg)`,opacity:1,offset:.40},
        {transform:`translateX(-50%) translate(${dx*.39}px,${dy*.31-70}px) rotate(-6deg)`,opacity:1,offset:.63},
        {transform:`translateX(-50%) translate(${dx*.15}px,${dy*.10-38}px) rotate(5deg)`,opacity:1,offset:.82},
        {transform:'translateX(-50%) translate(0,-17px) rotate(-3deg)',opacity:1,offset:.94},
        {transform:'translateX(-50%) translate(0,0) rotate(0deg)',opacity:1,offset:1}
      ],{duration,easing:'cubic-bezier(.22,.72,.18,1)',fill:'both'});
      try{ await flightAnimation.finished; }catch(_){ }
    }
    guide.classList.remove('is-flying');
    guide.classList.add('is-settling','is-winking');
    window.setTimeout(()=>guide.classList.remove('is-settling'),820);
    window.setTimeout(()=>guide.classList.remove('is-winking'),760);
    flightAnimation = null;
  }

  function markLanding(index){
    document.querySelectorAll('.aw-site-oak-branch.is-landed').forEach(branch=>branch.classList.remove('is-landed'));
    const branch = getBranch(index);
    if(!branch) return;
    void branch.offsetWidth;
    branch.classList.add('is-landed');
  }

  function getActiveStop(){
    const line = window.innerHeight * .55;
    let best = landedIndex >= 0 ? landedIndex : 0;
    let distance = Infinity;
    stops.forEach((stop,index)=>{
      const section = document.querySelector(stop.selector);
      const branch = getBranch(index);
      if(!section || !branch) return;
      const rect = section.getBoundingClientRect();
      const branchRect = branch.getBoundingClientRect();
      const visible = rect.bottom > 70 && rect.top < window.innerHeight - 70;
      const nextDistance = Math.abs((branchRect.top + branchRect.height/2) - line);
      if(visible && nextDistance < distance){ best = index; distance = nextDistance; }
    });
    return best;
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

  async function launchFromPortrait(){
    if(launched || launching || flightAnimation || !sourceIsVisible()) return;
    const source = getSource();
    if(!source) return;
    launching = true;
    source.classList.add('aw-annie-awakening');
    await wait(reducedMotion.matches ? 1 : 540);
    const startRect = source.getBoundingClientRect();
    const targetIndex = getActiveStop();
    positionGuideAtBranch(targetIndex);
    await animateCharacterFrom(startRect,reducedMotion.matches ? 1 : 1680,1.12);
    source.classList.remove('aw-annie-awakening');
    landedIndex = targetIndex;
    lineIndex = 0;
    launched = true;
    launching = false;
    markLanding(targetIndex);
    showTip('Hi, I’m Arborwise Annie. We’re glad you’re here.');
  }

  async function flyAndLand(index){
    if(!launched || index < 0 || launching) return;
    if(flightAnimation){ pendingIndex = index; return; }
    if(index === landedIndex){ syncToCurrentBranch(); return; }
    const character = getGuide().querySelector('.aw-annie-character');
    if(!character) return;
    hideTip();
    const startRect = character.getBoundingClientRect();
    positionGuideAtBranch(index);
    lineIndex = (lineIndex + 1) % 3;
    await animateCharacterFrom(startRect,reducedMotion.matches ? 1 : 1480,1);
    landedIndex = index;
    markLanding(index);
    showTip(screenLine(index));
    window.setTimeout(()=>{
      const next = pendingIndex;
      pendingIndex = null;
      const active = next ?? getActiveStop();
      if(active !== landedIndex) flyAndLand(active);
    },120);
  }

  function settleAfterScroll(){
    if(!launched || launching) return;
    const active = getActiveStop();
    if(flightAnimation){ pendingIndex = active; return; }
    if(active !== landedIndex) flyAndLand(active);
    else syncToCurrentBranch();
  }

  function start(){
    installStyles();
    buildBranchLayer();
    buildGuide();
    window.addEventListener('scroll',()=>{
      const current = window.scrollY;
      const movingDown = current > lastScrollY + 1;
      lastScrollY = current;
      if(!launched && !launching && movingDown && sourceIsVisible()) launchFromPortrait();
      if(launched && !flightAnimation) syncToCurrentBranch();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,170);
    },{passive:true});
    window.addEventListener('keydown',event=>{
      if(!launched && sourceIsVisible() && ['ArrowDown','PageDown',' ','End'].includes(event.key)) launchFromPortrait();
    });
    window.addEventListener('resize',()=>{
      hideTip();
      layoutBranches();
      syncToCurrentBranch();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll,160);
    },{passive:true});
    window.addEventListener('load',()=>{ layoutBranches(); syncToCurrentBranch(); },{once:true});
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();
