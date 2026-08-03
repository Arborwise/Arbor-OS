(() => {
  'use strict';

  const prior = document.querySelector('script[data-aw-hero-v50-base]');
  if (prior) prior.remove();

  const base = document.createElement('script');
  base.src = 'hero-unify-v50.js?rev=spring-green-bubble-20260803-1042';
  base.async = false;
  base.dataset.awHeroV50Base = 'true';
  base.onload = () => {
    document.getElementById('aw-orange-cta-v51')?.remove();

    const style = document.createElement('style');
    style.id = 'aw-orange-cta-v51';
    style.textContent = `
      /* Orange is reserved for direct customer actions. Gold remains the framing color. */
      html body .aw-nav a:last-child{
        color:#ff6a00!important;
        text-shadow:0 1px 8px rgba(0,0,0,.82)!important;
      }

      html body .hero.aw-hero .aw-primary{
        color:#10261e!important;
        background:linear-gradient(180deg,#ff7a00 0%,#f05a00 100%)!important;
        border:2px solid #ffd7a6!important;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.35),
          0 0 0 1px rgba(137,47,0,.42),
          0 10px 24px rgba(0,0,0,.33)!important;
        text-shadow:none!important;
      }
      html body .hero.aw-hero .aw-primary:hover,
      html body .hero.aw-hero .aw-primary:focus-visible{
        background:linear-gradient(180deg,#ff8a1c 0%,#ff6500 100%)!important;
        border-color:#ffe2bd!important;
        transform:translateY(-1px)!important;
      }

      html body .mobile-bar a:nth-child(2){
        color:#10261e!important;
        background:linear-gradient(180deg,#ff7a00 0%,#f05a00 100%)!important;
        border-left:1px solid rgba(255,226,189,.72)!important;
        border-right:1px solid rgba(255,226,189,.72)!important;
        box-shadow:
          inset 0 1px 0 rgba(255,255,255,.32),
          inset 0 -1px 0 rgba(126,38,0,.35)!important;
      }
      html body .mobile-bar a:nth-child(2),
      html body .mobile-bar a:nth-child(2) *{
        color:#10261e!important;
        text-shadow:none!important;
      }

      /* Keep the video control green as the one natural secondary accent. */
      html body .aw-play{
        background:#cfee78!important;
        color:#08251c!important;
      }

      /* Attach the trademark to Arborwise instead of leaving it floating. */
      html body .hero.aw-hero .aw-copy h1 span{
        position:relative!important;
        display:block!important;
        width:max-content!important;
        max-width:100%!important;
        margin-inline:auto!important;
        padding-right:.36em!important;
      }
      html body .hero.aw-hero .aw-copy h1 sup{
        position:absolute!important;
        right:.02em!important;
        top:.08em!important;
        margin:0!important;
        color:#fff7e7!important;
        font-size:.25em!important;
        font-weight:950!important;
        line-height:1!important;
        vertical-align:baseline!important;
        text-shadow:0 2px 5px rgba(0,0,0,.95)!important;
      }

      /* Rebuilt speech balloon: compact body and one short curved tail aimed at Annie. */
      html body .aw-annie-bubble{
        bottom:86px!important;
        width:110px!important;
        min-height:42px!important;
        padding:8px 10px!important;
        overflow:visible!important;
        border:2px solid #174438!important;
        border-radius:26px 24px 27px 23px!important;
        background:#fffaf0!important;
        color:#123d31!important;
        font-size:9px!important;
        line-height:1.18!important;
        box-shadow:0 6px 14px rgba(7,34,26,.18),2px 3px 0 rgba(20,61,49,.1)!important;
        rotate:0deg!important;
      }
      html body .aw-annie-bubble.long{
        width:120px!important;
        min-height:46px!important;
        padding:8px 10px!important;
      }
      html body .aw-annie-guide.right .aw-annie-bubble{right:0!important}
      html body .aw-annie-guide.left .aw-annie-bubble{left:0!important}
      html body .aw-annie-bubble::after{content:none!important;display:none!important}

      html body .aw-annie-tail{
        z-index:2!important;
        width:30px!important;
        height:22px!important;
        bottom:-15px!important;
        overflow:visible!important;
        transform:none!important;
      }
      html body .aw-annie-guide.right .aw-annie-tail{right:12px!important}
      html body .aw-annie-guide.left .aw-annie-tail{left:12px!important;transform:scaleX(-1)!important}
      html body .aw-annie-tail .aw-tail-shape{
        fill:#fffaf0!important;
        stroke:#174438!important;
        stroke-width:2!important;
        stroke-linecap:round!important;
        stroke-linejoin:round!important;
      }
      html body .aw-annie-bubble-copy{position:relative!important;z-index:4!important}

      @media(min-width:701px){
        html body .hero.aw-hero .aw-copy h1 span{margin-left:0!important;margin-right:0!important}
      }
      @media(max-width:700px){
        html body .hero.aw-hero .aw-copy h1 sup{
          right:.01em!important;
          top:.09em!important;
          font-size:.24em!important;
        }
        html body .aw-annie-bubble{
          bottom:84px!important;
          width:106px!important;
          font-size:8.9px!important;
        }
        html body .aw-annie-bubble.long{width:116px!important}
      }
    `;
    document.head.appendChild(style);

    function rebuildTail() {
      const tails = document.querySelectorAll('.aw-annie-tail');
      if (!tails.length) return false;
      tails.forEach(tail => {
        tail.setAttribute('viewBox', '0 0 30 22');
        tail.innerHTML = '<path class="aw-tail-shape" d="M2 2 C10 3 17 7 24 13 C21 13 18 15 17 20 C13 15 9 9 2 2 Z"></path>';
      });
      return true;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (rebuildTail() || attempts > 80) window.clearInterval(timer);
    }, 100);
  };
  document.head.appendChild(base);
})();
