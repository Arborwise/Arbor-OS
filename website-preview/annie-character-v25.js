(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  let source;
  let stage;
  let annie;
  let launched = false;
  let launching = false;

  function cleanupOldAnnie() {
    document.querySelectorAll(
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,.aw-annie-landing-lane,' +
      '.aw-annie-perch-lane,.aw-bark-rail,.aw-oak-trunk-edge,.aw-annie-first-stage,' +
      '.aw-annie-wing,.aw-wing,.aw-fake-wing,.aw-annie-flight-wing'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-flight-correction-"],' +
      '[id^="arborwise-annie-perch-flight-"],[id^="arborwise-annie-character-"]'
    ).forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-character-v25';
    style.textContent = `
      html body{position:relative!important;overflow-x:hidden!important}

      html body .aw-brand .aw-art::before{content:"EST."!important;left:5.5%!important}
      html body .aw-brand .aw-art::after{content:"2019"!important;right:4.5%!important}
      html body .site-footer .fb{
        width:min(72%,304px)!important;max-width:304px!important;min-height:40px!important;
        margin:10px auto 16px!important;padding:5px 11px!important;gap:8px!important
      }
      html body .site-footer .fb i{width:27px!important;height:27px!important;font-size:1.05rem!important}
      html body .site-footer .fb span::after{font-size:.79rem!important}

      ${SOURCE_SELECTOR}{transform-origin:50% 48%;will-change:transform,filter}
      ${SOURCE_SELECTOR}.aw-annie-awaken{animation:awPortraitAwaken .7s ease-in-out both}

      .aw-oak-trunk-edge{
        position:fixed;z-index:2;top:0;bottom:0;width:25px;pointer-events:none;opacity:.92;
        background:
          radial-gradient(ellipse at 35% 7%,rgba(25,12,7,.9) 0 7%,transparent 8%) 0 0/100% 151px,
          radial-gradient(ellipse at 68% 33%,rgba(27,13,7,.8) 0 8%,transparent 9%) 0 29px/100% 183px,
          radial-gradient(ellipse at 30% 72%,rgba(30,15,8,.76) 0 7%,transparent 8%) 0 0/100% 213px,
          linear-gradient(90deg,#21120c 0%,#5a3d2a 24%,#896448 47%,#503421 71%,#1d100a 100%);
        filter:drop-shadow(0 0 5px rgba(23,12,7,.34))
      }
      .aw-oak-trunk-edge::before{
        content:"";position:absolute;inset:0;opacity:.95;
        background:
          linear-gradient(93deg,transparent 0 15%,rgba(25,12,7,.65) 18% 24%,transparent 27% 52%,rgba(28,14,8,.57) 55% 61%,transparent 64%),
          linear-gradient(87deg,transparent 0 37%,rgba(221,184,132,.17) 40% 45%,transparent 49% 76%,rgba(15,8,5,.48) 80% 85%,transparent 89%)
      }
      .aw-oak-trunk-edge.left{
        left:0;clip-path:polygon(0 0,76% 0,92% 4%,68% 9%,89% 15%,72% 22%,96% 31%,69% 39%,88% 47%,74% 55%,96% 64%,70% 73%,90% 82%,72% 91%,84% 100%,0 100%)
      }
      .aw-oak-trunk-edge.right{
        right:0;clip-path:polygon(24% 0,100% 0,100% 100%,16% 100%,28% 92%,10% 84%,30% 75%,5% 66%,28% 57%,10% 49%,31% 40%,6% 31%,29% 22%,10% 14%,31% 6%)
      }

      .annie-callout{position:relative!important;overflow:visible!important}
      .aw-annie-first-stage{
        position:relative!important;display:block!important;width:100%!important;height:188px!important;
        min-height:188px!important;margin:34px 0 18px!important;overflow:visible!important;
        grid-column:1/-1!important;isolation:isolate!important
      }
      .aw-oak-perch{
        position:absolute;z-index:5;right:-23px;top:66px;width:236px;height:90px;pointer-events:none
      }
      .aw-oak-knot{
        position:absolute;z-index:2;right:-7px;top:18px;width:56px;height:56px;border-radius:48% 44% 46% 52%;
        background:
          radial-gradient(ellipse at 47% 48%,#27130a 0 18%,#755035 20% 35%,#2d190f 38% 45%,#966d4b 48% 64%,#3a2317 67% 100%);
        box-shadow:inset 4px 0 7px rgba(255,255,255,.09),inset -5px 0 8px rgba(17,8,4,.44),0 4px 8px rgba(0,0,0,.24);
        opacity:0;transform:scale(.6)
      }
      .aw-oak-limb-wrap{
        position:absolute;inset:0;transform-origin:100% 55%;transform:scaleX(.035);opacity:0;will-change:transform,opacity
      }
      .aw-oak-limb{
        position:absolute;right:22px;top:43px;width:216px;height:20px;
        clip-path:polygon(0 25%,12% 10%,26% 17%,39% 4%,53% 15%,67% 6%,82% 20%,100% 13%,100% 82%,84% 71%,70% 90%,55% 77%,41% 94%,27% 80%,12% 91%,0 73%);
        background:
          linear-gradient(180deg,rgba(255,255,255,.15) 0 9%,transparent 10% 100%),
          linear-gradient(180deg,#9b6c47 0%,#70472c 48%,#3b2115 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 5px 7px rgba(0,0,0,.22)
      }
      .aw-oak-limb::before,.aw-oak-limb::after{
        content:"";position:absolute;height:3px;border-radius:999px;background:rgba(39,21,13,.42)
      }
      .aw-oak-limb::before{left:20%;right:7%;top:6px;transform:rotate(-2deg)}
      .aw-oak-limb::after{left:5%;right:31%;bottom:4px;transform:rotate(2deg)}
      .aw-oak-twig{
        position:absolute;left:18px;top:30px;width:67px;height:9px;border-radius:999px;
        background:linear-gradient(180deg,#865936,#452719);transform:rotate(-18deg);transform-origin:100% 50%
      }
      .aw-oak-leaf{
        position:absolute;width:29px;height:18px;border-radius:80% 0 80% 0;
        background:linear-gradient(135deg,#9fc96c 0%,#518f4f 60%,#245f38 100%);
        box-shadow:inset 0 1px rgba(255,255,255,.26);opacity:0;transform:scale(.25)
      }
      .aw-oak-leaf.a{left:4px;top:6px;transform:rotate(-19deg) scale(.25)}
      .aw-oak-leaf.b{left:38px;top:2px;transform:rotate(22deg) scale(.25)}
      .aw-oak-leaf.c{left:58px;top:24px;transform:rotate(62deg) scale(.25)}
      .aw-perch-target{position:absolute;left:62px;top:41px;width:2px;height:2px}

      .aw-oak-perch.is-grown .aw-oak-knot{animation:awKnotAppear .42s ease-out forwards}
      .aw-oak-perch.is-grown .aw-oak-limb-wrap{animation:awLimbGrow .72s .12s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-oak-perch.is-grown .aw-oak-leaf{animation:awLeafOpen .35s .58s ease-out forwards}
      .aw-oak-perch.is-settled{animation:awBranchSettle .6s ease-out}

      .aw-annie-guide{
        position:fixed;z-index:85;left:0;top:0;width:108px;height:146px;opacity:0;visibility:hidden;
        pointer-events:none;transform-origin:50% 50%;will-change:left,top,width,height,transform,opacity
      }
      .aw-annie-guide.is-visible{opacity:1;visibility:visible}
      .aw-annie-guide.is-perched{position:absolute;z-index:9}
      .aw-annie-button{
        position:relative;display:block;width:100%;height:100%;margin:0!important;padding:0!important;
        border:0!important;outline:0!important;background:transparent!important;box-shadow:none!important;
        appearance:none!important;-webkit-appearance:none!important;-webkit-tap-highlight-color:transparent!important;
        pointer-events:auto;cursor:pointer;touch-action:manipulation
      }
      .aw-annie-button:focus{outline:0!important;box-shadow:none!important}
      .aw-annie-button:focus-visible .aw-annie-crop{filter:drop-shadow(0 0 8px rgba(226,180,67,.9)) drop-shadow(0 7px 6px rgba(0,0,0,.24))}
      .aw-annie-crop{
        position:absolute;z-index:2;left:50%;top:0;width:100%;height:76%;overflow:hidden;
        transform:translateX(-50%);border-radius:48% 48% 44% 44%;filter:drop-shadow(0 7px 6px rgba(0,0,0,.24))
      }
      .aw-annie-body{
        display:block;width:100%;height:auto;transform:scale(1.08) translateY(-1%);transform-origin:50% 0;
        user-select:none;-webkit-user-drag:none
      }
      .aw-foot{
        position:absolute;z-index:4;top:68%;width:28%;height:25%;display:flex;justify-content:center;align-items:flex-start;
        transform-origin:50% 0;transition:transform .18s ease,top .18s ease,opacity .18s ease
      }
      .aw-foot.left{left:22%;transform:rotate(4deg)}
      .aw-foot.right{right:22%;transform:rotate(-4deg)}
      .aw-foot i{
        position:relative;display:block;width:35%;height:82%;margin-left:-2px;border-radius:53% 53% 44% 44%;
        background:linear-gradient(90deg,#d8860e 0%,#ffc13f 45%,#e79a18 100%);
        border:1px solid #8d4f08;box-shadow:inset 1px 1px rgba(255,255,255,.28)
      }
      .aw-foot i::after{
        content:"";position:absolute;left:50%;bottom:-3px;width:56%;height:24%;transform:translateX(-50%);
        border-radius:0 0 70% 70%;background:#4e2c19
      }
      .aw-annie-guide.is-flying .aw-foot{top:66%;opacity:.94;transform:translateY(-8px) scale(.72)}
      .aw-annie-guide.is-landing .aw-foot{top:70%;opacity:1}
      .aw-annie-guide.is-landing .aw-foot.left{transform:rotate(1deg) scale(1.04)}
      .aw-annie-guide.is-landing .aw-foot.right{transform:rotate(-1deg) scale(1.04)}

      .aw-wink-lid{
        position:absolute;z-index:6;left:64%;top:18%;width:20%;height:10%;opacity:0;
        border-radius:55% 55% 48% 48%;background:linear-gradient(180deg,#b97538 0%,#f3deb5 72%);
        border-bottom:2px solid #4c2717;transform:scaleY(.16);pointer-events:none
      }
      .aw-annie-guide.is-winking .aw-wink-lid{animation:awOneWink .48s ease-in-out}

      .aw-annie-bubble{
        position:absolute;z-index:12;right:76px;top:4px;width:min(226px,62vw);padding:11px 14px 12px;
        border:2px solid #c7952f;border-radius:28px 32px 27px 31px;
        background:linear-gradient(180deg,#fffdf7 0%,#fff8e7 100%);color:#174231;
        box-shadow:0 10px 22px rgba(0,0,0,.17),inset 0 0 0 3px rgba(225,183,75,.1);
        font-size:.82rem;font-weight:850;line-height:1.33;text-align:center;
        opacity:0;visibility:hidden;transform:translateY(6px) scale(.97);
        transition:opacity .18s ease,transform .18s ease,visibility .18s ease;pointer-events:none
      }
      .aw-annie-bubble::before{
        content:"";position:absolute;right:22px;top:-10px;width:28px;height:17px;border:2px solid #c7952f;
        border-bottom:0;border-radius:50% 50% 0 0;background:#fffdf7
      }
      .aw-annie-bubble::after{
        content:"";position:absolute;right:-10px;top:48px;width:18px;height:18px;background:#fff9eb;
        border-top:2px solid #c7952f;border-right:2px solid #c7952f;transform:rotate(45deg);border-radius:0 5px 0 0
      }
      .aw-annie-guide.has-tip .aw-annie-bubble{opacity:1;visibility:visible;transform:translateY(0) scale(1)}

      @keyframes awPortraitAwaken{
        0%{filter:none;transform:scale(1)}
        45%{filter:drop-shadow(0 0 14px rgba(214,239,118,.68));transform:scale(1.018)}
        100%{filter:none;transform:scale(1)}
      }
      @keyframes awKnotAppear{0%{opacity:0;transform:scale(.6)}100%{opacity:1;transform:scale(1)}}
      @keyframes awLimbGrow{0%{opacity:0;transform:scaleX(.035)}18%{opacity:1}84%{transform:scaleX(1.035)}100%{opacity:1;transform:scaleX(1)}}
      @keyframes awLeafOpen{0%{opacity:0;transform:scale(.25)}100%{opacity:1;transform:scale(1)}}
      @keyframes awBranchSettle{0%{transform:translateY(0)}38%{transform:translateY(3px) rotate(-.8deg)}72%{transform:translateY(-1px) rotate(.35deg)}100%{transform:translateY(0)}}
      @keyframes awOneWink{0%,12%,88%,100%{opacity:0;transform:scaleY(.16)}32%,66%{opacity:1;transform:scaleY(1)}}

      @media(min-width:701px){
        .aw-oak-trunk-edge{width:32px;opacity:.87}
        .aw-annie-first-stage{height:206px!important;min-height:206px!important;margin-top:40px!important}
        .aw-oak-perch{right:-32px;top:72px;width:278px;height:100px}
        .aw-oak-limb{right:25px;top:47px;width:252px;height:22px}
        .aw-oak-knot{right:-7px;top:20px;width:63px;height:63px}
        .aw-perch-target{left:76px;top:45px}
        .aw-annie-guide{width:120px;height:162px}
        .aw-annie-bubble{right:87px;width:min(250px,34vw);font-size:.88rem}
      }
      @media(prefers-reduced-motion:reduce){
        ${SOURCE_SELECTOR},.aw-oak-knot,.aw-oak-limb-wrap,.aw-oak-leaf,.aw-oak-perch,.aw-annie-guide,.aw-annie-bubble,.aw-wink-lid{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function addTrunkEdges() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-oak-trunk-edge left';
    right.className = 'aw-oak-trunk-edge right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  function createStage() {
    const badge = document.querySelector('.annie-callout .annie-badge') || source?.parentElement;
    if (!badge) return false;

    stage = document.createElement('div');
    stage.className = 'aw-annie-first-stage';
    stage.setAttribute('aria-label', 'Annie’s first healthy oak branch');
    stage.innerHTML = `
      <div class="aw-oak-perch" aria-hidden="true">
        <span class="aw-oak-knot"></span>
        <span class="aw-oak-limb-wrap">
          <span class="aw-oak-limb"></span>
          <span class="aw-oak-twig"></span>
          <i class="aw-oak-leaf a"></i>
          <i class="aw-oak-leaf b"></i>
          <i class="aw-oak-leaf c"></i>
          <span class="aw-perch-target"></span>
        </span>
      </div>`;
    badge.insertAdjacentElement('afterend', stage);
    return true;
  }

  function createAnnie() {
    annie = document.createElement('aside');
    annie.id = 'awAnnieCharacter';
    annie.className = 'aw-annie-guide';
    annie.setAttribute('aria-label', 'Arborwise Annie');
    annie.innerHTML = `
      <div class="aw-annie-bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-button" type="button" aria-label="Read Annie’s welcome">
        <span class="aw-annie-crop"><img class="aw-annie-body" src="assets/annie.webp" alt=""></span>
        <span class="aw-foot left"><i></i><i></i><i></i></span>
        <span class="aw-foot right"><i></i><i></i><i></i></span>
        <span class="aw-wink-lid"></span>
      </button>`;
    document.body.appendChild(annie);

    annie.querySelector('.aw-annie-button')?.addEventListener('click', () => {
      if (!launched) return;
      annie.classList.toggle('has-tip');
      if (annie.classList.contains('has-tip')) window.setTimeout(winkOnce, 380);
    });
  }

  function growBranch() {
    stage?.querySelector('.aw-oak-perch')?.classList.add('is-grown');
  }

  function winkOnce() {
    if (!annie) return;
    annie.classList.remove('is-winking');
    void annie.offsetWidth;
    annie.classList.add('is-winking');
    window.setTimeout(() => annie?.classList.remove('is-winking'), 520);
  }

  function showIntro() {
    const bubble = annie?.querySelector('.aw-annie-bubble');
    if (!bubble) return;
    bubble.textContent = INTRO;
    annie.classList.add('has-tip');
    window.setTimeout(winkOnce, 420);
  }

  function startBox() {
    const rect = source?.getBoundingClientRect();
    if (!rect) return null;
    const width = clamp(rect.width * .7, 190, 330);
    const height = width * 1.34;
    return {
      left: rect.left + (rect.width - width) / 2,
      top: rect.top + rect.height * .015,
      width,
      height
    };
  }

  function landingBox() {
    const marker = stage?.querySelector('.aw-perch-target')?.getBoundingClientRect();
    const limb = stage?.querySelector('.aw-oak-limb')?.getBoundingClientRect();
    if (!marker || !limb) return null;
    const width = window.innerWidth > 700 ? 120 : 108;
    const height = window.innerWidth > 700 ? 162 : 146;
    return {
      left: marker.left - width / 2,
      top: limb.top - height * .78,
      width,
      height
    };
  }

  function placePerched(box) {
    if (!annie || !stage || !box) return;
    const stageRect = stage.getBoundingClientRect();
    stage.appendChild(annie);
    annie.className = 'aw-annie-guide is-visible is-perched is-landing';
    annie.style.position = 'absolute';
    annie.style.left = `${Math.round(box.left - stageRect.left)}px`;
    annie.style.top = `${Math.round(box.top - stageRect.top)}px`;
    annie.style.width = `${box.width}px`;
    annie.style.height = `${box.height}px`;
    annie.style.transform = 'none';
    const perch = stage.querySelector('.aw-oak-perch');
    perch?.classList.add('is-settled');
    window.setTimeout(() => annie?.classList.remove('is-landing'), 420);
  }

  function ease(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function curve(a, b, c, t) {
    const u = 1 - t;
    return u * u * a + 2 * u * t * b + t * t * c;
  }

  async function launch() {
    if (launched || launching || !annie || !stage || !source) return;
    const start = startBox();
    const end = landingBox();
    if (!start || !end) return;

    launching = true;
    growBranch();
    await wait(reducedMotion ? 0 : 760);

    source.classList.add('aw-annie-awaken');
    await wait(reducedMotion ? 0 : 420);

    document.body.appendChild(annie);
    annie.className = 'aw-annie-guide is-visible is-flying';
    Object.assign(annie.style, {
      position: 'fixed',
      left: `${start.left}px`,
      top: `${start.top}px`,
      width: `${start.width}px`,
      height: `${start.height}px`,
      transform: 'rotate(0deg)',
      opacity: '0'
    });
    requestAnimationFrame(() => { annie.style.opacity = '1'; });

    if (reducedMotion) {
      placePerched(end);
      launched = true;
      launching = false;
      showIntro();
      return;
    }

    const duration = 1680;
    const startTime = performance.now();
    const sx = start.left + start.width / 2;
    const sy = start.top + start.height / 2;
    const ex = end.left + end.width / 2;
    const ey = end.top + end.height / 2;
    const cx = sx + (ex - sx) * .56;
    const cy = Math.min(sy, ey) - 34;

    await new Promise(resolve => {
      function frame(now) {
        const raw = clamp((now - startTime) / duration, 0, 1);
        const t = ease(raw);
        const width = start.width + (end.width - start.width) * t;
        const height = start.height + (end.height - start.height) * t;
        const x = curve(sx, cx, ex, t);
        const y = curve(sy, cy, ey, t);
        const direction = ex >= sx ? 1 : -1;
        const bank = raw < .72
          ? direction * 5 * Math.sin(Math.PI * raw / .72)
          : direction * 5 * (1 - raw) / .28;

        annie.style.left = `${x - width / 2}px`;
        annie.style.top = `${y - height / 2}px`;
        annie.style.width = `${width}px`;
        annie.style.height = `${height}px`;
        annie.style.transform = `rotate(${bank}deg)`;

        if (raw > .76) annie.classList.add('is-landing');

        if (raw < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });

    placePerched(end);
    source.classList.remove('aw-annie-awaken');
    launched = true;
    launching = false;
    window.setTimeout(showIntro, 260);
  }

  function readyToLaunch() {
    if (launched || launching || !source || !stage) return false;
    const sourceRect = source.getBoundingClientRect();
    const targetRect = stage.querySelector('.aw-perch-target')?.getBoundingClientRect();
    if (!targetRect) return false;
    const sourceVisible = sourceRect.bottom > 72 && sourceRect.top < window.innerHeight - 80;
    const targetVisible = targetRect.top > 80 && targetRect.top < window.innerHeight - 115;
    return sourceVisible && targetVisible;
  }

  function maybeLaunch() {
    if (readyToLaunch()) launch();
  }

  function init() {
    cleanupOldAnnie();
    source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return;
    installStyles();
    addTrunkEdges();
    if (!createStage()) return;
    createAnnie();

    window.setTimeout(maybeLaunch, 420);
    window.addEventListener('scroll', maybeLaunch, { passive: true });
    window.addEventListener('resize', maybeLaunch, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();