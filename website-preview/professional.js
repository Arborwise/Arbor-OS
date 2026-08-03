(()=>{
  'use strict';

  // Canonical website systems only: no stacked Annie overrides.
  const root=document.documentElement;
  const body=document.body;
  root.style.background='#070b09';
  body.style.visibility='hidden';
  body.style.opacity='0';
  body.style.transition='opacity .18s ease';

  let revealed=false;
  function revealWebsite(){
    if(revealed)return;
    revealed=true;
    root.classList.add('aw-site-ready');
    body.style.visibility='visible';
    requestAnimationFrame(()=>{
      body.style.opacity='1';
      window.setTimeout(()=>{
        body.style.removeProperty('visibility');
        body.style.removeProperty('opacity');
        body.style.removeProperty('transition');
      },220);
    });
  }

  const fallbackReveal=window.setTimeout(revealWebsite,5000);
  const BASE_BUILD='https://cdn.jsdelivr.net/gh/Arborwise/Arbor-OS@f63013983ef3a82fe01acb614a710122e5c57a81/website-preview/professional.js';
  const ENHANCEMENTS=[
    'chamber-memberships-v17.js',
    'arborwise-way.js',
    'faq-cards.js',
    'hero-unify-v48.js?rev=orange-actions-type-20260803-1144',
    'annie-system-v2.js?rev=classic-curved-hook-20260803-1144',
    'concern-checker-v47.js',
    'final-fixes-v57.js?rev=annie-beak-green-call-20260803-1250'
  ];
  const CONCERN_PHOTOS={
    leaves:{
      src:'assets/concern-leaves-real.webp',
      alt:'Yellowing leaves showing visible canopy stress',
      position:'center 55%'
    },
    canopy:{
      src:'assets/concern-canopy-real.webp',
      alt:'A tree with extensive dead branches and canopy decline',
      position:'center 38%'
    },
    trunk:{
      src:'assets/concern-trunk-real.webp',
      alt:'A codominant trunk with a deep split between stems',
      position:'center center'
    },
    lean:{
      src:'assets/concern-lean-real.webp',
      alt:'A visibly leaning tree in an open lawn',
      position:'center 58%'
    }
  };

  function loadEnhancement(src){
    return new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=src;
      script.async=false;
      script.onload=resolve;
      script.onerror=()=>reject(new Error(`Unable to load ${src}`));
      document.head.appendChild(script);
    });
  }

  function applyConcernPhotos(){
    document.querySelectorAll('.concern-card[data-concern]').forEach(card=>{
      const photo=CONCERN_PHOTOS[card.dataset.concern];
      const image=card.querySelector('img');
      if(!photo||!image)return;
      image.src=photo.src;
      image.alt=photo.alt;
      image.style.objectPosition=photo.position;
      image.loading='lazy';
      image.decoding='async';
    });
  }

  function refineAnnieIntroduction(){
    const section=document.querySelector('.annie-callout');
    if(!section)return;
    const heading=section.querySelector('h2');
    const paragraph=section.querySelector('#annieTip')||section.querySelector('h2 + p');
    if(heading){
      heading.textContent='Don’t worry about diagnosing the tree. That’s our job.';
    }
    if(paragraph){
      paragraph.innerHTML='Tell us what changed, send a few clear photos, and let the tree tell its story. We’ll read the signs, explain what matters, and you can <a class="aw-annie-estimate-link" href="tel:+19724308330">call us for a free estimate</a> when you’re ready.';
    }
    document.getElementById('aw-annie-copy-refinement')?.remove();
    const style=document.createElement('style');
    style.id='aw-annie-copy-refinement';
    style.textContent=`
      html body .annie-callout .aw-annie-estimate-link{
        color:#2f9e4f!important;
        font-weight:950!important;
        text-decoration:underline!important;
        text-decoration-color:#2f9e4f!important;
        text-decoration-thickness:2px!important;
        text-underline-offset:3px!important;
      }
      html body .annie-callout .aw-annie-estimate-link:hover,
      html body .annie-callout .aw-annie-estimate-link:focus-visible{
        color:#1f7139!important;
        text-decoration-color:#1f7139!important;
      }
    `;
    document.head.appendChild(style);
  }

  function refinePlantingSection(){
    document.getElementById('aw-planting-refinement')?.remove();
    const style=document.createElement('style');
    style.id='aw-planting-refinement';
    style.textContent=`
      html body .nursery a.aw-nursery-link{
        color:#ff6700!important;
        font-weight:950!important;
        text-decoration:underline!important;
        text-decoration-thickness:2px!important;
        text-underline-offset:3px!important;
      }
      html body .nursery a.aw-nursery-link:hover,
      html body .nursery a.aw-nursery-link:focus-visible{
        color:#c94700!important;
      }
      @media(max-width:700px){
        html body .growth-section{
          min-height:0!important;
          height:auto!important;
          margin-bottom:0!important;
          padding:38px 18px 28px!important;
        }
        html body .growth-section .growth-inner{
          gap:14px!important;
        }
        html body .growth-section h2{
          margin-bottom:14px!important;
        }
        html body .growth-section p{
          margin-bottom:14px!important;
        }
        html body .growth-section .text-link-light{
          margin-top:0!important;
          margin-bottom:0!important;
        }
      }
    `;
    document.head.appendChild(style);

    const nursery=document.querySelector('.nursery');
    if(!nursery)return;
    const nurseryUrl='https://shadesofgreeninc.com/celina-tx/';
    const julieUrl='https://shadesofgreeninc.com/about/meet-our-staff/';
    const strong=nursery.querySelector('strong');
    const paragraph=nursery.querySelector('p');
    if(strong){
      strong.innerHTML=`Planted by Arborwise · Purchased from <a class="aw-nursery-link" href="${nurseryUrl}" target="_blank" rel="noopener">Shades of Green Nursery in Celina</a>`;
    }
    if(paragraph){
      paragraph.innerHTML=`Arborwise planted this tree after purchasing it from <a class="aw-nursery-link" href="${nurseryUrl}" target="_blank" rel="noopener">Shades of Green Nursery + Landscape in Celina</a>. We appreciate <a class="aw-nursery-link" href="${julieUrl}" target="_blank" rel="noopener">Julie Holland</a>’s help with the tree purchase.`;
    }
  }

  async function finishWebsite(){
    for(const src of ENHANCEMENTS){
      try{
        await loadEnhancement(src);
      }catch(error){
        console.error(error);
      }
    }
    applyConcernPhotos();
    refineAnnieIntroduction();
    refinePlantingSection();
    window.clearTimeout(fallbackReveal);
    requestAnimationFrame(()=>requestAnimationFrame(revealWebsite));
  }

  const base=document.createElement('script');
  base.src=BASE_BUILD;
  base.async=false;
  base.onload=finishWebsite;
  base.onerror=()=>{
    console.error('The Arborwise website base build could not be loaded.');
    window.clearTimeout(fallbackReveal);
    revealWebsite();
  };
  document.head.appendChild(base);
})();