(() => {
  const styleId = 'mobile-customer-view-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #concerns,#services,#stories,#way,#about,#estimate{scroll-margin-top:96px}
      @media (max-width:720px){
        body{padding-bottom:calc(82px + env(safe-area-inset-bottom,0px))}
        .header-inner{justify-content:center;min-height:102px;padding:7px 14px}
        .brand{width:min(278px,84vw);margin:0 auto}
        .brand img{width:100%;height:86px;object-fit:contain;object-position:center}
        .hero-copy{text-align:center;align-items:center;padding:35px 22px}
        .hero-copy .eyebrow{margin-bottom:18px;white-space:normal;text-align:center}
        .hero-copy h1{max-width:12ch;margin-left:auto;margin-right:auto}
        .hero-lead{max-width:36ch;margin-left:auto;margin-right:auto}
        .hero-buttons{width:100%;justify-content:center}
        .trust-row{justify-content:center}
        .hero-photo{min-height:420px}
        .concern-card{width:100%}
        .concern-copy{min-height:0}
        .card-link{padding-top:16px}
        .mobile-actions{bottom:max(8px,env(safe-area-inset-bottom,8px))}
      }
      @media (max-width:420px){
        .header-inner{min-height:96px}
        .brand{width:min(248px,82vw)}
        .brand img{height:80px}
        .hero-copy{padding:31px 19px}
        h1{font-size:2.25rem}
        .hero-photo{min-height:390px}
        .trust-row span{padding:6px 8px}
      }
    `;
    document.head.appendChild(style);
  }

  const heroEyebrow = document.querySelector('.hero-copy .eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = 'Your Premier North Texas Tree Service Provider';

  const concernDialog = document.getElementById('concernDialog');
  let lastConcernCard = null;
  document.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => { lastConcernCard = card; });
  });
  concernDialog?.addEventListener('close', () => {
    lastConcernCard?.focus({ preventScroll: true });
  });
})();
