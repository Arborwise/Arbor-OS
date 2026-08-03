(()=>{
  'use strict';

  document.getElementById('arborwise-concern-checker-v47')?.remove();

  const style=document.createElement('style');
  style.id='arborwise-concern-checker-v47';
  style.textContent=`
    /* Restore the useful concern checker and remove the abandoned blank gap. */
    html body .intro-section{
      padding-bottom:18px!important;
    }
    html body .concern-section{
      display:block!important;
      margin:0 auto 26px!important;
      padding:30px 28px 34px!important;
      color:#fff!important;
      background:
        radial-gradient(circle at 12% 0%,rgba(217,243,120,.16),transparent 290px),
        linear-gradient(145deg,#061f18 0%,#0b3f2f 58%,#071b15 100%)!important;
      border:1px solid rgba(239,196,95,.58)!important;
      border-radius:30px!important;
      box-shadow:0 20px 46px rgba(4,24,18,.24)!important;
    }
    html body .concern-section .section-head{
      max-width:820px!important;
      margin:0 auto 22px!important;
    }
    html body .concern-section .section-label{
      color:#f2c760!important;
      border-bottom-color:#d9f378!important;
      margin-bottom:13px!important;
    }
    html body .concern-section h2{
      margin-bottom:10px!important;
      color:#fff!important;
      font-size:clamp(2rem,3.4vw,3.25rem)!important;
    }
    html body .concern-section .section-head>p:last-child{
      max-width:680px!important;
      margin-bottom:0!important;
      color:#dce9e2!important;
      font-size:.98rem!important;
      line-height:1.45!important;
    }

    html body .concern-grid{
      display:grid!important;
      grid-template-columns:repeat(2,minmax(0,1fr))!important;
      gap:13px!important;
    }
    html body .concern-card{
      --concern-accent:#d9f378;
      appearance:none!important;
      position:relative!important;
      display:grid!important;
      grid-template-columns:132px minmax(0,1fr)!important;
      min-height:138px!important;
      padding:0!important;
      overflow:hidden!important;
      color:#fff!important;
      text-align:left!important;
      cursor:pointer!important;
      background:linear-gradient(145deg,#07120e,#0b2c21)!important;
      border:1px solid rgba(255,255,255,.14)!important;
      border-left:6px solid var(--concern-accent)!important;
      border-radius:18px!important;
      box-shadow:0 12px 26px rgba(0,0,0,.2)!important;
      transform:none!important;
      transition:transform .2s ease,border-color .2s ease,box-shadow .2s ease!important;
    }
    html body .concern-card:nth-child(2){--concern-accent:#82cbe0}
    html body .concern-card:nth-child(3){--concern-accent:#efc45f}
    html body .concern-card:nth-child(4){--concern-accent:#d4a5e8}
    html body .concern-card:hover,
    html body .concern-card:focus-visible{
      transform:translateY(-3px)!important;
      border-color:var(--concern-accent)!important;
      box-shadow:0 18px 34px rgba(0,0,0,.3),0 0 0 3px color-mix(in srgb,var(--concern-accent) 22%,transparent)!important;
      outline:none!important;
    }
    html body .concern-card img{
      width:100%!important;
      height:100%!important;
      min-height:138px!important;
      object-fit:cover!important;
      filter:saturate(.92) contrast(1.04)!important;
    }
    html body .concern-body{
      display:flex!important;
      min-width:0!important;
      min-height:0!important;
      padding:15px 16px!important;
      flex-direction:column!important;
      justify-content:center!important;
    }
    html body .concern-body small{
      display:inline-grid!important;
      place-items:center!important;
      width:31px!important;
      height:25px!important;
      margin:0 0 8px!important;
      color:#07110d!important;
      background:var(--concern-accent)!important;
      border-radius:999px!important;
      font-size:.68rem!important;
      font-weight:1000!important;
      letter-spacing:.03em!important;
    }
    html body .concern-body strong{
      margin:0!important;
      color:#fff!important;
      font-family:Georgia,"Times New Roman",serif!important;
      font-size:1.05rem!important;
      line-height:1.18!important;
    }
    html body .concern-body>span{
      margin-top:9px!important;
      padding:0!important;
      color:var(--concern-accent)!important;
      font-size:.78rem!important;
      font-weight:950!important;
      line-height:1.2!important;
    }
    html body .concern-body>span::after{
      content:"  →";
    }

    html body .concern-section .photo-cta{
      margin-top:15px!important;
      padding:19px 21px!important;
      gap:18px!important;
      color:#10271e!important;
      background:linear-gradient(135deg,#fff8df,#f3e3b3)!important;
      border:1px solid rgba(239,196,95,.75)!important;
      border-radius:18px!important;
      box-shadow:0 12px 28px rgba(0,0,0,.17)!important;
    }
    html body .concern-section .photo-cta .section-label{
      margin:0 0 7px!important;
      color:#0b4c37!important;
      border:0!important;
      font-size:.68rem!important;
      text-align:left!important;
    }
    html body .concern-section .photo-cta h3{
      margin:0 0 4px!important;
      color:#092b20!important;
      font-size:clamp(1.25rem,2.2vw,1.72rem)!important;
    }
    html body .concern-section .photo-cta p:last-child{
      margin:0!important;
      color:#40564c!important;
      font-size:.88rem!important;
    }
    html body .concern-section .photo-cta .button{
      min-height:46px!important;
      padding:10px 18px!important;
      color:#fff!important;
      background:#0b4c37!important;
      box-shadow:none!important;
      white-space:nowrap!important;
    }

    html body .concern-dialog{
      width:min(92vw,620px)!important;
      padding:28px!important;
      color:#153c30!important;
      background:#fffdf7!important;
      border:2px solid #d7a542!important;
      border-radius:24px!important;
      box-shadow:0 28px 80px rgba(0,0,0,.45)!important;
    }
    html body .concern-dialog::backdrop{
      background:rgba(1,8,6,.72)!important;
      backdrop-filter:blur(3px)!important;
    }
    html body .concern-dialog h2{
      margin-bottom:11px!important;
      font-size:clamp(1.65rem,5vw,2.45rem)!important;
    }
    html body .concern-dialog #dialogText{
      color:#40564c!important;
      line-height:1.55!important;
    }

    @media(max-width:700px){
      html body .intro-section{
        padding-top:24px!important;
        padding-bottom:12px!important;
      }
      html body .concern-section{
        width:auto!important;
        max-width:none!important;
        margin:0 8px 20px!important;
        padding:24px 12px 26px!important;
        border-radius:24px!important;
      }
      html body .concern-section .section-head{
        margin-bottom:17px!important;
        padding:0 5px!important;
      }
      html body .concern-section h2{
        font-size:2rem!important;
      }
      html body .concern-grid{
        grid-template-columns:1fr!important;
        gap:9px!important;
      }
      html body .concern-card{
        grid-template-columns:94px minmax(0,1fr)!important;
        min-height:98px!important;
        border-left-width:5px!important;
        border-radius:15px!important;
      }
      html body .concern-card img{
        min-height:98px!important;
      }
      html body .concern-body{
        padding:11px 12px!important;
      }
      html body .concern-body small{
        width:28px!important;
        height:21px!important;
        margin-bottom:5px!important;
        font-size:.62rem!important;
      }
      html body .concern-body strong{
        font-size:.94rem!important;
        line-height:1.16!important;
      }
      html body .concern-body>span{
        margin-top:6px!important;
        font-size:.7rem!important;
      }
      html body .concern-section .photo-cta{
        grid-template-columns:1fr!important;
        padding:16px!important;
        text-align:left!important;
      }
      html body .concern-section .photo-cta .button{
        width:100%!important;
      }
    }

    @media(prefers-reduced-motion:reduce){
      html body .concern-card{transition:none!important}
    }
  `;
  document.head.appendChild(style);

  const DATA={
    leaves:{
      title:'Leaf spots, browning, curling, or early leaf drop',
      text:'Leaf symptoms can come from heat, drought, insects, disease, root stress, or chemical injury. The timing, pattern, affected species, and recent weather help narrow the cause. Send a photo of the whole tree, a close view of the leaves, and the trunk base.'
    },
    canopy:{
      title:'Dead branches or a thinning canopy',
      text:'A thinning canopy can point to drought stress, root damage, soil problems, decay, pests, or normal interior shedding. What matters is where the decline begins, how quickly it changed, and whether major limbs or targets are involved.'
    },
    trunk:{
      title:'Cracks, cavities, loose bark, or mushrooms',
      text:'These signs deserve a closer look, but they do not automatically mean removal. Location, depth, sound wood, species, movement, roots, nearby targets, and other decay indicators all matter.'
    },
    lean:{
      title:'A new lean, exposed roots, or moving soil',
      text:'A new lean or lifted, cracking soil can indicate root-plate movement and may be urgent. Keep people, vehicles, and pets away from the fall area and contact Arborwise promptly, especially after wind or saturated soil.'
    }
  };

  function install(){
    const section=document.querySelector('.concern-section');
    const dialog=document.getElementById('concernDialog');
    if(!section||!dialog)return false;

    const title=dialog.querySelector('#dialogTitle');
    const text=dialog.querySelector('#dialogText');
    const close=dialog.querySelector('.dialog-close');

    section.querySelectorAll('.concern-card[data-concern]').forEach(card=>{
      if(card.dataset.v47Bound==='1')return;
      card.dataset.v47Bound='1';
      card.addEventListener('click',()=>{
        const item=DATA[card.dataset.concern];
        if(!item)return;
        title.textContent=item.title;
        text.textContent=item.text;
        if(typeof dialog.showModal==='function')dialog.showModal();
        else dialog.setAttribute('open','');
      });
    });

    if(close&&close.dataset.v47Bound!=='1'){
      close.dataset.v47Bound='1';
      close.addEventListener('click',()=>dialog.close?.());
    }
    if(dialog.dataset.v47Bound!=='1'){
      dialog.dataset.v47Bound='1';
      dialog.addEventListener('click',event=>{
        const rect=dialog.getBoundingClientRect();
        const outside=event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom;
        if(outside)dialog.close?.();
      });
    }
    return true;
  }

  let attempts=0;
  const timer=setInterval(()=>{
    attempts+=1;
    if(install()||attempts>60)clearInterval(timer);
  },100);
})();