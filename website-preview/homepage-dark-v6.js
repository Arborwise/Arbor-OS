(() => {
  'use strict';

  const installDarkCanvas = () => {
    document.body.classList.add('arborwise-dark-canvas');

    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute('content', '#072d23');

    document.getElementById('arborwise-dark-v6')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-dark-v6';
    style.textContent = `
      html{background:#061f19!important}
      body.arborwise-dark-canvas{
        background:
          radial-gradient(circle at 15% 4%,rgba(216,242,119,.10),transparent 32rem),
          radial-gradient(circle at 88% 34%,rgba(212,160,63,.09),transparent 38rem),
          linear-gradient(180deg,#061f19 0%,#082f25 48%,#061f19 100%)!important;
        color:#f8f4e8!important;
      }
      body.arborwise-dark-canvas main{background:transparent!important;padding:12px 0 46px!important}

      body.arborwise-dark-canvas .site-header{
        background:rgba(250,247,238,.98)!important;
        border-bottom:2px solid rgba(212,160,63,.58)!important;
        box-shadow:0 12px 34px rgba(0,0,0,.27)!important;
      }
      body.arborwise-dark-canvas .brand-proof{background:transparent!important}

      body.arborwise-dark-canvas .hero{
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        padding-top:18px!important;
      }
      body.arborwise-dark-canvas .hero-copy{
        background:linear-gradient(145deg,#fffef9 0%,#f8f1df 100%)!important;
        border:1px solid rgba(212,160,63,.72)!important;
        box-shadow:0 22px 54px rgba(0,0,0,.34)!important;
      }
      body.arborwise-dark-canvas .hero-media{
        border:1px solid rgba(216,242,119,.30)!important;
        box-shadow:0 22px 54px rgba(0,0,0,.34)!important;
      }

      body.arborwise-dark-canvas .trust-band{margin-bottom:28px!important}
      body.arborwise-dark-canvas .trust-band div{
        background:linear-gradient(145deg,#fffef9,#f5efdf)!important;
        border:1px solid rgba(212,160,63,.48)!important;
        box-shadow:0 15px 30px rgba(0,0,0,.24)!important;
      }

      body.arborwise-dark-canvas .intro-section,
      body.arborwise-dark-canvas .concern-section,
      body.arborwise-dark-canvas .services-section,
      body.arborwise-dark-canvas .way-section,
      body.arborwise-dark-canvas .faq-section{
        width:calc(100% - 48px)!important;
        max-width:1380px!important;
        margin:26px auto!important;
        padding:clamp(48px,6vw,78px) clamp(24px,4vw,58px)!important;
        background:linear-gradient(145deg,#fffef9 0%,#f7f0df 100%)!important;
        color:#132b22!important;
        border:1px solid rgba(212,160,63,.48)!important;
        border-radius:34px!important;
        box-shadow:0 22px 52px rgba(0,0,0,.27)!important;
      }
      body.arborwise-dark-canvas .intro-section h2,
      body.arborwise-dark-canvas .concern-section h2,
      body.arborwise-dark-canvas .services-section h2,
      body.arborwise-dark-canvas .way-section h2,
      body.arborwise-dark-canvas .faq-section h2,
      body.arborwise-dark-canvas .intro-section h3,
      body.arborwise-dark-canvas .concern-section h3,
      body.arborwise-dark-canvas .services-section h3,
      body.arborwise-dark-canvas .way-section h3{
        color:#06281f!important;
      }
      body.arborwise-dark-canvas .intro-section p,
      body.arborwise-dark-canvas .concern-section .section-head>p:last-child,
      body.arborwise-dark-canvas .services-section .split-head>p,
      body.arborwise-dark-canvas .way-intro>p:last-child,
      body.arborwise-dark-canvas .faq-list p{
        color:#4d6359!important;
      }
      body.arborwise-dark-canvas .section-label,
      body.arborwise-dark-canvas .kicker:not(.light){color:#3e8f4b!important}

      body.arborwise-dark-canvas .concern-card,
      body.arborwise-dark-canvas .service-card,
      body.arborwise-dark-canvas .process li,
      body.arborwise-dark-canvas .faq-list details{
        background:#fffef9!important;
        border-color:#c7d2bd!important;
        box-shadow:0 12px 28px rgba(6,40,31,.11)!important;
      }
      body.arborwise-dark-canvas .concern-card:hover,
      body.arborwise-dark-canvas .service-card:hover{
        box-shadow:0 20px 38px rgba(6,40,31,.19)!important;
      }

      body.arborwise-dark-canvas .annie-callout{
        background:linear-gradient(125deg,#fff0c5,#fffef9 56%,#e5f1df)!important;
        border:1px solid rgba(212,160,63,.72)!important;
        color:#132b22!important;
        box-shadow:0 22px 52px rgba(0,0,0,.28)!important;
      }
      body.arborwise-dark-canvas .annie-callout h2{color:#06281f!important}

      body.arborwise-dark-canvas .work-section{
        margin:30px 0!important;
        background:
          radial-gradient(circle at 80% 10%,rgba(216,242,119,.10),transparent 30rem),
          linear-gradient(145deg,#041d17,#0a4433)!important;
        border-top:1px solid rgba(212,160,63,.62)!important;
        border-bottom:1px solid rgba(212,160,63,.62)!important;
        box-shadow:0 22px 52px rgba(0,0,0,.24)!important;
      }
      body.arborwise-dark-canvas .work-slide{
        border-color:rgba(212,160,63,.48)!important;
        box-shadow:0 18px 38px rgba(0,0,0,.35)!important;
      }

      body.arborwise-dark-canvas .recognition-section{
        background:linear-gradient(145deg,#fffef9,#f7f0df)!important;
        color:#132b22!important;
        border-color:rgba(212,160,63,.56)!important;
        box-shadow:0 22px 52px rgba(0,0,0,.27)!important;
      }
      body.arborwise-dark-canvas .recognition-section h2{color:#06281f!important}
      body.arborwise-dark-canvas .recognition-grid article{box-shadow:0 10px 24px rgba(6,40,31,.09)!important}

      body.arborwise-dark-canvas .estimate-section{
        width:calc(100% - 48px)!important;
        max-width:1380px!important;
        margin:28px auto!important;
        padding:0!important;
      }
      body.arborwise-dark-canvas .estimate-card{
        border:1px solid rgba(216,242,119,.34)!important;
        box-shadow:0 24px 58px rgba(0,0,0,.38)!important;
      }

      body.arborwise-dark-canvas .site-footer{
        background:linear-gradient(180deg,#041d17,#031711)!important;
        border-top:2px solid rgba(212,160,63,.62)!important;
      }
      body.arborwise-dark-canvas .mobile-bar{
        background:#041f18!important;
        border-color:rgba(212,160,63,.48)!important;
        box-shadow:0 18px 38px rgba(0,0,0,.45)!important;
      }

      @media(max-width:760px){
        body.arborwise-dark-canvas main{padding-top:6px!important}
        body.arborwise-dark-canvas .hero{margin:10px 12px 20px!important;padding:0!important}
        body.arborwise-dark-canvas .trust-band{margin-bottom:18px!important}
        body.arborwise-dark-canvas .intro-section,
        body.arborwise-dark-canvas .concern-section,
        body.arborwise-dark-canvas .services-section,
        body.arborwise-dark-canvas .way-section,
        body.arborwise-dark-canvas .faq-section{
          width:calc(100% - 24px)!important;
          margin:18px 12px!important;
          padding:42px 18px!important;
          border-radius:28px!important;
        }
        body.arborwise-dark-canvas .annie-callout{
          margin:18px 12px 28px!important;
          box-shadow:0 18px 38px rgba(0,0,0,.28)!important;
        }
        body.arborwise-dark-canvas .work-section{margin:22px 0!important}
        body.arborwise-dark-canvas .recognition-section{
          width:calc(100% - 24px)!important;
          margin:18px 12px 30px!important;
        }
        body.arborwise-dark-canvas .estimate-section{
          width:calc(100% - 24px)!important;
          margin:22px 12px!important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => installDarkCanvas();
  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 700);
  setTimeout(apply, 2200);
  setTimeout(apply, 4200);
  setTimeout(apply, 6200);
})();
