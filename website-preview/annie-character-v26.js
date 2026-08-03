(() => {
  'use strict';

  const ANNIE_SOURCE = 'assets/annie.webp';
  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let source;
  let stage;
  let flyer;
  let bubble;
  let launched = false;

  function cleanup() {
    document.querySelectorAll(
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,' +
      '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,' +
      '.aw-oak-trunk-edge,.aw-v26-stage,.aw-v26-flyer,.aw-v26-bubble,' +
      '.aw-v26-perch,.aw-bark-rail,.aw-annie-guide'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-flight-correction-"],' +
      '[id^="arborwise-annie-perch-flight-"],[id^="arborwise-annie-character-"]'
    ).forEach(node => node.remove());
  }

  function addStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-character-v26';
    style.textContent = `
      html body{overflow-x:hidden!important}
      ${SOURCE_SELECTOR}{will-change:opacity,filter,transform;transform-origin:50% 45%}
      ${SOURCE_SELECTOR}.aw-v26-source-awake{animation:awV26SourceAwake .65s ease-in-out both}

      .aw-oak-trunk-edge{
        position:fixed;z-index:2;top:0;bottom:0;width:28px;pointer-events:none;opacity:.94;
        background:
          radial-gradient(ellipse at 34% 8%,rgba(22,11,6,.94) 0 7%,transparent 8%) 0 0/100% 149px,
          radial-gradient(ellipse at 69% 36%,rgba(25,12,7,.86) 0 8%,transparent 9%) 0 31px/100% 181px,
          linear-gradient(90deg,#1d0f09 0%,#4b2e1d 22%,#815d40 48%,#4b301f 72%,#1a0d08 100%);
        filter:drop-shadow(0 0 5px rgba(25,13,7,.35));
      }
      .aw-oak-trunk-edge::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(19,9,5,.72) 17% 24%,transparent 27% 51%,rgba(21,10,6,.58) 55% 62%,transparent 66%),
          linear-gradient(86deg,transparent 0 39%,rgba(230,197,148,.16) 43% 47%,transparent 51% 77%,rgba(13,6,4,.48) 81% 86%,transparent 90%);
      }
      .aw-oak-trunk-edge.left{left:0;clip-path:polygon(0 0,75% 0,93% 5%,68% 11%,91% 18%,70% 27%,96% 36%,69% 45%,90% 54%,72% 64%,95% 73%,69% 82%,88% 91%,75% 100%,0 100%)}
      .aw-oak-trunk-edge.right{right:0;clip-path:polygon(25% 0,100% 0,100% 100%,23% 100%,10% 92%,31% 83%,7% 73%,30% 64%,9% 54%,32% 44%,8% 34%,29% 24%,11% 14%,31% 6%)}

      .annie-callout{position:relative!important;overflow:visible!important}
      .aw-v26-stage{
        position:relative!important;display:block!important;width:100%!important;height:250px!important;
        min-height:250px!important;margin:22px 0 8px!important;overflow:visible!important;
        grid-column:1/-1!important;isolation:isolate!important;
      }
      .aw-v26-perch{
        position:absolute;z-index:4;right:-27px;top:116px;width:190px;height:78px;pointer-events:none;
      }
      .aw-v26-knot{
        position:absolute;right:0;top:20px;width:48px;height:48px;border-radius:50% 44% 48% 52%;
        background:radial-gradient(ellipse at 48% 48%,#251109 0 16%,#714a31 19% 34%,#2d170d 37% 46%,#916643 49% 66%,#3a2114 69% 100%);
        box-shadow:inset 4px 0 7px rgba(255,255,255,.08),inset -4px 0 8px rgba(16,7,4,.45),0 3px 7px rgba(0,0,0,.24);
        opacity:0;transform:scale(.68);
      }
      .aw-v26-limb-wrap{position:absolute;inset:0;transform-origin:100% 58%;transform:scaleX(.03);opacity:0}
      .aw-v26-limb{
        position:absolute;right:28px;top:42px;width:160px;height:15px;
        clip-path:polygon(0 24%,13% 10%,29% 18%,43% 5%,58% 16%,73% 7%,88% 20%,100% 14%,100% 82%,85% 73%,70% 91%,56% 78%,40% 93%,25% 79%,11% 89%,0 72%);
        background:linear-gradient(180deg,rgba(255,255,255,.13) 0 8%,transparent 9%),linear-gradient(180deg,#90603d 0%,#684028 48%,#342016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.1),0 4px 6px rgba(0,0,0,.2);
      }
      .aw-v26-limb::before,.aw-v26-limb::after{content:"";position:absolute;height:2px;border-radius:999px;background:rgba(34,18,11,.42)}
      .aw-v26-limb::before{left:17%;right:8%;top:5px;transform:rotate(-2deg)}
      .aw-v26-limb::after{left:6%;right:33%;bottom:3px;transform:rotate(2deg)}
      .aw-v26-twig{
        position:absolute;left:18px;top:34px;width:48px;height:6px;border-radius:999px;
        background:linear-gradient(180deg,#805335,#3d2418);transform:rotate(-17deg);transform-origin:100% 50%;
      }
      .aw-v26-leaf-stem{position:absolute;width:23px;height:3px;border-radius:999px;background:#4b301d;transform-origin:100% 50%}
      .aw-v26-leaf-stem.a{left:17px;top:24px;transform:rotate(-32deg)}
      .aw-v26-leaf-stem.b{left:39px;top:18px;transform:rotate(-8deg)}
      .aw-v26-leaf{
        position:absolute;width:24px;height:15px;border-radius:82% 0 82% 0;
        background:linear-gradient(135deg,#9cc86a 0%,#4f8d4d 61%,#245b36 100%);
        box-shadow:inset 0 1px rgba(255,255,255,.24);opacity:0;transform:scale(.25);
      }
      .aw-v26-leaf.a{left:1px;top:8px;transform:rotate(-23deg) scale(.25)}
      .aw-v26-leaf.b{left:32px;top:2px;transform:rotate(17deg) scale(.25)}
      .aw-v26-perch-target{position:absolute;left:52px;top:41px;width:2px;height:2px}
      .aw-v26-perch.is-grown .aw-v26-knot{animation:awV26Knot .34s ease-out forwards}
      .aw-v26-perch.is-grown .aw-v26-limb-wrap{animation:awV26Limb .62s .08s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-v26-perch.is-grown .aw-v26-leaf{animation:awV26Leaf .28s .48s ease-out forwards}
      .aw-v26-perch.is-settled{animation:awV26BranchSettle .48s ease-out}

      .aw-v26-flyer{
        position:fixed;z-index:2147482000;left:0;top:0;width:118px;height:148px;pointer-events:none;
        transform-origin:50% 80%;opacity:0;will-change:transform,opacity,filter;
        filter:drop-shadow(0 8px 9px rgba(0,0,0,.25));
      }
      .aw-v26-body{position:relative;width:100%;height:100%;overflow:visible}
      .aw-v26-body-crop{position:absolute;inset:0 0 12%;overflow:hidden}
      .aw-v26-body-crop img{
        position:absolute;display:block;width:165%;height:auto;left:-32.5%;top:0;max-width:none!important;
      }
      .aw-v26-clawset{position:absolute;bottom:0;width:38%;height:20%;display:flex;justify-content:center;gap:1px;z-index:3}
      .aw-v26-clawset.left{left:9%}.aw-v26-clawset.right{right:9%}
      .aw-v26-claw{
        width:28%;height:83%;border-radius:54% 54% 45% 45%;
        background:linear-gradient(90deg,#b56a05 0%,#ffc52a 42%,#e89108 74%,#7d4303 100%);
        border:1px solid rgba(84,42,0,.65);box-shadow:inset 1px 0 rgba(255,235,123,.6),0 2px 2px rgba(0,0,0,.2);
        transform:rotate(4deg);
      }
      .aw-v26-claw:nth-child(2){transform:translateY(-2px)}
      .aw-v26-claw:nth-child(3){transform:rotate(-4deg)}
      .aw-v26-wink{
        position:absolute;left:64.7%;top:14.7%;width:22%;height:15%;border-radius:52% 52% 48% 48%;
        background:linear-gradient(180deg,#c8863f 0 26%,#f3dfbd 31% 100%);
        border-bottom:3px solid #2c160e;opacity:0;transform:scaleY(.05);transform-origin:50% 70%;z-index:4;
      }
      .aw-v26-flyer.is-winking .aw-v26-wink{animation:awV26Wink .42s ease-in-out}

      .aw-v26-bubble{
        position:absolute;z-index:8;left:28px;top:24px;width:min(48vw,270px);max-width:270px;
        padding:13px 17px 14px;border:3px solid #c99828;border-radius:30px 34px 28px 32px;
        background:linear-gradient(180deg,#fffdf3 0%,#fbf5df 100%);color:#0b4938;
        box-shadow:0 6px 13px rgba(37,25,9,.13);font:800 clamp(.96rem,3.1vw,1.08rem)/1.22 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
        text-align:center;opacity:0;transform:translateY(8px) scale(.94);transform-origin:100% 62%;pointer-events:none;
      }
      .aw-v26-bubble::before{
        content:"";position:absolute;right:-18px;top:54%;width:28px;height:24px;
        background:#fbf5df;clip-path:polygon(0 18%,100% 52%,0 86%);border-right:3px solid #c99828;
      }
      .aw-v26-bubble::after{
        content:"";position:absolute;right:-30px;top:calc(54% + 7px);width:14px;height:10px;border-radius:60%;
        background:#fbf5df;border:2px solid #c99828;
      }
      .aw-v26-bubble.is-visible{animation:awV26Bubble .36s cubic-bezier(.2,.8,.2,1) forwards}

      @keyframes awV26SourceAwake{0%{transform:scale(1);filter:none}45%{transform:scale(1.025);filter:brightness(1.05)}100%{transform:scale(1);filter:none}}
      @keyframes awV26Knot{to{opacity:1;transform:scale(1)}}
      @keyframes awV26Limb{to{opacity:1;transform:scaleX(1)}}
      @keyframes awV26Leaf{to{opacity:1;transform:rotate(var(--r,0deg)) scale(1)}}
      @keyframes awV26BranchSettle{0%,100%{transform:rotate(0)}45%{transform:rotate(1.4deg)}}
      @keyframes awV26Bubble{to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes awV26Wink{0%,100%{opacity:0;transform:scaleY(.05)}18%,72%{opacity:1;transform:scaleY(1)}}

      @media(max-width:520px){
        .aw-oak-trunk-edge{width:23px}
        .aw-v26-stage{height:236px!important;min-height:236px!important;margin-top:16px!important}
        .aw-v26-perch{right:-23px;top:114px;width:174px;height:72px}
        .aw-v26-limb{width:148px;height:14px;right:25px}
        .aw-v26-perch-target{left:45px;top:40px}
        .aw-v26-bubble{left:18px;top:22px;width:min(47vw,245px);padding:11px 14px 12px;font-size:.96rem}
      }
    `;
    document.head.appendChild(style);
  }

  function addTrunks() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-oak-trunk-edge left';
    right.className = 'aw-oak-trunk-edge right';
    document.body.append(left, right);
  }

  function buildStage() {
    stage = document.createElement('div');
    stage.className = 'aw-v26-stage';
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = `
      <div class="aw-v26-bubble">${INTRO}</div>
      <div class="aw-v26-perch">
        <div class="aw-v26-knot"></div>
        <div class="aw-v26-limb-wrap">
          <div class="aw-v26-limb"></div>
          <div class="aw-v26-twig"></div>
          <span class="aw-v26-leaf-stem a"></span>
          <span class="aw-v26-leaf-stem b"></span>
          <span class="aw-v26-leaf a" style="--r:-23deg"></span>
          <span class="aw-v26-leaf b" style="--r:17deg"></span>
        </div>
        <span class="aw-v26-perch-target"></span>
      </div>`;

    const host = source.closest('.annie-callout') || source.parentElement;
    const nextHeading = host.querySelector('h2,h3,.eyebrow');
    if (nextHeading && nextHeading !== source) host.insertBefore(stage, nextHeading);
    else source.insertAdjacentElement('afterend', stage);

    bubble = stage.querySelector('.aw-v26-bubble');
  }

  function buildFlyer() {
    flyer = document.createElement('div');
    flyer.id = 'awAnnieCharacter';
    flyer.className = 'aw-v26-flyer';
    flyer.innerHTML = `<div class="aw-v26-body">
      <div class="aw-v26-body-crop"><img src="${ANNIE_SOURCE}" alt=""></div>
      <div class="aw-v26-clawset left"><i class="aw-v26-claw"></i><i class="aw-v26-claw"></i><i class="aw-v26-claw"></i></div>
      <div class="aw-v26-clawset right"><i class="aw-v26-claw"></i><i class="aw-v26-claw"></i><i class="aw-v26-claw"></i></div>
      <span class="aw-v26-wink"></span>
    </div>`;
    document.body.appendChild(flyer);
  }

  function getStartBox() {
    const r = source.getBoundingClientRect();
    const w = Math.max(112, Math.min(176, r.width * .48));
    const h = w * 1.255;
    return {
      x: r.left + (r.width - w) * .5,
      y: r.top + r.height * .055,
      w,
      h
    };
  }

  function getTargetBox() {
    const marker = stage.querySelector('.aw-v26-perch-target').getBoundingClientRect();
    const w = window.innerWidth < 520 ? 104 : 112;
    const h = w * 1.255;
    return {
      x: marker.left - w * .5,
      y: marker.top - h + 13,
      w,
      h
    };
  }

  function setFlyerBox(box, opacity = 1, rotate = 0) {
    flyer.style.width = `${box.w}px`;
    flyer.style.height = `${box.h}px`;
    flyer.style.opacity = String(opacity);
    flyer.style.transform = `translate3d(${box.x}px,${box.y}px,0) rotate(${rotate}deg)`;
  }

  async function launch() {
    if (launched || !source || !stage || !flyer) return;
    launched = true;

    const perch = stage.querySelector('.aw-v26-perch');
    source.classList.add('aw-v26-source-awake');
    perch.classList.add('is-grown');

    const start = getStartBox();
    setFlyerBox(start, 0, 0);
    await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

    if (reduceMotion) {
      await new Promise(r => setTimeout(r, 250));
      setFlyerBox(getTargetBox(), 1, 0);
      source.style.opacity = '1';
    } else {
      flyer.animate([
        {opacity:0, transform:`translate3d(${start.x}px,${start.y}px,0) rotate(0deg)`},
        {opacity:1, offset:.16, transform:`translate3d(${start.x}px,${start.y}px,0) rotate(0deg)`}
      ], {duration:420,easing:'ease-out',fill:'forwards'});

      source.animate([{opacity:1},{opacity:.28,offset:.55},{opacity:1}],{duration:900,easing:'ease-in-out'});
      await new Promise(r => setTimeout(r, 430));

      const target = getTargetBox();
      const midX = start.x + (target.x - start.x) * .52;
      const midY = Math.min(start.y, target.y) - 34;
      const animation = flyer.animate([
        {opacity:1, transform:`translate3d(${start.x}px,${start.y}px,0) rotate(0deg)`},
        {opacity:1, offset:.58, transform:`translate3d(${midX}px,${midY}px,0) rotate(5deg)`},
        {opacity:1, transform:`translate3d(${target.x}px,${target.y}px,0) rotate(0deg)`}
      ], {duration:1250,easing:'cubic-bezier(.22,.72,.18,1)',fill:'forwards'});
      await animation.finished.catch(() => {});
      setFlyerBox(target, 1, 0);
    }

    perch.classList.add('is-settled');
    await new Promise(r => setTimeout(r, 280));
    bubble.classList.add('is-visible');
    await new Promise(r => setTimeout(r, 520));
    flyer.classList.add('is-winking');
    window.setTimeout(() => flyer.classList.remove('is-winking'), 460);
  }

  function observe() {
    const io = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio > .2)) {
        io.disconnect();
        window.setTimeout(launch, 320);
      }
    }, {threshold:[.2,.45]});
    io.observe(source.closest('.annie-callout') || source);
  }

  function init() {
    cleanup();
    source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return;
    addStyles();
    addTrunks();
    buildStage();
    buildFlyer();
    observe();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, {once:true});
  else init();
})();