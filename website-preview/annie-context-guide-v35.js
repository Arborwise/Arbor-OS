(() => {
  'use strict';

  const ASSET = 'assets/annie-approved-flight-v30.b64?v=20260802-2338';
  const INTRO = 'I’m Annie. As you scroll, I’ll explain what matters and what to look for.';

  const CONTEXT = [
    {
      selector: '.hero',
      message: 'Start with three views: the whole tree, the concern, and the trunk base. Those photos reveal the pattern.'
    },
    {
      selector: '#services',
      message: 'Good tree work has a reason. Pruning, removal, and planting should each solve a specific problem.'
    },
    {
      selector: '#planting, .growth-section',
      message: 'Planting depth matters. Keep the root flare visible, and never pile mulch against the trunk.'
    },
    {
      selector: '#way',
      message: 'A sound recommendation explains what needs action, what can wait, and why.'
    },
    {
      selector: '#areas',
      message: 'Arborwise serves North Texas locally, so the people making the recommendation are accountable for the result.'
    },
    {
      selector: '#estimate',
      message: 'For a faster estimate, send the property address plus photos of the whole tree, the concern, and the trunk base.'
    },
    {
      selector: '.faq-section',
      message: 'A cavity, lean, or thinning canopy is a clue, not a diagnosis. Location and nearby targets matter too.'
    }
  ];

  function removeOldAnnieWork() {
    document.querySelectorAll(
      '.aw-v35-intro,.aw-v35-companion,' +
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
      '[id^="arborwise-annie-portrait-to-perch-"],[id^="arborwise-annie-static-perch-"],' +
      '#arborwise-annie-context-guide-v35'
    ).forEach(node => node.remove());

    const section = document.querySelector('.annie-callout');
    section?.querySelectorAll('.annie-badge, img[data-annie]').forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-context-guide-v35';
    style.textContent = `
      .annie-callout.aw-v35-section{
        position:relative!important;
        display:grid!important;
        grid-template-columns:minmax(210px,250px) minmax(0,1fr)!important;
        align-items:center!important;
        gap:clamp(18px,4vw,48px)!important;
        overflow:visible!important;
      }

      .aw-v35-intro{
        position:relative;
        width:100%;
        max-width:250px;
        height:190px;
        margin:0 auto;
        isolation:isolate;
      }

      .aw-v35-branch,
      .aw-v35-companion-branch{
        position:absolute;
        pointer-events:none;
      }

      .aw-v35-intro .aw-v35-branch{
        left:8px;
        right:4px;
        bottom:17px;
        height:58px;
      }

      .aw-v35-limb{
        position:absolute;
        left:7px;
        right:0;
        bottom:8px;
        height:23px;
        border-radius:62% 38% 44% 56% / 42% 50% 50% 58%;
        clip-path:polygon(0 37%,8% 25%,18% 31%,30% 17%,42% 26%,54% 13%,66% 24%,79% 16%,91% 27%,100% 22%,100% 75%,91% 70%,80% 82%,67% 70%,55% 86%,43% 74%,30% 88%,18% 73%,8% 82%,0 68%);
        background:
          linear-gradient(180deg,rgba(238,206,157,.26),transparent 28%),
          repeating-linear-gradient(103deg,transparent 0 21px,rgba(45,24,14,.35) 22px 25px,transparent 26px 47px),
          linear-gradient(180deg,#8c6545 0%,#65422b 48%,#332016 100%);
        box-shadow:inset 0 2px 2px rgba(255,255,255,.12),inset 0 -3px 4px rgba(27,14,8,.34),0 5px 9px rgba(0,0,0,.2);
      }

      .aw-v35-limb::after{
        content:"";
        position:absolute;
        right:-1px;
        top:-7px;
        width:38px;
        height:38px;
        border-radius:49% 51% 45% 55%;
        background:radial-gradient(circle at 49% 48%,#26140d 0 16%,#6e4a31 19% 34%,#321c12 37% 45%,#927052 48% 70%,#43291c 73% 100%);
        box-shadow:inset 3px 1px 5px rgba(255,255,255,.1),0 3px 7px rgba(0,0,0,.24);
      }

      .aw-v35-twig{
        position:absolute;
        left:48px;
        bottom:29px;
        width:86px;
        height:6px;
        border-radius:999px;
        background:linear-gradient(180deg,#795038,#3d261a);
        transform:rotate(-18deg);
        transform-origin:left center;
        box-shadow:0 2px 3px rgba(0,0,0,.18);
      }

      .aw-v35-twig::after{
        content:"";
        position:absolute;
        left:46px;
        top:-1px;
        width:55px;
        height:5px;
        border-radius:999px;
        background:linear-gradient(180deg,#765038,#3c2519);
        transform:rotate(30deg);
        transform-origin:left center;
      }

      .aw-v35-leaf{
        position:absolute;
        width:29px;
        height:17px;
        border-radius:100% 0 100% 0;
        background:
          linear-gradient(155deg,rgba(231,246,179,.32),transparent 38%),
          linear-gradient(135deg,#79a94b 0%,#397b3d 58%,#1e5b31 100%);
        box-shadow:inset -2px -2px 4px rgba(9,56,32,.28),0 2px 4px rgba(0,0,0,.14);
        transform-origin:0 100%;
      }

      .aw-v35-leaf::after{
        content:"";
        position:absolute;
        left:3px;
        right:3px;
        bottom:3px;
        height:1px;
        background:rgba(229,243,177,.5);
        transform:rotate(-24deg);
        transform-origin:left center;
      }

      .aw-v35-leaf-one{left:69px;bottom:48px;transform:rotate(-31deg)}
      .aw-v35-leaf-two{left:99px;bottom:58px;transform:scaleX(-1) rotate(-22deg)}
      .aw-v35-leaf-three{left:126px;bottom:39px;transform:rotate(9deg)}

      .aw-v35-annie{
        position:absolute;
        z-index:4;
        right:35px;
        bottom:31px;
        width:105px;
        filter:drop-shadow(0 6px 7px rgba(0,0,0,.2));
        pointer-events:none;
      }

      .aw-v35-annie img{
        display:block;
        width:100%;
        height:auto;
      }

      .aw-v35-bubble{
        position:absolute;
        z-index:5;
        left:0;
        top:4px;
        width:142px;
        padding:12px 13px;
        border:1.5px solid #c89b3c;
        border-radius:24px 24px 20px 24px;
        background:linear-gradient(180deg,#fffef9 0%,#f7f0dc 100%);
        color:#123f32;
        font:750 12.2px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif;
        text-align:left;
        box-shadow:0 9px 24px rgba(18,63,50,.13),inset 0 1px rgba(255,255,255,.85);
      }

      .aw-v35-bubble::before{
        content:"";
        position:absolute;
        right:-9px;
        bottom:18px;
        width:17px;
        height:17px;
        background:#f9f4e4;
        border-top:1.5px solid #c89b3c;
        border-right:1.5px solid #c89b3c;
        transform:rotate(45deg);
      }

      .aw-v35-companion{
        position:fixed;
        z-index:950;
        right:9px;
        bottom:104px;
        width:250px;
        height:126px;
        opacity:0;
        visibility:hidden;
        transform:translateY(18px);
        transition:opacity .55s ease,transform .55s ease,visibility 0s linear .55s;
        pointer-events:none;
      }

      .aw-v35-companion.is-visible{
        opacity:1;
        visibility:visible;
        transform:translateY(0);
        transition:opacity .55s ease,transform .55s ease;
      }

      .aw-v35-companion.is-changing{
        opacity:0;
        transform:translateY(10px);
      }

      .aw-v35-companion .aw-v35-companion-branch{
        right:0;
        bottom:0;
        width:145px;
        height:48px;
      }

      .aw-v35-companion .aw-v35-limb{left:0;height:18px}
      .aw-v35-companion .aw-v35-limb::after{width:31px;height:31px;top:-6px}
      .aw-v35-companion .aw-v35-twig{left:31px;bottom:24px;width:57px;height:5px}
      .aw-v35-companion .aw-v35-twig::after{left:29px;width:37px;height:4px}
      .aw-v35-companion .aw-v35-leaf{width:21px;height:13px}
      .aw-v35-companion .aw-v35-leaf-one{left:45px;bottom:36px}
      .aw-v35-companion .aw-v35-leaf-two{left:66px;bottom:42px}
      .aw-v35-companion .aw-v35-leaf-three{left:84px;bottom:30px}

      .aw-v35-companion .aw-v35-annie{
        right:24px;
        bottom:22px;
        width:72px;
      }

      .aw-v35-companion .aw-v35-bubble{
        left:0;
        top:0;
        width:145px;
        max-height:92px;
        overflow:auto;
        padding:10px 11px;
        border-radius:21px 21px 18px 21px;
        font-size:10.8px;
        line-height:1.28;
        box-shadow:0 8px 20px rgba(0,0,0,.16);
      }

      @media(max-width:700px){
        .annie-callout.aw-v35-section{
          grid-template-columns:minmax(0,1fr)!important;
          gap:8px!important;
        }
        .aw-v35-intro{
          max-width:330px;
          height:174px;
          margin-bottom:4px;
        }
        .aw-v35-intro .aw-v35-branch{left:16px;right:8px;bottom:13px}
        .aw-v35-annie{right:45px;bottom:27px;width:98px}
        .aw-v35-bubble{left:5px;top:6px;width:min(160px,48vw);font-size:11.7px}
        .aw-v35-companion{right:7px;bottom:101px;width:236px;height:120px}
      }

      @media(min-width:701px){
        .aw-v35-companion{
          right:22px;
          bottom:auto;
          top:55%;
          transform:translateY(calc(-50% + 18px));
        }
        .aw-v35-companion.is-visible{transform:translateY(-50%)}
        .aw-v35-companion.is-changing{transform:translateY(calc(-50% + 10px))}
      }

      @media(prefers-reduced-motion:reduce){
        .aw-v35-companion,
        .aw-v35-companion.is-visible,
        .aw-v35-companion.is-changing{
          transition:none!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function branchMarkup() {
    return `
      <div class="aw-v35-limb"></div>
      <div class="aw-v35-twig"></div>
      <span class="aw-v35-leaf aw-v35-leaf-one"></span>
      <span class="aw-v35-leaf aw-v35-leaf-two"></span>
      <span class="aw-v35-leaf aw-v35-leaf-three"></span>`;
  }

  async function loadAnnieSource() {
    const response = await fetch(ASSET, {cache:'no-store'});
    if (!response.ok) throw new Error(`Approved Annie asset returned ${response.status}`);
    const base64 = (await response.text()).replace(/\s+/g, '');
    const source = `data:image/webp;base64,${base64}`;
    const test = new Image();
    test.src = source;
    await new Promise((resolve, reject) => {
      if (test.complete && test.naturalWidth) return resolve();
      test.onload = resolve;
      test.onerror = () => reject(new Error('Approved Annie could not be decoded'));
    });
    return source;
  }

  function createAnnieImage(source, alt) {
    const image = new Image();
    image.src = source;
    image.alt = alt;
    image.decoding = 'async';
    return image;
  }

  function createInitialPerch(section, source) {
    section.classList.add('aw-v35-section');

    const intro = document.createElement('div');
    intro.className = 'aw-v35-intro';
    intro.innerHTML = `
      <div class="aw-v35-bubble">${INTRO}</div>
      <div class="aw-v35-branch" aria-hidden="true">${branchMarkup()}</div>`;

    const annie = document.createElement('div');
    annie.className = 'aw-v35-annie';
    annie.appendChild(createAnnieImage(source, 'Arborwise Annie perched on a small oak branch'));
    intro.appendChild(annie);

    section.insertBefore(intro, section.firstChild);
  }

  function createScrollCompanion(source) {
    const companion = document.createElement('aside');
    companion.className = 'aw-v35-companion';
    companion.setAttribute('aria-live', 'polite');
    companion.setAttribute('aria-label', 'Annie tree-care guidance');
    companion.innerHTML = `
      <div class="aw-v35-bubble"></div>
      <div class="aw-v35-companion-branch" aria-hidden="true">${branchMarkup()}</div>`;

    const annie = document.createElement('div');
    annie.className = 'aw-v35-annie';
    const image = createAnnieImage(source, '');
    image.setAttribute('aria-hidden', 'true');
    annie.appendChild(image);
    companion.appendChild(annie);
    document.body.appendChild(companion);
    return companion;
  }

  function installContextGuide(companion, introSection) {
    const targets = CONTEXT.map(item => {
      const element = document.querySelector(item.selector);
      return element ? {...item, element} : null;
    }).filter(Boolean);

    if (!targets.length) return;

    const bubble = companion.querySelector('.aw-v35-bubble');
    let activeIndex = -1;
    let changeTimer = 0;
    let frameRequested = false;

    function introIsVisible() {
      const rect = introSection.getBoundingClientRect();
      return rect.bottom > 120 && rect.top < window.innerHeight - 120;
    }

    function nearestTargetIndex() {
      const focus = window.innerHeight * 0.48;
      let bestIndex = 0;
      let bestDistance = Infinity;
      targets.forEach((item, index) => {
        const rect = item.element.getBoundingClientRect();
        const center = Math.max(rect.top, 0) + Math.min(rect.height, window.innerHeight) / 2;
        const distance = Math.abs(center - focus);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestIndex = index;
        }
      });
      return bestIndex;
    }

    function showMessage(index) {
      if (index === activeIndex) return;
      activeIndex = index;
      window.clearTimeout(changeTimer);
      companion.classList.add('is-changing');
      changeTimer = window.setTimeout(() => {
        bubble.textContent = targets[index].message;
        companion.classList.remove('is-changing');
        companion.classList.add('is-visible');
      }, 240);
    }

    function update() {
      frameRequested = false;
      if (window.scrollY < 180 || introIsVisible()) {
        companion.classList.remove('is-visible', 'is-changing');
        return;
      }
      showMessage(nearestTargetIndex());
    }

    function requestUpdate() {
      if (frameRequested) return;
      frameRequested = true;
      requestAnimationFrame(update);
    }

    window.addEventListener('scroll', requestUpdate, {passive:true});
    window.addEventListener('resize', requestUpdate, {passive:true});
    requestUpdate();
  }

  async function start() {
    removeOldAnnieWork();
    installStyles();

    const section = document.querySelector('.annie-callout');
    if (!section) {
      console.error('Ask Annie section was not found.');
      return;
    }

    try {
      const source = await loadAnnieSource();
      createInitialPerch(section, source);
      const companion = createScrollCompanion(source);
      installContextGuide(companion, section);
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
