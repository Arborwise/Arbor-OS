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
    `;
    document.head.appendChild(style);
  };
  document.head.appendChild(base);
})();
