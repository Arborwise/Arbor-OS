(() => {
  'use strict';

  document.getElementById('arborwise-way-cards')?.remove();
  const style=document.createElement('style');
  style.id='arborwise-way-cards';
  style.textContent=`
    html body .way-section .process{
      display:grid!important;
      gap:12px!important;
      margin-top:24px!important;
    }
    html body .way-section .process>li{
      --aw-card-accent:#d9f378;
      display:grid!important;
      grid-template-columns:54px minmax(0,1fr)!important;
      align-items:center!important;
      gap:13px!important;
      min-height:0!important;
      height:auto!important;
      margin:0!important;
      padding:15px 17px!important;
      border:1px solid color-mix(in srgb,var(--aw-card-accent) 72%,transparent)!important;
      border-left:5px solid var(--aw-card-accent)!important;
      border-radius:18px!important;
      background:linear-gradient(145deg,#06251c 0%,#0b3b2c 56%,#071d16 100%)!important;
      box-shadow:0 10px 22px rgba(2,20,14,.22),inset 0 1px rgba(255,255,255,.07)!important;
      color:#fff!important;
    }
    html body .way-section .process>li:nth-child(1){--aw-card-accent:#d9f378}
    html body .way-section .process>li:nth-child(2){--aw-card-accent:#f2c45c}
    html body .way-section .process>li:nth-child(3){--aw-card-accent:#8fd6c0}
    html body .way-section .process>li:nth-child(4){--aw-card-accent:#f0a75d}
    html body .way-section .process>li>span{
      display:grid!important;
      place-items:center!important;
      width:52px!important;
      height:52px!important;
      margin:0!important;
      border:2px solid rgba(255,255,255,.18)!important;
      border-radius:50%!important;
      background:var(--aw-card-accent)!important;
      color:#073126!important;
      font:950 1.25rem/1 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      box-shadow:0 6px 14px rgba(0,0,0,.25)!important;
    }
    html body .way-section .process>li>div{min-width:0!important;padding:0!important}
    html body .way-section .process>li h3{
      margin:0!important;
      color:#fff6df!important;
      font-family:Georgia,"Times New Roman",serif!important;
      font-size:clamp(1.25rem,4.7vw,1.72rem)!important;
      line-height:1.06!important;
      letter-spacing:-.015em!important;
      text-shadow:0 2px 5px rgba(0,0,0,.32)!important;
    }
    html body .way-section .process>li p{
      margin:6px 0 0!important;
      color:#dce9e2!important;
      font-size:clamp(.86rem,3.2vw,.98rem)!important;
      line-height:1.36!important;
    }
    @media(max-width:700px){
      html body .way-section .process{gap:10px!important;margin-top:18px!important}
      html body .way-section .process>li{
        grid-template-columns:47px minmax(0,1fr)!important;
        gap:10px!important;
        padding:11px 12px!important;
        border-left-width:4px!important;
        border-radius:15px!important;
      }
      html body .way-section .process>li>span{
        width:45px!important;
        height:45px!important;
        font-size:1.08rem!important;
      }
      html body .way-section .process>li h3{font-size:clamp(1.14rem,5.6vw,1.45rem)!important}
      html body .way-section .process>li p{
        margin-top:4px!important;
        font-size:clamp(.8rem,3.5vw,.91rem)!important;
        line-height:1.32!important;
      }
    }
  `;
  document.head.appendChild(style);
})();