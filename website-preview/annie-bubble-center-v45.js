(() => {
  'use strict';

  document.getElementById('arborwise-annie-bubble-center-v45')?.remove();

  const style = document.createElement('style');
  style.id = 'arborwise-annie-bubble-center-v45';
  style.textContent = `
    /* Center every Annie message evenly inside its speech balloon. */
    .aw-v44-bubble,
    .aw-v43-bubble,
    .aw-v39-bubble{
      box-sizing:border-box!important;
      display:grid!important;
      place-items:center!important;
      align-content:center!important;
      justify-content:center!important;
      text-align:center!important;
      text-wrap:balance!important;
      overflow-wrap:normal!important;
      word-break:normal!important;
      padding:8px 11px!important;
      line-height:1.22!important;
    }

    .aw-v44-bubble.long{
      padding:9px 13px!important;
      line-height:1.24!important;
    }

    @media(max-width:700px){
      .aw-v44-bubble,
      .aw-v43-bubble,
      .aw-v39-bubble{
        padding:7px 10px!important;
      }
      .aw-v44-bubble.long{
        padding:8px 12px!important;
      }
    }
  `;

  document.head.appendChild(style);
})();