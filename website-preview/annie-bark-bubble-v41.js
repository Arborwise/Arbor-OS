(() => {
  'use strict';

  document.getElementById('arborwise-annie-bark-bubble-v41')?.remove();

  const style = document.createElement('style');
  style.id = 'arborwise-annie-bark-bubble-v41';
  style.textContent = `
    /* Full-height tree bark: irregular plates, vertical fissures, and knots — no rope striping. */
    .aw-v39-edge,
    .aw-v39-guide .aw-v39-trunk-mask{
      opacity:1!important;
      background:
        radial-gradient(ellipse at 62% 9%,rgba(24,10,5,.92) 0 8%,rgba(108,70,45,.46) 9% 13%,transparent 14%),
        radial-gradient(ellipse at 33% 29%,rgba(28,12,7,.86) 0 6%,rgba(129,84,53,.35) 7% 11%,transparent 12%),
        radial-gradient(ellipse at 70% 57%,rgba(19,8,4,.9) 0 7%,rgba(117,76,49,.32) 8% 12%,transparent 13%),
        radial-gradient(ellipse at 38% 83%,rgba(27,11,6,.88) 0 6%,rgba(126,82,52,.34) 7% 11%,transparent 12%),
        linear-gradient(94deg,
          transparent 0 9%,rgba(18,7,3,.86) 10% 16%,transparent 17% 29%,
          rgba(46,22,12,.72) 30% 36%,transparent 37% 51%,
          rgba(21,8,4,.84) 52% 59%,transparent 60% 73%,
          rgba(55,27,15,.68) 74% 81%,transparent 82% 100%),
        linear-gradient(86deg,
          rgba(235,188,133,.08) 0 8%,transparent 9% 22%,
          rgba(244,201,149,.09) 23% 29%,transparent 30% 47%,
          rgba(236,185,127,.07) 48% 55%,transparent 56% 100%),
        linear-gradient(90deg,#24120b 0%,#4a2b1a 24%,#714a31 46%,#8b6245 57%,#563521 76%,#26140c 100%)!important;
      background-size:100% 620px,100% 760px,100% 690px,100% 840px,100% 100%,100% 100%,100% 100%!important;
      box-shadow:inset 4px 0 7px rgba(15,6,3,.62),inset -4px 0 8px rgba(12,5,2,.72),0 0 9px rgba(0,0,0,.62)!important;
      filter:saturate(.88) contrast(1.12)!important;
    }

    .aw-v39-edge{width:30px!important}
    .aw-v39-edge.left{
      clip-path:polygon(0 0,78% 0,90% 7%,72% 16%,95% 27%,76% 39%,88% 50%,70% 63%,94% 75%,74% 87%,87% 100%,0 100%)!important
    }
    .aw-v39-edge.right{
      clip-path:polygon(22% 0,100% 0,100% 100%,13% 100%,26% 87%,6% 75%,30% 63%,12% 50%,24% 39%,5% 27%,28% 16%,10% 7%)!important
    }

    /* Annie must sit in front of the bark instead of being hidden behind it. */
    .aw-v39-guide .aw-v39-trunk-mask{width:30px!important;z-index:3!important}
    .aw-v39-guide .aw-v39-annie{z-index:10!important}

    /* Classic 1960s-style speech bubble: clean oval, light cream fill, and one small pointed tail. */
    .aw-v39-bubble{
      z-index:12!important;
      top:-8px!important;
      width:150px!important;
      min-height:66px!important;
      padding:13px 15px!important;
      border:2px solid #173b30!important;
      border-radius:50% / 46%!important;
      background:linear-gradient(180deg,#fffef9 0%,#fff9e9 100%)!important;
      color:#113c30!important;
      font:850 12px/1.3 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      text-align:center!important;
      box-shadow:4px 5px 0 rgba(18,45,35,.16),0 9px 20px rgba(15,48,37,.14)!important;
      overflow:visible!important;
    }

    .aw-v39-bubble::before,
    .aw-v39-bubble::after{
      content:""!important;
      position:absolute!important;
      width:0!important;
      height:0!important;
      background:transparent!important;
      border-radius:0!important;
      box-shadow:none!important;
      transform:none!important;
    }

    .aw-v39-guide.right .aw-v39-bubble{left:0!important;right:auto!important}
    .aw-v39-guide.right .aw-v39-bubble::before{
      right:-15px!important;left:auto!important;bottom:13px!important;top:auto!important;
      border-top:9px solid transparent!important;
      border-bottom:9px solid transparent!important;
      border-left:15px solid #173b30!important;
    }
    .aw-v39-guide.right .aw-v39-bubble::after{
      right:-11px!important;left:auto!important;bottom:15px!important;top:auto!important;
      border-top:7px solid transparent!important;
      border-bottom:7px solid transparent!important;
      border-left:12px solid #fff9e9!important;
    }

    .aw-v39-guide.left .aw-v39-bubble{right:0!important;left:auto!important}
    .aw-v39-guide.left .aw-v39-bubble::before{
      left:-15px!important;right:auto!important;bottom:13px!important;top:auto!important;
      border-top:9px solid transparent!important;
      border-bottom:9px solid transparent!important;
      border-right:15px solid #173b30!important;
    }
    .aw-v39-guide.left .aw-v39-bubble::after{
      left:-11px!important;right:auto!important;bottom:15px!important;top:auto!important;
      border-top:7px solid transparent!important;
      border-bottom:7px solid transparent!important;
      border-right:12px solid #fff9e9!important;
    }

    @media(max-width:700px){
      .aw-v39-guide{bottom:116px!important}
      .aw-v39-bubble{width:146px!important;min-height:64px!important;font-size:11.7px!important}
    }
  `;

  document.head.appendChild(style);
})();