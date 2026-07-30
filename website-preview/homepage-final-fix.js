(() => {
  const existing = document.querySelector('script[data-arborwise-homepage-v3]');
  if (existing) return;
  const script = document.createElement('script');
  script.src = 'homepage-final-v3.js?v=20260730-0041';
  script.dataset.arborwiseHomepageV3 = 'true';
  document.head.appendChild(script);
})();
