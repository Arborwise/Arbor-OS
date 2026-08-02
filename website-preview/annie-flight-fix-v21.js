(() => {
  'use strict';

  const branchStops = [
    { selector: '.intro-section', side: 'right', top: '58%' },
    { selector: '#concerns', side: 'left', top: '64%' },
    { selector: '#services', side: 'right', top: '29%' },
    { selector: '#planting', side: 'left', top: '71%' },
    { selector: '#way', side: 'right', top: '34%' },
    { selector: '#areas', side: 'left', top: '57%' },
    { selector: '#estimate', side: 'right', top: '42%' }
  ];

  const originalAnimate = Element.prototype.animate;

  function installCorrections() {
    document.getElementById('arborwise-annie-flight-correction-v21')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-annie-flight-correction-v21';
    style.textContent = `
      .aw-annie-wing{display:none!important}
      .aw-annie-branch-host{position:relative!important}
      .aw-site-oak-branch{z-index:5!important}
      .aw-annie-scroll.is-flying .aw-annie-foot.left{top:66px!important;transform:translateX(6px) rotate(27deg) scale(.88)!important}
      .aw-annie-scroll.is-flying .aw-annie-foot.right{top:66px!important;transform:translateX(-6px) rotate(-27deg) scale(.88)!important}
      @media(max-width:700px){
        .aw-annie-scroll.is-flying .aw-annie-foot.left{top:54px!important;transform:translateX(5px) rotate(25deg) scale(.88)!important}
        .aw-annie-scroll.is-flying .aw-annie-foot.right{top:54px!important;transform:translateX(-5px) rotate(-25deg) scale(.88)!important}
      }
    `;
    document.head.appendChild(style);
  }

  function removeAddedWings() {
    document.querySelectorAll('.aw-annie-wing').forEach(wing => wing.remove());
  }

  function anchorBranchesToSections() {
    branchStops.forEach((stop, index) => {
      const section = document.querySelector(stop.selector);
      const branch = document.querySelector(`[data-aw-branch-index="${index}"]`);
      if (!section || !branch) return;

      section.classList.add('aw-annie-branch-host');
      if (branch.parentElement !== section) section.appendChild(branch);

      branch.classList.toggle('is-left', stop.side === 'left');
      branch.classList.toggle('is-right', stop.side === 'right');
      branch.style.position = 'absolute';
      branch.style.top = stop.top;
      branch.style.bottom = 'auto';
      branch.style.left = stop.side === 'left' ? '0px' : 'auto';
      branch.style.right = stop.side === 'right' ? '0px' : 'auto';
    });
  }

  function makeFacebookButtonBreathe() {
    const links = [...document.querySelectorAll('a')];
    const facebook = links.find(link => /find arborwise on facebook/i.test(link.textContent || ''));
    if (!facebook) return;
    facebook.style.width = 'min(500px, calc(100% - 76px))';
    facebook.style.maxWidth = 'calc(100% - 76px)';
    facebook.style.marginInline = 'auto';
    facebook.style.paddingInline = '22px';
  }

  function branchIsVisible(branch) {
    if (!branch) return false;
    const rect = branch.getBoundingClientRect();
    const topGuard = window.innerWidth <= 700 ? 112 : 88;
    const bottomGuard = window.innerWidth <= 700 ? 164 : 116;
    return rect.width > 20 && rect.top >= topGuard && rect.bottom <= window.innerHeight - bottomGuard;
  }

  function getPerchedBranch() {
    const landed = document.querySelector('.aw-site-oak-branch.is-landed');
    if (landed) return landed;

    const guide = document.getElementById('awAnnieScrollGuide');
    if (!guide) return null;
    const guideRect = guide.getBoundingClientRect();
    const guideCenter = guideRect.left + guideRect.width / 2;

    let best = null;
    let distance = Infinity;
    document.querySelectorAll('.aw-site-oak-branch').forEach(branch => {
      const rect = branch.getBoundingClientRect();
      if (!branchIsVisible(branch)) return;
      const nextDistance = Math.abs((rect.left + rect.width / 2) - guideCenter) + Math.abs(rect.top - guideRect.bottom);
      if (nextDistance < distance) {
        best = branch;
        distance = nextDistance;
      }
    });
    return best;
  }

  function alignAnnieToRealBranch() {
    const guide = document.getElementById('awAnnieScrollGuide');
    if (!guide || guide.classList.contains('is-flying')) return;

    const branch = getPerchedBranch();
    if (!branch || !branchIsVisible(branch)) {
      guide.classList.remove('is-visible');
      return;
    }

    const rect = branch.getBoundingClientRect();
    const guideWidth = window.innerWidth <= 700 ? 94 : 112;
    const guideHeight = window.innerWidth <= 700 ? 105 : 122;
    const left = Math.max(4, Math.min(window.innerWidth - guideWidth - 4, rect.left + rect.width / 2 - guideWidth / 2));
    const top = rect.top - guideHeight + (window.innerWidth <= 700 ? 20 : 22);

    guide.style.left = `${Math.round(left)}px`;
    guide.style.top = `${Math.round(top)}px`;
    guide.classList.add('is-visible');
  }

  function bankTowardTravel(keyframes, options) {
    if (!Array.isArray(keyframes) || keyframes.length < 2) return { keyframes, options };
    const firstTransform = String(keyframes[0]?.transform || '');
    const translateMatch = firstTransform.match(/translate\((-?[\d.]+)px\s*,/);
    if (!translateMatch) return { keyframes, options };

    const dx = Number.parseFloat(translateMatch[1]);
    const direction = dx > 0 ? -1 : 1;
    const bankDegrees = [2, 8, 12, 9, 5, 2, 0];

    const adjusted = keyframes.map((frame, index) => {
      const next = { ...frame };
      if (typeof next.transform === 'string') {
        const degrees = direction * (bankDegrees[index] ?? Math.max(0, 10 - index * 2));
        next.transform = /rotate\([^)]*\)/.test(next.transform)
          ? next.transform.replace(/rotate\([^)]*\)/, `rotate(${degrees}deg)`)
          : `${next.transform} rotate(${degrees}deg)`;
      }
      return next;
    });

    return {
      keyframes: adjusted,
      options: {
        ...(options || {}),
        duration: Math.max(Number(options?.duration) || 0, 1500),
        easing: 'cubic-bezier(.16,.74,.18,1)'
      }
    };
  }

  Element.prototype.animate = function patchedAnimate(keyframes, options) {
    if (this.classList?.contains('aw-annie-character')) {
      const corrected = bankTowardTravel(keyframes, options);
      return originalAnimate.call(this, corrected.keyframes, corrected.options);
    }
    return originalAnimate.call(this, keyframes, options);
  };

  function refresh() {
    removeAddedWings();
    anchorBranchesToSections();
    makeFacebookButtonBreathe();
    window.requestAnimationFrame(alignAnnieToRealBranch);
  }

  function start() {
    installCorrections();
    refresh();

    const observer = new MutationObserver(() => refresh());
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('scroll', () => window.requestAnimationFrame(alignAnnieToRealBranch), { passive: true });
    window.addEventListener('resize', refresh, { passive: true });
    window.addEventListener('load', refresh, { once: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
