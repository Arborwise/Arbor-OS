(() => {
  'use strict';

  const OPENING = "Hi! I'm Arborwise Annie & we're glad you're here!";
  const TIPS = [
    'Show us the whole tree, the concern, and the trunk base. Those three views help reveal the pattern.',
    'A cavity or thinning canopy is a clue, not a diagnosis. Location, movement, and nearby targets matter too.',
    'Good pruning has a reason. Every cut should improve structure, clearance, health, or long-term growth.',
    'Keep mulch off the trunk flare. Mulch belongs over the root zone, not piled against the bark.',
    'For a faster estimate, send the property address and clear photos of what has changed.'
  ];

  const CONTEXT = [
    ['.trust-band', OPENING],
    ['#services', 'Good tree work has a reason. Pruning, removal, and planting should each solve a specific problem.'],
    ['#planting, .growth-section', 'Planting depth matters. Keep the root flare visible and never pile mulch against the trunk.'],
    ['#way', 'A sound recommendation explains what needs action, what can wait, and why.'],
    ['#areas', 'Arborwise serves North Texas locally, so the people making the recommendation are accountable for the result.'],
    ['#estimate', 'For a faster estimate, send the address plus photos of the whole tree, the concern, and the trunk base.'],
    ['.faq-section', 'A cavity, lean, or thinning canopy is a clue, not a diagnosis. The whole site matters.']
  ];

  const section = document.querySelector('.annie-callout');
  if (!section) return;

  const sourceImage = section.querySelector('img[data-annie], .annie-badge img, img');
  const annieSource = sourceImage?.currentSrc || sourceImage?.src || 'assets/annie.webp';

  document.querySelectorAll(
    '.aw-v37-stage,.aw-v37-companion,.aw-v37-edge,.aw-v36-annie-panel,.aw-v36-companion,' +
    '.aw-v35-intro,.aw-v35-companion,.aw-v34-stage,.aw-v34-bark,.aw-v33-stage,.aw-v33-bark,' +
    '.aw-v33-flyer,.aw-v32-stage,.aw-v32-bark,.aw-v32-flyer,.aw-v31-stage,.aw-v31-bark,' +
    '.aw-v31-flyer,#awAnnieCharacter,#awAnnieScrollGuide,#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,' +
    '.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-annie-first-stage,.aw-oak-trunk-edge'
  ).forEach(node => node.remove());

  const oldBadge = sourceImage?.closest('.annie-badge');
  if (oldBadge) oldBadge.remove();
  else sourceImage?.remove();

  document.querySelectorAll(
    '#arborwise-annie-guide-v37,#arborwise-annie-v38-fixes,#arborwise-annie-context-guide-v35,' +
    '#arborwise-website-revision-v36,#arborwise-annie-guide-v39'
  ).forEach(node => node.remove());

  const style = document.createElement('style');
  style.id = 'arborwise-annie-guide-v39';
  style.textContent = `
    html,body{overflow-x:clip!important}

    .annie-callout.aw-v39-section{
      display:block!important;position:relative!important;text-align:center!important;overflow:visible!important
    }
    .annie-callout.aw-v39-section>div{max-width:760px!important;margin-inline:auto!important}
    .aw-v39-token{
      display:grid;place-items:center;width:196px;height:196px;margin:0 auto 15px;
      border:4px solid #d7a542;border-radius:50%;background:#083226;
      box-shadow:0 14px 30px rgba(4,35,26,.2),inset 0 1px rgba(255,255,255,.1);overflow:hidden
    }
    .aw-v39-token img{display:block;width:168px;height:168px;object-fit:contain}

    .aw-v39-edge{
      position:fixed;z-index:940;top:0;bottom:0;width:21px;pointer-events:none;opacity:.94;
      background:
        repeating-linear-gradient(98deg,transparent 0 4px,rgba(3,1,1,.9) 5px 8px,transparent 9px 13px),
        repeating-linear-gradient(84deg,rgba(135,91,57,.16) 0 2px,transparent 3px 10px),
        linear-gradient(90deg,#080302 0%,#201108 28%,#3a2114 53%,#1d0f08 78%,#060201 100%);
      box-shadow:0 0 8px rgba(0,0,0,.7)
    }
    .aw-v39-edge.left{left:0;clip-path:polygon(0 0,78% 0,96% 8%,73% 18%,98% 29%,72% 39%,94% 50%,70% 61%,98% 72%,73% 83%,92% 93%,75% 100%,0 100%)}
    .aw-v39-edge.right{right:0;clip-path:polygon(22% 0,100% 0,100% 100%,23% 100%,8% 92%,29% 82%,3% 72%,27% 61%,5% 50%,30% 39%,4% 29%,28% 18%,7% 8%)}

    .aw-v39-guide{
      position:fixed;z-index:950;width:226px;height:138px;bottom:101px;
      opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,visibility 0s linear .25s
    }
    .aw-v39-guide.right{right:0}
    .aw-v39-guide.left{left:0}
    .aw-v39-guide.show{opacity:1;visibility:visible;transition:opacity .2s ease}
    .aw-v39-guide .aw-v39-trunk-mask{
      position:absolute;z-index:4;top:0;bottom:0;width:23px;pointer-events:none;
      background:
        repeating-linear-gradient(98deg,transparent 0 4px,rgba(3,1,1,.94) 5px 8px,transparent 9px 13px),
        linear-gradient(90deg,#070201,#28150b 45%,#100704 100%);
      box-shadow:0 0 7px rgba(0,0,0,.65)
    }
    .aw-v39-guide.right .aw-v39-trunk-mask{right:0}
    .aw-v39-guide.left .aw-v39-trunk-mask{left:0;transform:scaleX(-1)}

    .aw-v39-perch{position:absolute;z-index:1;bottom:7px;width:108px;height:50px;pointer-events:none}
    .aw-v39-guide.right .aw-v39-perch{right:0}
    .aw-v39-guide.left .aw-v39-perch{left:0;transform:scaleX(-1)}
    .aw-v39-branch{
      position:absolute;right:8px;bottom:8px;width:98px;height:15px;
      clip-path:polygon(0 34%,14% 18%,29% 29%,45% 12%,61% 27%,78% 16%,100% 25%,100% 74%,79% 67%,61% 84%,45% 70%,29% 86%,13% 72%,0 64%);
      background:linear-gradient(180deg,#8a6243 0%,#593921 48%,#29170e 100%);
      box-shadow:inset 0 2px rgba(255,255,255,.1),inset 0 -3px rgba(18,8,4,.34),0 5px 8px rgba(0,0,0,.2)
    }
    .aw-v39-twig{position:absolute;right:52px;bottom:24px;width:48px;height:4px;border-radius:999px;background:linear-gradient(180deg,#6f482f,#2c190f);transform:rotate(-18deg);transform-origin:right center}
    .aw-v39-leaf{position:absolute;width:21px;height:12px;border-radius:100% 0 100% 0;background:linear-gradient(135deg,#789b4b,#356c38 58%,#174b28);box-shadow:inset -2px -2px 3px rgba(7,43,23,.3),0 2px 3px rgba(0,0,0,.15)}
    .aw-v39-leaf.one{right:79px;bottom:34px;transform:rotate(-28deg)}
    .aw-v39-leaf.two{right:58px;bottom:41px;transform:scaleX(-1) rotate(-18deg)}
    .aw-v39-leaf.three{right:37px;bottom:29px;transform:rotate(11deg)}

    .aw-v39-annie{
      appearance:none;-webkit-appearance:none;-webkit-tap-highlight-color:transparent;
      position:absolute;z-index:5;bottom:21px;width:78px;padding:0;border:0;background:transparent;
      opacity:0;cursor:pointer;pointer-events:auto;touch-action:manipulation;
      filter:drop-shadow(0 6px 7px rgba(0,0,0,.24));
      transition:transform .82s cubic-bezier(.2,.78,.2,1),opacity .28s ease
    }
    .aw-v39-guide.right .aw-v39-annie{right:9px;transform:translate3d(120px,-28px,0) rotate(8deg) scale(.96)}
    .aw-v39-guide.left .aw-v39-annie{left:9px;transform:translate3d(-120px,-28px,0) rotate(-8deg) scale(.96)}
    .aw-v39-guide.landed .aw-v39-annie{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}
    .aw-v39-annie img{display:block;width:100%;height:auto}
    .aw-v39-annie:focus{outline:none}
    .aw-v39-annie:focus-visible{outline:2px solid #d9f378;outline-offset:4px;border-radius:50%}
    .aw-v39-annie.blink::after{
      content:"";position:absolute;left:58%;top:27%;width:25%;height:7%;border-radius:50%;
      background:#efd9aa;border-bottom:2px solid #3a2116;animation:awV39Blink .38s ease-in-out 1
    }

    .aw-v39-bubble{
      position:absolute;z-index:6;top:0;width:145px;min-height:62px;padding:12px 14px;
      border:2px solid #d2a342;border-radius:48% 52% 46% 54% / 58% 54% 46% 42%;
      background:#fffdf5;color:#123f32;font:800 11.2px/1.29 system-ui,-apple-system,"Segoe UI",sans-serif;
      text-align:center;box-shadow:0 10px 24px rgba(18,63,50,.16),inset 0 1px rgba(255,255,255,.9);
      opacity:0;transform:translateY(5px) scale(.97);transition:opacity .24s ease,transform .24s ease;pointer-events:none
    }
    .aw-v39-guide.right .aw-v39-bubble{left:0}
    .aw-v39-guide.left .aw-v39-bubble{right:0}
    .aw-v39-bubble::before{
      content:"";position:absolute;z-index:-1;left:16px;top:-12px;width:37px;height:27px;
      border:2px solid #d2a342;border-bottom:0;border-radius:50% 50% 0 0;background:#fffdf5;
      box-shadow:34px -5px 0 -1px #fffdf5,34px -7px 0 1px #d2a342,69px 1px 0 -4px #fffdf5,69px -1px 0 -2px #d2a342
    }
    .aw-v39-bubble::after{
      content:"";position:absolute;bottom:10px;width:16px;height:16px;background:#fffdf5;
      border-bottom:2px solid #d2a342;transform:rotate(45deg)
    }
    .aw-v39-guide.right .aw-v39-bubble::after{right:-8px;border-right:2px solid #d2a342}
    .aw-v39-guide.left .aw-v39-bubble::after{left:-8px;border-left:2px solid #d2a342}
    .aw-v39-bubble.show{opacity:1;transform:none}

    html body .rooted-section .recognition-grid{width:min(100%,900px)!important;margin:28px auto 0!important;gap:10px!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;perspective:none!important}
    html body .rooted-section .recognition-grid article,
    html body .rooted-section .recognition-grid article:nth-child(1),
    html body .rooted-section .recognition-grid article:nth-child(2),
    html body .rooted-section .recognition-grid article:nth-child(3),
    html body .rooted-section .recognition-grid article:nth-child(4){
      order:initial!important;grid-column:auto!important;display:grid!important;grid-template-columns:58px minmax(0,1fr)!important;align-items:center!important;gap:10px!important;
      min-height:92px!important;padding:10px 12px!important;border:1px solid rgba(232,190,89,.58)!important;border-radius:15px!important;color:#fff!important;text-align:left!important;
      background:linear-gradient(145deg,#06130f 0%,#0c3528 58%,#071d16 100%)!important;box-shadow:0 10px 20px rgba(2,20,14,.22),inset 0 1px rgba(255,255,255,.06)!important;
      animation:none!important;transform:none!important
    }
    html body .rooted-section .recognition-grid article::before,
    html body .rooted-section .recognition-grid article::after{display:none!important}
    html body .rooted-section .recognition-grid article img{width:54px!important;height:54px!important;padding:4px!important;object-fit:contain!important;border-radius:12px!important;background:#fffdf4!important;box-shadow:0 6px 12px rgba(0,0,0,.22)!important;filter:none!important;transform:none!important}
    html body .rooted-section .recognition-grid article strong{display:block!important;color:#fff!important;font-family:Georgia,"Times New Roman",serif!important;font-size:clamp(.9rem,2.2vw,1.08rem)!important;line-height:1.08!important;text-shadow:0 2px 5px rgba(0,0,0,.32)!important}
    html body .rooted-section .recognition-grid article span{display:block!important;margin-top:4px!important;color:#d9f378!important;font-size:.68rem!important;font-weight:900!important;letter-spacing:.08em!important;text-transform:uppercase!important}

    html body .site-footer,html body footer{padding-top:30px!important;padding-bottom:108px!important}
    html body .site-footer .fb{margin:8px auto 10px!important}
    html body .site-footer .footer-links{margin:6px auto 9px!important}
    html body .site-footer .aw-v39-copyright{display:block!important;margin:11px auto 0!important;padding-top:11px!important;border-top:1px solid rgba(255,255,255,.18)!important;color:#d9e2dd!important}

    @keyframes awV39Blink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}

    @media(max-width:700px){
      .aw-v39-token{width:184px;height:184px}.aw-v39-token img{width:158px;height:158px}
      .aw-v39-guide{width:216px;height:132px}
      html body .rooted-section .recognition-grid{gap:8px!important;padding:0 3px!important}
      html body .rooted-section .recognition-grid article{grid-template-columns:51px minmax(0,1fr)!important;gap:8px!important;min-height:84px!important;padding:8px 9px!important}
      html body .rooted-section .recognition-grid article img{width:47px!important;height:47px!important}
      html body .rooted-section .recognition-grid article strong{font-size:.84rem!important}
      html body .rooted-section .recognition-grid article span{font-size:.61rem!important}
    }
    @media(min-width:701px){.aw-v39-guide{bottom:auto;top:55%;transform:translateY(-50%)}}
    @media(prefers-reduced-motion:reduce){.aw-v39-annie,.aw-v39-bubble,.aw-v39-guide{transition:none!important}.aw-v39-guide.landed .aw-v39-annie{opacity:1!important;transform:none!important}}
  `;
  document.head.appendChild(style);

  section.classList.add('aw-v39-section');
  const content = section.querySelector(':scope > div') || section;
  const label = content.querySelector('.section-label');
  if (label) label.textContent = 'Meet Annie';
  document.getElementById('annieButton')?.remove();

  const token = document.createElement('div');
  token.className = 'aw-v39-token';
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
    edge.className = `aw-v39-edge ${side}`;
    edge.setAttribute('aria-hidden', 'true');
    document.body.appendChild(edge);
  });

  const branchMarkup = `
    <div class="aw-v39-branch"></div>
    <div class="aw-v39-twig"></div>
    <span class="aw-v39-leaf one"></span>
    <span class="aw-v39-leaf two"></span>
    <span class="aw-v39-leaf three"></span>`;

  const guide = document.createElement('aside');
  guide.className = 'aw-v39-guide right';
  guide.setAttribute('aria-live', 'polite');
  guide.innerHTML = `
    <div class="aw-v39-bubble"></div>
    <div class="aw-v39-perch" aria-hidden="true">${branchMarkup}</div>
    <div class="aw-v39-trunk-mask" aria-hidden="true"></div>`;

  const annieButton = document.createElement('button');
  annieButton.type = 'button';
  annieButton.className = 'aw-v39-annie';
  annieButton.setAttribute('aria-label', 'See another Annie tip');
  const travelingImage = new Image();
  travelingImage.src = annieSource;
  travelingImage.alt = '';
  travelingImage.decoding = 'async';
  travelingImage.onerror = () => { guide.hidden = true; };
  annieButton.appendChild(travelingImage);
  guide.appendChild(annieButton);
  document.body.appendChild(guide);

  const bubble = guide.querySelector('.aw-v39-bubble');
  let bubbleTimer = 0;
  let blinkTimer = 0;
  let activeTarget = -1;
  let tipIndex = 0;
  let moveTimer = 0;
  let frame = 0;

  function showBubble(message) {
    window.clearTimeout(bubbleTimer);
    window.clearTimeout(blinkTimer);
    bubble.textContent = message;
    bubble.classList.add('show');
    annieButton.classList.remove('blink');
    blinkTimer = window.setTimeout(() => {
      annieButton.classList.add('blink');
      window.setTimeout(() => annieButton.classList.remove('blink'), 430);
    }, 1500);
    bubbleTimer = window.setTimeout(() => bubble.classList.remove('show'), 4000);
  }

  function landAt(index) {
    if (index === activeTarget) return;
    activeTarget = index;
    const side = index % 2 === 0 ? 'right' : 'left';
    const message = targets[index]?.message || OPENING;
    window.clearTimeout(moveTimer);
    guide.classList.add('show');
    guide.classList.remove('landed');
    bubble.classList.remove('show');
    moveTimer = window.setTimeout(() => {
      guide.classList.toggle('right', side === 'right');
      guide.classList.toggle('left', side === 'left');
      void guide.offsetWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        guide.classList.add('landed');
        window.setTimeout(() => showBubble(message), 650);
      }));
    }, 180);
  }

  const targets = CONTEXT.map(([selector, message]) => {
    const element = document.querySelector(selector);
    return element ? {element, message} : null;
  }).filter(Boolean);

  function nearestTarget() {
    const focus = window.innerHeight * .5;
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
    if (window.scrollY < 180 || !targets.length) {
      guide.classList.remove('show');
      activeTarget = -1;
      return;
    }
    landAt(nearestTarget());
  }

  function requestUpdate() {
    if (frame) return;
    frame = requestAnimationFrame(update);
  }

  annieButton.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    showBubble(TIPS[tipIndex++ % TIPS.length]);
  });

  window.addEventListener('scroll', requestUpdate, {passive:true});
  window.addEventListener('resize', requestUpdate, {passive:true});
  requestUpdate();

  const footer = document.querySelector('.site-footer, footer');
  if (footer) {
    const copyright = [...footer.querySelectorAll('small,p')].find(node => /(?:©|copyright).*2026|2026.*arborwise/i.test(node.textContent || ''));
    if (copyright) {
      copyright.classList.add('aw-v39-copyright');
      footer.appendChild(copyright);
    }
  }
})();