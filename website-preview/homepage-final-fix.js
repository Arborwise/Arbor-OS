(() => {
  const icons = {
    phone: '<svg class="hero-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.8a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.33 1.84.56 2.8.69A2 2 0 0 1 22 16.92z"/></svg>',
    message: '<svg class="hero-contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3v-7a4 4 0 0 1-1-2.65V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4z"/><path d="M7 9h10M7 13h7"/></svg>'
  };

  const showStableAsset = (selector, fallbackPath, encodedPath, mimeType) => {
    const images = [...document.querySelectorAll(selector)];
    images.forEach(image => {
      image.style.visibility = 'visible';
      image.style.opacity = '1';
      image.src = fallbackPath;
    });
    fetch(encodedPath, { cache: 'no-store' })
      .then(response => {
        if (!response.ok) throw new Error('Asset unavailable');
        return response.text();
      })
      .then(encoded => {
        const candidate = `data:${mimeType};base64,${encoded.trim()}`;
        const validator = new Image();
        validator.onload = () => images.forEach(image => {
          image.src = candidate;
          image.style.visibility = 'visible';
          image.style.opacity = '1';
        });
        validator.src = candidate;
      })
      .catch(() => {});
  };

  const addClimberCircle = container => {
    if (!container || container.querySelector('.climber-highlight')) return;
    const circle = document.createElement('span');
    circle.className = 'climber-highlight';
    circle.setAttribute('aria-hidden', 'true');
    container.appendChild(circle);
  };

  const applyFinalHomepage = () => {
    const kicker = document.querySelector('.hero-copy .kicker');
    const title = document.getElementById('hero-title');
    const lead = document.querySelector('.hero-lead');
    const actions = document.querySelector('.hero-actions');
    const heroCopy = document.querySelector('.hero-copy');
    const heroMedia = document.querySelector('.hero-media');

    if (kicker) kicker.textContent = 'North Texas Tree Service';
    if (title) title.innerHTML = '<span>Welcome to Arborwise</span><sup>TM</sup>';
    if (lead) lead.textContent = 'Greg, Brandon, and the Arborwise team help you understand what is wrong with your trees, what actually needs attention, and how to protect your property without pressure or guesswork.';

    if (heroCopy && !heroCopy.querySelector('.mobile-hero-photo')) {
      const photo = document.createElement('figure');
      photo.className = 'mobile-hero-photo';
      photo.innerHTML = '<img src="assets/hero-climber.webp" alt="An Arborwise climber working high in a mature North Texas tree"><figcaption>Real Arborwise tree work in North Texas</figcaption>';
      heroCopy.prepend(photo);
      addClimberCircle(photo);
    }

    if (actions) {
      actions.innerHTML = '<a class="button" href="#estimate">Get a Free Estimate</a><a class="button ghost" href="#concerns">What Is Wrong With My Tree?</a>';
    }

    if (heroCopy && !heroCopy.querySelector('.hero-direct-contact')) {
      const contact = document.createElement('div');
      contact.className = 'hero-direct-contact';
      contact.innerHTML = `<a class="hero-call" href="tel:+19724308330">${icons.phone}<span><small>Call Arborwise</small><strong>972-430-8330</strong></span></a><a class="hero-text" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20have%20photos%20of%20a%20tree%20concern.">${icons.message}<span><small>Send a Message</small><strong>Text Photos</strong></span></a>`;
      actions.insertAdjacentElement('beforebegin', contact);
    }

    if (heroCopy && !heroCopy.querySelector('.hero-annie')) {
      const annie = document.createElement('aside');
      annie.className = 'hero-annie';
      annie.innerHTML = '<img data-annie alt="Annie, the Arborwise owl with a red A on her chest"><p><strong>Annie says:</strong> A whole-tree photo helps us see the pattern before we arrive.</p>';
      heroCopy.appendChild(annie);
    }

    if (heroCopy && !heroCopy.querySelector('.final-hero-promise')) {
      const promise = document.createElement('div');
      promise.className = 'final-hero-promise';
      promise.innerHTML = '<strong>Nurture Your Nature</strong><span>Honest answers. Skilled work. Every recommendation has a reason.</span>';
      heroCopy.appendChild(promise);
    }

    addClimberCircle(heroMedia);
    showStableAsset('[data-brand-logo]', 'assets/logo.webp', 'assets/logo-greg-transparent.b64', 'image/webp');
    showStableAsset('[data-annie]', 'assets/annie.webp', 'assets/annie-correct.b64', 'image/webp');
  };

  document.getElementById('arborwise-homepage-final-fix')?.remove();
  const style = document.createElement('style');
  style.id = 'arborwise-homepage-final-fix';
  style.textContent = `
    .brand-wrap.brand-layout{padding-top:8px!important}
    .brand-main{max-width:1240px!important;grid-template-columns:minmax(105px,155px) minmax(420px,680px) minmax(105px,155px)!important;gap:18px!important}
    .brand-main .brand{width:100%!important;max-width:680px!important;justify-self:center!important}
    .brand-main .brand img{width:100%!important;height:190px!important;object-fit:contain!important;visibility:visible!important;opacity:1!important;display:block!important;filter:drop-shadow(0 10px 16px rgba(11,63,47,.16))!important}
    .header-contact{width:145px!important;min-height:68px!important;padding:7px 9px!important;border-radius:15px!important;border-bottom:0!important;box-shadow:0 6px 14px rgba(6,40,31,.10)!important;gap:7px!important}
    .header-contact .ui-icon{width:23px!important;height:23px!important}
    .header-contact-left{background:#d8f277!important;color:#0b3f2f!important;border:2px solid #c9972f!important}
    .header-contact-right{background:#0b3f2f!important;color:#fff!important;border:2px solid #d8f277!important}
    .header-contact-right .ui-icon{color:#d8f277!important}
    .desktop-contact small{font-size:.58rem!important}
    .desktop-contact strong{font-size:.78rem!important}

    .hero-copy{align-items:center!important;text-align:center!important;justify-content:center!important;overflow:visible!important}
    .hero-copy> :not(.mobile-hero-photo){width:min(100%,650px)!important;margin-left:auto!important;margin-right:auto!important}
    .hero-copy .kicker{align-self:center!important;text-align:center!important;width:auto!important}
    .hero-copy h1{max-width:15ch!important;color:#167348!important;font-family:Georgia,"Times New Roman",serif!important;font-weight:900!important;letter-spacing:-.035em!important}
    .hero-copy h1 span{color:#167348!important;font-weight:900!important}
    .hero-copy h1 sup{font-family:Arial,sans-serif!important;font-size:.24em!important;line-height:1!important;vertical-align:super!important;margin-left:.12em!important;color:#167348!important;font-weight:900!important;letter-spacing:.02em!important}
    .hero-lead{margin-left:auto!important;margin-right:auto!important}
    .hero-actions{justify-content:center!important}

    .hero-direct-contact{display:grid!important;grid-template-columns:1fr 1fr!important;gap:12px!important;margin:6px auto 20px!important}
    .hero-direct-contact a{display:flex;align-items:center;justify-content:center;gap:11px;min-height:68px;border-radius:18px;text-decoration:none;font-weight:900;box-shadow:0 9px 20px rgba(6,40,31,.13)}
    .hero-direct-contact span{display:grid;text-align:left;line-height:1.08}
    .hero-direct-contact small{font-size:.66rem;text-transform:uppercase;letter-spacing:.07em}
    .hero-direct-contact strong{font-size:1rem}
    .hero-contact-icon{width:30px;height:30px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round;flex:0 0 auto}
    .hero-call{background:#d8f277;color:#0b3f2f;border:2px solid #c9972f}
    .hero-text{background:#0b3f2f;color:#fff;border:2px solid #d8f277}
    .hero-text .hero-contact-icon{color:#d8f277}

    .hero-annie{margin:22px auto 0!important;padding:12px 18px 12px 12px;border-radius:22px;background:linear-gradient(135deg,#edf9bd,#fffdf8);border:2px solid #c9972f;display:grid;grid-template-columns:92px 1fr;gap:12px;align-items:center;text-align:left;box-shadow:0 10px 22px rgba(6,40,31,.10)}
    .hero-annie img{width:92px;height:92px;object-fit:contain;visibility:visible!important;opacity:1!important;filter:drop-shadow(0 8px 8px rgba(6,40,31,.18))}
    .hero-annie p{margin:0;color:#244b3b;font-weight:700;line-height:1.35}
    .mobile-hero-photo{display:none}
    .final-hero-promise{margin:24px auto 0!important;padding:17px 20px;border-top:2px solid var(--gold);border-bottom:2px solid var(--gold);display:grid;gap:3px;text-align:center}
    .final-hero-promise strong{font-family:Georgia,"Times New Roman",serif;font-size:1.55rem;color:var(--forest-dark)}
    .final-hero-promise span{font-weight:800;color:#40574d}

    .hero-media{border:0!important;outline:0!important;box-shadow:0 14px 34px rgba(6,40,31,.10)!important}
    .climber-highlight{position:absolute;z-index:4;left:45%;top:7%;width:43%;height:55%;border:6px solid #d8f277;border-radius:50%;box-shadow:0 0 0 3px rgba(6,40,31,.45),0 0 24px rgba(216,242,119,.55);pointer-events:none}

    @media(max-width:760px){
      .brand-wrap.brand-layout{padding:5px 5px 3px!important}
      .brand-main{grid-template-columns:48px minmax(250px,1fr) 48px!important;gap:5px!important}
      .brand-main .brand{max-width:290px!important}
      .brand-main .brand img{height:165px!important;width:100%!important}
      .header-contact{width:44px!important;min-height:52px!important;padding:5px 2px!important;border-radius:12px!important;gap:1px!important}
      .header-contact .ui-icon{width:20px!important;height:20px!important}
      .mobile-contact{font-size:.58rem!important}
      .brand-proof{padding-top:5px!important;padding-bottom:5px!important}

      .hero{padding-top:10px!important}
      .hero-copy{padding:0 18px 28px!important;border-radius:30px!important}
      .mobile-hero-photo{display:block!important;width:calc(100% + 36px)!important;height:auto!important;margin:0 -18px 26px!important;position:relative!important;overflow:hidden!important;border-radius:29px 29px 0 0!important;background:#0b3f2f}
      .mobile-hero-photo img{width:100%!important;height:auto!important;object-fit:contain!important;display:block!important}
      .mobile-hero-photo figcaption{position:absolute;left:12px;bottom:12px;padding:7px 11px;border-radius:999px;background:rgba(7,48,37,.88);color:#fff;font-size:.72rem;font-weight:900}
      .mobile-hero-photo .climber-highlight{left:45%;top:7%;width:43%;height:55%;border-width:5px}
      .hero-copy h1{font-size:clamp(2.45rem,11vw,3.35rem)!important;line-height:.98!important;max-width:11ch!important;margin-bottom:18px!important}
      .hero-lead{font-size:1rem!important;line-height:1.52!important}
      .hero-direct-contact{grid-template-columns:1fr 1fr!important;gap:8px!important}
      .hero-direct-contact a{min-height:62px;border-radius:16px;padding:8px}
      .hero-direct-contact strong{font-size:.88rem}
      .hero-direct-contact small{font-size:.57rem}
      .hero-contact-icon{width:26px;height:26px}
      .hero-actions{width:100%!important}
      .hero-annie{grid-template-columns:76px 1fr;padding:10px 12px 10px 8px;margin-top:18px!important}
      .hero-annie img{width:76px;height:76px}
      .hero-annie p{font-size:.86rem}
      .hero-media{display:none!important}
    }

    @media(max-width:430px){
      .brand-main{grid-template-columns:44px minmax(225px,1fr) 44px!important}
      .brand-main .brand{max-width:265px!important}
      .brand-main .brand img{height:150px!important}
      .header-contact{width:42px!important;min-height:48px!important}
      .header-contact .ui-icon{width:19px!important;height:19px!important}
      .hero-direct-contact span{display:none}
      .hero-direct-contact a{min-height:58px}
      .hero-contact-icon{width:30px;height:30px}
    }
  `;
  document.head.appendChild(style);

  applyFinalHomepage();
  requestAnimationFrame(applyFinalHomepage);
  setTimeout(applyFinalHomepage, 250);
  setTimeout(applyFinalHomepage, 1200);
})();
