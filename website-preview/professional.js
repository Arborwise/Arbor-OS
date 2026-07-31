(() => {
  const styles = document.createElement('style');
  styles.textContent = `
    body{padding-bottom:88px}
    .site-header{padding:8px 8px 0!important}
    .aw-header{
      max-width:1360px;
      margin:0 auto;
      overflow:hidden;
      color:#fff;
      background:#020403;
      border:1px solid rgba(215,165,66,.52);
      border-radius:26px;
      box-shadow:0 18px 45px rgba(0,0,0,.3);
    }
    .aw-header-main{
      display:grid;
      grid-template-columns:minmax(68px,.78fr) minmax(170px,1.55fr) minmax(68px,.78fr);
      gap:7px;
      align-items:center;
      padding:8px 10px 7px;
    }
    .aw-logo-link{display:flex;align-items:center;justify-content:center;min-width:0;text-decoration:none}
    .aw-logo{display:block;width:100%;max-width:245px;height:92px;object-fit:contain;filter:drop-shadow(0 8px 18px rgba(0,0,0,.55))}
    .aw-logo-fallback{color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:2rem;font-weight:900;line-height:.9;text-align:center}
    .aw-logo-fallback span{display:block;color:#d9f378}.aw-logo-fallback small{display:block;margin-top:7px;color:#d7a542;font:900 .56rem/1 Inter,system-ui,sans-serif;letter-spacing:.22em;text-transform:uppercase}
    .aw-proof{display:flex;flex-direction:column;line-height:1.08;text-transform:uppercase}
    .aw-proof span{color:#a9b7af;font-size:.46rem;font-weight:900;letter-spacing:.1em}
    .aw-proof strong{margin-top:4px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:.8rem;letter-spacing:.01em}
    .aw-proof-left{text-align:right}.aw-proof-right{text-align:left}
    .aw-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.025)}
    .aw-nav a{min-width:0;padding:11px 3px 12px;color:#f5f3ea;text-align:center;text-decoration:none;font-size:.68rem;font-weight:900;line-height:1.15}
    .aw-nav a:last-child{color:#d9f378}

    .hero.aw-hero{
      position:relative!important;
      display:block!important;
      max-width:1336px!important;
      min-height:650px!important;
      margin:10px 8px 0!important;
      padding:0!important;
      overflow:hidden!important;
      border-radius:28px!important;
      box-shadow:0 24px 65px rgba(0,0,0,.27)!important;
      background:#061f18!important;
    }
    .aw-hero-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:61% center}
    .aw-hero-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,8,6,.97) 0%,rgba(2,8,6,.8) 49%,rgba(2,8,6,.13) 82%,rgba(2,8,6,.02) 100%),linear-gradient(90deg,rgba(2,8,6,.3),transparent 72%)}
    .aw-hero-content{position:relative;z-index:1;min-height:650px;padding:28px 20px 25px;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;color:#fff}
    .aw-kicker{margin:0 0 9px;color:#e0b957;font-size:.64rem;font-weight:950;letter-spacing:.12em;text-transform:uppercase}
    .aw-hero h1{margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:3.35rem;line-height:.86;letter-spacing:-.055em;text-shadow:0 7px 26px rgba(0,0,0,.65)}
    .aw-hero h1 span{display:block;color:#d9f378}.aw-hero h1 sup{font-size:.21em;vertical-align:super;margin-left:.08em;color:#d7a542}
    .aw-slogan{margin:13px 0 8px;color:#e0b957;font-family:Georgia,'Times New Roman',serif;font-size:1.34rem;font-weight:900;letter-spacing:.035em;text-shadow:0 3px 15px rgba(0,0,0,.7)}
    .aw-hero-lead{max-width:610px;margin:0;color:#fff;font-size:1rem;font-weight:850;line-height:1.34;text-shadow:0 3px 16px rgba(0,0,0,.75)}
    .aw-honesty{max-width:610px;margin:12px 0 0;padding-left:13px;color:#e7ece9;border-left:3px solid #d7a542;font-size:.87rem;line-height:1.38}
    .aw-actions{display:grid;grid-template-columns:1fr;width:100%;gap:8px;margin-top:17px}
    .aw-primary,.aw-secondary{display:flex;min-height:49px;align-items:center;justify-content:center;padding:11px 16px;border-radius:999px;text-decoration:none;text-align:center;font-size:.89rem;font-weight:950}
    .aw-primary{background:#d9f378;color:#061f18;box-shadow:0 10px 24px rgba(0,0,0,.32)}
    .aw-secondary{color:#fff;border:1px solid rgba(255,255,255,.76);background:rgba(0,0,0,.25)}
    .aw-video-link{margin-top:13px;color:#fff;text-underline-offset:5px;font-size:.84rem;font-weight:850}.aw-video-link span{color:#d9f378}
    .aw-proof-row{display:flex;gap:7px;flex-wrap:wrap;margin-top:14px}.aw-proof-pill{padding:6px 8px;color:#f5f5ef;background:rgba(3,5,4,.7);border:1px solid rgba(215,165,66,.5);border-radius:999px;font-size:.63rem;font-weight:850;backdrop-filter:blur(6px)}

    .trust-band.aw-trust-strip{grid-template-columns:1fr!important;gap:8px!important;margin:10px auto 34px!important;padding:0 8px!important}
    .aw-trust-strip article{position:relative;min-height:0!important;padding:15px 16px 15px 58px!important;background:#071d16!important;border:1px solid rgba(215,165,66,.28)!important;border-radius:18px!important;box-shadow:0 10px 24px rgba(5,30,23,.1)!important;color:#fff!important}
    .aw-trust-strip article::before{content:attr(data-mark);position:absolute;left:15px;top:50%;transform:translateY(-50%);display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#d9f378;color:#061f18;font-weight:1000}
    .aw-trust-strip strong{display:block;color:#d9f378!important;font-size:.91rem!important;line-height:1.18}.aw-trust-strip span{display:block;margin-top:3px;color:#e2e9e4!important;font-size:.76rem!important;line-height:1.35}

    .annie-callout{grid-template-columns:1fr!important;gap:16px!important;padding:28px 20px 30px!important;margin:0 8px 40px!important;text-align:center!important;background:linear-gradient(145deg,#fff5d5,#fffdf7 58%,#e4f1dc)!important}
    .annie-badge{display:grid;place-items:center;width:188px;height:188px;margin:0 auto 2px;border-radius:50%;background:radial-gradient(circle at 42% 34%,#174c37,#082c22 67%,#041611);border:4px solid #d7a542;box-shadow:0 0 0 7px rgba(217,243,120,.22),0 18px 34px rgba(5,30,23,.23)}
    .annie-badge img{display:block!important;visibility:visible;width:158px!important;height:158px!important;margin:0!important;object-fit:contain!important;filter:drop-shadow(0 13px 13px rgba(0,0,0,.28))}
    .annie-callout>div{min-width:0!important;width:100%!important}.annie-callout .section-label{margin-left:auto!important;margin-right:auto!important}.annie-callout h2{font-size:2.1rem!important;line-height:1.02!important;margin-bottom:13px!important}.annie-callout p:not(.section-label){font-size:.98rem!important;line-height:1.48!important}.plain-button{display:inline-block;margin-top:4px}

    .mobile-bar{z-index:1000!important}footer{padding-bottom:28px!important}

    @media (min-width:701px){
      body{padding-bottom:0}.site-header{padding:14px 14px 0!important}.aw-header{border-radius:30px}.aw-header-main{grid-template-columns:1fr minmax(320px,500px) 1fr;gap:28px;padding:8px 34px 10px}.aw-logo{max-width:470px;height:145px}.aw-proof span{font-size:.72rem}.aw-proof strong{font-size:1.35rem}.aw-nav{display:flex;justify-content:center;gap:30px}.aw-nav a{padding:13px 16px 15px;font-size:.86rem}
      .hero.aw-hero{min-height:700px!important;margin:14px auto 0!important;border-radius:34px!important}.aw-hero-photo{object-position:58% center}.aw-hero-shade{background:linear-gradient(90deg,rgba(2,8,6,.92) 0%,rgba(2,8,6,.74) 43%,rgba(2,8,6,.18) 78%,rgba(2,8,6,.05) 100%),linear-gradient(0deg,rgba(2,8,6,.7),transparent 48%)}.aw-hero-content{min-height:700px;max-width:770px;padding:clamp(44px,6vw,84px);justify-content:center}.aw-kicker{font-size:.82rem}.aw-hero h1{font-size:clamp(3.5rem,7vw,6.4rem)}.aw-slogan{font-size:1.7rem}.aw-hero-lead{font-size:clamp(1.18rem,2vw,1.5rem)}.aw-honesty{font-size:1rem}.aw-actions{display:flex;width:auto;gap:12px}.aw-primary,.aw-secondary{min-height:54px;padding:13px 22px;font-size:1rem}
      .trust-band.aw-trust-strip{grid-template-columns:repeat(3,1fr)!important;gap:12px!important;padding:0 14px!important}.annie-callout{grid-template-columns:250px 1fr!important;gap:44px!important;padding:38px 50px!important;margin:0 auto 52px!important;text-align:left!important}.annie-badge{width:230px;height:230px;margin:0}.annie-badge img{width:198px!important;height:198px!important}.annie-callout .section-label{margin-left:0!important}.annie-callout h2{font-size:clamp(2rem,3.2vw,3.35rem)!important}
    }
  `;
  document.head.appendChild(styles);

  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <div class="aw-header">
        <div class="aw-header-main">
          <div class="aw-proof aw-proof-left"><span>Locally owned</span><strong>North Texas</strong></div>
          <a class="aw-logo-link" href="#top" aria-label="Arborwise Tree Care home">
            <img class="aw-logo" data-brand-logo alt="Arborwise Tree Care. Nurture Your Nature.">
          </a>
          <div class="aw-proof aw-proof-right"><span>Established</span><strong>2019</strong></div>
        </div>
        <nav class="aw-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#concerns">Tree Concerns</a>
          <a href="#planting">Tree Planting</a>
          <a href="#estimate">Free Estimate</a>
        </nav>
      </div>`;
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
        <p class="aw-slogan">Nurture Your Nature</p>
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
      </div>`;
  }

  const trustBand = document.querySelector('.trust-band');
  if (trustBand) {
    trustBand.classList.add('aw-trust-strip');
    trustBand.innerHTML = `
      <article data-mark="✓"><strong>Certified guidance</strong><span>ISA Certified Arborist knowledge behind the recommendation.</span></article>
      <article data-mark="★"><strong>Chosen by local neighbors</strong><span>Nextdoor Neighborhood Fave in both 2024 and 2025.</span></article>
      <article data-mark="!"><strong>No work invented</strong><span>We tell you what is urgent, what can wait, and what needs nothing at all.</span></article>`;
  }

  const annieSection = document.querySelector('.annie-callout');
  const annieImage = annieSection?.querySelector('[data-annie]');
  if (annieSection && annieImage && !annieImage.parentElement?.classList.contains('annie-badge')) {
    const badge = document.createElement('div');
    badge.className = 'annie-badge';
    annieImage.before(badge);
    badge.appendChild(annieImage);
  }

  const decodeBase64ToBlobUrl = (encoded, mimeType) => {
    const clean = encoded.replace(/\s+/g, '');
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    return URL.createObjectURL(new Blob([bytes], { type: mimeType }));
  };

  const showLogoFallback = image => {
    const fallback = document.createElement('span');
    fallback.className = 'aw-logo-fallback';
    fallback.innerHTML = 'Arbor<span>wise</span><small>Tree Care</small>';
    image.replaceWith(fallback);
  };

  const loadAsset = async (selector, encodedPath, fallbackPath, mimeType) => {
    const images = [...document.querySelectorAll(selector)];
    if (!images.length) return;
    images.forEach(image => { image.style.visibility = 'hidden'; image.style.display = 'block'; });
    try {
      const response = await fetch(encodedPath, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Could not load ${encodedPath}`);
      const objectUrl = decodeBase64ToBlobUrl(await response.text(), mimeType);
      images.forEach(image => {
        image.onload = () => { image.style.visibility = 'visible'; };
        image.onerror = () => {
          image.onerror = null;
          image.onload = () => { image.style.visibility = 'visible'; };
          image.src = fallbackPath;
          setTimeout(() => {
            if (!image.complete || image.naturalWidth === 0) {
              if (selector === '[data-brand-logo]') showLogoFallback(image);
              else image.style.display = 'none';
            }
          }, 800);
        };
        image.src = objectUrl;
      });
    } catch (error) {
      images.forEach(image => {
        if (selector === '[data-brand-logo]') showLogoFallback(image);
        else { image.src = fallbackPath; image.style.visibility = 'visible'; }
      });
      console.error(`Asset fallback used for ${selector}`, error);
    }
  };

  loadAsset('[data-brand-logo]', 'assets/logo-correct.b64', 'assets/logo.webp', 'image/avif');
  loadAsset('[data-annie]', 'assets/annie-correct.b64', 'assets/annie.webp', 'image/webp');

  const concerns = {
    leaves: { title: 'Leaf spots, browning, curling, or early leaf drop', text: 'Water stress, root problems, insects, disease, heat, and seasonal change can create similar symptoms. The pattern across the whole canopy matters more than one damaged leaf.' },
    canopy: { title: 'Dead branches or a thinning canopy', text: 'Drought, root damage, disease, storm injury, structural problems, and long-term decline can all appear in the canopy. Arborwise looks at where the thinning begins and how quickly it changed.' },
    trunk: { title: 'Cracks, cavities, loose bark, or mushrooms', text: 'A visible defect does not automatically mean removal. Location, sound wood, species, nearby targets, movement, and the surrounding root zone all affect the recommendation.' },
    lean: { title: 'A new lean, exposed roots, or moving soil', text: 'A new lean or soil movement after wind or rain deserves prompt attention. Photograph the whole tree, the trunk base, and the ground on both sides of the lean.' }
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
  dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  dialog?.addEventListener('close', () => lastTrigger?.focus());

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