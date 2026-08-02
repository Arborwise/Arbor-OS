(() => {
  'use strict';

  if (document.getElementById('arborwise-annie-scroll-polish-v17')) return;

  const style = document.createElement('style');
  style.id = 'arborwise-annie-scroll-polish-v17';
  style.textContent = `
    .aw-annie-scroll__perch{
      margin:0!important;
      padding:0!important;
      border:0!important;
      border-radius:18px!important;
      background:transparent!important;
      box-shadow:none!important;
      color:inherit!important;
      font:inherit!important;
      appearance:none!important;
      -webkit-appearance:none!important;
    }
  `;
  document.head.appendChild(style);
})();
