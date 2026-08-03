(() => {
  'use strict';

  const OPENING = "Hi! I'm Arborwise Annie & we're glad you're here!";
  const TIPS = [
    'Show us the whole tree, the concern, and the trunk base. Those three views help reveal the pattern.',
    'A cavity or thinning canopy is a clue, not a diagnosis. Location, movement, and nearby targets matter too.',
    'Good pruning has a reason. Every cut should improve structure, clearance, health, or long-term growth.',
    'Keep mulch off the trunk flare. Mulch belongs over the root zone, not piled against the bark.',
    'For a faster estimate, send the property address and clear photos of what has changed.'
  ];
  const CONTEXT = [
    ['.hero', 'Start with the whole tree, the concern, and the trunk base. The pattern matters more than one close-up.'],
    ['#services', 'Good tree work has a reason. Pruning, removal, and planting should each solve a specific problem.'],
    ['#planting, .growth-section', 'Planting depth matters. Keep the root flare visible and never pile mulch against the trunk.'],
    ['#way', 'A sound recommendation explains what needs action, what can wait, and why.'],
    ['#areas', 'Arborwise serves North Texas locally, so the people making the recommendation are accountable for the result.'],
    ['#estimate', 'For a faster estimate, send the address plus photos of the whole tree, the concern, and the trunk base.'],
    ['.faq-section', 'A cavity, lean, or thinning canopy is a clue, not a diagnosis. The whole site matters.']
  ];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  function clearPreviousAnnie() {
    const original = $('.annie-callout img[data-annie], .annie-callout img');
    if (original) original.remove();

    $$('.aw-v37-stage,.aw-v37-companion,.aw-v37-edge,.aw-v36-annie-panel,.aw-v36-companion,.aw-v35-intro,.aw-v35-companion,.aw-v34-stage,.aw-v34-bark,.aw-v33-stage,.aw-v33-bark,.aw-v33-flyer,.aw-v32-stage,.aw-v32-bark,.aw-v32-flyer,.aw-v31-stage,.aw-v31-bark,.aw-v31-flyer,#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,.aw-oak-trunk-edge').forEach(node => node.remove());
    $$('[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-branch-to-branch-"],[id^="arborwise-annie-portrait-to-perch-"],[id^="arborwise-annie-static-perch-"],#arborwise-annie-context-guide-v35,#arborwise-website-revision-v36,#arborwise-annie-guide-v37').forEach(node => node.remove());

    return original;
  }

  function addStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-guide-v37';
    style.textContent = `
      html,body{overflow-x:clip!important}

      .aw-v37-edge{
        position:fixed;z-index:2;top:0;bottom:0;width:18px;pointer-events:none;opacity:.46;
        background:
          repeating-linear-gradient(97deg,transparent 0 4px,rgba(14,7,4,.72) 5px 7px,transparent 8px 13px),
          repeating-linear-gradient(84deg,rgba(214,174,119,.12) 0 2px,transparent 3px 11px),
          linear-gradient(90deg,#140a06 0%,#5b3a25 34%,#8a6445 58%,#3e2518 80%,#120805 100%);
        filter:drop-shadow(0 0 4px rgba(11,5,3,.35));
      }
      .aw-v37-edge.left{left:0;clip-path:polygon(0 0,72% 0,91% 8%,69% 17%,96% 27%,71% 38%,92% 49%,68% 60%,95% 71%,70% 82%,88% 92%,72% 100%,0 100%)}
      .aw-v37-edge.right{right:0;clip-path:polygon(28% 0,100% 0,100% 100%,27% 100%,12% 91%,32% 81%,5% 71%,29% 60%,8% 49%,31% 38%,6% 27%,30% 17%,9% 8%)}

      .annie-callout.aw-v37-section{
        position:relative!important;display:grid!important;
        grid-template-columns:minmax(210px,255px) minmax(0,1fr)!important;
        align-items:center!important;gap:clamp(16px,3.6vw,42px)!important;
        overflow:visible!important;
      }
      .aw-v37-stage{
        position:relative;width:min(100%,255px);height:188px;margin:0 auto;isolation:isolate;
      }
      .aw-v37-perch{
        position:absolute;right:-3px;bottom:22px;width:116px;height:48px;pointer-events:none;
      }
      .aw-v37-branch{
        position:absolute;right:0;bottom:8px;width:110px;height:16px;
        clip-path:polygon(0 35%,14% 18%,29% 30%,44% 13%,60% 28%,77% 17%,100% 26%,100% 74%,78% 67%,61% 84%,44% 70%,29% 86%,13% 72%,0 64%);
        background:linear-gradient(180deg,#9b7451 0%,#69472f 48%,#352117 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.13),inset 0 -3px rgba(25,13,8,.28),0 5px 8px rgba(0,0,0,.18);
      }
      .aw-v37-branch::after{
        content:"";position:absolute;right:-5px;top:-8px;width:34px;height:34px;border-radius:50%;
        background:radial-gradient(circle at 48% 48%,#24130c 0 16%,#765038 19% 34%,#342016 37% 45%,#987254 48% 70%,#432a1c 73% 100%);
        box-shadow:inset 3px 1px 5px rgba(255,255,255,.1),0 3px 7px rgba(0,0,0,.2);
      }
      .aw-v37-twig{position:absolute;right:52px;bottom:24px;width:52px;height:4px;border-radius:999px;background:linear-gradient(180deg,#815a3c,#3c2519);transform:rotate(-18deg);transform-origin:right center}
      .aw-v37-leaf{position:absolute;width:22px;height:13px;border-radius:100% 0 100% 0;background:linear-gradient(135deg,#87ad54 0%,#3e7f42 58%,#1f5b31 100%);box-shadow:inset -2px -2px 3px rgba(9,56,32,.25),0 2px 3px rgba(0,0,0,.12);transform-origin:0 100%}
      .aw-v37-leaf.one{right:83px;bottom:34px;transform:rotate(-30deg)}
      .aw-v37-leaf.two{right:60px;bottom:42px;transform:scaleX(-1) rotate(-19deg)}
      .aw-v37-leaf.three{right:38px;bottom:29px;transform:rotate(12deg)}

      .aw-v37-annie{
        position:absolute;z-index:5;right:12px;bottom:28px;width:96px;
        opacity:0;transform:translate3d(120px,-32px,0) rotate(8deg) scale(.96);
        transform-origin:50% 100%;transition:transform .82s cubic-bezier(.2,.78,.2,1),opacity .28s ease;
        filter:drop-shadow(0 6px 7px rgba(0,0,0,.22));cursor:pointer;touch-action:manipulation;
      }
      .aw-v37-annie.landed{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}
      .aw-v37-annie img{display:block;width:100%;height:auto;visibility:hidden}
      .aw-v37-annie img.ready{visibility:visible}
      .aw-v37-annie.blink::after{
        content:"";position:absolute;left:58%;top:27%;width:25%;height:7%;border-radius:50%;
        background:#efd9aa;border-bottom:2px solid #3a2116;animation:awV37Blink .38s ease-in-out 1;
      }

      .aw-v37-bubble{
        position:absolute;z-index:6;left:2px;top:10px;width:150px;min-height:66px;padding:13px 14px;
        border:2px solid #d2a342;border-radius:30px;background:#fffdf5;color:#123f32;
        font:800 12.2px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 10px 24px rgba(18,63,50,.14),inset 0 1px rgba(255,255,255,.9);
        opacity:0;transform:translateY(5px) scale(.97);transition:opacity .24s ease,transform .24s ease;pointer-events:none;
      }
      .aw-v37-bubble::before{
        content:"";position:absolute;z-index:-1;left:21px;top:-14px;width:45px;height:34px;border:2px solid #d2a342;border-bottom:0;border-radius:50% 50% 0 0;background:#fffdf5;
        box-shadow:37px 2px 0 -1px #fffdf5,37px 0 0 1px #d2a342,72px 10px 0 -4px #fffdf5,72px 8px 0 -2px #d2a342;
      }
      .aw-v37-bubble::after{
        content:"";position:absolute;right:-10px;bottom:13px;width:18px;height:18px;
        background:#fffdf5;border-right:2px solid #d2a342;border-bottom:2px solid #d2a342;
        transform:rotate(-24deg) skew(-10deg);transform-origin:center;
      }
      .aw-v37-bubble.show{opacity:1;transform:none}
      .annie-callout #annieButton{
        min-height:46px!important;padding:10px 18px!important;border-radius:999px!important;
        background:#0b3f2f!important;color:#fff!important;border:1px solid #d7a542!important;
        font-weight:900!important;box-shadow:0 8px 18px rgba(4,37,27,.15)!important;
      }

      .aw-v37-companion{
        position:fixed;z-index:950;bottom:101px;width:224px;height:126px;
        opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,visibility 0s linear .25s;
      }
      .aw-v37-companion.right{right:0}
      .aw-v37-companion.left{left:0}
      .aw-v37-companion.show{opacity:1;visibility:visible;transition:opacity .2s ease}
      .aw-v37-companion .aw-v37-perch{bottom:7px;width:102px}
      .aw-v37-companion.right .aw-v37-perch{right:0}
      .aw-v37-companion.left .aw-v37-perch{left:0;right:auto;transform:scaleX(-1)}
      .aw-v37-companion .aw-v37-branch{width:96px;height:14px}
      .aw-v37-companion .aw-v37-annie{bottom:20px;width:76px}
      .aw-v37-companion.right .aw-v37-annie{right:9px;transform:translate3d(120px,-28px,0) rotate(8deg) scale(.96)}
      .aw-v37-companion.left .aw-v37-annie{left:9px;right:auto;transform:translate3d(-120px,-28px,0) rotate(-8deg) scale(.96)}
      .aw-v37-companion .aw-v37-annie.landed{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}
      .aw-v37-companion .aw-v37-bubble{top:0;width:137px;min-height:58px;padding:10px 11px;font-size:10.8px;line-height:1.27}
      .aw-v37-companion.right .aw-v37-bubble{left:0}
      .aw-v37-companion.left .aw-v37-bubble{right:0;left:auto}
      .aw-v37-companion.left .aw-v37-bubble::after{right:auto;left:-10px;transform:scaleX(-1) rotate(-24deg) skew(-10deg)}

      html body .rooted-section .recognition-grid{width:min(100%,900px)!important;margin:28px auto 0!important;gap:10px!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;perspective:none!important}
      html body .rooted-section .recognition-grid article,
      html body .rooted-section .recognition-grid article:nth-child(1),
      html body .rooted-section .recognition-grid article:nth-child(2),
      html body .rooted-section .recognition-grid article:nth-child(3),
      html body .rooted-section .recognition-grid article:nth-child(4){
        order:initial!important;grid-column:auto!important;display:grid!important;grid-template-columns:58px minmax(0,1fr)!important;align-items:center!important;gap:10px!important;
        min-height:92px!important;padding:10px 12px!important;border:1px solid rgba(232,190,89,.58)!important;border-radius:15px!important;color:#fff!important;text-align:left!important;
        background:linear-gradient(145deg,#06130f 0%,#0c3528 58%,#071d16 100%)!important;box-shadow:0 10px 20px rgba(2,20,14,.22),inset 0 1px rgba(255,255,255,.06)!important;
        animation:none!important;transform:none!important;
      }
      html body .rooted-section .recognition-grid article::before,
      html body .rooted-section .recognition-grid article::after{display:none!important}
      html body .rooted-section .recognition-grid article img,
      html body .rooted-section .recognition-grid article:nth-child(1) img,
      html body .rooted-section .recognition-grid article:nth-child(2) img,
      html body .rooted-section .recognition-grid article:nth-child(3) img,
      html body .rooted-section .recognition-grid article:nth-child(4) img{width:54px!important;height:54px!important;padding:4px!important;object-fit:contain!important;border-radius:12px!important;background:#fffdf4!important;box-shadow:0 6px 12px rgba(0,0,0,.22)!important;filter:none!important;transform:none!important}
      html body .rooted-section .recognition-grid article strong{display:block!important;color:#fff!important;font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(.9rem,2.2vw,1.08rem)!important;line-height:1.08!important;text-shadow:0 2px 5px rgba(0,0,0,.32)!important}
      html body .rooted-section .recognition-grid article span{display:block!important;margin-top:4px!important;color:#d9f378!important;font-size:.68rem!important;font-weight:900!important;letter-spacing:.08em!important;text-transform:uppercase!important}

      html body .site-footer,html body footer{padding-top:30px!important;padding-bottom:108px!important}
      html body .site-footer .fb{margin:8px auto 10px!important}
      html body .site-footer .footer-links{margin:6px auto 8px!important}
      html body .site-footer small{display:block!important;order:99!important;margin:10px auto 0!important;padding-top:11px!important;border-top:1px solid rgba(255,255,255,.18)!important;color:#d9e2dd!important}

      @keyframes awV37Blink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:700px){
        .aw-v37-edge{width:14px;opacity:.4}
        .annie-callout.aw-v37-section{grid-template-columns:minmax(0,1fr)!important;gap:5px!important}
        .aw-v37-stage{width:min(100%,330px);height:172px;margin-bottom:0}
        .aw-v37-perch{right:0;bottom:18px}
        .aw-v37-annie{right:10px;bottom:25px;width:91px}
        .aw-v37-bubble{left:8px;top:13px;width:min(150px,45vw);font-size:11.4px}
        .aw-v37-companion{width:210px;height:119px}
        html body .rooted-section .recognition-grid{gap:8px!important;padding:0 3px!important}
        html body .rooted-section .recognition-grid article,
        html body .rooted-section .recognition-grid article:nth-child(1),
        html body .rooted-section .recognition-grid article:nth-child(2),
        html body .rooted-section .recognition-grid article:nth-child(3),
        html body .rooted-section .recognition-grid article:nth-child(4){grid-template-columns:50px minmax(0,1fr)!important;gap:8px!important;min-height:84px!important;padding:9px!important;border-radius:14px!important}
        html body .rooted-section .recognition-grid article img,
        html body .rooted-section .recognition-grid article:nth-child(1) img,
        html body .rooted-section .recognition-grid article:nth-child(2) img,
        html body .rooted-section .recognition-grid article:nth-child(3) img,
        html body .rooted-section .recognition-grid article:nth-child(4) img{width:47px!important;height:47px!important}
        html body .rooted-section .recognition-grid article strong{font-size:.84rem!important}
        html body .rooted-section .recognition-grid article span{font-size:.61rem!important}
      }
      @media(min-width:701px){
        .aw-v37-companion{bottom:auto;top:55%;transform:translateY(-50%)}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-v37-annie,.aw-v37-bubble,.aw-v37-companion{transition:none!important}
        .aw-v37-annie{opacity:1!important;transform:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function branchMarkup() {
    return '<div class="aw-v37-branch"></div><div class="aw-v37-twig"></div><span class="aw-v37-leaf one"></span><span class="aw-v37-leaf two"></span><span class="aw-v37-leaf three"></span>';
  }

  function makeEdges() {
    ['left', 'right'].forEach(side => {
      const edge = document.createElement('div');
      edge.className = `aw-v37-edge ${side}`;
      edge.setAttribute('aria-hidden', 'true');
      document.body.appendChild(edge);
    });
  }

  function waitForLoadedImage(image) {
    image.alt = '';
    image.decoding = 'async';
    image.style.visibility = 'hidden';
    return new Promise((resolve, reject) => {
      const ready = () => {
        if (image.naturalWidth > 0) resolve(image);
        else reject(new Error('Annie image has no readable dimensions.'));
      };
      if (image.complete) return ready();
      const timer = window.setTimeout(() => reject(new Error('Annie image timed out.')), 3500);
      image.addEventListener('load', () => { window.clearTimeout(timer); ready(); }, {once:true});
      image.addEventListener('error', () => { window.clearTimeout(timer); reject(new Error('Annie image failed to load.')); }, {once:true});
    });
  }

  function createAnnieElement(image, altText) {
    const wrap = document.createElement('button');
    wrap.type = 'button';
    wrap.className = 'aw-v37-annie';
    wrap.setAttribute('aria-label', 'See another Annie tip');
    wrap.style.border = '0';
    wrap.style.padding = '0';
    wrap.style.background = 'transparent';
    image.alt = altText;
    image.classList.add('ready');
    image.style.removeProperty('visibility');
    wrap.appendChild(image);
    return wrap;
  }

  function showBubble(bubble, annie, message) {
    bubble.textContent = message;
    bubble.classList.add('show');
    annie.classList.remove('blink');
    window.setTimeout(() => {
      annie.classList.add('blink');
      window.setTimeout(() => annie.classList.remove('blink'), 430);
    }, 650);
    window.clearTimeout(bubble._hideTimer);
    bubble._hideTimer = window.setTimeout(() => bubble.classList.remove('show'), 1500);
  }

  function installOpening(section, image) {
    section.classList.add('aw-v37-section');
    const stage = document.createElement('div');
    stage.className = 'aw-v37-stage';
    stage.innerHTML = `<div class="aw-v37-bubble" role="status" aria-live="polite"></div><div class="aw-v37-perch" aria-hidden="true">${branchMarkup()}</div>`;

    const annie = createAnnieElement(image, 'Arborwise Annie perched on a small oak branch');
    stage.appendChild(annie);
    section.insertBefore(stage, section.firstChild);

    const bubble = $('.aw-v37-bubble', stage);
    const button = $('#annieButton');
    let tipIndex = 0;
    const nextTip = () => {
      const tip = TIPS[tipIndex % TIPS.length];
      tipIndex += 1;
      showBubble(bubble, annie, tip);
    };
    annie.addEventListener('click', nextTip);
    if (button) {
      button.textContent = 'See another Annie tip';
      button.setAttribute('aria-label', 'See another Annie tip');
      button.title = 'See another Annie tip';
      button.addEventListener('click', nextTip);
    }

    requestAnimationFrame(() => requestAnimationFrame(() => {
      annie.classList.add('landed');
      window.setTimeout(() => showBubble(bubble, annie, OPENING), 620);
    }));

    return {stage, annie, bubble};
  }

  function cloneAnnieImage(source) {
    const clone = source.cloneNode(false);
    clone.removeAttribute('id');
    clone.alt = '';
    clone.setAttribute('aria-hidden', 'true');
    clone.classList.add('ready');
    clone.style.removeProperty('visibility');
    return clone;
  }

  function installCompanion(sourceImage, openingSection) {
    const companion = document.createElement('aside');
    companion.className = 'aw-v37-companion right';
    companion.setAttribute('aria-live', 'polite');
    companion.innerHTML = `<div class="aw-v37-bubble"></div><div class="aw-v37-perch" aria-hidden="true">${branchMarkup()}</div>`;
    const annie = createAnnieElement(cloneAnnieImage(sourceImage), '');
    annie.setAttribute('aria-hidden', 'true');
    companion.appendChild(annie);
    document.body.appendChild(companion);

    const bubble = $('.aw-v37-bubble', companion);
    const targets = CONTEXT.map(([selector, message]) => {
      const element = $(selector);
      return element ? {element, message} : null;
    }).filter(Boolean);

    let current = -1;
    let side = 'right';
    let frame = 0;
    let settleTimer = 0;

    function openingVisible() {
      const rect = openingSection.getBoundingClientRect();
      return rect.bottom > 100 && rect.top < window.innerHeight - 90;
    }

    function nearestTarget() {
      const focus = window.innerHeight * .48;
      let best = 0;
      let distance = Infinity;
      targets.forEach((item, index) => {
        const rect = item.element.getBoundingClientRect();
        const center = rect.top + Math.min(rect.height, window.innerHeight) / 2;
        const d = Math.abs(center - focus);
        if (d < distance) { distance = d; best = index; }
      });
      return best;
    }

    function landAt(index) {
      if (index === current) return;
      current = index;
      side = side === 'right' ? 'left' : 'right';
      companion.classList.remove('show', 'left', 'right');
      annie.classList.remove('landed', 'blink');
      bubble.classList.remove('show');
      companion.classList.add(side);
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        companion.classList.add('show');
        requestAnimationFrame(() => requestAnimationFrame(() => {
          annie.classList.add('landed');
          window.setTimeout(() => showBubble(bubble, annie, targets[index].message), 620);
        }));
      }, 180);
    }

    function update() {
      frame = 0;
      if (window.scrollY < 320 || openingVisible()) {
        companion.classList.remove('show');
        return;
      }
      landAt(nearestTarget());
    }

    function requestUpdate() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, {passive:true});
    window.addEventListener('resize', requestUpdate, {passive:true});
    requestUpdate();
  }

  function tightenFooterOrder() {
    const footer = $('.site-footer') || $('footer');
    if (!footer) return;
    const copyright = $('small', footer);
    if (copyright) footer.appendChild(copyright);
  }

  async function start() {
    const originalImage = clearPreviousAnnie();
    addStyles();
    makeEdges();
    tightenFooterOrder();

    const section = $('.annie-callout');
    if (!section || !originalImage) {
      console.error('Annie section or original Annie image was not found.');
      return;
    }

    try {
      await waitForLoadedImage(originalImage);
      const opening = installOpening(section, originalImage);
      installCompanion(originalImage, section);
      opening.stage.dataset.annieReady = 'true';
    } catch (error) {
      console.error(error);
      originalImage.remove();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once:true});
  } else {
    start();
  }
})();