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

  const style = document.createElement('style');
  style.id = 'arborwise-annie-v38-fixes';
  style.textContent = `
    .annie-callout.aw-v38-wait .aw-v37-annie{opacity:0!important;transform:translate3d(120px,-32px,0) rotate(8deg) scale(.96)!important}
    .annie-callout.aw-v38-wait .aw-v37-bubble{opacity:0!important;transform:translateY(5px) scale(.97)!important}
    .aw-v37-companion .aw-v37-annie{pointer-events:auto!important}
  `;
  document.head.appendChild(style);

  document.querySelectorAll('.annie-badge').forEach(node => node.remove());

  function showBubble(bubble, annie, message) {
    bubble.textContent = message;
    bubble.classList.add('show');
    annie.classList.remove('blink');
    window.setTimeout(() => {
      annie.classList.add('blink');
      window.setTimeout(() => annie.classList.remove('blink'), 430);
    }, 650);
    window.clearTimeout(bubble._v38Hide);
    bubble._v38Hide = window.setTimeout(() => bubble.classList.remove('show'), 1500);
  }

  function patchOpening(section) {
    const annie = section?.querySelector('.aw-v37-stage .aw-v37-annie');
    const bubble = section?.querySelector('.aw-v37-stage .aw-v37-bubble');
    if (!annie || !bubble || section.dataset.v38Opening === 'true') return Boolean(annie && bubble);
    section.dataset.v38Opening = 'true';
    section.classList.add('aw-v38-wait');
    annie.classList.remove('landed', 'blink');
    bubble.classList.remove('show');

    let launched = false;
    const launch = () => {
      if (launched) return;
      launched = true;
      section.classList.remove('aw-v38-wait');
      annie.classList.remove('landed');
      bubble.classList.remove('show');
      void annie.offsetWidth;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        annie.classList.add('landed');
        window.setTimeout(() => showBubble(bubble, annie, OPENING), 620);
      }));
    };

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting && entry.intersectionRatio > .16)) {
          observer.disconnect();
          launch();
        }
      }, {threshold:[.16,.3]});
      observer.observe(section);
    } else {
      launch();
    }
    return true;
  }

  function patchCompanion() {
    const companion = document.querySelector('.aw-v37-companion');
    const annie = companion?.querySelector('.aw-v37-annie');
    const bubble = companion?.querySelector('.aw-v37-bubble');
    if (!annie || !bubble || annie.dataset.v38Tap === 'true') return Boolean(annie && bubble);
    annie.dataset.v38Tap = 'true';
    annie.removeAttribute('aria-hidden');
    annie.setAttribute('aria-label', 'See another Annie tip');
    let index = 0;
    annie.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      showBubble(bubble, annie, TIPS[index++ % TIPS.length]);
    });
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    document.querySelectorAll('.annie-badge').forEach(node => node.remove());
    const openingReady = patchOpening(document.querySelector('.annie-callout'));
    const companionReady = patchCompanion();
    if ((openingReady && companionReady) || attempts > 40) window.clearInterval(timer);
  }, 100);
})();