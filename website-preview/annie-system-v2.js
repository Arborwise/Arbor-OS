(() => {
  'use strict';

  const OPENING = "Hi! I'm Arborwise Annie — glad you're here.";
  const TAP_TIPS = [
    'Whole tree. Concern. Trunk base.',
    'Cavities are clues — not automatic removals.',
    'Good pruning always has a reason.',
    'Keep mulch off the trunk flare.',
    'Send the address with clear photos.'
  ];
  const TARGETS = [
    ['.hero', OPENING],
    ['.trust-band', 'Certified guidance. Local accountability.'],
    ['#concerns', 'Start with what changed — and when?'],
    ['#services', 'Every service should solve a real problem.'],
    ['#planting, .growth-section', 'Keep the root flare visible.'],
    ['#way', 'Good advice explains what can wait.'],
    ['#estimate', 'Send the address and three clear photos.'],
    ['.faq-section', 'Tap a question for a straight answer.']
  ];

  [
    'arborwise-annie-system',
    'arborwise-annie-system-v2',
    'arborwise-annie-guide-v39',
    'arborwise-annie-way-v40',
    'arborwise-annie-bark-bubble-v41',
    'arborwise-annie-faq-v42',
    'arborwise-annie-idle-v43',
    'arborwise-annie-motion-bubble-v44',
    'arborwise-annie-bubble-center-v45',
    'arborwise-annie-bubble-anchor-v46'
  ].forEach(id => document.getElementById(id)?.remove());

  document.querySelectorAll(
    '.aw-v39-edge,.aw-v39-guide,.aw-annie-edge,.aw-annie-guide,.aw2-edge,.aw2-guide'
  ).forEach(node => node.remove());

  const style = document.createElement('style');
  style.id = 'arborwise-annie-system-v2';
  style.textContent = `
    html,body{overflow-x:clip!important}

    .annie-callout.aw2-section{
      display:block!important;
      position:relative!important;
      overflow:visible!important;
      text-align:center!important;
    }
    .annie-callout.aw2-section>div{max-width:760px!important;margin-inline:auto!important}
    .aw2-token{
      display:grid;
      place-items:center;
      width:188px;
      height:188px;
      margin:0 auto 15px;
      overflow:hidden;
      border:4px solid #d7a542;
      border-radius:50%;
      background:#083226;
      box-shadow:0 14px 30px rgba(4,35,26,.2),inset 0 1px rgba(255,255,255,.1);
    }
    .aw2-token img{display:block;width:160px;height:160px;object-fit:contain}

    .aw2-edge,.aw2-trunk-mask{
      pointer-events:none;
      background:
        radial-gradient(ellipse at 42% 8%,rgba(22,9,4,.9) 0 8%,rgba(129,83,50,.35) 9% 13%,transparent 14%),
        radial-gradient(ellipse at 67% 31%,rgba(19,7,3,.88) 0 7%,rgba(117,72,45,.32) 8% 12%,transparent 13%),
        radial-gradient(ellipse at 36% 58%,rgba(28,12,6,.9) 0 6%,rgba(137,89,53,.31) 7% 11%,transparent 12%),
        radial-gradient(ellipse at 65% 84%,rgba(18,7,3,.9) 0 7%,rgba(121,76,46,.34) 8% 12%,transparent 13%),
        linear-gradient(92deg,transparent 0 12%,rgba(19,7,3,.9) 13% 20%,transparent 21% 36%,rgba(51,24,12,.78) 37% 44%,transparent 45% 61%,rgba(20,7,3,.88) 62% 70%,transparent 71% 84%,rgba(59,29,15,.72) 85% 92%,transparent 93% 100%),
        linear-gradient(88deg,rgba(238,191,136,.08) 0 10%,transparent 11% 28%,rgba(245,204,153,.09) 29% 36%,transparent 37% 56%,rgba(231,178,122,.07) 57% 64%,transparent 65% 100%),
        linear-gradient(90deg,#211008 0%,#4a2a18 24%,#70482e 47%,#8a6041 57%,#55331f 77%,#211108 100%);
      background-size:100% 540px,100% 690px,100% 620px,100% 780px,100% 100%,100% 100%,100% 100%;
      box-shadow:inset 3px 0 6px rgba(13,5,2,.7),inset -3px 0 7px rgba(13,5,2,.72),0 0 7px rgba(0,0,0,.56);
      filter:saturate(.82) contrast(1.13);
    }
    .aw2-edge{position:fixed;z-index:940;top:0;bottom:0;width:18px;opacity:.98}
    .aw2-edge.left{left:0;clip-path:polygon(0 0,78% 0,91% 8%,72% 18%,96% 29%,74% 40%,89% 52%,69% 64%,95% 76%,73% 88%,87% 100%,0 100%)}
    .aw2-edge.right{right:0;clip-path:polygon(22% 0,100% 0,100% 100%,14% 100%,27% 88%,6% 76%,31% 64%,11% 52%,25% 40%,5% 29%,29% 18%,10% 8%)}

    /* Annie, her perch, and her balloon share one coordinate system. */
    .aw2-guide{
      position:fixed;
      z-index:950;
      bottom:78px;
      width:156px;
      height:160px;
      opacity:0;
      visibility:hidden;
      pointer-events:none;
      transition:opacity .2s ease,visibility 0s linear .24s;
    }
    .aw2-guide.right{right:0}
    .aw2-guide.left{left:0}
    .aw2-guide.show{opacity:1;visibility:visible;transition:opacity .2s ease}

    .aw2-trunk-mask{position:absolute;z-index:2;top:0;bottom:0;width:18px}
    .aw2-guide.right .aw2-trunk-mask{right:0}
    .aw2-guide.left .aw2-trunk-mask{left:0;transform:scaleX(-1)}

    .aw2-perch{
      position:absolute;
      z-index:3;
      bottom:12px;
      width:96px;
      height:18px;
      pointer-events:none;
      background:
        radial-gradient(ellipse at 28% 44%,rgba(28,10,4,.78) 0 10%,transparent 12%),
        linear-gradient(7deg,transparent 0 18%,rgba(238,191,136,.16) 19% 23%,transparent 24% 44%,rgba(25,8,3,.34) 45% 52%,transparent 53% 100%),
        linear-gradient(180deg,#a9764d 0%,#74472a 46%,#3a1d0e 78%,#211008 100%);
      border-radius:62% 18% 38% 66% / 54% 38% 58% 46%;
      box-shadow:0 3px 4px rgba(0,0,0,.45),inset 0 2px 1px rgba(255,224,183,.18),inset 0 -3px 3px rgba(20,7,3,.46);
      filter:saturate(.86) contrast(1.08);
    }
    .aw2-perch::after{
      content:"";
      position:absolute;
      top:3px;
      width:18px;
      height:12px;
      border-radius:50%;
      background:radial-gradient(ellipse,#1a0904 0 28%,#5a321d 31% 56%,transparent 60%);
      opacity:.9;
    }
    .aw2-guide.right .aw2-perch{
      right:0;
      clip-path:polygon(0 24%,100% 4%,100% 96%,0 72%);
    }
    .aw2-guide.right .aw2-perch::after{right:8px}
    .aw2-guide.left .aw2-perch{
      left:0;
      transform:scaleX(-1);
      clip-path:polygon(0 24%,100% 4%,100% 96%,0 72%);
    }
    .aw2-guide.left .aw2-perch::after{right:8px}

    .aw2-button{
      appearance:none;
      -webkit-appearance:none;
      -webkit-tap-highlight-color:transparent;
      position:absolute;
      z-index:5;
      bottom:4px;
      width:88px;
      padding:0;
      border:0;
      background:transparent;
      opacity:0;
      cursor:pointer;
      pointer-events:auto;
      touch-action:manipulation;
      filter:drop-shadow(0 6px 7px rgba(0,0,0,.24));
      transition:transform .72s cubic-bezier(.2,.78,.2,1),opacity .25s ease;
    }
    .aw2-guide.right .aw2-button{right:5px;transform:translate3d(106px,-18px,0) rotate(6deg) scale(.97)}
    .aw2-guide.left .aw2-button{left:5px;transform:translate3d(-106px,-18px,0) rotate(-6deg) scale(.97)}
    .aw2-guide.landed .aw2-button{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}
    .aw2-button img{display:block;width:100%;height:auto;transform-origin:center}
    .aw2-guide.left .aw2-button img{transform:scaleX(-1)}
    .aw2-button:focus{outline:none}
    .aw2-button:focus-visible{outline:2px solid #ff6a00;outline-offset:4px;border-radius:50%}

    /* The balloon sits directly above Annie. Its tapered tail ends at her beak. */
    .aw2-bubble{
      box-sizing:border-box;
      position:absolute;
      z-index:7;
      bottom:96px;
      display:flex;
      align-items:center;
      justify-content:center;
      width:108px;
      min-height:44px;
      margin:0;
      padding:8px 9px;
      overflow:visible;
      border:2px solid #174438;
      border-radius:25px 27px 24px 28px;
      background:#fffaf0;
      color:#123d31;
      font:850 9.1px/1.16 system-ui,-apple-system,"Segoe UI",sans-serif;
      letter-spacing:-.01em;
      text-align:center;
      box-shadow:0 7px 16px rgba(7,34,26,.18),2px 3px 0 rgba(20,61,49,.1);
      opacity:0;
      transform:translateY(4px) scale(.98);
      transition:opacity .2s ease,transform .2s ease;
      pointer-events:none;
    }
    .aw2-bubble.long{width:114px;min-height:48px;padding:8px 9px;font-size:8.9px}
    .aw2-bubble.show{opacity:1;transform:none}
    .aw2-guide.right .aw2-bubble{right:2px}
    .aw2-guide.left .aw2-bubble{left:2px}
    .aw2-bubble-copy{position:relative;z-index:2}

    .aw2-tail{
      position:absolute;
      z-index:1;
      bottom:-26px;
      width:34px;
      height:28px;
      overflow:visible;
    }
    .aw2-tail path{
      fill:#fffaf0;
      stroke:#174438;
      stroke-width:2;
      stroke-linecap:round;
      stroke-linejoin:round;
      vector-effect:non-scaling-stroke;
    }
    .aw2-guide.right .aw2-tail{left:42px}
    .aw2-guide.left .aw2-tail{right:42px;transform:scaleX(-1)}

    @media(max-width:700px){
      .aw2-token{width:180px;height:180px}
      .aw2-token img{width:154px;height:154px}
      .aw2-edge{width:14px}
      .aw2-guide{bottom:70px;width:148px;height:154px}
      .aw2-trunk-mask{width:14px}
      .aw2-button{width:84px}
      .aw2-guide.right .aw2-button{right:4px}
      .aw2-guide.left .aw2-button{left:4px}
      .aw2-perch{bottom:11px;width:90px;height:17px}
      .aw2-bubble{bottom:92px;width:102px;min-height:42px;padding:7px 8px;font-size:8.7px}
      .aw2-bubble.long{width:108px;min-height:46px;font-size:8.5px}
      .aw2-guide.right .aw2-bubble{right:1px}
      .aw2-guide.left .aw2-bubble{left:1px}
      .aw2-guide.right .aw2-tail{left:39px}
      .aw2-guide.left .aw2-tail{right:39px}
    }

    @media(prefers-reduced-motion:reduce){
      .aw2-guide,.aw2-button,.aw2-bubble{transition:none!important}
    }
  `;
  document.head.appendChild(style);

  function build() {
    const section = document.querySelector('.annie-callout');
    if (!section) return false;

    const sourceImage = section.querySelector('img[data-annie],.annie-badge img,.aw-annie-token img,.aw2-token img,img');
    if (!sourceImage) return false;
    const annieSource = sourceImage.currentSrc || sourceImage.src || 'assets/annie.webp';

    section.querySelector('.annie-badge')?.remove();
    section.querySelector('.aw-annie-token')?.remove();
    section.querySelector('.aw2-token')?.remove();
    if (sourceImage.isConnected) sourceImage.remove();

    section.classList.add('aw2-section');
    const content = section.querySelector(':scope > div') || section;
    const label = content.querySelector('.section-label');
    if (label) label.textContent = 'Meet Annie';

    const token = document.createElement('div');
    token.className = 'aw2-token';
    token.setAttribute('aria-label', 'Arborwise Annie');
    const tokenImage = new Image();
    tokenImage.src = annieSource;
    tokenImage.alt = '';
    tokenImage.decoding = 'async';
    token.appendChild(tokenImage);
    content.insertBefore(token, label || content.firstChild);

    ['left','right'].forEach(side => {
      const edge = document.createElement('div');
      edge.className = `aw2-edge ${side}`;
      edge.setAttribute('aria-hidden','true');
      document.body.appendChild(edge);
    });

    const guide = document.createElement('aside');
    guide.className = 'aw2-guide right';
    guide.setAttribute('aria-live','polite');
    guide.innerHTML = `
      <div class="aw2-bubble">
        <span class="aw2-bubble-copy"></span>
        <svg class="aw2-tail" viewBox="0 0 34 28" aria-hidden="true" focusable="false">
          <path d="M2 2 C11 4 18 8 23 14 C27 18 30 23 32 26 C26 24 21 22 17 19 C13 16 9 15 5 16 C8 12 7 7 2 2 Z"></path>
        </svg>
      </div>
      <div class="aw2-perch" aria-hidden="true"></div>
      <div class="aw2-trunk-mask" aria-hidden="true"></div>
    `;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'aw2-button';
    button.setAttribute('aria-label','See another Annie tip');
    const travelingImage = new Image();
    travelingImage.src = annieSource;
    travelingImage.alt = '';
    travelingImage.decoding = 'async';
    button.appendChild(travelingImage);
    guide.appendChild(button);
    document.body.appendChild(guide);

    const bubble = guide.querySelector('.aw2-bubble');
    const bubbleCopy = guide.querySelector('.aw2-bubble-copy');
    const targets = TARGETS.map(([selector,message]) => {
      const element = document.querySelector(selector);
      return element ? { element, message } : null;
    }).filter(Boolean);

    let activeTarget = -1;
    let tipIndex = 0;
    let bubbleTimer = 0;
    let idleTimer = 0;
    let moveTimer = 0;
    let frame = 0;

    const isVisible = () => document.visibilityState === 'visible' && guide.classList.contains('show') && guide.classList.contains('landed');

    function scheduleIdleTip() {
      window.clearTimeout(idleTimer);
      if (!isVisible()) return;
      idleTimer = window.setTimeout(() => {
        if (!isVisible()) return;
        showBubble(TAP_TIPS[tipIndex++ % TAP_TIPS.length]);
        scheduleIdleTip();
      },10000);
    }

    function showBubble(message) {
      window.clearTimeout(bubbleTimer);
      bubbleCopy.textContent = message;
      bubble.classList.toggle('long',message.length > 36);
      bubble.classList.add('show');
      bubbleTimer = window.setTimeout(() => bubble.classList.remove('show'),3600);
      scheduleIdleTip();
    }

    function landAt(index,immediate=false) {
      if (index === activeTarget && guide.classList.contains('landed')) return;
      activeTarget = index;
      const side = index % 2 === 0 ? 'right' : 'left';
      const message = targets[index]?.message || OPENING;
      window.clearTimeout(moveTimer);
      window.clearTimeout(idleTimer);
      guide.classList.add('show');
      guide.classList.remove('landed');
      bubble.classList.remove('show');
      moveTimer = window.setTimeout(() => {
        guide.classList.toggle('right',side === 'right');
        guide.classList.toggle('left',side === 'left');
        void guide.offsetWidth;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          guide.classList.add('landed');
          window.setTimeout(() => showBubble(message),immediate ? 180 : 380);
        }));
      },immediate ? 30 : 100);
    }

    function nearestTarget() {
      const focus = window.innerHeight * .56;
      let best = 0;
      let distance = Infinity;
      targets.forEach((target,index) => {
        const rect = target.element.getBoundingClientRect();
        const center = rect.top + Math.min(rect.height,window.innerHeight) / 2;
        const candidate = Math.abs(center - focus);
        if (candidate < distance) {
          distance = candidate;
          best = index;
        }
      });
      return best;
    }

    function update() {
      frame = 0;
      if (!targets.length) return;
      landAt(nearestTarget());
      scheduleIdleTip();
    }

    function requestUpdate() {
      if (!frame) frame = requestAnimationFrame(update);
    }

    button.addEventListener('click',event => {
      event.preventDefault();
      event.stopPropagation();
      showBubble(TAP_TIPS[tipIndex++ % TAP_TIPS.length]);
    });
    window.addEventListener('scroll',requestUpdate,{ passive:true });
    window.addEventListener('resize',requestUpdate,{ passive:true });
    window.addEventListener('pointerdown',scheduleIdleTip,{ passive:true });
    document.addEventListener('visibilitychange',scheduleIdleTip);

    if (targets.length) landAt(0,true);
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (build() || attempts > 80) window.clearInterval(timer);
  },100);
})();
