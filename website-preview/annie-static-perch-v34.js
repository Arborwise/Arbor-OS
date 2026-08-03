(() => {
  'use strict';

  const INTRO = 'Hi! I’m Arborwise Annie! We’re glad you’re here!';
  const ASSET = 'assets/annie-approved-flight-v30.b64?v=20260802-2317';

  function cleanup() {
    document.querySelectorAll(
      '.aw-v34-stage,.aw-v34-bark,' +
      '.aw-v33-stage,.aw-v33-bark,.aw-v33-flyer,' +
      '.aw-v32-stage,.aw-v32-bark,.aw-v32-flyer,' +
      '.aw-v31-stage,.aw-v31-bark,.aw-v31-flyer,' +
      '#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,' +
      '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,.aw-oak-trunk-edge'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-branch-to-branch-"],' +
      '[id^="arborwise-annie-portrait-to-perch-"],[id^="arborwise-annie-static-perch-"]'
    ).forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-static-perch-v34';
    style.textContent = `
      html body{overflow-x:hidden!important}
      .annie-callout{position:relative!important;overflow:visible!important}

      .aw-v34-bark{
        position:fixed;z-index:2;top:0;bottom:0;width:27px;pointer-events:none;opacity:.95;
        background:
          radial-gradient(ellipse at 30% 9%,rgba(19,9,5,.92) 0 8%,transparent 9%) 0 0/100% 173px,
          radial-gradient(ellipse at 72% 38%,rgba(26,12,7,.86) 0 9%,transparent 10%) 0 31px/100% 211px,
          radial-gradient(ellipse at 35% 74%,rgba(24,11,6,.78) 0 7%,transparent 8%) 0 0/100% 241px,
          linear-gradient(90deg,#180c07 0%,#4f3220 21%,#8b684a 48%,#4a2e1d 74%,#160a06 100%);
        filter:drop-shadow(0 0 5px rgba(18,9,5,.4))
      }
      .aw-v34-bark::before{
        content:"";position:absolute;inset:0;
        background:
          linear-gradient(94deg,transparent 0 13%,rgba(15,7,4,.72) 18% 25%,transparent 29% 52%,rgba(27,12,6,.62) 56% 64%,transparent 68%),
          linear-gradient(86deg,transparent 0 31%,rgba(232,195,141,.16) 37% 44%,transparent 48% 73%,rgba(12,6,3,.52) 79% 87%,transparent 91%)
      }
      .aw-v34-bark.left{left:0;clip-path:polygon(0 0,77% 0,94% 5%,67% 12%,95% 20%,70% 29%,98% 39%,66% 49%,92% 59%,70% 69%,97% 78%,66% 88%,87% 100%,0 100%)}
      .aw-v34-bark.right{right:0;clip-path:polygon(23% 0,100% 0,100% 100%,13% 100%,33% 91%,5% 82%,32% 72%,3% 62%,34% 52%,6% 42%,33% 31%,5% 21%,32% 11%)}

      .aw-v34-stage{
        position:relative!important;display:block!important;width:100%!important;height:226px!important;
        min-height:226px!important;margin:14px 0 16px!important;overflow:visible!important;isolation:isolate!important
      }
      .aw-v34-perch{
        position:absolute;z-index:5;right:-15px;top:116px;width:202px;height:54px;pointer-events:none
      }
      .aw-v34-knot{
        position:absolute;right:-3px;top:2px;width:43px;height:43px;border-radius:48% 52% 45% 55%;
        background:radial-gradient(circle at 48% 49%,#251209 0 17%,#6d482f 20% 34%,#2b170e 37% 45%,#906546 48% 68%,#3b2216 71% 100%);
        box-shadow:inset 3px 0 5px rgba(255,255,255,.08),0 3px 6px rgba(0,0,0,.24)
      }
      .aw-v34-limb{
        position:absolute;right:20px;top:17px;width:190px;height:14px;
        clip-path:polygon(0 22%,12% 8%,24% 19%,38% 4%,52% 17%,66% 7%,81% 18%,100% 11%,100% 83%,82% 71%,66% 89%,52% 76%,37% 92%,23% 79%,10% 89%,0 72%);
        background:linear-gradient(180deg,#9a6e4b 0%,#6c452c 48%,#382016 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.12),0 4px 6px rgba(0,0,0,.21)
      }
      .aw-v34-limb::before,.aw-v34-limb::after{content:"";position:absolute;height:2px;border-radius:999px;background:rgba(47,26,16,.42)}
      .aw-v34-limb::before{left:12%;right:9%;top:4px;transform:rotate(-1deg)}
      .aw-v34-limb::after{left:6%;right:28%;bottom:3px;transform:rotate(1deg)}

      .aw-v34-annie{
        position:absolute;z-index:9;right:53px;top:22px;width:112px;pointer-events:none;
        filter:drop-shadow(0 5px 7px rgba(0,0,0,.22));transform-origin:50% 98%
      }
      .aw-v34-annie img{display:block;width:100%;height:auto}
      .aw-v34-eyelid{
        position:absolute;z-index:3;left:60.2%;top:25.8%;width:22%;height:8.6%;border-radius:50%;
        background:#f1dcae;border-bottom:2px solid #3b2117;opacity:0;transform:scaleY(.15)
      }
      .aw-v34-annie.wink .aw-v34-eyelid{animation:awV34Wink .42s ease-in-out 1}

      .aw-v34-bubble{
        position:absolute;z-index:10;left:7%;top:25px;width:min(174px,46vw);padding:9px 10px;
        border:2px solid #c49a35;border-radius:24px 22px 24px 19px;
        background:linear-gradient(180deg,#fffdf4,#f7f0d9);color:#0d4b3b;
        font:800 12px/1.22 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:center;
        box-shadow:0 5px 11px rgba(0,0,0,.1);opacity:0;transform:translateY(5px) scale(.96);pointer-events:none
      }
      .aw-v34-bubble::after{
        content:"";position:absolute;right:-8px;top:58%;width:13px;height:13px;
        background:#fbf7e8;border-top:2px solid #c49a35;border-right:2px solid #c49a35;transform:rotate(45deg)
      }
      .aw-v34-bubble.show{animation:awV34Bubble .32s cubic-bezier(.2,.85,.2,1) forwards}

      @keyframes awV34Bubble{to{opacity:1;transform:none}}
      @keyframes awV34Wink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

      @media(max-width:480px){
        .aw-v34-stage{height:218px!important;min-height:218px!important;margin-top:10px!important}
        .aw-v34-perch{right:-12px;top:113px;width:194px}
        .aw-v34-limb{width:182px}
        .aw-v34-annie{right:47px;top:26px;width:106px}
        .aw-v34-bubble{left:6%;top:26px;width:min(154px,42vw);font-size:11.4px;padding:8px 9px}
      }
      @media(min-width:701px){
        .aw-v34-stage{height:236px!important;min-height:236px!important}
        .aw-v34-perch{right:-18px;top:121px;width:212px}
        .aw-v34-limb{width:200px}
        .aw-v34-annie{right:62px;top:18px;width:118px}
        .aw-v34-bubble{left:18%;top:30px;width:184px;font-size:12.3px}
      }
      @media(prefers-reduced-motion:reduce){
        .aw-v34-bubble,.aw-v34-eyelid{animation:none!important;transition:none!important}
        .aw-v34-bubble{opacity:1!important;transform:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function installBark() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-v34-bark left';
    right.className = 'aw-v34-bark right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  async function loadApprovedAnnie() {
    const response = await fetch(ASSET, {cache:'no-store'});
    if (!response.ok) throw new Error(`Approved Annie asset returned ${response.status}`);
    const base64 = (await response.text()).replace(/\s+/g, '');
    const image = new Image();
    image.alt = 'Arborwise Annie perched on an oak branch';
    image.decoding = 'async';
    image.src = `data:image/webp;base64,${base64}`;
    await new Promise((resolve, reject) => {
      if (image.complete && image.naturalWidth) return resolve();
      image.onload = resolve;
      image.onerror = () => reject(new Error('Approved Annie could not be decoded'));
    });
    return image;
  }

  async function start() {
    cleanup();
    installStyles();
    installBark();

    const section = document.querySelector('.annie-callout');
    if (!section) {
      console.error('Ask Annie section was not found.');
      return;
    }

    const stage = document.createElement('div');
    stage.className = 'aw-v34-stage';
    stage.innerHTML = `
      <div class="aw-v34-bubble" role="status" aria-live="polite">${INTRO}</div>
      <div class="aw-v34-perch" aria-hidden="true">
        <div class="aw-v34-knot"></div>
        <div class="aw-v34-limb"></div>
      </div>`;

    const heading = section.querySelector('.eyebrow, h2, h3');
    if (heading) section.insertBefore(stage, heading);
    else section.appendChild(stage);

    try {
      const image = await loadApprovedAnnie();
      const annie = document.createElement('div');
      annie.className = 'aw-v34-annie';
      annie.appendChild(image);
      const eyelid = document.createElement('span');
      eyelid.className = 'aw-v34-eyelid';
      eyelid.setAttribute('aria-hidden', 'true');
      annie.appendChild(eyelid);
      stage.appendChild(annie);

      const bubble = stage.querySelector('.aw-v34-bubble');
      window.setTimeout(() => {
        bubble?.classList.add('show');
        window.setTimeout(() => {
          annie.classList.add('wink');
          window.setTimeout(() => annie.classList.remove('wink'), 500);
        }, 420);
      }, 250);
    } catch (error) {
      console.error(error);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, {once:true});
  } else {
    start();
  }
})();