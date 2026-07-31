(()=>{
  'use strict';

  const BASE_BUILD='https://cdn.jsdelivr.net/gh/Arborwise/Arbor-OS@f63013983ef3a82fe01acb614a710122e5c57a81/website-preview/professional.js';

  function installReadOnlyAnnie(){
    const button=document.getElementById('annieButton');
    if(!button)return;
    try{window.speechSynthesis?.cancel();}catch{}
    button.textContent='Read another Annie tip';
    button.setAttribute('aria-label','Read another Annie tree-care tip');
    button.title='Show another Annie tree-care tip';
  }

  const base=document.createElement('script');
  base.src=BASE_BUILD;
  base.async=false;
  base.onload=installReadOnlyAnnie;
  base.onerror=()=>console.error('The Arborwise website base build could not be loaded.');
  document.head.appendChild(base);
})();
