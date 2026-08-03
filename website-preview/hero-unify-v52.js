(() => {
  'use strict';

  const oldBase = document.querySelector('script[data-aw-hero-v51-base]');
  if (oldBase) oldBase.remove();

  const base = document.createElement('script');
  base.src = 'hero-unify-v51.js?rev=orange-system-20260803-1138';
  base.async = false;
  base.dataset.awHeroV51Base = 'true';
  base.onload = () => {
    document.getElementById('aw-merged-hero-v52')?.remove();

    const style = document.createElement('style');
    style.id = 'aw-merged-hero-v52';
    style.textContent = `
      :root{
        --aw-orange:#ff6700;
        --aw-orange-bright:#ff7a16;
        --aw-orange-dark:#d84b00;
        --aw-ivory:#fff8e8;
        --aw-forest:#08271f;
        --aw-ink:#111914;
      }

      /* Header and hero are one continuous opening panel. */
      html body .site-header{
        margin:0!important;
        padding:8px 8px 0!important;
        background:transparent!important;
      }
      html body .aw-head{
        overflow:hidden!important;
        border:1px solid var(--aw-orange)!important;
        border-bottom:0!important;
        border-radius:26px 26px 0 0!important;
        background:linear-gradient(180deg,#020403 0%,#04110d 68%,#08271f 100%)!important;
        box-shadow:none!important;
      }
      html body .aw-nav{
        border-top:1px solid rgba(255,103,0,.55)!important;
        background:linear-gradient(180deg,rgba(4,16,12,.18),rgba(8,39,31,.76))!important;
      }
      html body .aw-nav a:last-child{
        color:var(--aw-orange-bright)!important;
        text-shadow:0 1px 8px rgba(0,0,0,.9)!important;
      }

      html body .hero.aw-hero{
        margin-top:0!important;
        border:1px solid var(--aw-orange)!important;
        border-top:0!important;
        border-radius:0 0 28px 28px!important;
        background:
          radial-gradient(circle at 50% 8%,rgba(255,103,0,.12),transparent 30%),
          linear-gradient(180deg,#08271f 0%,#061b15 48%,#020806 100%)!important;
        box-shadow:0 18px 40px rgba(2,14,10,.28)!important;
      }
      html body .hero.aw-hero .aw-photo{
        opacity:.32!important;
        filter:saturate(.68) contrast(.94) brightness(.7)!important;
      }
      html body .hero.aw-hero .aw-shade{
        background:linear-gradient(180deg,rgba(6,30,23,.22) 0%,rgba(4,27,20,.74) 39%,rgba(2,14,10,.96) 76%,#020806 100%)!important;
      }

      /* Section labels are real headers now, not tiny captions. */
      html body .section-label,
      html body .section-label-light,
      html body .hero.aw-hero .aw-kicker,
      html body .aw-video small{
        color:var(--aw-orange-bright)!important;
        font-size:clamp(.98rem,2.15vw,1.18rem)!important;
        font-weight:950!important;
        line-height:1.15!important;
        letter-spacing:.075em!important;
        text-transform:uppercase!important;
        text-shadow:none!important;
      }
      html body .section-label::after,
      html body .section-label-light::after,
      html body .hero.aw-hero .aw-kicker::after{
        background:var(--aw-orange)!important;
        border-color:var(--aw-orange)!important;
      }

      /* Three clean headline lines instead of a five-line wall. */
      html body .hero.aw-hero .aw-copy{
        padding-bottom:116px!important;
      }
      html body .hero.aw-hero .aw-copy h1{
        max-width:11.2ch!important;
        margin:0 auto 18px!important;
        color:var(--aw-ivory)!important;
        font-size:clamp(3.2rem,8vw,5.7rem)!important;
        line-height:.91!important;
        letter-spacing:-.04em!important;
        text-shadow:0 5px 20px rgba(0,0,0,.92)!important;
      }
      html body .hero.aw-hero .aw-copy h1 span{
        display:block!important;
        width:auto!important;
        max-width:none!important;
        margin:0!important;
        padding:0!important;
        color:var(--aw-orange-bright)!important;
        text-shadow:0 5px 20px rgba(0,0,0,.94)!important;
      }
      html body .hero.aw-hero .aw-copy h1 sup{display:none!important}
      html body .hero.aw-hero .aw-honesty{
        border-color:rgba(255,103,0,.82)!important;
        background:linear-gradient(180deg,rgba(6,42,31,.88),rgba(2,17,13,.94))!important;
      }
      html body .hero.aw-hero .aw-video{
        border-color:rgba(255,103,0,.72)!important;
      }

      /* Husqvarna orange is the consistent color for true customer actions. */
      html body .aw-primary,
      html body a.button:not(.button-outline),
      html body button.button:not(.button-outline),
      html body .photo-cta .button,
      html body .plain-button,
      html body .estimate-actions a,
      html body .estimate-actions button,
      html body .contact-actions a,
      html body .contact-actions button{
        color:var(--aw-ink)!important;
        background:linear-gradient(180deg,var(--aw-orange-bright) 0%,var(--aw-orange) 54%,var(--aw-orange-dark) 100%)!important;
        border:2px solid #ffd2ae!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.38),0 0 0 1px rgba(119,35,0,.38),0 10px 24px rgba(0,0,0,.28)!important;
        text-shadow:none!important;
      }
      html body .aw-primary:hover,
      html body .aw-primary:focus-visible,
      html body a.button:not(.button-outline):hover,
      html body a.button:not(.button-outline):focus-visible,
      html body .photo-cta .button:hover,
      html body .photo-cta .button:focus-visible,
      html body .plain-button:hover,
      html body .plain-button:focus-visible{
        background:linear-gradient(180deg,#ff8b2b 0%,#ff7010 54%,#ed5600 100%)!important;
        transform:translateY(-1px)!important;
      }

      /* Secondary actions stay dark with orange outlines. */
      html body .aw-secondary,
      html body .button-outline{
        color:var(--aw-ivory)!important;
        background:rgba(2,19,14,.74)!important;
        border:2px solid var(--aw-orange)!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.05)!important;
      }
      html body .aw-secondary:hover,
      html body .aw-secondary:focus-visible,
      html body .button-outline:hover,
      html body .button-outline:focus-visible{
        color:var(--aw-ink)!important;
        background:var(--aw-orange)!important;
      }

      html body .service-card a,
      html body .growth-section .text-link-light,
      html body .aw-annie-estimate-link{
        color:var(--aw-orange)!important;
        text-decoration-color:var(--aw-orange)!important;
      }

      /* All three fixed mobile actions use the same orange language. */
      html body .mobile-bar{
        min-height:78px!important;
        height:78px!important;
      }
      html body .mobile-bar a{
        min-height:78px!important;
        padding:8px 4px!important;
        color:var(--aw-ink)!important;
        background:linear-gradient(180deg,var(--aw-orange-bright) 0%,var(--aw-orange) 56%,var(--aw-orange-dark) 100%)!important;
        border-color:rgba(255,220,185,.72)!important;
      }
      html body .mobile-bar a,
      html body .mobile-bar a *{
        color:var(--aw-ink)!important;
        text-shadow:none!important;
      }
      html body .mobile-bar a+ a{
        border-left:1px solid rgba(75,22,0,.58)!important;
      }

      @media(max-width:700px){
        html body .site-header{padding-inline:8px!important}
        html body .hero.aw-hero{margin-inline:8px!important}
        html body .section-label,
        html body .section-label-light,
        html body .hero.aw-hero .aw-kicker,
        html body .aw-video small{
          font-size:clamp(1rem,4.15vw,1.12rem)!important;
          letter-spacing:.065em!important;
        }
        html body .hero.aw-hero .aw-copy{
          padding-top:26px!important;
          padding-bottom:112px!important;
        }
        html body .hero.aw-hero .aw-copy h1{
          max-width:11.1ch!important;
          font-size:clamp(3.08rem,13.2vw,3.7rem)!important;
          line-height:.9!important;
          margin-bottom:16px!important;
        }
        html body .intro-section .section-head h2,
        html body .annie-callout h2,
        html body .section-head h2{
          font-size:clamp(2.2rem,9.3vw,2.95rem)!important;
          line-height:.98!important;
        }
        html body .mobile-bar a span{font-size:1.08rem!important;line-height:1!important}
        html body .mobile-bar a strong{font-size:.82rem!important;line-height:1.05!important}
        html body{padding-bottom:82px!important}
      }
    `;
    document.head.appendChild(style);

    function replaceHeroHeadline(){
      const heading = document.querySelector('.hero.aw-hero .aw-copy h1');
      if (!heading) return false;
      heading.innerHTML = 'Tree Care<br><span>That Makes<br>Sense.</span>';
      return true;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      if (replaceHeroHeadline() || attempts > 80) window.clearInterval(timer);
    },100);
  };
  document.head.appendChild(base);
})();
