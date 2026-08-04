(() => {
  'use strict';

  const logos = [...document.querySelectorAll('[data-brand-logo]')];
  logos.forEach((image, index) => {
    image.removeAttribute('data-brand-logo');
    image.src = 'assets/logo.webp';
    image.decoding = 'async';
    image.loading = index === 0 ? 'eager' : 'lazy';
    if (index === 0) image.fetchPriority = 'high';
  });

  const brand = document.querySelector('.site-header .brand');
  if (brand && !brand.querySelector('.brand-domain')) {
    const domain = document.createElement('span');
    domain.className = 'brand-domain';
    domain.textContent = 'arborwisetreecare.com';
    brand.appendChild(domain);
  }

  const upsertMeta = (name, content) => {
    let meta = document.head.querySelector(`meta[name="${name}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = name;
      document.head.appendChild(meta);
    }
    meta.content = content;
  };

  document.title = 'Tree Service North Texas | Arborwise Tree Care';
  upsertMeta(
    'description',
    'Arborwise Tree Care provides professional tree trimming, tree pruning, tree removal, tree-risk assessment, and property tree care in Collin County, Grayson County, and North Texas. Free estimates: 972-430-8330.'
  );
  upsertMeta(
    'keywords',
    'tree service North Texas, tree trimming, tree pruning, tree removal, tree limb removal, certified arborist, emergency tree service, Collin County tree service, Grayson County tree service'
  );

  if (!document.getElementById('arborwise-service-schema')) {
    const schema = document.createElement('script');
    schema.id = 'arborwise-service-schema';
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: 'Professional Tree Service in North Texas',
      provider: {
        '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
        name: 'Arborwise Tree Care',
        url: 'https://arborwisetreecare.com/',
        telephone: '+1-972-430-8330',
        email: 'greg@arborwisetreecare.com'
      },
      areaServed: [
        'Collin County, Texas',
        'Grayson County, Texas',
        'Van Alstyne, Texas',
        'Anna, Texas',
        'Melissa, Texas',
        'Celina, Texas',
        'Farmersville, Texas',
        'Princeton, Texas',
        'Howe, Texas'
      ],
      serviceType: [
        'Tree trimming',
        'Tree pruning',
        'Tree removal',
        'Tree limb removal',
        'Tree risk assessment',
        'Emergency tree service',
        'Property and HOA tree care'
      ]
    });
    document.head.appendChild(schema);
  }

  const style = document.createElement('style');
  style.id = 'arborwise-premium-website-repair';
  style.textContent = `
    html{
      max-width:100%;
      overflow-x:hidden;
      background:#010604;
    }
    body{
      max-width:100%;
      overflow-x:hidden;
      margin:0;
      background-color:#fbf7ea;
    }
    main,.site-header,.site-footer{max-width:100%}
    .site-header{
      width:100%;
      margin:calc(-1 * env(safe-area-inset-top,0px)) 0 0;
      padding-top:env(safe-area-inset-top,0px);
      border-radius:0!important;
      background-color:#010604;
      background-clip:border-box;
      overflow:hidden;
    }
    .site-header::before{
      content:"";
      position:absolute;
      z-index:-1;
      top:-3px;
      right:-3px;
      bottom:0;
      left:-3px;
      background:linear-gradient(180deg,#010604 0%,#03130e 58%,#052118 100%);
    }
    .brand-domain{
      display:block;
      margin-top:-6px;
      color:#f0cd75;
      font-family:Georgia,"Times New Roman",serif;
      font-size:clamp(.78rem,1.4vw,1rem);
      font-weight:900;
      letter-spacing:.035em;
      text-decoration:underline;
      text-decoration-thickness:1px;
      text-underline-offset:4px;
      text-shadow:0 2px 10px rgba(0,0,0,.9);
    }
    .hero-promise{
      border:2px solid #f0cd75;
      box-shadow:
        inset 0 0 0 3px rgba(255,255,255,.06),
        inset 0 -22px 42px rgba(0,0,0,.28),
        0 0 0 2px rgba(91,56,3,.55),
        0 18px 38px rgba(2,11,8,.3);
    }
    .hero-promise strong{
      color:#fff3c5;
      background:linear-gradient(180deg,#fffbe8 0%,#f8d67a 48%,#fff0b3 72%,#d89b2c 100%);
      -webkit-background-clip:text;
      background-clip:text;
      -webkit-text-fill-color:transparent;
      -webkit-text-stroke:1.45px #4c2d00;
      paint-order:stroke fill;
      letter-spacing:-.025em;
      text-shadow:
        -1px -1px 0 #f6df9b,
        1px -1px 0 #f6df9b,
        -1px 1px 0 #5b3600,
        1px 1px 0 #5b3600,
        0 3px 0 #5b3600,
        0 6px 0 rgba(28,14,0,.78),
        0 12px 24px rgba(0,0,0,.78);
      filter:drop-shadow(0 0 9px rgba(240,205,117,.3));
    }

    /* Annie's message is a real speech bubble with one small, clean hook. */
    .hero-annie{
      overflow:visible;
      grid-template-columns:105px minmax(0,1fr);
      background:transparent;
      border:0;
      box-shadow:none;
      padding:8px 0;
    }
    .hero-annie img{position:relative;z-index:2}
    .hero-annie p{
      position:relative;
      z-index:1;
      margin:0;
      padding:15px 17px;
      background:#fffaf0;
      border:2px solid #0b3f2f;
      border-radius:19px;
      box-shadow:0 8px 20px rgba(6,40,31,.11);
    }
    .hero-annie p::before{
      content:"";
      position:absolute;
      left:-14px;
      top:44%;
      width:17px;
      height:12px;
      border-left:2px solid #0b3f2f;
      border-bottom:2px solid #0b3f2f;
      border-radius:0 0 0 13px;
      background:transparent;
      transform:translateY(-50%) rotate(13deg);
      transform-origin:right center;
    }
    .hero-annie p::after{
      content:"";
      position:absolute;
      left:-4px;
      top:calc(44% - 5px);
      width:7px;
      height:14px;
      background:#fffaf0;
    }

    .estimate-section,.estimate-section>*,.estimate-actions,.estimate-actions>*{min-width:0}
    .email-link,.footer-domain{overflow-wrap:anywhere;word-break:break-word}
    .site-footer{width:100%;overflow:hidden}

    @media(max-width:760px){
      .brand-row{
        width:100%;
        padding:10px 14px 9px;
        grid-template-columns:minmax(0,1fr) minmax(0,1fr);
        grid-template-areas:
          "brand brand"
          "local established";
        gap:5px 20px;
      }
      .brand{
        grid-area:brand;
        width:100%;
        max-width:460px;
        justify-self:center;
        min-width:0;
      }
      .brand img{
        width:100%;
        height:144px;
        max-height:none;
        object-fit:contain;
        object-position:center;
        filter:drop-shadow(0 12px 20px rgba(0,0,0,.5));
      }
      .brand-domain{
        margin-top:-13px;
        margin-bottom:5px;
        font-size:.89rem;
        letter-spacing:.035em;
      }
      .brand-proof-left{grid-area:local;justify-self:start}
      .brand-proof-right{grid-area:established;justify-self:end}
      .brand-proof{
        width:100%;
        max-width:150px;
        flex-direction:row;
        justify-content:center;
        gap:7px;
        padding:4px 2px 9px;
        text-align:left;
      }
      .brand-proof-right{text-align:right}
      .brand-proof::after{left:0;right:0}
      .brand-proof .proof-icon{font-size:1.15rem}
      .brand-proof small{font-size:.55rem;letter-spacing:.055em}
      .brand-proof strong{font-size:.76rem;line-height:1.05;white-space:normal}

      .hero,.hero-copy,.hero-media,.hero-actions,.hero-promise,.hero-annie{min-width:0;max-width:100%}
      .hero-lead{overflow-wrap:anywhere}
      .hero-promise{
        width:100%;
        padding:30px 27px 28px;
        border-radius:21px;
      }
      .hero-promise::before{left:11px}
      .hero-promise::after{right:11px}
      .hero-promise strong{
        font-size:clamp(2.25rem,10.7vw,3rem);
        line-height:.96;
        -webkit-text-stroke:1.25px #4c2d00;
      }
      .hero-promise span{font-size:.92rem}
      .hero-annie{grid-template-columns:88px minmax(0,1fr);gap:10px}
      .hero-annie img{width:88px;height:88px}
      .hero-annie p{padding:13px 14px;font-size:.87rem}
      .hero-annie p::before{left:-12px;width:15px;height:11px}

      .estimate-section{
        width:calc(100% - 24px);
        max-width:none;
        margin:0 12px 50px;
        padding:31px 18px;
        overflow:hidden;
        border-radius:24px;
      }
      .estimate-section>div{width:100%;max-width:100%}
      .estimate-section .section-label{
        width:100%;
        max-width:100%;
        margin-left:0;
        margin-right:0;
        padding-left:0;
        padding-right:0;
        font-size:clamp(.98rem,4.8vw,1.2rem);
        line-height:1.25;
        letter-spacing:.055em;
        white-space:normal;
        overflow-wrap:anywhere;
      }
      .estimate-section h2{
        width:100%;
        max-width:18ch;
        margin-left:auto;
        margin-right:auto;
        font-size:clamp(1.9rem,8vw,2.45rem);
      }
      .estimate-section p:last-child{
        width:100%;
        max-width:34ch;
        margin-left:auto;
        margin-right:auto;
        font-size:1rem;
      }
      .estimate-actions{width:100%;max-width:100%;min-width:0}
      .estimate-actions .button{width:100%;max-width:100%;min-width:0;padding-left:12px;padding-right:12px}
      .email-link{display:block;width:100%;max-width:100%;font-size:.93rem;line-height:1.35;padding:4px 2px}

      .site-footer{
        width:100%;
        max-width:100%;
        margin:0;
        padding:35px 16px 98px;
      }
      .site-footer>img{
        width:min(100%,430px);
        height:175px;
        margin:0 auto 2px;
        object-fit:contain;
      }
      .footer-domain{display:block;width:100%;max-width:100%;font-size:clamp(1.1rem,6vw,1.42rem);line-height:1.2}
      .footer-contact{width:100%;max-width:100%;gap:10px}
    }

    @media(max-width:390px){
      .brand-row{padding-left:10px;padding-right:10px;gap:4px 12px}
      .brand img{height:132px}
      .brand-domain{font-size:.82rem}
      .brand-proof{max-width:136px}
      .brand-proof small{font-size:.5rem}
      .brand-proof strong{font-size:.69rem}
      .hero-promise{padding-left:23px;padding-right:23px}
      .hero-promise strong{font-size:clamp(2.12rem,10.8vw,2.7rem)}
      .hero-annie{grid-template-columns:78px minmax(0,1fr);gap:9px}
      .hero-annie img{width:78px;height:78px}
      .hero-annie p{font-size:.82rem;line-height:1.38}
    }
  `;
  document.head.appendChild(style);

  const baseScript = document.createElement('script');
  baseScript.src = 'professional-base.js?v=20260804-annie-seo';
  baseScript.async = false;
  document.body.appendChild(baseScript);
})();
