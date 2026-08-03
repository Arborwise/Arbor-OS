(() => {
  'use strict';
  document.getElementById('aw-hero-unify-v48')?.remove();
  const previous = document.querySelector('script[data-aw-hero-v49]');
  if (previous) previous.remove();
  const script = document.createElement('script');
  script.src = 'hero-unify-v49.js?rev=hero-bubble-20260803-1034';
  script.async = false;
  script.dataset.awHeroV49 = 'true';
  document.head.appendChild(script);
})();
