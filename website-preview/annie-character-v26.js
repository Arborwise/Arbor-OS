(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout .annie-badge img, .annie-callout img';
  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  let source, badge, stage, annie, launched = false, launching = false;

  function cleanup() {
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

  function findAskHeading() {
    return [...document.querySelectorAll('.annie-callout *')].find(el =>
      el.children.length === 0 && el.textContent.trim().toUpperCase() === 'ASK ANNIE'
    );
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-character-v26';
    style.textContent = `
      html body{position:relative!important;overflow-x:hidden!important}

      .annie-callout .annie-badge{
        overflow:hidden!important;
        border-radius:50%!important;
        background:#073f33!important;
        isolation:isolate!important
      }
      .annie-callout .annie-badge img{
        display:block!important;
        width:100%!important;
        height:100%!important;
        object-fit:cover!important;
        border-radius:50%!important
      }

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
      .aw-oak-trunk-edge.left{left:0;clip-path:polygon(0 0,76% 0,92% 4%,68% 9%,89% 15%,72% 22%,96% 31%,69% 39%,88% 47%,74% 55%,96% 64%,70% 73%,90% 82%,72% 91%,84% 100%,0 100%)}
      .aw-oak-trunk-edge.right{right:0;clip-path:polygon(24% 0,100% 0,100% 100%,16% 100%,28% 92%,10% 84%,30% 75%,5% 66%,28% 57%,10% 49%,31% 40%,6% 31%,29% 22%,10% 14%,31% 6%)}

      .annie-callout{position:relative!important;overflow:visible!important}
      .aw-annie-first-stage{
        position:relative!important;display:block!important;width:100%!important;
        height:126px!important;min-height:126px!important;margin:6px 0 0!important;
        overflow:visible!important;grid-column:1/-1!important;isolation:isolate!important
      }

      .aw-oak-perch{position:absolute;z-index:5;right:-15px;top:67px;width:166px;height:58px;pointer-events:none}
      .aw-oak-knot{
        position:absolute;right:-5px;top:9px;width:42px;height:42px;border-radius:48% 44% 46% 52%;
        background:radial-gradient(ellipse at 47% 48%,#27130a 0 18%,#755035 20% 35%,#2d190f 38% 45%,#966d4b 48% 64%,#3a2317 67% 100%);
        box-shadow:inset 4px 0 7px rgba(255,255,255,.09),inset -5px 0 8px rgba(17,8,4,.44),0 4px 8px rgba(0,0,0,.24);
        opacity:0;transform:scale(.7)
      }
      .aw-oak-limb-wrap{position:absolute;inset:0;transform-origin:100% 55%;transform:scaleX(.04);opacity:0}
      .aw-oak-limb{
        position:absolute;right:18px;top:29px;width:148px;height:15px;
        clip-path:polygon(0 22%,13% 9%,29% 18%,43% 5%,58% 16%,73% 7%,87% 20%,100% 14%,100% 82%,85% 71%,71% 90%,56% 77%,41% 93%,26% 80%,12% 91%,0 73%);
        background:linear-gradient(180deg,rgba(255,255,255,.15) 0 10%,transparent 11% 100%),linear-gradient(180deg,#9b6c47 0%,#70472c 48%,#3b2115 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.22)
      }
      .aw-oak-twig{
        position:absolute;left:28px;top:20px;width:50px;height:7px;border-radius:999px;
        background:linear-gradient(180deg,#865936,#452719);transform:rotate(-18deg);transform-origin:100% 50%
      }
      .aw-oak-leaf{
        position:absolute;width:22px;height:14px;border-radius:80% 0 80% 0;
        background:linear-gradient(135deg,#9fc96c 0%,#518f4f 60%,#245f38 100%);
        box-shadow:inset 0 1px rgba(255,255,255,.26);opacity:0
      }
      .aw-oak-leaf.a{left:23px;top:7px;transform:rotate(-19deg) scale(.3)}
      .aw-oak-leaf.b{left:48px;top:4px;transform:rotate(22deg) scale(.3)}
      .aw-perch-target{position:absolute;left:64px;top:28px;width:2px;height:2px}

      .aw-oak-perch.is-grown .aw-oak-knot{animation:awKnotAppear .35s ease-out forwards}
      .aw-oak-perch.is-grown .aw-oak-limb-wrap{animation:awLimbGrow .58s .08s cubic-bezier(.2,.82,.16,1) forwards}
      .aw-oak-perch.is-grown .aw-oak-leaf.a{animation:awLeafA .28s .44s ease-out forwards}
      .aw-oak-perch.is-grown .aw-oak-leaf.b{animation:awLeafB .28s .5s ease-out forwards}
      .aw-oak-perch.is-settled{animation:awBranchSettle .46s ease-out}

      .aw-annie-guide{
        position:fixed;z-index:90;left:0;top:0;width:100px;height:128px;opacity:0;visibility:hidden;
        pointer-events:none;transform-origin:50% 50%;will-change:left,top,width,height,transform,opacity
      }
      .aw-annie-guide.is-visible{opacity:1!important;visibility:visible!important}
      .aw-annie-guide.is-perched{position:absolute;z-index:10}
      .aw-annie-button{
        position:relative;display:block;width:100%;height:100%;margin:0!important;padding:0!important;
        border:0!important;outline:0!important;background:transparent!important;box-shadow:none!important;
        appearance:none!important;-webkit-appearance:none!important;-webkit-tap-highlight-color:transparent!important;
        pointer-events:auto;cursor:pointer
      }
      .aw-annie-button:focus-visible{filter:drop-shadow(0 0 8px rgba(226,180,67,.9))}
      .aw-annie-crop{
        position:absolute;left:50%;top:0;width:100%;height:58%;overflow:hidden;
        transform:translateX(-50%);border-radius:48% 48% 42% 42%;
        filter:drop-shadow(0 5px 5px rgba(0,0,0,.22))
      }
      .aw-annie-body{display:block;width:100%;height:auto;user-select:none;-webkit-user-drag:none}
      .aw-foot{
        position:absolute;z-index:4;top:56%;width:29%;height:28%;display:flex;justify-content:center;align-items:flex-start
      }
      .aw-foot.left{left:21%;transform:rotate(3deg)}
      .aw-foot.right{right:21%;transform:rotate(-3deg)}
      .aw-foot i{
        position:relative;display:block;width:36%;height:78%;margin-left:-2px;border-radius:53% 53% 44% 44%;
        background:linear-gradient(90deg,#d8860e 0%,#ffc13f 45%,#e79a18 100%);
        border:1px solid #8d4f08;box-shadow:inset 1px 1px rgba(255,255,255,.28)
      }
      .aw-foot i::after{
        content:"";position:absolute;left:50%;bottom:-3px;width:56%;height:24%;transform:translateX(-50%);
        border-radius:0 0 70% 70%;background:#4e2c19
      }

      .aw-wink-lid{
        position:absolute;z-index:6;left:64%;top:17%;width:20%;height:9%;opacity:0;
        border-radius:55% 55% 48% 48%;background:linear-gradient(180deg,#b97538 0%,#f3deb5 72%);
        border-bottom:2px solid #4c2717;transform:scaleY(.16);pointer-events:none
      }
      .aw-annie-guide.is-winking .aw-wink-lid{animation:awOneWink .44s ease-in-out}

      .aw-annie-bubble{
        position:absolute;z-index:12;right:calc(100% + 9px);top:8px;width:min(184px,46vw);
        padding:9px 12px 10px;border:2px solid #c7952f;border-radius:25px 28px 24px 27px;
        background:linear-gradient(180deg,#fffdf7 0%,#fff8e7 100%);color:#174231;
        box-shadow:0 8px 17px rgba(0,0,0,.15),inset 0 0 0 3px rgba(225,183,75,.1);
        font-size:.74rem;font-weight:850;line-height:1.28;text-align:center;
        opacity:0;visibility:hidden;transform:translateY(5px) scale(.97);
        transition:opacity .18s ease,transform .18s ease,visibility .18s ease;pointer-events:none
      }
      .aw-annie-bubble::after{
        content:"";position:absolute;right:-9px;top:33px;width:16px;height:16px;background:#fff9eb;
        border-top:2px solid #c7952f;border-right:2px solid #c7952f;transform:rotate(45deg);border-radius:0 4px 0 0
      }
      .aw-annie-guide.has-tip .aw-annie-bubble{opacity:1;visibility:visible;transform:translateY(0) scale(1)}

      @keyframes awKnotAppear{0%{opacity:0;transform:scale(.7)}100%{opacity:1;transform:scale(1)}}
      @keyframes awLimbGrow{0%{opacity:0;transform:scaleX(.04)}18%{opacity:1}84%{transform:scaleX(1.03)}100%{opacity:1;transform:scaleX(1)}}
      @keyframes awLeafA{0%{opacity:0;transform:rotate(-19deg) scale(.3)}100%{opacity:1;transform:rotate(-19deg) scale(1)}}
      @keyframes awLeafB{0%{opacity:0;transform:rotate(22deg) scale(.3)}100%{opacity:1;transform:rotate(22deg) scale(1)}}
      @keyframes awBranchSettle{0%{transform:translateY(0)}40%{transform:translateY(2px) rotate(-.5deg)}75%{transform:translateY(-1px) rotate(.2deg)}100%{transform:translateY(0)}}
      @keyframes awOneWink{0%,100%{opacity:0;transform:scaleY(.16)}35%,68%{opacity:1;transform:scaleY(1)}}

      @media(max-width:520px){
        .aw-oak-trunk-edge{width:21px}
        .aw-annie-first-stage{height:122px!important;min-height:122px!important;margin:4px 0 0!important}
        .aw-oak-perch{right:-13px;top:64px;width:160px}
        .aw-annie-guide{width:96px;height:123px}
        .aw-annie-bubble{width:min(172px,44vw);font-size:.72rem;right:calc(100% + 7px)}
      }
    `;
    document.head.appendChild(style);
  }

  function addTrunks() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-oak-trunk-edge left';
    right.className = 'aw-oak-trunk-edge right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  function createStage() {
    badge = document.querySelector('.annie-callout .annie-badge') || source?.parentElement;
    if (!badge) return false;

    stage = document.createElement('div');
    stage.className = 'aw-annie-first-stage';
    stage.innerHTML = `
      <div class="aw-oak-perch" aria-hidden="true">
        <span class="aw-oak-knot"></span>
        <span class="aw-oak-limb-wrap">
          <span class="aw-oak-limb"></span>
          <span class="aw-oak-twig"></span>
          <i class="aw-oak-leaf a"></i>
          <i class="aw-oak-leaf b"></i>
          <span class="aw-perch-target"></span>
        </span>
      </div>`;
    badge.insertAdjacentElement('afterend', stage);

    const heading = findAskHeading();
    if (heading) {
      heading.style.setProperty('margin-top', '4px', 'important');
      heading.style.setProperty('padding-top', '0', 'important');
    }
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
      if (annie.classList.contains('has-tip')) setTimeout(winkOnce, 360);
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
    setTimeout(() => annie?.classList.remove('is-winking'), 480);
  }

  function showIntro() {
    const bubble = annie?.querySelector('.aw-annie-bubble');
    if (!bubble) return;
    bubble.textContent = INTRO;
    annie.classList.add('has-tip');
    setTimeout(winkOnce, 420);
  }

  function startBox() {
    const r = source?.getBoundingClientRect();
    if (!r) return null;
    const width = clamp(r.width * .52, 154, 220);
    const height = width * 1.28;
    return {
      left: r.left + (r.width - width) / 2,
      top: r.top + r.height * .11,
      width, height
    };
  }

  function landingBox() {
    const marker = stage?.querySelector('.aw-perch-target')?.getBoundingClientRect();
    const limb = stage?.querySelector('.aw-oak-limb')?.getBoundingClientRect();
    if (!marker || !limb) return null;
    const width = innerWidth > 700 ? 104 : 96;
    const height = width * 1.28;
    return {
      left: marker.left - width / 2,
      top: limb.top - height * .78,
      width, height
    };
  }

  function placePerched(box) {
    if (!annie || !stage || !box) return;
    const sr = stage.getBoundingClientRect();
    stage.appendChild(annie);
    annie.className = 'aw-annie-guide is-visible is-perched';
    Object.assign(annie.style, {
      position: 'absolute',
      left: `${Math.round(box.left - sr.left)}px`,
      top: `${Math.round(box.top - sr.top)}px`,
      width: `${box.width}px`,
      height: `${box.height}px`,
      transform: 'none',
      opacity: '1',
      visibility: 'visible'
    });
    stage.querySelector('.aw-oak-perch')?.classList.add('is-settled');
  }

  function ease(t) { return 1 - Math.pow(1 - t, 3); }
  function curve(a, b, c, t) { const u = 1 - t; return u*u*a + 2*u*t*b + t*t*c; }

  async function launch() {
    if (launched || launching || !annie || !stage || !source) return;
    const start = startBox();
    const end = landingBox();
    if (!start || !end) return;

    launching = true;
    growBranch();
    await wait(reducedMotion ? 0 : 480);

    document.body.appendChild(annie);
    annie.className = 'aw-annie-guide is-visible';
    Object.assign(annie.style, {
      position: 'fixed',
      left: `${start.left}px`,
      top: `${start.top}px`,
      width: `${start.width}px`,
      height: `${start.height}px`,
      transform: 'none',
      opacity: '1',
      visibility: 'visible'
    });

    if (reducedMotion) {
      placePerched(end);
      launched = true;
      launching = false;
      showIntro();
      return;
    }

    const duration = 1420;
    const startTime = performance.now();
    const sx = start.left + start.width / 2;
    const sy = start.top + start.height / 2;
    const ex = end.left + end.width / 2;
    const ey = end.top + end.height / 2;
    const cx = sx + (ex - sx) * .55;
    const cy = Math.min(sy, ey) - 22;

    await new Promise(resolve => {
      function frame(now) {
        const raw = clamp((now - startTime) / duration, 0, 1);
        const t = ease(raw);
        const width = start.width + (end.width - start.width) * t;
        const height = start.height + (end.height - start.height) * t;
        const x = curve(sx, cx, ex, t);
        const y = curve(sy, cy, ey, t);
        const direction = ex >= sx ? 1 : -1;
        const bank = direction * 3.5 * Math.sin(Math.PI * raw);

        Object.assign(annie.style, {
          left: `${x - width / 2}px`,
          top: `${y - height / 2}px`,
          width: `${width}px`,
          height: `${height}px`,
          transform: `rotate(${bank}deg)`,
          opacity: '1',
          visibility: 'visible'
        });

        if (raw < 1) requestAnimationFrame(frame);
        else resolve();
      }
      requestAnimationFrame(frame);
    });

    placePerched(end);
    launched = true;
    launching = false;
    setTimeout(showIntro, 220);
  }

  function maybeLaunch() {
    if (launched || launching || !source) return;
    const r = source.getBoundingClientRect();
    if (r.bottom > 40 && r.top < innerHeight - 30) launch();
  }

  function init() {
    cleanup();
    source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return;

    installStyles();
    addTrunks();
    if (!createStage()) return;
    createAnnie();

    setTimeout(maybeLaunch, 220);
    addEventListener('scroll', maybeLaunch, { passive: true });
    addEventListener('resize', maybeLaunch, { passive: true });

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) launch();
    }, { threshold: .12 });
    observer.observe(source);
  }

  if (document.readyState === 'loading') addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();