(() => {
  const LOGO_PARTS = Array.from({ length: 8 }, (_, index) =>
    `assets/logo-final-${String(index).padStart(2, '0')}.b64`
  );

  let exactLogoUrl = '';
  let annieUrl = '';

  const exactLogoPromise = Promise.all(
    LOGO_PARTS.map(path =>
      fetch(path, { cache: 'no-store' }).then(response => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.text();
      })
    )
  ).then(parts => {
    exactLogoUrl = `data:image/webp;base64,${parts.join('').replace(/\s+/g, '')}`;
    return exactLogoUrl;
  });

  const anniePromise = fetch('assets/annie-correct.b64', { cache: 'no-store' })
    .then(response => {
      if (!response.ok) throw new Error('Unable to load Annie');
      return response.text();
    })
    .then(encoded => {
      annieUrl = `data:image/webp;base64,${encoded.replace(/\s+/g, '')}`;
      return annieUrl;
    });

  const applyLogo = () => {
    const images = [...document.querySelectorAll('[data-brand-logo]')];
    if (!images.length) return;

    const show = source => {
      images.forEach(image => {
        image.src = source;
        image.style.visibility = 'visible';
        image.style.opacity = '1';
      });
    };

    if (exactLogoUrl) show(exactLogoUrl);
    else exactLogoPromise.then(show).catch(console.error);
  };

  const applyAnnie = () => {
    const art = [...document.querySelectorAll('.annie-mascot-art')];
    const images = [...document.querySelectorAll('[data-annie]')];

    art.forEach(node => {
      node.style.backgroundImage = "url('assets/annie.webp')";
    });

    images.forEach(image => {
      image.removeAttribute('alt');
      image.setAttribute('aria-label', 'Annie, the Arborwise owl mascot');
      image.style.visibility = 'hidden';
      image.style.opacity = '0';
    });

    const show = source => {
      art.forEach(node => {
        node.style.backgroundImage = `url("${source}")`;
        node.classList.add('loaded');
      });
      images.forEach(image => {
        image.src = source;
        image.style.visibility = 'visible';
        image.style.opacity = '1';
      });
    };

    if (annieUrl) show(annieUrl);
    else anniePromise.then(show).catch(console.error);
  };

  const rebuildHeroMedia = heroMedia => {
    if (!heroMedia) return;

    const image = heroMedia.querySelector(':scope > img, .hero-image-stage > img');
    if (!image) return;

    let stage = heroMedia.querySelector('.hero-image-stage');
    if (!stage) {
      stage = document.createElement('div');
      stage.className = 'hero-image-stage';
      heroMedia.insertBefore(stage, image);
      stage.appendChild(image);
    }

    stage.querySelectorAll('.climber-highlight').forEach(node => node.remove());
    const circle = document.createElement('span');
    circle.className = 'climber-highlight';
    circle.setAttribute('aria-hidden', 'true');
    stage.appendChild(circle);

    const caption = heroMedia.querySelector('figcaption');
    if (caption) {
      caption.innerHTML = '<strong>Real Arborwise tree work in North Texas</strong><span>Skilled climbing and controlled rope work.</span>';
    }
  };

  const applyHomepage = () => {
    document.querySelectorAll('.mobile-hero-photo, .hero-direct-contact').forEach(node => node.remove());

    const title = document.getElementById('hero-title');
    const kicker = document.querySelector('.hero-copy .kicker');
    const lead = document.querySelector('.hero-lead');
    const actions = document.querySelector('.hero-actions');
    const heroCopy = document.querySelector('.hero-copy');
    const heroMedia = document.querySelector('.hero-media');

    if (kicker) kicker.textContent = 'North Texas Tree Service';
    if (title) title.innerHTML = '<span>Welcome to Arborwise</span><sup>&trade;</sup>';
    if (lead) {
      lead.textContent = 'Greg, Brandon, and the Arborwise team help you understand what is wrong with your trees, what actually needs attention, and how to protect your property without pressure or guesswork.';
    }
    if (actions) {
      actions.innerHTML = '<a class="button" href="#estimate">Get a Free Estimate</a><a class="button ghost" href="#concerns">What Is Wrong With My Tree?</a>';
    }

    if (heroCopy) {
      heroCopy.querySelectorAll('.hero-annie').forEach(node => node.remove());
      const annie = document.createElement('aside');
      annie.className = 'hero-annie';
      annie.innerHTML = '<div class="annie-mascot-art" role="img" aria-label="Annie, the Arborwise owl mascot"></div><p><strong>Annie says:</strong> Send one whole-tree photo, one close-up, and one photo of the trunk base.</p>';
      if (lead) lead.insertAdjacentElement('afterend', annie);
      else heroCopy.appendChild(annie);

      if (!heroCopy.querySelector('.final-hero-promise')) {
        const promise = document.createElement('div');
        promise.className = 'final-hero-promise';
        promise.innerHTML = '<strong>Nurture Your Nature</strong><span>Honest answers. Skilled work. Every recommendation has a reason.</span>';
        heroCopy.appendChild(promise);
      }
    }

    rebuildHeroMedia(heroMedia);
    applyLogo();
    applyAnnie();
  };

  document.getElementById('arborwise-homepage-final-fix')?.remove();
  const style = document.createElement('style');
  style.id = 'arborwise-homepage-final-fix';
  style.textContent = `
    .brand-wrap.brand-layout{padding:8px 14px 5px!important}
    .brand-main{max-width:1180px!important;grid-template-columns:112px minmax(360px,640px) 112px!important;gap:20px!important;align-items:center!important;justify-content:center!important}
    .brand-main .brand{width:100%!important;max-width:640px!important;justify-self:center!important}
    .brand-main .brand img{width:100%!important;height:auto!important;max-height:210px!important;object-fit:contain!important;display:block!important;filter:drop-shadow(0 10px 15px rgba(11,63,47,.15))!important}
    .header-contact{width:106px!important;min-height:56px!important;padding:6px!important;border-radius:14px!important;border-bottom:0!important;gap:5px!important;box-shadow:0 5px 13px rgba(6,40,31,.10)!important}
    .header-contact .ui-icon{width:20px!important;height:20px!important}
    .header-contact-left{background:#d8f277!important;color:#0b3f2f!important;border:2px solid #c9972f!important}
    .header-contact-right{background:#0b3f2f!important;color:#fff!important;border:2px solid #d8f277!important}
    .header-contact-right .ui-icon{color:#d8f277!important}

    .hero{max-width:var(--max)!important;margin:18px auto 36px!important;padding:0!important;gap:0!important;overflow:hidden!important;background:#fffdf8!important;border:1px solid #aab99b!important;border-radius:34px!important;box-shadow:0 16px 38px rgba(6,40,31,.12)!important;align-items:stretch!important}
    .hero-copy,.hero-media{border-radius:0!important;box-shadow:none!important;border:0!important}
    .hero-copy{background:#fffdf8!important;color:var(--forest-dark)!important;align-items:center!important;text-align:center!important;justify-content:center!important;padding:clamp(42px,5vw,76px)!important;overflow:visible!important}
    .hero-copy>*{width:min(100%,640px)!important;margin-left:auto!important;margin-right:auto!important}
    .hero-copy .kicker{width:auto!important;align-self:center!important;text-align:center!important;color:var(--forest)!important;background:transparent!important;border-bottom:3px solid var(--gold)!important;border-radius:0!important;padding:0 0 9px!important}
    .hero-copy h1{max-width:12ch!important;color:#16824f!important;font-family:Georgia,"Times New Roman",serif!important;font-weight:900!important;line-height:.98!important;letter-spacing:-.04em!important}
    .hero-copy h1 span,.hero-copy h1 sup{color:#16824f!important;font-weight:900!important}
    .hero-copy h1 sup{font-family:Arial,sans-serif!important;font-size:.32em!important;line-height:1!important;vertical-align:super!important;margin-left:.12em!important;letter-spacing:.01em!important}
    .hero-lead{color:#40574d!important;text-align:center!important}
    .hero-actions{justify-content:center!important}
    .hero-copy .button.ghost{background:#fff!important;color:var(--forest-dark)!important;border:1px solid #9aac8d!important}

    .hero-media{position:relative!important;margin:0!important;background:#0b3f2f!important;min-height:0!important;overflow:hidden!important;display:flex!important;flex-direction:column!important}
    .hero-image-stage{position:relative!important;width:100%!important;overflow:hidden!important;background:#0b3f2f!important}
    .hero-image-stage>img{width:100%!important;height:auto!important;object-fit:contain!important;object-position:center!important;display:block!important}
    .hero-media figcaption{position:static!important;inset:auto!important;width:100%!important;margin:0!important;border-radius:0!important;background:#0b3f2f!important;color:#fff!important;padding:14px 18px!important;display:grid!important;gap:2px!important;z-index:auto!important}
    .hero-media figcaption strong{color:#d8f277!important}
    .hero-media figcaption span{font-size:.86rem!important}
    .climber-highlight{position:absolute!important;z-index:4!important;left:34.5%!important;top:50.5%!important;width:20%!important;height:29%!important;border:6px solid #d8f277!important;border-radius:50%!important;box-shadow:0 0 0 3px rgba(6,40,31,.72),0 0 25px rgba(216,242,119,.6)!important;pointer-events:none!important}

    .hero-annie{margin:18px auto 12px!important;padding:12px 18px 12px 12px!important;border-radius:22px!important;background:linear-gradient(135deg,#edf9bd,#fffdf8)!important;border:2px solid #c9972f!important;display:grid!important;grid-template-columns:112px 1fr!important;gap:14px!important;align-items:center!important;text-align:left!important;box-shadow:0 10px 22px rgba(6,40,31,.10)!important}
    .annie-mascot-art{width:112px!important;height:112px!important;background-repeat:no-repeat!important;background-position:center!important;background-size:contain!important;filter:drop-shadow(0 8px 8px rgba(6,40,31,.18))!important}
    .hero-annie p{margin:0!important;color:#244b3b!important;font-weight:750!important;line-height:1.35!important}
    .hero-annie strong{color:#0b3f2f!important}
    .final-hero-promise{margin:20px auto 0!important;padding:17px 20px!important;border-top:2px solid var(--gold)!important;border-bottom:2px solid var(--gold)!important;display:grid!important;gap:3px!important;text-align:center!important}
    .final-hero-promise strong{font-family:Georgia,"Times New Roman",serif!important;font-size:1.55rem!important;color:var(--forest-dark)!important}
    .final-hero-promise span{font-weight:800!important;color:#40574d!important}

    @media(max-width:760px){
      .brand-wrap.brand-layout{padding:5px 6px 3px!important}
      .brand-main{grid-template-columns:44px minmax(250px,1fr) 44px!important;gap:5px!important}
      .brand-main .brand{max-width:340px!important}
      .brand-main .brand img{height:auto!important;max-height:190px!important}
      .header-contact{width:42px!important;min-height:48px!important;padding:4px 1px!important;border-radius:11px!important;gap:1px!important}
      .header-contact .ui-icon{width:18px!important;height:18px!important}
      .mobile-contact{font-size:.55rem!important}
      .brand-proof{padding:5px 4px!important}

      .hero{display:flex!important;flex-direction:column!important;margin:12px 12px 28px!important;border-radius:30px!important}
      .hero-media{display:flex!important;order:1!important;width:100%!important;min-height:0!important;border-radius:0!important}
      .hero-image-stage>img{width:100%!important;height:auto!important;object-fit:contain!important;display:block!important}
      .hero-media figcaption{position:static!important;padding:12px 15px!important;font-size:.76rem!important}
      .climber-highlight{left:34.5%!important;top:50.5%!important;width:20%!important;height:29%!important;border-width:5px!important}
      .hero-copy{order:2!important;width:100%!important;padding:38px 22px 32px!important;align-items:center!important;text-align:center!important}
      .hero-copy>*{width:min(100%,600px)!important;margin-left:auto!important;margin-right:auto!important}
      .hero-copy h1{font-size:clamp(2.55rem,12vw,3.55rem)!important;max-width:10.5ch!important;margin-bottom:20px!important}
      .hero-copy h1 sup{font-size:.34em!important}
      .hero-lead{font-size:1rem!important;line-height:1.52!important}
      .hero-actions{width:100%!important;display:grid!important}
      .hero-actions .button{width:100%!important}
      .hero-annie{grid-template-columns:92px 1fr!important;padding:10px 12px 10px 8px!important;margin-top:16px!important}
      .annie-mascot-art{width:92px!important;height:92px!important}
      .hero-annie p{font-size:.86rem!important}
    }

    @media(max-width:430px){
      .brand-main{grid-template-columns:40px minmax(225px,1fr) 40px!important}
      .brand-main .brand{max-width:285px!important}
      .brand-main .brand img{max-height:170px!important}
      .header-contact{width:39px!important;min-height:46px!important}
      .header-contact .ui-icon{width:17px!important;height:17px!important}
      .hero-copy{padding:34px 18px 30px!important}
      .hero-annie{grid-template-columns:82px 1fr!important}
      .annie-mascot-art{width:82px!important;height:82px!important}
    }
  `;
  document.head.appendChild(style);

  applyHomepage();
  requestAnimationFrame(applyHomepage);
  setTimeout(applyHomepage, 250);
  setTimeout(applyHomepage, 1200);
})();