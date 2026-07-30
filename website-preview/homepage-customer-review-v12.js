(() => {
  'use strict';

  const VERSION = '20260730-1755';
  const STYLE_ID = 'arborwise-customer-review-v12';

  const conditionPhotos = [
    {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Oak%20wilt%20symptoms.jpg?width=1400',
      alt: 'Oak leaves with obvious browning and discoloration associated with oak wilt symptoms',
      label: 'Browning, discoloration, leaf spots, curling, or early leaf drop'
    },
    {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Poor%20canopy%20health%20at%20Holly%20House%2C%202020%20%28fcef31e7-ba1e-4800-b31a-6a461cf9f5df%29.jpg?width=1400',
      alt: 'Mature tree canopy with clearly visible dead branches and thinning foliage',
      label: 'Dead branches, sparse growth, or a thinning canopy'
    },
    {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Mushrooms%20at%20the%20base%20of%20a%20trunk%20tree.jpg?width=1400',
      alt: 'Mushrooms growing at the base of a tree trunk, a visible warning sign homeowners may notice',
      label: 'Cracks, cavities, loose bark, decay, or mushrooms at the trunk'
    },
    {
      src: 'https://commons.wikimedia.org/wiki/Special:Redirect/file/Exposed%20Roots%20%285647975517%29.jpg?width=1400',
      alt: 'Large exposed tree roots and disturbed soil around the base of a tree',
      label: 'A new lean, exposed roots, lifted soil, or movement at the base'
    }
  ];

  const rebuildClimber = () => {
    const media = document.querySelector('.hero-media');
    if (!media) return;

    media.dataset.customerReviewV12 = 'true';
    media.innerHTML = `
      <div class="climber-stage-v12">
        <img src="assets/hero-climber.webp?v=${VERSION}" alt="Arborwise climber in the orange shirt working in a mature North Texas tree">
        <svg class="climber-circle-v12" viewBox="0 0 1800 1238" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <ellipse cx="716" cy="860" rx="126" ry="154"></ellipse>
        </svg>
      </div>
      <figcaption><strong>Arborwise climber at work</strong><span>The circle is centered on the climber in the orange shirt while controlled rope techniques protect the tree and property below.</span></figcaption>`;
  };

  const replaceConditionPhotos = () => {
    const cards = [...document.querySelectorAll('.concern-grid .concern-card')];
    cards.forEach((card, index) => {
      const photo = conditionPhotos[index];
      const image = card.querySelector('img');
      if (!photo || !image) return;
      image.src = photo.src;
      image.alt = photo.alt;
      image.referrerPolicy = 'no-referrer';
      image.decoding = 'async';
      image.loading = index === 0 ? 'eager' : 'lazy';

      let label = card.querySelector('.concern-photo-label-v12');
      if (!label) {
        card.querySelectorAll('.concern-photo-label').forEach(node => node.remove());
        label = document.createElement('span');
        label.className = 'concern-photo-label-v12';
        image.insertAdjacentElement('afterend', label);
      }
      label.textContent = photo.label;
    });
  };

  const normalizeSectionHierarchy = () => {
    const selectors = [
      '.section-label',
      '.section-head > .kicker',
      '.split-head .kicker',
      '.way-intro > .kicker',
      '.recognition-copy > .kicker',
      '.estimate-card .kicker',
      '.annie-copy-v10 > .kicker',
      '.annie-copy-v11 > .kicker',
      '.annie-copy-v12 > .kicker'
    ];
    document.querySelectorAll(selectors.join(',')).forEach(node => node.classList.add('section-title-v12'));
  };

  const keepAnnieWorking = () => {
    const button = document.getElementById('annieButton');
    const tip = document.getElementById('annieTip');
    if (!button || !tip || button.dataset.v12Bound === 'true') return;

    const tips = [
      'Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.',
      'Send one photo of the whole tree, one close-up of the concern, and one photo of the trunk base.',
      'A sudden change matters more than a condition that has looked the same for years.',
      'Do not stand under a cracked limb to take a picture. Step back and use your camera zoom.',
      'Watering changes, construction, storms, soil disturbance, and recent pruning can all help explain what a tree is doing.'
    ];

    const fresh = button.cloneNode(true);
    fresh.dataset.v12Bound = 'true';
    button.replaceWith(fresh);
    let index = Math.max(0, tips.indexOf(tip.textContent.trim()));
    fresh.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      index = (index + 1) % tips.length;
      tip.textContent = tips[index];
    });
  };

  const installStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .climber-highlight,.climber-circle-v10,.climber-ring-v11{display:none!important}
      .climber-stage-v12{position:relative!important;width:100%!important;aspect-ratio:1800/1238!important;overflow:hidden!important;background:#0b4b38!important}
      .climber-stage-v12>img{display:block!important;width:100%!important;height:100%!important;object-fit:contain!important;object-position:center!important;background:#0b4b38!important}
      .climber-circle-v12{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;z-index:20!important;pointer-events:none!important}
      .climber-circle-v12 ellipse{fill:none!important;stroke:#d8f277!important;stroke-width:15!important;vector-effect:non-scaling-stroke!important;filter:drop-shadow(0 0 8px rgba(216,242,119,.9)) drop-shadow(0 0 3px rgba(6,40,31,.95))!important}
      .hero-media{display:flex!important;flex-direction:column!important;min-height:0!important;overflow:hidden!important}
      .hero-media>figcaption{position:static!important;inset:auto!important;width:100%!important;margin:0!important;border:0!important;border-radius:0!important;background:#0b4b38!important;color:#fff!important;padding:17px 20px 20px!important;display:grid!important;gap:4px!important}
      .hero-media>figcaption strong{color:#d8f277!important;font-size:1.05rem!important}
      .hero-media>figcaption span{color:#edf5f1!important;font-size:.88rem!important;line-height:1.45!important}

      .section-title-v12{display:block!important;width:max-content!important;max-width:100%!important;margin:0 auto 22px!important;padding:0 4px 7px!important;text-align:center!important;color:#12663f!important;font-size:clamp(1.15rem,2.2vw,1.6rem)!important;font-weight:950!important;line-height:1.18!important;letter-spacing:.08em!important;text-transform:uppercase!important;border-bottom:4px solid #d4a03f!important}
      .intro-grid,.split-head{grid-template-columns:1fr!important;gap:18px!important;text-align:center!important;align-items:center!important}
      .intro-grid h2,.section-head h2,.split-head h2,.way-intro h2,.recognition-copy h2,.estimate-card h2,.annie-copy-v10 h2,.annie-copy-v11 h2,.annie-copy-v12 h2{margin:0 auto 18px!important;max-width:22ch!important;text-align:center!important;font-size:clamp(1.8rem,3.3vw,3rem)!important;line-height:1.08!important;font-weight:700!important;letter-spacing:-.025em!important}
      .intro-grid p,.section-head>p:last-child,.split-head>p,.way-intro>p:last-child,.recognition-copy>p:not(.kicker),.estimate-card>p:not(.kicker),.annie-copy-v10>p:not(.kicker),.annie-copy-v11>p:not(.kicker),.annie-copy-v12>p:not(.kicker){max-width:760px!important;margin-left:auto!important;margin-right:auto!important;text-align:center!important;font-size:clamp(.98rem,1.25vw,1.1rem)!important;font-weight:450!important;line-height:1.58!important}
      .way-section{grid-template-columns:1fr!important;gap:34px!important}
      .way-intro{position:static!important;text-align:center!important}
      .recognition-section{grid-template-columns:1fr!important}
      .recognition-copy{text-align:center!important}
      .area-links{justify-content:center!important}

      .trust-band>div{padding:14px 18px!important;min-height:0!important}
      .trust-band strong{font-size:1rem!important;line-height:1.18!important}
      .trust-band span{font-size:.8rem!important;line-height:1.32!important}

      .concern-card>img{width:100%!important;height:270px!important;object-fit:cover!important;object-position:center!important;background:#e4eadf!important}
      .concern-photo-label-v12{display:block!important;padding:11px 14px!important;background:#0b4b38!important;color:#f2f8df!important;font-size:.78rem!important;font-weight:900!important;line-height:1.32!important;text-align:center!important}
      .concern-body strong{font-size:1.28rem!important;line-height:1.25!important}

      @media(max-width:760px){
        body{padding-bottom:90px!important}
        .section{padding-top:52px!important;padding-bottom:52px!important}
        .climber-circle-v12 ellipse{stroke-width:11!important}
        .section-title-v12{margin-bottom:18px!important;font-size:1.17rem!important;border-bottom-width:3px!important}
        .intro-grid h2,.section-head h2,.split-head h2,.way-intro h2,.recognition-copy h2,.estimate-card h2,.annie-copy-v10 h2,.annie-copy-v11 h2,.annie-copy-v12 h2{font-size:clamp(1.75rem,8vw,2.45rem)!important;max-width:16ch!important}
        .concern-card>img{height:255px!important}
        .mobile-bar{left:12px!important;right:12px!important;bottom:max(8px,env(safe-area-inset-bottom,8px))!important;border-radius:18px!important;max-height:72px!important}
        .mobile-bar a{min-height:68px!important;padding:6px 3px!important;font-size:.74rem!important;line-height:1.05!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:2px!important}
        .mobile-bar a svg{width:25px!important;height:25px!important;max-height:25px!important}
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => {
    installStyles();
    rebuildClimber();
    replaceConditionPhotos();
    normalizeSectionHierarchy();
    keepAnnieWorking();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 500);
  setTimeout(apply, 1500);
})();