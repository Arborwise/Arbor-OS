(() => {
  'use strict';

  const VERSION = '20260730-1718';
  const STYLE_ID = 'arborwise-final-v10';
  const ANNIE_SRC = `assets/annie.webp?v=${VERSION}`;

  const concerns = [
    ['https://commons.wikimedia.org/wiki/Special:Redirect/file/Fig%20rust%20-%209224490573.jpg?width=1200','Close-up of tree leaves showing brown leaf spots, curled edges, and damaged tissue','Leaf spots, browning, curling, and early leaf drop'],
    ['https://commons.wikimedia.org/wiki/Special:Redirect/file/Poor%20canopy%20health%20at%20Holly%20House%2C%202020%20%28fcef31e7-ba1e-4800-b31a-6a461cf9f5df%29.jpg?width=1200','Tree canopy with visible dead branches and thinning foliage','Dead branches and a thinning canopy'],
    ['https://commons.wikimedia.org/wiki/Special:Redirect/file/Wild%20mushrooms%20growing%20inside%20a%20tree%20hollow.jpg?width=1200','Mushrooms growing inside a cavity in a tree trunk','Cracks, cavities, loose bark, and mushrooms'],
    ['https://commons.wikimedia.org/wiki/Special:Redirect/file/Exposed%20Roots.jpg?width=1200','Exposed tree roots and disturbed soil around the trunk base','A new lean, exposed roots, and moving soil']
  ];

  const rebuildHeroMedia = () => {
    const media = document.querySelector('.hero-media');
    if (!media || media.dataset.v10Hero === 'true') return;
    media.dataset.v10Hero = 'true';
    media.innerHTML = `
      <div class="climber-stage-v10">
        <img src="assets/hero-climber.webp?v=${VERSION}" alt="An Arborwise climber positioned high in a mature North Texas tree">
        <svg class="climber-circle-v10" viewBox="0 0 1800 1238" preserveAspectRatio="none" aria-hidden="true">
          <ellipse cx="780" cy="865" rx="155" ry="180"></ellipse>
        </svg>
      </div>
      <figcaption><strong>Arborwise climber at work</strong><span>The circle identifies the climber while controlled rope techniques protect the tree and the property below.</span></figcaption>`;
  };

  const fixConcernPhotos = () => {
    const cards = [...document.querySelectorAll('.concern-grid .concern-card')];
    cards.forEach((card,index) => {
      const details = concerns[index];
      const image = card.querySelector('img');
      if (!details || !image) return;
      image.src = details[0];
      image.alt = details[1];
      image.loading = index === 0 ? 'eager' : 'lazy';
      image.decoding = 'async';
      image.referrerPolicy = 'no-referrer';
      card.querySelectorAll('.concern-photo-label').forEach(node => node.remove());
      const label = document.createElement('span');
      label.className = 'concern-photo-label concern-photo-label-v10';
      label.textContent = details[2];
      image.insertAdjacentElement('afterend',label);
    });

    const section = document.querySelector('.concern-section');
    if (section && !section.querySelector('.photo-credit-v10')) {
      const credit = document.createElement('p');
      credit.className = 'photo-credit-v10';
      credit.innerHTML = 'Condition reference photos: <a href="https://commons.wikimedia.org/" target="_blank" rel="noopener noreferrer">Wikimedia Commons</a>.';
      section.querySelector('.concern-grid')?.insertAdjacentElement('afterend',credit);
    }
  };

  const rebuildHeroAnnie = () => {
    const hero = document.querySelector('.hero-annie');
    if (!hero || hero.dataset.v10Annie === 'true') return;
    hero.dataset.v10Annie = 'true';
    hero.innerHTML = `<img class="annie-hero-v10" src="${ANNIE_SRC}" alt="Annie, the Arborwise owl mascot with a red A, sitting on a leafy branch"><p><strong>Annie says:</strong> Send one whole-tree photo, one close-up, and one photo of the trunk base.</p>`;
  };

  const rebuildAnnieCallout = () => {
    const callout = document.querySelector('.annie-callout');
    if (!callout || callout.dataset.v10Annie === 'true') return;
    callout.dataset.v10Annie = 'true';
    callout.innerHTML = `
      <img class="annie-callout-v10" src="${ANNIE_SRC}" alt="Annie, the Arborwise owl mascot with a red A, sitting on a leafy branch">
      <div class="annie-copy-v10">
        <p class="kicker">Annie's Reminder</p>
        <h2 id="annie-title">You do not need to know the diagnosis before you call.</h2>
        <p id="annieTip">Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.</p>
        <button class="plain-button" id="annieButton" type="button">Hear another Annie tip</button>
      </div>`;
  };

  const installStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .climber-highlight{display:none!important}
      .climber-stage-v10{position:relative!important;width:100%!important;aspect-ratio:1800/1238!important;overflow:hidden!important;background:#0b4b38!important}
      .climber-stage-v10>img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}
      .climber-circle-v10{position:absolute!important;inset:0!important;width:100%!important;height:100%!important;display:block!important;z-index:9!important;pointer-events:none!important;overflow:visible!important}
      .climber-circle-v10 ellipse{fill:none!important;stroke:#d8f277!important;stroke-width:14!important;vector-effect:non-scaling-stroke!important;filter:drop-shadow(0 0 10px rgba(216,242,119,.85))!important}
      .hero-media{display:flex!important;flex-direction:column!important;overflow:hidden!important}
      .hero-media>figcaption{position:static!important;inset:auto!important;width:100%!important;margin:0!important;border:0!important;border-radius:0!important;background:#0b4b38!important;color:#fff!important;padding:16px 20px!important;display:grid!important;gap:3px!important}
      .hero-media>figcaption strong{color:#d8f277!important}
      .hero-media>figcaption span{color:#edf5f1!important;font-size:.88rem!important;line-height:1.42!important}

      .concern-card>img{width:100%!important;height:255px!important;object-fit:cover!important;object-position:center!important;background:#dfe8db!important}
      .concern-photo-label-v10{display:block!important;padding:9px 12px!important;background:#0b4b38!important;color:#eef8d7!important;font-size:.72rem!important;font-weight:900!important;line-height:1.3!important;text-align:center!important}
      .photo-credit-v10{margin:12px 0 0!important;text-align:center!important;color:#64756d!important;font-size:.68rem!important}
      .photo-credit-v10 a{color:#2f8a47!important}

      .hero-annie[data-v10-annie],.hero-annie[data-v10-annie="true"]{display:flex!important;align-items:center!important;justify-content:center!important;gap:16px!important;text-align:left!important;padding:14px 18px!important;overflow:visible!important}
      .hero-annie[data-v10-annie]>*:not(.annie-hero-v10),.hero-annie[data-v10-annie="true"]>*:not(.annie-hero-v10):not(p){display:none!important}
      .annie-hero-v10{display:block!important;width:112px!important;height:112px!important;object-fit:contain!important;flex:0 0 auto!important;visibility:visible!important;opacity:1!important;filter:drop-shadow(0 8px 10px rgba(0,0,0,.15))!important}
      .hero-annie[data-v10-annie] p,.hero-annie[data-v10-annie="true"] p{margin:0!important;color:#244b3b!important;font-weight:800!important;line-height:1.38!important;text-align:left!important}

      .annie-callout[data-v10-annie],.annie-callout[data-v10-annie="true"]{max-width:calc(1380px - 40px)!important;margin:28px auto 36px!important;padding:42px 52px!important;display:flex!important;align-items:center!important;justify-content:center!important;gap:42px!important;text-align:left!important;overflow:hidden!important}
      .annie-callout-v10{display:block!important;width:250px!important;height:250px!important;object-fit:contain!important;flex:0 0 auto!important;visibility:visible!important;opacity:1!important;filter:drop-shadow(0 14px 18px rgba(0,0,0,.18))!important}
      .annie-copy-v10{width:min(100%,760px)!important;text-align:left!important}
      .annie-copy-v10 h2{font-size:clamp(2.2rem,3.8vw,4rem)!important;line-height:1.02!important;margin-bottom:18px!important;color:#06281f!important;max-width:14ch!important}
      .annie-copy-v10 p:not(.kicker){font-size:1.08rem!important;line-height:1.55!important;color:#40574d!important}

      @media(max-width:760px){
        .climber-circle-v10 ellipse{stroke-width:10!important}
        .hero-media>figcaption{padding:13px 15px 15px!important}
        .concern-card>img{height:245px!important}
        .hero-annie[data-v10-annie],.hero-annie[data-v10-annie="true"]{flex-direction:column!important;text-align:center!important;gap:8px!important;padding:12px 14px!important}
        .annie-hero-v10{width:118px!important;height:118px!important}
        .hero-annie[data-v10-annie] p,.hero-annie[data-v10-annie="true"] p{text-align:center!important;font-size:.9rem!important}
        .annie-callout[data-v10-annie],.annie-callout[data-v10-annie="true"]{margin:20px 12px 34px!important;padding:28px 18px!important;flex-direction:column!important;gap:14px!important;text-align:center!important}
        .annie-callout-v10{width:190px!important;height:190px!important}
        .annie-copy-v10{text-align:center!important}
        .annie-copy-v10 h2{font-size:clamp(2rem,9.4vw,3rem)!important;max-width:14ch!important;margin-left:auto!important;margin-right:auto!important}
        .annie-copy-v10 p:not(.kicker){font-size:1rem!important}
      }
      @media(max-width:430px){
        .annie-hero-v10{width:105px!important;height:105px!important}
        .annie-callout-v10{width:165px!important;height:165px!important}
        .annie-copy-v10 h2{font-size:clamp(1.95rem,9vw,2.7rem)!important}
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => {
    installStyles();
    rebuildHeroMedia();
    fixConcernPhotos();
    rebuildHeroAnnie();
    rebuildAnnieCallout();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply,400);
  setTimeout(apply,1400);

  const observer = new MutationObserver(() => {
    clearTimeout(observer.timer);
    observer.timer = setTimeout(apply,100);
  });
  observer.observe(document.body,{childList:true,subtree:true});
})();
