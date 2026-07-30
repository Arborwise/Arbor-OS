(() => {
  'use strict';

  const VERSION = '20260730-1722';
  const STYLE_ID = 'arborwise-final-v9-styles';
  const ANNIE_CLASS = 'annie-final-v9';
  let annieDataUrl = '';
  let anniePromise = null;

  const installStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .hero-image-stage{
        position:relative!important;
        overflow:hidden!important;
      }
      .hero-image-stage>.climber-highlight{
        position:absolute!important;
        display:block!important;
        box-sizing:border-box!important;
        left:33.5%!important;
        top:53.5%!important;
        width:18%!important;
        height:27%!important;
        margin:0!important;
        padding:0!important;
        background:transparent!important;
        border:6px solid #d8f277!important;
        border-radius:50%!important;
        box-shadow:0 0 0 3px rgba(6,40,31,.82),0 0 24px rgba(216,242,119,.72)!important;
        z-index:8!important;
        pointer-events:none!important;
      }

      .hero-copy h1 sup{
        display:inline-block!important;
        font-family:Arial,sans-serif!important;
        font-size:.43em!important;
        font-weight:900!important;
        line-height:1!important;
        margin-left:.1em!important;
        vertical-align:super!important;
      }

      .hero-annie>img:not(.${ANNIE_CLASS}),
      .hero-annie>[data-annie]:not(.${ANNIE_CLASS}),
      .hero-annie>[class*="annie"]:not(.${ANNIE_CLASS}),
      .annie-callout>img:not(.${ANNIE_CLASS}),
      .annie-callout>[data-annie]:not(.${ANNIE_CLASS}),
      .annie-callout>[class*="annie"]:not(.${ANNIE_CLASS}){
        display:none!important;
        visibility:hidden!important;
        opacity:0!important;
      }

      .${ANNIE_CLASS}{
        display:block!important;
        visibility:visible!important;
        opacity:1!important;
        object-fit:contain!important;
        background:transparent!important;
        filter:drop-shadow(0 12px 12px rgba(6,40,31,.22))!important;
        flex:0 0 auto!important;
      }
      .hero-annie{
        display:grid!important;
        grid-template-columns:116px minmax(0,1fr)!important;
        gap:14px!important;
        align-items:center!important;
        overflow:visible!important;
      }
      .hero-annie>.${ANNIE_CLASS}{
        width:116px!important;
        height:116px!important;
        margin:0 auto!important;
      }
      .hero-annie>p{
        min-width:0!important;
        margin:0!important;
        text-align:left!important;
      }
      .annie-callout{
        display:grid!important;
        grid-template-columns:220px minmax(0,1fr)!important;
        gap:30px!important;
        align-items:center!important;
        overflow:visible!important;
      }
      .annie-callout>.${ANNIE_CLASS}{
        width:220px!important;
        height:230px!important;
        margin:auto!important;
      }

      @media(max-width:760px){
        .hero-image-stage>.climber-highlight{border-width:5px!important}
        .hero-annie{grid-template-columns:104px minmax(0,1fr)!important;gap:12px!important}
        .hero-annie>.${ANNIE_CLASS}{width:104px!important;height:104px!important}
        .annie-callout{grid-template-columns:132px minmax(0,1fr)!important;gap:15px!important;padding:22px 16px!important}
        .annie-callout>.${ANNIE_CLASS}{width:132px!important;height:145px!important}
      }

      @media(max-width:430px){
        .hero-copy h1 sup{font-size:.46em!important}
        .hero-annie{grid-template-columns:96px minmax(0,1fr)!important;gap:12px!important}
        .hero-annie>.${ANNIE_CLASS}{width:96px!important;height:96px!important}
        .annie-callout{grid-template-columns:112px minmax(0,1fr)!important;gap:12px!important;padding:20px 13px!important}
        .annie-callout>.${ANNIE_CLASS}{width:112px!important;height:126px!important}
      }
    `;
    document.head.appendChild(style);
  };

  const ensureClimberCircle = () => {
    const media = document.querySelector('.hero-media');
    if (!media) return;

    let stage = media.querySelector('.hero-image-stage');
    const image = media.querySelector('.hero-image-stage>img, :scope>img');
    if (!stage && image) {
      stage = document.createElement('div');
      stage.className = 'hero-image-stage';
      media.insertBefore(stage, image);
      stage.appendChild(image);
    }
    if (!stage) return;

    const circles = [...stage.querySelectorAll(':scope>.climber-highlight')];
    circles.slice(1).forEach(node => node.remove());
    if (!circles.length) {
      const circle = document.createElement('span');
      circle.className = 'climber-highlight';
      circle.setAttribute('aria-hidden', 'true');
      stage.appendChild(circle);
    }
  };

  const loadAnnie = () => {
    if (annieDataUrl) return Promise.resolve(annieDataUrl);
    if (anniePromise) return anniePromise;

    const paths = [
      `assets/annie-correct.b64?v=${VERSION}`,
      `assets/annie-tiny-v4.b64?v=${VERSION}`
    ];

    anniePromise = paths.reduce(
      (promise, path) => promise.catch(() => fetch(path, { cache: 'no-store' }).then(response => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.text();
      })),
      Promise.reject(new Error('Start Annie fallback chain'))
    ).then(encoded => {
      annieDataUrl = `data:image/webp;base64,${encoded.replace(/\s+/g, '')}`;
      return annieDataUrl;
    }).catch(error => {
      console.error('Annie could not be loaded.', error);
      return '';
    });

    return anniePromise;
  };

  const makeAnnie = location => {
    const image = document.createElement('img');
    image.className = `${ANNIE_CLASS} ${ANNIE_CLASS}-${location}`;
    image.alt = 'Annie, the Arborwise owl mascot with a red A';
    image.decoding = 'async';
    image.loading = location === 'hero' ? 'eager' : 'lazy';
    return image;
  };

  const ensureOneAnnie = (container, location) => {
    if (!container) return null;
    const matches = [...container.querySelectorAll(`:scope>.${ANNIE_CLASS}`)];
    matches.slice(1).forEach(node => node.remove());
    if (matches[0]) return matches[0];
    const image = makeAnnie(location);
    container.prepend(image);
    return image;
  };

  const placeAnnie = () => {
    const heroImage = ensureOneAnnie(document.querySelector('.hero-annie'), 'hero');
    const calloutImage = ensureOneAnnie(document.querySelector('.annie-callout'), 'callout');

    loadAnnie().then(source => {
      if (!source) return;
      [heroImage, calloutImage].filter(Boolean).forEach(image => {
        if (image.getAttribute('src') !== source) image.setAttribute('src', source);
        image.style.setProperty('display', 'block', 'important');
        image.style.setProperty('visibility', 'visible', 'important');
        image.style.setProperty('opacity', '1', 'important');
      });
    });
  };

  const apply = () => {
    installStyles();
    ensureClimberCircle();
    placeAnnie();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
  setTimeout(apply, 2500);

  const observer = new MutationObserver(() => {
    clearTimeout(observer.timer);
    observer.timer = setTimeout(() => {
      installStyles();
      ensureClimberCircle();
      placeAnnie();
    }, 70);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
