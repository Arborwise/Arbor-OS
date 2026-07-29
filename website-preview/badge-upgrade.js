(() => {
  const grid = document.querySelector('.recognition-grid');
  if (!grid) return;

  const cards = [
    {
      type: 'link',
      href: 'https://farmersvillechamber.com/',
      visual: '<img class="recognition-logo farmersville-logo" src="assets/farmersville-chamber.svg" alt="Farmersville Chamber of Commerce">',
      title: 'Farmersville Chamber of Commerce',
      detail: 'Member'
    },
    {
      type: 'link',
      href: 'https://www.vanalstynechamber.org/',
      visual: '<img class="recognition-logo van-alstyne-logo" src="https://lirp.cdn-website.com/d362b084/dms3rep/multi/opt/VA%2BChamber%2BLARGE%2BLOGO_transparent-180w.png" alt="Van Alstyne Chamber of Commerce logo" loading="lazy">',
      title: 'Van Alstyne Chamber of Commerce',
      detail: 'Member'
    },
    {
      type: 'article',
      visual: '<img class="nextdoor-badge" src="assets/nextdoor-favorite-2024.svg" alt="Nextdoor Neighborhood Favorite 2024 badge">',
      title: 'Nextdoor Neighborhood Favorite',
      detail: '2024'
    },
    {
      type: 'article',
      visual: '<img class="nextdoor-badge" src="assets/nextdoor-favorite-2025.svg" alt="Nextdoor Neighborhood Favorite 2025 badge">',
      title: 'Nextdoor Neighborhood Favorite',
      detail: '2025'
    }
  ];

  grid.innerHTML = cards.map(card => {
    const content = `<span class="recognition-visual">${card.visual}</span><span class="recognition-copy"><strong>${card.title}</strong><span>${card.detail}</span></span>`;
    return card.type === 'link'
      ? `<a class="recognition-card graphic-card" href="${card.href}" target="_blank" rel="noopener">${content}</a>`
      : `<article class="recognition-card graphic-card">${content}</article>`;
  }).join('');

  document.getElementById('local-recognition-styles')?.remove();

  const style = document.createElement('style');
  style.id = 'local-recognition-graphic-styles';
  style.textContent = `
    .local-trust{max-width:1376px;margin:0 auto;padding:42px 32px 18px;display:grid;grid-template-columns:.7fr 1.3fr;gap:38px;align-items:center}
    .local-trust-intro h2{font-size:clamp(1.85rem,3.2vw,3rem);margin-bottom:0}
    .recognition-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}
    .recognition-card.graphic-card{min-height:168px;background:var(--paper);border:1px solid var(--line);border-radius:24px;padding:16px;display:grid;grid-template-columns:118px 1fr;gap:16px;align-items:center;box-shadow:0 10px 30px rgba(18,63,47,.07);text-decoration:none;color:inherit;overflow:hidden;transition:.2s ease}
    .recognition-card.graphic-card:hover,.recognition-card.graphic-card:focus-visible{transform:translateY(-3px);box-shadow:var(--shadow);border-color:#aac39d}
    .recognition-visual{width:118px;height:118px;display:grid;place-items:center;border-radius:19px;background:#fff;overflow:hidden}
    .recognition-logo{width:100%;height:100%;object-fit:contain}
    .farmersville-logo{padding:5px}
    .van-alstyne-logo{padding:8px}
    .nextdoor-badge{width:112px;height:112px;object-fit:contain}
    .recognition-copy{display:block}
    .recognition-copy strong{display:block;line-height:1.23;color:var(--forest);font-size:1rem}
    .recognition-copy>span{display:block;margin-top:7px;color:var(--muted);font-size:.78rem;font-weight:900;text-transform:uppercase;letter-spacing:.12em}
    @media (max-width:900px){.local-trust{grid-template-columns:1fr;gap:22px}}
    @media (max-width:720px){
      .local-trust{padding:46px 14px 12px}
      .local-trust-intro h2{font-size:2.15rem}
      .recognition-grid{grid-template-columns:1fr 1fr;gap:10px}
      .recognition-card.graphic-card{min-height:214px;padding:13px;grid-template-columns:1fr;grid-template-rows:126px auto;gap:10px;text-align:center}
      .recognition-visual{width:126px;height:126px;justify-self:center}
      .recognition-copy strong{font-size:.9rem}
      .recognition-copy>span{font-size:.7rem}
    }
    @media (max-width:420px){
      .recognition-grid{grid-template-columns:1fr}
      .recognition-card.graphic-card{min-height:150px;grid-template-columns:112px 1fr;grid-template-rows:1fr;text-align:left}
      .recognition-visual{width:112px;height:112px}
    }`;
  document.head.appendChild(style);

  const conversionUpgrade = document.createElement('script');
  conversionUpgrade.src = 'conversion-upgrade.js';
  conversionUpgrade.onload = () => {
    const expertiseUpgrade = document.createElement('script');
    expertiseUpgrade.src = 'expertise-upgrade.js';
    document.body.appendChild(expertiseUpgrade);
  };
  document.body.appendChild(conversionUpgrade);
})();
