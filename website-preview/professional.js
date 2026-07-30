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
      <div class="brand-main">
        <a class="header-contact header-contact-left" href="tel:+19724308330" aria-label="Call Arborwise at 972-430-8330">
          ${icons.phone}
          <span class="desktop-contact"><small>Call Arborwise</small><strong>972-430-8330</strong></span>
          <span class="mobile-contact">Call</span>
        </a>

        <a class="brand" href="#top" aria-label="Arborwise home">
          <img data-brand-logo alt="Arborwise. Nurture Your Nature. Tree held in two hands above the wooden Arborwise plaque with its green TM.">
        </a>

        <a class="header-contact header-contact-right" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20have%20photos%20of%20a%20tree%20concern." aria-label="Text photos to Arborwise">
          ${icons.message}
          <span class="desktop-contact"><small>Send a Message</small><strong>Text Photos</strong></span>
          <span class="mobile-contact">Text</span>
        </a>
      </div>
      <div class="brand-proof">
        <span class="header-credential">${icons.check}<strong>ISA Certified Arborist on Staff</strong></span>
        <span class="header-service-area">Serving Collin, Grayson &amp; Many North Texas Counties</span>
        <a class="header-estimate-button" href="#estimate">${icons.estimate}<span>Free Estimate</span></a>
      </div>`;

    document.querySelector('.header-actions')?.remove();
  };

  const installPageCopy = () => {
    const kicker = document.querySelector('.hero-copy .kicker');
    const title = document.getElementById('hero-title');
    const lead = document.querySelector('.hero-lead');
    const actions = document.querySelector('.hero-actions');
    const promise = document.querySelector('.hero-promise');

    if (kicker) kicker.textContent = 'Professional North Texas Tree Care';
    if (title) title.innerHTML = 'Skilled tree work.<br><em>Clear answers.</em>';
    if (lead) lead.textContent = 'Professional pruning, controlled removals, and practical tree-risk guidance for homes, businesses, HOAs, and managed properties.';
    if (actions) {
      actions.innerHTML = `
        <a class="button" href="#estimate">Get a Free Estimate</a>
        <a class="button ghost" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20have%20photos%20of%20a%20tree%20concern.">Text Photos</a>`;
    }
    promise?.remove();
  };

  const installAfterPhoto = () => {
    const card = document.querySelector('.service-grid .service-card:nth-child(3)');
    const image = card?.querySelector(':scope > img');
    if (!card || !image) return;

    card.classList.add('after-photo-card');
    image.dataset.afterPhoto = '';
    image.src = 'assets/healthy-tree.webp';
    image.alt = 'Completed Arborwise tree and landscape work at an AnaCapri property';

    const logoMark = document.createElement('img');
    logoMark.className = 'photo-logo-mark';
    logoMark.dataset.brandLogo = '';
    logoMark.alt = '';
    logoMark.setAttribute('aria-hidden', 'true');
    card.appendChild(logoMark);
  };

  const moveAnnieForward = () => {
    const annie = document.querySelector('.annie-callout');
    const trust = document.querySelector('.trust-band');
    if (annie && trust) trust.insertAdjacentElement('afterend', annie);
  };

  const installStyles = () => {
    const existing = document.getElementById('arborwise-polish-fix');
    if (existing) existing.remove();

    const style = document.createElement('style');
    style.id = 'arborwise-polish-fix';
    style.textContent = `
      .ui-icon{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
      .site-header{background:rgba(251,248,239,.98);border-bottom:1px solid #bdc9ae;box-shadow:0 7px 20px rgba(6,40,31,.06)}
      .brand-wrap.brand-layout{max-width:var(--max);margin:auto;padding:7px 24px 5px;display:block}
      .brand-main{max-width:1120px;margin:auto;display:grid;grid-template-columns:1fr minmax(220px,310px) 1fr;gap:28px;align-items:center}
      .brand-main .brand{width:100%;max-width:310px;justify-self:center}
      .brand-main .brand img{width:100%;height:112px;object-fit:contain;filter:drop-shadow(0 7px 10px rgba(11,63,47,.11))}
      .header-contact{display:flex;align-items:center;gap:10px;color:var(--forest);text-decoration:none;padding:8px 4px 9px;border-bottom:2px solid var(--gold);max-width:220px}
      .header-contact-left{justify-self:end}
      .header-contact-right{justify-self:start}
      .header-contact:hover,.header-contact:focus-visible{color:var(--leaf);border-bottom-color:var(--leaf)}
      .header-contact .ui-icon{width:27px;height:27px}
      .desktop-contact{display:flex;flex-direction:column;line-height:1.08}
      .desktop-contact small{font-size:.7rem;color:var(--muted);font-weight:800;text-transform:uppercase;letter-spacing:.07em}
      .desktop-contact strong{font-size:.92rem;white-space:nowrap}
      .mobile-contact{display:none;font-size:.7rem;font-weight:950;text-transform:uppercase;letter-spacing:.04em}
      .brand-proof{max-width:980px;margin:1px auto 0;padding:5px 12px;border-top:1px solid #d9dfcf;border-bottom:1px solid #d9dfcf;display:flex;justify-content:center;align-items:center;gap:16px;color:var(--forest);font-size:.76rem;line-height:1.15}
      .header-credential{display:flex;align-items:center;gap:6px;white-space:nowrap}
      .header-credential .ui-icon{width:17px;height:17px;color:var(--leaf)}
      .header-service-area{font-weight:900;text-align:center}
      .header-estimate-button{display:inline-flex;align-items:center;gap:6px;padding:6px 11px;border-radius:999px;background:var(--forest);color:#fff;text-decoration:none;font-weight:950;white-space:nowrap}
      .header-estimate-button .ui-icon{width:17px;height:17px}
      .header-estimate-button:hover,.header-estimate-button:focus-visible{background:var(--leaf)}
      .nav-row{justify-content:center;padding-bottom:8px}
      .main-nav{justify-content:center}

      body{background:linear-gradient(180deg,#fbf8ef 0,#f7f3e7 48%,#fbf8ef 100%)}
      .hero{padding-top:20px;gap:18px}
      .hero-copy{background:#fffdf8;color:var(--forest-dark);border:1px solid #aab99b;box-shadow:0 14px 34px rgba(6,40,31,.10);padding:clamp(34px,4.4vw,62px)}
      .hero-copy .kicker{align-self:flex-start;background:transparent;color:var(--forest);padding:0 0 8px;border-radius:0;border-bottom:2px solid var(--gold);font-size:.82rem;letter-spacing:.11em}
      .hero-copy h1{font-size:clamp(2.8rem,4.7vw,4.7rem);line-height:1.01;max-width:12ch;color:var(--forest-dark);margin-bottom:18px}
      .hero-copy h1 em{color:var(--leaf)}
      .hero-lead{font-size:clamp(1rem,1.2vw,1.16rem);line-height:1.56;color:#40574d;max-width:54ch}
      .hero-copy .button.ghost{background:#fff;color:var(--forest-dark);border:1px solid #9aac8d;box-shadow:none}
      .hero-copy .button.ghost:hover,.hero-copy .button.ghost:focus-visible{background:#f0f5e9}
      .hero-media{min-height:580px;box-shadow:0 14px 34px rgba(6,40,31,.10)}
      h2{color:var(--forest-dark)}
      .section-label{display:inline-block;padding:0 0 9px;border-radius:0;border-bottom:2px solid var(--gold);background:transparent;color:var(--forest);font-size:1rem;line-height:1.1;letter-spacing:.11em;margin-bottom:22px}
      .service-card,.concern-card,.process li,.recognition-section,.faq-list details{background:#fffdf8;border-color:#b8c6aa;box-shadow:0 10px 24px rgba(6,40,31,.07)}
      .after-photo-card{position:relative}
      .after-photo-card>img:first-child{object-position:center 48%}
      .photo-logo-mark{position:absolute;z-index:3;top:12px;right:12px;width:132px!important;height:78px!important;object-fit:contain!important;padding:5px;background:rgba(255,253,248,.92);border:1px solid rgba(11,63,47,.22);border-radius:12px;box-shadow:0 7px 16px rgba(6,40,31,.14)}
      .annie-callout{margin-top:18px}
      .annie-callout [data-annie]{object-fit:contain;filter:drop-shadow(0 18px 18px rgba(6,40,31,.18))}
      .mobile-bar a{gap:3px}

      @media(max-width:1100px){
        .brand-main{grid-template-columns:1fr minmax(190px,260px) 1fr;gap:18px}
        .brand-main .brand{max-width:260px}
        .brand-main .brand img{height:104px}
        .desktop-contact strong{font-size:.82rem}
        .brand-proof{font-size:.7rem;gap:11px}
      }
      @media(max-width:760px){
        body{padding-bottom:98px}
        .site-header{position:relative}
        .brand-wrap.brand-layout{padding:5px 7px 4px}
        .brand-main{grid-template-columns:54px minmax(145px,1fr) 54px;gap:5px}
        .brand-main .brand{max-width:190px}
        .brand-main .brand img{height:91px}
        .header-contact{justify-self:center;max-width:none;padding:5px 1px;border:0;display:flex;flex-direction:column;gap:2px;text-align:center}
        .header-contact .ui-icon{width:25px;height:25px}
        .desktop-contact{display:none}
        .mobile-contact{display:block}
        .brand-proof{margin-top:0;padding:4px 5px;border-bottom:0;gap:0;font-size:.62rem;line-height:1.18}
        .header-credential,.header-estimate-button{display:none}
        .header-service-area{display:block;max-width:330px}
        .hero{padding:12px 12px 16px;gap:12px}
        .hero-copy{padding:28px 20px;text-align:left;align-items:flex-start}
        .hero-copy .kicker{align-self:flex-start;text-align:left;font-size:.71rem;padding-bottom:7px}
        .hero-copy h1{font-size:clamp(2.2rem,10.5vw,3rem);line-height:1.02;max-width:12ch;margin-bottom:15px}
        .hero-lead{font-size:.98rem;line-height:1.5}
        .hero-actions{width:100%;display:grid}
        .hero-actions .button{width:100%;min-height:50px}
        .hero-media{min-height:390px}
        .hero-media img{min-height:390px}
        .section-label{font-size:.9rem;margin-bottom:19px}
        .photo-logo-mark{width:108px!important;height:66px!important;top:10px;right:10px}
        .mobile-bar a{display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:66px;padding:6px 3px;line-height:1.05}
        .mobile-bar .ui-icon{width:24px;height:24px}
        .mobile-bar a span{display:block}
      }
      @media(max-width:430px){
        .brand-main{grid-template-columns:50px minmax(132px,1fr) 50px}
        .brand-main .brand img{height:84px}
        .brand-proof{font-size:.59rem}
        .hero-copy h1{font-size:2.18rem}
      }
    `;
    document.head.appendChild(style);
  };

  const loadBrandAssets = async () => {
    const setAsset = async (selector, encodedPath, fallbackPath, mimeType, hideUntilLoaded = false) => {
      const images = [...document.querySelectorAll(selector)];
      if (hideUntilLoaded) {
        images.forEach(img => {
          img.removeAttribute('src');
          img.style.visibility = 'hidden';
        });
      } else {
        images.forEach(img => { img.src = fallbackPath; });
      }

      try {
        const response = await fetch(encodedPath, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Could not load ${encodedPath}`);
        const encoded = (await response.text()).trim();
        images.forEach(img => {
          img.onload = () => { img.style.visibility = 'visible'; };
          img.src = `data:${mimeType};base64,${encoded}`;
        });
      } catch (error) {
        images.forEach(img => {
          img.style.visibility = 'visible';
          img.src = fallbackPath;
        });
        console.error(`Could not load ${encodedPath}; using the local asset instead.`, error);
      }
    };

    await Promise.allSettled([
      setAsset('[data-brand-logo]', 'assets/logo-correct.b64', 'assets/logo.webp', 'image/webp', true),
      setAsset('[data-annie]', 'assets/annie-correct.b64', 'assets/annie.webp', 'image/webp', true),
      setAsset('[data-after-photo]', 'assets/anacapri-after.b64', 'assets/healthy-tree.webp', 'image/webp')
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
  installPageCopy();
  installAfterPhoto();
  moveAnnieForward();
  installStyles();
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