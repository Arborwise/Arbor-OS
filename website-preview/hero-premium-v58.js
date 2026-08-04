(() => {
  'use strict';

  document.getElementById('aw-hero-premium-v58')?.remove();
  const style = document.createElement('style');
  style.id = 'aw-hero-premium-v58';
  style.textContent = `
    html body .hero.aw-hero .aw-copy{
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      text-align:center!important;
    }

    html body .hero.aw-hero .aw-copy h1{
      width:100%!important;
      max-width:9.6ch!important;
      margin:10px auto 28px!important;
      text-align:center!important;
      line-height:.92!important;
      text-wrap:balance!important;
    }
    html body .hero.aw-hero .aw-copy h1 span{
      display:block!important;
      width:100%!important;
      margin:0 auto!important;
      text-align:center!important;
    }

    html body .hero.aw-hero .aw-lead{
      position:relative!important;
      width:min(100%,620px)!important;
      margin:20px auto 16px!important;
      padding:0 72px!important;
      color:#f2c665!important;
      font-family:Georgia,"Times New Roman",serif!important;
      font-size:clamp(2rem,4.5vw,3.35rem)!important;
      font-style:italic!important;
      font-weight:800!important;
      line-height:1.05!important;
      text-align:center!important;
      text-shadow:0 3px 12px rgba(0,0,0,.9)!important;
    }
    html body .hero.aw-hero .aw-lead::before,
    html body .hero.aw-hero .aw-lead::after{
      content:""!important;
      position:absolute!important;
      top:50%!important;
      width:56px!important;
      height:2px!important;
      background:linear-gradient(90deg,transparent,#efc45f)!important;
      box-shadow:0 0 10px rgba(239,196,95,.55)!important;
    }
    html body .hero.aw-hero .aw-lead::before{left:0!important}
    html body .hero.aw-hero .aw-lead::after{right:0!important;transform:scaleX(-1)!important}

    html body .hero.aw-hero .aw-honesty{
      width:min(100%,620px)!important;
      margin:18px auto 24px!important;
      padding:24px 28px!important;
      color:#10261e!important;
      background:linear-gradient(180deg,#fff9e8 0%,#f4dfab 100%)!important;
      border:2px solid #efc45f!important;
      border-radius:24px!important;
      box-shadow:inset 0 1px 0 rgba(255,255,255,.8),0 14px 28px rgba(0,0,0,.34),0 0 0 3px rgba(239,196,95,.12)!important;
      font-size:clamp(1.05rem,2.3vw,1.35rem)!important;
      line-height:1.5!important;
      font-weight:650!important;
      text-align:center!important;
      text-shadow:none!important;
    }

    html body .hero.aw-hero .aw-actions{
      width:min(100%,620px)!important;
      margin-inline:auto!important;
    }

    @media(max-width:700px){
      html body .hero.aw-hero .aw-copy{
        padding:34px 22px 118px!important;
      }
      html body .hero.aw-hero .aw-copy h1{
        max-width:8.8ch!important;
        margin:8px auto 24px!important;
        font-size:clamp(3rem,14vw,4rem)!important;
      }
      html body .hero.aw-hero .aw-lead{
        width:100%!important;
        margin:18px auto 14px!important;
        padding:0 38px!important;
        font-size:clamp(2rem,9.8vw,2.8rem)!important;
      }
      html body .hero.aw-hero .aw-lead::before,
      html body .hero.aw-hero .aw-lead::after{
        width:30px!important;
      }
      html body .hero.aw-hero .aw-honesty{
        width:100%!important;
        margin:16px auto 22px!important;
        padding:20px 18px!important;
        border-radius:22px!important;
        font-size:1.05rem!important;
        line-height:1.48!important;
      }
    }
  `;
  document.head.appendChild(style);
})();
