(() => {
  const styleId = 'mobile-customer-view-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      #concerns,#services,#stories,#way,#about,#estimate{scroll-margin-top:96px}
      @media (max-width:720px){
        body{padding-bottom:calc(82px + env(safe-area-inset-bottom,0px))}
        .header-inner{justify-content:center;min-height:88px;padding:9px 14px 7px}
        .brand{width:min(278px,86vw);margin:0 auto}
        .brand img{width:100%;height:72px;object-fit:contain;object-position:center}
        .brand-wordmark{align-items:center;text-align:center}
        .hero-copy{text-align:center;align-items:center;padding:32px 22px}
        .hero-copy .eyebrow{margin-bottom:10px}
        .hero-copy h1{max-width:12ch;margin-left:auto;margin-right:auto}
        .hero-lead{max-width:34ch;margin-left:auto;margin-right:auto}
        .hero-buttons{width:100%;justify-content:center}
        .trust-row{justify-content:center}
        .hero-photo{min-height:420px}
        .concern-card{width:100%}
        .concern-copy{min-height:0}
        .card-link{padding-top:16px}
        .annie-inner{overflow:visible}
        .annie{max-width:88%;height:255px;margin:18px auto 0}
        .annie-quote{padding:10px 22px 34px}
        .mobile-actions{bottom:max(8px,env(safe-area-inset-bottom,8px))}
      }
      @media (max-width:420px){
        .header-inner{min-height:82px}
        .brand{width:min(250px,84vw)}
        .brand img{height:66px}
        .hero-copy{padding:29px 19px}
        h1{font-size:2.34rem}
        .hero-photo{min-height:390px}
        .trust-row span{padding:6px 8px}
        .annie{height:235px}
        .annie-quote blockquote{font-size:1.52rem}
      }
    `;
    document.head.appendChild(style);
  }

  const heroEyebrow = document.querySelector('.hero-copy .eyebrow');
  if (heroEyebrow) heroEyebrow.textContent = 'North Texas Tree Service';

  const concernDialog = document.getElementById('concernDialog');
  let lastConcernCard = null;
  document.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => { lastConcernCard = card; });
  });
  concernDialog?.addEventListener('close', () => {
    lastConcernCard?.focus({ preventScroll: true });
  });
})();
