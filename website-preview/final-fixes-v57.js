(() => {
  'use strict';

  const STYLE_ID = 'aw-final-fixes-v57';
  const GREEN = '#2f9e4f';
  const GREEN_DARK = '#1f7139';
  const IVORY = '#fffaf0';
  const FOREST = '#174438';

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      /* Phone-call text links are green. Text-message actions remain orange. */
      html body .annie-callout a[href^='tel:'],
      html body .annie-callout .aw-annie-estimate-link,
      html body a[href^='tel:']:not(.button):not(.aw-primary):not(.mobile-bar a){
        color:${GREEN}!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        font-weight:950!important;
        text-decoration:underline!important;
        text-decoration-color:${GREEN}!important;
        text-decoration-thickness:2px!important;
        text-underline-offset:3px!important;
      }
      html body .annie-callout a[href^='tel:']:hover,
      html body .annie-callout a[href^='tel:']:focus-visible,
      html body a[href^='tel:']:not(.button):not(.aw-primary):not(.mobile-bar a):hover,
      html body a[href^='tel:']:not(.button):not(.aw-primary):not(.mobile-bar a):focus-visible{
        color:${GREEN_DARK}!important;
        text-decoration-color:${GREEN_DARK}!important;
      }

      /* Put the balloon close enough to Annie that the tail can be short and natural. */
      html body .aw2-bubble{
        right:15px!important;
        bottom:69px!important;
        width:116px!important;
        min-height:50px!important;
        padding:9px 10px!important;
        overflow:visible!important;
        border:2px solid ${FOREST}!important;
        border-radius:51% 49% 48% 52% / 54% 47% 55% 45%!important;
        background:${IVORY}!important;
        color:#123d31!important;
        box-shadow:0 7px 16px rgba(7,34,26,.2),2px 3px 0 rgba(20,61,49,.12)!important;
      }
      html body .aw2-guide.left .aw2-bubble{
        left:15px!important;
        right:auto!important;
      }
      html body .aw2-bubble.long{
        width:122px!important;
        min-height:53px!important;
      }
      html body .aw2-bubble::after{
        left:71px!important;
        right:auto!important;
        bottom:-3px!important;
        width:23px!important;
        height:9px!important;
        background:${IVORY}!important;
      }
      html body .aw2-guide.left .aw2-bubble::after{
        left:auto!important;
        right:71px!important;
      }

      html body .aw57-tail{
        position:absolute!important;
        z-index:4!important;
        left:72px!important;
        bottom:-39px!important;
        width:34px!important;
        height:42px!important;
        overflow:visible!important;
        transform:none!important;
      }
      html body .aw2-guide.left .aw57-tail{
        left:auto!important;
        right:72px!important;
        transform:scaleX(-1)!important;
      }
      html body .aw57-tail path{
        fill:${IVORY}!important;
        stroke:${FOREST}!important;
        stroke-width:2!important;
        stroke-linejoin:round!important;
        vector-effect:non-scaling-stroke!important;
      }
      html body .aw2-tail,
      html body .aw55-tail,
      html body .aw56-tail{
        display:none!important;
      }

      @media(max-width:700px){
        html body .aw2-bubble{
          right:15px!important;
          bottom:69px!important;
          width:116px!important;
          min-height:50px!important;
        }
        html body .aw2-guide.left .aw2-bubble{
          left:15px!important;
          right:auto!important;
        }
        html body .aw57-tail{
          left:72px!important;
          bottom:-39px!important;
          width:34px!important;
          height:42px!important;
        }
        html body .aw2-guide.left .aw57-tail{
          left:auto!important;
          right:72px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function installTail() {
    const bubble = document.querySelector('.aw2-bubble');
    if (!bubble) return false;

    bubble.querySelectorAll('.aw2-tail,.aw55-tail,.aw56-tail,.aw57-tail').forEach(node => node.remove());

    const tail = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    tail.setAttribute('class', 'aw57-tail');
    tail.setAttribute('viewBox', '0 0 34 42');
    tail.setAttribute('aria-hidden', 'true');
    tail.setAttribute('focusable', 'false');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M2 2 C8 7 12 15 11 23 C10 30 7 36 5 40 C12 36 19 30 21 23 C24 14 17 6 18 2 Z');
    tail.appendChild(path);
    bubble.appendChild(tail);
    bubble.dataset.awTailVersion = '57';
    return true;
  }

  function apply() {
    installStyle();
    return installTail();
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const correctionsLoaded = Boolean(document.getElementById('aw-site-corrections-v56'));
    if (correctionsLoaded && apply()) {
      window.clearInterval(timer);
      window.setTimeout(apply, 500);
    } else if (attempts > 120) {
      window.clearInterval(timer);
      apply();
    }
  }, 100);
})();
