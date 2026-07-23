'use strict';
(() => {
  const reveal = () => {
    requestAnimationFrame(() => {
      document.body.classList.remove('booting');
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', reveal, { once: true });
  } else {
    reveal();
  }
  setTimeout(() => document.body.classList.remove('booting'), 1800);
})();
