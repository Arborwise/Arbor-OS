(() => {
  const existing = document.querySelector('script[data-arborwise-homepage-v5]');
  if (existing) return;

  const v5 = document.createElement('script');
  v5.src = 'homepage-final-v5.js?v=20260730-1314';
  v5.dataset.arborwiseHomepageV5 = 'true';

  v5.addEventListener('load', () => {
    if (document.querySelector('script[data-arborwise-dark-v6]')) return;
    const v6 = document.createElement('script');
    v6.src = 'homepage-dark-v6.js?v=20260730-1504';
    v6.dataset.arborwiseDarkV6 = 'true';
    document.head.appendChild(v6);
  });

  document.head.appendChild(v5);
})();
