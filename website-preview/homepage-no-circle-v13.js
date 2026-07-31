(() => {
  'use strict';

  const STYLE_ID = 'arborwise-no-circle-v13';

  const installStyles = () => {
    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .climber-highlight,
      .climber-circle-v10,
      .climber-ring-v11,
      .climber-circle-v12{
        display:none!important;
        visibility:hidden!important;
        opacity:0!important;
      }
      .hero-media>figcaption{
        display:block!important;
        text-align:left!important;
      }
      .hero-media>figcaption strong{
        display:block!important;
      }
    `;
    document.head.appendChild(style);
  };

  const removeCircleAndSetCaption = () => {
    const media = document.querySelector('.hero-media');
    if (!media) return;

    media.querySelectorAll('.climber-highlight,.climber-circle-v10,.climber-ring-v11,.climber-circle-v12')
      .forEach(node => node.remove());

    let caption = media.querySelector(':scope>figcaption');
    if (!caption) {
      caption = document.createElement('figcaption');
      media.appendChild(caption);
    }
    caption.innerHTML = '<strong>Can you find the climber at work?</strong>';
  };

  const apply = () => {
    installStyles();
    removeCircleAndSetCaption();
  };

  apply();
  requestAnimationFrame(apply);
  setTimeout(apply, 400);
  setTimeout(apply, 1200);
  setTimeout(apply, 2200);
  setTimeout(apply, 3500);

  const observer = new MutationObserver(() => {
    clearTimeout(observer.timer);
    observer.timer = setTimeout(removeCircleAndSetCaption, 50);
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();
