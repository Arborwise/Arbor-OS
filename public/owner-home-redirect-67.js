'use strict';
(() => {
  const params=new URLSearchParams(location.search);
  if(params.get('view')==='crew')return;

  const style=document.createElement('style');
  style.textContent='html.ownerCheck body{visibility:hidden!important}';
  document.head.appendChild(style);
  document.documentElement.classList.add('ownerCheck');

  let finished=false;
  const reveal=()=>{
    if(finished)return;
    finished=true;
    document.documentElement.classList.remove('ownerCheck');
  };

  const timer=setTimeout(reveal,2500);
  fetch('/api/session',{credentials:'same-origin',cache:'no-store'})
    .then(response=>response.ok?response.json():null)
    .then(data=>{
      if(data?.authenticated){
        clearTimeout(timer);
        location.replace('/board-now.html?source=home-icon&board=67');
        return;
      }
      reveal();
    })
    .catch(reveal);
})();
