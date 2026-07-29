(() => {
  if (window.__arborwiseCustomerViewApplied) return;
  window.__arborwiseCustomerViewApplied = true;

  const driveImage = (id, width = 1400) => `https://drive.google.com/thumbnail?id=${id}&sz=w${width}`;
  const assets = {
    logo: driveImage('1K5D5MbFyns96X7UkrtmsSfulNz4ODO9I', 900),
    annie: driveImage('1cuJhbwdER-gaZHWwUEuwkiOpgRulifOQ', 700),
    climber: driveImage('1WxgSebPqu09pGGgfiNygDv0aZk4uvl1m', 1600),
    leaves: driveImage('1MtFeuIGsB-EmtcuMSuA_PwXPDjCunX0J', 1200),
    canopy: driveImage('100Pi8AABqnMLdH4Tkwsk8WUe7IhFzFJj', 1200),
    pruning: driveImage('1GWpDHJmfiO4_8viOKIYnZGloOfazSC0T', 1200)
  };

  const svgData = svg => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  assets.trunk = svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650"><defs><linearGradient id="b" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#a66b35"/><stop offset="1" stop-color="#4b2c18"/></linearGradient></defs><rect width="900" height="650" fill="#e8f1df"/><path d="M320 650C350 520 345 410 350 300C355 175 390 70 440 0H610C655 100 670 225 652 360C638 480 665 565 710 650Z" fill="url(#b)"/><path d="M505 90c-44 78-17 132-62 203 74-27 108 34 77 100 58-22 90 31 58 90" fill="none" stroke="#1d130c" stroke-width="29" stroke-linecap="round"/><ellipse cx="625" cy="528" rx="63" ry="29" fill="#d49135"/><ellipse cx="690" cy="574" rx="43" ry="21" fill="#bd7327"/><path d="M330 620c-90 8-145 10-225 30M692 620c85 8 145 8 205 30" stroke="#6f4c2b" stroke-width="28" stroke-linecap="round"/><text x="45" y="75" font-family="Arial" font-size="39" font-weight="700" fill="#123f2f">Cracks, cavities, loose bark or mushrooms</text></svg>`);
  assets.lean = svgData(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 650"><rect width="900" height="650" fill="#dcecf1"/><path d="M0 520Q220 470 450 520T900 500V650H0Z" fill="#90b26b"/><path d="M445 575C430 470 420 380 451 278C485 165 535 88 592 18" stroke="#6b4425" stroke-width="58" fill="none" stroke-linecap="round"/><circle cx="575" cy="92" r="118" fill="#6f9d47"/><path d="M445 548c-62 4-105 30-160 73M455 550c57 4 108 29 160 72" stroke="#6b4425" stroke-width="31" stroke-linecap="round"/><path d="M278 564q62-52 137-18M640 566q-72-56-145-19" stroke="#5b7a3e" stroke-width="9" fill="none" stroke-dasharray="14 12"/><text x="45" y="75" font-family="Arial" font-size="39" font-weight="700" fill="#123f2f">New lean, exposed roots or moving soil</text></svg>`);

  const replaceImage = (selector, src, alt) => {
    document.querySelectorAll(selector).forEach(img => {
      img.src = src;
      if (alt) img.alt = alt;
      img.referrerPolicy = 'no-referrer';
    });
  };

  replaceImage('.brand img, .footer-brand img', assets.logo, 'Arborwise Tree Care — Nurture Your Nature');
  replaceImage('.annie, .annie-mini img, .care-statement img', assets.annie, 'Annie, the friendly Arborwise owl');
  replaceImage('.hero-photo img', assets.climber, 'An Arborwise climber working in a North Texas tree');
  replaceImage('.proof-grid figure:first-child img', assets.canopy, 'A North Texas tree showing visible canopy decline');

  const heroEyebrow = document.querySelector('.hero-copy .eyebrow');
  const heroTitle = document.getElementById('hero-title');
  const heroLead = document.querySelector('.hero-lead');
  if (heroEyebrow) heroEyebrow.textContent = 'Nurture Your Nature';
  if (heroTitle) heroTitle.textContent = 'Your trees have questions. Arborwise has answers.';
  if (heroLead) heroLead.textContent = 'Greg, Brandon, and the whole Arborwise team help North Texas homeowners, businesses, HOAs, and property managers understand their trees and choose the right work—not simply the biggest job.';

  const heroButtons = document.querySelector('.hero-buttons');
  if (heroButtons && !document.querySelector('.hero-promise')) {
    heroButtons.insertAdjacentHTML('afterend', `<p class="hero-promise"><strong>Nurture Your Nature:</strong> understand the tree, protect the property, and do the work correctly.</p>`);
  }

  const concernVisuals = {
    leaves: assets.leaves,
    canopy: assets.canopy,
    trunk: assets.trunk,
    lean: assets.lean
  };
  const concernSmall = {
    leaves: 'It could be many different things—including water stress, roots, insects, disease, weather, or normal seasonal change.',
    canopy: 'It could involve roots, drought, disease, storm injury, structural problems, age, or several conditions working together.',
    trunk: 'It could be an old wound, active decay, fungal activity, impact damage, or a structural defect that needs context.',
    lean: 'It could involve root-plate movement, saturated soil, erosion, construction damage, planting problems, or storm forces.'
  };
  document.querySelectorAll('.concern-card').forEach(card => {
    const key = card.dataset.concern;
    const visual = card.querySelector('.concern-image');
    const small = card.querySelector('small');
    if (visual && concernVisuals[key]) {
      visual.style.backgroundImage = `linear-gradient(180deg,rgba(18,63,47,0) 52%,rgba(18,63,47,.17)),url("${concernVisuals[key]}")`;
      visual.style.backgroundSize = 'cover';
      visual.style.backgroundPosition = key === 'leaves' ? '72% center' : 'center';
    }
    if (small && concernSmall[key]) small.textContent = concernSmall[key];
  });

  const localTrust = document.querySelector('.local-trust');
  const annieSection = document.querySelector('.annie-section');
  if (localTrust && annieSection) localTrust.insertAdjacentElement('afterend', annieSection);
  const annieQuote = document.getElementById('annieQuote');
  if (annieQuote) annieQuote.textContent = '“You do not need to know the diagnosis before you call. Start by showing us what changed. The pattern usually tells us where to look next.”';

  const concernSection = document.querySelector('.concern-section');
  if (concernSection && !document.querySelector('.tree-knowledge-section')) {
    const section = document.createElement('section');
    section.className = 'tree-knowledge-section';
    section.setAttribute('aria-labelledby', 'tree-knowledge-title');
    section.innerHTML = `
      <div class="knowledge-copy">
        <p class="eyebrow">Know your tree</p>
        <h2 id="tree-knowledge-title">The names are simple. Knowing them helps you ask better questions.</h2>
        <p>You do not have to become an arborist. But knowing which part changed helps Arborwise understand what you are seeing before we arrive.</p>
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
      <div class="tree-diagram" aria-label="Simple labeled tree anatomy diagram">
        <svg viewBox="0 0 650 650" role="img" aria-labelledby="treeDiagramTitle">
          <title id="treeDiagramTitle">Tree anatomy: canopy, leader, scaffold limbs, branch collar, trunk flare, and root zone</title>
          <ellipse cx="325" cy="580" rx="285" ry="52" fill="#d7e7c8"/>
          <path d="M278 570C300 470 300 365 290 260h70c-8 105-5 210 22 310Z" fill="#80502c"/>
          <path d="M326 285V80M320 250L210 170M335 235L450 150M303 335L170 290M347 320L490 275" stroke="#80502c" stroke-width="28" stroke-linecap="round"/>
          <g fill="#6d9a46"><circle cx="325" cy="130" r="115"/><circle cx="215" cy="205" r="105"/><circle cx="445" cy="195" r="112"/><circle cx="155" cy="310" r="85"/><circle cx="505" cy="300" r="92"/><circle cx="330" cy="280" r="125"/></g>
          <path d="M277 565c-85 8-150 24-225 62M382 565c82 8 145 24 220 62" stroke="#80502c" stroke-width="24" stroke-linecap="round"/>
          <g fill="#f4c44e" stroke="#123f2f" stroke-width="5"><circle cx="326" cy="75" r="13"/><circle cx="455" cy="150" r="13"/><circle cx="365" cy="252" r="13"/><circle cx="330" cy="548" r="13"/><circle cx="190" cy="605" r="13"/><circle cx="210" cy="175" r="13"/></g>
        </svg>
        <p><strong>Annie’s reminder:</strong> the roots usually extend well beyond the trunk and often beyond the drip line. What happens to the soil matters to the tree.</p>
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
      <div class="proper-pruning-image"><img src="${assets.pruning}" alt="Arborwise educational guide showing the goals of proper tree pruning" loading="lazy" referrerpolicy="no-referrer"></div>
      <div class="proper-pruning-copy">
        <p class="eyebrow">Master-level pruning</p>
        <h2>Proper pruning is not “cut some branches off.”</h2>
        <p>A well-pruned tree still looks like its species. The work removes dead or diseased wood, corrects crossing and rubbing branches, improves clearance where needed, protects strong structure, and uses clean cuts in the right locations.</p>
        <p><strong>The goal is not fewer branches. The goal is a safer, stronger, better-structured tree.</strong></p>
        <a class="button primary" href="#estimate">Have Arborwise evaluate your trees</a>
      </div>`;
    services.insertAdjacentElement('afterend', pruning);
  }

  const style = document.createElement('style');
  style.id = 'customer-view-upgrade-styles';
  style.textContent = `
    .header-inner{display:grid;grid-template-columns:1fr minmax(230px,330px) 1fr;grid-template-areas:"nav brand actions";align-items:center;gap:20px}
    .brand{grid-area:brand;justify-self:center;display:block;text-align:center}.brand img{display:block;width:min(100%,320px);height:auto;object-fit:contain;margin:auto}
    .desktop-nav{grid-area:nav;justify-self:start}.quick-actions{grid-area:actions;justify-self:end}
    .hero-promise{margin:18px 0 0;padding-left:15px;border-left:4px solid var(--lime);color:#405349;font-size:.93rem;max-width:650px}
    .hero-photo img{object-position:center}.annie-section{margin-top:18px;margin-bottom:22px}.annie-inner{align-items:center}.annie{object-fit:contain}
    .concern-image{background-color:#e7efe0!important;background-repeat:no-repeat!important}
    .tree-knowledge-section{max-width:1376px;margin:0 auto 76px;padding:52px 58px;background:linear-gradient(135deg,#f6f3e7,#e7f0df);border:1px solid var(--line);border-radius:34px;display:grid;grid-template-columns:1.05fr .95fr;gap:50px;align-items:center}
    .knowledge-copy>p:not(.eyebrow){color:var(--muted);font-size:1.04rem}.tree-part-buttons{display:flex;flex-wrap:wrap;gap:8px;margin:24px 0 15px}.tree-part-buttons button{border:1px solid #bfcdb8;background:white;color:var(--forest);border-radius:999px;padding:10px 13px;font-weight:850;cursor:pointer}.tree-part-buttons button.active{background:var(--forest);color:white;border-color:var(--forest)}
    .tree-part-answer{background:white;border:1px solid #d2ddcc;border-radius:20px;padding:19px 21px;min-height:130px}.tree-part-answer strong{font-family:var(--serif);font-size:1.35rem;color:var(--forest)}.tree-part-answer p{margin:7px 0 0;color:var(--muted)}
    .tree-diagram{background:white;border-radius:26px;padding:18px 22px 22px;text-align:center;box-shadow:0 14px 35px rgba(18,63,47,.08)}.tree-diagram svg{display:block;width:100%;max-height:430px}.tree-diagram p{margin:5px auto 0;color:#405349;font-size:.9rem;max-width:480px}
    .proper-pruning-section{max-width:1376px;margin:0 auto 82px;padding:0 32px;display:grid;grid-template-columns:.9fr 1.1fr;gap:48px;align-items:center}.proper-pruning-image{background:#e8f1df;border-radius:30px;padding:16px;box-shadow:var(--shadow)}.proper-pruning-image img{display:block;width:100%;max-height:620px;object-fit:contain;border-radius:20px}.proper-pruning-copy p{color:var(--muted)}.proper-pruning-copy strong{color:var(--forest)}
    @media(max-width:1100px){.header-inner{grid-template-columns:1fr auto;grid-template-areas:"brand actions" "nav nav"}.brand{justify-self:start}.desktop-nav{justify-self:center}.tree-knowledge-section,.proper-pruning-section{grid-template-columns:1fr}}
    @media(max-width:720px){
      .site-header{padding:8px 0}.header-inner{display:grid;grid-template-columns:1fr auto 1fr;grid-template-areas:". brand actions";padding:0 12px;gap:8px}.brand{justify-self:center}.brand img{width:210px;max-height:118px}.desktop-nav{display:none}.quick-actions{justify-self:end;gap:4px}.quick-actions a{width:40px;height:40px;min-height:40px;padding:0;border-radius:50%;display:grid;place-items:center}.quick-actions a span:last-child{display:none}.quick-actions .action-icon{font-size:1rem}
      .hero{padding-top:28px;text-align:center}.hero-copy{align-items:center}.hero-copy .eyebrow{font-size:.8rem}.hero-copy h1{font-size:clamp(2.25rem,11vw,3.35rem);line-height:.98}.hero-lead{font-size:1rem}.hero-buttons{justify-content:center}.hero-promise{text-align:left;margin-left:auto;margin-right:auto}.hero-photo{max-height:390px}.hero-photo img{height:390px;object-fit:cover}
      .local-trust{padding-top:28px!important}.local-trust-intro{text-align:center}.local-trust-intro h2{font-size:1.85rem!important}.recognition-grid{grid-template-columns:1fr 1fr!important}.recognition-card.graphic-card{min-height:170px!important;grid-template-columns:1fr!important;grid-template-rows:92px auto!important;padding:10px!important;text-align:center!important}.recognition-visual{width:90px!important;height:90px!important}.recognition-copy strong{font-size:.79rem!important}.recognition-copy>span{font-size:.62rem!important}
      .annie-section{margin:8px 14px 26px}.annie-inner{grid-template-columns:92px 1fr!important;gap:14px!important;padding:18px!important}.annie{width:92px!important;height:105px!important;align-self:center}.annie-quote{text-align:left}.annie-quote blockquote{font-size:1rem;line-height:1.35}.annie-quote .eyebrow{font-size:.68rem}
      .concern-grid{gap:13px}.concern-card{border-radius:23px}.concern-image{min-height:190px}.concern-copy{padding:20px}.concern-copy strong{font-size:1.23rem}.concern-copy small{font-size:.88rem;line-height:1.45}
      .tree-knowledge-section{margin:0 14px 58px;padding:29px 20px;border-radius:27px;gap:22px}.tree-knowledge-section h2{font-size:2rem}.tree-part-buttons{display:grid;grid-template-columns:1fr 1fr}.tree-part-buttons button{font-size:.8rem;padding:9px 8px}.tree-part-answer{min-height:158px}.tree-diagram{padding:10px 12px 17px}.tree-diagram svg{max-height:320px}
      .proper-pruning-section{margin-bottom:60px;padding:0 14px;gap:25px}.proper-pruning-image{padding:10px;border-radius:24px}.proper-pruning-copy{text-align:center}.proper-pruning-copy h2{font-size:2rem}.proper-pruning-copy .button{width:100%}
    }
    @media(max-width:430px){.brand img{width:180px}.quick-actions a:not(:first-child):not(.estimate-action){display:none}.recognition-grid{gap:8px!important}.recognition-card.graphic-card{min-height:155px!important}.annie-inner{grid-template-columns:78px 1fr!important}.annie{width:78px!important;height:92px!important}}
  `;
  document.head.appendChild(style);
})();