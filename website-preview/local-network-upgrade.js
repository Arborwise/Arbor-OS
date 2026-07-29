(() => {
  const localSection = document.querySelector('.local-section');
  if (!localSection) return;

  const heading = localSection.querySelector('h2');
  const copy = localSection.querySelector('p:last-child');
  if (heading) heading.textContent = 'Local Arborwise answers for the North Texas communities we serve.';
  if (copy) copy.textContent = 'Each city page is being built from real Arborwise work, local concerns, photographs, reviews, and community ties. Farmersville and Anna are live first. The rest follow as we gather enough real evidence to make each page worth reading.';

  const cityCloud = localSection.querySelector('.city-cloud');
  if (cityCloud) {
    cityCloud.innerHTML = `
      <a href="/farmersville-tree-service/">Farmersville</a>
      <a href="/tree-service-anna-tx/">Anna</a>
      <span>Van Alstyne</span>
      <span>Celina</span>
      <span>Howe</span>
      <span>Princeton</span>
      <span>Melissa</span>
      <span>McKinney</span>`;
  }

  const style = document.createElement('style');
  style.id = 'local-network-upgrade-styles';
  style.textContent = `
    .city-cloud a{display:inline-flex;align-items:center;text-decoration:none;background:var(--forest)!important;color:white!important;border-color:var(--forest)!important;transition:.2s ease}
    .city-cloud a:after{content:' →';margin-left:4px}
    .city-cloud a:hover,.city-cloud a:focus-visible{transform:translateY(-2px);background:var(--leaf)!important}
  `;
  document.head.appendChild(style);
})();