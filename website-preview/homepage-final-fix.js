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

      v7.addEventListener('load', () => {
        if (document.querySelector('script[data-arborwise-annie-v8]')) return;
        const v8 = document.createElement('script');
        v8.src = 'homepage-annie-v8.js?v=20260730-1648';
        v8.dataset.arborwiseAnnieV8 = 'true';

        v8.addEventListener('load', () => {
          if (document.querySelector('script[data-arborwise-final-v9]')) return;
          const v9 = document.createElement('script');
          v9.src = 'homepage-final-v9.js?v=20260730-1705';
          v9.dataset.arborwiseFinalV9 = 'true';
          document.head.appendChild(v9);
        });

        document.head.appendChild(v8);
      });

      document.head.appendChild(v7);
    });

    document.head.appendChild(v6);
  });

  document.head.appendChild(v5);
})();
