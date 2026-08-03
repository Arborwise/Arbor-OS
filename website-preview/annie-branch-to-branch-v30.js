(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function cleanup() {
    document.querySelectorAll(
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,' +
      '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,' +
      '.aw-oak-trunk-edge,.aw26-bark,.aw26-stage,.aw-v28-bark,.aw-v28-stage,.aw-v28-flyer,' +
      '.aw-v29-bark,.aw-v29-stage,.aw-v29-flyer,.aw-v30-bark,.aw-v30-stage'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-branch-to-branch-"]'
    ).forEach(node => node.remove());

    const oldPortrait = document.querySelector('.aw-v29-portrait');
    if (oldPortrait) {
      const image = oldPortrait.querySelector('img[data-annie],img');
      if (image) oldPortrait.replaceWith(image);
      else oldPortrait.remove();
    }
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-branch-to-branch-v30';
    style.textContent = `
      html body{overflow-x:hidden!important}
      .annie-callout{position:relative!important;overflow:visible!important}

      .aw-v30-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:30px;pointer-events:none;opacity:.95;
        background:
          radial-gradient(ellipse at 35% 8%,rgba(19,9,5,.92) 0 8%,transparent 9%) 0 0/100% 163px,
          radial-gradient(ellipse at 69% 34%,rgba(24,11,6,.84) 0 9%,transparent 10%) 0 27px/100% 201px,
          radial-gradient(ellipse at 30% 77%,rgba(26,12,6,.78) 0 8%,transparent 9%) 0 0/100% 229px,
          linear-gradient(90deg,#1a0d08 0%,#4f3120 22%,#8a6549 48%,#4a2d1c 74%,#170b07 100%);
        filter:drop-shadow(0 0 5px rgba(18,9,5,.38))
      }
      .aw-v30-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(17,7,4,.72) 18% 25%,transparent 29% 52%,rgba(27,12,6,.62) 56% 64%,transparent 68%),
          linear-gradient(86deg,transparent 0 31%,rgba(232,195,141,.16) 37% 44%,transparent 48% 73%,rgba(12,6,3,.52) 79% 87%,transparent 91%)
      }
      .aw-v30-bark.left{left:0;clip-path:polygon(0 0,77% 0,94% 5%,67% 12%,95% 20%,70% 29%,98% 39%,66% 49%,92% 59%,70% 69%,97% 78%,66% 88%,87% 100%,0 100%)}
      .aw-v30-bark.right{right:0;clip-path:polygon(23% 0,100% 0,100% 100%,13% 100%,33% 91%,5% 82%,32% 72%,3% 62%,34% 52%,6% 42%,33% 31%,5% 21%,32% 11%)}

      .aw-v30-stage{
        position:relative!important;display:block!important;width:100%!important;height:430px!important;
        min-height:430px!important;margin:18px 0 12px!important;overflow:visible!important;isolation:isolate!important
      }

      .aw-v30-perch{position:absolute;z-index:4;width:176px;height:58px;pointer-events:none}
      .aw-v30-perch.first{right:-22px;top:52px}
      .aw-v30-perch.second{left:-22px;top:250px}
      .aw-v30-knot{
        position:absolute;top:7px;width:45px;height:45px;border-radius:48% 52% 45% 55%;
        background:radial-gradient(circle at 48% 49%,#251209 0 17%,#6d482f 20% 34%,#2b170e 37% 45%,#906546 48% 68%,#3b2216 71% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24)
      }
      .aw-v30-perch.first .aw-v30-knot{right:-4px}
      .aw-v30-perch.second .aw-v30-knot{left:-4px}
      .aw-v30-limbwrap{position:absolute;top:18px;width:164px;height:31px}
      .aw-v30-perch.first .aw-v30-limbwrap{right:19px;transform-origin:100% 50%}
      .aw-v30-perch.second .aw-v30-limbwrap{left:19px;transform-origin:0 50%}
      .aw-v30-limb{
        position:absolute;top:8px;width:164px;height:14px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#9a6e4b 0%,#6c452c 48%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.21)
      }
      .aw-v30-limb::before,.aw-v30-limb::after{content:"";position:absolute;height:2px;border-radius:999px;background:rgba(47,26,16,.42)}
      .aw-v30-limb::before{left:12%;right:9%;top:4px;transform:rotate(-1deg)}
      .aw-v30-limb::after{left:6%;right:28%;bottom:3px;transform:rotate(1deg)}
      .aw-v30-target{position:absolute;width:2px;height:2px;top:13px}
      .aw-v30-perch.first .aw-v30-target{left:36px}
      .aw-v30-perch.second .aw-v30-target{right:36px}

      .aw-v30-perch.second .aw-v30-knot{opacity:0;transform:scale(.72)}
      .aw-v30-perch.second .aw-v30-limbwrap{opacity:0;transform:scaleX(.04)}
      .aw-v30-perch.second.grow .aw-v30-knot{animation:awV30Knot .34s ease-out forwards}
      .aw-v30-perch.second.grow .aw-v30-limbwrap{animation:awV30Limb .64s .1s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v30-perch.settle{animation:awV30Settle .48s ease-out}

      .aw-v30-annie{
        position:absolute;z-index:9;width:96px;height:auto;opacity:0;pointer-events:none;
        filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 92%;will-change:left,top,transform
      }
      .aw-v30-annie.ready{opacity:1}
      .aw-v30-annie img{display:block;width:100%;height:auto}
      .aw-v30-eyelid{position:absolute;z-index:3;left:60.5%;top:25.5%;width:22%;height:8.8%;border-radius:50%;background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)}
      .aw-v30-annie.wink .aw-v30-eyelid{animation:awV30Wink .42s ease-in-out 1}

      .aw-v30-bubble{
        position:absolute;z-index:10;left:238px;top:230px;width:174px;padding:9px 11px;
        border:2px solid #c49a35;border-radius:24px 26px 23px 20px;
        background:linear-gradient(180deg,#fffdf4,#f7f0d9);color:#0d4b3b;
        font:800 13px/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 11px rgba(0,0,0,.1);opacity:0;transform:translateY(6px) scale(.95);pointer-events:none
      }
      .aw-v30-bubble::after{content:"";position:absolute;left:-9px;top:54%;width:15px;height:15px;background:#fbf7e8;border-left:2px solid #c49a35;border-bottom:2px solid #c49a35;transform:rotate(45deg)}
      .aw-v30-bubble.show{animation:awV30Bubble .34s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV30Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV30Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV30Settle{0%{transform:rotate(0)}40%{transform:rotate(1deg)}75%{transform:rotate(-.3deg)}100%{transform:rotate(0)}}
      @keyframes awV30Bubble{to{opacity:1;transform:none}}
      @keyframes awV30Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .aw-v30-bark{width:25px}
        .aw-v30-stage{height:410px!important;min-height:410px!important;margin-top:10px!important}
        .aw-v30-perch{width:160px}
        .aw-v30-perch.first{right:-17px;top:42px}
        .aw-v30-perch.second{left:-17px;top:214px}
        .aw-v30-limbwrap,.aw-v30-limb{width:149px}
        .aw-v30-annie{width:88px}
        .aw-v30-bubble{left:50%;top:310px;width:min(176px,72vw);transform:translate(-50%,6px) scale(.95);font-size:12.5px}
        .aw-v30-bubble.show{animation:awV30BubbleMobile .34s cubic-bezier(.2,.85,.2,1) forwards}
        .aw-v30-bubble::after{left:24px;top:-9px;border:0;border-left:2px solid #c49a35;border-top:2px solid #c49a35}
      }
      @keyframes awV30BubbleMobile{to{opacity:1;transform:translate(-50%,0) scale(1)}}
      @media(min-width:701px){
        .aw-v30-stage{height:450px!important;min-height:450px!important}
        .aw-v30-perch{width:188px}
        .aw-v30-limbwrap,.aw-v30-limb{width:176px}
        .aw-v30-annie{width:100px}
        .aw-v30-bubble{left:260px;width:186px;font-size:13.5px}
      }
      @media(prefers-reduced-motion:reduce){.aw-v30-perch,.aw-v30-knot,.aw-v30-limbwrap,.aw-v30-annie,.aw-v30-bubble,.aw-v30-eyelid{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v30-bark left';
    right.className = 'aw-v30-bark right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  async function loadApprovedAnnie() {
    const response = await fetch('assets/annie-clean-v26.b64?v=20260802-2155', {cache: 'no-store'});
    if (!response.ok) throw new Error(`Approved Annie asset returned ${response.status}`);
    const base64 = (await response.text()).trim();
    const image = new Image();
    image.alt = '';
    image.decoding = 'async';
    image.src = `data:image/webp;base64,${base64}`;
    try { await image.decode(); }
    catch { await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; }); }
    return image;
  }

  function pointInStage(stage, target, annie) {
    const stageRect = stage.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const width = annie.getBoundingClientRect().width || 96;
    const height = annie.getBoundingClientRect().height || width * 1.28;
    return {left: targetRect.left - stageRect.left - width * .5, top: targetRect.top - stageRect.top - height * .92};
  }

  async function start() {
    cleanup();
    installStyles();
    installBark();

    const section = document.querySelector('.annie-callout');
    const portrait = section?.querySelector('img[data-annie],img');
    if (!section || !portrait) return;

    const stage = document.createElement('div');
    stage.className = 'aw-v30-stage';
    stage.innerHTML = `
      <div class="aw-v30-perch first" aria-hidden="true"><div class="aw-v30-knot"></div><div class="aw-v30-limbwrap"><div class="aw-v30-limb"></div><span class="aw-v30-target"></span></div></div>
      <div class="aw-v30-perch second" aria-hidden="true"><div class="aw-v30-knot"></div><div class="aw-v30-limbwrap"><div class="aw-v30-limb"></div><span class="aw-v30-target"></span></div></div>
      <div class="aw-v30-bubble" role="status" aria-live="polite">${INTRO}</div>`;
    portrait.insertAdjacentElement('afterend', stage);

    const annie = document.createElement('div');
    annie.className = 'aw-v30-annie';
    annie.setAttribute('aria-label', 'Arborwise Annie');
    annie.appendChild(await loadApprovedAnnie());
    annie.insertAdjacentHTML('beforeend', '<span class="aw-v30-eyelid"></span>');
    stage.appendChild(annie);

    const firstPerch = stage.querySelector('.aw-v30-perch.first');
    const secondPerch = stage.querySelector('.aw-v30-perch.second');
    const firstTarget = firstPerch.querySelector('.aw-v30-target');
    const secondTarget = secondPerch.querySelector('.aw-v30-target');
    const bubble = stage.querySelector('.aw-v30-bubble');

    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
    const first = pointInStage(stage, firstTarget, annie);
    Object.assign(annie.style, {left:`${first.left}px`, top:`${first.top}px`});
    annie.classList.add('ready');

    let landedOnSecond = false;
    let started = false;

    function lockToSecond() {
      if (!landedOnSecond) return;
      const end = pointInStage(stage, secondTarget, annie);
      Object.assign(annie.style, {left:`${end.left}px`, top:`${end.top}px`});
    }

    async function flyToSecond() {
      if (started) return;
      started = true;
      secondPerch.classList.add('grow');
      await wait(reducedMotion ? 0 : 720);

      const startPoint = pointInStage(stage, firstTarget, annie);
      const endPoint = pointInStage(stage, secondTarget, annie);
      const middleLeft = (startPoint.left + endPoint.left) / 2;
      const middleTop = Math.min(startPoint.top, endPoint.top) - 34;

      if (reducedMotion) {
        Object.assign(annie.style, {left:`${endPoint.left}px`, top:`${endPoint.top}px`});
      } else {
        await annie.animate([
          {left:`${startPoint.left}px`,top:`${startPoint.top}px`,transform:'rotate(0deg) scale(1)'},
          {offset:.5,left:`${middleLeft}px`,top:`${middleTop}px`,transform:'rotate(-3deg) scale(.98)'},
          {left:`${endPoint.left}px`,top:`${endPoint.top}px`,transform:'rotate(0deg) scale(1)'}
        ], {duration:1100,easing:'cubic-bezier(.28,.72,.22,1)',fill:'forwards'}).finished;
        Object.assign(annie.style, {left:`${endPoint.left}px`,top:`${endPoint.top}px`,transform:'none'});
      }

      landedOnSecond = true;
      secondPerch.classList.add('settle');
      await wait(reducedMotion ? 0 : 220);
      bubble.classList.add('show');
      await wait(reducedMotion ? 0 : 420);
      annie.classList.add('wink');
      window.setTimeout(() => annie.classList.remove('wink'), 520);
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .25)) return;
      observer.disconnect();
      window.setTimeout(() => flyToSecond().catch(error => console.error('Annie branch flight failed.', error)), reducedMotion ? 0 : 1400);
    }, {threshold:[.25,.5]});
    observer.observe(stage);

    window.addEventListener('resize', () => {
      if (landedOnSecond) lockToSecond();
      else {
        const point = pointInStage(stage, firstTarget, annie);
        Object.assign(annie.style, {left:`${point.left}px`,top:`${point.top}px`});
      }
    }, {passive:true});
  }

  start().catch(error => console.error('The Annie branch-to-branch sequence could not start.', error));
})();