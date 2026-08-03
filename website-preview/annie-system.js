(() => {
  'use strict';

  const OPENING = "Hi! I'm Arborwise Annie & we're glad you're here!";
  const TAP_TIPS = [
    'Whole tree. Concern. Trunk base.',
    'Cavities are clues—not automatic removals.',
    'Good pruning always has a reason.',
    'Keep mulch off the trunk flare.',
    'Send the address with clear photos.'
  ];
  const TARGETS = [
    ['.hero', OPENING],
    ['.trust-band', 'Certified guidance. Local accountability.'],
    ['#concerns', 'Start with what changed—and when?'],
    ['#services', 'Every service should solve a real problem.'],
    ['#planting, .growth-section', 'Keep the root flare visible.'],
    ['#way', 'Good advice explains what can wait.'],
    ['#estimate', 'Send the address and three clear photos.'],
    ['.faq-section', 'Tap a question for a straight answer.']
  ];

  [
    'arborwise-annie-guide-v39','arborwise-annie-way-v40',
    'arborwise-annie-bark-bubble-v41','arborwise-annie-faq-v42',
    'arborwise-annie-idle-v43','arborwise-annie-motion-bubble-v44',
    'arborwise-annie-bubble-center-v45','arborwise-annie-bubble-anchor-v46',
    'arborwise-annie-system'
  ].forEach(id => document.getElementById(id)?.remove());
  document.querySelectorAll('.aw-v39-edge,.aw-v39-guide,.aw-annie-edge,.aw-annie-guide').forEach(node => node.remove());

  const style = document.createElement('style');
  style.id = 'arborwise-annie-system';
  style.textContent = `
    html,body{overflow-x:clip!important}
    .annie-callout.aw-annie-section{display:block!important;position:relative!important;overflow:visible!important;text-align:center!important}
    .annie-callout.aw-annie-section>div{max-width:760px!important;margin-inline:auto!important}
    .aw-annie-token{display:grid;place-items:center;width:188px;height:188px;margin:0 auto 15px;overflow:hidden;border:4px solid #d7a542;border-radius:50%;background:#083226;box-shadow:0 14px 30px rgba(4,35,26,.2),inset 0 1px rgba(255,255,255,.1)}
    .aw-annie-token img{display:block;width:160px;height:160px;object-fit:contain}

    .aw-annie-edge,.aw-annie-trunk-mask{pointer-events:none;background:
      radial-gradient(ellipse at 42% 8%,rgba(22,9,4,.9) 0 8%,rgba(129,83,50,.35) 9% 13%,transparent 14%),
      radial-gradient(ellipse at 67% 31%,rgba(19,7,3,.88) 0 7%,rgba(117,72,45,.32) 8% 12%,transparent 13%),
      radial-gradient(ellipse at 36% 58%,rgba(28,12,6,.9) 0 6%,rgba(137,89,53,.31) 7% 11%,transparent 12%),
      radial-gradient(ellipse at 65% 84%,rgba(18,7,3,.9) 0 7%,rgba(121,76,46,.34) 8% 12%,transparent 13%),
      linear-gradient(92deg,transparent 0 12%,rgba(19,7,3,.9) 13% 20%,transparent 21% 36%,rgba(51,24,12,.78) 37% 44%,transparent 45% 61%,rgba(20,7,3,.88) 62% 70%,transparent 71% 84%,rgba(59,29,15,.72) 85% 92%,transparent 93% 100%),
      linear-gradient(88deg,rgba(238,191,136,.08) 0 10%,transparent 11% 28%,rgba(245,204,153,.09) 29% 36%,transparent 37% 56%,rgba(231,178,122,.07) 57% 64%,transparent 65% 100%),
      linear-gradient(90deg,#211008 0%,#4a2a18 24%,#70482e 47%,#8a6041 57%,#55331f 77%,#211108 100%);
      background-size:100% 540px,100% 690px,100% 620px,100% 780px,100% 100%,100% 100%,100% 100%;box-shadow:inset 3px 0 6px rgba(13,5,2,.7),inset -3px 0 7px rgba(13,5,2,.72),0 0 7px rgba(0,0,0,.56);filter:saturate(.82) contrast(1.13)}
    .aw-annie-edge{position:fixed;z-index:940;top:0;bottom:0;width:18px;opacity:.98}
    .aw-annie-edge.left{left:0;clip-path:polygon(0 0,78% 0,91% 8%,72% 18%,96% 29%,74% 40%,89% 52%,69% 64%,95% 76%,73% 88%,87% 100%,0 100%)}
    .aw-annie-edge.right{right:0;clip-path:polygon(22% 0,100% 0,100% 100%,14% 100%,27% 88%,6% 76%,31% 64%,11% 52%,25% 40%,5% 29%,29% 18%,10% 8%)}

    .aw-annie-guide{position:fixed;z-index:950;bottom:116px;width:176px;height:132px;opacity:0;visibility:hidden;pointer-events:none;transition:opacity .2s ease,visibility 0s linear .24s}
    .aw-annie-guide.right{right:0}.aw-annie-guide.left{left:0}
    .aw-annie-guide.show{opacity:1;visibility:visible;transition:opacity .2s ease}
    .aw-annie-trunk-mask{position:absolute;z-index:2;top:0;bottom:0;width:18px}
    .aw-annie-guide.right .aw-annie-trunk-mask{right:0}
    .aw-annie-guide.left .aw-annie-trunk-mask{left:0;transform:scaleX(-1)}

    .aw-annie-button{appearance:none;-webkit-appearance:none;-webkit-tap-highlight-color:transparent;position:absolute;z-index:5;bottom:5px;width:84px;padding:0;border:0;background:transparent;opacity:0;cursor:pointer;pointer-events:auto;touch-action:manipulation;filter:drop-shadow(0 6px 7px rgba(0,0,0,.24));transition:transform .72s cubic-bezier(.2,.78,.2,1),opacity .25s ease}
    .aw-annie-guide.right .aw-annie-button{right:-1px;transform:translate3d(105px,-22px,0) rotate(7deg) scale(.96)}
    .aw-annie-guide.left .aw-annie-button{left:-1px;transform:translate3d(-105px,-22px,0) rotate(-7deg) scale(.96)}
    .aw-annie-guide.landed .aw-annie-button{opacity:1;transform:translate3d(0,0,0) rotate(0) scale(1)}
    .aw-annie-button img{display:block;width:100%;height:auto;transform-origin:center}
    .aw-annie-guide.left .aw-annie-button img{transform:scaleX(-1)}
    .aw-annie-button:focus{outline:none}.aw-annie-button:focus-visible{outline:2px solid #d9f378;outline-offset:4px;border-radius:50%}
    .aw-annie-button.blink::after{content:"";position:absolute;left:58%;top:27%;width:25%;height:7%;border-radius:50%;background:#efd9aa;border-bottom:2px solid #3a2116;animation:awAnnieBlink .38s ease-in-out 1}

    .aw-annie-bubble{position:absolute;z-index:7;bottom:84px;display:flex;align-items:center;justify-content:center;width:132px;min-height:44px;margin:0;padding:8px 11px;border:2px solid #153c30;border-radius:42% 51% 45% 55% / 49% 42% 58% 46%;background:#fffdf5;color:#123d31;font:850 10px/1.2 system-ui,-apple-system,"Segoe UI",sans-serif;letter-spacing:-.01em;text-align:center;box-shadow:2px 3px 0 rgba(18,45,35,.13),0 7px 15px rgba(15,48,37,.13);opacity:0;transform:translateY(4px) scale(.97);transition:opacity .22s ease,transform .22s ease;pointer-events:none;overflow:visible}
    .aw-annie-bubble.long{width:150px;min-height:50px;padding:9px 12px;font-size:10.1px;border-radius:39% 47% 43% 51% / 46% 41% 55% 48%}
    .aw-annie-bubble.show{opacity:1;transform:none}
    .aw-annie-guide.right .aw-annie-bubble{right:8px;rotate:-1deg}
    .aw-annie-guide.left .aw-annie-bubble{left:8px;rotate:1deg}
    .aw-annie-bubble::before,.aw-annie-bubble::after{content:"";position:absolute;pointer-events:none}
    .aw-annie-guide.right .aw-annie-bubble::before{right:24px;bottom:-11px;width:20px;height:17px;background:#153c30;border-radius:3px 2px 16px 5px;transform:rotate(27deg) skewX(-9deg)}
    .aw-annie-guide.right .aw-annie-bubble::after{right:26px;bottom:-8px;width:16px;height:14px;background:#fffdf5;border-radius:2px 2px 13px 4px;transform:rotate(27deg) skewX(-9deg)}
    .aw-annie-guide.left .aw-annie-bubble::before{left:24px;bottom:-11px;width:20px;height:17px;background:#153c30;border-radius:2px 3px 5px 16px;transform:rotate(-27deg) skewX(9deg)}
    .aw-annie-guide.left .aw-annie-bubble::after{left:26px;bottom:-8px;width:16px;height:14px;background:#fffdf5;border-radius:2px 2px 4px 13px;transform:rotate(-27deg) skewX(9deg)}

    html body .hero.aw-hero .aw-kicker{display:block!important;width:auto!important;max-width:100%!important;margin:0 0 14px!important;padding:0!important;color:#f3c85b!important;background:transparent!important;border:0!important;border-radius:0!important;box-shadow:none!important;outline:0!important;font:950 clamp(.74rem,3.1vw,.98rem)/1.18 system-ui,-apple-system,"Segoe UI",sans-serif!important;letter-spacing:.07em!important;text-align:center!important;text-transform:uppercase!important;text-shadow:0 2px 2px rgba(2,11,8,.98),0 0 8px rgba(0,0,0,.9)!important;-webkit-text-stroke:.35px rgba(4,20,14,.9);white-space:nowrap!important}
    html body .hero.aw-hero .aw-kicker::before,html body .hero.aw-hero .aw-kicker::after{content:none!important;display:none!important}
    html body .hero.aw-hero .aw-slogan{display:none!important}
    @keyframes awAnnieBlink{0%,100%{opacity:0;transform:scaleY(.15)}35%,65%{opacity:1;transform:scaleY(1)}}
    @media(max-width:700px){
      .aw-annie-token{width:180px;height:180px}.aw-annie-token img{width:154px;height:154px}
      .aw-annie-edge{width:14px}.aw-annie-guide{width:172px;height:130px;bottom:116px}.aw-annie-trunk-mask{width:14px}.aw-annie-button{width:82px}
      .aw-annie-bubble{bottom:82px;width:126px;min-height:42px;padding:7px 10px;font-size:9.7px}
      .aw-annie-bubble.long{width:146px;min-height:48px;padding:8px 11px;font-size:9.9px}
      html body .hero.aw-hero .aw-kicker{font-size:clamp(.7rem,3.1vw,.84rem)!important;letter-spacing:.055em!important}
    }
    @media(prefers-reduced-motion:reduce){.aw-annie-guide,.aw-annie-button,.aw-annie-bubble{transition:none!important}}
  `;
  document.head.appendChild(style);

  function normalizeHeroKicker(){
    const hero=document.querySelector('.hero.aw-hero');
    const copy=hero?.querySelector('.aw-copy');
    if(!hero||!copy)return false;
    const candidates=[...copy.querySelectorAll('.aw-kicker,.section-label,.section-label-light')];
    let kicker=candidates[0];
    if(!kicker){kicker=document.createElement('p');copy.prepend(kicker)}
    kicker.className='aw-kicker';
    kicker.textContent='PROFESSIONAL NORTH TEXAS TREE CARE';
    candidates.filter(node=>node!==kicker).forEach(node=>node.remove());
    return true;
  }

  function repairConcernPhoto(){
    const image=document.querySelector('.concern-card[data-concern="leaves"] img');
    if(!image)return false;
    image.alt='North Texas tree foliage viewed for visible leaf stress';
    if(!image.complete||image.naturalWidth===0||/concern-leaves\.webp(?:$|\?)/i.test(image.currentSrc||image.src))image.src='assets/healthy-tree.webp';
    image.onerror=()=>{image.onerror=null;image.src='assets/healthy-tree.webp'};
    return true;
  }

  function build(){
    const section=document.querySelector('.annie-callout');
    if(!section)return false;
    const sourceImage=section.querySelector('img[data-annie],.annie-badge img,img');
    if(!sourceImage)return false;
    const annieSource=sourceImage.currentSrc||sourceImage.src||'assets/annie.webp';
    const oldBadge=sourceImage.closest('.annie-badge');
    if(oldBadge)oldBadge.remove();else sourceImage.remove();

    section.classList.add('aw-annie-section');
    const content=section.querySelector(':scope > div')||section;
    const label=content.querySelector('.section-label');
    if(label)label.textContent='Meet Annie';
    document.getElementById('annieButton')?.remove();
    content.querySelector('.aw-annie-token')?.remove();

    const token=document.createElement('div');
    token.className='aw-annie-token';
    token.setAttribute('aria-label','Arborwise Annie');
    const tokenImage=new Image();
    tokenImage.src=annieSource;tokenImage.alt='';tokenImage.decoding='async';tokenImage.onerror=()=>{token.hidden=true};
    token.appendChild(tokenImage);content.insertBefore(token,label||content.firstChild);

    ['left','right'].forEach(side=>{
      const edge=document.createElement('div');edge.className=`aw-annie-edge ${side}`;edge.setAttribute('aria-hidden','true');document.body.appendChild(edge);
    });

    const guide=document.createElement('aside');
    guide.className='aw-annie-guide right';guide.setAttribute('aria-live','polite');
    guide.innerHTML='<div class="aw-annie-bubble"></div><div class="aw-annie-trunk-mask" aria-hidden="true"></div>';
    const annieButton=document.createElement('button');
    annieButton.type='button';annieButton.className='aw-annie-button';annieButton.setAttribute('aria-label','See another Annie tip');
    const travelingImage=new Image();travelingImage.src=annieSource;travelingImage.alt='';travelingImage.decoding='async';travelingImage.onerror=()=>{guide.hidden=true};
    annieButton.appendChild(travelingImage);guide.appendChild(annieButton);document.body.appendChild(guide);

    const bubble=guide.querySelector('.aw-annie-bubble');
    const targets=TARGETS.map(([selector,message])=>{const element=document.querySelector(selector);return element?{element,message}:null}).filter(Boolean);
    let activeTarget=-1,tipIndex=0,bubbleTimer=0,blinkTimer=0,idleTimer=0,moveTimer=0,frame=0;
    const isVisible=()=>document.visibilityState==='visible'&&guide.classList.contains('show')&&guide.classList.contains('landed');

    function scheduleIdleTip(){
      window.clearTimeout(idleTimer);if(!isVisible())return;
      idleTimer=window.setTimeout(()=>{if(!isVisible())return;showBubble(TAP_TIPS[tipIndex++%TAP_TIPS.length]);scheduleIdleTip()},10000);
    }
    function showBubble(message){
      window.clearTimeout(bubbleTimer);window.clearTimeout(blinkTimer);
      bubble.textContent=message;bubble.classList.toggle('long',message.length>38);bubble.classList.add('show');annieButton.classList.remove('blink');
      blinkTimer=window.setTimeout(()=>{annieButton.classList.add('blink');window.setTimeout(()=>annieButton.classList.remove('blink'),430)},2400);
      bubbleTimer=window.setTimeout(()=>bubble.classList.remove('show'),4000);scheduleIdleTip();
    }
    function landAt(index,immediate=false){
      if(index===activeTarget&&guide.classList.contains('landed'))return;
      activeTarget=index;const side=index%2===0?'right':'left';const message=targets[index]?.message||OPENING;
      window.clearTimeout(moveTimer);window.clearTimeout(idleTimer);guide.classList.add('show');guide.classList.remove('landed');bubble.classList.remove('show');
      moveTimer=window.setTimeout(()=>{
        guide.classList.toggle('right',side==='right');guide.classList.toggle('left',side==='left');void guide.offsetWidth;
        requestAnimationFrame(()=>requestAnimationFrame(()=>{guide.classList.add('landed');window.setTimeout(()=>showBubble(message),immediate?220:430)}));
      },immediate?40:110);
    }
    function nearestTarget(){
      const focus=window.innerHeight*.56;let best=0,distance=Infinity;
      targets.forEach((target,index)=>{const rect=target.element.getBoundingClientRect();const center=rect.top+Math.min(rect.height,window.innerHeight)/2;const candidate=Math.abs(center-focus);if(candidate<distance){distance=candidate;best=index}});
      return best;
    }
    function update(){frame=0;if(!targets.length)return;landAt(nearestTarget());scheduleIdleTip()}
    function requestUpdate(){if(!frame)frame=requestAnimationFrame(update)}

    annieButton.addEventListener('click',event=>{event.preventDefault();event.stopPropagation();showBubble(TAP_TIPS[tipIndex++%TAP_TIPS.length])});
    window.addEventListener('scroll',requestUpdate,{passive:true});window.addEventListener('resize',requestUpdate,{passive:true});
    window.addEventListener('pointerdown',scheduleIdleTip,{passive:true});document.addEventListener('visibilitychange',scheduleIdleTip);
    if(targets.length)landAt(0,true);
    return true;
  }

  let attempts=0;
  const timer=window.setInterval(()=>{attempts+=1;const ready=normalizeHeroKicker()&&repairConcernPhoto()&&build();if(ready||attempts>80)window.clearInterval(timer)},100);
})();
