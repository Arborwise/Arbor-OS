(() => {
  'use strict';

  const SOURCE_SELECTOR = '.annie-callout img[data-annie], .annie-callout img';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const wait = ms => new Promise(resolve => window.setTimeout(resolve, ms));
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const stops = [
    { selector: '.annie-badge', insert: 'after', side: 'right', context: '.annie-callout', lines: [
      'Hi, I’m Arborwise Annie. We’re glad you’re here.',
      'You do not need the diagnosis before you call. Show us what changed.',
      'I keep the tree talk simple. The trees are complicated enough already.'
    ]},
    { selector: '.intro-section', insert: 'append', side: 'left', context: '.intro-section', lines: [
      'The right tree company should lower your blood pressure, not raise it.',
      'No pressure and no mystery—just an honest answer with a reason behind it.',
      'Sometimes the smartest recommendation is to leave the tree alone for now.'
    ]},
    { selector: '#services .service-card:nth-of-type(1)', insert: 'after', side: 'right', context: '#services .service-card:nth-of-type(1)', lines: [
      'Good pruning has a reason. Random cuts are just a bad haircut with a chainsaw.',
      'Every cut should solve a problem—not merely make the tree shorter.',
      'No topping. No guessing. No chainsaw interpretive dance.'
    ]},
    { selector: '#services .service-card:nth-of-type(2)', insert: 'after', side: 'left', context: '#services .service-card:nth-of-type(2)', lines: [
      'A safe removal is planned before the first cut. Gravity is not a crew member.',
      'Access, rigging, utilities, structures, and cleanup all belong in the plan.',
      'Controlled removal means the tree comes down where the plan says—not where gravity votes.'
    ]},
    { selector: '#services .service-card:nth-of-type(3)', insert: 'after', side: 'right', context: '#services .service-card:nth-of-type(3)', lines: [
      'Planting too deep is like burying a tree’s ankles. Roots need air, too.',
      'The right tree in the wrong place becomes tomorrow’s expensive lesson.',
      'A young tree needs the right depth, visible root flare, mulch, and a real watering plan.'
    ]},
    { selector: '#services .service-card:nth-of-type(4)', insert: 'after', side: 'left', context: '#services .service-card:nth-of-type(4)', lines: [
      'A good plan protects the trees, the property, and the people using it.',
      'Clear scopes and dependable follow-through matter on every property.',
      'Tree care works better when everyone knows what happens next.'
    ]},
    { selector: '.growth-section', insert: 'after', side: 'right', context: '.growth-section', lines: [
      'The right tree in the right place can still make sense twenty years from now.',
      'A little planning today prevents a very expensive tree argument later.',
      'Good planting starts below ground, where most shortcuts eventually show up.'
    ]},
    { selector: '#way .process li:nth-child(2)', insert: 'after', side: 'left', context: '#way', lines: [
      'We explain what we see before asking you to approve anything.',
      'Plain language is part of doing the job right.',
      'Expertise should answer questions—not hide behind big words.'
    ]},
    { selector: '#way', insert: 'append', side: 'right', context: '#way', lines: [
      'The right answer is sometimes “not yet.” Trees appreciate patience—and so does your wallet.',
      'A recommendation should make sense before a saw ever starts.',
      'We would rather explain the reason than pressure you into the work.'
    ]},
    { selector: '#areas', insert: 'append', side: 'left', context: '#areas', lines: [
      'We work where our name has to keep meaning something. Local roots keep us accountable.',
      'Local roots are not just for trees. Arborwise is part of these communities, too.',
      'A good reputation grows slowly. We plan to keep nurturing ours.'
    ]},
    { selector: '#estimate', insert: 'before', side: 'right', context: '#estimate', lines: [
      'Tell us what changed and what worries you most. We’ll look before we guess.',
      'Photos help, but the property tells the full story.',
      'A clear estimate should answer questions—not create new ones.'
    ]}
  ];

  let guide = null;
  let launched = false;
  let launching = false;
  let flying = false;
  let landedIndex = -1;
  let lineIndex = 0;
  let bubbleTimer = 0;
  let scrollTimer = 0;
  let lastScrollY = window.scrollY;
  let pendingIndex = null;

  function installStyles() {
    document.querySelectorAll('#awAnnieScrollGuide,.aw-annie-landing-lane').forEach(node => node.remove());
    document.querySelectorAll('[id^="arborwise-annie-scroll-flight-"],[id^="arborwise-annie-flight-correction-"],[id^="arborwise-annie-perch-flight-"]').forEach(node => node.remove());

    const style = document.createElement('style');
    style.id = 'arborwise-annie-perch-flight-v23';
    style.textContent = `
      html body .aw-head .aw-art{position:relative!important;isolation:isolate!important}
      html body .aw-head .aw-art::before,html body .aw-head .aw-art::after{position:absolute!important;top:28%!important;z-index:5!important;color:#efc45f!important;font-family:Inter,Arial,sans-serif!important;font-size:clamp(.72rem,2.7vw,.96rem)!important;font-weight:950!important;line-height:1!important;letter-spacing:.13em!important;text-shadow:0 2px 8px #000,0 0 16px #000!important;opacity:.96!important;pointer-events:none!important}
      html body .aw-head .aw-art::before{content:'EST.'!important;left:5.5%!important}
      html body .aw-head .aw-art::after{content:'2019'!important;right:4.5%!important}
      html body .aw-head .aw-tag{position:static!important;display:block!important;width:auto!important;margin:5px auto 10px!important;transform:none!important;text-align:center!important}
      html body .aw-head .aw-foot,html body .aw-head .aw-foot-tag,html body>.aw-foot,html body>.aw-foot-tag{display:none!important}
      html body .aw-head .aw-facebook-compact{display:inline-flex!important;width:clamp(290px,58%,390px)!important;max-width:calc(100% - 52px)!important;min-height:50px!important;margin:14px auto 24px!important;padding:7px 15px!important;align-items:center!important;justify-content:center!important;gap:10px!important;border-radius:999px!important;font-size:.88rem!important;line-height:1.05!important}
      html body .aw-head .aw-facebook-compact i{width:32px!important;height:32px!important;font-size:1.35rem!important}

      ${SOURCE_SELECTOR}{transform-origin:50% 55%;transition:filter .35s ease,transform .35s ease}
      ${SOURCE_SELECTOR}.aw-annie-awakening{animation:awPortraitAwaken 1.65s ease-in-out both}

      .annie-callout>.annie-badge{grid-column:1!important;grid-row:1!important}
      .annie-callout>.aw-annie-landing-lane:first-of-type{grid-column:1/-1!important;grid-row:2!important}
      .annie-callout>div:not(.annie-badge):not(.aw-annie-landing-lane){grid-column:2!important;grid-row:1!important}

      .aw-annie-landing-lane{position:relative!important;display:block!important;grid-column:1/-1!important;width:100%!important;height:138px!important;min-height:138px!important;margin:12px 0 18px!important;overflow:visible!important;pointer-events:none!important;isolation:isolate!important;clear:both!important}
      .aw-annie-landing-lane.is-first{margin-top:8px!important;margin-bottom:12px!important}
      .aw-annie-branch{position:absolute;z-index:2;bottom:18px;width:142px;height:46px;filter:drop-shadow(0 7px 8px rgba(0,0,0,.18));transform:scaleX(0);opacity:.15;transition:transform .72s cubic-bezier(.2,.8,.2,1),opacity .28s ease;transform-origin:left center}
      .aw-annie-landing-lane.is-left .aw-annie-branch{left:-12px;transform-origin:left center}
      .aw-annie-landing-lane.is-right .aw-annie-branch{right:-12px;transform-origin:right center}
      .aw-annie-landing-lane.is-grown .aw-annie-branch{transform:scaleX(1);opacity:1}
      .aw-annie-wood{position:absolute;left:2px;right:2px;bottom:9px;height:13px;border-radius:66% 28% 62% 34%;background:linear-gradient(180deg,#9d6a3c,#6c431f 56%,#482a14);box-shadow:inset 0 2px rgba(255,255,255,.18)}
      .aw-annie-wood::before{content:'';position:absolute;right:4px;top:-4px;width:48px;height:7px;border-radius:999px;background:#68401e;transform:rotate(-25deg);transform-origin:0 50%}
      .aw-annie-leaf{position:absolute;width:21px;height:16px;border-radius:72% 0 72% 0;background:linear-gradient(135deg,#75ae4d,#347844 68%,#205b32);box-shadow:inset 0 1px rgba(255,255,255,.22)}
      .aw-annie-leaf.a{right:3px;top:3px;transform:rotate(26deg)}
      .aw-annie-leaf.b{right:27px;top:10px;transform:rotate(-15deg) scale(.92)}
      .aw-annie-leaf.c{left:7px;top:9px;transform:rotate(-38deg) scale(.88)}
      .aw-annie-leaf.d{left:31px;top:3px;transform:rotate(18deg) scale(.78)}
      .aw-annie-branch.is-landed{animation:awBranchSettle .7s ease-out both}
      .aw-annie-branch.is-landed .aw-annie-leaf{animation:awLeafRustle .72s ease-out both}

      .aw-annie-guide{position:fixed;z-index:82;left:0;top:0;width:96px;height:102px;pointer-events:none;opacity:0;visibility:hidden;transform-origin:50% 70%}
      .aw-annie-guide.is-visible{opacity:1;visibility:visible}
      .aw-annie-guide.is-perched{position:absolute;z-index:5}
      .aw-annie-button{position:relative;display:block;width:96px;height:102px;margin:0!important;padding:0!important;border:0!important;background:transparent!important;box-shadow:none!important;appearance:none!important;pointer-events:auto;cursor:pointer}
      .aw-annie-character{position:absolute;left:50%;top:0;width:90px;height:92px;transform:translateX(-50%);filter:drop-shadow(0 7px 6px rgba(0,0,0,.25));transform-origin:50% 70%}
      .aw-annie-crop{position:absolute;left:50%;top:0;width:86px;height:53px;transform:translateX(-50%);overflow:hidden}
      .aw-annie-body{display:block;width:86px;height:86px;object-fit:contain;object-position:center top;transform:scale(1.04) translateY(-1px);user-select:none;-webkit-user-drag:none}
      .aw-annie-foot{position:absolute;z-index:7;top:52px;width:16px;height:12px;border-radius:50%;background:#e6a72b;border:2px solid #9a5b12;transition:top .22s ease,transform .22s ease}
      .aw-annie-foot.left{left:25px;transform:rotate(4deg)}
      .aw-annie-foot.right{right:25px;transform:rotate(-4deg)}
      .aw-annie-foot::before,.aw-annie-foot::after{content:'';position:absolute;bottom:-6px;width:3px;height:9px;border-radius:999px;background:#d99116;border:1px solid #8e510d}
      .aw-annie-foot::before{left:3px;transform:rotate(24deg)}
      .aw-annie-foot::after{right:3px;transform:rotate(-24deg)}
      .aw-annie-guide.is-flying .aw-annie-foot.left{top:48px;transform:translateX(5px) rotate(25deg) scale(.88)}
      .aw-annie-guide.is-flying .aw-annie-foot.right{top:48px;transform:translateX(-5px) rotate(-25deg) scale(.88)}
      .aw-annie-guide.is-landing .aw-annie-foot.left{top:53px;transform:rotate(1deg) scale(1.03)}
      .aw-annie-guide.is-landing .aw-annie-foot.right{top:53px;transform:rotate(-1deg) scale(1.03)}
      .aw-annie-wink{position:absolute;z-index:9;left:25px;top:24px;width:19px;height:11px;border-radius:50%;background:linear-gradient(#b56d34,#7b3f1f);border-bottom:2px solid #4b2616;opacity:0;transform:scaleY(.12)}
      .aw-annie-guide.is-winking .aw-annie-wink{animation:awWink .72s ease-in-out both}
      .aw-annie-bubble{position:absolute;z-index:12;top:-4px;width:min(252px,66vw);padding:11px 13px;border:2px solid #c9972f;border-radius:17px;background:#fffdf6;color:#173f2e;box-shadow:0 12px 28px rgba(0,0,0,.20);font-size:.82rem;font-weight:800;line-height:1.34;opacity:0;transform:translateY(7px) scale(.97);transition:opacity .16s ease,transform .16s ease}
      .aw-annie-landing-lane.is-left .aw-annie-bubble{left:96px}
      .aw-annie-landing-lane.is-right .aw-annie-bubble{right:96px}
      body>.aw-annie-guide .aw-annie-bubble{bottom:calc(100% + 7px);top:auto;right:0}
      .aw-annie-guide.has-tip .aw-annie-bubble{opacity:1;transform:none}

      @keyframes awPortraitAwaken{0%{filter:none;transform:scale(1)}34%{filter:drop-shadow(0 0 12px rgba(216,242,119,.62));transform:scale(1.012) rotate(-.5deg)}68%{filter:drop-shadow(0 0 19px rgba(216,242,119,.88));transform:scale(1.025) rotate(.8deg)}100%{filter:none;transform:scale(1)}}
      @keyframes awWink{0%,12%,88%,100%{opacity:0;transform:scaleY(.12)}28%,66%{opacity:1;transform:scaleY(1)}}
      @keyframes awBranchSettle{0%{transform:scaleX(1) translateY(0) rotate(0)}35%{transform:scaleX(1) translateY(3px) rotate(-1.5deg)}70%{transform:scaleX(1) translateY(-1px) rotate(.7deg)}100%{transform:scaleX(1) translateY(0) rotate(0)}}
      @keyframes awLeafRustle{40%{filter:brightness(1.14)}}

      @media(max-width:700px){
        .annie-callout>.annie-badge{grid-column:1!important;grid-row:1!important}
        .annie-callout>.aw-annie-landing-lane:first-of-type{grid-column:1!important;grid-row:2!important}
        .annie-callout>div:not(.annie-badge):not(.aw-annie-landing-lane){grid-column:1!important;grid-row:3!important}
        .aw-annie-landing-lane{height:128px!important;min-height:128px!important;margin:8px 0 14px!important}
        .aw-annie-branch{width:126px;height:42px;bottom:16px}
        .aw-annie-bubble{width:min(235px,64vw);font-size:.79rem}
      }
      @media(min-width:701px){
        .aw-annie-landing-lane{height:156px!important;min-height:156px!important;margin:14px 0 20px!important}
        .aw-annie-branch{width:154px;height:48px;bottom:18px}
        .aw-annie-guide,.aw-annie-button{width:112px;height:122px}
        .aw-annie-character{width:104px;height:108px}
        .aw-annie-crop{width:98px;height:62px}
        .aw-annie-body{width:98px;height:98px}
        .aw-annie-foot{top:61px;width:19px;height:14px}
        .aw-annie-foot.left{left:30px}.aw-annie-foot.right{right:30px}
        .aw-annie-guide.is-flying .aw-annie-foot{top:57px}
        .aw-annie-guide.is-landing .aw-annie-foot{top:62px}
        .aw-annie-wink{left:29px;top:28px;width:22px;height:13px}
        .aw-annie-landing-lane.is-left .aw-annie-bubble{left:112px}
        .aw-annie-landing-lane.is-right .aw-annie-bubble{right:112px}
        .aw-annie-bubble{width:min(300px,44vw);padding:13px 15px;font-size:.91rem}
      }
      @media(prefers-reduced-motion:reduce){${SOURCE_SELECTOR},.aw-annie-branch,.aw-annie-character,.aw-annie-wink{animation:none!important;transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function fixHeaderAndFacebook() {
    const art = document.querySelector('.aw-head .aw-art');
    if (art) art.setAttribute('data-aw-header-restored', 'true');

    [...document.querySelectorAll('a')].forEach(link => {
      if (/find arborwise on facebook/i.test(link.textContent || '')) link.classList.add('aw-facebook-compact');
    });
  }

  function createBranch() {
    const branch = document.createElement('span');
    branch.className = 'aw-annie-branch';
    branch.innerHTML = '<span class="aw-annie-wood"></span><i class="aw-annie-leaf a"></i><i class="aw-annie-leaf b"></i><i class="aw-annie-leaf c"></i><i class="aw-annie-leaf d"></i>';
    return branch;
  }

  function insertLane(stop, index) {
    const anchor = document.querySelector(stop.selector);
    if (!anchor) return null;

    const lane = document.createElement('div');
    lane.className = `aw-annie-landing-lane is-${stop.side}${index === 0 ? ' is-first' : ''}`;
    lane.dataset.awAnnieStop = String(index);
    lane.appendChild(createBranch());

    if (stop.insert === 'append') anchor.appendChild(lane);
    else if (stop.insert === 'before') anchor.parentNode?.insertBefore(lane, anchor);
    else anchor.insertAdjacentElement('afterend', lane);

    stop.lane = lane;
    return lane;
  }

  function buildLanes() {
    stops.forEach(insertLane);
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('is-grown');
      });
    }, { rootMargin: '120px 0px 120px 0px', threshold: 0.01 });
    stops.forEach(stop => { if (stop.lane) observer.observe(stop.lane); });
  }

  function buildGuide() {
    guide = document.createElement('aside');
    guide.id = 'awAnnieScrollGuide';
    guide.className = 'aw-annie-guide';
    guide.setAttribute('aria-label', 'Annie tree-care guide');
    guide.innerHTML = `
      <div class="aw-annie-bubble" role="status" aria-live="polite"></div>
      <button class="aw-annie-button" type="button" aria-label="Read another Annie tree-care tip">
        <span class="aw-annie-character" aria-hidden="true">
          <span class="aw-annie-crop"><img class="aw-annie-body" src="assets/annie.webp" alt=""></span>
          <span class="aw-annie-foot left"></span><span class="aw-annie-foot right"></span><span class="aw-annie-wink"></span>
        </span>
      </button>`;
    document.body.appendChild(guide);

    guide.querySelector('.aw-annie-button')?.addEventListener('click', () => {
      if (!launched || flying || landedIndex < 0) return;
      if (guide.classList.contains('has-tip')) { hideTip(); return; }
      const lines = stops[landedIndex]?.lines || stops[0].lines;
      lineIndex = (lineIndex + 1) % lines.length;
      wink();
      showTip(lines[lineIndex]);
    });
  }

  function metrics() {
    return window.innerWidth > 700
      ? { width: 112, height: 122, contactY: 83 }
      : { width: 96, height: 102, contactY: 72 };
  }

  function branchFor(index) { return stops[index]?.lane?.querySelector('.aw-annie-branch') || null; }
  function woodFor(index) { return stops[index]?.lane?.querySelector('.aw-annie-wood') || null; }

  function branchAvailable(index) {
    const branch = branchFor(index);
    if (!branch || !stops[index]?.lane?.classList.contains('is-grown')) return false;
    const rect = branch.getBoundingClientRect();
    const topGuard = 94;
    const bottomGuard = window.innerWidth <= 700 ? 174 : 124;
    return rect.width > 30 && rect.top >= topGuard && rect.bottom <= window.innerHeight - bottomGuard;
  }

  function destination(index) {
    const branch = branchFor(index);
    const wood = woodFor(index);
    if (!branch || !wood) return null;
    const branchRect = branch.getBoundingClientRect();
    const woodRect = wood.getBoundingClientRect();
    const size = metrics();
    return {
      left: clamp(branchRect.left + branchRect.width / 2 - size.width / 2, 4, window.innerWidth - size.width - 4),
      top: woodRect.top - size.contactY + 3
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
    bubbleTimer = window.setTimeout(hideTip, 5400);
  }

  function wink() {
    if (!guide) return;
    guide.classList.remove('is-winking');
    void guide.offsetWidth;
    guide.classList.add('is-winking');
    window.setTimeout(() => guide?.classList.remove('is-winking'), 760);
  }

  function markLanding(index) {
    document.querySelectorAll('.aw-annie-branch.is-landed').forEach(branch => branch.classList.remove('is-landed'));
    const branch = branchFor(index);
    if (!branch) return;
    void branch.offsetWidth;
    branch.classList.add('is-landed');
  }

  function perch(index) {
    const lane = stops[index]?.lane;
    const branch = branchFor(index);
    const wood = woodFor(index);
    if (!lane || !branch || !wood || !guide) return false;

    const laneRect = lane.getBoundingClientRect();
    const branchRect = branch.getBoundingClientRect();
    const woodRect = wood.getBoundingClientRect();
    const size = metrics();

    lane.appendChild(guide);
    guide.className = 'aw-annie-guide is-visible is-perched';
    guide.style.position = 'absolute';
    guide.style.left = `${Math.round(branchRect.left - laneRect.left + branchRect.width / 2 - size.width / 2)}px`;
    guide.style.top = `${Math.round(woodRect.top - laneRect.top - size.contactY + 3)}px`;
    guide.style.transform = 'none';
    landedIndex = index;
    markLanding(index);
    wink();
    return true;
  }

  function sourceVisible() {
    const source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return false;
    const rect = source.getBoundingClientRect();
    return rect.bottom > 70 && rect.top < window.innerHeight - 120;
  }

  function currentPosition() {
    if (!guide) return { left: 8, top: 120 };
    const rect = guide.getBoundingClientRect();
    const size = metrics();
    return {
      left: clamp(rect.left, 4, window.innerWidth - size.width - 4),
      top: clamp(rect.top, 72, window.innerHeight - size.height - 72)
    };
  }

  async function flyTo(index, duration, startPosition) {
    if (!guide || flying || !branchAvailable(index)) return false;
    const target = destination(index);
    if (!target) return false;

    const size = metrics();
    const start = startPosition || currentPosition();
    document.body.appendChild(guide);
    guide.className = 'aw-annie-guide is-visible is-flying';
    guide.style.position = 'fixed';
    guide.style.left = `${Math.round(target.left)}px`;
    guide.style.top = `${Math.round(target.top)}px`;
    hideTip();
    flying = true;

    const dx = clamp(start.left, 4, window.innerWidth - size.width - 4) - target.left;
    const dy = clamp(start.top, 72, window.innerHeight - size.height - 72) - target.top;
    const bank = target.left > start.left ? 11 : -11;

    if (!reducedMotion.matches && guide.animate) {
      const animation = guide.animate([
        { transform: `translate(${dx}px,${dy}px) rotate(${bank * .18}deg) scale(.97)`, opacity: .18, offset: 0 },
        { transform: `translate(${dx * .88}px,${dy * .84 - 12}px) rotate(${bank}deg)`, opacity: 1, offset: .18 },
        { transform: `translate(${dx * .60}px,${dy * .56 - 42}px) rotate(${bank * .92}deg)`, opacity: 1, offset: .48 },
        { transform: `translate(${dx * .30}px,${dy * .25 - 34}px) rotate(${bank * .58}deg)`, opacity: 1, offset: .74 },
        { transform: `translate(${dx * .10}px,${dy * .07 - 14}px) rotate(${bank * .22}deg)`, opacity: 1, offset: .90 },
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1, offset: 1 }
      ], { duration, easing: 'cubic-bezier(.16,.72,.18,1)', fill: 'both' });
      try { await animation.finished; } catch (_) {}
    }

    guide.classList.remove('is-flying');
    guide.classList.add('is-landing');
    await wait(reducedMotion.matches ? 1 : 230);
    const success = perch(index);
    flying = false;
    return success;
  }

  function visibleCandidate() {
    const line = window.innerHeight * .58;
    let best = -1;
    let distance = Infinity;
    stops.forEach((stop, index) => {
      if (!branchAvailable(index) || index === landedIndex) return;
      const rect = branchFor(index).getBoundingClientRect();
      const nextDistance = Math.abs(rect.top + rect.height / 2 - line);
      if (nextDistance < distance) { best = index; distance = nextDistance; }
    });
    return best;
  }

  function contextLine(index) {
    const stop = stops[index] || stops[0];
    const text = String(document.querySelector(stop.context)?.innerText || '').toLowerCase();
    if (/pruning|deadwood|clearance|no topping/.test(text)) return stop.lines[0];
    if (/removal|rigging|drop zones|utilities/.test(text)) return stop.lines[0];
    if (/planting|root flare|watering plan|young tree/.test(text)) return stop.lines[0];
    if (/pressure|informed|what can wait/.test(text)) return stop.lines[0];
    if (/estimate|photos help|tell us/.test(text)) return stop.lines[0];
    return stop.lines[lineIndex % stop.lines.length];
  }

  async function launch() {
    if (launched || launching || flying || !sourceVisible() || !branchAvailable(0)) return;
    const source = document.querySelector(SOURCE_SELECTOR);
    if (!source) return;

    launching = true;
    source.classList.add('aw-annie-awakening');
    await wait(reducedMotion.matches ? 1 : 1450);

    const sourceRect = source.getBoundingClientRect();
    const size = metrics();
    const success = await flyTo(0, reducedMotion.matches ? 1 : 2800, {
      left: sourceRect.left + sourceRect.width / 2 - size.width / 2,
      top: sourceRect.top + sourceRect.height / 2 - size.height / 2
    });

    source.classList.remove('aw-annie-awakening');
    launching = false;
    if (success) {
      launched = true;
      lineIndex = 0;
      showTip('Hi, I’m Arborwise Annie. We’re glad you’re here.');
    }
  }

  async function moveTo(index) {
    if (!launched || launching || flying || index < 0 || index === landedIndex || !branchAvailable(index)) return;
    lineIndex = (lineIndex + 1) % 3;
    if (await flyTo(index, reducedMotion.matches ? 1 : 1950, currentPosition())) showTip(contextLine(index));
    const next = pendingIndex;
    pendingIndex = null;
    if (next != null && next !== landedIndex) window.setTimeout(() => moveTo(next), 120);
  }

  function settleAfterScroll() {
    if (!launched || launching) return;
    const candidate = visibleCandidate();
    if (candidate < 0 || candidate === landedIndex) return;
    if (flying) pendingIndex = candidate;
    else moveTo(candidate);
  }

  function start() {
    installStyles();
    fixHeaderAndFacebook();
    buildLanes();
    buildGuide();

    window.addEventListener('scroll', () => {
      const currentY = window.scrollY;
      const movingDown = currentY > lastScrollY + 1;
      lastScrollY = currentY;
      if (!launched && !launching && movingDown) launch();
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll, 170);
    }, { passive: true });

    window.addEventListener('resize', () => {
      hideTip();
      if (landedIndex >= 0 && !flying && !launching) perch(landedIndex);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(settleAfterScroll, 180);
    }, { passive: true });

    window.addEventListener('load', () => {
      fixHeaderAndFacebook();
      if (!launched && sourceVisible() && branchAvailable(0)) launch();
    }, { once: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();