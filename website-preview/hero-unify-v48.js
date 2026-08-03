(() => {
  'use strict';
  document.getElementById('aw-hero-unify-v48')?.remove();
  ['v49','v50','v51','v52'].forEach(version => {
    document.querySelector(`script[data-aw-hero-${version}]`)?.remove();
  });
  const script = document.createElement('script');
  script.src = 'hero-unify-v52.js?rev=merged-orange-hero-20260803-1052';
  script.async = false;
  script.dataset.awHeroV52 = 'true';
  document.head.appendChild(script);
})();
