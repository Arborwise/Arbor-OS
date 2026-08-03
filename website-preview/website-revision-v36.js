(() => {
  'use strict';

  const ANNIE_B64 = 'assets/annie-approved-flight-v30.b64?v=20260802-2348';
  const TIPS = [
    'Show us the whole tree, the concern, and the trunk base. Those three views help reveal the pattern.',
    'A cavity or thinning canopy is a clue, not a diagnosis. Location, movement, and nearby targets matter too.',
    'Good pruning has a reason. Every cut should improve structure, clearance, health, or long-term growth.',
    'Keep mulch off the trunk flare. Mulch belongs over the root zone, not piled against the bark.',
    'For a faster estimate, send the property address and clear photos of what has changed.'
  ];

  const CONTEXT = [
    ['#services', 'Good tree work has a reason. Pruning, removal, and planting should each solve a specific problem.'],
    ['#planting, .growth-section', 'Planting depth matters. Keep the root flare visible and never pile mulch against the trunk.'],
    ['#way', 'A sound recommendation explains what needs action, what can wait, and why.'],
    ['#areas', 'Arborwise serves North Texas locally, so the people making the recommendation are accountable for the result.'],
    ['#estimate', 'For a faster estimate, send the address plus photos of the whole tree, the concern, and the trunk base.'],
    ['.faq-section', 'A cavity, lean, or thinning canopy is a clue, not a diagnosis. The whole site matters.']
  ];

  function removeOldAnnie() {
    document.querySelectorAll(
      '.aw-v36-annie-panel,.aw-v36-companion,' +
      '.aw-v35-intro,.aw-v35-companion,.aw-v34-stage,.aw-v34-bark,' +
      '.aw-v33-stage,.aw-v33-bark,.aw-v33-flyer,.aw-v32-stage,.aw-v32-bark,.aw-v32-flyer,' +
      '.aw-v31-stage,.aw-v31-bark,.aw-v31-flyer,#awAnnieCharacter,#awAnnieScrollGuide,' +
      '#awAnnieBranchLayer,#aw26Stage,#aw26Flyer,.aw-annie-landing-lane,.aw-annie-perch-lane,' +
      '.aw-annie-first-stage,.aw-oak-trunk-edge'
    ).forEach(node => node.remove());

    document.querySelectorAll(
      '[id^="arborwise-annie-character-"],[id^="arborwise-annie-perch-flight-"],' +
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-branch-to-branch-"],' +
      '[id^="arborwise-annie-portrait-to-perch-"],[id^="arborwise-annie-static-perch-"],' +
      '#arborwise-annie-context-guide-v35,#arborwise-website-revision-v36'
    ).forEach(node => node.remove());
  }

  function addStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-website-revision-v36';
    style.textContent = `
      /* Annie: always visible, static at first, compact and readable. */
      .annie-callout.aw-v36-annie-section{
        position:relative!important;
        display:grid!important;
        grid-template-columns:minmax(230px,285px) minmax(0,1fr)!important;
        align-items:center!important;
        gap:clamp(18px,4vw,46px)!important;
        overflow:visible!important;
      }
      .aw-v36-annie-panel{
        position:relative;
        width:min(100%,285px);
        height:220px;
        margin:0 auto;
        isolation:isolate;
      }
      .aw-v36-branch{position:absolute;left:8px;right:0;bottom:18px;height:72px;pointer-events:none}
      .aw-v36-limb{
        position:absolute;left:5px;right:0;bottom:9px;height:25px;
        clip-path:polygon(0 34%,9% 22%,19% 30%,31% 15%,43% 25%,56% 12%,69% 24%,82% 15%,93% 26%,100% 20%,100% 76%,91% 69%,80% 84%,68% 71%,55% 86%,43% 73%,30% 88%,18% 72%,8% 83%,0 67%);
        background:linear-gradient(180deg,#9b7351 0%,#68452e 48%,#352117 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.14),inset 0 -3px rgba(25,13,8,.3),0 6px 10px rgba(0,0,0,.2)
      }
      .aw-v36-limb::after{
        content:"";position:absolute;right:-1px;top:-9px;width:43px;height:43px;border-radius:50%;
        background:radial-gradient(circle at 48% 48%,#24130c 0 16%,#775139 19% 34%,#342016 37% 45%,#9a7454 48% 70%,#432a1c 73% 100%);
        box-shadow:inset 3px 1px 5px rgba(255,255,255,.1),0 3px 7px rgba(0,0,0,.24)
      }
      .aw-v36-twig{position:absolute;left:48px;bottom:36px;width:98px;height:6px;border-radius:999px;background:linear-gradient(180deg,#815a3c,#3c2519);transform:rotate(-18deg);transform-origin:left center}
      .aw-v36-twig::after{content:"";position:absolute;left:54px;top:-1px;width:58px;height:5px;border-radius:999px;background:linear-gradient(180deg,#7a5338,#3b2418);transform:rotate(31deg);transform-origin:left center}
      .aw-v36-leaf{position:absolute;width:31px;height:18px;border-radius:100% 0 100% 0;background:linear-gradient(135deg,#85ad50 0%,#3d7f40 57%,#1d5b31 100%);box-shadow:inset -2px -2px 4px rgba(9,56,32,.25),0 2px 4px rgba(0,0,0,.14);transform-origin:0 100%}
      .aw-v36-leaf.one{left:70px;bottom:57px;transform:rotate(-30deg)}
      .aw-v36-leaf.two{left:103px;bottom:67px;transform:scaleX(-1) rotate(-21deg)}
      .aw-v36-leaf.three{left:136px;bottom:48px;transform:rotate(10deg)}
      .aw-v36-annie{position:absolute;z-index:3;right:35px;bottom:35px;width:118px;pointer-events:none;filter:drop-shadow(0 6px 8px rgba(0,0,0,.22))}
      .aw-v36-annie img{display:block;width:100%;height:auto}
      .aw-v36-bubble{
        position:absolute;z-index:4;left:0;top:4px;width:152px;padding:12px 14px;
        border:2px solid #d1a13d;border-radius:25px 25px 21px 25px;
        background:linear-gradient(180deg,#fffef9,#f7efda);color:#123f32;
        font:800 12.3px/1.32 system-ui,-apple-system,"Segoe UI",sans-serif;text-align:left;
        box-shadow:0 10px 24px rgba(18,63,50,.14),inset 0 1px rgba(255,255,255,.9)
      }
      .aw-v36-bubble::after{content:"";position:absolute;right:-9px;bottom:19px;width:16px;height:16px;background:#f9f3e2;border-top:2px solid #d1a13d;border-right:2px solid #d1a13d;transform:rotate(45deg)}
      .annie-callout #annieButton{min-height:46px!important;padding:10px 18px!important;border-radius:999px!important;background:#0b3f2f!important;color:#fff!important;border:1px solid #d7a542!important;font-weight:900!important;box-shadow:0 8px 18px rgba(4,37,27,.15)!important}

      .aw-v36-companion{position:fixed;z-index:950;right:8px;bottom:101px;width:238px;height:122px;opacity:0;visibility:hidden;transform:translateY(14px);transition:opacity .5s ease,transform .5s ease,visibility 0s linear .5s;pointer-events:none}
      .aw-v36-companion.show{opacity:1;visibility:visible;transform:none;transition:opacity .5s ease,transform .5s ease}
      .aw-v36-companion .aw-v36-branch{left:auto;right:0;bottom:0;width:142px;height:50px}
      .aw-v36-companion .aw-v36-limb{height:18px}
      .aw-v36-companion .aw-v36-limb::after{width:31px;height:31px;top:-6px}
      .aw-v36-companion .aw-v36-twig{left:30px;bottom:26px;width:58px;height:5px}
      .aw-v36-companion .aw-v36-twig::after{left:31px;width:37px;height:4px}
      .aw-v36-companion .aw-v36-leaf{width:21px;height:13px}
      .aw-v36-companion .aw-v36-leaf.one{left:44px;bottom:39px}
      .aw-v36-companion .aw-v36-leaf.two{left:67px;bottom:45px}
      .aw-v36-companion .aw-v36-leaf.three{left:88px;bottom:33px}
      .aw-v36-companion .aw-v36-annie{right:24px;bottom:24px;width:74px}
      .aw-v36-companion .aw-v36-bubble{left:0;top:0;width:143px;max-height:90px;overflow:auto;padding:10px 11px;border-radius:21px;font-size:10.7px;line-height:1.28}

      /* Recognition cards: smaller, darker, higher contrast. */
      html body .rooted-section .recognition-grid{
        width:min(100%,900px)!important;
        margin:28px auto 0!important;
        gap:12px!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        perspective:none!important;
      }
      html body .rooted-section .recognition-grid article,
      html body .rooted-section .recognition-grid article:nth-child(1),
      html body .rooted-section .recognition-grid article:nth-child(2),
      html body .rooted-section .recognition-grid article:nth-child(3),
      html body .rooted-section .recognition-grid article:nth-child(4){
        order:initial!important;grid-column:auto!important;display:grid!important;
        grid-template-columns:72px minmax(0,1fr)!important;align-items:center!important;gap:12px!important;
        min-height:112px!important;padding:13px 14px!important;border:1px solid rgba(232,190,89,.62)!important;
        border-radius:18px!important;color:#fff!important;text-align:left!important;
        background:linear-gradient(145deg,#06130f 0%,#0c3528 58%,#071d16 100%)!important;
        box-shadow:0 12px 24px rgba(2,20,14,.24),inset 0 1px rgba(255,255,255,.07)!important;
        animation:none!important;transform:none!important;transition:transform .2s ease,box-shadow .2s ease!important;
      }
      html body .rooted-section .recognition-grid article:hover{transform:translateY(-3px)!important;box-shadow:0 16px 30px rgba(2,20,14,.32),0 0 0 2px rgba(217,243,120,.13)!important}
      html body .rooted-section .recognition-grid article::before,
      html body .rooted-section .recognition-grid article::after{display:none!important}
      html body .rooted-section .recognition-grid article img,
      html body .rooted-section .recognition-grid article:nth-child(1) img,
      html body .rooted-section .recognition-grid article:nth-child(2) img,
      html body .rooted-section .recognition-grid article:nth-child(3) img,
      html body .rooted-section .recognition-grid article:nth-child(4) img{
        width:68px!important;height:68px!important;padding:5px!important;object-fit:contain!important;border-radius:14px!important;
        background:#fffdf4!important;box-shadow:0 7px 14px rgba(0,0,0,.24)!important;filter:none!important;transform:none!important
      }
      html body .rooted-section .recognition-grid article strong,
      html body .rooted-section .recognition-grid article:nth-child(1) strong,
      html body .rooted-section .recognition-grid article:nth-child(2) strong,
      html body .rooted-section .recognition-grid article:nth-child(3) strong,
      html body .rooted-section .recognition-grid article:nth-child(4) strong{
        display:block!important;color:#fff!important;font-family:Georgia,"Times New Roman",serif!important;
        font-size:clamp(.96rem,2.5vw,1.18rem)!important;line-height:1.08!important;text-shadow:0 2px 6px rgba(0,0,0,.35)!important
      }
      html body .rooted-section .recognition-grid article span,
      html body .rooted-section .recognition-grid article:nth-child(1) span,
      html body .rooted-section .recognition-grid article:nth-child(2) span,
      html body .rooted-section .recognition-grid article:nth-child(3) span,
      html body .rooted-section .recognition-grid article:nth-child(4) span{
        display:block!important;margin-top:5px!important;color:#d9f378!important;font-size:.72rem!important;font-weight:900!important;letter-spacing:.09em!important;text-transform:uppercase!important
      }

      /* Footer: compact spacing, links first, copyright last. */
      html body .site-footer,html body footer{padding-top:34px!important;padding-bottom:108px!important}
      html body .site-footer .fb{margin:10px auto 12px!important}
      html body .site-footer .footer-links{margin:8px auto 10px!important}
      html body .site-footer small{display:block!important;margin:12px auto 0!important;padding-top:12px!important;border-top:1px solid rgba(255,255,255,.18)!important;color:#d9e2dd!important}

      @media(max-width:700px){
        .annie-callout.aw-v36-annie-section{grid-template-columns:minmax(0,1fr)!important;gap:8px!important}
        .aw-v36-annie-panel{width:min(100%,330px);height:205px;margin-bottom:2px}
        .aw-v36-branch{left:16px;right:8px;bottom:14px}
        .aw-v36-annie{right:43px;bottom:31px;width:110px}
        .aw-v36-bubble{left:5px;top:5px;width:min(165px,49vw);font-size:11.8px}
        html body .rooted-section .recognition-grid{gap:10px!important;padding:0 4px!important}
        html body .rooted-section .recognition-grid article,
        html body .rooted-section .recognition-grid article:nth-child(1),
        html body .rooted-section .recognition-grid article:nth-child(2),
        html body .rooted-section .recognition-grid article:nth-child(3),
        html body .rooted-section .recognition-grid article:nth-child(4){
          grid-template-columns:58px minmax(0,1fr)!important;gap:9px!important;min-height:98px!important;padding:10px!important;border-radius:15px!important
        }
        html body .rooted-section .recognition-grid article img,
        html body .rooted-section .recognition-grid article:nth-child(1) img,
        html body .rooted-section .recognition-grid article:nth-child(2) img,
        html body .rooted-section .recognition-grid article:nth-child(3) img,
        html body .rooted-section .recognition-grid article:nth-child(4) img{width:55px!important;height:55px!important;padding:4px!important;border-radius:12px!important}
        html body .rooted-section .recognition-grid article strong{font-size:.82rem!important;line-height:1.08!important}
        html body .rooted-section .recognition-grid article span{font-size:.61rem!important;letter-spacing:.06em!important}
      }
      @media(max-width:410px){
        html body .rooted-section .recognition-grid{grid-template-columns:1fr!important}
        html body .rooted-section .recognition-grid article{min-height:88px!important}
      }
      @media(prefers-reduced-motion:reduce){.aw-v36-companion{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function branchMarkup() {
    return '<div class="aw-v36-limb"></div><div class="aw-v36-twig"></div><span class="aw-v36-leaf one"></span><span class="aw-v36-leaf two"></span><span class="aw-v36-leaf three"></span>';
  }

  function makeAnnieImage(alt) {
    const img = new Image();
    img.alt = alt;
    img.decoding = 'async';
    img.src = 'assets/annie.webp?v=20260802-2348';
    fetch(ANNIE_B64, {cache:'no-store'})
      .then(response => {
        if (!response.ok) throw new Error(`Annie asset returned ${response.status}`);
        return response.text();
      })
      .then(base64 => {
        const cleaned = base64.replace(/\s+/g, '');
        if (cleaned) img.src = `data:image/webp;base64,${cleaned}`;
      })
      .catch(error => console.error('Annie asset fallback in use:', error));
    return img;
  }

  function installAnnie() {
    const section = document.querySelector('.annie-callout');
    if (!section) return;
    section.classList.add('aw-v36-annie-section');
    section.querySelectorAll('.annie-badge,img[data-annie]').forEach(node => node.remove());

    const panel = document.createElement('div');
    panel.className = 'aw-v36-annie-panel';
    panel.innerHTML = `<div class="aw-v36-bubble" role="status">${TIPS[0]}</div><div class="aw-v36-branch" aria-hidden="true">${branchMarkup()}</div>`;
    const annie = document.createElement('div');
    annie.className = 'aw-v36-annie';
    annie.appendChild(makeAnnieImage('Arborwise Annie perched on a small oak branch'));
    panel.appendChild(annie);
    section.insertBefore(panel, section.firstChild);

    const tipText = section.querySelector('#annieTip');
    const button = section.querySelector('#annieButton');
    if (button) {
      button.textContent = 'Hear another tip';
      button.setAttribute('aria-label', 'Hear another Annie tree-care tip');
      let index = 0;
      button.onclick = () => {
        index = (index + 1) % TIPS.length;
        const message = TIPS[index];
        panel.querySelector('.aw-v36-bubble').textContent = message;
        if (tipText) tipText.textContent = message;
        try {
          window.speechSynthesis?.cancel();
          const utterance = new SpeechSynthesisUtterance(message);
          utterance.rate = 0.95;
          window.speechSynthesis?.speak(utterance);
        } catch {}
      };
    }
  }

  function installCompanion() {
    const intro = document.querySelector('.annie-callout');
    if (!intro) return;
    const companion = document.createElement('aside');
    companion.className = 'aw-v36-companion';
    companion.setAttribute('aria-live', 'polite');
    companion.innerHTML = `<div class="aw-v36-bubble"></div><div class="aw-v36-branch" aria-hidden="true">${branchMarkup()}</div>`;
    const annie = document.createElement('div');
    annie.className = 'aw-v36-annie';
    const img = makeAnnieImage('');
    img.setAttribute('aria-hidden', 'true');
    annie.appendChild(img);
    companion.appendChild(annie);
    document.body.appendChild(companion);

    const targets = CONTEXT.map(([selector,message]) => {
      const element = document.querySelector(selector);
      return element ? {element,message} : null;
    }).filter(Boolean);
    if (!targets.length) return;
    const bubble = companion.querySelector('.aw-v36-bubble');
    let active = -1;
    let ticking = false;

    function update() {
      ticking = false;
      const introRect = intro.getBoundingClientRect();
      if (window.scrollY < 240 || (introRect.top < innerHeight - 100 && introRect.bottom > 100)) {
        companion.classList.remove('show');
        return;
      }
      const focus = innerHeight * 0.5;
      let best = 0;
      let distance = Infinity;
      targets.forEach((item,index) => {
        const rect = item.element.getBoundingClientRect();
        const d = Math.abs((rect.top + Math.min(rect.height,innerHeight) / 2) - focus);
        if (d < distance) { distance = d; best = index; }
      });
      if (best !== active) {
        active = best;
        bubble.textContent = targets[best].message;
      }
      companion.classList.add('show');
    }
    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    }
    addEventListener('scroll', requestUpdate, {passive:true});
    addEventListener('resize', requestUpdate, {passive:true});
    requestUpdate();
  }

  function fixFooter() {
    const footer = document.querySelector('.site-footer') || document.querySelector('footer');
    if (!footer) return;
    const copyright = footer.querySelector('small');
    if (!copyright) return;
    const facebook = footer.querySelector('.fb');
    const links = footer.querySelector('.footer-links');
    if (facebook) footer.insertBefore(facebook, copyright);
    if (links) footer.insertBefore(links, copyright);
    footer.appendChild(copyright);
  }

  function start() {
    removeOldAnnie();
    addStyles();
    installAnnie();
    installCompanion();
    fixFooter();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, {once:true});
  else start();
})();