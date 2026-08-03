(() => {
  'use strict';
  document.getElementById('aw-hero-unify-v48')?.remove();
  const oldV49 = document.querySelector('script[data-aw-hero-v49]');
  if (oldV49) oldV49.remove();
  const oldV50 = document.querySelector('script[data-aw-hero-v50]');
  if (oldV50) oldV50.remove();
  const script = document.createElement('script');
  script.src = 'hero-unify-v50.js?rev=spring-green-bubble-20260803-1042';
  script.async = false;
  script.dataset.awHeroV50 = 'true';
  document.head.appendChild(script);
})();
