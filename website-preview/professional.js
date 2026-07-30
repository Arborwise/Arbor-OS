(() => {
  const icons = {
    phone: '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z"/></svg>',
    message: '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3v-7a4 4 0 0 1-1-2.65V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4z"/><path d="M7 9h10M7 13h7"/></svg>',
    estimate: '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5h6M9 3h6a2 2 0 0 1 2 2v1h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2V5a2 2 0 0 1 2-2z"/><path d="m8 14 2.5 2.5L16 11"/></svg>',
    check: '<svg class="ui-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></svg>'
  };

  const installHeader = () => {
    const wrap = document.querySelector('.brand-wrap');
    if (!wrap) return;

    wrap.classList.add('brand-layout');
    wrap.innerHTML = `
      <div class="header-side header-side-left" aria-label="Contact Arborwise">
        <a class="header-contact-card" href="tel:+19724308330" aria-label="Call Arborwise at 972-430-8330">
          ${icons.phone}
          <span><small>Call Arborwise</small><strong>972-430-8330</strong></span>
        </a>
        <a class="header-contact-card" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20have%20photos%20of%20a%20tree%20concern." aria-label="Text photos to Arborwise">
          ${icons.message}
          <span><small>Send a Message</small><strong>Text Photos</strong></span>
        </a>
      </div>

      <a class="brand" href="#top" aria-label="Arborwise home">
        <img src="assets/logo.webp" data-brand-logo alt="Arborwise. Nurture Your Nature. A tree held in two hands above a wooden Arborwise plaque with bushes at both sides.">
      </a>

      <div class="header-side header-side-right">
        <div class="header-credential">${icons.check}<strong>ISA Certified Arborist on Staff</strong></div>
        <div class="header-service-area">Serving Collin, Grayson &amp; Many North Texas Counties</div>
        <a class="header-estimate-button" href="#estimate">${icons.estimate}<span>Free Estimate</span></a>
      </div>`;

    document.querySelector('.header-actions')?.remove();
  };

  const installHeaderStyles = () => {
    const style = document.createElement('style');
    style.id = 'arborwise-header-fix';
    style.textContent = `
      .ui-icon{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
      .brand-wrap.brand-layout{max-width:var(--max);margin:auto;padding:10px 24px 8px;display:grid;grid-template-columns:minmax(270px,1fr) auto minmax(300px,1fr);gap:22px;align-items:center}
      .brand-layout .brand{width:190px;justify-self:center}
      .brand-layout .brand img{width:100%;height:150px;object-fit:contain;filter:drop-shadow(0 8px 12px rgba(11,63,47,.1))}
      .header-side{min-width:0}
      .header-side-left{display:flex;justify-content:flex-start;gap:10px}
      .header-contact-card{min-width:0;display:flex;align-items:center;gap:10px;padding:10px 12px;border:1px solid var(--line);border-radius:16px;background:#fff;color:var(--forest);text-decoration:none;box-shadow:var(--shadow-soft)}
      .header-contact-card:hover,.header-contact-card:focus-visible{border-color:#9fbd9c;transform:translateY(-1px)}
      .header-contact-card span{display:flex;flex-direction:column;line-height:1.15}
      .header-contact-card small{font-size:.69rem;color:var(--muted);font-weight:800}
      .header-contact-card strong{font-size:.82rem;white-space:nowrap}
      .header-side-right{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:7px 12px;align-items:center}
      .header-credential{display:flex;align-items:center;gap:7px;color:var(--forest);font-size:.82rem;line-height:1.2}
      .header-credential .ui-icon{width:21px;height:21px;color:var(--leaf)}
      .header-service-area{font-size:.78rem;line-height:1.25;color:var(--muted);font-weight:850}
      .header-estimate-button{grid-column:2;grid-row:1/3;align-self:stretch;min-width:126px;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:4px;padding:10px 12px;border-radius:16px;background:var(--lime);color:var(--forest-dark);text-decoration:none;font-size:.78rem;font-weight:950;box-shadow:0 10px 24px rgba(6,40,31,.15)}
      .header-estimate-button:hover,.header-estimate-button:focus-visible{transform:translateY(-1px);box-shadow:0 13px 28px rgba(6,40,31,.2)}
      .header-estimate-button .ui-icon{width:25px;height:25px}
      .nav-row{justify-content:center}
      .main-nav{justify-content:center}
      .section-label{display:inline-flex;align-items:center;padding:7px 11px;border-radius:999px;background:#e7f1e2;color:var(--forest);font-size:.9rem;line-height:1}
      @media(max-width:1100px){
        .brand-wrap.brand-layout{grid-template-columns:1fr 170px 1fr;gap:14px;padding-left:16px;padding-right:16px}
        .brand-layout .brand{width:170px}
        .brand-layout .brand img{height:138px}
        .header-contact-card{padding:9px}
        .header-contact-card small{display:none}
        .header-contact-card strong{font-size:.73rem}
        .header-side-right{gap:5px 8px}
        .header-credential{font-size:.73rem}
        .header-service-area{font-size:.69rem}
        .header-estimate-button{min-width:105px;font-size:.7rem}
      }
      @media(max-width:760px){
        body{padding-bottom:98px}
        .brand-wrap.brand-layout{padding:7px 8px 6px;grid-template-columns:70px minmax(132px,1fr) 104px;gap:6px;align-items:center}
        .brand-layout .brand{width:min(150px,100%)}
        .brand-layout .brand img{height:116px}
        .header-side-left{display:grid;grid-template-columns:1fr;gap:5px}
        .header-contact-card{min-height:50px;padding:5px 3px;gap:2px;justify-content:center;flex-direction:column;border-radius:13px;text-align:center}
        .header-contact-card .ui-icon{width:22px;height:22px}
        .header-contact-card span{display:block}
        .header-contact-card small{display:none}
        .header-contact-card strong{display:block;font-size:.61rem;line-height:1.05;white-space:normal}
        .header-side-right{display:flex;flex-direction:column;justify-content:center;gap:5px;text-align:center}
        .header-credential{display:flex;justify-content:center;gap:3px;font-size:.6rem;line-height:1.08}
        .header-credential .ui-icon{width:16px;height:16px}
        .header-service-area{font-size:.61rem;line-height:1.12;font-weight:900;color:#40574d}
        .header-estimate-button{width:100%;min-width:0;min-height:34px;padding:5px 3px;border-radius:11px;flex-direction:row;gap:3px;font-size:.61rem;line-height:1}
        .header-estimate-button .ui-icon{width:17px;height:17px}
        .hero-copy{padding:28px 18px}
        .hero-copy .kicker{font-size:.7rem;padding:8px 11px}
        h1{font-size:clamp(2rem,9.2vw,2.7rem);line-height:1.01;max-width:11ch;margin-bottom:18px}
        .hero-lead{font-size:.98rem;line-height:1.5}
        .section-label{font-size:.84rem;margin-bottom:18px}
        .mobile-bar a{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:3px;min-height:66px;padding:6px 3px;line-height:1.05}
        .mobile-bar .ui-icon{width:24px;height:24px}
        .mobile-bar a span{display:block}
      }
      @media(max-width:430px){
        .brand-wrap.brand-layout{grid-template-columns:64px minmax(124px,1fr) 96px;gap:5px}
        .brand-layout .brand img{height:108px}
        .header-contact-card{min-height:47px}
        .header-service-area{font-size:.58rem}
        .header-credential{font-size:.57rem}
        .header-estimate-button{font-size:.58rem}
      }
    `;
    document.head.appendChild(style);
  };

  const loadBrandAssets = async () => {
    const setAsset = async (selector, encodedPath, fallbackPath) => {
      const images = [...document.querySelectorAll(selector)];
      images.forEach(img => { img.src = fallbackPath; });
      try {
        const response = await fetch(encodedPath, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Could not load ${encodedPath}`);
        const encoded = (await response.text()).trim();
        images.forEach(img => { img.src = `data:image/avif;base64,${encoded}`; });
      } catch (error) {
        console.error(`Could not load ${encodedPath}; using the local asset instead.`, error);
      }
    };

    await Promise.allSettled([
      setAsset('[data-brand-logo]', 'assets/logo-correct.b64', 'assets/logo.webp'),
      setAsset('[data-annie]', 'assets/annie-correct.b64', 'assets/annie.webp')
    ]);
  };

  const installMobileIcons = () => {
    const links = document.querySelectorAll('.mobile-bar a');
    if (links.length !== 3) return;
    links[0].innerHTML = `${icons.phone}<span>Call</span>`;
    links[1].innerHTML = `${icons.message}<span>Text Photos</span>`;
    links[2].innerHTML = `${icons.estimate}<span>Estimate</span>`;
  };

  installHeader();
  installHeaderStyles();
  installMobileIcons();
  loadBrandAssets();

  const recognitionCopy = document.querySelector('.recognition-copy p:not(.kicker)');
  if (recognitionCopy) recognitionCopy.textContent = 'Serving Collin, Grayson & Many North Texas Counties.';
  const footerCopy = document.querySelector('.site-footer > p');
  if (footerCopy) footerCopy.textContent = 'Serving Collin, Grayson & Many North Texas Counties.';

  const concerns = {
    leaves: {
      title: 'Leaf spots, browning, curling, or early leaf drop',
      text: 'Water stress, root problems, insects, disease, heat, and seasonal change can create similar symptoms. The pattern across the whole canopy matters more than one damaged leaf.'
    },
    canopy: {
      title: 'Dead branches or a thinning canopy',
      text: 'Drought, root damage, disease, storm injury, structural problems, and long-term decline can all show up in the canopy. Arborwise looks at where the thinning begins and how quickly it changed.'
    },
    trunk: {
      title: 'Cracks, cavities, loose bark, or mushrooms',
      text: 'A defect does not automatically mean removal. Location, sound wood, species, nearby targets, movement, and the surrounding root zone all affect the recommendation.'
    },
    lean: {
      title: 'A new lean, exposed roots, or moving soil',
      text: 'A new lean or soil movement after wind or rain deserves prompt attention. Photograph the whole tree, the trunk base, and the ground on both sides of the lean.'
    }
  };

  const dialog = document.getElementById('concernDialog');
  const title = document.getElementById('dialogTitle');
  const text = document.getElementById('dialogText');
  let lastTrigger = null;

  document.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = concerns[card.dataset.concern];
      if (!item || !dialog) return;
      lastTrigger = card;
      title.textContent = item.title;
      text.textContent = item.text;
      dialog.showModal();
    });
  });

  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => lastTrigger?.focus());

  const tips = [
    'Roots usually extend well beyond the trunk and often beyond the drip line. What happens to the soil matters to the whole tree.',
    'A proper pruning cut protects the branch collar. Flush cuts and long stubs both create avoidable problems.',
    'A cavity does not automatically mean a tree must come down. Location, sound wood, movement, species, and nearby targets all matter.',
    'Photograph the entire tree before taking close-ups. The pattern across the canopy often tells more than one damaged spot.'
  ];
  let tipIndex = 0;
  const tip = document.getElementById('annieTip');
  document.getElementById('annieButton')?.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    if (tip) tip.textContent = tips[tipIndex];
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
