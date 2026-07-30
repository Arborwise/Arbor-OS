(() => {
  'use strict';

  const STYLE_ID = 'arborwise-greg-fix-v7';
  const ANNIE_CLASS = 'greg-annie-v7-art';
  let annieObjectUrl = '';
  let anniePromise = null;

  const installStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html body.arborwise-dark-canvas .brand-wrap.brand-layout{
        padding-top:8px!important;
      }
      html body.arborwise-dark-canvas .brand-main{
        background:#050505!important;
        border:1px solid rgba(212,160,63,.82)!important;
        border-radius:30px!important;
        padding:10px 20px!important;
        box-shadow:0 16px 34px rgba(0,0,0,.34)!important;
        overflow:hidden!important;
      }
      html body.arborwise-dark-canvas .brand-main .header-proof-badge,
      html body.arborwise-dark-canvas .brand-main .header-contact-left.header-proof-badge,
      html body.arborwise-dark-canvas .brand-main .header-contact-right.header-proof-badge{
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
      }
      html body.arborwise-dark-canvas .brand-main .header-proof-badge small{
        color:#d8f277!important;
      }
      html body.arborwise-dark-canvas .brand-main .header-proof-badge strong{
        color:#fffef9!important;
      }
      html body.arborwise-dark-canvas .brand-main .header-proof-badge svg{
        stroke:#d4a03f!important;
      }

      html body.arborwise-dark-canvas .trust-band{
        gap:10px!important;
      }
      html body.arborwise-dark-canvas .trust-band div{
        padding:14px 18px!important;
        border-radius:18px!important;
        min-height:0!important;
      }
      html body.arborwise-dark-canvas .trust-band strong{
        color:#2f8a47!important;
        font-size:1rem!important;
        line-height:1.16!important;
      }
      html body.arborwise-dark-canvas .trust-band span{
        margin-top:3px!important;
        font-size:.8rem!important;
        line-height:1.28!important;
      }

      html body.arborwise-dark-canvas .annie-callout>[data-annie],
      html body.arborwise-dark-canvas .annie-callout>.annie-v5-art,
      html body.arborwise-dark-canvas .hero-annie>.annie-v5-art,
      html body.arborwise-dark-canvas .hero-annie>.annie-mascot-art{
        display:none!important;
      }
      html body.arborwise-dark-canvas .${ANNIE_CLASS}{
        display:block!important;
        flex:0 0 auto!important;
        background-repeat:no-repeat!important;
        background-position:center!important;
        background-size:contain!important;
        visibility:visible!important;
        opacity:1!important;
        filter:drop-shadow(0 14px 14px rgba(6,40,31,.22))!important;
      }
      html body.arborwise-dark-canvas .annie-callout{
        grid-template-columns:210px minmax(0,1fr)!important;
        gap:30px!important;
        align-items:center!important;
      }
      html body.arborwise-dark-canvas .annie-callout>.${ANNIE_CLASS}{
        width:210px!important;
        height:220px!important;
        margin:auto!important;
      }
      html body.arborwise-dark-canvas .hero-annie>.${ANNIE_CLASS}{
        width:108px!important;
        height:108px!important;
      }

      @media(max-width:760px){
        html body.arborwise-dark-canvas .brand-wrap.brand-layout{
          padding:7px 9px 4px!important;
        }
        html body.arborwise-dark-canvas .brand-main{
          border-radius:24px!important;
          padding:8px 7px!important;
        }
        html body.arborwise-dark-canvas .trust-band{
          gap:8px!important;
          padding-left:12px!important;
          padding-right:12px!important;
        }
        html body.arborwise-dark-canvas .trust-band div{
          padding:11px 16px!important;
          border-radius:17px!important;
        }
        html body.arborwise-dark-canvas .trust-band strong{
          font-size:.98rem!important;
        }
        html body.arborwise-dark-canvas .trust-band span{
          margin-top:2px!important;
          font-size:.78rem!important;
          line-height:1.23!important;
        }
        html body.arborwise-dark-canvas .annie-callout{
          grid-template-columns:116px minmax(0,1fr)!important;
          gap:14px!important;
          padding:22px 16px!important;
        }
        html body.arborwise-dark-canvas .annie-callout>.${ANNIE_CLASS}{
          width:116px!important;
          height:138px!important;
        }
        html body.arborwise-dark-canvas .hero-annie>.${ANNIE_CLASS}{
          width:90px!important;
          height:90px!important;
        }
      }

      @media(max-width:430px){
        html body.arborwise-dark-canvas .brand-main{
          border-radius:22px!important;
          padding:7px 5px!important;
        }
        html body.arborwise-dark-canvas .trust-band div{
          padding:10px 14px!important;
        }
        html body.arborwise-dark-canvas .trust-band strong{
          font-size:.94rem!important;
        }
        html body.arborwise-dark-canvas .trust-band span{
          font-size:.75rem!important;
        }
        html body.arborwise-dark-canvas .annie-callout{
          grid-template-columns:102px minmax(0,1fr)!important;
          gap:11px!important;
          padding:20px 13px!important;
        }
        html body.arborwise-dark-canvas .annie-callout>.${ANNIE_CLASS}{
          width:102px!important;
          height:122px!important;
        }
      }
    `;
    document.head.appendChild(style);
  };

  const ensureAnnieArt = () => {
    const callout = document.querySelector('.annie-callout');
    if (callout && !callout.querySelector(`:scope > .${ANNIE_CLASS}`)) {
      const art = document.createElement('div');
      art.className = ANNIE_CLASS;
      art.setAttribute('role', 'img');
      art.setAttribute('aria-label', 'Annie, the Arborwise owl mascot with a red A');
      callout.prepend(art);
    }

    const hero = document.querySelector('.hero-annie');
    if (hero && !hero.querySelector(`:scope > .${ANNIE_CLASS}`)) {
      const art = document.createElement('div');
      art.className = ANNIE_CLASS;
      art.setAttribute('role', 'img');
      art.setAttribute('aria-label', 'Annie, the Arborwise owl mascot with a red A');
      hero.prepend(art);
    }

    if (annieObjectUrl) {
      document.querySelectorAll(`.${ANNIE_CLASS}`).forEach(node => {
        node.style.setProperty('background-image', `url("${annieObjectUrl}")`, 'important');
      });
    }
  };

  const base64ToObjectUrl = encoded => {
    const clean = encoded.replace(/\s+/g, '');
    const binary = atob(clean);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return URL.createObjectURL(new Blob([bytes], { type: 'image/webp' }));
  };

  const loadAnnie = () => {
    if (anniePromise) return anniePromise;
    const paths = ['assets/annie-correct.b64', 'assets/annie-tiny-v4.b64'];
    anniePromise = paths.reduce(
      (promise, path) => promise.catch(() => fetch(path, { cache: 'no-store' }).then(response => {
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return response.text();
      })),
      Promise.reject(new Error('Start Annie fallback chain'))
    ).then(encoded => {
      if (annieObjectUrl) URL.revokeObjectURL(annieObjectUrl);
      annieObjectUrl = base64ToObjectUrl(encoded);
      ensureAnnieArt();
      return annieObjectUrl;
    }).catch(error => {
      console.error('Annie could not be loaded.', error);
      return '';
    });
    return anniePromise;
  };

  const apply = () => {
    installStyles();
    ensureAnnieArt();
    loadAnnie();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 350);
  setTimeout(apply, 1200);
  setTimeout(apply, 2800);

  const observer = new MutationObserver(mutations => {
    if (mutations.some(mutation => mutation.addedNodes.length)) {
      clearTimeout(observer.timer);
      observer.timer = setTimeout(() => {
        ensureAnnieArt();
      }, 80);
    }
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
