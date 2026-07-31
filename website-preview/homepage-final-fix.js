(() => {
  if (document.querySelector('script[data-arborwise-homepage-v5]')) return;

  const load = (src, dataName) => new Promise(resolve => {
    const script = document.createElement('script');
    script.src = src;
    script.dataset[dataName] = 'true';
    script.addEventListener('load', resolve, { once: true });
    document.head.appendChild(script);
  });

  load('homepage-final-v5.js?v=20260730-1314', 'arborwiseHomepageV5')
    .then(() => load('homepage-dark-v6.js?v=20260730-1504', 'arborwiseDarkV6'))
    .then(() => load('homepage-final-v10.js?v=20260730-1718', 'arborwiseFinalV10'))
    .then(() => load('homepage-final-v10b.js?v=20260730-1718', 'arborwiseFinalV10b'))
    .then(() => load('homepage-final-v11.js?v=20260730-1728', 'arborwiseFinalV11'))
    .then(() => load('homepage-customer-review-v12.js?v=20260730-1748', 'arborwiseCustomerReviewV12'))
    .then(() => load('homepage-no-circle-v13.js?v=20260730-2104', 'arborwiseNoCircleV13'))
    .catch(console.error);
})();