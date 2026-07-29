(() => {
  const ASSETS = {
    logo: 'https://arborwisetreecare.com/wp-content/uploads/2024/08/Arborwise-logo-round-.png',
    annie: 'https://drive.google.com/thumbnail?id=1cuJhbwdER-gaZHWwUEuwkiOpgRulifOQ&sz=w600',
    climber: 'https://drive.google.com/thumbnail?id=1WxgSebPqu09pGGgfiNygDv0aZk4uvl1m&sz=w1800',
    luciaA: 'https://drive.google.com/thumbnail?id=1HlkXltt9Ui4dyqcoOecd_-Uwom_OSqiu&sz=w1000',
    luciaB: 'https://drive.google.com/thumbnail?id=1Eq45uDCfQJ8LS79rDyZzmpdkTdlGA0kW&sz=w1000',
    hootA: 'https://drive.google.com/thumbnail?id=1GzZrVyS5pcuZlFX8IwuppRTU6NPS3Ztv&sz=w1200',
    hootB: 'https://drive.google.com/thumbnail?id=1O0DJoKOxMowp9-FSDs5G6SlKLdPV7Y62&sz=w1200',
    pruning: 'https://arborwisetreecare.com/wp-content/uploads/2021/02/IMG_20200618_143752_01-370x209.jpg',
    removal: 'https://arborwisetreecare.com/wp-content/uploads/2024/08/tree-removals-arborwise-texas-370x209.jpg'
  };

  const css = document.createElement('style');
  css.id = 'preview-assets-styles';
  css.textContent = `
    .brand-wordmark{display:flex;flex-direction:column;line-height:.9;color:var(--forest)}
    .brand-wordmark strong{font-family:var(--serif);font-size:1.35rem;letter-spacing:-.04em}
    .brand-wordmark small{font-size:.62rem;font-weight:950;letter-spacing:.22em;margin-top:7px}
    .annie-fallback{display:grid;place-items:center;font-size:5rem;min-width:110px;min-height:110px;filter:drop-shadow(0 12px 14px rgba(18,63,47,.15))}
    .annie-inner .annie-fallback{font-size:9rem;align-self:center;justify-self:center}
    .hero-photo.asset-fallback{background:radial-gradient(circle at 55% 35%,#4f8b58 0,#1d6045 42%,#123f2f 100%)}
    .hero-photo.asset-fallback:before{content:'Real Arborwise work photo loading';position:absolute;inset:0;display:grid;place-items:center;color:white;font-weight:900;z-index:1}
    .concern-image.asset-fallback{background-image:linear-gradient(135deg,#dfead7,#7ea06f)!important}
  `;
  document.head.appendChild(css);

  function replaceWithWordmark(img) {
    const fallback = document.createElement('span');
    fallback.className = 'brand-wordmark';
    fallback.innerHTML = '<strong>ARBORWISE</strong><small>TREE CARE</small>';
    img.replaceWith(fallback);
  }

  function replaceWithAnnie(img) {
    const fallback = document.createElement('span');
    fallback.className = 'annie-fallback';
    fallback.setAttribute('role', 'img');
    fallback.setAttribute('aria-label', 'Annie, the Arborwise owl');
    fallback.textContent = '🦉';
    img.replaceWith(fallback);
  }

  document.querySelectorAll('.brand img, .footer-brand img').forEach(img => {
    img.src = ASSETS.logo;
    img.onerror = () => replaceWithWordmark(img);
  });

  document.querySelectorAll('img.annie, .annie-mini img, .care-statement img').forEach(img => {
    img.src = ASSETS.annie;
    img.onerror = () => replaceWithAnnie(img);
  });

  const hero = document.querySelector('.hero-photo');
  const heroImg = hero?.querySelector('img');
  if (heroImg) {
    heroImg.src = ASSETS.climber;
    heroImg.onerror = () => {
      heroImg.remove();
      hero.classList.add('asset-fallback');
      hero.querySelector('.find-climber')?.remove();
      hero.querySelector('.climber-marker')?.remove();
      hero.querySelector('.climber-note')?.remove();
    };
  }

  const backgroundAssets = [
    ['.foliage-image', ASSETS.pruning],
    ['.canopy-image', ASSETS.hootB],
    ['.trunk-image', ASSETS.luciaA],
    ['.lean-image', ASSETS.luciaB],
    ['.story-climber', ASSETS.climber]
  ];
  backgroundAssets.forEach(([selector, url]) => {
    const element = document.querySelector(selector);
    if (!element) return;
    const probe = new Image();
    probe.onload = () => { element.style.backgroundImage = `url('${url}')`; };
    probe.onerror = () => { element.classList.add('asset-fallback'); };
    probe.src = url;
  });

  const proofImages = document.querySelectorAll('.proof-grid img');
  if (proofImages[0]) {
    proofImages[0].src = ASSETS.hootB;
    proofImages[0].onerror = () => { proofImages[0].src = ASSETS.removal; };
  }
  if (proofImages[1]) {
    proofImages[1].src = ASSETS.hootA;
    proofImages[1].onerror = () => { proofImages[1].src = ASSETS.pruning; };
  }
})();