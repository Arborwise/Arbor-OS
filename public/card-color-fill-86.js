'use strict';
(() => {
  const STYLE_ID='arborwise-full-card-colors-86';
  const css=`
    /* Full-card color system: dark left rail, light matching card body. */
    #main > article.card.estimate{
      background:#fff6df!important;
      border-color:#dfbf78!important;
    }
    #main > article.card.estimate:before{background:#d69418!important}

    #main > article.card.job{
      background:#eaf5ed!important;
      border-color:#8db79a!important;
    }
    #main > article.card.job:before{background:#28643b!important}

    #main > article.card.scheduleToday{
      background:#e4f2e7!important;
      border-color:#70a67d!important;
      box-shadow:0 4px 12px rgba(23,75,49,.11)!important;
    }
    #main > article.card.scheduleToday:before{background:#1f7042!important}

    #main > article.card.scheduleComing,
    #main > article.card.scheduleScheduled{
      background:#e8f2fc!important;
      border-color:#8db4d9!important;
      box-shadow:0 4px 12px rgba(48,94,137,.10)!important;
    }
    #main > article.card.scheduleComing:before,
    #main > article.card.scheduleScheduled:before{background:#4b83b8!important}

    #main > article.card.scheduleUnscheduled{
      background:#f3eee5!important;
      border-color:#b7aa94!important;
    }
    #main > article.card.scheduleUnscheduled:before{background:#8a7657!important}

    #main > article.card.scheduleReview{
      background:#f8e6e3!important;
      border-color:#ca8279!important;
    }
    #main > article.card.scheduleReview:before{background:#ad493e!important}

    #main > article.card.estimate.estimate-new{
      background:#fff6bd!important;
      border-color:#d7ad00!important;
    }
    #main > article.card.estimate.estimate-new:before{background:#d5a900!important}

    #main > article.card.estimate.estimate-complete{
      background:#ffe2c3!important;
      border-color:#e0a05f!important;
      box-shadow:0 3px 9px rgba(174,79,0,.14)!important;
    }
    #main > article.card.estimate.estimate-complete:before{background:#e4590c!important}

    #main > article.card.estimate.estimate-review{
      background:#f8e5e2!important;
      border-color:#bd655b!important;
    }
    #main > article.card.estimate.estimate-review:before{background:#a62b24!important}

    #main > article.card.estimate.estimate-accepted{
      background:#e1f0e4!important;
      border-color:#5f936c!important;
    }
    #main > article.card.estimate.estimate-accepted:before{background:#28643b!important}

    #main > article.card.hold{
      background:#fff0d5!important;
      border-color:#d4a04e!important;
    }
    #main > article.card.hold:before{background:#a76a22!important}

    #main > article.card.completed{
      opacity:1!important;
      filter:none!important;
      background:#e5ebe3!important;
      border-color:#78927a!important;
    }
    #main > article.card.completed:before{background:#365f3c!important}

    #main > article.card.cancelled{
      opacity:1!important;
      background:#f3e5e5!important;
      border-color:#b77878!important;
    }
    #main > article.card.cancelled:before{background:#8e3d3d!important}
  `;

  let style=document.getElementById(STYLE_ID);
  if(!style){
    style=document.createElement('style');
    style.id=STYLE_ID;
    style.textContent=css;
    document.head.appendChild(style);
  }

  const keepLast=()=>{
    if(style.parentNode===document.head&&document.head.lastElementChild!==style){
      document.head.appendChild(style);
    }
  };

  const observer=new MutationObserver(()=>queueMicrotask(keepLast));
  observer.observe(document.head,{childList:true});
  window.addEventListener('arborwise:data-ready',()=>setTimeout(keepLast,0));
  setTimeout(keepLast,400);
  setTimeout(keepLast,1400);
})();
