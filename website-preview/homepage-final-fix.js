(() => {
  const applyFinalHomepage = () => {
    const kicker = document.querySelector('.hero-copy .kicker');
    const title = document.getElementById('hero-title');
    const lead = document.querySelector('.hero-lead');
    const actions = document.querySelector('.hero-actions');
    const heroCopy = document.querySelector('.hero-copy');
    const heroMedia = document.querySelector('.hero-media');

    if (kicker) kicker.textContent = 'North Texas Tree Service';
    if (title) title.innerHTML = 'Welcome to <em>Arborwise.</em>';
    if (lead) {
      lead.textContent = 'Greg, Brandon, and the Arborwise team help you understand what is wrong with your trees, what actually needs attention, and how to protect your property without pressure or guesswork.';
    }

    if (actions) {
      actions.innerHTML = `
        <a class="button" href="#estimate">Get a Free Estimate</a>
        <a class="button ghost" href="#concerns">What Is Wrong With My Tree?</a>`;
    }

    if (heroCopy && !heroCopy.querySelector('.final-hero-promise')) {
      const promise = document.createElement('div');
      promise.className = 'final-hero-promise';
      promise.innerHTML = '<strong>Nurture Your Nature</strong><span>Honest answers. Skilled work. Every recommendation has a reason.</span>';
      heroCopy.appendChild(promise);
    }

    if (heroMedia && !heroMedia.querySelector('.climber-highlight')) {
      const highlight = document.createElement('span');
      highlight.className = 'climber-highlight';
      highlight.setAttribute('aria-hidden', 'true');
      heroMedia.appendChild(highlight);
    }
  };

  const style = document.createElement('style');
  style.id = 'arborwise-homepage-final-fix';
  style.textContent = `
    .hero-copy{align-items:center!important;text-align:center!important}
    .hero-copy .kicker{align-self:center!important;text-align:center!important;margin-inline:auto!important}
    .hero-copy h1{max-width:13ch!important;margin-left:auto!important;margin-right:auto!important}
    .hero-lead{margin-left:auto!important;margin-right:auto!important}
    .hero-actions{justify-content:center!important}
    .final-hero-promise{width:min(100%,620px);margin:24px auto 0;padding:17px 20px;border-top:2px solid var(--gold);border-bottom:2px solid var(--gold);display:grid;gap:3px;text-align:center}
    .final-hero-promise strong{font-family:Georgia,"Times New Roman",serif;font-size:1.55rem;color:var(--forest-dark)}
    .final-hero-promise span{font-weight:800;color:#40574d}
    .hero-media{border:0!important;outline:0!important;box-shadow:0 14px 34px rgba(6,40,31,.10)!important}
    .hero-media .climber-highlight{position:absolute;z-index:2;left:45%;top:8%;width:46%;height:58%;border:6px solid var(--lime);border-radius:50%;box-shadow:0 0 0 3px rgba(6,40,31,.22),0 0 26px rgba(216,242,119,.35);pointer-events:none}
    .work-grid figure,.work-grid .work-large{border:0!important;outline:0!important;padding:0!important;box-shadow:none!important}
    @media(max-width:760px){
      .hero-copy{align-items:center!important;text-align:center!important}
      .hero-copy .kicker{align-self:center!important;text-align:center!important}
      .hero-actions{width:100%!important}
      .final-hero-promise{margin-top:18px;padding:14px 10px}
      .final-hero-promise strong{font-size:1.35rem}
      .hero-media .climber-highlight{left:42%;top:7%;width:52%;height:60%;border-width:5px}
    }
  `;
  document.head.appendChild(style);

  applyFinalHomepage();
  requestAnimationFrame(applyFinalHomepage);
  setTimeout(applyFinalHomepage, 250);
})();
