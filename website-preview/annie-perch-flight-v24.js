(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const stops = [
    {
      selector: '.annie-badge', insert: 'after', side: 'right', context: '.annie-callout',
      lines: [
        'Hi, I’m Arborwise Annie. We’re glad you’re here.',
        'You do not need the diagnosis before you call. Show us what changed.',
        'I keep the tree talk simple. The trees are complicated enough already.'
      ]
    },
    {
      selector: '.intro-section', insert: 'after', side: 'left', context: '.intro-section',
      lines: [
        'The right tree company should lower your blood pressure, not raise it.',
        'No pressure and no mystery—just an honest answer with a reason behind it.',
        'Sometimes the smartest recommendation is to leave the tree alone for now.'
      ]
    },
    {
      selector: '#services .service-card:nth-of-type(1)', insert: 'after', side: 'right', context: '#services .service-card:nth-of-type(1)',
      lines: [
        'Good pruning has a reason. Random cuts are just a bad haircut with a chainsaw.',
        'Every cut should solve a problem—not merely make the tree shorter.',
        'No topping. No guessing. No chainsaw interpretive dance.'
      ]
    },
    {
      selector: '#services .service-card:nth-of-type(2)', insert: 'after', side: 'left', context: '#services .service-card:nth-of-type(2)',
      lines: [
        'A safe removal is planned before the first cut. Gravity is not a crew member.',
        'Access, rigging, utilities, structures, and cleanup all belong in the plan.',
        'Controlled removal means the tree comes down where the plan says—not where gravity votes.'
      ]
    },
    {
      selector: '#services .service-card:nth-of-type(3)', insert: 'after', side: 'right', context: '#services .service-card:nth-of-type(3)',
      lines: [
        'Planting too deep is like burying a tree’s ankles. Roots need air, too.',
        'The right tree in the wrong place becomes tomorrow’s expensive lesson.',
        'A young tree needs the right depth, visible root flare, mulch, and a real watering plan.'
      ]
    },
    {
      selector: '#services .service-card:nth-of-type(4)', insert: 'after', side: 'left', context: '#services .service-card:nth-of-type(4)',
      lines: [
        'A good plan protects the trees, the property, and the people using it.',
        'Clear scopes and dependable follow-through matter on every property.',
        'Tree care works better when everyone knows what happens next.'
      ]
    },
    {
      selector: '.growth-section', insert: 'after', side: 'right', context: '.growth-section',
      lines: [
        'The right tree in the right place can still make sense twenty years from now.',
        'A little planning today prevents a very expensive tree argument later.',
        'Good planting starts below ground, where most shortcuts eventually show up.'
      ]
    },
    {
      selector: '#way .process', insert: 'after', side: 'left', context: '#way',
      lines: [
        'We explain what we see before asking you to approve anything.',
        'Plain language is part of doing the job right.',
        'Expertise should answer questions—not hide behind big words.'
      ]
    },
    {
      selector: '#way', insert: 'append', side: 'right', context: '#way',
      lines: [
        'The right answer is sometimes “not yet.” Trees appreciate patience—and so does your wallet.',
        'A recommendation should make sense before a saw ever starts.',
        'We would rather explain the reason than pressure you into the work.'
      ]
    },
    {
      selector: '#areas', insert: 'append', side: 'left', context: '#areas',
      lines: [
        'We work where our name has to keep meaning something. Local roots keep us accountable.',
        'Local roots are not just for trees. Arborwise is part of these communities, too.',
        'A good reputation grows slowly. We plan to keep nurturing ours.'
      ]
    },
    {
      selector: '#estimate', insert: 'before', side: 'right', context: '#estimate',
      lines: [
        'Tell us what changed and what worries you most. We’ll look before we guess.',
        'Photos help, but the property tells the full story.',
        'A clear estimate should answer questions—not create new ones.'
      ]
    }
  ].map((stop, index) => ({ ...stop, index, lane: null }));

  let guide = null;
  let launched = false;
  let launching = false;
  let flying = false;
  let landedIndex = -1;
  let pendingIndex = null;
  let lineIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let lastScrollY = window.scrollY;
  let sourceSeen = false;
  let lastSourceRect = null;

  function cleanupLegacyAnnie() {
    document.querySelectorAll(
      '#awAnnieScrollGuide,#awAnnieCharacter,#awAnnieBranchLayer,.aw-annie-landing-lane,.aw-annie-perch-lane,.aw-bark-rail,' +
      '.aw-annie-wing,.aw-wing,.aw-fake-wing,.aw-annie-flight-wing'
    ).forEach(node => node.remove());
    document.querySelectorAll(
      '[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-flight-correction-"],' +
      '[id^="arborwise-annie-perch-flight-"],[id^="arborwise-annie-character-"]'
    ).forEach(node => node.remove());
  }

  function installStyles() {
    const style = document.createElement('style');
    style.id = 'arborwise-annie-perch-flight-v24';
    style.textContent = `
      html body{position:relative!important}
      html body::before,html body::after{content:none!important}

      html body .aw-brand .aw-art::before{content:"EST."!important;left:5.5%!important}
      html body .aw-brand .aw-art::after{content:"2019"!important;right:4.5%!important}

      html body .site-footer .fb{
        width:min(74%,318px)!important;max-width:318px!important;min-height:42px!important;
        margin:12px auto 18px!important;padding:6px 12px!important;gap:8px!important
      }
      html body .site-footer .fb i{width:28px!important;height:28px!important;font-size:1.12rem!important}
      html body .site-footer .fb span::after{font-size:.82rem!important}

      ${SOURCE_SELECTOR}{transform-origin:50% 52%;transition:filter .28s ease,transform .28s ease}
      ${SOURCE_SELECTOR}.aw-annie-awakening{animation:awPortraitWake 1.05s ease-in-out both}

      .aw-bark-rail{
        position:fixed;z-index:3;top:0;bottom:0;width:10px;pointer-events:none;opacity:.55;
        background:
          repeating-linear-gradient(103deg,rgba(39,20,10,.55) 0 3px,rgba(123,77,39,.55) 3px 7px,rgba(67,37,18,.62) 7px 10px),
          linear-gradient(90deg,#2d190d,#7b4e29 52%,#321b0e);
        box-shadow:0 0 0 1px rgba(31,16,7,.35),0 0 14px rgba(0,0,0,.18)
      }
      .aw-bark-rail.left{left:0;border-radius:0 8px 8px 0}
      .aw-bark-rail.right{right:0;border-radius:8px 0 0 8px}

      .annie-callout{position:relative!important}
      .annie-callout>.annie-badge{grid-column:1!important;grid-row:1!important}
      .annie-callout>div:not(.annie-badge):not(.aw-annie-perch-lane){grid-column:2!important;grid-row:1!important}
      .annie-callout>.aw-annie-perch-lane.first{grid-column:1/-1!important;grid-row:2!important}

      .aw-annie-perch-lane{
        position:relative!important;display:block!important;grid-column:1/-1!important;width:100%!important;
        height:142px!important;min-height:142px!important;margin:18px 0 26px!important;
        overflow:visible!important;pointer-events:none!important;isolation:isolate!important
      }
      .aw-annie-perch-lane.first{height:168px!important;min-height:168px!important;margin-top:24px!important}
      .aw-annie-perch-lane.before{margin-top:8px!important}

      .aw-tree-branch{position:absolute;z-index:5;bottom:15px;width:146px;height:58px;overflow:visible}
      .aw-annie-perch-lane.left .aw-tree-branch{left:0}
      .aw-annie-perch-lane.right .aw-tree-branch{right:0}
      .aw-branch-growth{position:absolute;inset:0;opacity:0;transform:scaleX(.04);transition:none;will-change:transform,opacity}
      .aw-annie-perch-lane.left .aw-branch-growth{transform-origin:0 68%}
      .aw-annie-perch-lane.right .aw-branch-growth{transform-origin:100% 68%}
      .aw-tree-branch.is-ready .aw-branch-growth{animation:awBranchGrow .54s cubic-bezier(.18,.78,.2,1) forwards}
      .aw-branch-wood{
        position:absolute;left:0;right:0;top:30px;height:14px;border-radius:62% 28% 58% 34%;
        background:
          repeating-linear-gradient(165deg,rgba(255,255,255,.08) 0 2px,transparent 2px 8px),
          linear-gradient(180deg,#a76f3e 0%,#734721 52%,#472914 100%);
        box-shadow:inset 0 2px rgba(255,255,255,.16),0 4px 7px rgba(0,0,0,.18)
      }
      .aw-annie-perch-lane.left .aw-branch-wood{border-radius:12% 58% 42% 58%}
      .aw-annie-perch-lane.right .aw-branch-wood{border-radius:58% 12% 58% 42%}
      .aw-branch-wood::before{
        content:"";position:absolute;top:-8px;width:56px;height:9px;border-radius:999px;background:#69401f
      }
      .aw-annie-perch-lane.left .aw-branch-wood::before{right:10px;transform:rotate(-24deg);transform-origin:0 50%}
      .aw-annie-perch-lane.right .aw-branch-wood::before{left:10px;transform:rotate(24deg);transform-origin:100% 50%}
      .aw-branch-leaf{
        position:absolute;width:23px;height:17px;border-radius:74% 0 74% 0;
        background:linear-gradient(135deg,#83b95a 0%,#3d8048 66%,#225c34 100%);
        box-shadow:inset 0 1px rgba(255,255,255,.22);opacity:0;transform:scale(.4)
      }
      .aw-tree-branch.is-ready .aw-branch-leaf{animation:awLeafOpen .38s .28s ease-out forwards}
      .aw-branch-leaf.a{top:5px;right:2px;transform-origin:100% 100%}
      .aw-branch-leaf.b{top:15px;right:29px;transform-origin:100% 100%}
      .aw-branch-leaf.c{top:8px;left:6px;transform-origin:0 100%}
      .aw-branch-leaf.d{top:18px;left:35px;transform-origin:0 100%}
      .aw-perch-marker{position:absolute;left:50%;top:29px;width:2px;height:2px;transform:translateX(-50%);pointer-events:none}
      .aw-tree-branch.is-landed{animation:awBranchSettle .62s ease-out}
      .aw-tree-branch.is-landed .aw-branch-leaf{animation:awLeafRustle .68s ease-out}

      .aw-annie-guide{
        position:fixed;z-index:84;left:0;top:0;width:96px;height:106px;pointer-events:none;
        opacity:0;visibility:hidden;transform-origin:50% 47%;will-change:transform,left,top,opacity
      }
      .aw-annie-guide.is-visible{opacity:1;visibility:visible}
      .aw-annie-guide.is-perched{position:absolute;z-index:8}
      .aw-annie-button{
        position:relative;display:block;width:96px;height:106px;margin:0!important;padding:0!important;
        border:0!important;outline:0!important;background:transparent!important;box-shadow:none!important;
        appearance:none!important;-webkit-appearance:none!important;-webkit-tap-highlight-color:transparent!important;
        pointer-events:auto;cursor:pointer;touch-action:manipulation
      }
      .aw-annie-button:focus{outline:0!important;box-shadow:none!important}
      .aw-annie-button:focus-visible{outline:0!important}
      .aw-annie-button:focus-visible .aw-annie-character{filter:drop-shadow(0 0 8px rgba(239,196,95,.95)) drop-shadow(0 7px 6px rgba(0,0,0,.25))}

      .aw-annie-character{
        position:absolute;left:50%;top:0;width:92px;height:100px;transform:translateX(-50%);
        transform-origin:50% 64%;filter:drop-shadow(0 7px 6px rgba(0,0,0,.25))
      }
      .aw-annie-character::before,.aw-annie-character::after{content:none!important;display:none!important}
      .aw-annie-crop{position:absolute;left:50%;top:0;width:90px;height:66px;transform:translateX(-50%);overflow:hidden;pointer-events:none}
      .aw-annie-body{
        display:block;width:90px;height:90px;object-fit:contain;object-position:center top;
        transform:scale(1.035) translateY(-1px);transform-origin:50% 8%;user-select:none;-webkit-user-drag:none
      }
      .aw-annie-foot{
        position:absolute;z-index:7;top:62px;width:16px;height:12px;border-radius:52%;
        background:#e6a72b;border:2px solid #94550e;box-shadow:inset 0 2px rgba(255,255,255,.24);transition:top .2s ease,transform .2s ease
      }
      .aw-annie-foot.left{left:26px;transform:rotate(5deg)}
      .aw-annie-foot.right{right:26px;transform:rotate(-5deg)}
      .aw-annie-foot::before,.aw-annie-foot::after{
        content:"";position:absolute;bottom:-7px;width:3px;height:10px;border-radius:999px;
        background:#d88d14;border:1px solid #874c0b;transform-origin:50% 0
      }
      .aw-annie-foot::before{left:3px;transform:rotate(24deg)}
      .aw-annie-foot::after{right:3px;transform:rotate(-24deg)}
      .aw-annie-guide.is-flying .aw-annie-foot.left{top:58px;transform:translateX(4px) rotate(24deg) scale(.9)}
      .aw-annie-guide.is-flying .aw-annie-foot.right{top:58px;transform:translateX(-4px) rotate(-24deg) scale(.9)}
      .aw-annie-guide.is-landing .aw-annie-foot.left{top:63px;transform:rotate(1deg) scale(1.03)}
      .aw-annie-guide.is-landing .aw-annie-foot.right{top:63px;transform:rotate(-1deg) scale(1.03)}
      .aw-foot-line{position:absolute;left:50%;top:80px;width:2px;height:2px;transform:translateX(-50%);pointer-events:none}
      .aw-annie-wink{
        position:absolute;z-index:9;left:26px;top:24px;width:19px;height:11px;border-radius:50%;
        background:linear-gradient(#b56d34,#753b1e);border-bottom:2px solid #482314;opacity:0;transform:scaleY(.12)
      }
      .aw-annie-guide.is-winking .aw-annie-wink{animation:awWink .66s ease-in-out}

      .aw-annie-bubble{
        position:absolute;z-index:14;top:-6px;width:min(218px,61vw);padding:10px 12px 11px;
        border:2px solid #c9972f;border-radius:26px 29px 25px 28px;
        background:linear-gradient(180deg,#fffdf7 0%,#fff8e7 100%);color:#173f2e;
        box-shadow:0 10px 24px rgba(0,0,0,.18),inset 0 0 0 3px rgba(239,196,95,.10);
        font-size:.79rem;font-weight:850;line-height:1.34;opacity:0;visibility:hidden;
        transform:translateY(6px) scale(.97);transition:opacity .16s ease,transform .16s ease,visibility .16s ease;
        pointer-events:none
      }
      .aw-annie-bubble::before{
        content:"";position:absolute;top:-9px;width:23px;height:16px;border:2px solid #c9972f;border-bottom:0;
        border-radius:50% 50% 0 0;background:#fffdf7
      }
      .aw-annie-bubble::after{
        content:"";position:absolute;top:43px;width:17px;height:17px;background:#fff9eb;
        border-bottom:2px solid #c9972f;border-left:2px solid #c9972f;transform:rotate(45deg);border-radius:0 0 0 5px
      }
      .aw-annie-guide.side-left .aw-annie-bubble{left:78px}
      .aw-annie-guide.side-left .aw-annie-bubble::before{left:24px}
      .aw-annie-guide.side-left .aw-annie-bubble::after{left:-10px}
      .aw-annie-guide.side-right .aw-annie-bubble{right:78px}
      .aw-annie-guide.side-right .aw-annie-bubble::before{right:24px}
      .aw-annie-guide.side-right .aw-annie-bubble::after{right:-10px;transform:rotate(225deg)}
      .aw-annie-guide.has-tip .aw-annie-bubble{opacity:1;visibility:visible;transform:translateY(0) scale(1)}

      @keyframes awPortraitWake{
        0%{filter:none;transform:scale(1) rotate(0)}
        34%{filter:drop-shadow(0 0 13px rgba(216,242,119,.72));transform:scale(1.018) rotate(-.7deg)}
        68%{filter:drop-shadow(0 0 17px rgba(216,242,119,.86));transform:scale(1.026) rotate(.7deg)}
        100%{filter:none;transform:scale(1) rotate(0)}
      }
      @keyframes awBranchGrow{0%{opacity:0;transform:scaleX(.04)}18%{opacity:1}78%{transform:scaleX(1.035)}100%{opacity:1;transform:scaleX(1)}}
      @keyframes awLeafOpen{0%{opacity:0;transform:scale(.35) rotate(-12deg)}100%{opacity:1;transform:scale(1) rotate(0)}}
      @keyframes awBranchSettle{0%{transform:translateY(0)}38%{transform:translateY(3px) rotate(-1.2deg)}72%{transform:translateY(-1px) rotate(.55deg)}100%{transform:translateY(0)}}
      @keyframes awLeafRustle{0%{filter:none}42%{filter:brightness(1.16)}100%{filter:none}}
      @keyframes awWink{0%,12%,88%,100%{opacity:0;transform:scaleY(.12)}30%,66%{opacity:1;transform:scaleY(1)}}

      @media(max-width:700px){
        .annie-callout>.annie-badge,.annie-callout>div:not(.annie-badge):not(.aw-annie-perch-lane),.annie-callout>.aw-annie-perch-lane.first{grid-column:1!important;grid-row:auto!important}
      }
      @media(min-width:701px){
        .aw-bark-rail{width:16px;opacity:.48}
        .aw-annie-perch-lane{height:160px!important;min-height:160px!important;margin:22px 0 30px!important}
        .aw-annie-perch-lane.first{height:184px!important;min-height:184px!important}
        .aw-tree-branch{width:174px;height:66px;bottom:17px}.aw-branch-wood{top:34px;height:16px}.aw-perch-marker{top:33px}
        .aw-annie-guide,.aw-annie-button{width:112px;height:122px}.aw-annie-character{width:106px;height:114px}
        .aw-annie-crop{width:102px;height:75px}.aw-annie-body{width:102px;height:102px}
        .aw-annie-foot{top:71px;width:18px;height:13px}.aw-annie-foot.left{left:31px}.aw-annie-foot.right{right:31px}
        .aw-annie-guide.is-flying .aw-annie-foot{top:67px}.aw-annie-guide.is-landing .aw-annie-foot{top:72px}
        .aw-foot-line{top:91px}.aw-annie-wink{left:30px;top:28px;width:21px;height:12px}
        .aw-annie-bubble{width:min(252px,34vw);padding:12px 14px;font-size:.87rem}
        .aw-annie-guide.side-left .aw-annie-bubble{left:92px}.aw-annie-guide.side-right .aw-annie-bubble{right:92px}
      }
      @media(prefers-reduced-motion:reduce){
        ${SOURCE_SELECTOR},.aw-branch-growth,.aw-branch-leaf,.aw-tree-branch,.aw-annie-guide,.aw-annie-bubble,.aw-annie-wink{animation:none!important;transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function addBarkRails() {
    const left = document.createElement('div');
    const right = document.createElement('div');
    left.className = 'aw-bark-rail left';
    right.className = 'aw-bark-rail right';
    left.setAttribute('aria-hidden', 'true');
    right.setAttribute('aria-hidden', 'true');
    document.body.append(left, right);
  }

  function createBranch(side) {
    const branch = document.createElement('span');
    branch.className = `aw-tree-branch ${side}`;
    branch.innerHTML = `
      <span class="aw-branch-growth">
        <span class="aw-branch-wood"></span>
        <i class="aw-branch-leaf a"></i>
        <i class="aw-branch-leaf b"></i>
        <i class="aw-branch-leaf c"></i>
        <i class="aw-branch-leaf d"></i>
        <span class="aw-perch-marker"></span>
      </span>`;
    return branch;
  }

  function createLandingLanes() {
    stops.forEach(stop => {
      const anchor = document.querySelector(stop.selector);
      if (!anchor) return;

      const lane = document.createElement('div');
      lane.className = `aw-annie-perch-lane ${stop.side}${stop.index === 0 ? ' first' : ''}${stop.insert === 'before' ? ' before' : ''}`;
      lane.dataset.annieStop = String(stop.index);
      lane.appendChild(createBranch(stop.side));
      stop.lane = lane;

      if (stop.insert === 'append') anchor.appendChild(lane);
      else if (stop.insert === 'before') anchor.parentNode?.insertBefore(lane, anchor);
      else anchor.insertAdjacentElement('afterend', lane);
    });
  }

  function buildAnnie() {
    guide = document.createElement('aside');
    guide.id = 'awAnnieCharacter';
    guide.className = 'aw-annie-guide';
    guide.setAttribute('aria-label', 'Arborwise Annie');
    guide.innerHTML = `
      <div class="aw-annie-bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-button" type="button" aria-label="Read another Annie tree-care tip">
        <span class="aw-annie-character">
          <span class="aw-annie-crop"><img class="aw-annie-body" src="assets/annie.webp" alt=""></span>
          <span class="aw-annie-foot left"></span>
          <span class="aw-annie-foot right"></span>
          <span class="aw-foot-line"></span>
          <span class="aw-annie-wink"></span>
        </span>
      </button>`;
    document.body.appendChild(guide);

    guide.querySelector('.aw-annie-button')?.addEventListener('click', () => {
      if (!launched || flying || landedIndex < 0) return;
      if (guide.classList.contains('has-tip')) {
        hideTip();
        return;
      }
      lineIndex = (lineIndex + 1) % stops[landedIndex].lines.length;
      wink();
      showTip(stops[landedIndex].lines[lineIndex]);
    });
  }

  function metrics() {
    return window.innerWidth > 700
      ? { width: 112, height: 122, footLine: 91 }
      : { width: 96, height: 106, footLine: 80 };
  }

  function branchFor(index) {
    return stops[index]?.lane?.querySelector('.aw-tree-branch') || null;
  }

  function markerFor(index) {
    return stops[index]?.lane?.querySelector('.aw-perch-marker') || null;
  }

  function sourceRect() {
    const source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return null;
    const rect = source.getBoundingClientRect();
    if (rect.width > 20 && rect.height > 20) lastSourceRect = rect;
    if (rect.bottom > 0 && rect.top < window.innerHeight) sourceSeen = true;
    return rect;
  }

  function targetPosition(index) {
    const marker = markerFor(index);
    if (!marker) return null;
    const markerRect = marker.getBoundingClientRect();
    const m = metrics();
    return {
      left: clamp(markerRect.left + markerRect.width / 2 - m.width / 2, 4, window.innerWidth - m.width - 4),
      top: markerRect.top + markerRect.height / 2 - m.footLine
    };
  }

  function currentPosition() {
    if (!guide) return { left: 0, top: 0 };
    const rect = guide.getBoundingClientRect();
    const m = metrics();
    return {
      left: clamp(rect.left, 4, window.innerWidth - m.width - 4),
      top: clamp(rect.top, 56, window.innerHeight - m.height - 54)
    };
  }

  function hideTip() {
    window.clearTimeout(bubbleTimer);
    guide?.classList.remove('has-tip');
  }

  function showTip(text) {
    if (!guide || !text) return;
    const bubble = guide.querySelector('.aw-annie-bubble');
    if (!bubble) return;
    bubble.textContent = text;
    guide.classList.add('has-tip');
    window.clearTimeout(bubbleTimer);
    bubbleTimer = window.setTimeout(hideTip, 5200);
  }

  function wink() {
    if (!guide) return;
    guide.classList.remove('is-winking');
    void guide.offsetWidth;
    guide.classList.add('is-winking');
    window.setTimeout(() => guide?.classList.remove('is-winking'), 700);
  }

  function growBranch(index) {
    const branch = branchFor(index);
    if (!branch) return false;
    if (!branch.classList.contains('is-ready')) {
      branch.classList.add('is-ready');
    }
    return true;
  }

  function settleBranch(index) {
    document.querySelectorAll('.aw-tree-branch.is-landed').forEach(branch => branch.classList.remove('is-landed'));
    const branch = branchFor(index);
    if (!branch) return;
    void branch.offsetWidth;
    branch.classList.add('is-landed');
  }

  function perch(index) {
    const lane = stops[index]?.lane;
    const marker = markerFor(index);
    if (!lane || !marker || !guide) return false;

    const laneRect = lane.getBoundingClientRect();
    const markerRect = marker.getBoundingClientRect();
    const m = metrics();

    lane.appendChild(guide);
    guide.className = `aw-annie-guide is-visible is-perched side-${stops[index].side}`;
    guide.style.position = 'absolute';
    guide.style.left = `${Math.round(markerRect.left - laneRect.left + markerRect.width / 2 - m.width / 2)}px`;
    guide.style.top = `${Math.round(markerRect.top - laneRect.top + markerRect.height / 2 - m.footLine)}px`;
    guide.style.transform = 'none';
    landedIndex = index;
    settleBranch(index);
    wink();
    return true;
  }

  function branchVisible(index) {
    const marker = markerFor(index);
    if (!marker) return false;
    const rect = marker.getBoundingClientRect();
    const topGuard = window.innerWidth <= 700 ? 96 : 72;
    const bottomGuard = window.innerWidth <= 700 ? 152 : 104;
    return rect.top >= topGuard && rect.top <= window.innerHeight - bottomGuard;
  }

  function candidateIndex() {
    let bestIndex = -1;
    let bestDistance = Infinity;
    const targetLine = window.innerHeight * .58;

    stops.forEach(stop => {
      if (!stop.lane || !branchVisible(stop.index)) return;
      const marker = markerFor(stop.index)?.getBoundingClientRect();
      if (!marker) return;
      const distance = Math.abs(marker.top - targetLine);
      if (distance < bestDistance) {
        bestDistance = distance;
        bestIndex = stop.index;
      }
    });

    return bestIndex;
  }

  async function flyTo(index, { firstFlight = false, start = null } = {}) {
    if (!guide || flying || index < 0) return false;
    if (!growBranch(index)) return false;

    await wait(reducedMotion.matches ? 1 : 380);
    const destination = targetPosition(index);
    if (!destination) return false;

    const m = metrics();
    const from = start || currentPosition();
    const side = stops[index].side;
    const dx = clamp(from.left, -m.width, window.innerWidth) - destination.left;
    const dy = clamp(from.top, -m.height, window.innerHeight) - destination.top;
    const direction = destination.left >= from.left ? 1 : -1;
    const bank = direction * 7.5;
    const duration = reducedMotion.matches ? 1 : (firstFlight ? 1650 : 1320);
    const source = document.querySelector(SOURCE_SELECTOR);
    const sourceWidth = firstFlight && source ? source.getBoundingClientRect().width : m.width;
    const startScale = firstFlight ? clamp(sourceWidth / m.width, 1.35, 2.15) : 1;

    document.body.appendChild(guide);
    guide.className = `aw-annie-guide is-visible is-flying side-${side}`;
    guide.style.position = 'fixed';
    guide.style.left = `${Math.round(destination.left)}px`;
    guide.style.top = `${Math.round(destination.top)}px`;
    guide.style.transform = 'none';
    hideTip();
    flying = true;

    if (!reducedMotion.matches && guide.animate) {
      const animation = guide.animate([
        { transform: `translate(${dx}px,${dy}px) scale(${startScale}) rotate(0deg)`, opacity: firstFlight ? .92 : 1, offset: 0 },
        { transform: `translate(${dx * .84}px,${dy * .82 - 10}px) scale(${1 + (startScale - 1) * .78}) rotate(${bank * .62}deg)`, opacity: 1, offset: .20 },
        { transform: `translate(${dx * .52}px,${dy * .48 - 30}px) scale(${1 + (startScale - 1) * .42}) rotate(${bank}deg)`, offset: .52 },
        { transform: `translate(${dx * .21}px,${dy * .17 - 18}px) scale(${1 + (startScale - 1) * .14}) rotate(${bank * .44}deg)`, offset: .79 },
        { transform: `translate(${dx * .06}px,${dy * .04 - 6}px) scale(1.02) rotate(${bank * .12}deg)`, offset: .93 },
        { transform: 'translate(0,0) scale(1) rotate(0deg)', offset: 1 }
      ], {
        duration,
        easing: 'cubic-bezier(.22,.72,.2,1)',
        fill: 'both'
      });
      try { await animation.finished; } catch (_) {}
    }

    guide.classList.remove('is-flying');
    guide.classList.add('is-landing');
    await wait(reducedMotion.matches ? 1 : 170);
    const landed = perch(index);
    guide.classList.remove('is-landing');
    flying = false;
    return landed;
  }

  async function launch() {
    if (launched || launching || flying || !sourceSeen || !branchVisible(0)) return;
    const source = document.querySelector(SOURCE_SELECTOR);
    const rect = sourceRect() || lastSourceRect;
    if (!source || !rect || rect.bottom < 12 || rect.top > window.innerHeight - 12) return;

    launching = true;
    growBranch(0);
    source.classList.add('aw-annie-awakening');
    await wait(reducedMotion.matches ? 1 : 620);

    const m = metrics();
    const start = {
      left: rect.left + rect.width / 2 - m.width / 2,
      top: rect.top + rect.height / 2 - m.height / 2
    };

    const landed = await flyTo(0, { firstFlight: true, start });
    source.classList.remove('aw-annie-awakening');
    launching = false;

    if (landed) {
      launched = true;
      lineIndex = 0;
      showTip(stops[0].lines[0]);
    }
  }

  function contextualLine(index) {
    const stop = stops[index];
    const text = (document.querySelector(stop.context)?.innerText || '').toLowerCase();
    if (/prun|deadwood|clearance|topping/.test(text)) return stop.lines[0];
    if (/remov|rigging|utilities|drop zone/.test(text)) return stop.lines[0];
    if (/plant|root flare|watering|young tree/.test(text)) return stop.lines[0];
    if (/pressure|informed|what can wait/.test(text)) return stop.lines[0];
    if (/estimate|photos|address|conversation/.test(text)) return stop.lines[0];
    return stop.lines[lineIndex % stop.lines.length];
  }

  async function moveTo(index) {
    if (!launched || launching || flying || index < 0 || index === landedIndex) return;
    if (!branchVisible(index)) return;
    growBranch(index);
    const moved = await flyTo(index, { firstFlight: false, start: currentPosition() });
    if (moved) {
      lineIndex = (lineIndex + 1) % stops[index].lines.length;
      showTip(contextualLine(index));
    }

    const queued = pendingIndex;
    pendingIndex = null;
    if (queued != null && queued !== landedIndex) window.setTimeout(() => moveTo(queued), 120);
  }

  function settleAfterScroll() {
    sourceRect();
    if (!launched) {
      launch();
      return;
    }

    const next = candidateIndex();
    if (next < 0 || next === landedIndex) return;
    if (flying) pendingIndex = next;
    else moveTo(next);
  }

  function start() {
    cleanupLegacyAnnie();
    installStyles();
    addBarkRails();
    createLandingLanes();
    buildAnnie();
    sourceRect();

    const firstBranch = branchFor(0);
    if (firstBranch) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) growBranch(0);
        });
      }, { threshold: .12, rootMargin: '0px 0px -70px 0px' });
      observer.observe(firstBranch);
    }

    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y > lastScrollY + 1) sourceRect();
      lastScrollY = y;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll, 150);
    }, { passive: true });

    window.addEventListener('resize', () => {
      hideTip();
      if (landedIndex >= 0 && !flying && !launching) perch(landedIndex);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll, 180);
    }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();