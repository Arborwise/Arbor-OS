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

    /* Short comic-style hooked leader ending in a small point aimed at Annie's mouth. */
    .aw-v44-guide .aw-v44-bubble::before,
    .aw-v44-guide .aw-v44-bubble::after{
      content:""!important;
      position:absolute!important;
      top:auto!important;
      background:transparent!important;
      box-shadow:none!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::before{
      left:auto!important;
      right:20px!important;
      bottom:-17px!important;
      width:19px!important;
      height:17px!important;
      border:0!important;
      border-right:3px solid #153c30!important;
      border-bottom:3px solid #153c30!important;
      border-radius:0 0 13px 0!important;
      transform:rotate(13deg)!important;
      transform-origin:top right!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::after{
      left:auto!important;
      right:27px!important;
      bottom:-24px!important;
      width:0!important;
      height:0!important;
      border-left:5px solid transparent!important;
      border-right:2px solid transparent!important;
      border-top:10px solid #153c30!important;
      border-bottom:0!important;
      border-radius:0!important;
      transform:rotate(22deg)!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::before{
      right:auto!important;
      left:20px!important;
      bottom:-17px!important;
      width:19px!important;
      height:17px!important;
      border:0!important;
      border-left:3px solid #153c30!important;
      border-bottom:3px solid #153c30!important;
      border-radius:0 0 0 13px!important;
      transform:rotate(-13deg)!important;
      transform-origin:top left!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::after{
      right:auto!important;
      left:27px!important;
      bottom:-24px!important;
      width:0!important;
      height:0!important;
      border-right:5px solid transparent!important;
      border-left:2px solid transparent!important;
      border-top:10px solid #153c30!important;
      border-bottom:0!important;
      border-radius:0!important;
      transform:rotate(-22deg)!important;
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
    }
  `;

  document.head.appendChild(style);
})();