(() => {
  'use strict';
  document.getElementById('aw-hero-unify-v48')?.remove();
  ['v49','v50','v51','v52'].forEach(version => {
    document.querySelector(`script[data-aw-hero-${version}]`)?.remove();
  });
  const script = document.createElement('script');
  script.src = 'hero-unify-v52.js?rev=orange-actions-type-20260803-1144';
  script.async = false;
  script.dataset.awHeroV52 = 'true';
  document.head.appendChild(script);
})();
