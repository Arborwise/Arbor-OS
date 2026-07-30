(() => {
  const existing = document.querySelector('script[data-arborwise-homepage-v5]');
  if (existing) return;
  const script = document.createElement('script');
  script.src = 'homepage-final-v5.js?v=20260730-1314';
  script.dataset.arborwiseHomepageV5 = 'true';
  document.head.appendChild(script);
})();
