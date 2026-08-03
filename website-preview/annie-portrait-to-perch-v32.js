(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const ASSET = 'assets/annie-approved-flight-v30.b64?v=20260802-2235';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function cleanup() {
    document.querySelectorAll(
      '.aw-v31-bark,.aw-v31-stage,.aw-v31-flyer,.aw-v32-bark,.aw-v32-stage,.aw-v32-flyer,' +
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,' +
      '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,.aw-oak-trunk-edge'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-branch-to-branch-"],' +
      '[id^="arborwise-annie-portrait-to-perch-"]'
    ).forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-portrait-to-perch-v32';
    style.textContent = `
      html body{overflow-x:hidden!important}
      .annie-callout{position:relative!important;overflow:visible!important}
      .annie-callout img[data-annie]{position:relative;z-index:3;transform-origin:50% 50%}
      .annie-callout img[data-annie].aw-v32-awake{animation:awV32Awake .7s ease-in-out both}

      .aw-v32-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:25px;pointer-events:none;opacity:.95;
        background:
          radial-gradient(ellipse at 34% 9%,rgba(20,9,5,.92) 0 8%,transparent 9%) 0 0/100% 173px,
          radial-gradient(ellipse at 70% 36%,rgba(25,11,6,.86) 0 9%,transparent 10%) 0 31px/100% 211px,
          linear-gradient(90deg,#1b0d08 0%,#513321 22%,#896448 48%,#492c1c 74%,#170b07 100%);
        filter:drop-shadow(0 0 5px rgba(18,9,5,.38))
      }
      .aw-v32-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(17,7,4,.72) 18% 25%,transparent 29% 52%,rgba(27,12,6,.62) 56% 64%,transparent 68%),
          linear-gradient(86deg,transparent 0 31%,rgba(232,195,141,.16) 37% 44%,transparent 48% 73%,rgba(12,6,3,.52) 79% 87%,transparent 91%)
      }
      .aw-v32-bark.left{left:0;clip-path:polygon(0 0,77% 0,94% 5%,67% 12%,95% 20%,70% 29%,98% 39%,66% 49%,92% 59%,70% 69%,97% 78%,66% 88%,87% 100%,0 100%)}
      .aw-v32-bark.right{right:0;clip-path:polygon(23% 0,100% 0,100% 100%,13% 100%,33% 91%,5% 82%,32% 72%,3% 62%,34% 52%,6% 42%,33% 31%,5% 21%,32% 11%)}

      .aw-v32-stage{
        position:relative!important;display:block!important;width:100%!important;height:190px!important;
        min-height:190px!important;margin:6px 0 8px!important;overflow:visible!important;isolation:isolate!important
      }
      .aw-v32-perch{position:absolute;z-index:5;right:-13px;top:102px;width:158px;height:52px;pointer-events:none}
      .aw-v32-knot{
        position:absolute;right:-3px;top:5px;width:39px;height:39px;border-radius:48% 52% 45% 55%;
        background:radial-gradient(circle at 48% 49%,#251209 0 17%,#6d482f 20% 34%,#2b170e 37% 45%,#906546 48% 68%,#3b2216 71% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24);
        opacity:0;transform:scale(.72)
      }
      .aw-v32-limbwrap{position:absolute;right:17px;top:18px;width:148px;height:28px;transform-origin:100% 50%;opacity:0;transform:scaleX(.04)}
      .aw-v32-limb{
        position:absolute;right:0;top:7px;width:148px;height:13px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#9a6e4b 0%,#6c452c 48%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.21)
      }
      .aw-v32-limb::before,.aw-v32-limb::after{content:"";position:absolute;height:2px;border-radius:999px;background:rgba(47,26,16,.42)}
      .aw-v32-limb::before{left:12%;right:9%;top:4px;transform:rotate(-1deg)}
      .aw-v32-limb::after{left:6%;right:28%;bottom:3px;transform:rotate(1deg)}
      .aw-v32-target{position:absolute;left:36px;top:12px;width:2px;height:2px}
      .aw-v32-perch.grow .aw-v32-knot{animation:awV32Knot .32s ease-out forwards}
      .aw-v32-perch.grow .aw-v32-limbwrap{animation:awV32Limb .56s .08s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v32-perch.settle{animation:awV32Settle .46s ease-out}

      .aw-v32-flyer{
        position:fixed;z-index:9998;width:92px;height:auto;opacity:0;pointer-events:none;
        filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 94%;will-change:left,top,width,transform,opacity
      }
      .aw-v32-flyer.ready{opacity:1}
      .aw-v32-flyer.perched{position:absolute!important;z-index:9!important;opacity:1!important}
      .aw-v32-flyer img{display:block;width:100%;height:auto}
      .aw-v32-eyelid{
        position:absolute;z-index:3;left:60.5%;top:25.5%;width:22%;height:8.8%;border-radius:50%;
        background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)
      }
      .aw-v32-flyer.wink .aw-v32-eyelid{animation:awV32Wink .42s ease-in-out 1}

      .aw-v32-bubble{
        position:absolute;z-index:10;left:28px;top:55px;width:min(150px,43vw);padding:8px 9px;
        border:2px solid #c49a35;border-radius:22px 24px 22px 19px;
        background:linear-gradient(180deg,#fffdf4,#f7f0d9);color:#0d4b3b;
        font:800 11.8px/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 11px rgba(0,0,0,.1);opacity:0;transform:translateY(5px) scale(.96);pointer-events:none
      }
      .aw-v32-bubble::after{
        content:"";position:absolute;right:-8px;top:48%;width:13px;height:13px;
        background:#fbf7e8;border-top:2px solid #c49a35;border-right:2px solid #c49a35;transform:rotate(45deg)
      }
      .aw-v32-bubble.show{animation:awV32Bubble .32s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV32Awake{0%,100%{filter:brightness(1);transform:scale(1)}50%{filter:brightness(1.08) drop-shadow(0 0 11px rgba(220,184,70,.35));transform:scale(1.015)}}
      @keyframes awV32Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV32Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV32Settle{0%{transform:rotate(0)}40%{transform:rotate(1deg)}75%{transform:rotate(-.3deg)}100%{transform:rotate(0)}}
      @keyframes awV32Bubble{to{opacity:1;transform:none}}
      @keyframes awV32Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .aw-v32-stage{height:184px!important;min-height:184px!important}
        .aw-v32-perch{right:-10px;top:99px;width:152px}
        .aw-v32-limbwrap,.aw-v32-limb{width:142px}
        .aw-v32-target{left:34px}
        .aw-v32-flyer{width:88px}
        .aw-v32-bubble{left:30px;top:52px;width:min(142px,42vw);font-size:11.4px;padding:7px 8px}
      }
      @media(min-width:701px){
        .aw-v32-stage{height:205px!important;min-height:205px!important}
        .aw-v32-perch{right:-18px;top:108px;width:170px}
        .aw-v32-limbwrap,.aw-v32-limb{width:160px}
        .aw-v32-flyer{width:96px}
        .aw-v32-bubble{left:66px;top:57px;width:174px;font-size:12.5px}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-v32-perch,.aw-v32-knot,.aw-v32-limbwrap,.aw-v32-flyer,.aw-v32-bubble,.aw-v32-eyelid{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v32-bark left';
    right.className = 'aw-v32-bark right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  async function loadApprovedAnnie() {
    const response = await fetch(ASSET, {cache:'no-store'});
    if (!response.ok) throw new Error(`Approved Annie asset returned ${response.status}`);
    const base64 = (await response.text()).replace(/\s+/g, '');
    const image = new Image();
    image.alt = '';
    image.decoding = 'async';
    image.src = `data:image/webp;base64,${base64}`;
    await new Promise((resolve, reject) => {
      if (image.complete && image.naturalWidth) return resolve();
      image.onload = resolve;
      image.onerror = () => reject(new Error('Approved Annie could not be decoded'));
    });
    return image;
  }

  function getStart(portrait, image) {
    const rect = portrait.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width * .48, 112), 156);
    const ratio = image.naturalHeight / image.naturalWidth;
    const height = width * ratio;
    return {
      width,
      left: rect.left + rect.width * .5 - width * .5,
      top: rect.top + rect.height * .46 - height * .5
    };
  }

  function getEnd(stage, target, image, width) {
    const stageRect = stage.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const height = width * (image.naturalHeight / image.naturalWidth);
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
    stage.className = 'aw-v32-stage';
    stage.innerHTML = `
      <div class="aw-v32-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw-v32-perch" aria-hidden="true">
        <div class="aw-v32-knot"></div>
        <div class="aw-v32-limbwrap">
          <div class="aw-v32-limb"></div>
          <span class="aw-v32-target"></span>
        </div>
      </div>`;
    portrait.insertAdjacentElement('afterend', stage);

    let image;
    try {
      image = await loadApprovedAnnie();
    } catch (error) {
      console.error('Annie asset failed to load.', error);
      return;
    }

    const flyer = document.createElement('div');
    flyer.className = 'aw-v32-flyer';
    flyer.setAttribute('aria-label', 'Arborwise Annie');
    flyer.appendChild(image);
    flyer.insertAdjacentHTML('beforeend', '<span class="aw-v32-eyelid"></span>');
    document.body.appendChild(flyer);

    const perch = stage.querySelector('.aw-v32-perch');
    const target = stage.querySelector('.aw-v32-target');
    const bubble = stage.querySelector('.aw-v32-bubble');
    let started = false;

    async function run() {
      if (started) return;
      started = true;
      portrait.classList.add('aw-v32-awake');
      perch.classList.add('grow');
      await wait(reducedMotion ? 0 : 600);

      const startPoint = getStart(portrait, image);
      Object.assign(flyer.style, {
        width:`${startPoint.width}px`,
        left:`${startPoint.left}px`,
        top:`${startPoint.top}px`,
        opacity:'1'
      });
      flyer.classList.add('ready');
      await wait(reducedMotion ? 0 : 160);

      const endWidth = window.innerWidth <= 480 ? 88 : 94;
      const end = getEnd(stage, target, image, endWidth);

      try {
        if (!reducedMotion && flyer.animate) {
          const middleLeft = (startPoint.left + end.left) / 2 + 8;
          const middleTop = Math.min(startPoint.top, end.top) - 18;
          await flyer.animate([
            {left:`${startPoint.left}px`,top:`${startPoint.top}px`,width:`${startPoint.width}px`,opacity:1,transform:'rotate(0deg) scale(1)'},
            {left:`${middleLeft}px`,top:`${middleTop}px`,width:`${(startPoint.width + endWidth) / 2}px`,opacity:1,transform:'rotate(4deg) scale(.98)',offset:.55},
            {left:`${end.left}px`,top:`${end.top}px`,width:`${endWidth}px`,opacity:1,transform:'rotate(0deg) scale(1)'}
          ], {duration:1200,easing:'cubic-bezier(.26,.72,.2,1)',fill:'forwards'}).finished;
        }
      } catch (error) {
        console.warn('Annie flight animation skipped to landing.', error);
      }

      flyer.getAnimations().forEach(animation => animation.cancel());
      flyer.classList.add('perched');
      flyer.style.position = 'absolute';
      flyer.style.left = `${end.localLeft}px`;
      flyer.style.top = `${end.localTop}px`;
      flyer.style.width = `${endWidth}px`;
      flyer.style.opacity = '1';
      flyer.style.transform = 'none';
      stage.appendChild(flyer);

      perch.classList.add('settle');
      await wait(reducedMotion ? 0 : 300);
      bubble.classList.add('show');
      await wait(reducedMotion ? 0 : 430);
      flyer.classList.add('wink');
      window.setTimeout(() => flyer.classList.remove('wink'), 520);
    }

    const visibleEnough = () => {
      const rect = section.getBoundingClientRect();
      return rect.top < window.innerHeight * .9 && rect.bottom > window.innerHeight * .08;
    };

    if (visibleEnough()) {
      run();
    } else if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        observer.disconnect();
        run();
      }, {threshold:0.01, rootMargin:'80px 0px 80px'});
      observer.observe(section);
      window.setTimeout(() => {
        if (visibleEnough()) {
          observer.disconnect();
          run();
        }
      }, 1200);
    } else {
      const onScroll = () => {
        if (!visibleEnough()) return;
        window.removeEventListener('scroll', onScroll);
        run();
      };
      window.addEventListener('scroll', onScroll, {passive:true});
      onScroll();
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => start().catch(console.error), {once:true});
  } else {
    start().catch(console.error);
  }
})();