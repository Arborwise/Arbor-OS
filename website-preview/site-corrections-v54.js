(() => {
  'use strict';

  const STYLE_ID = 'aw-site-corrections-v54';
  const CALL_GREEN = '#2f9e4f';
  const CALL_GREEN_DARK = '#1f7139';
  const TEXT_ORANGE = '#ff6700';
  const TEXT_ORANGE_DARK = '#d84b00';
  const ESTIMATE_YELLOW = '#ffd24a';
  const ESTIMATE_YELLOW_DARK = '#e2ad19';
  const INK = '#101711';
  const IVORY = '#fffaf0';
  const FOREST = '#174438';

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      :root{
        --aw-call-green:${CALL_GREEN};
        --aw-call-green-dark:${CALL_GREEN_DARK};
        --aw-text-orange:${TEXT_ORANGE};
        --aw-text-orange-dark:${TEXT_ORANGE_DARK};
        --aw-estimate-yellow:${ESTIMATE_YELLOW};
        --aw-estimate-yellow-dark:${ESTIMATE_YELLOW_DARK};
        --aw-action-ink:${INK};
      }

      /* The hero kicker is one phrase, once. Kill inherited pseudo-copy. */
      html body .hero.aw-hero .aw-kicker{
        display:block!important;
        width:auto!important;
        max-width:92%!important;
        margin:0 auto 18px!important;
        padding:0!important;
        color:#ff7a16!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
        font-size:clamp(1rem,4.1vw,1.16rem)!important;
        font-weight:950!important;
        line-height:1.18!important;
        letter-spacing:.07em!important;
        text-align:center!important;
        text-transform:uppercase!important;
        white-space:normal!important;
      }
      html body .hero.aw-hero .aw-kicker::before,
      html body .hero.aw-hero .aw-kicker::after{
        content:none!important;
        display:none!important;
      }

      /* Action colors are based on what the button actually does. */
      html body .mobile-bar a.aw-action-call,
      html body a.aw-action-call.button,
      html body a.aw-action-call.aw-primary,
      html body button.aw-action-call.button,
      html body .contact-actions .aw-action-call,
      html body .estimate-actions .aw-action-call{
        color:#fff!important;
        background:linear-gradient(180deg,#3fb761 0%,var(--aw-call-green) 54%,var(--aw-call-green-dark) 100%)!important;
        border:2px solid #b9edc7!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.38),0 9px 22px rgba(0,0,0,.24)!important;
        text-shadow:none!important;
      }
      html body .mobile-bar a.aw-action-call *,
      html body a.aw-action-call.button *,
      html body a.aw-action-call.aw-primary *{
        color:#fff!important;
        text-shadow:none!important;
      }

      html body .mobile-bar a.aw-action-text,
      html body a.aw-action-text.button,
      html body a.aw-action-text.aw-primary,
      html body button.aw-action-text.button,
      html body .photo-cta .aw-action-text,
      html body .contact-actions .aw-action-text,
      html body .estimate-actions .aw-action-text{
        color:var(--aw-action-ink)!important;
        background:linear-gradient(180deg,#ff7d1d 0%,var(--aw-text-orange) 54%,var(--aw-text-orange-dark) 100%)!important;
        border:2px solid #ffd0aa!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.38),0 9px 22px rgba(0,0,0,.24)!important;
        text-shadow:none!important;
      }
      html body .mobile-bar a.aw-action-text *,
      html body a.aw-action-text.button *,
      html body a.aw-action-text.aw-primary *{
        color:var(--aw-action-ink)!important;
        text-shadow:none!important;
      }

      html body .mobile-bar a.aw-action-estimate,
      html body a.aw-action-estimate.button,
      html body a.aw-action-estimate.aw-primary,
      html body button.aw-action-estimate.button,
      html body button.aw-action-estimate[type='submit'],
      html body .contact-actions .aw-action-estimate,
      html body .estimate-actions .aw-action-estimate{
        color:var(--aw-action-ink)!important;
        background:linear-gradient(180deg,#ffe178 0%,var(--aw-estimate-yellow) 56%,var(--aw-estimate-yellow-dark) 100%)!important;
        border:2px solid #fff0b5!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.5),0 9px 22px rgba(0,0,0,.24)!important;
        text-shadow:none!important;
      }
      html body .mobile-bar a.aw-action-estimate *,
      html body a.aw-action-estimate.button *,
      html body a.aw-action-estimate.aw-primary *{
        color:var(--aw-action-ink)!important;
        text-shadow:none!important;
      }

      html body .aw-nav a.aw-action-estimate{
        color:var(--aw-estimate-yellow)!important;
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
      }
      html body .service-card a.aw-action-estimate,
      html body .growth-section a.aw-action-estimate,
      html body .aw-annie-estimate-link.aw-action-call{
        background:transparent!important;
        border:0!important;
        box-shadow:none!important;
      }
      html body .service-card a.aw-action-estimate,
      html body .growth-section a.aw-action-estimate{
        color:var(--aw-estimate-yellow-dark)!important;
        text-decoration-color:var(--aw-estimate-yellow-dark)!important;
      }
      html body .aw-annie-estimate-link.aw-action-call{
        color:var(--aw-call-green)!important;
        text-decoration-color:var(--aw-call-green)!important;
      }
      html body .mobile-bar a+ a{
        border-left:1px solid rgba(0,0,0,.34)!important;
      }

      /* Annie: opaque sweet balloon, compact body, short curved mouth hook. */
      html body .aw2-bubble{
        box-sizing:border-box!important;
        right:4px!important;
        bottom:96px!important;
        width:108px!important;
        min-height:48px!important;
        padding:8px 9px!important;
        overflow:visible!important;
        border:2px solid ${FOREST}!important;
        border-radius:49% 51% 47% 53% / 53% 47% 55% 45%!important;
        background:${IVORY}!important;
        color:#123d31!important;
        font-size:8.9px!important;
        line-height:1.15!important;
        box-shadow:0 7px 16px rgba(7,34,26,.2),2px 3px 0 rgba(20,61,49,.12)!important;
        filter:none!important;
        mix-blend-mode:normal!important;
        backdrop-filter:none!important;
        isolation:isolate!important;
      }
      html body .aw2-guide.left .aw2-bubble{
        left:4px!important;
        right:auto!important;
      }
      html body .aw2-bubble.long{
        width:114px!important;
        min-height:52px!important;
        padding:8px 9px!important;
        font-size:8.7px!important;
      }
      html body .aw2-bubble.show{
        opacity:1!important;
        transform:none!important;
      }
      html body .aw2-bubble::after{
        content:''!important;
        display:block!important;
        position:absolute!important;
        z-index:4!important;
        left:53px!important;
        bottom:-3px!important;
        width:20px!important;
        height:8px!important;
        border:0!important;
        border-radius:50%!important;
        background:${IVORY}!important;
      }
      html body .aw2-guide.left .aw2-bubble::after{
        left:auto!important;
        right:53px!important;
      }
      html body .aw2-tail{
        position:absolute!important;
        z-index:3!important;
        left:53px!important;
        right:auto!important;
        bottom:-31px!important;
        width:32px!important;
        height:34px!important;
        overflow:visible!important;
        transform:none!important;
      }
      html body .aw2-guide.left .aw2-tail{
        left:auto!important;
        right:53px!important;
        transform:scaleX(-1)!important;
      }
      html body .aw2-tail-outline,
      html body .aw2-tail-fill{
        fill:none!important;
        stroke-linecap:round!important;
        stroke-linejoin:round!important;
        vector-effect:non-scaling-stroke!important;
      }
      html body .aw2-tail-outline{
        stroke:${FOREST}!important;
        stroke-width:7!important;
      }
      html body .aw2-tail-fill{
        stroke:${IVORY}!important;
        stroke-width:3.8!important;
      }

      @media(max-width:700px){
        html body .hero.aw-hero .aw-kicker{
          max-width:94%!important;
          margin-bottom:17px!important;
          font-size:clamp(.98rem,4.25vw,1.1rem)!important;
        }
        html body .mobile-bar,
        html body .mobile-bar a{
          min-height:78px!important;
          height:78px!important;
        }
        html body .aw2-bubble{
          right:3px!important;
          bottom:94px!important;
          width:106px!important;
          min-height:47px!important;
          font-size:8.7px!important;
        }
        html body .aw2-guide.left .aw2-bubble{
          left:3px!important;
          right:auto!important;
        }
        html body .aw2-bubble.long{width:112px!important;min-height:51px!important}
        html body .aw2-tail{left:52px!important;bottom:-30px!important;width:31px!important;height:33px!important}
        html body .aw2-guide.left .aw2-tail{left:auto!important;right:52px!important}
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeHeroKicker() {
    const kicker = document.querySelector('.hero.aw-hero .aw-kicker');
    if (!kicker) return false;
    const correctText = 'PROFESSIONAL NORTH TEXAS TREE CARE';
    if (kicker.textContent.trim() !== correctText) kicker.textContent = correctText;
    return true;
  }

  function classifyActions() {
    document.querySelectorAll('a[href],button').forEach(element => {
      const href = element.getAttribute('href') || '';
      const text = (element.textContent || '').trim().toLowerCase();
      const isSubmit = element.matches('button[type="submit"]');
      let targetClass = '';

      if (/^tel:/i.test(href) || /\bcall\b/.test(text)) {
        targetClass = 'aw-action-call';
      } else if (/^sms:/i.test(href) || /text photos|send photos|text us/.test(text)) {
        targetClass = 'aw-action-text';
      } else if (/#estimate(?:$|\?)/i.test(href) || /free estimate|\bestimate\b/.test(text) || isSubmit) {
        targetClass = 'aw-action-estimate';
      }

      ['aw-action-call','aw-action-text','aw-action-estimate'].forEach(className => {
        element.classList.toggle(className,className === targetClass);
      });
    });
    return true;
  }

  function rebuildAnnieTail() {
    const bubbles = document.querySelectorAll('.aw2-bubble');
    if (!bubbles.length) return false;

    bubbles.forEach(bubble => {
      if (bubble.dataset.awTailV54 === 'true' && bubble.querySelector('.aw2-tail[data-aw-tail-v54]')) return;

      let copy = bubble.querySelector('.aw2-bubble-copy');
      if (!copy) {
        copy = document.createElement('span');
        copy.className = 'aw2-bubble-copy';
        copy.textContent = bubble.textContent || '';
      }
      bubble.replaceChildren(copy);

      const tail = document.createElementNS('http://www.w3.org/2000/svg','svg');
      tail.setAttribute('class','aw2-tail');
      tail.setAttribute('data-aw-tail-v54','true');
      tail.setAttribute('viewBox','0 0 32 34');
      tail.setAttribute('aria-hidden','true');
      tail.setAttribute('focusable','false');

      const curve = 'M3 3 C12 6 20 11 22 17 C24 23 21 29 16 32';
      const outline = document.createElementNS('http://www.w3.org/2000/svg','path');
      outline.setAttribute('class','aw2-tail-outline');
      outline.setAttribute('d',curve);

      const fill = document.createElementNS('http://www.w3.org/2000/svg','path');
      fill.setAttribute('class','aw2-tail-fill');
      fill.setAttribute('d',curve);

      tail.append(outline,fill);
      bubble.appendChild(tail);
      bubble.dataset.awTailV54 = 'true';
    });
    return true;
  }

  function applyCorrections() {
    installStyle();
    normalizeHeroKicker();
    classifyActions();
    rebuildAnnieTail();
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    const kickerReady = normalizeHeroKicker();
    const bubbleReady = rebuildAnnieTail();
    classifyActions();
    installStyle();
    if ((kickerReady && bubbleReady) || attempts > 100) window.clearInterval(timer);
  },100);

  let observerTimer = 0;
  const observer = new MutationObserver(() => {
    window.clearTimeout(observerTimer);
    observerTimer = window.setTimeout(() => {
      normalizeHeroKicker();
      classifyActions();
      rebuildAnnieTail();
      installStyle();
    },80);
  });
  observer.observe(document.documentElement,{subtree:true,childList:true});

  applyCorrections();
})();
