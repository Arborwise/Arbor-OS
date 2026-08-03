(() => {
  'use strict';
  document.getElementById('aw-hero-unify-v48')?.remove();
  const oldV49 = document.querySelector('script[data-aw-hero-v49]');
  if (oldV49) oldV49.remove();
  const oldV50 = document.querySelector('script[data-aw-hero-v50]');
  if (oldV50) oldV50.remove();
  const oldV51 = document.querySelector('script[data-aw-hero-v51]');
  if (oldV51) oldV51.remove();
  const script = document.createElement('script');
  script.src = 'hero-unify-v51.js?rev=orange-bubble-tm-20260803-1048';
  script.async = false;
  script.dataset.awHeroV51 = 'true';
  document.head.appendChild(script);
})();
