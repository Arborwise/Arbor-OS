(() => {
  const ASSETS = {
    logo: 'assets/logo.webp',
    annie: 'assets/annie.webp',
    climber: 'assets/hero-climber.webp',
    leaves: 'assets/photo-guide/selective-pruning.webp',
    canopy: 'assets/declining-tree.webp',
    trunk: 'assets/photo-guide/controlled-removal.webp',
    lean: 'assets/young-tree-before.webp',
    before: 'assets/declining-tree.webp',
    after: 'assets/healthy-tree.webp'
  };

  document.querySelectorAll('.brand img, .footer-brand img').forEach(img => {
    img.src = ASSETS.logo;
    img.alt = 'Arborwise Tree Care';
    img.onerror = null;
  });

  document.querySelectorAll('img.annie, .annie-mini img, .care-statement img').forEach(img => {
    img.src = ASSETS.annie;
    img.alt = 'Annie, the friendly Arborwise owl with an A on her chest';
    img.onerror = null;
  });

  const heroImg = document.querySelector('.hero-photo img');
  if (heroImg) {
    heroImg.src = ASSETS.climber;
    heroImg.alt = 'Arborwise climber working high in a North Texas tree';
    heroImg.onerror = null;
  }

  const backgroundAssets = [
    ['.foliage-image', ASSETS.leaves, 'center 42%'],
    ['.canopy-image', ASSETS.canopy, 'center 34%'],
    ['.trunk-image', ASSETS.trunk, 'center 48%'],
    ['.lean-image', ASSETS.lean, 'center 54%'],
    ['.story-climber', ASSETS.climber, 'center 58%']
  ];
  backgroundAssets.forEach(([selector, url, position]) => {
    document.querySelectorAll(selector).forEach(element => {
      element.style.backgroundImage = `url('${url}')`;
      element.style.backgroundPosition = position;
      element.classList.remove('asset-fallback');
    });
  });

  const proofImages = document.querySelectorAll('.proof-grid img');
  if (proofImages[0]) proofImages[0].src = ASSETS.before;
  if (proofImages[1]) proofImages[1].src = ASSETS.after;

  if (!document.querySelector('script[src="mobile-customer-view-upgrade.js"]')) {
    const mobileCustomerView = document.createElement('script');
    mobileCustomerView.src = 'mobile-customer-view-upgrade.js';
    mobileCustomerView.defer = true;
    document.body.appendChild(mobileCustomerView);
  }
})();
