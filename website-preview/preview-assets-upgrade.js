(() => {
  if (window.__arborwiseFinalPolish) return;
  window.__arborwiseFinalPolish = true;

  const A = {
    logo: 'assets/logo.webp',
    annie: 'assets/annie.webp',
    hero: 'assets/hero-climber.webp',
    pruning: 'assets/photo-guide/selective-pruning.webp',
    removal: 'assets/photo-guide/controlled-removal.webp',
    decline: 'assets/declining-tree.webp',
    healthy: 'assets/healthy-tree.webp',
    roots: 'assets/young-tree-before.webp',
    youngAfter: 'assets/young-tree-after.webp',
    vanAlstyne: 'assets/van-alstyne-chamber.svg'
  };

  const setImage = (selector, src, alt) => {
    document.querySelectorAll(selector).forEach(img => {
      if (!(img instanceof HTMLImageElement)) return;
      img.src = src;
      img.onerror = null;
      img.removeAttribute('referrerpolicy');
      if (alt !== undefined) img.alt = alt;
    });
  };

  const setText = (selector, text) => {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
  };

  const addCardPhoto = (selector, src, alt) => {
    const card = document.querySelector(selector);
    if (!card || card.querySelector('.final-card-photo')) return;
    const img = document.createElement('img');
    img.className = 'final-card-photo';
    img.src = src;
    img.alt = alt;
    img.loading = 'lazy';
    card.prepend(img);
  };

  const apply = () => {
    document.querySelectorAll('.brand-wordmark').forEach(wordmark => {
      const img = document.createElement('img');
      img.src = A.logo;
      img.alt = 'Arborwise — Nurture Your Nature';
      wordmark.replaceWith(img);
    });
    setImage('.brand img, .footer-brand img', A.logo, 'Arborwise — Nurture Your Nature');

    document.querySelectorAll('.annie-fallback').forEach(fallback => {
      const img = document.createElement('img');
      img.className = fallback.closest('.annie-inner') ? 'annie' : 'annie-mini-image';
      img.src = A.annie;
      img.alt = 'Annie, the nurturing Arborwise owl with an A on her chest';
      fallback.replaceWith(img);
    });
    setImage('img.annie, .annie-mini img, .care-statement img, .annie-reminder img', A.annie, 'Annie, the nurturing Arborwise owl with an A on her chest');
    setImage('.hero-photo > img', A.hero, 'An Arborwise climber working high in a North Texas tree');
    document.querySelector('.hero-photo')?.classList.remove('asset-fallback');

    setText('.hero-copy .eyebrow', 'Your Premier North Texas Tree Service Provider');
    setText('#hero-title', 'Understand the tree. Protect the property. Do the work correctly.');
    setText('.hero-lead', 'Greg, Brandon, and the Arborwise team help North Texas homeowners, businesses, HOAs, and property managers understand what is happening, choose the right work, and protect the property without pressure or guesswork.');
    const promise = document.querySelector('.hero-promise');
    if (promise) promise.innerHTML = '<strong>Nurture Your Nature.</strong><span>Honest answers. Skilled work. Every recommendation has a reason.</span>';

    setText('.local-trust-intro .eyebrow', 'Trusted in the Communities We Serve');
    setText('.local-trust-intro h2', 'Local membership. Neighbor recognition. Real accountability.');
    setText('.concern-section .section-heading .eyebrow', 'North Texas Tree Concern Checker');
    setText('#concern-title', 'What are you seeing?');
    setText('.tree-knowledge-section .eyebrow', 'Know Your Tree');
    setText('.decision-copy .eyebrow', 'Recognition Is the Beginning');
    setText('.why-visit .eyebrow', 'Why the Visit Still Matters');

    document.querySelectorAll('.recognition-logo').forEach(img => {
      if (/van alstyne/i.test(img.alt || '') || img.classList.contains('van-alstyne-logo')) {
        img.src = A.vanAlstyne;
        img.alt = 'Van Alstyne Chamber of Commerce';
      }
    });

    const concerns = {
      leaves: [A.pruning, 'Arborwise selective pruning in a leafy North Texas canopy', 'center 42%'],
      canopy: [A.decline, 'A North Texas tree showing visible canopy decline', 'center 38%'],
      trunk: [A.removal, 'Real Arborwise work around a mature tree trunk', 'center 52%'],
      lean: [A.roots, 'A young tree and the soil around its trunk base', 'center 70%']
    };
    document.querySelectorAll('.concern-card').forEach(card => {
      const data = concerns[card.dataset.concern];
      const visual = card.querySelector('.concern-image');
      if (!data || !visual) return;
      visual.style.backgroundImage = `linear-gradient(180deg,rgba(3,35,25,0) 46%,rgba(3,35,25,.54)),url("${data[0]}")`;
      visual.style.backgroundPosition = data[2];
      visual.style.backgroundSize = 'cover';
      visual.classList.remove('asset-fallback');
      visual.setAttribute('aria-label', data[1]);
    });

    const story = document.querySelector('.story-climber');
    if (story) story.style.backgroundImage = `url("${A.hero}")`;
    setImage('.proper-pruning-image img', A.pruning, 'Arborwise selective pruning in a mature canopy');
    setImage('.proof-grid figure:first-child img', A.removal, 'Arborwise controlled tree work near a North Texas home');
    setImage('.proof-grid figure:last-child img', A.healthy, 'A North Texas property after careful Arborwise tree care');

    const treePhotos = document.querySelectorAll('.tree-photo-grid img');
    if (treePhotos[0]) { treePhotos[0].src = A.roots; treePhotos[0].alt = 'Young tree and surrounding root-zone soil'; }
    if (treePhotos[1]) { treePhotos[1].src = A.youngAfter; treePhotos[1].alt = 'Young tree after Arborwise planting-area care'; }

    addCardPhoto('.pruning-card', A.pruning, 'Arborwise selective pruning work');
    addCardPhoto('.removal-card', A.removal, 'Arborwise controlled tree removal work');
    addCardPhoto('.management-card', A.healthy, 'A North Texas property cared for by Arborwise');

    const community = document.querySelector('.community-story .story-symbol');
    if (community && !community.querySelector('img')) {
      community.innerHTML = `<img class="story-brand-image" src="${A.annie}" alt="Annie, the Arborwise owl">`;
      community.classList.add('story-brand-panel');
    }
    const conservation = document.querySelector('.conservation-story .story-symbol');
    if (conservation) {
      conservation.textContent = '';
      conservation.classList.add('story-real-photo');
      conservation.style.backgroundImage = `url("${A.pruning}")`;
    }

    const visitTruth = document.querySelector('.visit-truth');
    if (visitTruth && !visitTruth.querySelector('.visit-annie')) {
      const img = document.createElement('img');
      img.className = 'visit-annie';
      img.src = A.annie;
      img.alt = '';
      img.setAttribute('aria-hidden', 'true');
      visitTruth.firstElementChild?.replaceWith(img);
    }

    document.querySelectorAll('body *').forEach(el => {
      if (!el.children.length && /real arborwise work photo unavailable|photo unavailable/i.test(el.textContent || '')) el.textContent = '';
    });
  };

  if (!document.getElementById('arborwise-final-polish-styles')) {
    const style = document.createElement('style');
    style.id = 'arborwise-final-polish-styles';
    style.textContent = `
      :root{--forest:#043d2d;--forest-2:#022b20;--leaf:#398c45;--lime:#d5f56f;--cream:#faf6e8;--paper:#fffef9;--ink:#102d23;--muted:#53675e;--line:#d5e1d5;--shadow:0 24px 65px rgba(4,61,45,.18)}
      body{background:radial-gradient(circle at 50% -260px,rgba(213,245,111,.2),transparent 520px),var(--cream)}
      .site-header{position:relative;background:rgba(255,254,249,.98);border-bottom:1px solid rgba(4,61,45,.16);box-shadow:0 10px 30px rgba(4,61,45,.06)}
      .header-inner{max-width:1440px;min-height:176px;padding:12px 32px 15px;display:grid;grid-template-columns:1fr auto 1fr;grid-template-areas:"brand brand brand" "nav spacer actions";gap:5px 24px;align-items:center}
      .brand{grid-area:brand;justify-self:center;width:min(500px,52vw);margin:0 auto;display:block}.brand img{width:100%;height:124px;object-fit:contain;object-position:center;filter:drop-shadow(0 10px 15px rgba(4,61,45,.12))}.desktop-nav{grid-area:nav;justify-self:start;margin:0}.quick-actions{grid-area:actions;justify-self:end}
      .eyebrow{font-size:clamp(.95rem,1.1vw,1.08rem);line-height:1.25;letter-spacing:.105em;font-weight:950;color:var(--leaf);margin-bottom:14px}h1,h2{letter-spacing:-.035em}
      .hero{padding-top:32px;gap:25px}.hero-copy{background:linear-gradient(145deg,#022b20 0%,#07593f 76%,#0a6a49 100%);border:1px solid rgba(213,245,111,.25);box-shadow:var(--shadow)}.hero-copy .eyebrow{display:inline-flex;align-self:flex-start;max-width:100%;padding:10px 15px;border-radius:999px;background:var(--lime);color:var(--forest-2);font-size:.88rem;letter-spacing:.075em;margin-bottom:23px}.hero-copy h1{font-size:clamp(2.7rem,4.8vw,4.9rem);line-height:1.01;max-width:12ch}.hero-lead{color:#f0f7f3}.hero-buttons{gap:14px}.hero-buttons .button{min-height:58px;padding-inline:25px}.hero-promise{margin-top:25px;padding:18px 20px;border:1px solid rgba(213,245,111,.65);border-left:7px solid var(--lime);border-radius:17px;background:rgba(255,255,255,.1);display:flex;flex-direction:column}.hero-promise strong{font-family:var(--serif);font-size:1.5rem;color:var(--lime)}.hero-promise span{color:#f2f8f5;font-weight:750}.hero-photo{box-shadow:var(--shadow)}
      .local-trust{padding-top:68px!important;gap:48px!important}.local-trust-intro .eyebrow{font-size:1.1rem!important}.local-trust-intro h2{font-size:clamp(2.25rem,3.4vw,3.3rem)!important;line-height:1.08;max-width:16ch}.recognition-card.graphic-card{min-height:190px!important;padding:20px!important;grid-template-columns:142px 1fr!important;gap:22px!important;border:2px solid #d7e2d5!important;box-shadow:0 14px 36px rgba(4,61,45,.09)!important}.recognition-visual{width:142px!important;height:142px!important}.recognition-logo,.nextdoor-badge{max-width:136px!important;max-height:136px!important}
      .annie-inner{border:2px solid #e2d4ae!important;background:linear-gradient(120deg,#fff0c8,#fffef9)!important}.annie{object-fit:contain!important}.annie-quote .eyebrow{font-size:1.04rem!important}.annie-quote blockquote{color:var(--forest-2)!important}
      .concern-section{padding-top:88px}.concern-section .section-heading .eyebrow{font-size:1.14rem}.concern-section .section-heading h2{font-size:clamp(2.6rem,4.2vw,4rem);margin-bottom:16px}.concern-section .section-heading>p:last-child{max-width:820px;margin-inline:auto}.concern-grid{gap:22px}.concern-card{border:2px solid #d5e1d3;box-shadow:0 14px 36px rgba(4,61,45,.09)}.concern-image{height:245px}.concern-copy{min-height:285px}.photo-instructions{background:linear-gradient(135deg,#022b20,#07593f);box-shadow:var(--shadow)}
      .tree-knowledge-section{background:linear-gradient(135deg,#fff0c4,#f9f7ec 50%,#dff0d7)!important;border:2px solid #cdddc7!important;box-shadow:0 20px 50px rgba(4,61,45,.11)!important}.tree-knowledge-section .eyebrow{font-size:1.12rem!important}.tree-knowledge-section h2{font-size:clamp(2.25rem,3.3vw,3.35rem)!important}.annie-reminder{background:#fff0ba!important;border:1px solid #dfc36e!important}
      .decision-shell{background:linear-gradient(135deg,#022b20,#075a40)!important;border:1px solid rgba(213,245,111,.25);box-shadow:var(--shadow)}.decision-copy .eyebrow,.why-visit .eyebrow,.proper-pruning-copy .eyebrow,.expertise-heading .eyebrow{font-size:1.1rem!important;color:var(--lime)}.decision-copy h2,.why-visit h2{font-size:clamp(2.2rem,3.45vw,3.45rem)!important;line-height:1.08!important}.quick-check{padding:34px!important;border:2px solid #cfddcf!important;box-shadow:0 20px 50px rgba(0,0,0,.18)!important}.check-question{padding:23px 4px!important}.check-options{gap:11px!important;padding:3px!important}.check-options span{min-height:50px!important;padding:12px 18px!important;border:2px solid #9db6a2!important;background:#fff!important;color:var(--forest)!important}.check-options input:checked+span{background:var(--forest)!important;color:#fff!important;border-color:var(--forest)!important;box-shadow:0 0 0 4px rgba(213,245,111,.44)!important}.visit-annie{width:74px;height:74px;object-fit:contain}
      .why-visit{padding-top:96px!important}.why-visit-card{border:2px solid #d5e1d3!important;box-shadow:0 14px 34px rgba(4,61,45,.08)!important}.why-visit-card>span{background:var(--forest)!important;color:var(--lime)!important}.proper-pruning-image{background:#dbead5!important;border:2px solid #c9dbc5!important;padding:12px!important}
      .expertise-grid{gap:20px!important}.expertise-card{padding:0 30px 30px!important;min-height:600px!important;border:2px solid #d5e1d3!important;box-shadow:0 14px 38px rgba(4,61,45,.08)!important}.expertise-card:before,.expertise-icon{display:none!important}.final-card-photo{width:calc(100% + 60px);height:230px;object-fit:cover;margin:0 -30px 28px;border-radius:26px 26px 0 0}.expertise-number{top:242px!important;background:var(--paper);padding:2px 9px;border-radius:999px;color:#789082!important;font-size:1rem!important}.care-statement,.stories-section{background:linear-gradient(145deg,#022b20,#07543d)!important;box-shadow:var(--shadow)}.story-symbol{height:230px!important}.story-brand-panel{background:linear-gradient(135deg,#fff0c8,#edf6e5)!important}.story-brand-image{width:190px;height:190px;object-fit:contain}.story-real-photo{background-size:cover!important;background-position:center 42%!important}.proof-grid figure{border:2px solid #d5e1d3;box-shadow:0 15px 38px rgba(4,61,45,.08)}
      .button.primary{background:var(--lime)!important;color:var(--forest-2)!important;box-shadow:0 9px 22px rgba(2,43,32,.17)}
      @media(max-width:1100px){.header-inner{grid-template-columns:1fr auto;grid-template-areas:"brand brand" "nav actions"}.brand{width:min(460px,64vw)}.hero{grid-template-columns:1fr}.local-trust{grid-template-columns:1fr!important}.local-trust-intro{text-align:center}.local-trust-intro h2{margin-inline:auto}}
      @media(max-width:720px){body{padding-bottom:calc(82px + env(safe-area-inset-bottom,0px))}.header-inner{min-height:146px;padding:8px 14px 12px;grid-template-columns:1fr;grid-template-areas:"brand"}.brand{width:min(340px,94vw)}.brand img{height:128px}.desktop-nav,.quick-actions{display:none!important}.hero{padding:16px 14px 20px;gap:13px}.hero-copy{padding:36px 21px;text-align:center;align-items:center}.hero-copy .eyebrow{align-self:center;font-size:.8rem;line-height:1.35;text-align:center;white-space:normal}.hero-copy h1{font-size:clamp(2.25rem,10.2vw,3.15rem);max-width:12ch}.hero-buttons,.hero-buttons .button{width:100%}.hero-photo{min-height:430px}.hero-photo>img{height:430px;object-fit:cover;object-position:58% center}.local-trust{padding:54px 14px 20px!important}.local-trust-intro h2{font-size:2.28rem!important}.recognition-grid{grid-template-columns:1fr!important}.recognition-card.graphic-card{min-height:148px!important;grid-template-columns:112px 1fr!important;padding:14px!important;text-align:left!important}.recognition-visual{width:112px!important;height:112px!important}.annie-inner{grid-template-columns:118px 1fr!important;padding:19px!important;gap:15px!important}.annie{width:118px!important;height:132px!important}.annie-quote{text-align:left!important;padding:4px!important}.concern-section .section-heading{text-align:center}.concern-image{height:240px}.concern-copy{min-height:0}.tree-part-buttons{display:grid!important;grid-template-columns:1fr 1fr!important}.decision-copy,.why-visit .section-heading,.proper-pruning-copy,.expertise-heading{text-align:center}.quick-check{padding:24px 18px!important}.check-options{display:grid!important;grid-template-columns:1fr!important}.check-options label,.check-options span{width:100%!important}.check-options span{justify-content:center;text-align:center}.expertise-card{min-height:0!important;padding:0 24px 26px!important}.final-card-photo{width:calc(100% + 48px);height:215px;margin:0 -24px 25px}.expertise-number{top:226px!important}}
      @media(max-width:430px){.header-inner{min-height:136px}.brand{width:min(315px,96vw)}.brand img{height:118px}.tree-part-buttons{grid-template-columns:1fr!important}}
    `;
    document.head.appendChild(style);
  }

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 150);
  setTimeout(apply, 600);
  const observer = new MutationObserver(apply);
  observer.observe(document.body, {childList:true, subtree:true});
  setTimeout(() => observer.disconnect(), 5000);
})();