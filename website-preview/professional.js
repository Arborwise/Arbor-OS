(()=>{
  'use strict';

  const BASE_BUILD='https://cdn.jsdelivr.net/gh/Arborwise/Arbor-OS@f63013983ef3a82fe01acb614a710122e5c57a81/website-preview/professional.js';
  const ENHANCEMENTS=[
    'chamber-memberships-v16.js?v=20260802-1610',
    'annie-scroll-flight-v16.js?v=20260802-1610'
  ];

  function installReadOnlyAnnie(){
    const button=document.getElementById('annieButton');
    if(!button)return;
    try{window.speechSynthesis?.cancel();}catch{}
    button.textContent='Read another Annie tip';
    button.setAttribute('aria-label','Read another Annie tree-care tip');
    button.title='Show another Annie tree-care tip';
  }

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
    installReadOnlyAnnie();
    for(const src of ENHANCEMENTS){
      try{
        await loadEnhancement(src);
      }catch(error){
        console.error(error);
      }
    }
  }

  const base=document.createElement('script');
  base.src=BASE_BUILD;
  base.async=false;
  base.onload=finishWebsite;
  base.onerror=()=>console.error('The Arborwise website base build could not be loaded.');
  document.head.appendChild(base);
})();
