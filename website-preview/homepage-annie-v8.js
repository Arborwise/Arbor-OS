(() => {
  'use strict';

  const VERSION = '20260730-1648';
  const ANNIE_SRC = `assets/annie.webp?v=${VERSION}`;
  const CLASS_NAME = 'annie-exact-v8';

  const installStyles = () => {
    document.getElementById('arborwise-annie-v8-styles')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-annie-v8-styles';
    style.textContent = `
      .hero-annie > .annie-mascot-art,
      .hero-annie > .annie-v5-art,
      .hero-annie > .greg-annie-v7-art,
      .annie-callout > [data-annie],
      .annie-callout > .annie-v5-art,
      .annie-callout > .greg-annie-v7-art{display:none!important}

      .${CLASS_NAME}{
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
        min-height:130px!important;
      }
      .hero-annie > .${CLASS_NAME}{
        width:116px!important;
        height:116px!important;
        margin:0 auto!important;
      }
      .annie-callout{
        display:grid!important;
        grid-template-columns:220px minmax(0,1fr)!important;
        gap:30px!important;
        align-items:center!important;
      }
      .annie-callout > .${CLASS_NAME}{
        width:220px!important;
        height:230px!important;
        margin:auto!important;
      }

      @media(max-width:760px){
        .hero-annie{grid-template-columns:104px minmax(0,1fr)!important;gap:12px!important;min-height:118px!important}
        .hero-annie > .${CLASS_NAME}{width:104px!important;height:104px!important}
        .annie-callout{grid-template-columns:132px minmax(0,1fr)!important;gap:15px!important;padding:22px 16px!important}
        .annie-callout > .${CLASS_NAME}{width:132px!important;height:145px!important}
      }
      @media(max-width:430px){
        .hero-annie{grid-template-columns:94px minmax(0,1fr)!important}
        .hero-annie > .${CLASS_NAME}{width:94px!important;height:94px!important}
        .annie-callout{grid-template-columns:112px minmax(0,1fr)!important;gap:12px!important;padding:20px 13px!important}
        .annie-callout > .${CLASS_NAME}{width:112px!important;height:126px!important}
      }
    `;
    document.head.appendChild(style);
  };

  const makeImage = location => {
    const image = document.createElement('img');
    image.className = `${CLASS_NAME} ${CLASS_NAME}-${location}`;
    image.src = ANNIE_SRC;
    image.alt = 'Annie, the Arborwise owl mascot with a red A, sitting on a leafy branch';
    image.decoding = 'async';
    image.loading = location === 'hero' ? 'eager' : 'lazy';
    image.onerror = () => {
      fetch('assets/annie-correct.b64', { cache: 'no-store' })
        .then(response => {
          if (!response.ok) throw new Error('Annie fallback failed');
          return response.text();
        })
        .then(encoded => {
          image.src = `data:image/webp;base64,${encoded.replace(/\s+/g, '')}`;
        })
        .catch(console.error);
    };
    return image;
  };

  const placeAnnie = () => {
    const hero = document.querySelector('.hero-annie');
    if (hero && !hero.querySelector(`:scope > .${CLASS_NAME}`)) {
      hero.prepend(makeImage('hero'));
    }

    const callout = document.querySelector('.annie-callout');
    if (callout && !callout.querySelector(`:scope > .${CLASS_NAME}`)) {
      callout.prepend(makeImage('callout'));
    }

    document.querySelectorAll(`.${CLASS_NAME}`).forEach(image => {
      image.style.setProperty('display', 'block', 'important');
      image.style.setProperty('visibility', 'visible', 'important');
      image.style.setProperty('opacity', '1', 'important');
    });
  };

  const apply = () => {
    installStyles();
    placeAnnie();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 300);
  setTimeout(apply, 1000);
  setTimeout(apply, 2500);

  const observer = new MutationObserver(() => {
    clearTimeout(observer.timer);
    observer.timer = setTimeout(placeAnnie, 50);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
