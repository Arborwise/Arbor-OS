(() => {
  'use strict';

  function applyPremiumHero() {
    const hero = document.querySelector('.hero.aw-hero') || document.querySelector('.hero');
    if (!hero) return false;

    const copy = hero.querySelector('.aw-copy') || hero;
    const heading = copy.querySelector('h1');
    if (heading) {
      heading.innerHTML = 'Tree Care<br><span>That Makes Sense.</span>';
      heading.style.setProperty('width', '100%', 'important');
      heading.style.setProperty('max-width', '12ch', 'important');
      heading.style.setProperty('margin', '14px auto 24px', 'important');
      heading.style.setProperty('text-align', 'center', 'important');
      heading.style.setProperty('line-height', '.94', 'important');
      heading.style.setProperty('font-size', 'clamp(3rem, 12.8vw, 4rem)', 'important');
      heading.style.setProperty('letter-spacing', '-.035em', 'important');
      const span = heading.querySelector('span');
      if (span) {
        span.style.setProperty('display', 'block', 'important');
        span.style.setProperty('width', '100%', 'important');
        span.style.setProperty('white-space', 'nowrap', 'important');
        span.style.setProperty('text-align', 'center', 'important');
      }
    }

    const candidates = [...copy.querySelectorAll('p,strong,em,div,span')];
    const foundation = candidates.find(el => el.textContent.trim() === 'Nurture Your Nature');
    if (foundation) foundation.classList.add('aw-foundation-premium');

    const honesty = copy.querySelector('.aw-honesty') || candidates.find(el => el.textContent.includes('Sometimes there is a real concern'));
    if (honesty) honesty.classList.add('aw-honesty-premium');

    document.getElementById('aw-hero-premium-v58')?.remove();
    const style = document.createElement('style');
    style.id = 'aw-hero-premium-v58';
    style.textContent = `
      html body .hero.aw-hero .aw-copy{
        display:flex!important;
        flex-direction:column!important;
        align-items:center!important;
        text-align:center!important;
      }
      html body .hero.aw-hero .aw-foundation-premium{
        position:relative!important;
        display:flex!important;
        width:min(100%,640px)!important;
        margin:22px auto 10px!important;
        align-items:center!important;
        justify-content:center!important;
        gap:16px!important;
        color:#efc45f!important;
        font-family:Georgia,"Times New Roman",serif!important;
        font-size:clamp(2rem,5vw,3.2rem)!important;
        font-style:italic!important;
        font-weight:800!important;
        line-height:1!important;
        white-space:nowrap!important;
        text-align:center!important;
        text-shadow:0 3px 14px rgba(0,0,0,.94)!important;
      }
      html body .hero.aw-hero .aw-foundation-premium::before,
      html body .hero.aw-hero .aw-foundation-premium::after{
        content:""!important;
        flex:1 1 70px!important;
        max-width:110px!important;
        min-width:32px!important;
        height:2px!important;
        border-radius:999px!important;
        background:linear-gradient(90deg,transparent,#efc45f)!important;
        box-shadow:0 0 9px rgba(239,196,95,.5)!important;
      }
      html body .hero.aw-hero .aw-foundation-premium::after{
        background:linear-gradient(90deg,#efc45f,transparent)!important;
      }
      html body .hero.aw-hero .aw-honesty,
      html body .hero.aw-hero .aw-honesty-premium{
        width:min(100%,620px)!important;
        margin:24px auto 24px!important;
        padding:22px 24px!important;
        color:#132d24!important;
        background:linear-gradient(180deg,#fffaf0 0%,#f0d898 100%)!important;
        border:2px solid #efc45f!important;
        border-radius:25px!important;
        box-shadow:inset 0 1px 0 rgba(255,255,255,.85),0 14px 30px rgba(0,0,0,.38),0 0 0 4px rgba(239,196,95,.1)!important;
        font-size:clamp(1.08rem,2.2vw,1.34rem)!important;
        font-weight:700!important;
        line-height:1.48!important;
        text-align:center!important;
        text-shadow:none!important;
      }
      @media(max-width:700px){
        html body .hero.aw-hero .aw-copy{padding:34px 22px 118px!important}
        html body .hero.aw-hero .aw-copy h1{max-width:12ch!important;font-size:clamp(2.9rem,12.8vw,3.65rem)!important}
        html body .hero.aw-hero .aw-foundation-premium{gap:9px!important;font-size:clamp(1.75rem,7.7vw,2.2rem)!important}
        html body .hero.aw-hero .aw-foundation-premium::before,
        html body .hero.aw-hero .aw-foundation-premium::after{max-width:48px!important;min-width:24px!important}
        html body .hero.aw-hero .aw-honesty,
        html body .hero.aw-hero .aw-honesty-premium{width:100%!important;padding:20px 18px!important;font-size:1.05rem!important}
      }
    `;
    document.head.appendChild(style);
    return true;
  }

  let attempts = 0;
  const timer = window.setInterval(() => {
    attempts += 1;
    if (applyPremiumHero() || attempts > 100) window.clearInterval(timer);
  }, 100);
})();
