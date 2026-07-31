(() => {
  'use strict';

  const styles = document.createElement('style');
  styles.textContent = `
    body{padding-bottom:88px}
    .site-header{padding:8px 8px 0!important}
    .aw-header{max-width:1360px;margin:0 auto;overflow:hidden;color:#fff;background:#020403;border:1px solid rgba(215,165,66,.58);border-radius:26px;box-shadow:0 18px 45px rgba(0,0,0,.3)}
    .aw-brand-row{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:13px 14px 9px;text-align:center}
    .aw-logo-link{display:flex;align-items:center;justify-content:center;width:100%;text-decoration:none}
    .aw-logo{display:block;width:min(94%,340px);height:auto;max-height:145px;object-fit:contain;filter:drop-shadow(0 10px 22px rgba(0,0,0,.55))}
    .aw-header-tagline{margin:2px 0 7px;color:#d9f378;font-family:Georgia,'Times New Roman',serif;font-size:1rem;font-weight:900;letter-spacing:.11em;text-transform:uppercase}
    .aw-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.025)}
    .aw-nav a{min-width:0;padding:12px 3px 13px;color:#f5f3ea;text-align:center;text-decoration:none;font-size:.69rem;font-weight:900;line-height:1.15}
    .aw-nav a:last-child{color:#d9f378}

    .hero.aw-hero{position:relative!important;display:block!important;max-width:1336px!important;min-height:665px!important;margin:10px 8px 0!important;padding:0!important;overflow:hidden!important;border-radius:28px!important;box-shadow:0 24px 65px rgba(0,0,0,.27)!important;background:#061f18!important}
    .aw-hero-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:61% center}
    .aw-hero-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,8,6,.98) 0%,rgba(2,8,6,.82) 49%,rgba(2,8,6,.14) 82%,rgba(2,8,6,.02) 100%)}
    .aw-hero-content{position:relative;z-index:1;min-height:665px;padding:28px 20px 25px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;color:#fff;text-align:center}
    .aw-kicker{margin:0 0 10px;color:#e0b957;font-size:.66rem;font-weight:950;letter-spacing:.13em;text-transform:uppercase}
    .aw-hero h1{margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:3.25rem;line-height:.9;letter-spacing:-.045em;text-shadow:0 7px 26px rgba(0,0,0,.65)}
    .aw-hero h1 span{display:block;color:#d9f378}.aw-hero h1 sup{font-size:.21em;vertical-align:super;margin-left:.08em;color:#d7a542}
    .aw-slogan{margin:14px 0 8px;color:#d9f378;font-family:Georgia,'Times New Roman',serif;font-size:1.36rem;font-weight:900;letter-spacing:.035em;text-shadow:0 3px 15px rgba(0,0,0,.7)}
    .aw-hero-lead{max-width:610px;margin:0;color:#fff;font-size:1rem;font-weight:850;line-height:1.34;text-shadow:0 3px 16px rgba(0,0,0,.75)}
    .aw-honesty{max-width:600px;margin:13px 0 0;padding:11px 13px;color:#e7ece9;border-top:2px solid #d7a542;border-bottom:2px solid #d7a542;font-size:.87rem;line-height:1.42}
    .aw-actions{display:grid;grid-template-columns:1fr;width:100%;gap:8px;margin-top:18px}
    .aw-primary,.aw-secondary{display:flex;min-height:50px;align-items:center;justify-content:center;padding:11px 16px;border-radius:999px;text-decoration:none;text-align:center;font-size:.9rem;font-weight:950}
    .aw-primary{background:#d9f378;color:#061f18;box-shadow:0 10px 24px rgba(0,0,0,.32)}
    .aw-secondary{color:#fff;border:1px solid rgba(255,255,255,.8);background:rgba(0,0,0,.28)}
    .aw-video-link{margin-top:14px;color:#fff;text-underline-offset:5px;font-size:.86rem;font-weight:850}.aw-video-link span{color:#d9f378}

    .trust-band.aw-proof-rail{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;max-width:1336px!important;margin:10px auto 38px!important;padding:0 8px!important}
    .aw-proof-rail article{display:flex!important;min-height:96px!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:13px 10px!important;background:#071d16!important;border:1px solid rgba(215,165,66,.34)!important;border-radius:18px!important;box-shadow:0 10px 24px rgba(5,30,23,.11)!important;text-align:center!important}
    .aw-proof-rail small{display:grid;place-items:center;width:31px;height:31px;margin-bottom:8px;border-radius:50%;background:#d9f378;color:#061f18;font-size:.82rem;font-weight:1000}
    .aw-proof-rail strong{display:block;color:#d9f378!important;font-size:.82rem!important;line-height:1.18}
    .aw-proof-rail span{display:block;margin-top:4px;color:#e2e9e4!important;font-size:.7rem!important;line-height:1.3}

    .annie-callout{grid-template-columns:1fr!important;gap:16px!important;padding:28px 20px 30px!important;margin:0 8px 40px!important;text-align:center!important;background:linear-gradient(145deg,#fff5d5,#fffdf7 58%,#e4f1dc)!important}
    .annie-badge{display:grid;place-items:center;width:188px;height:188px;margin:0 auto 2px;border-radius:50%;background:radial-gradient(circle at 42% 34%,#174c37,#082c22 67%,#041611);border:4px solid #d7a542;box-shadow:0 0 0 7px rgba(217,243,120,.22),0 18px 34px rgba(5,30,23,.23)}
    .annie-badge img{display:block!important;width:158px!important;height:158px!important;margin:0!important;object-fit:contain!important;filter:drop-shadow(0 13px 13px rgba(0,0,0,.28))}
    .annie-callout>div{min-width:0!important;width:100%!important}.annie-callout .section-label{margin-left:auto!important;margin-right:auto!important}.annie-callout h2{font-size:2.1rem!important;line-height:1.02!important;margin-bottom:13px!important}.annie-callout p:not(.section-label){font-size:.98rem!important;line-height:1.48!important}.plain-button{display:inline-block;margin-top:4px}

    .section-head,.way-intro,.rooted-copy{text-align:center!important;margin-left:auto!important;margin-right:auto!important}
    .section-head>* , .way-intro>* , .rooted-copy>*{margin-left:auto!important;margin-right:auto!important}
    .section-label{display:inline-block!important;position:relative!important;margin-bottom:22px!important;text-align:center!important;font-size:.78rem!important;font-weight:950!important;letter-spacing:.16em!important}
    .section-label::after{content:'';position:absolute;left:50%;bottom:-10px;width:76px;height:3px;transform:translateX(-50%);border-radius:99px;background:#d7a542}
    .intro-section .section-head h2,.concern-section .section-head h2,.services-section .section-head h2{font-size:clamp(1.9rem,8vw,2.65rem)!important;line-height:1.05!important}

    /* The old concern images were mismatched. Do not show misleading photos while assets are being replaced. */
    .concern-section{display:none!important}

    .mobile-bar{z-index:1000!important;max-height:72px!important}.mobile-bar a{min-width:0!important}
    footer{padding-bottom:28px!important}

    @media (min-width:701px){
      body{padding-bottom:0}.site-header{padding:14px 14px 0!important}.aw-header{border-radius:30px}.aw-brand-row{padding:15px 34px 10px}.aw-logo{width:min(75%,520px);max-height:190px}.aw-header-tagline{font-size:1.2rem}.aw-nav{display:flex;justify-content:center;gap:30px}.aw-nav a{padding:13px 16px 15px;font-size:.86rem}
      .hero.aw-hero{min-height:700px!important;margin:14px auto 0!important;border-radius:34px!important}.aw-hero-photo{object-position:58% center}.aw-hero-shade{background:linear-gradient(90deg,rgba(2,8,6,.91) 0%,rgba(2,8,6,.68) 45%,rgba(2,8,6,.14) 78%,rgba(2,8,6,.03) 100%),linear-gradient(0deg,rgba(2,8,6,.7),transparent 48%)}.aw-hero-content{min-height:700px;max-width:770px;padding:clamp(44px,6vw,84px);align-items:flex-start;justify-content:center;text-align:left}.aw-kicker{font-size:.82rem}.aw-hero h1{font-size:clamp(3.8rem,7vw,6.5rem)}.aw-slogan{font-size:1.8rem}.aw-hero-lead{font-size:clamp(1.18rem,2vw,1.5rem)}.aw-honesty{text-align:left}.aw-actions{display:flex;width:auto;gap:12px}.aw-primary,.aw-secondary{min-height:54px;padding:13px 22px;font-size:1rem}
      .trust-band.aw-proof-rail{grid-template-columns:repeat(4,1fr)!important;gap:12px!important;padding:0 14px!important}.aw-proof-rail article{min-height:128px!important}.aw-proof-rail strong{font-size:1rem!important}.aw-proof-rail span{font-size:.8rem!important}
      .annie-callout{grid-template-columns:250px 1fr!important;gap:44px!important;padding:38px 50px!important;margin:0 auto 52px!important;text-align:left!important}.annie-badge{width:230px;height:230px;margin:0}.annie-badge img{width:198px!important;height:198px!important}.annie-callout .section-label{margin-left:0!important}.annie-callout .section-label::after{left:0;transform:none}.annie-callout h2{font-size:clamp(2rem,3.2vw,3.35rem)!important}
    }
  `;
  document.head.appendChild(styles);

  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <div class="aw-header">
        <div class="aw-brand-row">
          <a class="aw-logo-link" href="#top" aria-label="Arborwise Tree Care home">
            <img class="aw-logo" src="/assets/arborwise-logo.png?website=proof-rail-1" alt="Arborwise Tree Care. Nurture Your Nature.">
          </a>
          <p class="aw-header-tagline">Nurture Your Nature</p>
        </div>
        <nav class="aw-nav" aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#way">Why Arborwise</a>
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
      </div>`;
  }

  const trustBand = document.querySelector('.trust-band');
  if (trustBand) {
    trustBand.className = 'trust-band aw-proof-rail';
    trustBand.setAttribute('aria-label', 'Arborwise local credentials and recognition');
    trustBand.innerHTML = `
      <article><small>F</small><strong>Farmersville Chamber</strong><span>Local member serving the community where Greg lives.</span></article>
      <article><small>VA</small><strong>Van Alstyne Chamber</strong><span>Local member serving the community Brandon calls home.</span></article>
      <article><small>★</small><strong>Nextdoor Fave 2024 &amp; 2025</strong><span>Chosen by North Texas neighbors two years in a row.</span></article>
      <article><small>ISA</small><strong>Certified Arborist on Staff</strong><span>Knowledge and reasoning behind the recommendation.</span></article>`;
  }

  const annieSection = document.querySelector('.annie-callout');
  const annieImage = annieSection?.querySelector('[data-annie]');
  if (annieSection && annieImage && !annieImage.parentElement?.classList.contains('annie-badge')) {
    const badge = document.createElement('div');
    badge.className = 'annie-badge';
    annieImage.before(badge);
    badge.appendChild(annieImage);
  }

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
    'Send one whole-tree photo, one close-up, and one photo of the trunk base.',
    'Roots usually extend well beyond the trunk. What happens to the soil can affect the entire tree.',
    'A proper pruning cut protects the branch collar. Flush cuts and long stubs both create avoidable problems.',
    'A cavity does not automatically mean a tree must come down. Location, sound wood, movement, species, and nearby targets all matter.',
    'New trees should not be buried like fence posts. The root flare should be visible at the finished grade.',
    'Mulch should protect the root zone, not pile against the trunk.'
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