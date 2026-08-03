(() => {
  'use strict';

  const oldBase = document.querySelector('script[data-aw-hero-v51-base]');
  if (oldBase) oldBase.remove();

  const base = document.createElement('script');
  base.src = 'hero-unify-v51.js?rev=orange-bubble-tm-20260803-1048';
  base.async = false;
  base.dataset.awHeroV51Base = 'true';
  base.onload = () => {
    document.getElementById('aw-merged-hero-v52')?.remove();

    const style = document.createElement('style');
    style.id = 'aw-merged-hero-v52';
    style.textContent = `
      :root{
        --aw-orange:#ff6a00;
        --aw-orange-bright:#ff7a12;
        --aw-orange-dark:#c94700;
        --aw-ivory:#fff8e8;
        --aw-forest:#08271f;
        --aw-ink:#07110d;
      }

      /* The header and hero now read as one continuous opening panel. */
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
        border-top:1px solid rgba(255,106,0,.48)!important;
        background:linear-gradient(180deg,rgba(4,16,12,.18),rgba(8,39,31,.72))!important;
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
          radial-gradient(circle at 50% 8%,rgba(255,106,0,.12),transparent 30%),
          linear-gradient(180deg,#08271f 0%,#061b15 48%,#020806 100%)!important;
        box-shadow:0 18px 40px rgba(2,14,10,.28)!important;
      }
      html body .hero.aw-hero .aw-photo{
        opacity:.34!important;
        filter:saturate(.72) contrast(.94) brightness(.72)!important;
      }
      html body .hero.aw-hero .aw-shade{
        background:linear-gradient(180deg,rgba(6,30,23,.22) 0%,rgba(4,27,20,.74) 39%,rgba(2,14,10,.96) 76%,#020806 100%)!important;
      }

      /* Orange is the active brand accent; the logo artwork keeps its own gold. */
      html body .hero.aw-hero .aw-kicker{
        color:var(--aw-orange-bright)!important;
      }
      html body .hero.aw-hero .aw-kicker::after{
        background:var(--aw-orange)!important;
      }
      html body .hero.aw-hero .aw-copy h1{
        max-width:10.8ch!important;
        color:var(--aw-ivory)!important;
        font-size:clamp(3.25rem,8vw,6.15rem)!important;
        line-height:.9!important;
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
        border-color:rgba(255,106,0,.82)!important;
        background:linear-gradient(180deg,rgba(6,42,31,.88),rgba(2,17,13,.94))!important;
      }
      html body .hero.aw-hero .aw-secondary{
        border-color:rgba(255,106,0,.78)!important;
      }
      html body .hero.aw-hero .aw-video{
        border-color:rgba(255,106,0,.68)!important;
      }
      html body .hero.aw-hero .aw-video small{
        color:var(--aw-orange-bright)!important;
      }

      /* Husqvarna-style orange for direct actions. */
      html body .hero.aw-hero .aw-primary{
        color:#161b17!important;
        background:linear-gradient(180deg,#ff7b18 0%,#ff6200 52%,#e95000 100%)!important;
        border:2px solid #ffd2ad!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.34),0 0 0 1px rgba(133,40,0,.48),0 10px 24px rgba(0,0,0,.34)!important;
      }
      html body .hero.aw-hero .aw-primary:hover,
      html body .hero.aw-hero .aw-primary:focus-visible{
        background:linear-gradient(180deg,#ff8b2a 0%,#ff6a00 54%,#f05a00 100%)!important;
      }
      html body .mobile-bar a:nth-child(2){
        color:#161b17!important;
        background:linear-gradient(180deg,#ff7b18 0%,#f05a00 100%)!important;
        border-color:rgba(255,220,185,.72)!important;
      }
      html body .mobile-bar a:nth-child(2),
      html body .mobile-bar a:nth-child(2) *{
        color:#161b17!important;
        text-shadow:none!important;
      }

      /* Final Annie balloon: compact, close to her, with a short curved taper. */
      html body .aw-annie-bubble{
        bottom:88px!important;
        width:128px!important;
        min-height:46px!important;
        padding:9px 12px!important;
        overflow:visible!important;
        border:2px solid #174438!important;
        border-radius:30px 28px 31px 27px!important;
        background:#fffaf0!important;
        color:#123d31!important;
        font-size:9.4px!important;
        line-height:1.18!important;
        box-shadow:0 7px 16px rgba(7,34,26,.18),2px 3px 0 rgba(20,61,49,.1)!important;
        rotate:0deg!important;
      }
      html body .aw-annie-bubble.long{
        width:138px!important;
        min-height:50px!important;
        padding:9px 12px!important;
      }
      html body .aw-annie-guide.right .aw-annie-bubble{right:24px!important}
      html body .aw-annie-guide.left .aw-annie-bubble{left:24px!important}
      html body .aw-annie-bubble::after{
        content:""!important;
        display:block!important;
        position:absolute!important;
        z-index:3!important;
        bottom:-3px!important;
        width:22px!important;
        height:8px!important;
        background:#fffaf0!important;
        pointer-events:none!important;
      }
      html body .aw-annie-guide.right .aw-annie-bubble::after{right:8px!important}
      html body .aw-annie-guide.left .aw-annie-bubble::after{left:8px!important}
      html body .aw-annie-tail{
        z-index:2!important;
        width:34px!important;
        height:24px!important;
        bottom:-17px!important;
        overflow:visible!important;
        transform:none!important;
      }
      html body .aw-annie-guide.right .aw-annie-tail{right:2px!important}
      html body .aw-annie-guide.left .aw-annie-tail{left:2px!important;transform:scaleX(-1)!important}
      html body .aw-annie-tail .aw-tail-shape{
        fill:#fffaf0!important;
        stroke:#174438!important;
        stroke-width:2!important;
        stroke-linecap:round!important;
        stroke-linejoin:round!important;
      }

      @media(max-width:700px){
        html body .site-header{padding-inline:8px!important}
        html body .hero.aw-hero{margin-inline:8px!important}
        html body .hero.aw-hero .aw-copy{
          padding-top:24px!important;
        }
        html body .hero.aw-hero .aw-copy h1{
          max-width:10ch!important;
          font-size:clamp(3.15rem,13.5vw,4.4rem)!important;
        }
        html body .aw-annie-bubble{
          bottom:86px!important;
          width:120px!important;
          font-size:9.1px!important;
        }
        html body .aw-annie-bubble.long{width:130px!important}
        html body .aw-annie-guide.right .aw-annie-bubble{right:20px!important}
        html body .aw-annie-guide.left .aw-annie-bubble{left:20px!important}
      }
    `;
    document.head.appendChild(style);

    function replaceHeroHeadline(){
      const heading = document.querySelector('.hero.aw-hero .aw-copy h1');
      if (!heading) return false;
      heading.innerHTML = 'Tree Care <span>That Makes Sense.</span>';
      return true;
    }

    function rebuildTail(){
      const tails = document.querySelectorAll('.aw-annie-tail');
      if (!tails.length) return false;
      tails.forEach(tail => {
        tail.setAttribute('viewBox','0 0 34 24');
        tail.innerHTML = '<path class="aw-tail-shape" d="M2 2 C10 3 17 7 23 13 C26 16 29 19 32 20 C28 21 24 20 20 18 C16 15 12 15 7 17 C9 13 8 7 2 2 Z"></path>';
      });
      return true;
    }

    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const headlineReady = replaceHeroHeadline();
      const tailReady = rebuildTail();
      if ((headlineReady && tailReady) || attempts > 80) window.clearInterval(timer);
    },100);
  };
  document.head.appendChild(base);
})();
