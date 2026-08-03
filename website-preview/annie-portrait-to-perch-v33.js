(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const ASSET = 'assets/annie-approved-flight-v30.b64?v=20260802-2255';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function cleanup() {
    document.querySelectorAll(
      '.aw-v33-bark,.aw-v33-stage,.aw-v33-flyer,' +
      '.aw-v32-bark,.aw-v32-stage,.aw-v32-flyer,' +
      '.aw-v31-bark,.aw-v31-stage,.aw-v31-flyer,' +
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
    style.id = 'arborwise-annie-portrait-to-perch-v33';
    style.textContent = `
      html body{overflow-x:hidden!important}
      .annie-callout{position:relative!important;overflow:visible!important}
      .annie-callout img[data-annie],.annie-callout>img{position:relative;z-index:3;transform-origin:50% 48%}
      .aw-v33-awake{animation:awV33Awake .72s ease-in-out both}

      .aw-v33-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:26px;pointer-events:none;opacity:.95;
        background:
          radial-gradient(ellipse at 34% 8%,rgba(20,9,5,.92) 0 8%,transparent 9%) 0 0/100% 171px,
          radial-gradient(ellipse at 70% 35%,rgba(24,11,6,.86) 0 9%,transparent 10%) 0 29px/100% 209px,
          linear-gradient(90deg,#1a0d08 0%,#503321 22%,#896448 48%,#4a2d1c 74%,#170b07 100%);
        filter:drop-shadow(0 0 5px rgba(18,9,5,.38))
      }
      .aw-v33-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(17,7,4,.72) 18% 25%,transparent 29% 52%,rgba(27,12,6,.62) 56% 64%,transparent 68%),
          linear-gradient(86deg,transparent 0 31%,rgba(232,195,141,.16) 37% 44%,transparent 48% 73%,rgba(12,6,3,.52) 79% 87%,transparent 91%)
      }
      .aw-v33-bark.left{left:0;clip-path:polygon(0 0,77% 0,94% 5%,67% 12%,95% 20%,70% 29%,98% 39%,66% 49%,92% 59%,70% 69%,97% 78%,66% 88%,87% 100%,0 100%)}
      .aw-v33-bark.right{right:0;clip-path:polygon(23% 0,100% 0,100% 100%,13% 100%,33% 91%,5% 82%,32% 72%,3% 62%,34% 52%,6% 42%,33% 31%,5% 21%,32% 11%)}

      .aw-v33-stage{
        position:relative!important;display:block!important;width:100%!important;height:178px!important;
        min-height:178px!important;margin:8px 0 6px!important;overflow:visible!important;isolation:isolate!important
      }
      .aw-v33-perch{position:absolute;z-index:5;right:-15px;top:99px;width:178px;height:47px;pointer-events:none}
      .aw-v33-knot{
        position:absolute;right:-3px;top:3px;width:40px;height:40px;border-radius:48% 52% 45% 55%;
        background:radial-gradient(circle at 48% 49%,#251209 0 17%,#6d482f 20% 34%,#2b170e 37% 45%,#906546 48% 68%,#3b2216 71% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24);
        opacity:0;transform:scale(.72)
      }
      .aw-v33-limbwrap{position:absolute;right:18px;top:15px;width:168px;height:27px;transform-origin:100% 50%;opacity:0;transform:scaleX(.04)}
      .aw-v33-limb{
        position:absolute;right:0;top:7px;width:168px;height:13px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#9a6e4b 0%,#6c452c 48%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.21)
      }
      .aw-v33-limb::before,.aw-v33-limb::after{content:"";position:absolute;height:2px;border-radius:999px;background:rgba(47,26,16,.42)}
      .aw-v33-limb::before{left:12%;right:9%;top:4px;transform:rotate(-1deg)}
      .aw-v33-limb::after{left:6%;right:28%;bottom:3px;transform:rotate(1deg)}
      .aw-v33-target{position:absolute;left:40px;top:11px;width:2px;height:2px}
      .aw-v33-perch.grow .aw-v33-knot{animation:awV33Knot .32s ease-out forwards}
      .aw-v33-perch.grow .aw-v33-limbwrap{animation:awV33Limb .58s .08s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v33-perch.settle{animation:awV33Settle .46s ease-out}

      .aw-v33-flyer{
        position:fixed;z-index:9998;width:94px;height:auto;opacity:0;pointer-events:none;
        filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 98%;will-change:left,top,width,transform,opacity
      }
      .aw-v33-flyer.ready{opacity:1}
      .aw-v33-flyer.perched{position:absolute!important;z-index:9!important;opacity:1!important}
      .aw-v33-flyer img{display:block;width:100%;height:auto}
      .aw-v33-eyelid{
        position:absolute;z-index:3;left:60.2%;top:25.8%;width:22%;height:8.6%;border-radius:50%;
        background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)
      }
      .aw-v33-flyer.wink .aw-v33-eyelid{animation:awV33Wink .42s ease-in-out 1}

      .aw-v33-bubble{
        position:absolute;z-index:10;right:128px;top:43px;width:min(164px,44vw);padding:8px 9px;
        border:2px solid #c49a35;border-radius:22px 24px 22px 19px;
        background:linear-gradient(180deg,#fffdf4,#f7f0d9);color:#0d4b3b;
        font:800 11.7px/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 11px rgba(0,0,0,.1);opacity:0;transform:translateY(5px) scale(.96);pointer-events:none
      }
      .aw-v33-bubble::after{
        content:"";position:absolute;right:-8px;top:52%;width:13px;height:13px;
        background:#fbf7e8;border-top:2px solid #c49a35;border-right:2px solid #c49a35;transform:rotate(45deg)
      }
      .aw-v33-bubble.show{animation:awV33Bubble .32s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV33Awake{0%,100%{filter:brightness(1);transform:scale(1)}50%{filter:brightness(1.08) drop-shadow(0 0 10px rgba(220,184,70,.32));transform:scale(1.012)}}
      @keyframes awV33Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV33Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV33Settle{0%{transform:rotate(0)}40%{transform:rotate(.8deg)}75%{transform:rotate(-.25deg)}100%{transform:rotate(0)}}
      @keyframes awV33Bubble{to{opacity:1;transform:none}}
      @keyframes awV33Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .aw-v33-stage{height:172px!important;min-height:172px!important}
        .aw-v33-perch{right:-12px;top:96px;width:172px}
        .aw-v33-limbwrap,.aw-v33-limb{width:162px}
        .aw-v33-target{left:38px}
        .aw-v33-flyer{width:90px}
        .aw-v33-bubble{right:116px;top:42px;width:min(148px,42vw);font-size:11.2px;padding:7px 8px}
      }
      @media(min-width:701px){
        .aw-v33-stage{height:190px!important;min-height:190px!important}
        .aw-v33-perch{right:-18px;top:102px;width:184px}
        .aw-v33-limbwrap,.aw-v33-limb{width:174px}
        .aw-v33-flyer{width:98px}
        .aw-v33-bubble{right:145px;top:46px;width:178px;font-size:12.2px}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-v33-perch,.aw-v33-knot,.aw-v33-limbwrap,.aw-v33-flyer,.aw-v33-bubble,.aw-v33-eyelid{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v33-bark left';
    right.className = 'aw-v33-bark right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  async function makeAnnieImage() {
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

  function startPointFor(portrait, image) {
    const rect = portrait.getBoundingClientRect();
    const width = Math.min(Math.max(rect.width * .52, 126), 196);
    const height = width * (image.naturalHeight / image.naturalWidth);
    return {
      width,
      left: rect.left + rect.width * .50 - width * .50,
      top: rect.top + rect.height * .13
    };
  }

  function endPointFor(stage, target, image, width) {
    const stageRect = stage.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const height = width * (image.naturalHeight / image.naturalWidth);
    const left = targetRect.left - width * .5;
    const top = targetRect.top - height + 4;
    return {
      left,
      top,
      localLeft: left - stageRect.left,
      localTop: top - stageRect.top
    };
  }

  async function start() {
    cleanup();
    installStyles();
    installBark();

    const section = document.querySelector('.annie-callout');
    const portrait = section?.querySelector('img[data-annie],img');
    if (!section || !portrait) {
      console.error('Ask Annie portrait was not found.');
      return;
    }

    const stage = document.createElement('div');
    stage.className = 'aw-v33-stage';
    stage.innerHTML = `
      <div class="aw-v33-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw-v33-perch" aria-hidden="true">
        <div class="aw-v33-knot"></div>
        <div class="aw-v33-limbwrap">
          <div class="aw-v33-limb"></div>
          <span class="aw-v33-target"></span>
        </div>
      </div>`;
    portrait.insertAdjacentElement('afterend', stage);

    const flyer = document.createElement('div');
    flyer.className = 'aw-v33-flyer';
    flyer.setAttribute('aria-label', 'Arborwise Annie');
    const image = await makeAnnieImage();
    flyer.appendChild(image);
    flyer.insertAdjacentHTML('beforeend', '<span class="aw-v33-eyelid"></span>');
    document.body.appendChild(flyer);

    const perch = stage.querySelector('.aw-v33-perch');
    const target = stage.querySelector('.aw-v33-target');
    const bubble = stage.querySelector('.aw-v33-bubble');
    let started = false;

    async function run() {
      if (started) return;
      started = true;
      portrait.classList.add('aw-v33-awake');
      perch.classList.add('grow');
      await wait(reducedMotion ? 0 : 520);

      const startPoint = startPointFor(portrait, image);
      Object.assign(flyer.style, {
        width:`${startPoint.width}px`,
        left:`${startPoint.left}px`,
        top:`${startPoint.top}px`,
        opacity:'1'
      });
      flyer.classList.add('ready');

      const endWidth = window.innerWidth <= 480 ? 90 : 96;
      const end = endPointFor(stage, target, image, endWidth);

      if (!reducedMotion && flyer.animate) {
        const middleLeft = (startPoint.left + end.left) / 2 + 10;
        const middleTop = Math.min(startPoint.top, end.top) - 18;
        const motion = flyer.animate([
          {left:`${startPoint.left}px`,top:`${startPoint.top}px`,width:`${startPoint.width}px`,opacity:.22,transform:'rotate(0deg) scale(.98)'},
          {offset:.14,left:`${startPoint.left}px`,top:`${startPoint.top}px`,width:`${startPoint.width}px`,opacity:1,transform:'rotate(0deg) scale(1)'},
          {offset:.58,left:`${middleLeft}px`,top:`${middleTop}px`,width:`${(startPoint.width + endWidth) / 2}px`,opacity:1,transform:'rotate(2.5deg) scale(.995)'},
          {left:`${end.left}px`,top:`${end.top}px`,width:`${endWidth}px`,opacity:1,transform:'rotate(0deg) scale(1)'}
        ], {duration:1450,easing:'cubic-bezier(.24,.72,.2,1)',fill:'forwards'});
        await motion.finished.catch(() => undefined);
        motion.cancel();
      }

      stage.appendChild(flyer);
      flyer.classList.add('perched');
      Object.assign(flyer.style, {
        width:`${endWidth}px`,
        left:`${end.localLeft}px`,
        top:`${end.localTop}px`,
        opacity:'1',
        transform:'none'
      });

      perch.classList.add('settle');
      await wait(reducedMotion ? 0 : 250);
      bubble.classList.add('show');
      await wait(reducedMotion ? 0 : 430);
      flyer.classList.add('wink');
      window.setTimeout(() => flyer.classList.remove('wink'), 520);
    }

    function visibleEnough() {
      const rect = portrait.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight * .9;
    }

    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      observer.disconnect();
      window.removeEventListener('scroll', check);
      run().catch(error => console.error('Annie portrait-to-perch sequence failed.', error));
    }, {threshold:[0,.08,.2]});

    function check() {
      if (!visibleEnough()) return;
      observer.disconnect();
      window.removeEventListener('scroll', check);
      run().catch(error => console.error('Annie portrait-to-perch sequence failed.', error));
    }

    observer.observe(portrait);
    window.addEventListener('scroll', check, {passive:true});
    window.setTimeout(check, 80);
    window.setTimeout(check, 900);
  }

  start().catch(error => console.error('The Annie portrait-to-perch sequence could not start.', error));
})();