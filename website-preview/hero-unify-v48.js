(() => {
  'use strict';

  document.getElementById('aw-hero-unify-v48')?.remove();
  ['v49','v50','v51','v52'].forEach(version => {
    document.querySelector(`script[data-aw-hero-${version}]`)?.remove();
  });
  document.querySelector('script[data-aw-site-corrections-v54]')?.remove();

  const heroScript = document.createElement('script');
  heroScript.src = 'hero-unify-v52.js?rev=semantic-actions-bubble-20260803-1150';
  heroScript.async = false;
  heroScript.dataset.awHeroV52 = 'true';
  heroScript.onload = () => {
    const corrections = document.createElement('script');
    corrections.src = 'site-corrections-v54.js?rev=semantic-actions-bubble-20260803-1150';
    corrections.async = false;
    corrections.dataset.awSiteCorrectionsV54 = 'true';
    document.head.appendChild(corrections);
  };
  document.head.appendChild(heroScript);
})();
