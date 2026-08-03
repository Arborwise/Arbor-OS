(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));

  function cleanup() {
    document.querySelectorAll(
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,' +
      '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,' +
      '.aw-oak-trunk-edge,.aw26-bark,.aw26-stage,.aw-v28-bark,.aw-v28-stage,.aw-v28-flyer,' +
      '.aw-v29-bark,.aw-v29-stage,.aw-v29-flyer'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"]'
    ).forEach(node => node.remove());

    const oldFrame = document.querySelector('.aw-v29-portrait');
    if (oldFrame) {
      const image = oldFrame.querySelector('img[data-annie]');
      if (image) oldFrame.replaceWith(image);
      else oldFrame.remove();
    }
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-character-v29';
    style.textContent = `
      html body{overflow-x:hidden!important}

      .annie-callout{
        position:relative!important;display:block!important;min-height:0!important;
        margin:0 auto 34px!important;padding:14px 18px 32px!important;
        overflow:visible!important;align-items:start!important;gap:0!important
      }
      .aw-v29-portrait{
        position:relative;width:min(82vw,340px);aspect-ratio:1;margin:0 auto 4px;
        overflow:hidden;border:6px solid #d3a33a;border-radius:50%;
        background:#073d30;box-shadow:0 11px 22px rgba(5,30,23,.17),inset 0 0 0 2px rgba(255,255,255,.08)
      }
      .aw-v29-portrait>img[data-annie]{
        position:absolute!important;z-index:2!important;left:50%!important;top:50%!important;
        width:94%!important;height:94%!important;max-width:none!important;margin:0!important;
        object-fit:contain!important;transform:translate(-50%,-50%) scale(.94)!important;
        transform-origin:50% 50%!important;filter:drop-shadow(0 12px 12px rgba(0,0,0,.18))!important
      }
      .aw-v29-portrait>img[data-annie].aw-v29-awake{animation:awV29Awake .72s ease-in-out both}

      .annie-callout>:not(.aw-v29-portrait):not(.aw-v29-stage){position:relative;z-index:3}
      .annie-callout>.aw-v29-stage+div{margin-top:0!important;padding-top:0!important;text-align:center!important}
      .annie-callout>.aw-v29-stage+div .section-label{margin:0 auto 18px!important}

      .aw-v29-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:27px;pointer-events:none;opacity:.94;
        background:
          radial-gradient(ellipse at 38% 9%,rgba(22,10,5,.92) 0 8%,transparent 9%) 0 0/100% 173px,
          radial-gradient(ellipse at 68% 39%,rgba(25,12,6,.86) 0 9%,transparent 10%) 0 31px/100% 211px,
          radial-gradient(ellipse at 31% 76%,rgba(27,13,7,.78) 0 8%,transparent 9%) 0 0/100% 237px,
          linear-gradient(90deg,#1c0f09 0%,#4e3120 23%,#896448 48%,#4b2e1d 73%,#1a0d08 100%);
        filter:drop-shadow(0 0 5px rgba(20,10,5,.34))
      }
      .aw-v29-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(19,8,4,.7) 18% 25%,transparent 29% 50%,rgba(29,13,7,.62) 55% 63%,transparent 67%),
          linear-gradient(86deg,transparent 0 31%,rgba(226,190,137,.16) 37% 44%,transparent 48% 73%,rgba(14,7,4,.5) 79% 87%,transparent 91%)
      }
      .aw-v29-bark.left{left:0;clip-path:polygon(0 0,76% 0,93% 5%,68% 12%,94% 20%,70% 29%,97% 39%,66% 49%,92% 59%,71% 69%,96% 78%,67% 88%,86% 100%,0 100%)}
      .aw-v29-bark.right{right:0;clip-path:polygon(24% 0,100% 0,100% 100%,14% 100%,32% 91%,6% 82%,31% 72%,4% 62%,33% 52%,7% 42%,32% 31%,6% 21%,31% 11%)}

      .aw-v29-stage{
        position:relative!important;display:block!important;width:100%!important;height:178px!important;
        min-height:178px!important;margin:0 0 6px!important;overflow:visible!important;isolation:isolate!important
      }
      .aw-v29-perch{position:absolute;right:-12px;top:96px;width:160px;height:52px;z-index:4;pointer-events:none}
      .aw-v29-knot{
        position:absolute;right:-3px;top:5px;width:42px;height:42px;border-radius:49% 51% 46% 54%;
        background:radial-gradient(circle at 48% 49%,#27140b 0 17%,#68452e 19% 34%,#2c180f 37% 45%,#8c6243 48% 67%,#402619 70% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24);opacity:0;transform:scale(.72)
      }
      .aw-v29-limbwrap{position:absolute;right:18px;top:17px;width:150px;height:31px;transform-origin:100% 50%;transform:scaleX(.04);opacity:0}
      .aw-v29-limb{
        position:absolute;right:0;top:9px;width:150px;height:13px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#966b49 0%,#6a432b 47%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.2)
      }
      .aw-v29-twig{position:absolute;left:12px;top:3px;width:49px;height:6px;border-radius:999px;background:linear-gradient(180deg,#815637,#45281a);transform:rotate(-22deg);transform-origin:100% 50%}
      .aw-v29-leaf{position:absolute;width:21px;height:13px;border-radius:80% 0 80% 0;background:linear-gradient(135deg,#a8cf75,#4f8d4d 62%,#245e38);box-shadow:inset 0 1px rgba(255,255,255,.24);opacity:0}
      .aw-v29-leaf.one{left:-2px;top:-9px;--leaf-rotate:-16deg;transform:rotate(var(--leaf-rotate)) scale(.3)}
      .aw-v29-leaf.two{left:22px;top:-13px;--leaf-rotate:20deg;transform:rotate(var(--leaf-rotate)) scale(.3)}
      .aw-v29-target{position:absolute;left:44px;top:15px;width:2px;height:2px}
      .aw-v29-stage.grow .aw-v29-knot{animation:awV29Knot .34s ease-out forwards}
      .aw-v29-stage.grow .aw-v29-limbwrap{animation:awV29Limb .66s .1s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v29-stage.grow .aw-v29-leaf{animation:awV29Leaf .3s .5s ease-out forwards}
      .aw-v29-perch.settle{animation:awV29Settle .5s ease-out}

      .aw-v29-flyer{
        position:fixed;z-index:9998;pointer-events:none;width:92px;height:132px;opacity:0;
        filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 88%
      }
      .aw-v29-body{position:absolute;left:0;top:0;display:block;width:100%;height:auto}
      .aw-v29-foot{position:absolute;z-index:3;top:80%;width:29%;height:20%;display:flex;justify-content:center;align-items:flex-start}
      .aw-v29-foot.left{left:22%;transform:rotate(3deg)}
      .aw-v29-foot.right{right:22%;transform:rotate(-3deg)}
      .aw-v29-foot i{
        display:block;width:36%;height:88%;margin-left:-2px;border:1px solid #8d4f08;border-radius:53% 53% 44% 44%;
        background:linear-gradient(90deg,#d8860e 0%,#ffc13f 45%,#e79a18 100%);box-shadow:inset 1px 1px rgba(255,255,255,.28)
      }
      .aw-v29-foot i::after{content:"";display:block;width:58%;height:23%;margin:88% auto 0;border-radius:0 0 70% 70%;background:#4e2c19}
      .aw-v29-eyelid{position:absolute;z-index:5;left:60.7%;top:25.2%;width:21%;height:8.5%;border-radius:50%;background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)}
      .aw-v29-flyer.wink .aw-v29-eyelid{animation:awV29Wink .42s ease-in-out 1}

      .aw-v29-bubble{
        position:absolute;z-index:8;left:7px;top:34px;width:166px;max-width:calc(100% - 128px);
        padding:9px 10px;border:2px solid #c49a35;border-radius:23px 25px 23px 18px;
        background:linear-gradient(180deg,#fffdf3,#f7f0d8);color:#0d4b3b;
        font:800 13px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 10px rgba(0,0,0,.1);opacity:0;transform:translateY(7px) scale(.95);pointer-events:none
      }
      .aw-v29-bubble::after{
        content:"";position:absolute;right:-10px;top:45%;width:17px;height:17px;
        background:#fbf7e7;border-top:2px solid #c49a35;border-right:2px solid #c49a35;transform:rotate(45deg)
      }
      .aw-v29-bubble.show{animation:awV29Bubble .38s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV29Awake{0%,100%{transform:translate(-50%,-50%) scale(.94);filter:brightness(1)}50%{transform:translate(-50%,-50%) scale(.965);filter:brightness(1.08)}}
      @keyframes awV29Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV29Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV29Leaf{to{opacity:1;transform:rotate(var(--leaf-rotate)) scale(1)}}
      @keyframes awV29Settle{0%{transform:rotate(0)}40%{transform:rotate(1.1deg)}75%{transform:rotate(-.35deg)}100%{transform:rotate(0)}}
      @keyframes awV29Bubble{to{opacity:1;transform:none}}
      @keyframes awV29Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .annie-callout{padding-top:10px!important}
        .aw-v29-portrait{width:min(78vw,310px);margin-bottom:2px}
        .aw-v29-bark{width:25px}
        .aw-v29-stage{height:172px!important;min-height:172px!important}
        .aw-v29-perch{right:-10px;top:92px;width:153px}
        .aw-v29-limbwrap,.aw-v29-limb{width:143px}
        .aw-v29-target{left:41px}
        .aw-v29-bubble{left:3px;top:31px;width:158px;max-width:calc(100% - 124px);font-size:12.5px}
      }
      @media(min-width:701px){
        .annie-callout{padding:22px 34px 38px!important}
        .aw-v29-stage{height:188px!important;min-height:188px!important}
        .aw-v29-perch{right:-22px;top:102px;width:178px}
        .aw-v29-limbwrap,.aw-v29-limb{width:166px}
        .aw-v29-bubble{width:178px;font-size:13.5px}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-v29-portrait>img,.aw-v29-knot,.aw-v29-limbwrap,.aw-v29-leaf,.aw-v29-perch,.aw-v29-flyer,.aw-v29-bubble,.aw-v29-eyelid{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v29-bark left';
    right.className = 'aw-v29-bark right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  function framePortrait(source) {
    const frame = document.createElement('div');
    frame.className = 'aw-v29-portrait';
    source.parentNode.insertBefore(frame, source);
    frame.appendChild(source);
    return frame;
  }

  async function loadCleanAnnie() {
    const response = await fetch('assets/annie-clean-v26.b64?v=20260802-2115', {cache: 'no-store'});
    if (!response.ok) throw new Error(`Clean Annie asset returned ${response.status}`);
    const base64 = (await response.text()).trim();
    const image = new Image();
    image.className = 'aw-v29-body';
    image.alt = '';
    image.decoding = 'async';
    image.src = `data:image/webp;base64,${base64}`;
    try { await image.decode(); }
    catch { await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = reject; }); }
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

    const portrait = framePortrait(source);

    const stage = document.createElement('div');
    stage.className = 'aw-v29-stage';
    stage.innerHTML = `
      <div class="aw-v29-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw-v29-perch" aria-hidden="true">
        <div class="aw-v29-knot"></div>
        <div class="aw-v29-limbwrap">
          <div class="aw-v29-limb"></div>
          <div class="aw-v29-twig">
            <span class="aw-v29-leaf one"></span>
            <span class="aw-v29-leaf two"></span>
          </div>
          <span class="aw-v29-target"></span>
        </div>
      </div>`;
    portrait.insertAdjacentElement('afterend', stage);

    const flyer = document.createElement('div');
    flyer.className = 'aw-v29-flyer';
    flyer.setAttribute('aria-label', 'Arborwise Annie');
    const image = await loadCleanAnnie();
    flyer.appendChild(image);
    flyer.insertAdjacentHTML('beforeend', `
      <span class="aw-v29-foot left"><i></i><i></i><i></i></span>
      <span class="aw-v29-foot right"><i></i><i></i><i></i></span>
      <span class="aw-v29-eyelid"></span>`);
    document.body.appendChild(flyer);

    const target = stage.querySelector('.aw-v29-target');
    const perch = stage.querySelector('.aw-v29-perch');
    const bubble = stage.querySelector('.aw-v29-bubble');
    let landed = false;
    let launched = false;

    function targetPosition() {
      const rect = target.getBoundingClientRect();
      const width = window.innerWidth <= 480 ? 88 : 94;
      const height = width * 1.43;
      return {width, height, left: rect.left - width * .53, top: rect.top - height * .88};
    }

    function keepOnPerch() {
      if (!landed) return;
      const end = targetPosition();
      Object.assign(flyer.style, {
        left: `${end.left}px`, top: `${end.top}px`, width: `${end.width}px`, height: `${end.height}px`, opacity: '1'
      });
    }

    async function launch() {
      if (launched) return;
      launched = true;
      stage.classList.add('grow');
      source.classList.add('aw-v29-awake');

      const rect = portrait.getBoundingClientRect();
      const startWidth = Math.max(128, Math.min(220, rect.width * .62));
      const startHeight = startWidth * 1.43;
      const startLeft = rect.left + (rect.width - startWidth) / 2;
      const startTop = rect.top + rect.height * .04;
      Object.assign(flyer.style, {
        left: `${startLeft}px`, top: `${startTop}px`, width: `${startWidth}px`, height: `${startHeight}px`, opacity: '0'
      });

      await wait(reduced ? 0 : 280);
      const end = targetPosition();

      if (reduced) {
        Object.assign(flyer.style, {
          left: `${end.left}px`, top: `${end.top}px`, width: `${end.width}px`, height: `${end.height}px`, opacity: '1'
        });
      } else {
        const midLeft = (startLeft + end.left) / 2 - 5;
        const midTop = Math.min(startTop, end.top) - 20;
        await flyer.animate([
          {left:`${startLeft}px`,top:`${startTop}px`,width:`${startWidth}px`,height:`${startHeight}px`,opacity:0,transform:'rotate(0deg) scale(.98)'},
          {offset:.12,opacity:1},
          {offset:.62,left:`${midLeft}px`,top:`${midTop}px`,transform:'rotate(2deg) scale(1)'},
          {left:`${end.left}px`,top:`${end.top}px`,width:`${end.width}px`,height:`${end.height}px`,opacity:1,transform:'rotate(0deg) scale(1)'}
        ], {duration:1380,easing:'cubic-bezier(.28,.72,.22,1)',fill:'forwards'}).finished;
        Object.assign(flyer.style, {
          left:`${end.left}px`,top:`${end.top}px`,width:`${end.width}px`,height:`${end.height}px`,opacity:'1',transform:'none'
        });
      }

      landed = true;
      perch.classList.add('settle');
      await wait(reduced ? 0 : 190);
      bubble.classList.add('show');
      await wait(reduced ? 0 : 380);
      flyer.classList.add('wink');
      window.setTimeout(() => flyer.classList.remove('wink'), 520);
    }

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio >= .08)) {
        observer.disconnect();
        launch().catch(error => console.error('Annie launch failed.', error));
      }
    }, {threshold:[.08,.2]});
    observer.observe(portrait);

    window.setTimeout(() => {
      if (launched) return;
      const rect = portrait.getBoundingClientRect();
      if (rect.bottom > 40 && rect.top < window.innerHeight * 1.15) {
        observer.disconnect();
        launch().catch(error => console.error('Annie fallback launch failed.', error));
      }
    }, 900);

    let frame = 0;
    window.addEventListener('scroll', () => {
      if (!landed) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(keepOnPerch);
    }, {passive:true});
    window.addEventListener('resize', keepOnPerch, {passive:true});
  }

  start().catch(error => console.error('The Annie sequence could not start.', error));
})();
