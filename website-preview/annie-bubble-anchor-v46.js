(() => {
  'use strict';

  document.getElementById('arborwise-annie-bubble-anchor-v46')?.remove();

  const style = document.createElement('style');
  style.id = 'arborwise-annie-bubble-anchor-v46';
  style.textContent = `
    /* One compact, smooth speech balloon close to Annie. */
    .aw-v44-guide .aw-v44-bubble,
    .aw-v44-guide .aw-v43-bubble,
    .aw-v44-guide .aw-v39-bubble{
      top:-24px!important;
      width:122px!important;
      min-height:40px!important;
      margin:0!important;
      padding:7px 10px!important;
      z-index:30!important;
      overflow:visible!important;
      isolation:isolate!important;
      border:2px solid #153c30!important;
      border-radius:50% / 46%!important;
      background:#fffdf5!important;
      color:#123d31!important;
      font:800 10px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      text-align:center!important;
      box-shadow:2px 3px 0 rgba(18,45,35,.13),0 6px 14px rgba(15,48,37,.12)!important;
    }

    .aw-v44-guide .aw-v44-bubble.long{
      width:144px!important;
      min-height:48px!important;
      padding:8px 11px!important;
      font-size:10.1px!important;
    }

    .aw-v44-guide.right .aw-v44-bubble,
    .aw-v44-guide.right .aw-v43-bubble,
    .aw-v44-guide.right .aw-v39-bubble{
      left:auto!important;
      right:5px!important;
    }

    .aw-v44-guide.left .aw-v44-bubble,
    .aw-v44-guide.left .aw-v43-bubble,
    .aw-v44-guide.left .aw-v39-bubble{
      right:auto!important;
      left:5px!important;
    }

    /* Classic tapered tail: no cloud lobe, no oversized white hook. */
    .aw-v44-guide .aw-v44-bubble::before,
    .aw-v44-guide .aw-v44-bubble::after{
      content:""!important;
      position:absolute!important;
      top:auto!important;
      display:block!important;
      width:0!important;
      height:0!important;
      background:transparent!important;
      border-radius:0!important;
      box-shadow:none!important;
      pointer-events:none!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::before{
      left:auto!important;
      right:18px!important;
      bottom:-18px!important;
      border-left:11px solid transparent!important;
      border-right:2px solid transparent!important;
      border-top:20px solid #153c30!important;
      border-bottom:0!important;
      transform:rotate(-13deg)!important;
      transform-origin:top center!important;
      z-index:31!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::after{
      left:auto!important;
      right:20px!important;
      bottom:-13px!important;
      border-left:8px solid transparent!important;
      border-right:1px solid transparent!important;
      border-top:16px solid #fffdf5!important;
      border-bottom:0!important;
      transform:rotate(-13deg)!important;
      transform-origin:top center!important;
      z-index:32!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::before{
      right:auto!important;
      left:18px!important;
      bottom:-18px!important;
      border-right:11px solid transparent!important;
      border-left:2px solid transparent!important;
      border-top:20px solid #153c30!important;
      border-bottom:0!important;
      transform:rotate(13deg)!important;
      transform-origin:top center!important;
      z-index:31!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::after{
      right:auto!important;
      left:20px!important;
      bottom:-13px!important;
      border-right:8px solid transparent!important;
      border-left:1px solid transparent!important;
      border-top:16px solid #fffdf5!important;
      border-bottom:0!important;
      transform:rotate(13deg)!important;
      transform-origin:top center!important;
      z-index:32!important;
    }

    /* Hero cleanup: one clear hierarchy and one job for each brand color. */
    html body .hero.aw-hero .aw-kicker{
      color:#efc45f!important;
      font-size:.78rem!important;
      letter-spacing:.08em!important;
      text-shadow:0 2px 8px rgba(0,0,0,.75)!important;
    }

    html body .hero.aw-hero .aw-copy h1{
      color:#fff8e8!important;
      text-shadow:0 7px 24px rgba(0,0,0,.82)!important;
    }

    html body .hero.aw-hero .aw-copy h1 span{
      color:#d9f378!important;
    }

    html body .hero.aw-hero .aw-copy h1 sup{
      color:#efc45f!important;
    }

    /* The slogan already appears directly beneath the logo. */
    html body .hero.aw-hero .aw-slogan{
      display:none!important;
    }

    html body .hero.aw-hero .aw-lead{
      max-width:560px!important;
      margin-top:17px!important;
      color:#fff8e8!important;
      font-size:.98rem!important;
      font-weight:800!important;
      line-height:1.34!important;
      text-shadow:0 2px 9px rgba(0,0,0,.8)!important;
    }

    html body .hero.aw-hero .aw-honesty{
      max-width:560px!important;
      margin-top:14px!important;
      padding:12px 14px!important;
      color:#dce7e1!important;
      background:rgba(1,10,7,.58)!important;
      border:1px solid rgba(239,196,95,.42)!important;
      border-block:2px solid #d7a542!important;
      border-radius:12px!important;
      font-size:.88rem!important;
      font-weight:500!important;
      line-height:1.42!important;
      text-shadow:0 1px 6px rgba(0,0,0,.55)!important;
    }

    @media(max-width:700px){
      .aw-v44-guide .aw-v44-bubble,
      .aw-v44-guide .aw-v43-bubble,
      .aw-v44-guide .aw-v39-bubble{
        top:-21px!important;
        width:118px!important;
        min-height:38px!important;
        padding:6px 9px!important;
        font-size:9.7px!important;
      }

      .aw-v44-guide .aw-v44-bubble.long{
        width:140px!important;
        min-height:46px!important;
        padding:7px 10px!important;
        font-size:9.9px!important;
      }

      .aw-v44-guide.right .aw-v44-bubble,
      .aw-v44-guide.right .aw-v43-bubble,
      .aw-v44-guide.right .aw-v39-bubble{right:4px!important}

      .aw-v44-guide.left .aw-v44-bubble,
      .aw-v44-guide.left .aw-v43-bubble,
      .aw-v44-guide.left .aw-v39-bubble{left:4px!important}

      html body .hero.aw-hero .aw-kicker{
        font-size:.72rem!important;
        line-height:1.2!important;
      }

      html body .hero.aw-hero .aw-lead{
        margin-top:14px!important;
        font-size:.92rem!important;
      }

      html body .hero.aw-hero .aw-honesty{
        padding:11px 12px!important;
        font-size:.83rem!important;
      }
    }
  `;

  document.head.appendChild(style);

  /* Keep routine idle tips short enough to remain a compact balloon. */
  const shortenTip = bubble => {
    if (!bubble) return;
    const text = bubble.textContent.trim();
    if (text === 'Show the whole tree, concern, and trunk base.') {
      bubble.textContent = 'Whole tree. Concern. Trunk base.';
      bubble.classList.remove('long');
    }
  };

  const installTipGuard = () => {
    const bubble = document.querySelector('.aw-v44-bubble');
    if (!bubble) return false;
    shortenTip(bubble);
    const observer = new MutationObserver(() => shortenTip(bubble));
    observer.observe(bubble,{childList:true,characterData:true,subtree:true});
    return true;
  };

  let attempts=0;
  const timer=window.setInterval(()=>{
    attempts+=1;
    if(installTipGuard()||attempts>70)window.clearInterval(timer);
  },100);
})();