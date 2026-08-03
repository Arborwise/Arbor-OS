(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function cleanup() {
    document.querySelectorAll(
      '#aw26Stage,#aw26Flyer,.aw26-bark,#awAnnieCharacter,#awAnnieScrollGuide,' +
      '#awAnnieBranchLayer,.aw-annie-landing-lane,.aw-annie-perch-lane,' +
      '.aw-annie-first-stage,.aw-oak-trunk-edge,.aw-v28-stage,.aw-v28-flyer,' +
      '.aw-v28-bark'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"]'
    ).forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-character-v28';
    style.textContent = `
      html body{overflow-x:hidden!important}
      html body button:focus-visible,html body a:focus-visible{outline:2px solid #c99c37!important;outline-offset:3px!important}

      .aw-v28-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:27px;pointer-events:none;opacity:.94;
        background:
          radial-gradient(ellipse at 38% 9%,rgba(22,10,5,.92) 0 8%,transparent 9%) 0 0/100% 173px,
          radial-gradient(ellipse at 68% 39%,rgba(25,12,6,.86) 0 9%,transparent 10%) 0 31px/100% 211px,
          radial-gradient(ellipse at 31% 76%,rgba(27,13,7,.78) 0 8%,transparent 9%) 0 0/100% 237px,
          linear-gradient(90deg,#1c0f09 0%,#4e3120 23%,#896448 48%,#4b2e1d 73%,#1a0d08 100%);
        filter:drop-shadow(0 0 5px rgba(20,10,5,.34))
      }
      .aw-v28-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(19,8,4,.7) 18% 25%,transparent 29% 50%,rgba(29,13,7,.62) 55% 63%,transparent 67%),
          linear-gradient(86deg,transparent 0 31%,rgba(226,190,137,.16) 37% 44%,transparent 48% 73%,rgba(14,7,4,.5) 79% 87%,transparent 91%)
      }
      .aw-v28-bark.left{left:0;clip-path:polygon(0 0,76% 0,93% 5%,68% 12%,94% 20%,70% 29%,97% 39%,66% 49%,92% 59%,71% 69%,96% 78%,67% 88%,86% 100%,0 100%)}
      .aw-v28-bark.right{right:0;clip-path:polygon(24% 0,100% 0,100% 100%,14% 100%,32% 91%,6% 82%,31% 72%,4% 62%,33% 52%,7% 42%,32% 31%,6% 21%,31% 11%)}

      .annie-callout{position:relative!important;display:block!important;overflow:visible!important}
      .annie-callout>img[data-annie]{display:block!important;margin:0 auto!important;position:relative!important;z-index:3!important;transform-origin:50% 48%!important}
      .annie-callout>img[data-annie].aw-v28-awake{animation:awV28Awake .72s ease-in-out both}

      .aw-v28-stage{
        position:relative!important;display:block!important;width:100%!important;height:196px!important;
        min-height:196px!important;margin:8px 0 12px!important;overflow:visible!important;isolation:isolate!important
      }
      .aw-v28-perch{position:absolute;right:-15px;top:106px;width:150px;height:52px;z-index:4;pointer-events:none}
      .aw-v28-knot{
        position:absolute;right:-3px;top:5px;width:42px;height:42px;border-radius:49% 51% 46% 54%;
        background:radial-gradient(circle at 48% 49%,#27140b 0 17%,#68452e 19% 34%,#2c180f 37% 45%,#8c6243 48% 67%,#402619 70% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24);opacity:0;transform:scale(.72)
      }
      .aw-v28-limbwrap{position:absolute;right:18px;top:17px;width:137px;height:31px;transform-origin:100% 50%;transform:scaleX(.04);opacity:0}
      .aw-v28-limb{
        position:absolute;right:0;top:9px;width:137px;height:13px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#966b49 0%,#6a432b 47%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.2)
      }
      .aw-v28-twig{position:absolute;left:10px;top:3px;width:46px;height:6px;border-radius:999px;background:linear-gradient(180deg,#815637,#45281a);transform:rotate(-22deg);transform-origin:100% 50%}
      .aw-v28-leaf{position:absolute;width:21px;height:13px;border-radius:80% 0 80% 0;background:linear-gradient(135deg,#a8cf75,#4f8d4d 62%,#245e38);box-shadow:inset 0 1px rgba(255,255,255,.24);opacity:0}
      .aw-v28-leaf.one{left:-2px;top:-9px;--leaf-rotate:-16deg;transform:rotate(var(--leaf-rotate)) scale(.3)}
      .aw-v28-leaf.two{left:21px;top:-13px;--leaf-rotate:20deg;transform:rotate(var(--leaf-rotate)) scale(.3)}
      .aw-v28-target{position:absolute;left:39px;top:15px;width:2px;height:2px}
      .aw-v28-stage.grow .aw-v28-knot{animation:awV28Knot .34s ease-out forwards}
      .aw-v28-stage.grow .aw-v28-limbwrap{animation:awV28Limb .66s .1s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v28-stage.grow .aw-v28-leaf{animation:awV28Leaf .3s .5s ease-out forwards}
      .aw-v28-perch.settle{animation:awV28Settle .5s ease-out}

      .aw-v28-flyer{position:fixed;z-index:9998;pointer-events:none;width:92px;height:auto;opacity:0;filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 90%}
      .aw-v28-flyer img{display:block;width:100%;height:auto}
      .aw-v28-eyelid{position:absolute;left:60.7%;top:25.2%;width:21%;height:8.5%;border-radius:50%;background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)}
      .aw-v28-flyer.wink .aw-v28-eyelid{animation:awV28Wink .42s ease-in-out 1}

      .aw-v28-bubble{
        position:absolute;z-index:8;left:8px;top:35px;width:184px;max-width:calc(100% - 135px);
        padding:10px 12px;border:3px solid #c49a35;border-radius:24px 26px 23px 18px;
        background:linear-gradient(180deg,#fffdf3,#f7f0d8);color:#0d4b3b;
        font:800 14px/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 10px rgba(0,0,0,.1);opacity:0;transform:translateY(8px) scale(.94);pointer-events:none
      }
      .aw-v28-bubble::after{
        content:"";position:absolute;right:-12px;top:46%;width:20px;height:20px;
        background:#fbf7e7;border-top:3px solid #c49a35;border-right:3px solid #c49a35;transform:rotate(45deg)
      }
      .aw-v28-bubble.show{animation:awV28Bubble .38s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV28Awake{0%,100%{transform:scale(1);filter:brightness(1)}50%{transform:scale(1.025);filter:brightness(1.08)}}
      @keyframes awV28Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV28Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV28Leaf{to{opacity:1;transform:rotate(var(--leaf-rotate)) scale(1)}}
      @keyframes awV28Settle{0%{transform:rotate(0)}40%{transform:rotate(1.2deg)}75%{transform:rotate(-.4deg)}100%{transform:rotate(0)}}
      @keyframes awV28Bubble{to{opacity:1;transform:none}}
      @keyframes awV28Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .aw-v28-bark{width:25px}
        .aw-v28-stage{height:190px!important;min-height:190px!important;margin-top:4px!important}
        .aw-v28-perch{right:-12px;top:101px;width:145px}
        .aw-v28-limbwrap,.aw-v28-limb{width:132px}
        .aw-v28-bubble{left:4px;top:31px;width:166px;max-width:calc(100% - 128px);padding:9px 10px;font-size:13px}
      }
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v28-bark left';
    right.className = 'aw-v28-bark right';
    document.body.append(left, right);
  }

  async function loadCleanAnnie() {
    const response = await fetch('assets/annie-clean-v26.b64?v=20260802-2055', {cache: 'no-store'});
    if (!response.ok) throw new Error(`Clean Annie asset returned ${response.status}`);
    const base64 = (await response.text()).trim();
    const image = new Image();
    image.alt = '';
    image.decoding = 'async';
    image.src = `data:image/webp;base64,${base64}`;
    try { await image.decode(); } catch { await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; }); }
    return image;
  }

  async function start() {
    cleanup();
    installStyles();
    installBark();

    const section = document.querySelector('.annie-callout');
    const source = section?.querySelector('img[data-annie],img');
    const copy = section?.querySelector(':scope > div');
    if (!section || !source || !copy) return;

    const stage = document.createElement('div');
    stage.className = 'aw-v28-stage';
    stage.innerHTML = `
      <div class="aw-v28-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw-v28-perch" aria-hidden="true">
        <div class="aw-v28-knot"></div>
        <div class="aw-v28-limbwrap">
          <div class="aw-v28-limb"></div>
          <div class="aw-v28-twig">
            <span class="aw-v28-leaf one"></span>
            <span class="aw-v28-leaf two"></span>
          </div>
          <span class="aw-v28-target"></span>
        </div>
      </div>`;
    section.insertBefore(stage, copy);

    const flyer = document.createElement('div');
    flyer.className = 'aw-v28-flyer';
    flyer.setAttribute('aria-label', 'Arborwise Annie');
    const image = await loadCleanAnnie();
    flyer.appendChild(image);
    flyer.insertAdjacentHTML('beforeend', '<span class="aw-v28-eyelid"></span>');
    document.body.appendChild(flyer);

    const target = stage.querySelector('.aw-v28-target');
    const perch = stage.querySelector('.aw-v28-perch');
    const bubble = stage.querySelector('.aw-v28-bubble');
    let landed = false;
    let launched = false;

    function targetPosition() {
      const rect = target.getBoundingClientRect();
      const width = window.innerWidth <= 480 ? 88 : 92;
      const height = width * (315 / 219);
      return {
        width,
        left: rect.left - width * .53,
        top: rect.top - height + 12
      };
    }

    function keepOnPerch() {
      if (!landed) return;
      const end = targetPosition();
      flyer.style.left = `${end.left}px`;
      flyer.style.top = `${end.top}px`;
      flyer.style.width = `${end.width}px`;
      flyer.style.opacity = '1';
    }

    async function launch() {
      if (launched) return;
      launched = true;
      stage.classList.add('grow');
      source.classList.add('aw-v28-awake');

      const rect = source.getBoundingClientRect();
      const startWidth = Math.max(118, Math.min(218, rect.width * .56));
      const startLeft = rect.left + (rect.width - startWidth) / 2;
      const startTop = rect.top + rect.height * .09;
      flyer.style.left = `${startLeft}px`;
      flyer.style.top = `${startTop}px`;
      flyer.style.width = `${startWidth}px`;
      flyer.style.opacity = '0';

      await wait(reduced ? 0 : 260);
      const end = targetPosition();

      if (reduced) {
        Object.assign(flyer.style, {
          left: `${end.left}px`, top: `${end.top}px`, width: `${end.width}px`, opacity: '1'
        });
      } else {
        const midLeft = (startLeft + end.left) / 2 - 8;
        const midTop = Math.min(startTop, end.top) - 22;
        await flyer.animate([
          {left: `${startLeft}px`, top: `${startTop}px`, width: `${startWidth}px`, opacity: 0, transform: 'rotate(0deg) scale(.98)'},
          {offset: .12, opacity: 1},
          {offset: .63, left: `${midLeft}px`, top: `${midTop}px`, transform: 'rotate(2deg) scale(1)'},
          {left: `${end.left}px`, top: `${end.top}px`, width: `${end.width}px`, opacity: 1, transform: 'rotate(0deg) scale(1)'}
        ], {duration: 1350, easing: 'cubic-bezier(.28,.72,.22,1)', fill: 'forwards'}).finished;
        Object.assign(flyer.style, {
          left: `${end.left}px`, top: `${end.top}px`, width: `${end.width}px`, opacity: '1', transform: 'none'
        });
      }

      landed = true;
      perch.classList.add('settle');
      await wait(reduced ? 0 : 180);
      bubble.classList.add('show');
      await wait(reduced ? 0 : 380);
      flyer.classList.add('wink');
      window.setTimeout(() => flyer.classList.remove('wink'), 520);
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .22)) {
        observer.disconnect();
        launch().catch(error => console.error('Annie launch failed.', error));
      }
    }, {threshold: [.22, .4]});
    observer.observe(source);

    let frame = 0;
    window.addEventListener('scroll', () => {
      if (!landed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(keepOnPerch);
    }, {passive: true});
    window.addEventListener('resize', keepOnPerch, {passive: true});
  }

  start().catch(error => console.error('The Annie sequence could not start.', error));
})();
