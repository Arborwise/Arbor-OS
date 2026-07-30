(() => {
  'use strict';

  const LOGO_PARTS = Array.from({ length: 8 }, (_, index) =>
    `assets/logo-final-${String(index).padStart(2, '0')}.b64`
  );

  const loadDataUrl = (path, mime = 'image/webp') =>
    fetch(path, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.text();
      })
      .then(encoded => `data:${mime};base64,${encoded.replace(/\s+/g, '')}`);

  const logoPromise = Promise.all(
    LOGO_PARTS.map(path => fetch(path, { cache: 'no-store' }).then(response => {
      if (!response.ok) throw new Error(`Unable to load ${path}`);
      return response.text();
    }))
  ).then(parts => `data:image/webp;base64,${parts.join('').replace(/\s+/g, '')}`);

  const anniePromise = loadDataUrl('assets/annie-correct.b64');

  const icons = {
    local: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 11 12 4l9 7v8a2 2 0 0 1-2 2h-4v-6H9v6H5a2 2 0 0 1-2-2z"/><path d="M7 9.5 12 6l5 3.5"/></svg>',
    established: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="m12 7 1.4 2.8 3.1.5-2.2 2.2.5 3.1-2.8-1.4-2.8 1.4.5-3.1-2.2-2.2 3.1-.5z"/></svg>'
  };

  const setLogo = () => {
    logoPromise.then(source => {
      document.querySelectorAll('[data-brand-logo]').forEach(image => {
        image.src = source;
        image.style.visibility = 'visible';
        image.style.opacity = '1';
      });
    }).catch(console.error);
  };

  const setHeroCopy = () => {
    const title = document.getElementById('hero-title');
    const kicker = document.querySelector('.hero-copy .kicker');
    const lead = document.querySelector('.hero-lead');
    const actions = document.querySelector('.hero-actions');
    const heroCopy = document.querySelector('.hero-copy');

    if (kicker) kicker.textContent = 'North Texas Tree Service';
    if (title) title.innerHTML = '<span>Welcome to Arborwise</span><sup>&trade;</sup>';
    if (lead) {
      lead.textContent = 'Greg, Brandon, and the Arborwise team help you understand what is wrong with your trees, what actually needs attention, and how to protect your property without pressure or guesswork.';
    }
    if (actions) {
      actions.innerHTML = '<a class="button" href="#estimate">Get a Free Estimate</a><a class="button ghost" href="#concerns">What Is Wrong With My Tree?</a>';
    }

    if (heroCopy && !heroCopy.querySelector('.final-hero-promise')) {
      const promise = document.createElement('div');
      promise.className = 'final-hero-promise';
      promise.innerHTML = '<strong>Nurture Your Nature</strong><span>Honest answers. Skilled work. Every recommendation has a reason.</span>';
      heroCopy.appendChild(promise);
    }
  };

  const setHeaderProof = () => {
    const left = document.querySelector('.brand-main .header-contact-left');
    const right = document.querySelector('.brand-main .header-contact-right');

    if (left) {
      left.removeAttribute('href');
      left.className = 'header-contact header-contact-left header-proof-badge';
      left.setAttribute('aria-label', 'Locally owned and locally operated');
      left.innerHTML = `${icons.local}<span><small>Locally Owned</small><strong>Locally Operated</strong></span>`;
    }

    if (right) {
      right.removeAttribute('href');
      right.className = 'header-contact header-contact-right header-proof-badge';
      right.setAttribute('aria-label', 'Arborwise established in 2019');
      right.innerHTML = `${icons.established}<span><small>Established</small><strong>2019</strong></span>`;
    }
  };

  const ensureAnnieContainers = () => {
    const heroCopy = document.querySelector('.hero-copy');
    let heroAnnie = heroCopy?.querySelector('.hero-annie');
    if (heroCopy && !heroAnnie) {
      heroAnnie = document.createElement('aside');
      heroAnnie.className = 'hero-annie';
      heroAnnie.innerHTML = '<p><strong>Annie says:</strong> Send one whole-tree photo, one close-up, and one photo of the trunk base.</p>';
      const lead = heroCopy.querySelector('.hero-lead');
      if (lead) lead.insertAdjacentElement('afterend', heroAnnie);
      else heroCopy.appendChild(heroAnnie);
    }

    if (heroAnnie) {
      heroAnnie.querySelectorAll('.annie-mascot-art').forEach(node => node.remove());
      let art = heroAnnie.querySelector('.annie-v5-art');
      if (!art) {
        art = document.createElement('div');
        art.className = 'annie-v5-art';
        art.setAttribute('role', 'img');
        art.setAttribute('aria-label', 'Annie, the Arborwise owl mascot with a red A');
        heroAnnie.prepend(art);
      }
    }

    const callout = document.querySelector('.annie-callout');
    if (callout) {
      let art = callout.querySelector('.annie-v5-art');
      if (!art) {
        art = document.createElement('div');
        art.className = 'annie-v5-art annie-v5-callout';
        art.setAttribute('role', 'img');
        art.setAttribute('aria-label', 'Annie, the Arborwise owl mascot with a red A');
        callout.prepend(art);
      }
    }
  };

  const showAnnie = () => {
    ensureAnnieContainers();
    anniePromise.then(source => {
      document.querySelectorAll('.annie-v5-art').forEach(node => {
        node.style.backgroundImage = `url("${source}")`;
        node.classList.add('annie-loaded');
      });
    }).catch(error => {
      console.error(error);
      document.querySelectorAll('.annie-v5-art').forEach(node => {
        node.style.backgroundImage = "url('assets/annie.webp')";
        node.classList.add('annie-loaded');
      });
    });
  };

  const installStyles = () => {
    document.getElementById('arborwise-final-v5')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-final-v5';
    style.textContent = `
      .brand-main{grid-template-columns:minmax(110px,1fr) minmax(360px,640px) minmax(110px,1fr)!important;gap:22px!important;align-items:center!important}
      .brand-main .brand{z-index:3!important}

      .brand-main .header-proof-badge{
        width:auto!important;min-height:0!important;padding:4px 8px 9px!important;margin:0!important;
        background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;
        color:#0b3f2f!important;display:flex!important;align-items:center!important;justify-content:center!important;
        gap:9px!important;text-align:left!important;position:relative!important;pointer-events:none!important;
      }
      .brand-main .header-proof-badge::after{
        content:'';position:absolute;left:12%;right:12%;bottom:0;height:2px;
        background:linear-gradient(90deg,transparent,#d4a03f 24%,#d4a03f 76%,transparent);
      }
      .brand-main .header-proof-badge svg{width:25px!important;height:25px!important;fill:none!important;stroke:#d4a03f!important;stroke-width:1.9!important;stroke-linecap:round!important;stroke-linejoin:round!important;flex:0 0 auto!important}
      .brand-main .header-proof-badge span{display:grid!important;line-height:1.03!important}
      .brand-main .header-proof-badge small{color:#5b765f!important;font-size:.58rem!important;font-weight:950!important;text-transform:uppercase!important;letter-spacing:.11em!important;white-space:nowrap!important}
      .brand-main .header-proof-badge strong{color:#0b3f2f!important;font-family:Georgia,'Times New Roman',serif!important;font-size:.93rem!important;font-weight:900!important;letter-spacing:.01em!important;white-space:nowrap!important}
      .brand-main .header-contact-left.header-proof-badge,.brand-main .header-contact-right.header-proof-badge{background:transparent!important;border:0!important;box-shadow:none!important}

      .hero-copy{align-items:center!important;text-align:center!important}
      .hero-copy>*{margin-left:auto!important;margin-right:auto!important}
      .hero-copy h1{color:#16824f!important;font-weight:900!important;max-width:12ch!important}
      .hero-copy h1 span,.hero-copy h1 sup{color:#16824f!important;font-weight:900!important}
      .hero-copy h1 sup{font-family:Arial,sans-serif!important;font-size:.32em!important;vertical-align:super!important;margin-left:.12em!important}
      .hero-lead{text-align:center!important;color:#40574d!important}
      .hero-actions{justify-content:center!important}
      .final-hero-promise{margin:22px auto 0!important;padding:16px 20px!important;border-top:2px solid #d4a03f!important;border-bottom:2px solid #d4a03f!important;display:grid!important;gap:3px!important;text-align:center!important}
      .final-hero-promise strong{font-family:Georgia,'Times New Roman',serif!important;font-size:1.55rem!important;color:#06281f!important}
      .final-hero-promise span{font-weight:800!important;color:#40574d!important}

      .hero-image-stage .climber-highlight{
        left:33.5%!important;top:53.5%!important;width:18%!important;height:27%!important;
        border:6px solid #d8f277!important;border-radius:50%!important;
        box-shadow:0 0 0 3px rgba(6,40,31,.78),0 0 24px rgba(216,242,119,.68)!important;
      }

      .hero-annie{grid-template-columns:112px 1fr!important;gap:14px!important;align-items:center!important;overflow:visible!important}
      .hero-annie .annie-mascot-art{display:none!important}
      .annie-v5-art{display:block!important;width:112px!important;height:112px!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important;visibility:visible!important;opacity:1!important;filter:drop-shadow(0 8px 8px rgba(6,40,31,.18))!important}
      .annie-callout>[data-annie]{display:none!important}
      .annie-callout{grid-template-columns:210px 1fr!important;gap:34px!important;align-items:center!important}
      .annie-v5-callout{width:210px!important;height:205px!important;margin:auto!important}

      @media(max-width:760px){
        .brand-main{grid-template-columns:78px minmax(190px,1fr) 78px!important;gap:5px!important}
        .brand-main .header-proof-badge{width:auto!important;min-height:0!important;padding:2px 1px 8px!important;gap:3px!important;flex-direction:column!important;text-align:center!important}
        .brand-main .header-proof-badge::after{left:18%;right:18%;height:1.5px!important}
        .brand-main .header-proof-badge svg{width:20px!important;height:20px!important}
        .brand-main .header-proof-badge span{text-align:center!important}
        .brand-main .header-proof-badge small{font-size:.43rem!important;letter-spacing:.05em!important}
        .brand-main .header-proof-badge strong{font-size:.57rem!important;white-space:normal!important;line-height:1.05!important}

        .hero-image-stage .climber-highlight{left:33.5%!important;top:53.5%!important;width:18%!important;height:27%!important;border-width:5px!important}
        .hero-annie{grid-template-columns:90px 1fr!important;padding:10px 12px 10px 8px!important}
        .annie-v5-art{width:90px!important;height:90px!important}
        .annie-callout{grid-template-columns:116px 1fr!important;gap:16px!important}
        .annie-v5-callout{width:116px!important;height:132px!important}
      }

      @media(max-width:430px){
        .brand-main{grid-template-columns:70px minmax(184px,1fr) 70px!important}
        .brand-main .header-proof-badge strong{font-size:.52rem!important}
        .hero-annie{grid-template-columns:82px 1fr!important}
        .annie-v5-art{width:82px!important;height:82px!important}
        .annie-callout{grid-template-columns:96px 1fr!important;padding:20px 14px!important;gap:12px!important}
        .annie-v5-callout{width:96px!important;height:112px!important}
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => {
    setLogo();
    setHeroCopy();
    setHeaderProof();
    showAnnie();
    installStyles();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 500);
  setTimeout(apply, 1700);
  setTimeout(apply, 3300);

  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.addedNodes.length)) {
      clearTimeout(observer.timer);
      observer.timer = setTimeout(() => {
        setHeroCopy();
        setHeaderProof();
        showAnnie();
        installStyles();
      }, 120);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
