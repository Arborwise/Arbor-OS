(() => {
  'use strict';

  document.getElementById('arborwise-annie-bubble-anchor-v46')?.remove();

  const style = document.createElement('style');
  style.id = 'arborwise-annie-bubble-anchor-v46';
  style.textContent = `
    /* Keep every speech balloon directly above Annie instead of drifting into page content. */
    .aw-v44-guide .aw-v44-bubble,
    .aw-v44-guide .aw-v43-bubble,
    .aw-v44-guide .aw-v39-bubble{
      top:-18px!important;
      margin:0!important;
      z-index:30!important;
      overflow:visible!important;
      isolation:isolate!important;
    }

    .aw-v44-guide.right .aw-v44-bubble,
    .aw-v44-guide.right .aw-v43-bubble,
    .aw-v44-guide.right .aw-v39-bubble{
      left:auto!important;
      right:8px!important;
    }

    .aw-v44-guide.left .aw-v44-bubble,
    .aw-v44-guide.left .aw-v43-bubble,
    .aw-v44-guide.left .aw-v39-bubble{
      right:auto!important;
      left:8px!important;
    }

    .aw-v44-guide.right .aw-v44-bubble.long{right:4px!important}
    .aw-v44-guide.left .aw-v44-bubble.long{left:4px!important}

    /* Visible comic hook and point aimed down toward Annie's mouth. */
    .aw-v44-guide .aw-v44-bubble::before,
    .aw-v44-guide .aw-v44-bubble::after{
      content:""!important;
      position:absolute!important;
      top:auto!important;
      display:block!important;
      box-shadow:none!important;
      pointer-events:none!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::before{
      left:auto!important;
      right:20px!important;
      bottom:-20px!important;
      width:27px!important;
      height:23px!important;
      background:#fffdf5!important;
      border:0!important;
      border-right:3px solid #153c30!important;
      border-bottom:3px solid #153c30!important;
      border-radius:0 0 18px 0!important;
      transform:rotate(10deg)!important;
      transform-origin:top right!important;
      z-index:31!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::after{
      left:auto!important;
      right:10px!important;
      bottom:-31px!important;
      width:0!important;
      height:0!important;
      background:transparent!important;
      border-left:7px solid transparent!important;
      border-right:3px solid transparent!important;
      border-top:14px solid #153c30!important;
      border-bottom:0!important;
      border-radius:0!important;
      transform:rotate(-24deg)!important;
      z-index:32!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::before{
      right:auto!important;
      left:20px!important;
      bottom:-20px!important;
      width:27px!important;
      height:23px!important;
      background:#fffdf5!important;
      border:0!important;
      border-left:3px solid #153c30!important;
      border-bottom:3px solid #153c30!important;
      border-radius:0 0 0 18px!important;
      transform:rotate(-10deg)!important;
      transform-origin:top left!important;
      z-index:31!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::after{
      right:auto!important;
      left:10px!important;
      bottom:-31px!important;
      width:0!important;
      height:0!important;
      background:transparent!important;
      border-right:7px solid transparent!important;
      border-left:3px solid transparent!important;
      border-top:14px solid #153c30!important;
      border-bottom:0!important;
      border-radius:0!important;
      transform:rotate(24deg)!important;
      z-index:32!important;
    }

    @media(max-width:700px){
      .aw-v44-guide .aw-v44-bubble,
      .aw-v44-guide .aw-v43-bubble,
      .aw-v44-guide .aw-v39-bubble{
        top:-15px!important;
      }
      .aw-v44-guide.right .aw-v44-bubble,
      .aw-v44-guide.right .aw-v43-bubble,
      .aw-v44-guide.right .aw-v39-bubble{right:5px!important}
      .aw-v44-guide.left .aw-v44-bubble,
      .aw-v44-guide.left .aw-v43-bubble,
      .aw-v44-guide.left .aw-v39-bubble{left:5px!important}
      .aw-v44-guide.right .aw-v44-bubble.long{right:2px!important}
      .aw-v44-guide.left .aw-v44-bubble.long{left:2px!important}

      .aw-v44-guide.right .aw-v44-bubble::before{
        right:18px!important;
        bottom:-19px!important;
        width:25px!important;
        height:22px!important;
      }
      .aw-v44-guide.right .aw-v44-bubble::after{
        right:9px!important;
        bottom:-29px!important;
      }
      .aw-v44-guide.left .aw-v44-bubble::before{
        left:18px!important;
        bottom:-19px!important;
        width:25px!important;
        height:22px!important;
      }
      .aw-v44-guide.left .aw-v44-bubble::after{
        left:9px!important;
        bottom:-29px!important;
      }
    }
  `;

  document.head.appendChild(style);
})();