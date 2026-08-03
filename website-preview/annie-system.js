(() => {
  'use strict';

  const OPENING = "Hi! I'm Arborwise Annie & we're glad you're here!";
  const TAP_TIPS = [
    'Whole tree. Concern. Trunk base.',
    'Cavities are clues—not automatic removals.',
    'Good pruning always has a reason.',
    'Keep mulch off the trunk flare.',
    'Send the address with clear photos.'
  ];
  const TARGETS = [
    ['.hero', OPENING],
    ['.trust-band', 'Certified guidance. Local accountability.'],
    ['#concerns', 'Start with what changed—and when?'],
    ['#services', 'Every service should solve a real problem.'],
    ['#planting, .growth-section', 'Keep the root flare visible.'],
    ['#way', 'Good advice explains what can wait.'],
    ['#estimate', 'Send the address and three clear photos.'],
    ['.faq-section', 'Tap a question for a straight answer.']
  ];

  [
    'arborwise-annie-guide-v39', 'arborwise-annie-way-v40',
    'arborwise-annie-bark-bubble-v41', 'arborwise-annie-faq-v42',
    'arborwise-annie-idle-v43', 'arborwise-annie-motion-bubble-v44',
    'arborwise-annie-bubble-center-v45', 'arborwise-annie-bubble-anchor-v46',
    'arborwise-annie-system'
  ].forEach(id => document.getElementById(id)?.remove());
  document.querySelectorAll('.aw-v39-edge,.aw-v39-guide,.aw-annie-edge,.aw-annie-guide').forEach(node => node.remove());

  const style = document.createElement('style');
  style.id = 'arborwise-annie-system';
  style.textContent = `
    html,body{overflow-x:clip!important}

    /* One deliberate hero palette: ivory, Arborwise gold, and forest green. */
    html body .hero.aw-hero .aw-kicker{
      display:block!important;width:auto!important;max-width:100%!important;
      margin:0 0 14px!important;padding:0!important;color:#efc45f!important;
      background:transparent!important;border:0!important;border-radius:0!important;
      box-shadow:none!important;outline:0!important;
      font:950 clamp(.76rem,2.4vw,1rem)/1.15 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      letter-spacing:.09em!important;text-align:center!important;text-transform:uppercase!important;
      text-shadow:0 2px 8px rgba(0,0,0,.9)!important;-webkit-text-stroke:0!important;
      white-space:normal!important;
    }
    html body .hero.aw-hero .aw-kicker::before,
    html body .hero.aw-hero .aw-kicker::after{content:none!important;display:none!important}
    html body .hero.aw-hero .aw-copy h1{
      max-width:11ch!important;margin:0 auto 12px!important;
      color:#fffaf0!important;font-size:clamp(3.4rem,8vw,6.5rem)!important;
      line-height:.9!important;letter-spacing:-.045em!important;text-align:center!important;
      text-shadow:0 4px 18px rgba(0,0,0,.78)!important;
    }
    html body .hero.aw-hero .aw-copy h1 span{
      color:#efc45f!important;text-shadow:0 4px 18px rgba(0,0,0,.85)!important;
    }
    html body .hero.aw-hero .aw-copy h1 sup{color:#fffaf0!important;font-size:.2em!important;top:-2.2em!important}
    html body .hero.aw-hero .aw-lead,
    html body .hero.aw-hero .aw-copy>p:not(.aw-kicker){
      color:#fffaf0!important;text-shadow:0 2px 9px rgba(0,0,0,.95)!important;
    }
    html body .main-nav a:last-child{color:#efc45f!important}
    html body .hero.aw-hero .aw-slogan{display:none!important}

    /* Annie's stationary introduction. */
    .annie-callout.aw-annie-section{display:block!important;position:relative!important;overflow:visible!important;text-align:center!important}
    .annie-callout.aw-annie-section>div{max-width:760px!important;margin-inline:auto!important}
    .aw-annie-token{
      display:grid;place-items:center;width:188px;height:188px;margin:0 auto 15px;overflow:hidden;
      border:4px solid #d7a542;border-radius:50%;background:#083226;
      box-shadow:0 14px 30px rgba(4,35,26,.2),inset 0 1px rgba(255,255,255,.1)
    }
    .aw-annie-token img{display:block;width:160px;height:160px;object-fit:contain}

    /* Side trunks and the small mask that makes Annie emerge from them. */
    .aw-annie-edge,.aw-annie-trunk-mask{pointer-events:none;background:
      radial-gradient(ellipse at 42% 8%,rgba(22,9,4,.9) 0 8%,rgba(129,83,50,.35) 9% 13%,transparent 14%),
      radial-gradient(ellipse at 67% 31%,rgba(19,7,3,.88) 0 7%,rgba(117,72,45,.32) 8% 12%,transparent 13%),
      radial-gradient(ellipse at 36% 58%,rgba(28,12,6,.9) 0 6%,rgba(137,89,53,.31) 7% 11%,transparent 12%),
      radial-gradient(ellipse at 65% 84%,rgba(18,7,3,.9) 0 7%,rgba(121,76,46,.34) 8% 12%,transparent 13%),
      linear-gradient(92deg,transparent 0 12%,rgba(19,7,3,.9) 13% 20%,transparent 21% 36%,rgba(51,24,12,.78) 37% 44%,transparent 45% 61%,rgba(20,7,3,.88) 62% 70%,transparent 71% 84%,rgba(59,29,15,.72) 85% 92%,transparent 93% 100%),
      linear-gradient(88deg,rgba(238,191,136,.08) 0 10%,transparent 11% 28%,rgba(245,204,153,.09) 29% 36%,transparent 37% 56%,rgba(231,178,122,.07) 57% 64%,transparent 65% 100%),
      linear-gradient(90deg,#211008 0%,#4a2a18 24%,#70482e 47%,#8a6041 57%,#55331f 77%,#211108 100%);
      background-size:100% 540px,100% 690px,100% 620px,100% 780px,100% 100%,100% 100%,100% 100%;
      box-shadow:inset 3px 0 6px rgba(13,5,2,.7),inset -3px 0 7px rgba(13,5,2,.72),0 0 7px rgba(0,0,0,.56);
      filter:saturate(.82) contrast(1.13)
    }
    .aw-annie-edge{position:fixed;z-index:940;top:0;bottom:0;width:18px;opacity:.98}
    .aw-annie-edge.left{left:0;clip-path:polygon(0 0,78% 0,91% 8%,72% 18%,96% 29%,74% 40%,89% 52%,69% 64%,95% 76%,73% 88%,87% 100%,0 100%)}
    .aw-annie-edge.right{right:0;clip-path:polygon(22% 0,100% 0,100% 100%,14% 100%,27% 88%,6% 76%,31% 64%,11% 52%,25% 40%,5% 29%,29% 18%,10% 8%)}

    .aw-annie-guide{
      position:fixed;z-index:950;bottom:82px;width:194px;height:144px;
      opacity:0;visibility:hidden;pointer-events:none;
      transition:opacity .2s ease,visibility 0s linear .24s
    }
    .aw-annie-guide.right{right:0}.aw-annie-guide.left{left:0}
    .aw-annie-guide.show{opacity:1;visibility:visible;transition:opacity .2s ease}
    .aw-annie-trunk-mask{position:absolute;z-index:2;top:0;bottom:0;width:18px}
    .aw-annie-guide.right .aw-annie-trunk-mask{right:0}
    .aw-annie-guide.left .aw-annie-trunk-mask{left:0;transform:scaleX(-1)}

    /* Bark-textured bridge makes Annie's perch grow naturally from the side trunk. */
    .aw-annie-perch-bridge{
      position:absolute;z-index:3;bottom:13px;width:92px;height:18px;pointer-events:none;
      background:
        radial-gradient(ellipse at 28% 44%,rgba(28,10,4,.78) 0 10%,transparent 12%),
        linear-gradient(7deg,transparent 0 18%,rgba(238,191,136,.16) 19% 23%,transparent 24% 44%,rgba(25,8,3,.34) 45% 52%,transparent 53% 100%),
        linear-gradient(180deg,#a9764d 0%,#74472a 46%,#3a1d0e 78%,#211008 100%);
      border-radius:62% 18% 38% 66% / 54% 38% 58% 46%;
      box-shadow:0 3px 4px rgba(0,0,0,.45),inset 0 2px 1px rgba(255,224,183,.18),inset 0 -3px 3px rgba(20,7,3,.46);
      filter:saturate(.86) contrast(1.08)
    }
    .aw-annie-perch-bridge::after{
      content:"";position:absolute;top:3px;width:18px;height:12px;border-radius:50%;
      background:radial-gradient(ellipse,#1a0904 0 28%,#5a321d 31% 56%,transparent 60%);
      opacity:.9
    }
    .aw-annie-guide.right .aw-annie-perch-bridge{
      right:0;clip-path:polygon(0 24%,100% 4%,100% 96%,0 72%)
    }
    .aw-annie-guide.right .aw-annie-perch-bridge::after{right:8px}
    .aw-annie-guide.left .aw-annie-perch-bridge{
      left:0;transform:scaleX(-1);clip-path:polygon(0 24%,100% 4%,100% 96%,0 72%)
    }
    .aw-annie-guide.left .aw-annie-perch-bridge::after{right:8px}

    .aw-annie-button{
      appearance:none;-webkit-appearance:none;-webkit-tap-highlight-color:transparent;
      position:absolute;z-index:5;bottom:5px;width:88px;padding:0;border:0;background:transparent;
      opacity:0;cursor:pointer;pointer-events:auto;touch-action:manipulation;
      filter:drop-shadow(0 6px 7px rgba(0,0,0,.24));
      transition:transform .72s cubic-bezier(.2,.78,.2,1),opacity .25s ease
    }
    .aw-annie-guide.right .aw-annie-button{right:10px;transform:translate3d(112px,-22px,0) rotate(7deg) scale(.96)}
    .aw-annie-guide.left .aw-annie-button{left:10px;transform:translate3d(-112px,-22px,0) rotate(-7deg) scale(.96)}
    .aw-annie-guide.landed .aw-annie-button{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}
    .aw-annie-button img{display:block;width:100%;height:auto;transform-origin:center}
    .aw-annie-guide.left .aw-annie-button img{transform:scaleX(-1)}
    .aw-annie-button:focus{outline:none}
    .aw-annie-button:focus-visible{outline:2px solid #d9f378;outline-offset:4px;border-radius:50%}

    /* Solid comic bubble with one smooth, curved tail aimed at Annie's beak. */
    .aw-annie-bubble{
      position:absolute;z-index:7;bottom:91px;display:flex;align-items:center;justify-content:center;
      width:128px;min-height:45px;margin:0;padding:8px 11px;border:2px solid #153c30;
      border-radius:46% 52% 47% 55% / 51% 44% 58% 48%;
      background:#fffaf0;color:#123d31;
      font:850 10px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;
      letter-spacing:-.01em;text-align:center;
      box-shadow:2px 3px 0 rgba(18,45,35,.13),0 7px 15px rgba(15,48,37,.16);
      opacity:0;transform:translateY(4px) scale(.97);
      transition:opacity .22s ease,transform .22s ease;pointer-events:none;overflow:visible
    }
    .aw-annie-bubble.long{width:144px;min-height:50px;padding:9px 12px;font-size:10px}
    .aw-annie-bubble.show{opacity:1;transform:none}
    .aw-annie-guide.right .aw-annie-bubble{right:28px;rotate:-1deg}
    .aw-annie-guide.left .aw-annie-bubble{left:28px;rotate:1deg}
    .aw-annie-bubble-copy{position:relative;z-index:2}
    .aw-annie-tail{position:absolute;z-index:1;bottom:-31px;width:46px;height:38px;overflow:visible}
    .aw-annie-tail path{fill:#fffaf0;stroke:#153c30;stroke-width:2.1;stroke-linejoin:round;vector-effect:non-scaling-stroke}
    .aw-annie-guide.right .aw-annie-tail{right:12px}
    .aw-annie-guide.left .aw-annie-tail{left:12px;transform:scaleX(-1)}

    /* Mobile hierarchy and breathing room. */
    @media(max-width:700px){
      html body .hero.aw-hero .aw-copy{min-height:0!important;padding:30px 20px 48px!important;justify-content:flex-start!important}
      html body .hero.aw-hero .aw-kicker{max-width:330px!important;margin:0 auto 12px!important;font-size:.82rem!important;line-height:1.2!important}
      html body .hero.aw-hero .aw-copy h1{font-size:clamp(3.25rem,14vw,4.55rem)!important;line-height:.88!important;margin-bottom:13px!important}
      html body .hero.aw-hero .aw-lead,
      html body .hero.aw-hero .aw-copy>p:not(.aw-kicker){max-width:33ch!important;margin-inline:auto!important;font-size:1rem!important;line-height:1.28!important}
      html body .intro-section .section-head h2{max-width:12ch!important;margin-inline:auto!important;font-size:clamp(2.25rem,10.6vw,3.2rem)!important;line-height:.96!important;letter-spacing:-.035em!important}

      .aw-annie-token{width:180px;height:180px}.aw-annie-token img{width:154px;height:154px}
      .aw-annie-edge{width:14px}
      .aw-annie-guide{width:186px;height:138px;bottom:70px}
      .aw-annie-trunk-mask{width:14px}
      .aw-annie-button{width:84px}
      .aw-annie-guide.right .aw-annie-button{right:9px}
      .aw-annie-guide.left .aw-annie-button{left:9px}
      .aw-annie-perch-bridge{bottom:12px;width:86px;height:17px}
      .aw-annie-bubble{bottom:87px;width:122px;min-height:42px;padding:7px 10px;font-size:9.6px}
      .aw-annie-bubble.long{width:138px;min-height:48px;padding:8px 11px;font-size:9.8px}
      .aw-annie-guide.right .aw-annie-bubble{right:25px}
      .aw-annie-guide.left .aw-annie-bubble{left:25px}

      html body .mobile-bar{
        min-height:68px!important;height:68px!important;padding:0!important;
        transform:translateY(115%)!important;transition:transform .25s ease!important;
      }
      html body.aw-contact-ready .mobile-bar{transform:translateY(0)!important}
      html body .mobile-bar a{min-height:68px!important;padding:7px 4px!important;gap:2px!important}
      html body .mobile-bar a span{font-size:1.15rem!important;line-height:1!important}
      html body .mobile-bar a strong{font-size:.83rem!important;line-height:1.05!important}
    }

    @media(prefers-reduced-motion:reduce){
      .aw-annie-guide,.aw-annie-button,.aw-annie-bubble,.mobile-bar{transition:none!important}
    }
  `;
  document.head.appendChild(style);

  function normalizeHeroKicker() {
    const hero = document.querySelector('.hero.aw-hero');
    const copy = hero?.querySelector('.aw-copy');
    if (!hero || !copy) return false;
    const candidates = [...copy.querySelectorAll('.aw-kicker,.section-label,.section-label-light')];
    let kicker = candidates[0];
    if (!kicker) {
      kicker = document.createElement('p');
      copy.prepend(kicker);
    }
    kicker.className = 'aw-kicker';
    kicker.textContent = 'PROFESSIONAL NORTH TEXAS TREE CARE';
    candidates.filter(node => node !== kicker).forEach(node => node.remove());
    return true;
  }

  function repairConcernPhoto() {
    const image = document.querySelector('.concern-card[data-concern="leaves"] img');
    if (!image) return false;
    image.alt = 'North Texas tree foliage viewed for visible leaf stress';
    if (!image.complete || image.naturalWidth === 0 || /concern-leaves\.webp(?:$|\?)/i.test(image.currentSrc || image.src)) {
      image.src = 'assets/healthy-tree.webp';
    }
    image.onerror = () => {
      image.onerror = null;
      image.src = 'assets/healthy-tree.webp';
    };
    return true;
  }

  function installScrollState() {
    const update = () => document.body.classList.toggle('aw-contact-ready', window.scrollY > 140);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  function build() {
    const section = document.querySelector('.annie-callout');
    if (!section) return false;
    const sourceImage = section.querySelector('img[data-annie],.annie-badge img,img');
    if (!sourceImage) return false;
    const annieSource = sourceImage.currentSrc || sourceImage.src || 'assets/annie.webp';
    const oldBadge = sourceImage.closest('.annie-badge');
    if (oldBadge) oldBadge.remove();
    else sourceImage.remove();

    section.classList.add('aw-annie-section');
    const content = section.querySelector(':scope > div') || section;
    const label = content.querySelector('.section-label');
    if (label) label.textContent = 'Meet Annie';
    document.getElementById('annieButton')?.remove();
    content.querySelector('.aw-annie-token')?.remove();

    const token = document.createElement('div');
    token.className = 'aw-annie-token';
    token.setAttribute('aria-label', 'Arborwise Annie');
    const tokenImage = new Image();
    tokenImage.src = annieSource;
    tokenImage.alt = '';
    tokenImage.decoding = 'async';
    tokenImage.onerror = () => { token.hidden = true; };
    token.appendChild(tokenImage);
    content.insertBefore(token, label || content.firstChild);

    ['left', 'right'].forEach(side => {
      const edge = document.createElement('div');
      edge.className = `aw-annie-edge ${side}`;
      edge.setAttribute('aria-hidden', 'true');
      document.body.appendChild(edge);
    });

    const guide = document.createElement('aside');
    guide.className = 'aw-annie-guide right';
    guide.setAttribute('aria-live', 'polite');
    guide.innerHTML = `
      <div class="aw-annie-bubble">
        <span class="aw-annie-bubble-copy"></span>
        <svg class="aw-annie-tail" viewBox="0 0 46 38" aria-hidden="true" focusable="false">
          <path d="M4 2 C15 7 22 14 29 25 C32 30 36 34 42 36 C35 36 27 33 21 30 C16 27 12 27 8 28 C13 22 12 12 4 2 Z"></path>
        </svg>
      </div>
      <div class="aw-annie-perch-bridge" aria-hidden="true"></div>
      <div class="aw-annie-trunk-mask" aria-hidden="true"></div>
    `;

    const annieButton = document.createElement('button');
    annieButton.type = 'button';
    annieButton.className = 'aw-annie-button';
    annieButton.setAttribute('aria-label', 'See another Annie tip');
    const travelingImage = new Image();
    travelingImage.src = annieSource;
    travelingImage.alt = '';
    travelingImage.decoding = 'async';
    travelingImage.onerror = () => { guide.hidden = true; };
    annieButton.appendChild(travelingImage);
    guide.appendChild(annieButton);
    document.body.appendChild(guide);

    const bubble = guide.querySelector('.aw-annie-bubble');
    const bubbleCopy = guide.querySelector('.aw-annie-bubble-copy');
    const targets = TARGETS
      .map(([selector, message]) => {
        const element = document.querySelector(selector);
        return element ? { element, message } : null;
      })
      .filter(Boolean);

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
      }, 10000);
    }

    function showBubble(message) {
      window.clearTimeout(bubbleTimer);
      bubbleCopy.textContent = message;
      bubble.classList.toggle('long', message.length > 38);
      bubble.classList.add('show');
      bubbleTimer = window.setTimeout(() => bubble.classList.remove('show'), 3800);
      scheduleIdleTip();
    }

    function landAt(index, immediate = false) {
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
        guide.classList.toggle('right', side === 'right');
        guide.classList.toggle('left', side === 'left');
        void guide.offsetWidth;
        requestAnimationFrame(() => requestAnimationFrame(() => {
          guide.classList.add('landed');
          window.setTimeout(() => showBubble(message), immediate ? 220 : 430);
        }));
      }, immediate ? 40 : 110);
    }

    function nearestTarget() {
      const focus = window.innerHeight * .56;
      let best = 0;
      let distance = Infinity;
      targets.forEach((target, index) => {
        const rect = target.element.getBoundingClientRect();
        const center = rect.top + Math.min(rect.height, window.innerHeight) / 2;
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

    annieButton.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showBubble(TAP_TIPS[tipIndex++ % TAP_TIPS.length]);
    });
    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    window.addEventListener('pointerdown', scheduleIdleTip, { passive: true });
    document.addEventListener('visibilitychange', scheduleIdleTip);
    if (targets.length) landAt(0, true);
    return true;
  }

  installScrollState();
  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const ready = normalizeHeroKicker() && repairConcernPhoto() && build();
    if (ready || attempts > 80) window.clearInterval(timer);
  }, 100);
})();
