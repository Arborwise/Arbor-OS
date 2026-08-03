(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const removeOld = () => {
    document.querySelectorAll(
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,.aw-annie-landing-lane,' +
      '.aw-annie-perch-lane,.aw-bark-rail,.aw-oak-trunk-edge,.aw-annie-first-stage,' +
      '#aw26Stage,#aw26Flyer,[id^="arborwise-annie-character-"]'
    ).forEach(node => node.remove());
  };

  const addStyles = () => {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-character-v26';
    style.textContent = `
      html body{overflow-x:hidden!important}
      html body .aw-brand .aw-art::before{content:"EST."!important;left:5.5%!important}
      html body .aw-brand .aw-art::after{content:"2019"!important;right:4.5%!important}
      html body button:focus-visible,html body a:focus-visible{outline:2px solid #c99c37!important;outline-offset:3px!important}

      .aw26-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:30px;pointer-events:none;opacity:.94;
        background:
          radial-gradient(ellipse at 44% 10%,rgba(22,10,5,.92) 0 8%,transparent 9%) 0 0/100% 170px,
          radial-gradient(ellipse at 66% 46%,rgba(24,11,6,.84) 0 9%,transparent 10%) 0 18px/100% 205px,
          linear-gradient(90deg,#1c0f09 0%,#4c3020 22%,#8a6547 47%,#4b2e1d 72%,#1b0e08 100%);
        filter:drop-shadow(0 0 5px rgba(20,10,5,.35))
      }
      .aw26-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 14%,rgba(20,9,5,.7) 18% 24%,transparent 28% 50%,rgba(30,14,7,.62) 55% 62%,transparent 66%),
          linear-gradient(86deg,transparent 0 31%,rgba(226,190,137,.16) 37% 43%,transparent 48% 73%,rgba(14,7,4,.5) 79% 86%,transparent 90%)
      }
      .aw26-bark.left{left:0;clip-path:polygon(0 0,76% 0,91% 5%,69% 12%,94% 20%,72% 29%,97% 39%,67% 49%,91% 59%,72% 69%,96% 78%,68% 88%,86% 100%,0 100%)}
      .aw26-bark.right{right:0;clip-path:polygon(24% 0,100% 0,100% 100%,14% 100%,31% 91%,7% 82%,30% 72%,5% 62%,32% 52%,8% 42%,31% 31%,7% 21%,30% 11%)}

      .annie-callout{position:relative!important;overflow:visible!important}
      #aw26Stage{
        position:relative!important;display:block!important;width:100%!important;height:188px!important;
        min-height:188px!important;margin:26px 0 18px!important;overflow:visible!important;
        grid-column:1/-1!important;isolation:isolate!important
      }

      .aw26-perch{position:absolute;right:-30px;top:92px;width:184px;height:68px;z-index:4;pointer-events:none}
      .aw26-knot{
        position:absolute;right:-3px;top:12px;width:48px;height:48px;border-radius:48% 52% 44% 56%;
        background:radial-gradient(ellipse at 47% 48%,#261208 0 18%,#765136 20% 36%,#2b170e 39% 47%,#966d49 50% 66%,#3a2115 69% 100%);
        box-shadow:inset 4px 0 7px rgba(255,255,255,.08),inset -5px 0 8px rgba(15,7,3,.45),0 4px 8px rgba(0,0,0,.24);
        opacity:0;transform:scale(.62)
      }
      .aw26-limb-wrap{position:absolute;inset:0;transform-origin:100% 55%;transform:scaleX(.02);opacity:0}
      .aw26-limb{
        position:absolute;right:22px;top:34px;width:158px;height:17px;
        clip-path:polygon(0 28%,14% 10%,28% 18%,43% 5%,57% 17%,72% 7%,87% 20%,100% 14%,100% 80%,85% 70%,70% 89%,56% 76%,41% 92%,27% 78%,13% 90%,0 72%);
        background:linear-gradient(180deg,rgba(255,255,255,.14) 0 9%,transparent 10%),linear-gradient(180deg,#946442 0%,#684128 51%,#362016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.11),0 5px 7px rgba(0,0,0,.2)
      }
      .aw26-limb::before{content:"";position:absolute;left:12%;right:8%;top:6px;height:2px;border-radius:999px;background:rgba(40,21,12,.42);transform:rotate(-1deg)}
      .aw26-twig{position:absolute;left:18px;top:24px;width:52px;height:6px;border-radius:999px;background:linear-gradient(180deg,#815331,#3d2417);transform:rotate(-19deg);transform-origin:100% 50%}
      .aw26-stem-a,.aw26-stem-b{position:absolute;width:27px;height:3px;border-radius:999px;background:#4a321d;transform-origin:100% 50%}
      .aw26-stem-a{left:5px;top:18px;transform:rotate(-35deg)}
      .aw26-stem-b{left:25px;top:9px;transform:rotate(18deg)}
      .aw26-leaf{position:absolute;width:25px;height:15px;border-radius:80% 0 80% 0;background:linear-gradient(135deg,#a1cc70 0%,#548f4e 60%,#255f38 100%);box-shadow:inset 0 1px rgba(255,255,255,.25);opacity:0;transform:scale(.25)}
      .aw26-leaf.a{left:-3px;top:4px;transform:rotate(-25deg) scale(.25)}
      .aw26-leaf.b{left:29px;top:-1px;transform:rotate(19deg) scale(.25)}
      .aw26-target{position:absolute;left:54px;top:33px;width:2px;height:2px}
      .aw26-perch.grow .aw26-knot{animation:aw26Knot .38s ease-out forwards}
      .aw26-perch.grow .aw26-limb-wrap{animation:aw26Grow .65s .1s cubic-bezier(.2,.82,.16,1) forwards}
      .aw26-perch.grow .aw26-leaf{animation:aw26Leaf .32s .53s ease-out forwards}
      .aw26-perch.settle{animation:aw26Settle .48s ease-out}

      #aw26Flyer{position:fixed;z-index:30;width:124px;aspect-ratio:218/309;pointer-events:none;opacity:0;filter:drop-shadow(0 7px 7px rgba(25,14,8,.2));transform-origin:50% 88%}
      .aw26-body{
        position:absolute;left:0;top:0;width:100%;height:88%;overflow:hidden;
        background-image:url('assets/annie.webp');background-repeat:no-repeat;background-size:100% auto;background-position:center top;
        clip-path:polygon(4% 0,96% 0,100% 18%,98% 44%,96% 72%,89% 98%,11% 98%,4% 73%,2% 42%,0 18%)
      }
      .aw26-feet{position:absolute;left:19%;right:19%;bottom:0;height:18%;display:flex;justify-content:space-between;align-items:flex-start}
      .aw26-foot{position:relative;width:43%;height:100%}
      .aw26-claw{position:absolute;top:0;width:32%;height:72%;border-radius:48% 48% 44% 44%;background:linear-gradient(90deg,#d98b12,#ffc84a 44%,#e5a220 100%);border:1px solid rgba(76,38,12,.48);box-shadow:inset 0 1px 1px rgba(255,255,255,.35)}
      .aw26-claw::after{content:"";position:absolute;left:35%;bottom:-12%;width:34%;height:24%;border-radius:0 0 70% 70%;background:#3b2318;transform:skewX(-10deg)}
      .aw26-claw.c1{left:0;transform:rotate(8deg)}
      .aw26-claw.c2{left:33%;transform:translateY(-3%) rotate(1deg)}
      .aw26-claw.c3{right:0;transform:rotate(-8deg)}
      .aw26-wink{position:absolute;left:22%;top:27%;width:22%;height:15%;border-radius:52% 52% 45% 45%;background:linear-gradient(180deg,#a65b25 0 34%,#f2d6a5 38% 100%);border-bottom:3px solid #35170c;opacity:0;transform:scaleY(.25);transform-origin:50% 70%}
      #aw26Flyer.wink .aw26-wink{animation:aw26Wink .42s ease-in-out}

      .aw26-bubble{
        position:absolute;z-index:9;left:14px;top:26px;width:min(224px,calc(100% - 164px));
        padding:12px 15px;border:3px solid #c99b35;border-radius:24px 26px 22px 28px;
        background:linear-gradient(180deg,#fffaf0 0%,#f8efd9 100%);color:#123f33;
        font:800 15px/1.27 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 8px 18px rgba(53,37,18,.14);opacity:0;transform:translateY(7px) scale(.94);pointer-events:none
      }
      .aw26-bubble::after{
        content:"";position:absolute;right:-17px;bottom:19px;width:27px;height:24px;
        background:#f8efd9;border-right:3px solid #c99b35;border-bottom:3px solid #c99b35;
        clip-path:polygon(0 0,100% 54%,0 100%);transform:rotate(-7deg)
      }
      .aw26-bubble.show{animation:aw26Bubble .38s cubic-bezier(.2,.84,.23,1) forwards}

      @keyframes aw26Knot{to{opacity:1;transform:scale(1)}}
      @keyframes aw26Grow{to{opacity:1;transform:scaleX(1)}}
      @keyframes aw26Leaf{to{opacity:1;transform:scale(1)}}
      @keyframes aw26Settle{0%{transform:rotate(0)}38%{transform:rotate(1.4deg)}72%{transform:rotate(-.5deg)}100%{transform:rotate(0)}}
      @keyframes aw26Bubble{to{opacity:1;transform:translateY(0) scale(1)}}
      @keyframes aw26Wink{0%,100%{opacity:0;transform:scaleY(.25)}30%,70%{opacity:1;transform:scaleY(1)}}

      @media(max-width:520px){
        .aw26-bark{width:25px}
        #aw26Stage{height:180px!important;min-height:180px!important;margin-top:22px!important}
        .aw26-perch{right:-25px;top:91px;width:176px}
        .aw26-limb{width:151px}
        .aw26-bubble{left:10px;top:22px;width:min(208px,calc(100% - 148px));padding:10px 12px;font-size:14px;border-radius:22px}
      }
      @media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}.aw26-perch.grow .aw26-knot,.aw26-perch.grow .aw26-limb-wrap,.aw26-perch.grow .aw26-leaf,.aw26-bubble.show{animation-duration:.01ms!important;animation-delay:0ms!important}}
    `;
    document.head.appendChild(style);
  };

  const buildStage = source => {
    const stage = document.createElement('div');
    stage.id = 'aw26Stage';
    stage.innerHTML = `
      <div class="aw26-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw26-perch" aria-hidden="true">
        <div class="aw26-knot"></div>
        <div class="aw26-limb-wrap">
          <div class="aw26-limb"></div>
          <div class="aw26-twig"></div>
          <div class="aw26-stem-a"></div><div class="aw26-stem-b"></div>
          <div class="aw26-leaf a"></div><div class="aw26-leaf b"></div>
        </div>
        <span class="aw26-target"></span>
      </div>`;

    const portrait = source.parentElement;
    portrait.insertAdjacentElement('afterend', stage);
    return stage;
  };

  const buildFlyer = () => {
    const flyer = document.createElement('div');
    flyer.id = 'aw26Flyer';
    flyer.setAttribute('aria-label','Arborwise Annie');
    flyer.innerHTML = `
      <div class="aw26-body"></div>
      <div class="aw26-wink"></div>
      <div class="aw26-feet">
        <div class="aw26-foot"><i class="aw26-claw c1"></i><i class="aw26-claw c2"></i><i class="aw26-claw c3"></i></div>
        <div class="aw26-foot"><i class="aw26-claw c1"></i><i class="aw26-claw c2"></i><i class="aw26-claw c3"></i></div>
      </div>`;
    document.body.appendChild(flyer);
    return flyer;
  };

  const installBark = () => {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw26-bark left';
    right.className = 'aw26-bark right';
    document.body.append(left,right);
  };

  const start = () => {
    removeOld();
    addStyles();
    installBark();

    const source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return;

    const stage = buildStage(source);
    const perch = stage.querySelector('.aw26-perch');
    const target = stage.querySelector('.aw26-target');
    const bubble = stage.querySelector('.aw26-bubble');
    const flyer = buildFlyer();
    let launched = false;

    const land = async () => {
      if (launched) return;
      launched = true;
      perch.classList.add('grow');

      if (reducedMotion) {
        await new Promise(r => setTimeout(r,20));
      } else {
        await new Promise(r => setTimeout(r,420));
      }

      const sourceRect = source.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const startWidth = Math.min(210, Math.max(150, sourceRect.width * .58));
      const endWidth = window.innerWidth < 520 ? 112 : 122;
      const startLeft = sourceRect.left + sourceRect.width * .5 - startWidth * .5;
      const startTop = sourceRect.top + sourceRect.height * .09;
      const endLeft = targetRect.left - endWidth * .5;
      const endTop = targetRect.top - endWidth * 1.36;

      flyer.style.left = `${startLeft}px`;
      flyer.style.top = `${startTop}px`;
      flyer.style.width = `${startWidth}px`;
      flyer.style.opacity = '0';

      if (reducedMotion) {
        flyer.style.left = `${endLeft}px`;
        flyer.style.top = `${endTop}px`;
        flyer.style.width = `${endWidth}px`;
        flyer.style.opacity = '1';
      } else {
        await flyer.animate([
          {left:`${startLeft}px`,top:`${startTop}px`,width:`${startWidth}px`,opacity:0,transform:'translate3d(0,0,0) rotate(0deg)'},
          {offset:.16,left:`${startLeft + 8}px`,top:`${startTop + 16}px`,width:`${startWidth * .94}px`,opacity:1,transform:'translate3d(0,0,0) rotate(-1.5deg)'},
          {offset:.72,left:`${endLeft - 22}px`,top:`${endTop - 18}px`,width:`${endWidth * 1.08}px`,opacity:1,transform:'translate3d(0,0,0) rotate(2deg)'},
          {left:`${endLeft}px`,top:`${endTop}px`,width:`${endWidth}px`,opacity:1,transform:'translate3d(0,0,0) rotate(0deg)'}
        ],{duration:1450,easing:'cubic-bezier(.22,.76,.18,1)',fill:'forwards'}).finished;
      }

      const stageRect = stage.getBoundingClientRect();
      const finalTarget = target.getBoundingClientRect();
      flyer.style.position = 'absolute';
      flyer.style.left = `${finalTarget.left - stageRect.left - endWidth * .5}px`;
      flyer.style.top = `${finalTarget.top - stageRect.top - endWidth * 1.36}px`;
      flyer.style.width = `${endWidth}px`;
      flyer.style.opacity = '1';
      flyer.style.transform = 'none';
      stage.appendChild(flyer);
      perch.classList.add('settle');

      setTimeout(() => {
        bubble.classList.add('show');
        setTimeout(() => {
          flyer.classList.add('wink');
          setTimeout(() => flyer.classList.remove('wink'),460);
        },420);
      },260);
    };

    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio > .32)) {
        observer.disconnect();
        land();
      }
    },{threshold:[.32,.5]});
    observer.observe(source);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();