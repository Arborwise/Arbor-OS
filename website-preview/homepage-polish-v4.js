(() => {
  'use strict';

  const FB_URL = 'https://www.facebook.com/Arborwise';
  const TRANSPARENT = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

  const loadDataUrl = (path, mime = 'image/webp') =>
    fetch(path, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.text();
      })
      .then(encoded => `data:${mime};base64,${encoded.replace(/\s+/g, '')}`);

  const anniePromise = loadDataUrl('assets/annie-tiny-v4.b64');
  const newTreePromise = loadDataUrl('assets/new-tree-tiny-v4.b64');

  const icons = {
    local: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 4l9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/><path d="M7 9.5 12 6l5 3.5"/></svg>',
    established: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m12 7 1.4 2.8 3.1.5-2.2 2.2.5 3.1-2.8-1.4-2.8 1.4.5-3.1-2.2-2.2 3.1-.5z"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 8h3V4h-3c-3 0-5 2-5 5v3H6v4h3v5h4v-5h3l1-4h-4V9c0-.7.3-1 1-1z"/></svg>',
    previous: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    next: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>'
  };

  const setHeaderProof = () => {
    const left = document.querySelector('.brand-main .header-contact-left');
    const right = document.querySelector('.brand-main .header-contact-right');

    if (left) {
      left.removeAttribute('href');
      left.removeAttribute('aria-label');
      left.className = 'header-contact header-contact-left header-proof-badge';
      left.setAttribute('aria-label', 'Locally owned and locally operated');
      left.innerHTML = `${icons.local}<span><small>Locally Owned</small><strong>Locally Operated</strong></span>`;
    }

    if (right) {
      right.removeAttribute('href');
      right.removeAttribute('aria-label');
      right.className = 'header-contact header-contact-right header-proof-badge';
      right.setAttribute('aria-label', 'Arborwise established in 2019');
      right.innerHTML = `${icons.established}<span><small>Established</small><strong>2019</strong></span>`;
    }
  };

  const fixHero = () => {
    const media = document.querySelector('.hero-media');
    if (!media) return;

    const image = media.querySelector('.hero-image-stage > img, :scope > img');
    if (!image) return;

    let stage = media.querySelector('.hero-image-stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.className = 'hero-image-stage';
      media.insertBefore(stage, image);
      stage.appendChild(image);
    }

    stage.querySelectorAll('.climber-highlight').forEach(node => node.remove());
    const circle = document.createElement('span');
    circle.className = 'climber-highlight';
    circle.setAttribute('aria-hidden', 'true');
    stage.appendChild(circle);

    let caption = media.querySelector(':scope > figcaption');
    if (!caption) {
      caption = document.createElement('figcaption');
      media.appendChild(caption);
    }
    caption.innerHTML = '<strong>Arborwise climber at work</strong><span>The circle identifies the climber positioned in the canopy while controlled rope techniques protect the property below.</span>';
  };

  const installAnnie = () => {
    const prepare = () => {
      document.querySelectorAll('[data-annie]').forEach(image => {
        image.alt = '';
        image.setAttribute('aria-label', 'Annie, the Arborwise owl mascot');
        if (!image.dataset.v4Annie) {
          image.src = TRANSPARENT;
          image.style.visibility = 'hidden';
          image.style.opacity = '0';
        }
      });
      document.querySelectorAll('.annie-mascot-art').forEach(node => {
        if (!node.dataset.v4Annie) {
          node.style.backgroundImage = 'none';
          node.style.visibility = 'hidden';
          node.style.opacity = '0';
        }
      });
    };

    prepare();
    anniePromise.then(source => {
      document.querySelectorAll('[data-annie]').forEach(image => {
        if (image.src !== source) image.src = source;
        image.dataset.v4Annie = 'true';
        image.style.visibility = 'visible';
        image.style.opacity = '1';
      });
      document.querySelectorAll('.annie-mascot-art').forEach(node => {
        node.style.backgroundImage = `url("${source}")`;
        node.dataset.v4Annie = 'true';
        node.style.visibility = 'visible';
        node.style.opacity = '1';
      });
    }).catch(console.error);
  };

  const addPhotoLabel = (card, text) => {
    if (!card) return;
    card.querySelectorAll(':scope > .photo-explainer').forEach(node => node.remove());
    const image = card.querySelector(':scope > img');
    if (!image) return;
    const label = document.createElement('p');
    label.className = 'photo-explainer';
    label.textContent = text;
    image.insertAdjacentElement('afterend', label);
  };

  const polishServiceCards = () => {
    const cards = [...document.querySelectorAll('.service-grid .service-card')];
    if (cards.length < 3) return;

    document.querySelectorAll('.photo-logo-mark').forEach(node => node.remove());

    const image1 = cards[0].querySelector(':scope > img');
    const image2 = cards[1].querySelector(':scope > img');
    const image3 = cards[2].querySelector(':scope > img');

    if (image1) {
      image1.src = 'assets/photo-guide/selective-pruning.webp';
      image1.alt = 'Arborwise climber selectively pruning a mature North Texas tree canopy';
    }
    if (image2) {
      image2.src = 'assets/photo-guide/controlled-removal.webp';
      image2.alt = 'Arborwise crew performing a controlled tree removal near a home';
    }
    if (image3) {
      image3.src = TRANSPARENT;
      image3.alt = '';
      image3.style.opacity = '0';
      newTreePromise.then(source => {
        image3.src = source;
        image3.alt = 'A newly planted young tree with a broad mulch ring and clear trunk flare';
        image3.style.opacity = '1';
      }).catch(console.error);
    }

    addPhotoLabel(cards[0], 'Selective canopy pruning — purposeful cuts improve structure, clearance, balance, and long-term growth.');
    addPhotoLabel(cards[1], 'Controlled removal — the climber and ground crew lower sections safely around homes, fences, and landscaping.');
    addPhotoLabel(cards[2], 'Tree establishment — correct planting depth, a proper mulch ring, and support while the root system establishes.');
  };

  const labelConcernPhotos = () => {
    const labels = [
      'Leaf and canopy symptoms',
      'Deadwood and canopy decline',
      'Trunk, bark, and cavity concerns',
      'Root flare, lean, and moving soil'
    ];
    document.querySelectorAll('.concern-card').forEach((card, index) => {
      card.querySelectorAll('.concern-photo-label').forEach(node => node.remove());
      const image = card.querySelector(':scope > img');
      if (!image) return;
      const label = document.createElement('span');
      label.className = 'concern-photo-label';
      label.textContent = labels[index] || 'Tree concern photo';
      image.insertAdjacentElement('afterend', label);
    });
  };

  const buildWorkCarousel = () => {
    const section = document.querySelector('.work-section');
    const oldGrid = section?.querySelector('.work-grid, .work-carousel-shell');
    if (!section || !oldGrid) return;

    const slides = [
      ['assets/hero-climber.webp', 'Canopy access', 'A climber reaches difficult limbs without turning the yard below into a drop zone.'],
      ['assets/photo-guide/hidden-climber.webp', 'Rigging in tight spaces', 'Ropes, positioning, and planned cuts keep branches controlled around structures and utilities.'],
      ['assets/healthy-tree.webp', 'Finished property', 'The result should be visible in tree balance, clearance, cleanup, and the condition of the property.'],
      ['assets/young-tree-after.webp', 'Young-tree follow-through', 'Proper support and aftercare help a newly established tree build a stable root system.'],
      ['assets/declining-tree.webp', 'Whole-tree evaluation', 'Canopy pattern, trunk condition, roots, soil, weather, and nearby targets all shape the recommendation.']
    ];

    const shell = document.createElement('div');
    shell.className = 'work-carousel-shell';
    shell.innerHTML = `
      <button class="work-carousel-button work-carousel-prev" type="button" aria-label="Previous work photo">${icons.previous}</button>
      <div class="work-carousel" tabindex="0" aria-label="Examples of Arborwise work">
        ${slides.map(([src, title, description], index) => `
          <figure class="work-slide" id="work-slide-${index + 1}">
            <img src="${src}" alt="${title} by Arborwise">
            <figcaption><strong>${title}</strong><span>${description}</span></figcaption>
          </figure>`).join('')}
      </div>
      <button class="work-carousel-button work-carousel-next" type="button" aria-label="Next work photo">${icons.next}</button>
      <div class="work-carousel-dots" aria-label="Choose a work photo">
        ${slides.map((_, index) => `<button type="button" aria-label="Show work photo ${index + 1}" data-slide="${index}"></button>`).join('')}
      </div>`;

    oldGrid.replaceWith(shell);

    const track = shell.querySelector('.work-carousel');
    const cards = [...shell.querySelectorAll('.work-slide')];
    const dots = [...shell.querySelectorAll('.work-carousel-dots button')];
    let active = 0;

    const goTo = index => {
      active = (index + cards.length) % cards.length;
      cards[active].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      dots.forEach((dot, dotIndex) => dot.classList.toggle('active', dotIndex === active));
    };

    shell.querySelector('.work-carousel-prev')?.addEventListener('click', () => goTo(active - 1));
    shell.querySelector('.work-carousel-next')?.addEventListener('click', () => goTo(active + 1));
    dots.forEach((dot, index) => dot.addEventListener('click', () => goTo(index)));
    dots[0]?.classList.add('active');

    let scrollTimer;
    track?.addEventListener('scroll', () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let distance = Infinity;
        cards.forEach((card, index) => {
          const cardCenter = card.offsetLeft + card.offsetWidth / 2;
          const current = Math.abs(cardCenter - center);
          if (current < distance) {
            distance = current;
            nearest = index;
          }
        });
        active = nearest;
        dots.forEach((dot, index) => dot.classList.toggle('active', index === active));
      }, 80);
    }, { passive: true });
  };

  const addFacebook = () => {
    const footer = document.querySelector('.site-footer');
    if (!footer) return;
    footer.querySelectorAll('.footer-facebook').forEach(node => node.remove());
    const link = document.createElement('a');
    link.className = 'footer-facebook';
    link.href = FB_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.innerHTML = `${icons.facebook}<span>Follow Arborwise on Facebook</span>`;
    const contact = footer.querySelector(':scope > div');
    if (contact) contact.insertAdjacentElement('afterend', link);
    else footer.appendChild(link);
  };

  const installStyles = () => {
    document.getElementById('arborwise-polish-v4')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-polish-v4';
    style.textContent = `
      .header-proof-badge{pointer-events:none;cursor:default;display:flex!important;align-items:center!important;justify-content:center!important;gap:9px!important;text-decoration:none!important;text-align:left!important}
      .header-proof-badge svg{width:25px;height:25px;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
      .header-proof-badge span{display:grid;line-height:1.05}
      .header-proof-badge small{font-size:.62rem;font-weight:950;text-transform:uppercase;letter-spacing:.08em;white-space:nowrap}
      .header-proof-badge strong{font-size:.82rem;font-weight:950;white-space:nowrap}
      .header-contact-left.header-proof-badge{background:#eef7c8!important;color:#0b3f2f!important;border:2px solid #c9972f!important}
      .header-contact-right.header-proof-badge{background:#0b3f2f!important;color:#fff!important;border:2px solid #d8f277!important}
      .brand-main .brand{z-index:2!important}

      .hero-media{display:flex!important;flex-direction:column!important;overflow:hidden!important}
      .hero-image-stage{position:relative!important;width:100%!important;overflow:hidden!important;background:#0b3f2f!important}
      .hero-image-stage>img{display:block!important;width:100%!important;height:auto!important;object-fit:contain!important}
      .hero-media>figcaption{position:static!important;inset:auto!important;width:100%!important;margin:0!important;border:0!important;border-radius:0!important;background:#0b3f2f!important;color:#fff!important;padding:14px 18px 16px!important;display:grid!important;gap:3px!important}
      .hero-media>figcaption strong{color:#d8f277!important;font-size:1rem!important}
      .hero-media>figcaption span{font-size:.87rem!important;line-height:1.38!important;color:#eff6f1!important}
      .climber-highlight{left:34.5%!important;top:57%!important;width:19.5%!important;height:29%!important;border:6px solid #d8f277!important;border-radius:50%!important;box-shadow:0 0 0 3px rgba(6,40,31,.78),0 0 24px rgba(216,242,119,.65)!important}

      [data-annie]{transition:opacity .18s ease!important}
      .hero-annie{grid-template-columns:110px 1fr!important;overflow:hidden!important}
      .annie-mascot-art{width:110px!important;height:110px!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important}
      .annie-callout{grid-template-columns:210px 1fr!important;gap:34px!important;padding:32px 42px!important;overflow:hidden!important}
      .annie-callout [data-annie]{width:210px!important;height:205px!important;object-fit:contain!important;margin:auto!important}

      .photo-logo-mark{display:none!important}
      .service-card{overflow:hidden!important}
      .service-card>img:first-child{height:290px!important;object-fit:cover!important;transition:opacity .2s ease!important}
      .service-card:nth-child(3)>img:first-child{object-position:center 54%!important}
      .photo-explainer{margin:0!important;padding:11px 18px 12px!important;background:#0b3f2f!important;color:#eef7d2!important;font-size:.78rem!important;font-weight:800!important;line-height:1.4!important}
      .concern-photo-label{display:block!important;margin:0!important;padding:7px 12px!important;background:#0b3f2f!important;color:#eef7d2!important;font-size:.7rem!important;font-weight:900!important;letter-spacing:.03em!important;text-align:center!important}

      .work-carousel-shell{position:relative;max-width:1380px;margin:0 auto;padding:0 58px 34px}
      .work-carousel{display:grid;grid-auto-flow:column;grid-auto-columns:min(78vw,760px);gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;padding:4px 0 18px}
      .work-carousel::-webkit-scrollbar{display:none}
      .work-slide{scroll-snap-align:center;margin:0;overflow:hidden;border-radius:26px;background:#fffdf8;box-shadow:0 14px 34px rgba(6,40,31,.18);border:1px solid rgba(216,242,119,.22)}
      .work-slide img{width:100%;height:clamp(320px,48vw,610px);object-fit:cover;display:block}
      .work-slide figcaption{position:static!important;inset:auto!important;display:grid!important;gap:4px!important;padding:16px 19px!important;background:#0b3f2f!important;color:#fff!important;border-radius:0!important}
      .work-slide figcaption strong{color:#d8f277!important;font-size:1rem!important}
      .work-slide figcaption span{font-size:.86rem!important;line-height:1.42!important;color:#eff6f1!important}
      .work-carousel-button{position:absolute;top:42%;z-index:4;width:46px;height:46px;border:2px solid #d8f277;border-radius:50%;display:grid;place-items:center;background:#0b3f2f;color:#fff;box-shadow:0 8px 20px rgba(0,0,0,.22);cursor:pointer}
      .work-carousel-button svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:2.2;stroke-linecap:round;stroke-linejoin:round}
      .work-carousel-prev{left:7px}
      .work-carousel-next{right:7px}
      .work-carousel-dots{display:flex;justify-content:center;gap:8px;margin-top:2px}
      .work-carousel-dots button{width:10px;height:10px;padding:0;border:0;border-radius:50%;background:#769181;cursor:pointer}
      .work-carousel-dots button.active{width:28px;border-radius:999px;background:#d8f277}

      .site-footer{padding:46px 22px 120px!important;min-height:0!important;display:flex!important;flex-direction:column!important;align-items:center!important;gap:14px!important;text-align:center!important;overflow:hidden!important}
      .site-footer>img[data-brand-logo]{width:min(92%,560px)!important;max-width:560px!important;height:auto!important;max-height:280px!important;object-fit:contain!important;margin:0 auto 4px!important}
      .site-footer p{max-width:720px!important;margin:0!important}
      .site-footer>div{display:flex!important;flex-wrap:wrap!important;justify-content:center!important;gap:12px 24px!important}
      .footer-facebook{display:inline-flex;align-items:center;gap:9px;padding:10px 16px;border:2px solid #d8f277;border-radius:999px;color:#d8f277!important;text-decoration:none!important;font-weight:950!important}
      .footer-facebook svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:2;stroke-linejoin:round}
      .footer-facebook:hover,.footer-facebook:focus-visible{background:#d8f277;color:#0b3f2f!important}

      @media(max-width:760px){
        body{padding-bottom:96px!important}
        .brand-main{grid-template-columns:72px minmax(200px,1fr) 72px!important;gap:5px!important}
        .brand-main .brand{max-width:300px!important}
        .header-proof-badge{width:68px!important;min-height:64px!important;padding:5px 3px!important;gap:2px!important;flex-direction:column!important;text-align:center!important;border-radius:13px!important}
        .header-proof-badge svg{width:21px!important;height:21px!important}
        .header-proof-badge span{display:grid!important;text-align:center!important}
        .header-proof-badge small{font-size:.46rem!important;letter-spacing:.03em!important}
        .header-proof-badge strong{font-size:.54rem!important;white-space:normal!important}

        .hero{margin:10px 12px 24px!important}
        .hero-copy{padding:32px 18px 28px!important}
        .hero-media>figcaption{padding:12px 15px 14px!important}
        .hero-media>figcaption strong{font-size:.9rem!important}
        .hero-media>figcaption span{font-size:.74rem!important}
        .climber-highlight{left:34.5%!important;top:57%!important;width:19.5%!important;height:29%!important;border-width:5px!important}
        .hero-annie{grid-template-columns:86px 1fr!important;padding:10px 11px 10px 7px!important}
        .annie-mascot-art{width:86px!important;height:86px!important}

        .section{padding:48px 18px!important}
        .intro-grid,.split-head{gap:22px!important}
        h2{font-size:clamp(2rem,10vw,3rem)!important}
        h3{font-size:clamp(1.55rem,8vw,2.25rem)!important}
        .service-grid{gap:20px!important}
        .service-card{border-radius:25px!important}
        .service-card>img:first-child{height:240px!important}
        .service-card>div{padding:24px 20px 28px!important}
        .service-card>div p{font-size:1rem!important;line-height:1.5!important}
        .photo-explainer{padding:10px 14px!important;font-size:.72rem!important}
        .concern-grid{gap:18px!important}
        .concern-body{min-height:0!important;padding:18px!important}

        .annie-callout{margin:12px 12px 36px!important;padding:24px 18px!important;grid-template-columns:112px 1fr!important;gap:16px!important;border-radius:28px!important}
        .annie-callout [data-annie]{width:112px!important;height:130px!important}
        .annie-callout h2{font-size:clamp(1.8rem,8.8vw,2.65rem)!important}
        .annie-callout p:not(.kicker){font-size:.98rem!important}

        .work-section{padding:48px 0 38px!important}
        .work-section>.section-head{padding:0 18px!important;margin-bottom:24px!important}
        .work-carousel-shell{padding:0 18px 30px!important}
        .work-carousel{grid-auto-columns:88vw!important;gap:13px!important;padding-bottom:15px!important}
        .work-slide img{height:62vw!important;min-height:270px!important;max-height:430px!important}
        .work-carousel-button{display:none!important}

        .site-footer{padding:36px 18px 112px!important;gap:12px!important}
        .site-footer>img[data-brand-logo]{width:min(94%,520px)!important;max-height:240px!important}
        .site-footer>div{display:grid!important;gap:8px!important}
        .footer-facebook{font-size:.86rem!important}
        .mobile-bar{height:84px!important;bottom:8px!important;left:12px!important;right:12px!important;width:auto!important}
        .mobile-bar a{font-size:.82rem!important}
      }

      @media(max-width:430px){
        .brand-main{grid-template-columns:64px minmax(190px,1fr) 64px!important}
        .header-proof-badge{width:61px!important;min-height:59px!important}
        .header-proof-badge small{font-size:.42rem!important}
        .header-proof-badge strong{font-size:.5rem!important}
        .service-card>img:first-child{height:220px!important}
        .annie-callout{grid-template-columns:94px 1fr!important;padding:20px 14px!important;gap:12px!important}
        .annie-callout [data-annie]{width:94px!important;height:112px!important}
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => {
    installStyles();
    setHeaderProof();
    fixHero();
    installAnnie();
    polishServiceCards();
    labelConcernPhotos();
    buildWorkCarousel();
    addFacebook();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 450);
  setTimeout(apply, 1500);
  setTimeout(apply, 2800);

  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.addedNodes.length || mutation.type === 'attributes')) {
      clearTimeout(observer.timer);
      observer.timer = setTimeout(() => {
        setHeaderProof();
        fixHero();
        installAnnie();
        addFacebook();
      }, 60);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['src'] });
})();
