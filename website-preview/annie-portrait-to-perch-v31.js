(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const ASSET = 'assets/annie-approved-flight-v30.b64?v=20260802-2235';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function cleanup() {
    document.querySelectorAll(
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,' +
      '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,' +
      '.aw-oak-trunk-edge,.aw26-bark,.aw26-stage,.aw-v28-bark,.aw-v28-stage,.aw-v28-flyer,' +
      '.aw-v29-bark,.aw-v29-stage,.aw-v29-flyer,.aw-v30-bark,.aw-v30-stage,.aw-v31-bark,.aw-v31-stage,.aw-v31-flyer'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-branch-to-branch-"],' +
      '[id^="arborwise-annie-portrait-to-perch-"]'
    ).forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-portrait-to-perch-v31';
    style.textContent = `
      html body{overflow-x:hidden!important}
      .annie-callout{position:relative!important;overflow:visible!important}
      .annie-callout img[data-annie]{position:relative;z-index:3;transform-origin:50% 50%}
      .annie-callout img[data-annie].aw-v31-awake{animation:awV31Awake .72s ease-in-out both}

      .aw-v31-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:29px;pointer-events:none;opacity:.95;
        background:
          radial-gradient(ellipse at 35% 8%,rgba(19,9,5,.92) 0 8%,transparent 9%) 0 0/100% 163px,
          radial-gradient(ellipse at 69% 34%,rgba(24,11,6,.84) 0 9%,transparent 10%) 0 27px/100% 201px,
          radial-gradient(ellipse at 30% 77%,rgba(26,12,6,.78) 0 8%,transparent 9%) 0 0/100% 229px,
          linear-gradient(90deg,#1a0d08 0%,#4f3120 22%,#8a6549 48%,#4a2d1c 74%,#170b07 100%);
        filter:drop-shadow(0 0 5px rgba(18,9,5,.38))
      }
      .aw-v31-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(17,7,4,.72) 18% 25%,transparent 29% 52%,rgba(27,12,6,.62) 56% 64%,transparent 68%),
          linear-gradient(86deg,transparent 0 31%,rgba(232,195,141,.16) 37% 44%,transparent 48% 73%,rgba(12,6,3,.52) 79% 87%,transparent 91%)
      }
      .aw-v31-bark.left{left:0;clip-path:polygon(0 0,77% 0,94% 5%,67% 12%,95% 20%,70% 29%,98% 39%,66% 49%,92% 59%,70% 69%,97% 78%,66% 88%,87% 100%,0 100%)}
      .aw-v31-bark.right{right:0;clip-path:polygon(23% 0,100% 0,100% 100%,13% 100%,33% 91%,5% 82%,32% 72%,3% 62%,34% 52%,6% 42%,33% 31%,5% 21%,32% 11%)}

      .aw-v31-stage{
        position:relative!important;display:block!important;width:100%!important;height:222px!important;
        min-height:222px!important;margin:4px 0 8px!important;overflow:visible!important;isolation:isolate!important
      }
      .aw-v31-perch{position:absolute;z-index:5;right:-18px;top:111px;width:174px;height:55px;pointer-events:none}
      .aw-v31-knot{
        position:absolute;right:-3px;top:5px;width:43px;height:43px;border-radius:48% 52% 45% 55%;
        background:radial-gradient(circle at 48% 49%,#251209 0 17%,#6d482f 20% 34%,#2b170e 37% 45%,#906546 48% 68%,#3b2216 71% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24);
        opacity:0;transform:scale(.72)
      }
      .aw-v31-limbwrap{position:absolute;right:18px;top:18px;width:164px;height:30px;transform-origin:100% 50%;opacity:0;transform:scaleX(.04)}
      .aw-v31-limb{
        position:absolute;right:0;top:8px;width:164px;height:14px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#9a6e4b 0%,#6c452c 48%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.21)
      }
      .aw-v31-limb::before,.aw-v31-limb::after{content:"";position:absolute;height:2px;border-radius:999px;background:rgba(47,26,16,.42)}
      .aw-v31-limb::before{left:12%;right:9%;top:4px;transform:rotate(-1deg)}
      .aw-v31-limb::after{left:6%;right:28%;bottom:3px;transform:rotate(1deg)}
      .aw-v31-target{position:absolute;left:37px;top:13px;width:2px;height:2px}
      .aw-v31-perch.grow .aw-v31-knot{animation:awV31Knot .34s ease-out forwards}
      .aw-v31-perch.grow .aw-v31-limbwrap{animation:awV31Limb .62s .1s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v31-perch.settle{animation:awV31Settle .48s ease-out}

      .aw-v31-flyer{
        position:fixed;z-index:9998;width:96px;height:auto;opacity:0;pointer-events:none;
        filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 94%;will-change:left,top,width,transform,opacity
      }
      .aw-v31-flyer.ready{opacity:1}
      .aw-v31-flyer img{display:block;width:100%;height:auto}
      .aw-v31-eyelid{
        position:absolute;z-index:3;left:60.5%;top:25.5%;width:22%;height:8.8%;border-radius:50%;
        background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)
      }
      .aw-v31-flyer.wink .aw-v31-eyelid{animation:awV31Wink .42s ease-in-out 1}

      .aw-v31-bubble{
        position:absolute;z-index:10;left:clamp(30px,8vw,72px);top:58px;width:min(178px,48vw);padding:9px 11px;
        border:2px solid #c49a35;border-radius:24px 26px 23px 20px;
        background:linear-gradient(180deg,#fffdf4,#f7f0d9);color:#0d4b3b;
        font:800 12.5px/1.24 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 11px rgba(0,0,0,.1);opacity:0;transform:translateY(6px) scale(.95);pointer-events:none
      }
      .aw-v31-bubble::after{
        content:"";position:absolute;right:-9px;top:54%;width:15px;height:15px;
        background:#fbf7e8;border-top:2px solid #c49a35;border-right:2px solid #c49a35;transform:rotate(45deg)
      }
      .aw-v31-bubble.show{animation:awV31Bubble .34s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV31Awake{0%,100%{filter:brightness(1);transform:scale(1)}50%{filter:brightness(1.08) drop-shadow(0 0 11px rgba(220,184,70,.35));transform:scale(1.015)}}
      @keyframes awV31Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV31Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV31Settle{0%{transform:rotate(0)}40%{transform:rotate(1deg)}75%{transform:rotate(-.3deg)}100%{transform:rotate(0)}}
      @keyframes awV31Bubble{to{opacity:1;transform:none}}
      @keyframes awV31Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .aw-v31-bark{width:25px}
        .aw-v31-stage{height:216px!important;min-height:216px!important}
        .aw-v31-perch{right:-14px;top:106px;width:164px}
        .aw-v31-limbwrap,.aw-v31-limb{width:154px}
        .aw-v31-target{left:35px}
        .aw-v31-flyer{width:90px}
        .aw-v31-bubble{left:34px;top:54px;width:min(154px,45vw);font-size:11.8px;padding:8px 9px}
      }
      @media(min-width:701px){
        .aw-v31-stage{height:238px!important;min-height:238px!important}
        .aw-v31-perch{right:-22px;top:116px;width:186px}
        .aw-v31-limbwrap,.aw-v31-limb{width:176px}
        .aw-v31-flyer{width:100px}
        .aw-v31-bubble{left:74px;top:62px;width:190px;font-size:13px}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-v31-perch,.aw-v31-knot,.aw-v31-limbwrap,.aw-v31-flyer,.aw-v31-bubble,.aw-v31-eyelid{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v31-bark left';
    right.className = 'aw-v31-bark right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  async function loadApprovedAnnie() {
    const response = await fetch(ASSET, {cache: 'no-store'});
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

  function portraitStart(portrait, flyer) {
    const rect = portrait.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width * .38, 104), 142);
    const ratio = (flyer.getBoundingClientRect().height || 120) / (flyer.getBoundingClientRect().width || 96);
    const height = width * ratio;
    return {
      width,
      left: rect.left + rect.width * .5 - width * .5,
      top: rect.top + rect.height * .43 - height * .5
    };
  }

  function perchEnd(stage, target, width) {
    const stageRect = stage.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const height = width * (306 / 239);
    return {
      left: targetRect.left - width * .5,
      top: targetRect.top - height * .94,
      localLeft: targetRect.left - stageRect.left - width * .5,
      localTop: targetRect.top - stageRect.top - height * .94
    };
  }

  async function start() {
    cleanup();
    installStyles();
    installBark();

    const section = document.querySelector('.annie-callout');
    const portrait = section?.querySelector('img[data-annie],img');
    if (!section || !portrait) return;

    const stage = document.createElement('div');
    stage.className = 'aw-v31-stage';
    stage.innerHTML = `
      <div class="aw-v31-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw-v31-perch" aria-hidden="true">
        <div class="aw-v31-knot"></div>
        <div class="aw-v31-limbwrap">
          <div class="aw-v31-limb"></div>
          <span class="aw-v31-target"></span>
        </div>
      </div>`;
    portrait.insertAdjacentElement('afterend', stage);

    const flyer = document.createElement('div');
    flyer.className = 'aw-v31-flyer';
    flyer.setAttribute('aria-label', 'Arborwise Annie');
    flyer.appendChild(await loadApprovedAnnie());
    flyer.insertAdjacentHTML('beforeend', '<span class="aw-v31-eyelid"></span>');
    document.body.appendChild(flyer);

    const perch = stage.querySelector('.aw-v31-perch');
    const target = stage.querySelector('.aw-v31-target');
    const bubble = stage.querySelector('.aw-v31-bubble');
    let finished = false;

    async function run() {
      if (finished) return;
      finished = true;
      portrait.classList.add('aw-v31-awake');
      perch.classList.add('grow');
      await wait(reducedMotion ? 0 : 700);

      const startPoint = portraitStart(portrait, flyer);
      flyer.style.width = `${startPoint.width}px`;
      Object.assign(flyer.style, {left:`${startPoint.left}px`, top:`${startPoint.top}px`});
      flyer.classList.add('ready');
      await wait(reducedMotion ? 0 : 120);

      const endWidth = window.innerWidth <= 480 ? 90 : 96;
      const end = perchEnd(stage, target, endWidth);
      const middleLeft = (startPoint.left + end.left) / 2 + 12;
      const middleTop = Math.min(startPoint.top, end.top) - 22;

      if (!reducedMotion) {
        await flyer.animate([
          {left:`${startPoint.left}px`,top:`${startPoint.top}px`,width:`${startPoint.width}px`,opacity:.9,transform:'rotate(0deg) scale(1)'},
          {offset:.5,left:`${middleLeft}px`,top:`${middleTop}px`,width:`${(startPoint.width + endWidth) / 2}px`,opacity:1,transform:'rotate(3deg) scale(.99)'},
          {left:`${end.left}px`,top:`${end.top}px`,width:`${endWidth}px`,opacity:1,transform:'rotate(0deg) scale(1)'}
        ], {duration:1250,easing:'cubic-bezier(.26,.72,.2,1)',fill:'forwards'}).finished;
      }

      flyer.remove();
      const perched = document.createElement('div');
      perched.className = 'aw-v31-flyer ready';
      perched.style.position = 'absolute';
      perched.style.zIndex = '9';
      perched.style.width = `${endWidth}px`;
      perched.style.left = `${end.localLeft}px`;
      perched.style.top = `${end.localTop}px`;
      perched.setAttribute('aria-label', 'Arborwise Annie');
      perched.appendChild(await loadApprovedAnnie());
      perched.insertAdjacentHTML('beforeend', '<span class="aw-v31-eyelid"></span>');
      stage.appendChild(perched);

      perch.classList.add('settle');
      await wait(reducedMotion ? 0 : 260);
      bubble.classList.add('show');
      await wait(reducedMotion ? 0 : 440);
      perched.classList.add('wink');
      window.setTimeout(() => perched.classList.remove('wink'), 520);
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .35)) return;
      observer.disconnect();
      run().catch(error => console.error('Annie portrait-to-perch sequence failed.', error));
    }, {threshold:[.35,.55]});
    observer.observe(portrait);
  }

  start().catch(error => console.error('The Annie portrait-to-perch sequence could not start.', error));
})();
