(() => {
  'use strict';

  document.getElementById('arborwise-annie-bubble-anchor-v46')?.remove();

  const style = document.createElement('style');
  style.id = 'arborwise-annie-bubble-anchor-v46';
  style.textContent = `
    /* Compact speech balloon positioned close to Annie. */
    .aw-v44-guide .aw-v44-bubble,
    .aw-v44-guide .aw-v43-bubble,
    .aw-v44-guide .aw-v39-bubble{
      top:-6px!important;
      width:124px!important;
      min-height:40px!important;
      margin:0!important;
      padding:7px 10px!important;
      z-index:30!important;
      overflow:visible!important;
      isolation:isolate!important;
      border:2px solid #153c30!important;
      border-radius:50% / 45%!important;
      background:#fffdf5!important;
      color:#123d31!important;
      font:800 10px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      text-align:center!important;
      box-shadow:2px 3px 0 rgba(18,45,35,.13),0 6px 14px rgba(15,48,37,.12)!important;
    }

    .aw-v44-guide .aw-v44-bubble.long{
      width:146px!important;
      min-height:48px!important;
      padding:8px 11px!important;
      font-size:10.1px!important;
    }

    .aw-v44-guide.right .aw-v44-bubble,
    .aw-v44-guide.right .aw-v43-bubble,
    .aw-v44-guide.right .aw-v39-bubble{
      left:auto!important;
      right:4px!important;
    }

    .aw-v44-guide.left .aw-v44-bubble,
    .aw-v44-guide.left .aw-v43-bubble,
    .aw-v44-guide.left .aw-v39-bubble{
      right:auto!important;
      left:4px!important;
    }

    /* One clean tapered tail whose point lands at Annie's mouth. */
    .aw-v44-guide .aw-v44-bubble::before,
    .aw-v44-guide .aw-v44-bubble::after{
      content:""!important;
      position:absolute!important;
      top:auto!important;
      display:block!important;
      border:0!important;
      border-radius:0!important;
      box-shadow:none!important;
      pointer-events:none!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::before{
      left:auto!important;
      right:24px!important;
      bottom:-28px!important;
      width:24px!important;
      height:30px!important;
      background:#153c30!important;
      clip-path:polygon(0 100%,0 0,100% 0)!important;
      transform:rotate(-3deg)!important;
      z-index:31!important;
    }

    .aw-v44-guide.right .aw-v44-bubble::after{
      left:auto!important;
      right:27px!important;
      bottom:-24px!important;
      width:18px!important;
      height:26px!important;
      background:#fffdf5!important;
      clip-path:polygon(0 100%,0 0,100% 0)!important;
      transform:rotate(-3deg)!important;
      z-index:32!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::before{
      right:auto!important;
      left:24px!important;
      bottom:-28px!important;
      width:24px!important;
      height:30px!important;
      background:#153c30!important;
      clip-path:polygon(0 0,100% 0,100% 100%)!important;
      transform:rotate(3deg)!important;
      z-index:31!important;
    }

    .aw-v44-guide.left .aw-v44-bubble::after{
      right:auto!important;
      left:27px!important;
      bottom:-24px!important;
      width:18px!important;
      height:26px!important;
      background:#fffdf5!important;
      clip-path:polygon(0 0,100% 0,100% 100%)!important;
      transform:rotate(3deg)!important;
      z-index:32!important;
    }

    /* One white, bold hero label with no panel, border, or duplicate decoration. */
    html body .hero.aw-hero .aw-kicker{
      display:block!important;
      width:auto!important;
      max-width:100%!important;
      margin:0 0 14px!important;
      padding:0!important;
      color:#fff!important;
      background:transparent!important;
      border:0!important;
      border-radius:0!important;
      box-shadow:none!important;
      outline:0!important;
      font:950 clamp(.74rem,3.1vw,.98rem)/1.18 system-ui,-apple-system,"Segoe UI",sans-serif!important;
      font-style:normal!important;
      letter-spacing:.075em!important;
      text-align:center!important;
      text-transform:uppercase!important;
      text-shadow:0 2px 8px rgba(0,0,0,.82)!important;
      white-space:nowrap!important;
    }
    html body .hero.aw-hero .aw-kicker::before,
    html body .hero.aw-hero .aw-kicker::after{
      content:none!important;
      display:none!important;
    }

    html body .hero.aw-hero .aw-copy h1{
      color:#fff8e8!important;
      text-shadow:0 7px 24px rgba(0,0,0,.82)!important;
    }
    html body .hero.aw-hero .aw-copy h1 span{color:#d9f378!important}
    html body .hero.aw-hero .aw-copy h1 sup{color:#efc45f!important}
    html body .hero.aw-hero .aw-slogan{display:none!important}
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
        top:-4px!important;
        width:120px!important;
        min-height:38px!important;
        padding:6px 9px!important;
        font-size:9.7px!important;
      }
      .aw-v44-guide .aw-v44-bubble.long{
        width:142px!important;
        min-height:46px!important;
        padding:7px 10px!important;
        font-size:9.9px!important;
      }
      html body .hero.aw-hero .aw-kicker{
        font-size:clamp(.68rem,2.9vw,.82rem)!important;
        letter-spacing:.055em!important;
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

  function normalizeHeroKicker(){
    const hero=document.querySelector('.hero.aw-hero');
    const copy=hero?.querySelector('.aw-copy');
    if(!hero||!copy)return false;

    const candidates=[...copy.querySelectorAll('.aw-kicker,.section-label,.section-label-light')];
    let kicker=candidates[0];
    if(!kicker){
      kicker=document.createElement('p');
      copy.prepend(kicker);
    }
    kicker.className='aw-kicker';
    kicker.textContent='PROFESSIONAL NORTH TEXAS TREE CARE';
    candidates.filter(node=>node!==kicker).forEach(node=>node.remove());
    return true;
  }

  function repairConcernPhoto(){
    const image=document.querySelector('.concern-card[data-concern="leaves"] img');
    if(!image)return false;
    image.alt='North Texas tree foliage viewed for visible leaf stress';
    if(!image.currentSrc||/concern-leaves\.webp(?:$|\?)/i.test(image.currentSrc)||!image.complete||image.naturalWidth===0){
      image.src='assets/healthy-tree.webp';
    }
    image.onerror=()=>{
      image.onerror=null;
      image.src='assets/healthy-tree.webp';
    };
    return true;
  }

  function shortenTip(bubble){
    if(!bubble)return;
    const text=bubble.textContent.trim();
    if(text==='Show the whole tree, concern, and trunk base.'){
      bubble.textContent='Whole tree. Concern. Trunk base.';
      bubble.classList.remove('long');
    }
  }

  function install(){
    const bubble=document.querySelector('.aw-v44-bubble');
    const heroReady=normalizeHeroKicker();
    const photoReady=repairConcernPhoto();
    if(bubble){
      shortenTip(bubble);
      if(bubble.dataset.v46Guard!=='1'){
        bubble.dataset.v46Guard='1';
        new MutationObserver(()=>shortenTip(bubble)).observe(bubble,{childList:true,characterData:true,subtree:true});
      }
    }
    return Boolean(bubble&&heroReady&&photoReady);
  }

  let attempts=0;
  const timer=window.setInterval(()=>{
    attempts+=1;
    if(install()||attempts>80)window.clearInterval(timer);
  },100);
})();