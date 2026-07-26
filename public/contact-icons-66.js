'use strict';
(() => {
  const VERSION='67';
  const params=new URLSearchParams(location.search);
  const crewPreview=params.get('view')==='crew';
  const standalone=window.matchMedia?.('(display-mode: standalone)').matches||window.navigator.standalone===true;

  if(location.pathname.endsWith('/crew-board.html')&&!crewPreview){
    if(standalone){
      location.replace('/board-now.html?source=home-icon&board=67');
      return;
    }
    fetch('/api/session',{credentials:'same-origin',cache:'no-store'})
      .then(response=>response.ok?response.json():null)
      .then(data=>{
        if(data?.authenticated)location.replace('/board-now.html?source=home-icon&board=67');
      })
      .catch(()=>{});
  }

  const icons={
    call:`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.8a2 2 0 0 1-.45 2.11L8.09 9.88a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.11-.45c.9.32 1.84.55 2.8.68A2 2 0 0 1 22 16.92Z"/></svg>`,
    text:`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 15a4 4 0 0 1-4 4H8l-5 3v-7a4 4 0 0 1-1-2.65V7a4 4 0 0 1 4-4h11a4 4 0 0 1 4 4Z"/><path d="M7 9h10M7 13h7"/></svg>`,
    email:`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    map:`<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></svg>`
  };

  const style=document.createElement('style');
  style.id=`arborwise-contact-icons-${VERSION}`;
  style.textContent=`
    .recordActions,.actions{
      align-items:center!important;
      gap:18px!important;
    }
    .recordActions .recordAction,
    .actions a.call,.actions a.text,.actions a.email,.actions a.map{
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      min-width:44px!important;
      min-height:46px!important;
      width:auto!important;
      padding:6px 10px!important;
      border:0!important;
      border-radius:0!important;
      background:transparent!important;
      box-shadow:none!important;
      text-decoration:none!important;
      position:relative!important;
      touch-action:manipulation;
      -webkit-tap-highlight-color:transparent;
    }
    .recordActions .recordAction.call,.actions a.call{color:#17633b!important}
    .recordActions .recordAction.text,.actions a.text{color:#c44f12!important}
    .recordActions .recordAction.email,.actions a.email{color:#285f92!important}
    .recordActions .recordAction.map,.actions a.map{color:#8a5b12!important}
    .recordActions .recordAction svg,
    .actions a.call svg,.actions a.text svg,.actions a.email svg,.actions a.map svg{
      display:block!important;
      width:30px!important;
      height:30px!important;
      fill:none!important;
      stroke:currentColor!important;
      stroke-width:1.9!important;
      stroke-linecap:round!important;
      stroke-linejoin:round!important;
      overflow:visible!important;
    }
    .recordActions .recordAction span,
    .actions a.call span,.actions a.text span,.actions a.email span,.actions a.map span{
      position:absolute!important;
      width:1px!important;
      height:1px!important;
      padding:0!important;
      margin:-1px!important;
      overflow:hidden!important;
      clip:rect(0,0,0,0)!important;
      white-space:nowrap!important;
      border:0!important;
    }
    .recordActions .recordAction:active,
    .actions a.call:active,.actions a.text:active,.actions a.email:active,.actions a.map:active{
      transform:scale(.88)!important;
      background:transparent!important;
    }
    @media (max-width:390px){
      .recordActions,.actions{gap:12px!important}
      .recordActions .recordAction,
      .actions a.call,.actions a.text,.actions a.email,.actions a.map{padding:6px 8px!important}
      .recordActions .recordAction svg,
      .actions a.call svg,.actions a.text svg,.actions a.email svg,.actions a.map svg{width:28px!important;height:28px!important}
    }
  `;
  if(!document.getElementById(style.id))document.head.appendChild(style);

  function kindFor(link){
    if(link.classList.contains('call'))return 'call';
    if(link.classList.contains('text'))return 'text';
    if(link.classList.contains('email'))return 'email';
    if(link.classList.contains('map'))return 'map';
    return '';
  }

  function improve(root=document){
    root.querySelectorAll?.('.recordActions a.recordAction,.actions a.call,.actions a.text,.actions a.email,.actions a.map').forEach(link=>{
      if(link.dataset.contactIcons===VERSION)return;
      const kind=kindFor(link);
      if(!kind||!icons[kind])return;
      const label=link.getAttribute('aria-label')||link.getAttribute('title')||({call:'Call',text:'Text',email:'Email',map:'Map'}[kind]);
      link.innerHTML=`${icons[kind]}<span>${label}</span>`;
      link.dataset.contactIcons=VERSION;
    });
  }

  improve();
  const observer=new MutationObserver(mutations=>{
    for(const mutation of mutations){
      for(const node of mutation.addedNodes){
        if(node.nodeType===1)improve(node);
      }
    }
  });
  observer.observe(document.body,{childList:true,subtree:true});
  window.addEventListener('arborwise:data-ready',()=>improve());
  window.ARBORWISE_CONTACT_ICONS_VERSION=VERSION;
})();
