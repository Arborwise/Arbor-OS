(() => {
  const topStyles = document.createElement('style');
  topStyles.textContent = `
    .site-header{padding:12px 12px 0!important}
    .aw-header{
      max-width:1360px;
      margin:0 auto;
      overflow:hidden;
      color:#fff;
      background:#030504;
      border:1px solid rgba(215,165,66,.42);
      border-radius:30px;
      box-shadow:0 22px 54px rgba(0,0,0,.28);
    }
    .aw-domain{
      display:block;
      padding:10px 16px 2px;
      color:#d9f378;
      text-align:center;
      text-decoration:none;
      font-size:.76rem;
      font-weight:950;
      letter-spacing:.15em;
      text-transform:uppercase;
    }
    .aw-header-main{
      display:grid;
      grid-template-columns:1fr minmax(270px,440px) 1fr;
      gap:22px;
      align-items:center;
      padding:8px 34px 15px;
    }
    .aw-brand{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      color:#fff;
      text-decoration:none;
      line-height:.9;
    }
    .aw-brand-name{
      font-family:Georgia,'Times New Roman',serif;
      font-size:clamp(2.65rem,5vw,4.75rem);
      font-weight:900;
      letter-spacing:-.06em;
      text-shadow:0 8px 26px rgba(0,0,0,.6);
      white-space:nowrap;
    }
    .aw-brand-name .wise{color:#d9f378}
    .aw-brand-name sup{font-size:.2em;vertical-align:super;margin-left:.08em;color:#d7a542}
    .aw-brand-sub{
      margin-top:10px;
      color:#d7a542;
      font-size:.82rem;
      font-weight:950;
      letter-spacing:.28em;
      text-transform:uppercase;
    }
    .aw-proof{
      display:flex;
      flex-direction:column;
      line-height:1.05;
      text-transform:uppercase;
    }
    .aw-proof span{color:#9fb0a7;font-size:.68rem;font-weight:850;letter-spacing:.12em}
    .aw-proof strong{margin-top:5px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:1.35rem;letter-spacing:.02em}
    .aw-proof-left{text-align:right}
    .aw-proof-right{text-align:left}
    .aw-nav{
      display:flex;
      justify-content:center;
      gap:28px;
      padding:13px 22px 15px;
      overflow-x:auto;
      border-top:1px solid rgba(255,255,255,.09);
      background:rgba(255,255,255,.025);
      scrollbar-width:none;
    }
    .aw-nav::-webkit-scrollbar{display:none}
    .aw-nav a{color:#f5f3ea;text-decoration:none;font-size:.84rem;font-weight:900;white-space:nowrap}
    .aw-nav a:last-child{color:#d9f378}

    .hero.aw-hero{
      position:relative!important;
      display:block!important;
      max-width:1336px!important;
      min-height:700px!important;
      margin:14px auto 0!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:34px!important;
      box-shadow:0 26px 70px rgba(0,0,0,.25)!important;
      background:#061f18!important;
    }
    .aw-hero-photo{
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      object-fit:cover;
      object-position:58% center;
    }
    .aw-hero-shade{
      position:absolute;
      inset:0;
      background:
        linear-gradient(90deg,rgba(2,8,6,.92) 0%,rgba(2,8,6,.75) 42%,rgba(2,8,6,.18) 76%,rgba(2,8,6,.06) 100%),
        linear-gradient(0deg,rgba(2,8,6,.72) 0%,transparent 48%);
    }
    .aw-hero-content{
      position:relative;
      z-index:1;
      min-height:700px;
      max-width:760px;
      padding:clamp(44px,6vw,84px);
      display:flex;
      flex-direction:column;
      justify-content:center;
      align-items:flex-start;
      color:#fff;
    }
    .aw-kicker{
      margin-bottom:17px;
      color:#d7a542;
      font-size:.82rem;
      font-weight:950;
      letter-spacing:.15em;
      text-transform:uppercase;
    }
    .aw-hero h1{
      margin:0 0 18px;
      color:#fff;
      font-family:Georgia,'Times New Roman',serif;
      font-size:clamp(3.35rem,7vw,6.4rem);
      line-height:.9;
      letter-spacing:-.055em;
      text-shadow:0 8px 30px rgba(0,0,0,.55);
    }
    .aw-hero h1 span{display:block;color:#d9f378}
    .aw-hero h1 sup{font-size:.22em;vertical-align:super;margin-left:.08em;color:#d7a542}
    .aw-hero-lead{
      max-width:600px;
      margin:0;
      color:#f4f5f1;
      font-size:clamp(1.18rem,2vw,1.5rem);
      font-weight:800;
      line-height:1.42;
      text-shadow:0 3px 18px rgba(0,0,0,.65);
    }
    .aw-honesty{
      max-width:610px;
      margin:18px 0 0;
      padding-left:16px;
      color:#e5ebe7;
      border-left:3px solid #d7a542;
      font-size:1rem;
      line-height:1.48;
    }
    .aw-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:27px}
    .aw-primary,.aw-secondary{
      display:inline-flex;
      min-height:54px;
      align-items:center;
      justify-content:center;
      padding:13px 22px;
      border-radius:999px;
      text-decoration:none;
      text-align:center;
      font-weight:950;
    }
    .aw-primary{background:#d9f378;color:#061f18;box-shadow:0 12px 26px rgba(0,0,0,.3)}
    .aw-secondary{color:#fff;border:1px solid rgba(255,255,255,.72);background:rgba(0,0,0,.22)}
    .aw-video-link{margin-top:18px;color:#fff;text-underline-offset:5px;font-weight:850}
    .aw-video-link span{color:#d9f378}
    .aw-proof-row{display:flex;gap:9px;flex-wrap:wrap;margin-top:24px}
    .aw-proof-pill{
      padding:8px 11px;
      color:#f4f5f1;
      background:rgba(3,5,4,.62);
      border:1px solid rgba(215,165,66,.45);
      border-radius:999px;
      font-size:.76rem;
      font-weight:850;
      backdrop-filter:blur(6px);
    }

    @media (max-width:700px){
      .site-header{padding:8px 8px 0!important}
      .aw-header{border-radius:25px}
      .aw-domain{padding-top:9px;font-size:.66rem;letter-spacing:.12em}
      .aw-header-main{grid-template-columns:.86fr 1.6fr .86fr;gap:7px;padding:7px 12px 11px}
      .aw-brand-name{font-size:2.1rem;letter-spacing:-.065em}
      .aw-brand-sub{margin-top:7px;font-size:.55rem;letter-spacing:.18em}
      .aw-proof span{font-size:.48rem;letter-spacing:.08em}
      .aw-proof strong{font-size:.78rem;margin-top:4px}
      .aw-nav{justify-content:flex-start;gap:22px;padding:11px 18px 13px}
      .aw-nav a{font-size:.78rem}

      .hero.aw-hero{min-height:710px!important;margin:10px 8px 0!important;border-radius:28px!important}
      .aw-hero-photo{object-position:61% center}
      .aw-hero-shade{
        background:
          linear-gradient(0deg,rgba(2,8,6,.94) 0%,rgba(2,8,6,.72) 48%,rgba(2,8,6,.12) 78%,rgba(2,8,6,.03) 100%),
          linear-gradient(90deg,rgba(2,8,6,.42),transparent 70%);
      }
      .aw-hero-content{
        min-height:710px;
        max-width:none;
        padding:34px 24px 30px;
        justify-content:flex-end;
      }
      .aw-kicker{margin-bottom:12px;font-size:.69rem;letter-spacing:.12em}
      .aw-hero h1{font-size:3.55rem;line-height:.88;margin-bottom:14px}
      .aw-hero-lead{font-size:1.08rem;line-height:1.36}
      .aw-honesty{margin-top:13px;font-size:.91rem;line-height:1.4}
      .aw-actions{width:100%;margin-top:19px}
      .aw-primary,.aw-secondary{flex:1 1 145px;min-height:50px;padding:11px 14px;font-size:.9rem}
      .aw-video-link{margin-top:14px;font-size:.88rem}
      .aw-proof-row{margin-top:17px;gap:7px}
      .aw-proof-pill{font-size:.67rem;padding:7px 9px}
    }
  `;
  document.head.appendChild(topStyles);

  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <div class="aw-header">
        <a class="aw-domain" href="https://arborwisetreecare.com/">arborwisetreecare.com</a>
        <div class="aw-header-main">
          <div class="aw-proof aw-proof-left"><span>Locally owned</span><strong>North Texas</strong></div>
          <a class="aw-brand" href="#top" aria-label="Arborwise Tree Care home">
            <span class="aw-brand-name">Arbor<span class="wise">wise</span><sup>™</sup></span>
            <span class="aw-brand-sub">Tree Care</span>
          </a>
          <div class="aw-proof aw-proof-right"><span>Established</span><strong>2019</strong></div>
        </div>
        <nav class="aw-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#concerns">Tree Concerns</a>
          <a href="#planting">Tree Planting</a>
          <a href="#areas">Service Areas</a>
          <a href="#estimate">Free Estimate</a>
        </nav>
      </div>
    `;
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('aw-hero');
    hero.innerHTML = `
      <img class="aw-hero-photo" src="assets/hero-climber.webp" alt="An Arborwise climber working high in a mature North Texas tree">
      <div class="aw-hero-shade" aria-hidden="true"></div>
      <div class="aw-hero-content">
        <p class="aw-kicker">Professional North Texas Tree Care</p>
        <h1>Welcome to <span>Arborwise<sup>™</sup></span></h1>
        <p class="aw-hero-lead">Honest answers. Skilled work. Every recommendation has a reason.</p>
        <p class="aw-honesty">Sometimes there is a real concern. Sometimes it can wait. And sometimes it is simply a tree being a tree.</p>
        <div class="aw-actions">
          <a class="aw-primary" href="#estimate">Get a Free Estimate</a>
          <a class="aw-secondary" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20have%20photos%20of%20a%20tree%20concern.">Text Photos</a>
        </div>
        <a class="aw-video-link" href="https://www.youtube.com/watch?v=Mr4wQ1d3RAA" target="_blank" rel="noopener noreferrer">Watch the full Arborwise job <span>↗</span></a>
        <div class="aw-proof-row" aria-label="Arborwise trust markers">
          <span class="aw-proof-pill">ISA Certified Arborist on Staff</span>
          <span class="aw-proof-pill">Nextdoor Fave 2024 &amp; 2025</span>
        </div>
      </div>
    `;
  }

  const assetJobs = [
    {
      selector: '[data-brand-logo]',
      encodedPath: 'assets/logo-correct.b64',
      fallbackPath: 'assets/logo.webp',
      mimeType: 'image/webp'
    },
    {
      selector: '[data-annie]',
      encodedPath: 'assets/annie-correct.b64',
      fallbackPath: 'assets/annie.webp',
      mimeType: 'image/webp'
    }
  ];

  const loadEncodedAsset = async ({ selector, encodedPath, fallbackPath, mimeType }) => {
    const images = [...document.querySelectorAll(selector)];
    if (!images.length) return;

    images.forEach(image => {
      image.removeAttribute('src');
      image.style.visibility = 'hidden';
    });

    try {
      const response = await fetch(encodedPath, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Could not load ${encodedPath}`);
      const encoded = (await response.text()).replace(/\s+/g, '');
      const source = `data:${mimeType};base64,${encoded}`;

      images.forEach(image => {
        image.onload = () => {
          image.style.visibility = 'visible';
        };
        image.onerror = () => {
          image.removeAttribute('src');
          image.style.display = 'none';
        };
        image.src = source;
      });
    } catch (error) {
      images.forEach(image => {
        image.onload = () => {
          image.style.visibility = 'visible';
        };
        image.onerror = () => {
          image.removeAttribute('src');
          image.style.display = 'none';
        };
        image.src = fallbackPath;
      });
      console.error(`Using fallback asset for ${selector}.`, error);
    }
  };

  Promise.allSettled(assetJobs.map(loadEncodedAsset));

  const concerns = {
    leaves: {
      title: 'Leaf spots, browning, curling, or early leaf drop',
      text: 'Water stress, root problems, insects, disease, heat, and seasonal change can create similar symptoms. The pattern across the whole canopy matters more than one damaged leaf.'
    },
    canopy: {
      title: 'Dead branches or a thinning canopy',
      text: 'Drought, root damage, disease, storm injury, structural problems, and long-term decline can all appear in the canopy. Arborwise looks at where the thinning begins and how quickly it changed.'
    },
    trunk: {
      title: 'Cracks, cavities, loose bark, or mushrooms',
      text: 'A visible defect does not automatically mean removal. Location, sound wood, species, nearby targets, movement, and the surrounding root zone all affect the recommendation.'
    },
    lean: {
      title: 'A new lean, exposed roots, or moving soil',
      text: 'A new lean or soil movement after wind or rain deserves prompt attention. Photograph the whole tree, the trunk base, and the ground on both sides of the lean.'
    }
  };

  const dialog = document.getElementById('concernDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogText = document.getElementById('dialogText');
  let lastTrigger = null;

  document.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => {
      const concern = concerns[card.dataset.concern];
      if (!concern || !dialog || !dialogTitle || !dialogText) return;
      lastTrigger = card;
      dialogTitle.textContent = concern.title;
      dialogText.textContent = concern.text;
      dialog.showModal();
    });
  });

  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog?.close());

  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  dialog?.addEventListener('close', () => {
    lastTrigger?.focus();
  });

  const tips = [
    'Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.',
    'Roots usually extend well beyond the trunk. What happens to the soil can affect the entire tree.',
    'A proper pruning cut protects the branch collar. Flush cuts and long stubs both create avoidable problems.',
    'A cavity does not automatically mean a tree must come down. Location, sound wood, movement, species, and nearby targets all matter.',
    'Photograph the whole tree before taking close-ups. The canopy pattern often tells more than one damaged spot.',
    'New trees should not be buried like fence posts. The root flare should be visible at the finished grade.',
    'Mulch should protect the root zone, not pile against the trunk. Mulch volcanoes hold moisture where the bark needs air.',
    'A fast-growing tree is not automatically the right tree. Mature size, structure, roots, utilities, and available space matter.'
  ];

  const tip = document.getElementById('annieTip');
  const tipButton = document.getElementById('annieButton');
  let tipIndex = 0;

  tipButton?.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    if (tip) tip.textContent = tips[tipIndex];
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
