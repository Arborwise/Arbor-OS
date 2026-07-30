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

    v6.addEventListener('load', () => {
      if (document.querySelector('script[data-arborwise-greg-v7]')) return;
      const v7 = document.createElement('script');
      v7.src = 'homepage-greg-fix-v7.js?v=20260730-1640';
      v7.dataset.arborwiseGregV7 = 'true';
      document.head.appendChild(v7);
    });

    document.head.appendChild(v6);
  });

  document.head.appendChild(v5);
})();
