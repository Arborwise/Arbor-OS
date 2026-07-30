(() => {
  const style = document.createElement('style');
  style.id = 'arborwise-final-v10b';
  style.textContent = `
    .hero-annie[data-v10-annie="true"]>p{display:block!important;visibility:visible!important;opacity:1!important}
    .hero-annie[data-v10-annie="true"]>:not(.annie-hero-v10):not(p){display:none!important;visibility:hidden!important;opacity:0!important}
    .annie-callout[data-v10-annie="true"]>:not(.annie-callout-v10):not(.annie-copy-v10){display:none!important;visibility:hidden!important;opacity:0!important}
  `;
  document.getElementById(style.id)?.remove();
  document.head.appendChild(style);
})();
