(() => {
  'use strict';

  document.getElementById('aw-hero-unify-v48')?.remove();
  ['v49','v50','v51','v52'].forEach(version => {
    document.querySelector(`script[data-aw-hero-${version}]`)?.remove();
  });
  document.querySelector('script[data-aw-site-corrections-v54]')?.remove();
  document.querySelector('script[data-aw-site-corrections-v56]')?.remove();

  const heroScript = document.createElement('script');
  heroScript.src = 'hero-unify-v52.js?rev=semantic-actions-bubble-20260803-1150';
  heroScript.async = false;
  heroScript.dataset.awHeroV52 = 'true';
  heroScript.onload = () => {
    const corrections = document.createElement('script');
    corrections.src = 'site-corrections-v54.js?rev=stable-beak-anchor-headline-20260803-1229';
    corrections.async = false;
    corrections.dataset.awSiteCorrectionsV56 = 'true';
    document.head.appendChild(corrections);
  };
  document.head.appendChild(heroScript);
})();
