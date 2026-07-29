(() => {
  const localSection = document.querySelector('.local-section');
  if (!localSection) return;

  const heading = localSection.querySelector('h2');
  const copy = localSection.querySelector('p:last-child');
  if (heading) heading.textContent = 'Local Arborwise answers for the North Texas communities we serve.';
  if (copy) copy.textContent = 'Each page starts with the questions people in that community are likely to bring us, then connects them to the main Arborwise concern checker, services, team, and contact options. The first six city pages are now connected.';

  const cityCloud = localSection.querySelector('.city-cloud');
  if (cityCloud) {
    cityCloud.innerHTML = `
      <a href="/farmersville-tree-service/">Farmersville</a>
      <a href="/tree-service-anna-tx/">Anna</a>
      <a href="/van-alstyne-tree-service/">Van Alstyne</a>
      <a href="/celina-tree-service/">Celina</a>
      <a href="/howe-tree-service/">Howe</a>
      <a href="/princeton-tree-service/">Princeton</a>
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