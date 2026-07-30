(() => {
  if (window.__arborwiseCustomerViewApplied) return;
  window.__arborwiseCustomerViewApplied = true;

  const assets = {
    logo: 'assets/logo.webp',
    annie: 'assets/annie.webp',
    climber: 'assets/hero-climber.webp',
    leaves: 'assets/photo-guide/selective-pruning.webp',
    canopy: 'assets/declining-tree.webp',
    trunk: 'assets/photo-guide/controlled-removal.webp',
    lean: 'assets/young-tree-before.webp',
    youngBefore: 'assets/young-tree-before.webp',
    youngAfter: 'assets/young-tree-after.webp',
    pruning: 'assets/photo-guide/selective-pruning.webp'
  };

  const replaceImage = (selector, src, alt) => {
    document.querySelectorAll(selector).forEach(img => {
      img.src = src;
      img.removeAttribute('referrerpolicy');
      if (alt) img.alt = alt;
    });
  };

  replaceImage('.brand img, .footer-brand img', assets.logo, 'Arborwise Tree Care');
  replaceImage('.annie, .annie-mini img, .care-statement img', assets.annie, 'Annie, the friendly Arborwise owl with an A on her chest');
  replaceImage('.hero-photo img', assets.climber, 'An Arborwise climber working high in a North Texas tree');
  replaceImage('.proof-grid figure:first-child img', assets.canopy, 'A North Texas tree showing visible canopy decline');
  replaceImage('.proof-grid figure:last-child img', assets.youngAfter, 'A North Texas property after careful Arborwise tree work');

  const heroEyebrow = document.querySelector('.hero-copy .eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.querySelector('.hero-lead');
  if (heroEyebrow) heroEyebrow.textContent = 'Your Premier North Texas Tree Service Provider';
  if (heroTitle) heroTitle.textContent = 'Understand the tree. Protect the property. Do the work correctly.';
  if (heroLead) heroLead.textContent = 'Arborwise gives homeowners, businesses, HOAs, and property managers clear answers, skilled tree work, and recommendations built around what the tree and property actually need.';

  const heroButtons = document.querySelector('.hero-buttons');
  let heroPromise = document.querySelector('.hero-promise');
  if (heroButtons && !heroPromise) {
    heroButtons.insertAdjacentHTML('afterend', '<div class="hero-promise"><strong>Nurture Your Nature.</strong><span>Honest answers. Skilled work. No pressure disguised as expertise.</span></div>');
    heroPromise = document.querySelector('.hero-promise');
  } else if (heroPromise) {
    heroPromise.innerHTML = '<strong>Nurture Your Nature.</strong><span>Honest answers. Skilled work. No pressure disguised as expertise.</span>';
  }

  const concernVisuals = {
    leaves: assets.leaves,
    canopy: assets.canopy,
    trunk: assets.trunk,
    lean: assets.lean
  };
  const concernPositions = {
    leaves: 'center 42%',
    canopy: 'center 34%',
    trunk: 'center 48%',
    lean: 'center 54%'
  };
  const concernSmall = {
    leaves: 'Water stress, root trouble, insects, disease, heat, or seasonal change can create similar symptoms.',
    canopy: 'Deadwood and thinning can involve drought, roots, disease, storm injury, structure, or long-term decline.',
    trunk: 'Cracks, wounds, cavities, loose bark, and decay signs need the whole tree and site for context.',
    lean: 'A new lean, lifting soil, exposed roots, or movement after rain or wind deserves prompt attention.'
  };

  document.querySelectorAll('.concern-card').forEach(card => {
    const key = card.dataset.concern;
    const visual = card.querySelector('.concern-image');
    const small = card.querySelector('small');
    if (visual && concernVisuals[key]) {
      visual.style.backgroundImage = `linear-gradient(180deg,rgba(8,38,28,0) 48%,rgba(8,38,28,.34)),url("${concernVisuals[key]}")`;
      visual.style.backgroundSize = 'cover';
      visual.style.backgroundPosition = concernPositions[key];
    }
    if (small && concernSmall[key]) small.textContent = concernSmall[key];
  });

  const localTrust = document.querySelector('.local-trust');
  const annieSection = document.querySelector('.annie-section');
  if (localTrust && annieSection) localTrust.insertAdjacentElement('afterend', annieSection);
  const annieQuote = document.getElementById('annieQuote');
  if (annieQuote) annieQuote.textContent = '“You do not need to know the diagnosis before you call. Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.”';

  const concernSection = document.querySelector('.concern-section');
  if (concernSection && !document.querySelector('.tree-knowledge-section')) {
    const section = document.createElement('section');
    section.className = 'tree-knowledge-section';
    section.setAttribute('aria-labelledby', 'tree-knowledge-title');
    section.innerHTML = `
      <div class="knowledge-copy">
        <p class="eyebrow">Know Your Tree</p>
        <h2 id="tree-knowledge-title">Simple names help you show us exactly what changed.</h2>
        <p>You do not have to become an arborist. Knowing which part of the tree changed gives Arborwise a better starting point before we arrive.</p>
        <div class="tree-part-buttons" role="tablist" aria-label="Tree parts">
          <button type="button" class="active" data-part="canopy">Canopy</button>
          <button type="button" data-part="leader">Leader</button>
          <button type="button" data-part="scaffold">Scaffold limb</button>
          <button type="button" data-part="collar">Branch collar</button>
          <button type="button" data-part="flare">Trunk flare</button>
          <button type="button" data-part="rootzone">Root zone</button>
        </div>
        <div class="tree-part-answer" aria-live="polite"><strong>Canopy</strong><p>The complete crown of leaves and branches. Thinning, uneven color, dead areas, and sudden changes across the canopy give different clues than one damaged leaf.</p></div>
      </div>
      <div class="tree-photo-panel">
        <div class="tree-photo-grid">
          <figure><img src="${assets.youngBefore}" alt="Young North Texas tree and the soil around its trunk before care" loading="lazy"><figcaption>Look at the trunk base, surrounding soil, mulch, and visible root area.</figcaption></figure>
          <figure><img src="${assets.youngAfter}" alt="Young North Texas tree after Arborwise planting-area care" loading="lazy"><figcaption>Photograph the whole tree as well as the area where the trunk meets the ground.</figcaption></figure>
        </div>
        <div class="annie-reminder"><img src="${assets.annie}" alt="Annie, the Arborwise owl"><p><strong>Annie’s reminder:</strong> roots usually extend well beyond the trunk and often beyond the drip line. What happens to the soil matters to the whole tree.</p></div>
      </div>`;
    concernSection.insertAdjacentElement('afterend', section);

    const parts = {
      canopy: ['Canopy', 'The complete crown of leaves and branches. Thinning, uneven color, dead areas, and sudden changes across the canopy give different clues than one damaged leaf.'],
      leader: ['Leader', 'The main upright stem guiding the tree’s height and structure. Competing leaders can create weak unions and future splitting problems.'],
      scaffold: ['Scaffold limb', 'A major permanent branch forming the tree’s framework. Strong spacing and attachments matter more than simply making the tree smaller.'],
      collar: ['Branch collar', 'The slightly swollen area where a branch joins the trunk or a larger limb. Proper pruning cuts protect this area instead of cutting flush into the trunk.'],
      flare: ['Trunk flare', 'The widening base where the trunk transitions into roots. A buried flare can hide planting-depth, moisture, girdling-root, and decay problems.'],
      rootzone: ['Root zone', 'The living soil area supporting the tree. Compaction, trenching, grade changes, drought, drainage, and construction can affect the canopy long after the damage begins.']
    };
    section.querySelectorAll('.tree-part-buttons button').forEach(button => {
      button.addEventListener('click', () => {
        section.querySelectorAll('.tree-part-buttons button').forEach(item => item.classList.toggle('active', item === button));
        const [name, copy] = parts[button.dataset.part];
        section.querySelector('.tree-part-answer').innerHTML = `<strong>${name}</strong><p>${copy}</p>`;
      });
    });
  }

  const services = document.querySelector('.services-section');
  if (services && !document.querySelector('.proper-pruning-section')) {
    const pruning = document.createElement('section');
    pruning.className = 'proper-pruning-section';
    pruning.innerHTML = `
      <div class="proper-pruning-image"><img src="${assets.pruning}" alt="Arborwise climber positioned for selective pruning in a mature canopy" loading="lazy"></div>
      <div class="proper-pruning-copy">
        <p class="eyebrow">Master-Level Pruning</p>
        <h2>Proper pruning is planned—not random branch removal.</h2>
        <p>A well-pruned tree still looks like its species. The work removes dead or diseased wood, corrects crossing and rubbing branches, improves needed clearance, protects strong structure, and places every cut correctly.</p>
        <p><strong>The goal is not fewer branches. The goal is a safer, stronger, better-structured tree.</strong></p>
        <a class="button primary" href="#estimate">Have Arborwise evaluate your trees</a>
      </div>`;
    services.insertAdjacentElement('afterend', pruning);
  }

  const style = document.createElement('style');
  style.id = 'customer-view-upgrade-styles';
  style.textContent = `
    :root{--forest:#083d2d;--forest-2:#052c20;--leaf:#3f8f4f;--lime:#d1f06f;--cream:#fbf7ea;--paper:#fffdf7;--ink:#102d23;--muted:#52675d;--gold:#e2a63d;--line:#d8e2d7;--shadow:0 22px 58px rgba(8,61,45,.18)}
    .site-header{background:rgba(251,247,234,.97);border-bottom:1px solid rgba(8,61,45,.16)}
    .header-inner{display:grid;grid-template-columns:1fr minmax(230px,360px) 1fr;grid-template-areas:"nav brand actions";align-items:center;gap:24px;min-height:112px;padding-top:10px;padding-bottom:10px}
    .brand{grid-area:brand;justify-self:center;display:block;text-align:center;width:min(330px,30vw)}
    .brand img{display:block;width:100%;height:92px;object-fit:contain;object-position:center;margin:auto;filter:drop-shadow(0 8px 14px rgba(8,61,45,.12))}
    .desktop-nav{grid-area:nav;justify-self:start}.quick-actions{grid-area:actions;justify-self:end}
    .eyebrow{font-size:clamp(.92rem,1.25vw,1.08rem);line-height:1.25;letter-spacing:.12em;font-weight:950;color:var(--leaf);margin-bottom:13px}
    h2{font-size:clamp(2.15rem,3.7vw,3.55rem);line-height:1.06}
    .hero{padding-top:34px;gap:24px}
    .hero-copy{background:linear-gradient(145deg,#062f23 0%,#0a5039 72%,#17684b 100%);box-shadow:var(--shadow);border:1px solid rgba(209,240,111,.14)}
    .hero-copy .eyebrow{display:inline-flex;align-self:flex-start;padding:9px 14px;border-radius:999px;background:var(--lime);color:var(--forest-2);font-size:.87rem;letter-spacing:.08em;margin-bottom:22px}
    .hero-copy h1{font-size:clamp(2.65rem,5vw,4.9rem);line-height:1.01;max-width:11.5ch;text-wrap:balance}
    .hero-lead{color:#edf6f1;font-size:clamp(1.05rem,1.55vw,1.25rem);max-width:650px}
    .hero-buttons{gap:14px}.hero-buttons .button{min-height:58px;padding-inline:24px}
    .hero-promise{margin:24px 0 0;padding:17px 19px;border:1px solid rgba(209,240,111,.5);border-left:6px solid var(--lime);border-radius:16px;background:rgba(255,255,255,.1);color:white;max-width:680px;display:flex;flex-direction:column;gap:3px}
    .hero-promise strong{font-family:var(--serif);font-size:1.42rem;color:var(--lime)}.hero-promise span{color:#eef7f2;font-weight:700}
    .hero-photo{background:#0b4a35}.hero-photo img{object-position:center 58%}
    .local-trust{padding-top:64px!important;gap:48px!important}.local-trust-intro .eyebrow{font-size:1.05rem}.local-trust-intro h2{font-size:clamp(2.1rem,3.4vw,3.25rem)!important;line-height:1.08}
    .recognition-card.graphic-card{min-height:184px!important;padding:19px!important;grid-template-columns:138px 1fr!important;gap:20px!important}.recognition-visual{width:138px!important;height:138px!important}.recognition-logo,.nextdoor-badge{max-width:132px!important;max-height:132px!important}
    .recognition-copy strong{font-size:1.05rem!important}.recognition-copy>span{font-size:.8rem!important}
    .annie-section{margin-top:24px;margin-bottom:34px}.annie-inner{background:linear-gradient(120deg,#f4edda,#fffdf7);border:2px solid #e5d8b9}.annie{object-fit:contain;filter:drop-shadow(0 18px 18px rgba(8,61,45,.17))}.annie-quote .eyebrow{font-size:1rem}.annie-quote blockquote{color:var(--forest-2)}
    .concern-section{padding-top:84px}.concern-section .section-heading{max-width:980px}.concern-section .section-heading .eyebrow{font-size:1.1rem}.concern-section .section-heading h2{font-size:clamp(2.55rem,4.4vw,4rem);margin-bottom:16px}.concern-section .section-heading>p:last-child{max-width:820px;margin-left:auto;margin-right:auto}
    .concern-grid{gap:22px}.concern-card{border:2px solid #d5e1d4;box-shadow:0 13px 34px rgba(8,61,45,.09)}.concern-card:hover,.concern-card:focus-visible{border-color:var(--lime);box-shadow:0 22px 50px rgba(8,61,45,.18)}
    .concern-image{height:245px;background-color:#dfe9dc!important;background-repeat:no-repeat!important}.concern-copy{padding:24px;min-height:270px}.concern-copy strong{font-size:1.45rem}.concern-copy small{font-size:.96rem}.card-link{color:#0a5c3e}
    .tree-knowledge-section{max-width:1376px;margin:0 auto 82px;padding:58px;background:linear-gradient(135deg,#f8f1dc,#e1f0db);border:2px solid #d1e0cc;border-radius:36px;display:grid;grid-template-columns:.95fr 1.05fr;gap:52px;align-items:center;box-shadow:0 16px 42px rgba(8,61,45,.09)}
    .tree-knowledge-section .eyebrow{font-size:1.08rem}.tree-knowledge-section h2{font-size:clamp(2.2rem,3.5vw,3.35rem)}.knowledge-copy>p:not(.eyebrow){color:var(--muted);font-size:1.05rem}
    .tree-part-buttons{display:flex;flex-wrap:wrap;gap:10px;margin:26px 0 17px;padding:4px}.tree-part-buttons button{border:2px solid #abc4ad;background:#fff;color:var(--forest);border-radius:999px;padding:11px 15px;font-weight:900;cursor:pointer}.tree-part-buttons button:hover,.tree-part-buttons button:focus-visible{border-color:var(--forest);box-shadow:0 0 0 4px rgba(209,240,111,.38)}.tree-part-buttons button.active{background:var(--forest);color:white;border-color:var(--forest)}
    .tree-part-answer{background:white;border:1px solid #cbd9c9;border-radius:20px;padding:21px 23px;min-height:136px}.tree-part-answer strong{font-family:var(--serif);font-size:1.42rem;color:var(--forest)}.tree-part-answer p{margin:7px 0 0;color:var(--muted)}
    .tree-photo-panel{background:white;border-radius:28px;padding:17px;box-shadow:0 16px 38px rgba(8,61,45,.12)}.tree-photo-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.tree-photo-grid figure{margin:0;border-radius:20px;overflow:hidden;background:#f2f4ee}.tree-photo-grid img{width:100%;height:330px;object-fit:cover}.tree-photo-grid figcaption{padding:13px 14px;color:var(--muted);font-size:.88rem;line-height:1.4}
    .annie-reminder{margin-top:13px;display:grid;grid-template-columns:82px 1fr;gap:13px;align-items:center;padding:13px 15px;border-radius:18px;background:#fff2c9;border:1px solid #ead18b}.annie-reminder img{width:82px;height:82px;object-fit:contain}.annie-reminder p{margin:0;color:#3c4f45}
    .decision-shell{background:linear-gradient(135deg,#062f23,#0b5c40)!important;border:1px solid rgba(209,240,111,.2)}.decision-copy .eyebrow,.why-visit .eyebrow,.proper-pruning-copy .eyebrow,.expertise-heading .eyebrow,.care-statement .eyebrow{font-size:1.02rem!important}.decision-copy h2,.why-visit h2{font-size:clamp(2.15rem,3.6vw,3.45rem)!important}
    .quick-check{padding:32px!important;border:2px solid #d9e3d7}.check-question{padding:22px 3px!important}.check-options{gap:11px!important;padding:2px}.check-options span{min-height:48px!important;padding:11px 17px!important;border:2px solid #aebfaf!important;background:#fff!important;color:#083d2d!important}.check-options input:checked+span{background:var(--forest)!important;color:#fff!important;border-color:var(--forest)!important}.check-options input:focus-visible+span{outline:4px solid rgba(209,240,111,.65)!important}
    .why-visit{padding-top:90px!important}.why-visit .section-heading{max-width:960px}.why-visit-card{border:2px solid #d8e3d6!important;box-shadow:0 12px 30px rgba(8,61,45,.07)}
    .proper-pruning-section{max-width:1376px;margin:0 auto 86px;padding:0 32px;display:grid;grid-template-columns:1fr 1fr;gap:50px;align-items:center}.proper-pruning-image{background:#e3efdd;border-radius:30px;padding:14px;box-shadow:var(--shadow)}.proper-pruning-image img{display:block;width:100%;height:520px;object-fit:cover;border-radius:21px}.proper-pruning-copy p{color:var(--muted)}.proper-pruning-copy strong{color:var(--forest)}
    .expertise-heading{align-items:center!important}.expertise-heading h2{font-size:clamp(2.15rem,3.6vw,3.5rem)!important}.care-statement{background:linear-gradient(135deg,#062f23,#0b5c40)!important;border:1px solid rgba(209,240,111,.22)}.care-statement img{object-fit:contain!important}
    .button.primary{background:var(--lime);color:var(--forest-2);box-shadow:0 8px 20px rgba(5,44,32,.12)}.button.primary:hover,.button.primary:focus-visible{box-shadow:0 12px 26px rgba(5,44,32,.22)}
    @media(max-width:1100px){.header-inner{grid-template-columns:1fr auto;grid-template-areas:"brand actions" "nav nav"}.brand{justify-self:start;width:260px}.desktop-nav{justify-self:center}.tree-knowledge-section,.proper-pruning-section{grid-template-columns:1fr}.recognition-card.graphic-card{grid-template-columns:118px 1fr!important}.recognition-visual{width:118px!important;height:118px!important}}
    @media(max-width:720px){
      .site-header{padding:6px 0}.header-inner{display:grid;grid-template-columns:1fr;grid-template-areas:"brand";min-height:102px;padding:7px 14px}.brand{justify-self:center;width:min(278px,84vw)}.brand img{height:86px}.desktop-nav,.quick-actions{display:none!important}
      .hero{padding-top:18px;text-align:center}.hero-copy{align-items:center;padding:35px 22px}.hero-copy .eyebrow{align-self:center;font-size:.78rem;line-height:1.35;white-space:normal}.hero-copy h1{font-size:clamp(2.25rem,10.5vw,3.2rem);line-height:1.01;max-width:12ch}.hero-lead{font-size:1rem}.hero-buttons{justify-content:center;width:100%}.hero-promise{text-align:left;margin-left:auto;margin-right:auto;width:100%}.hero-photo{max-height:420px}.hero-photo img{height:420px;object-fit:cover}
      .eyebrow{font-size:.92rem}.local-trust{padding-top:46px!important;gap:24px!important}.local-trust-intro{text-align:center}.local-trust-intro h2{font-size:2.25rem!important}.recognition-grid{grid-template-columns:1fr!important}.recognition-card.graphic-card{min-height:150px!important;grid-template-columns:118px 1fr!important;grid-template-rows:1fr!important;padding:14px!important;text-align:left!important}.recognition-visual{width:118px!important;height:118px!important}.recognition-copy strong{font-size:.96rem!important}
      .annie-section{margin:10px 14px 30px}.annie-inner{grid-template-columns:118px 1fr!important;gap:15px!important;padding:20px!important;overflow:hidden!important}.annie{width:118px!important;height:128px!important}.annie-quote{text-align:left;padding:5px!important}.annie-quote blockquote{font-size:1.12rem;line-height:1.4}.annie-quote .eyebrow{font-size:.78rem}
      .concern-section{padding-top:66px}.concern-section .section-heading{text-align:center}.concern-section .section-heading .eyebrow{font-size:1rem}.concern-section .section-heading h2{font-size:2.55rem}.concern-grid{gap:16px}.concern-image{height:230px}.concern-copy{min-height:0;padding:22px}.concern-copy strong{font-size:1.38rem}
      .tree-knowledge-section{margin:0 14px 62px;padding:30px 20px;border-radius:28px;gap:25px}.tree-knowledge-section h2{font-size:2.25rem}.tree-part-buttons{display:grid;grid-template-columns:1fr 1fr;gap:9px}.tree-part-buttons button{font-size:.82rem;padding:10px 8px}.tree-part-answer{min-height:160px}.tree-photo-grid{grid-template-columns:1fr}.tree-photo-grid img{height:300px}.annie-reminder{grid-template-columns:72px 1fr}.annie-reminder img{width:72px;height:72px}
      .decision-shell{padding:35px 20px!important}.quick-check{padding:23px 18px!important}.check-question{padding:21px 0!important}.check-options{display:grid!important;grid-template-columns:1fr!important;gap:10px!important}.check-options label,.check-options span{width:100%!important}.check-options span{justify-content:center;text-align:center;padding:12px 14px!important}
      .why-visit{padding-top:66px!important}.why-visit .section-heading{text-align:center}.proper-pruning-section{margin-bottom:64px;padding:0 14px;gap:27px}.proper-pruning-image{padding:10px;border-radius:24px}.proper-pruning-image img{height:350px}.proper-pruning-copy{text-align:center}.proper-pruning-copy h2{font-size:2.25rem}.proper-pruning-copy .button{width:100%}
    }
    @media(max-width:430px){.brand{width:min(248px,82vw)}.brand img{height:80px}.hero-copy h1{font-size:2.25rem}.recognition-card.graphic-card{grid-template-columns:104px 1fr!important}.recognition-visual{width:104px!important;height:104px!important}.annie-inner{grid-template-columns:92px 1fr!important}.annie{width:92px!important;height:106px!important}.tree-part-buttons{grid-template-columns:1fr}}
  `;
  document.head.appendChild(style);
})();
