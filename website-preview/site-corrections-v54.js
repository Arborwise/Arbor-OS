(() => {
  'use strict';

  const STYLE_ID = 'aw-site-corrections-v56';
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
    ['aw-site-corrections-v54','aw-site-corrections-v55'].forEach(id => document.getElementById(id)?.remove());

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

      /* Smaller hero headline with readable space between all three lines. */
      html body .hero.aw-hero .aw-copy h1{
        max-width:12ch!important;
        margin:0 auto 24px!important;
        font-size:clamp(2.9rem,7vw,5rem)!important;
        line-height:1.04!important;
        letter-spacing:-.02em!important;
      }
      html body .hero.aw-hero .aw-copy h1 span{
        line-height:inherit!important;
      }

      /* Action colors based on the action itself. */
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

      /* Annie tip is an orange text link, not a block button. */
      html body #annieButton,
      html body .annie-callout #annieButton.plain-button{
        appearance:none!important;
        -webkit-appearance:none!important;
        display:inline!important;
        width:auto!important;
        min-width:0!important;
        min-height:0!important;
        height:auto!important;
        margin:14px auto 0!important;
        padding:0!important;
        color:var(--aw-text-orange)!important;
        background:transparent!important;
        border:0!important;
        border-radius:0!important;
        box-shadow:none!important;
        font:900 1rem/1.25 system-ui,-apple-system,"Segoe UI",sans-serif!important;
        letter-spacing:0!important;
        text-decoration:underline!important;
        text-decoration-thickness:2px!important;
        text-underline-offset:3px!important;
        text-shadow:none!important;
        cursor:pointer!important;
      }
      html body #annieButton:hover,
      html body #annieButton:focus-visible{
        color:var(--aw-text-orange-dark)!important;
        background:transparent!important;
        transform:none!important;
      }
      html body #annieButton::before,
      html body #annieButton::after{
        content:none!important;
        display:none!important;
      }

      /* Stable speech balloon centered over Annie. Tail endpoint is her beak. */
      html body .aw2-bubble{
        box-sizing:border-box!important;
        right:17px!important;
        bottom:84px!important;
        width:114px!important;
        min-height:49px!important;
        padding:9px 10px!important;
        overflow:visible!important;
        border:2px solid ${FOREST}!important;
        border-radius:50% 50% 47% 53% / 54% 47% 56% 44%!important;
        background:${IVORY}!important;
        color:#123d31!important;
        font-size:9px!important;
        line-height:1.16!important;
        box-shadow:0 7px 16px rgba(7,34,26,.2),2px 3px 0 rgba(20,61,49,.12)!important;
        filter:none!important;
        mix-blend-mode:normal!important;
        backdrop-filter:none!important;
        isolation:isolate!important;
      }
      html body .aw2-guide.left .aw2-bubble{
        left:17px!important;
        right:auto!important;
      }
      html body .aw2-bubble.long{
        width:120px!important;
        min-height:53px!important;
        padding:9px 10px!important;
        font-size:8.8px!important;
      }
      html body .aw2-bubble.show{
        opacity:1!important;
        transform:none!important;
      }
      html body .aw2-bubble::after{
        content:''!important;
        display:block!important;
        position:absolute!important;
        z-index:5!important;
        left:67px!important;
        bottom:-3px!important;
        width:25px!important;
        height:9px!important;
        border:0!important;
        border-radius:50%!important;
        background:${IVORY}!important;
      }
      html body .aw2-guide.left .aw2-bubble::after{
        left:auto!important;
        right:67px!important;
      }
      html body .aw56-tail{
        position:absolute!important;
        z-index:4!important;
        left:69px!important;
        bottom:-39px!important;
        width:34px!important;
        height:42px!important;
        overflow:visible!important;
        transform:none!important;
      }
      html body .aw2-guide.left .aw56-tail{
        left:auto!important;
        right:69px!important;
        transform:scaleX(-1)!important;
      }
      html body .aw56-tail path{
        fill:${IVORY}!important;
        stroke:${FOREST}!important;
        stroke-width:2!important;
        stroke-linejoin:round!important;
        vector-effect:non-scaling-stroke!important;
      }
      html body .aw2-tail,
      html body .aw55-tail{
        display:none!important;
      }

      @media(max-width:700px){
        html body .hero.aw-hero .aw-kicker{
          max-width:94%!important;
          margin-bottom:17px!important;
          font-size:clamp(.98rem,4.25vw,1.1rem)!important;
        }
        html body .hero.aw-hero .aw-copy h1{
          max-width:12ch!important;
          margin-bottom:24px!important;
          font-size:clamp(2.45rem,10.2vw,3rem)!important;
          line-height:1.07!important;
          letter-spacing:-.015em!important;
        }
        html body .mobile-bar,
        html body .mobile-bar a{
          min-height:78px!important;
          height:78px!important;
        }
        html body .aw2-bubble{
          right:17px!important;
          bottom:84px!important;
          width:114px!important;
          min-height:49px!important;
          font-size:8.9px!important;
        }
        html body .aw2-guide.left .aw2-bubble{
          left:17px!important;
          right:auto!important;
        }
        html body .aw2-bubble.long{width:120px!important;min-height:53px!important}
        html body .aw56-tail{left:69px!important;bottom:-39px!important;width:34px!important;height:42px!important}
        html body .aw2-guide.left .aw56-tail{left:auto!important;right:69px!important}
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

  function cleanText(text) {
    return text
      .replace(/\s*[—–]\s*/g, '. ')
      .replace(/\.\s*\./g, '.')
      .replace(/\s{2,}/g, ' ')
      .trim();
  }

  function normalizeAnnieCopy() {
    const section = document.querySelector('.annie-callout');
    if (section) {
      const heading = section.querySelector('h2');
      if (heading) heading.textContent = 'Don’t worry about diagnosing the tree. That’s our job.';

      const tipButton = section.querySelector('#annieButton');
      if (tipButton) {
        tipButton.textContent = 'See another Annie tip';
        tipButton.setAttribute('aria-label','See another Annie tip');
      }
    }

    document.querySelectorAll('.aw2-bubble-copy').forEach(copy => {
      let text = copy.textContent.trim();
      if (/^Hi! I'm Arborwise Annie/i.test(text)) {
        text = "Hi! I'm Arborwise Annie. Glad you're here.";
      } else {
        text = cleanText(text);
      }
      if (copy.textContent !== text) copy.textContent = text;
    });
    return Boolean(section);
  }

  function attachTextCleaner(copy) {
    if (copy.dataset.awTextCleaner === '56') return;
    copy.dataset.awTextCleaner = '56';
    const observer = new MutationObserver(() => {
      const cleaned = cleanText(copy.textContent);
      if (cleaned && cleaned !== copy.textContent) copy.textContent = cleaned;
    });
    observer.observe(copy,{childList:true,characterData:true,subtree:true});
  }

  function buildStableTail() {
    const bubbles = document.querySelectorAll('.aw2-bubble');
    if (!bubbles.length) return false;

    bubbles.forEach(bubble => {
      let copy = bubble.querySelector('.aw2-bubble-copy');
      if (!copy) {
        copy = document.createElement('span');
        copy.className = 'aw2-bubble-copy';
        copy.textContent = cleanText(bubble.textContent || '');
        bubble.replaceChildren(copy);
      }
      attachTextCleaner(copy);

      if (bubble.dataset.awTailVersion === '56' && bubble.querySelector('.aw56-tail')) return;
      bubble.querySelectorAll('.aw2-tail,.aw55-tail,.aw56-tail').forEach(tail => tail.remove());

      const tail = document.createElementNS('http://www.w3.org/2000/svg','svg');
      tail.setAttribute('class','aw56-tail');
      tail.setAttribute('viewBox','0 0 34 42');
      tail.setAttribute('aria-hidden','true');
      tail.setAttribute('focusable','false');

      const path = document.createElementNS('http://www.w3.org/2000/svg','path');
      path.setAttribute('d','M3 2 C12 4 20 9 25 17 C29 24 25 33 18 40 C17 34 14 29 10 25 C6 20 4 12 3 2 Z');
      tail.appendChild(path);
      bubble.appendChild(tail);
      bubble.dataset.awTailVersion = '56';
    });
    return true;
  }

  function applyCorrections() {
    installStyle();
    const kickerReady = normalizeHeroKicker();
    const annieReady = normalizeAnnieCopy();
    const bubbleReady = buildStableTail();
    classifyActions();
    return kickerReady && annieReady && bubbleReady;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (applyCorrections() || attempts > 100) window.clearInterval(timer);
  },100);

  applyCorrections();
})();
