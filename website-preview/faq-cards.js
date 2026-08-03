(() => {
  'use strict';

  document.getElementById('arborwise-faq-cards')?.remove();
  const style=document.createElement('style');
  style.id='arborwise-faq-cards';
  style.textContent=`
    html body .faq-section{
      margin-inline:auto!important;
      padding:42px 18px 58px!important;
      background:linear-gradient(180deg,#eef1e7 0%,#f8f2df 100%)!important;
      border-top:1px solid rgba(18,61,49,.14)!important;
    }
    html body .faq-section .section-head{
      max-width:760px!important;
      margin:0 auto 18px!important;
      padding:20px 18px!important;
      border:1px solid rgba(226,181,73,.72)!important;
      border-radius:18px!important;
      background:linear-gradient(145deg,#061e17 0%,#0c3b2c 72%,#09271e 100%)!important;
      box-shadow:0 12px 26px rgba(5,36,27,.2)!important;
    }
    html body .faq-section .section-label{color:#d9f378!important}
    html body .faq-section .section-head h2{
      margin-top:8px!important;
      color:#fff6df!important;
      font-size:clamp(2rem,8.5vw,3.4rem)!important;
      line-height:.98!important;
      text-shadow:0 3px 8px rgba(0,0,0,.28)!important;
    }
    html body .faq-list{
      display:grid!important;
      gap:10px!important;
      max-width:820px!important;
      margin:0 auto!important;
    }
    html body .faq-list details{
      --faq-accent:#d9f378;
      margin:0!important;
      border:1px solid color-mix(in srgb,var(--faq-accent) 62%,#ffffff 8%)!important;
      border-left:5px solid var(--faq-accent)!important;
      border-radius:15px!important;
      background:linear-gradient(145deg,#07271e 0%,#0d3c2e 65%,#08251c 100%)!important;
      color:#fff!important;
      box-shadow:0 9px 20px rgba(5,32,24,.2),inset 0 1px rgba(255,255,255,.06)!important;
      overflow:hidden!important;
    }
    html body .faq-list details:nth-child(1){--faq-accent:#d9f378}
    html body .faq-list details:nth-child(2){--faq-accent:#f0c45d}
    html body .faq-list details:nth-child(3){--faq-accent:#8fd6c0}
    html body .faq-list details:nth-child(4){--faq-accent:#f0a75d}
    html body .faq-list summary{
      position:relative!important;
      min-height:0!important;
      padding:14px 42px 14px 16px!important;
      color:#fff8e8!important;
      font:900 clamp(.98rem,3.8vw,1.14rem)/1.25 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      list-style:none!important;
      cursor:pointer!important;
    }
    html body .faq-list summary::-webkit-details-marker{display:none!important}
    html body .faq-list summary::before{
      content:"+"!important;
      position:absolute!important;
      right:14px!important;
      top:50%!important;
      display:grid!important;
      place-items:center!important;
      width:23px!important;
      height:23px!important;
      transform:translateY(-50%)!important;
      border-radius:50%!important;
      background:var(--faq-accent)!important;
      color:#073126!important;
      font:950 1rem/1 system-ui,sans-serif!important;
      box-shadow:0 4px 9px rgba(0,0,0,.24)!important;
    }
    html body .faq-list details[open] summary::before{content:"–"!important}
    html body .faq-list details[open] summary{color:var(--faq-accent)!important}
    html body .faq-list details p{
      margin:0!important;
      padding:12px 16px 15px!important;
      border-top:1px solid rgba(255,255,255,.14)!important;
      background:rgba(0,0,0,.12)!important;
      color:#dce9e2!important;
      font-size:.92rem!important;
      line-height:1.45!important;
    }
    @media(max-width:700px){
      html body .faq-section{padding:34px 12px 52px!important}
      html body .faq-section .section-head{padding:17px 14px!important;margin-bottom:12px!important;border-radius:15px!important}
      html body .faq-section .section-head h2{font-size:clamp(1.85rem,9.5vw,2.65rem)!important}
      html body .faq-list{gap:8px!important}
      html body .faq-list details{border-radius:13px!important;border-left-width:4px!important}
      html body .faq-list summary{padding:12px 39px 12px 13px!important;font-size:.96rem!important;line-height:1.22!important}
      html body .faq-list details p{padding:10px 13px 13px!important;font-size:.86rem!important}
    }
  `;
  document.head.appendChild(style);
})();