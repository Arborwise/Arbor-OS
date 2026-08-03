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
    'annie-system.js',
    'concern-checker-v47.js'
  ];

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

  async function finishWebsite(){
    for(const src of ENHANCEMENTS){
      try{
        await loadEnhancement(src);
      }catch(error){
        console.error(error);
      }
    }
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