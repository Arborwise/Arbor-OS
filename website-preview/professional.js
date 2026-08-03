(()=>{
  'use strict';

  // Canonical website systems only: no stacked Annie overrides.
  // Website preview deployment trigger: August 3, 2026.
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
    'annie-system.js',
    'concern-checker-v47.js'
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

  async function finishWebsite(){
    for(const src of ENHANCEMENTS){
      try{
        await loadEnhancement(src);
      }catch(error){
        console.error(error);
      }
    }
    applyConcernPhotos();
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