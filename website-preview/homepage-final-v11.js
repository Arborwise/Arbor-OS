(() => {
  'use strict';

  const VERSION = '20260730-1728';
  const STYLE_ID = 'arborwise-final-v11';

  const tips = [
    'Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.',
    'Send one photo of the whole tree, one close-up of the concern, and one photo of the trunk base.',
    'A sudden change matters more than a condition that has looked the same for years.',
    'Do not stand under a cracked limb to take a picture. Step back and use your camera zoom.',
    'Watering, soil changes, construction, storms, and recent pruning can all help explain what a tree is doing.'
  ];

  const rebuildClimber = () => {
    const media = document.querySelector('.hero-media');
    if (!media) return;

    media.dataset.v11Hero = 'true';
    media.innerHTML = `
      <div class="climber-stage-v11">
        <img src="assets/hero-climber.webp?v=${VERSION}" alt="An Arborwise climber positioned in a mature North Texas tree">
        <span class="climber-ring-v11" aria-hidden="true"></span>
      </div>
      <figcaption><strong>Arborwise climber at work</strong><span>The circle identifies the climber while controlled rope techniques protect the tree and the property below.</span></figcaption>`;
  };

  const colorTrustHeadings = () => {
    const cards = [...document.querySelectorAll('.trust-band > div')];
    const colors = ['#237a43', '#a96f12', '#668f1f', '#0d7068'];
    cards.forEach((card, index) => {
      const heading = card.querySelector('strong');
      if (!heading) return;
      heading.style.setProperty('color', colors[index] || colors[0], 'important');
    });
  };

  const wireAnnieTips = () => {
    const button = document.getElementById('annieButton');
    const tip = document.getElementById('annieTip');
    if (!button || !tip || button.dataset.v11Bound === 'true') return;

    button.dataset.v11Bound = 'true';
    tip.setAttribute('aria-live', 'polite');
    let index = Math.max(0, tips.indexOf(tip.textContent.trim()));

    button.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      index = (index + 1) % tips.length;
      tip.textContent = tips[index];
      button.textContent = 'Hear another Annie tip';
    });
  };

  const installStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .climber-highlight,.climber-circle-v10{display:none!important}
      .climber-stage-v11{
        position:relative!important;
        width:100%!important;
        overflow:hidden!important;
        background:#0b4b38!important;
        padding-bottom:9%!important;
      }
      .climber-stage-v11>img{
        display:block!important;
        width:100%!important;
        height:auto!important;
        object-fit:contain!important;
        object-position:center!important;
      }
      .climber-ring-v11{
        position:absolute!important;
        left:34.5%!important;
        top:67.5%!important;
        width:20.5%!important;
        aspect-ratio:1/1!important;
        border:7px solid #d8f277!important;
        border-radius:50%!important;
        box-shadow:0 0 0 3px rgba(6,40,31,.82),0 0 22px rgba(216,242,119,.8)!important;
        z-index:12!important;
        pointer-events:none!important;
        background:transparent!important;
      }
      .hero-media{display:flex!important;flex-direction:column!important;overflow:hidden!important}
      .hero-media>figcaption{position:static!important;inset:auto!important;width:100%!important;margin:0!important;border:0!important;border-radius:0!important;background:#0b4b38!important;color:#fff!important;padding:16px 20px!important;display:grid!important;gap:3px!important}
      .hero-media>figcaption strong{color:#d8f277!important}
      .hero-media>figcaption span{color:#edf5f1!important;font-size:.88rem!important;line-height:1.42!important}

      .trust-band>div{border-top-width:2px!important}
      .trust-band>div:nth-child(1){border-top-color:#237a43!important}
      .trust-band>div:nth-child(2){border-top-color:#a96f12!important}
      .trust-band>div:nth-child(3){border-top-color:#668f1f!important}
      .trust-band>div:nth-child(4){border-top-color:#0d7068!important}

      #annieTip{min-height:5.1em!important}
      #annieButton{touch-action:manipulation!important}

      @media(max-width:760px){
        .climber-stage-v11{padding-bottom:12%!important}
        .climber-ring-v11{left:34%!important;top:66%!important;width:22%!important;border-width:6px!important}
        #annieTip{min-height:6.2em!important}
      }
    `;
    document.head.appendChild(style);
  };

  const apply = () => {
    installStyles();
    rebuildClimber();
    colorTrustHeadings();
    wireAnnieTips();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 350);
  setTimeout(apply, 1200);
})();