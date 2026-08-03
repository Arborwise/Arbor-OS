(() => {
  'use strict';

  document.getElementById('aw-hero-unify-v48')?.remove();
  const style = document.createElement('style');
  style.id = 'aw-hero-unify-v48';
  style.textContent = `
    /* Tie the photographic hero back to the black, gold, and forest-green header. */
    html body .hero.aw-hero{
      border-color:#c99a3c!important;
      background-color:#08271f!important;
      background-blend-mode:multiply!important;
      box-shadow:
        inset 0 0 0 999px rgba(4,27,20,.52),
        inset 0 1px 0 rgba(255,239,197,.24),
        0 14px 32px rgba(4,18,14,.14)!important;
    }
    html body .hero.aw-hero::before{
      content:""!important;
      position:absolute!important;
      inset:0!important;
      z-index:0!important;
      pointer-events:none!important;
      border-radius:inherit!important;
      background:
        linear-gradient(180deg,rgba(6,19,15,.18) 0%,rgba(6,28,21,.42) 48%,rgba(2,17,12,.76) 100%),
        radial-gradient(circle at 50% 26%,rgba(218,169,70,.12),transparent 42%)!important;
    }
    html body .hero.aw-hero .aw-copy{position:relative!important;z-index:1!important}
    html body .hero.aw-hero .aw-kicker{
      color:#e8bd63!important;
      text-shadow:0 2px 8px rgba(0,0,0,.92)!important;
    }
    html body .hero.aw-hero .aw-copy h1{
      color:#fff7e7!important;
      text-shadow:0 4px 18px rgba(0,0,0,.9)!important;
    }
    html body .hero.aw-hero .aw-copy h1 span{
      color:#e8bd63!important;
      text-shadow:0 4px 18px rgba(0,0,0,.92)!important;
    }
    html body .hero.aw-hero .aw-copy h1 sup{
      display:inline-block!important;
      color:#fff7e7!important;
      font-size:.28em!important;
      font-weight:950!important;
      line-height:1!important;
      top:-1.65em!important;
      margin-left:.08em!important;
      letter-spacing:0!important;
      text-shadow:0 2px 6px rgba(0,0,0,.95)!important;
    }
    html body .hero.aw-hero .aw-lead,
    html body .hero.aw-hero .aw-copy>p:not(.aw-kicker){
      color:#fff7e7!important;
      text-shadow:0 2px 8px rgba(0,0,0,.98)!important;
    }
    html body .hero.aw-hero .button,
    html body .hero.aw-hero .aw-button{
      color:#09291f!important;
      background:#e8bd63!important;
      border-color:#f3d78e!important;
      box-shadow:0 8px 20px rgba(0,0,0,.26)!important;
    }
    html body .hero.aw-hero .button:hover,
    html body .hero.aw-hero .button:focus-visible,
    html body .hero.aw-hero .aw-button:hover,
    html body .hero.aw-hero .aw-button:focus-visible{
      background:#f1ce7e!important;
    }

    /* Rebuild Annie's bubble as a clean compact balloon. */
    html body .aw-annie-bubble{
      width:130px!important;
      min-height:44px!important;
      padding:8px 12px!important;
      border:2px solid #143d31!important;
      border-radius:48% 52% 47% 53% / 50% 45% 55% 50%!important;
      background:#fff9ea!important;
      color:#123d31!important;
      box-shadow:0 7px 16px rgba(7,34,26,.18),2px 3px 0 rgba(20,61,49,.12)!important;
      rotate:0deg!important;
    }
    html body .aw-annie-bubble.long{
      width:142px!important;
      min-height:48px!important;
    }
    html body .aw-annie-guide.right .aw-annie-bubble{right:31px!important}
    html body .aw-annie-guide.left .aw-annie-bubble{left:31px!important}
    html body .aw-annie-tail{
      width:30px!important;
      height:23px!important;
      bottom:-17px!important;
      overflow:visible!important;
      transform:none!important;
    }
    html body .aw-annie-guide.right .aw-annie-tail{right:13px!important}
    html body .aw-annie-guide.left .aw-annie-tail{left:13px!important;transform:scaleX(-1)!important}
    html body .aw-annie-tail path{
      fill:#fff9ea!important;
      stroke:#143d31!important;
      stroke-width:2!important;
      stroke-linecap:round!important;
      stroke-linejoin:round!important;
    }

    @media(max-width:700px){
      html body .hero.aw-hero .aw-copy h1 sup{
        font-size:.32em!important;
        top:-1.5em!important;
      }
      html body .hero.aw-hero .aw-copy{
        padding-top:28px!important;
      }
      html body .aw-annie-bubble{
        width:124px!important;
        min-height:42px!important;
        font-size:9.6px!important;
      }
      html body .aw-annie-bubble.long{width:136px!important}
      html body .aw-annie-guide.right .aw-annie-bubble{right:29px!important}
      html body .aw-annie-guide.left .aw-annie-bubble{left:29px!important}
    }
  `;
  document.head.appendChild(style);

  function repairTail(){
    const tails = document.querySelectorAll('.aw-annie-tail');
    if (!tails.length) return false;
    tails.forEach(tail => {
      tail.setAttribute('viewBox','0 0 30 23');
      const path = tail.querySelector('path');
      if (path) {
        path.setAttribute('d','M3 2 C10 5 14 9 17 14 C19 18 23 20 28 21 C23 22 18 20 14 18 C11 16 8 16 5 17 C8 13 8 7 3 2 Z');
      }
    });
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (repairTail() || attempts > 80) window.clearInterval(timer);
  }, 100);
})();
