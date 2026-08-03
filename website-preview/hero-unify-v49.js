(() => {
  'use strict';

  document.getElementById('aw-hero-unify-v49')?.remove();
  const style = document.createElement('style');
  style.id = 'aw-hero-unify-v49';
  style.textContent = `
    /* Make the hero feel like the same black, forest-green, and gold brand as the header. */
    html body .aw-nav a:last-child{color:#e8bd63!important}

    html body .hero.aw-hero{
      border:1px solid #b98932!important;
      background:
        radial-gradient(circle at 50% 12%,rgba(219,174,82,.13),transparent 34%),
        linear-gradient(180deg,#0b2f24 0%,#061b15 58%,#020a08 100%)!important;
      box-shadow:inset 0 1px 0 rgba(255,239,197,.2),0 16px 36px rgba(2,14,10,.24)!important;
    }
    html body .hero.aw-hero .aw-photo{
      opacity:.28!important;
      filter:saturate(.68) contrast(.88) brightness(.72)!important;
    }
    html body .hero.aw-hero .aw-shade{
      background:
        linear-gradient(180deg,rgba(2,9,7,.1) 0%,rgba(4,29,22,.78) 37%,rgba(2,14,10,.96) 72%,#020806 100%)!important;
    }
    html body .hero.aw-hero .aw-copy{
      position:relative!important;
      z-index:2!important;
      color:#fff7e7!important;
    }
    html body .hero.aw-hero .aw-kicker{
      color:#e8bd63!important;
      text-shadow:0 2px 8px rgba(0,0,0,.94)!important;
    }
    html body .hero.aw-hero .aw-kicker::after{
      content:""!important;
      display:block!important;
      width:74px!important;
      height:2px!important;
      margin:10px auto 0!important;
      border-radius:999px!important;
      background:#e8bd63!important;
      box-shadow:0 1px 5px rgba(0,0,0,.55)!important;
    }
    html body .hero.aw-hero .aw-copy h1{
      color:#fff7e7!important;
      text-shadow:0 4px 18px rgba(0,0,0,.94)!important;
    }
    html body .hero.aw-hero .aw-copy h1 span{
      color:#e8bd63!important;
      text-shadow:0 4px 18px rgba(0,0,0,.96)!important;
    }
    html body .hero.aw-hero .aw-copy h1 sup{
      display:inline-block!important;
      position:relative!important;
      vertical-align:baseline!important;
      top:-1.05em!important;
      margin-left:.07em!important;
      color:#fff7e7!important;
      font-size:.4em!important;
      font-weight:950!important;
      line-height:1!important;
      letter-spacing:0!important;
      text-shadow:0 2px 6px rgba(0,0,0,.98)!important;
    }
    html body .hero.aw-hero .aw-lead{
      color:#fff7e7!important;
      text-shadow:0 2px 8px rgba(0,0,0,.98)!important;
    }
    html body .hero.aw-hero .aw-honesty{
      max-width:590px!important;
      margin-top:16px!important;
      padding:14px 16px!important;
      color:#fff7e7!important;
      background:linear-gradient(180deg,rgba(3,30,22,.88),rgba(2,17,13,.92))!important;
      border:1px solid rgba(232,189,99,.76)!important;
      border-radius:18px!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.07),0 8px 18px rgba(0,0,0,.22)!important;
      text-shadow:none!important;
    }
    html body .hero.aw-hero .aw-primary{
      color:#08251c!important;
      background:#e8bd63!important;
      border:1px solid #f2d487!important;
      box-shadow:0 8px 20px rgba(0,0,0,.28)!important;
    }
    html body .hero.aw-hero .aw-primary:hover,
    html body .hero.aw-hero .aw-primary:focus-visible{background:#f1ce7e!important}
    html body .hero.aw-hero .aw-secondary{
      color:#fff7e7!important;
      background:rgba(4,31,23,.82)!important;
      border:1px solid rgba(232,189,99,.72)!important;
    }

    /* Smaller balloon, shifted toward Annie so it stays out of the page copy. */
    html body .aw-annie-bubble{
      width:112px!important;
      min-height:40px!important;
      padding:7px 10px!important;
      border:2px solid #143d31!important;
      border-radius:50% 47% 52% 48% / 48% 53% 47% 52%!important;
      background:#fff8e6!important;
      color:#123d31!important;
      font-size:9.2px!important;
      line-height:1.16!important;
      box-shadow:0 7px 16px rgba(7,34,26,.17),2px 3px 0 rgba(20,61,49,.11)!important;
      rotate:0deg!important;
    }
    html body .aw-annie-bubble.long{
      width:124px!important;
      min-height:44px!important;
      padding:8px 10px!important;
    }
    html body .aw-annie-guide.right .aw-annie-bubble{right:4px!important}
    html body .aw-annie-guide.left .aw-annie-bubble{left:4px!important}

    /* A rounded, hollow comic-book hook replaces the spear-shaped tail. */
    html body .aw-annie-tail{
      width:42px!important;
      height:42px!important;
      bottom:-34px!important;
      overflow:visible!important;
      transform:none!important;
    }
    html body .aw-annie-guide.right .aw-annie-tail{right:38px!important}
    html body .aw-annie-guide.left .aw-annie-tail{left:38px!important;transform:scaleX(-1)!important}
    html body .aw-annie-tail .aw-tail-outer{
      fill:none!important;
      stroke:#143d31!important;
      stroke-width:8!important;
      stroke-linecap:round!important;
      stroke-linejoin:round!important;
    }
    html body .aw-annie-tail .aw-tail-inner{
      fill:none!important;
      stroke:#fff8e6!important;
      stroke-width:4!important;
      stroke-linecap:round!important;
      stroke-linejoin:round!important;
    }

    @media(max-width:700px){
      html body .hero.aw-hero .aw-copy{padding-top:24px!important}
      html body .hero.aw-hero .aw-copy h1 sup{
        top:-.98em!important;
        font-size:.44em!important;
      }
      html body .hero.aw-hero .aw-honesty{
        margin-inline:4px!important;
        padding:13px 14px!important;
      }
      html body .aw-annie-guide{bottom:54px!important}
      html body.aw-contact-ready .aw-annie-guide{bottom:82px!important}
      html body .aw-annie-bubble{width:108px!important;font-size:9px!important}
      html body .aw-annie-bubble.long{width:120px!important}
      html body .aw-annie-guide.right .aw-annie-bubble{right:2px!important}
      html body .aw-annie-guide.left .aw-annie-bubble{left:2px!important}
    }
  `;
  document.head.appendChild(style);

  function rebuildTail() {
    const tails = document.querySelectorAll('.aw-annie-tail');
    if (!tails.length) return false;
    tails.forEach(tail => {
      tail.setAttribute('viewBox', '0 0 42 42');
      tail.innerHTML = `
        <path class="aw-tail-outer" d="M4 3 C13 7 18 14 21 23 C24 31 30 36 38 39"></path>
        <path class="aw-tail-inner" d="M4 3 C13 7 18 14 21 23 C24 31 30 36 38 39"></path>
      `;
    });
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (rebuildTail() || attempts > 80) window.clearInterval(timer);
  }, 100);
})();
