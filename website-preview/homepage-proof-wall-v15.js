(() => {
  'use strict';

  const section = document.querySelector('.recognition-section');
  if (!section || section.dataset.proofWallV15 === 'true') return;
  section.dataset.proofWallV15 = 'true';
  section.classList.add('proof-wall-v15');

  const copy = section.querySelector('.recognition-copy');
  const kicker = copy?.querySelector('.kicker');
  const title = copy?.querySelector('h2');
  const description = copy?.querySelector('p:not(.kicker)');
  const areaLinks = copy?.querySelector('.area-links');

  if (kicker) kicker.textContent = 'North Texas Proof';
  if (title) title.innerHTML = 'Rooted here.<br><em>Voted favorite.</em>';
  if (description) {
    description.textContent = 'Local chamber membership and back-to-back Neighborhood Favorite recognition—earned where Arborwise lives and works.';
  }

  if (copy && !copy.querySelector('.proof-stats-v15')) {
    const stats = document.createElement('div');
    stats.className = 'proof-stats-v15';
    stats.innerHTML = `
      <div><strong>2×</strong><span>Neighborhood Favorite</span></div>
      <div><strong>2</strong><span>Local Chambers</span></div>
      <div><strong>1</strong><span>Accountable Local Team</span></div>`;
    areaLinks?.insertAdjacentElement('beforebegin', stats);
  }

  const grid = section.querySelector('.recognition-grid');
  if (grid) {
    const cards = [...grid.querySelectorAll(':scope > article')];
    const classify = card => {
      const source = card.querySelector('img')?.getAttribute('src') || '';
      if (source.includes('2025')) return 'favorite-2025';
      if (source.includes('2024')) return 'favorite-2024';
      if (source.includes('van-alstyne')) return 'chamber-van';
      return 'chamber-farmersville';
    };
    const order = ['favorite-2025', 'favorite-2024', 'chamber-van', 'chamber-farmersville'];

    cards.forEach(card => {
      const kind = classify(card);
      card.classList.add('proof-card-v15', kind);

      const image = card.querySelector('img');
      const strong = card.querySelector('strong');
      const span = card.querySelector('span');
      if (image && !card.querySelector('.proof-art-v15')) {
        const art = document.createElement('div');
        art.className = 'proof-art-v15';
        image.replaceWith(art);
        art.appendChild(image);
      }
      if (strong && span && !card.querySelector('.proof-copy-v15')) {
        const cardCopy = document.createElement('div');
        cardCopy.className = 'proof-copy-v15';
        strong.replaceWith(cardCopy);
        cardCopy.append(strong, span);
      }

      if (kind.startsWith('favorite') && !card.querySelector('.proof-ribbon-v15')) {
        const ribbon = document.createElement('b');
        ribbon.className = 'proof-ribbon-v15';
        ribbon.textContent = kind === 'favorite-2025' ? 'BACK-TO-BACK' : 'NEIGHBORS CHOSE US';
        card.appendChild(ribbon);
      }
    });

    order.forEach(kind => {
      const card = grid.querySelector(`.${kind}`);
      if (card) grid.appendChild(card);
    });
  }

  if (!section.querySelector('.proof-ticker-v15')) {
    const ticker = document.createElement('div');
    ticker.className = 'proof-ticker-v15';
    ticker.setAttribute('aria-hidden', 'true');
    ticker.innerHTML = '<div><span>FARMERSVILLE</span><i>•</i><span>VAN ALSTYNE</span><i>•</i><span>NEIGHBORHOOD FAVORITE 2024</span><i>•</i><span>NEIGHBORHOOD FAVORITE 2025</span><i>•</i><span>LOCAL PEOPLE. REAL ACCOUNTABILITY.</span><i>•</i></div>';
    section.appendChild(ticker);
  }

  const style = document.createElement('style');
  style.id = 'proof-wall-styles-v15';
  style.textContent = `
    .recognition-section.proof-wall-v15{
      position:relative!important;
      isolation:isolate!important;
      overflow:hidden!important;
      display:grid!important;
      grid-template-columns:minmax(0,.8fr) minmax(0,1.2fr)!important;
      gap:clamp(34px,5vw,78px)!important;
      align-items:center!important;
      margin-top:40px!important;
      margin-bottom:88px!important;
      padding:clamp(48px,6vw,86px)!important;
      color:#fff!important;
      background:
        radial-gradient(circle at 93% 8%,rgba(216,242,119,.24),transparent 25%),
        radial-gradient(circle at 8% 92%,rgba(212,160,63,.18),transparent 28%),
        linear-gradient(145deg,#05271e 0%,#0b3f2f 54%,#136044 100%)!important;
      border:1px solid rgba(216,242,119,.28)!important;
      border-radius:42px!important;
      box-shadow:0 28px 80px rgba(5,39,30,.28)!important;
    }
    .recognition-section.proof-wall-v15:before,
    .recognition-section.proof-wall-v15:after{
      content:'';
      position:absolute;
      z-index:-1;
      border-radius:50%;
      border:1px solid rgba(216,242,119,.16);
      pointer-events:none;
    }
    .recognition-section.proof-wall-v15:before{width:430px;height:430px;right:-180px;top:-190px;box-shadow:0 0 0 48px rgba(216,242,119,.035),0 0 0 96px rgba(216,242,119,.025)}
    .recognition-section.proof-wall-v15:after{width:300px;height:300px;left:-170px;bottom:-150px;box-shadow:0 0 0 42px rgba(212,160,63,.04)}
    .proof-wall-v15 .recognition-copy{position:relative;z-index:2}
    .proof-wall-v15 .recognition-copy .kicker{color:#d8f277!important;margin-bottom:16px!important}
    .proof-wall-v15 .recognition-copy h2{color:#fff!important;font-size:clamp(2.9rem,5vw,5.35rem)!important;line-height:.94!important;margin-bottom:22px!important;max-width:9ch!important}
    .proof-wall-v15 .recognition-copy h2 em{display:inline-block;color:#d8f277;font-style:normal;text-shadow:0 7px 30px rgba(216,242,119,.16)}
    .proof-wall-v15 .recognition-copy>p:not(.kicker){color:#dcebe4!important;font-size:1.08rem!important;max-width:48ch!important}
    .proof-stats-v15{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px;margin:28px 0 24px}
    .proof-stats-v15>div{min-width:0;padding:14px 10px;border:1px solid rgba(255,255,255,.18);border-radius:16px;background:rgba(255,255,255,.075);backdrop-filter:blur(8px)}
    .proof-stats-v15 strong{display:block;color:#d8f277;font-family:Georgia,'Times New Roman',serif;font-size:1.7rem;line-height:1}
    .proof-stats-v15 span{display:block;margin-top:5px;color:#eff6f1;font-size:.68rem;font-weight:900;line-height:1.22;text-transform:uppercase;letter-spacing:.055em}
    .proof-wall-v15 .area-links{gap:7px!important;margin-top:0!important}
    .proof-wall-v15 .area-links a{background:rgba(255,255,255,.1)!important;color:#fff!important;border:1px solid rgba(255,255,255,.19)!important;transition:transform .18s ease,background .18s ease!important}
    .proof-wall-v15 .area-links a:hover,.proof-wall-v15 .area-links a:focus-visible{background:#d8f277!important;color:#05271e!important;transform:translateY(-2px)!important}

    .proof-wall-v15 .recognition-grid{position:relative;z-index:2;display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:18px!important;perspective:1000px}
    .proof-wall-v15 .proof-card-v15{
      position:relative!important;
      min-height:0!important;
      aspect-ratio:1.32/1!important;
      padding:20px!important;
      display:flex!important;
      flex-direction:column!important;
      align-items:center!important;
      justify-content:center!important;
      gap:12px!important;
      text-align:center!important;
      border:1px solid rgba(255,255,255,.72)!important;
      border-radius:28px!important;
      background:linear-gradient(145deg,#fffef9 0%,#f4f2e8 100%)!important;
      box-shadow:0 20px 35px rgba(0,0,0,.22),inset 0 1px 0 #fff!important;
      opacity:0;
      transform:translateY(52px) scale(.91) rotate(0deg);
      transition:transform .6s cubic-bezier(.2,1.25,.3,1),opacity .45s ease,box-shadow .25s ease!important;
    }
    .proof-wall-v15.proof-live-v15 .proof-card-v15{opacity:1}
    .proof-wall-v15.proof-live-v15 .favorite-2025{transform:translateY(-12px) rotate(-1.5deg)}
    .proof-wall-v15.proof-live-v15 .favorite-2024{transform:translateY(12px) rotate(1.4deg);transition-delay:.08s!important}
    .proof-wall-v15.proof-live-v15 .chamber-van{transform:translateY(-4px) rotate(1deg);transition-delay:.16s!important}
    .proof-wall-v15.proof-live-v15 .chamber-farmersville{transform:translateY(7px) rotate(-1deg);transition-delay:.23s!important}
    .proof-wall-v15 .proof-card-v15:hover{transform:translateY(-16px) rotate(0deg) scale(1.025)!important;box-shadow:0 28px 48px rgba(0,0,0,.29),0 0 0 3px rgba(216,242,119,.3)!important;z-index:5}
    .proof-wall-v15 .proof-art-v15{width:min(58%,150px);aspect-ratio:1;display:grid;place-items:center;filter:drop-shadow(0 10px 12px rgba(6,40,31,.14))}
    .proof-wall-v15 .proof-art-v15 img{grid-row:auto!important;width:100%!important;height:100%!important;object-fit:contain!important}
    .proof-wall-v15 .proof-copy-v15{display:grid;gap:3px;justify-items:center}
    .proof-wall-v15 .proof-copy-v15 strong{align-self:auto!important;color:#0b3f2f!important;font-size:clamp(1rem,1.5vw,1.32rem)!important;line-height:1.08!important}
    .proof-wall-v15 .proof-copy-v15 span{align-self:auto!important;color:#5d6f67!important;font-size:.76rem!important;letter-spacing:.13em!important}
    .proof-wall-v15 .favorite-2025{background:linear-gradient(145deg,#f3ffbe 0%,#fffef9 58%,#e1f1d8 100%)!important;border:2px solid #d8f277!important}
    .proof-wall-v15 .favorite-2025 .proof-art-v15{width:min(66%,172px);animation:proofGlowV15 2.8s ease-in-out infinite}
    .proof-ribbon-v15{position:absolute;top:14px;right:-8px;padding:7px 12px;background:#d4a03f;color:#05271e;font-size:.62rem;font-weight:1000;letter-spacing:.09em;box-shadow:0 7px 14px rgba(0,0,0,.16);transform:rotate(5deg)}
    .proof-wall-v15 .favorite-2024 .proof-ribbon-v15{background:#0b3f2f;color:#d8f277;transform:rotate(-4deg);right:auto;left:-8px}
    .proof-wall-v15 .chamber-van,.proof-wall-v15 .chamber-farmersville{background:linear-gradient(145deg,#fff 0%,#edf3e8 100%)!important}
    .proof-wall-v15 .chamber-van .proof-art-v15,.proof-wall-v15 .chamber-farmersville .proof-art-v15{width:min(67%,160px)}

    .proof-ticker-v15{grid-column:1/-1;position:relative;z-index:2;overflow:hidden;margin:14px calc(clamp(48px,6vw,86px) * -1) calc(clamp(48px,6vw,86px) * -1);padding:13px 0;background:#d8f277;color:#05271e;border-top:1px solid rgba(255,255,255,.4);white-space:nowrap}
    .proof-ticker-v15>div{display:inline-flex;align-items:center;gap:18px;min-width:max-content;font-weight:1000;font-size:.72rem;letter-spacing:.095em;animation:proofTickerV15 24s linear infinite}
    .proof-ticker-v15>div:after{content:'FARMERSVILLE  •  VAN ALSTYNE  •  NEIGHBORHOOD FAVORITE 2024  •  NEIGHBORHOOD FAVORITE 2025  •  LOCAL PEOPLE. REAL ACCOUNTABILITY.  •';margin-left:18px}
    .proof-ticker-v15 i{font-style:normal;color:#3f6c27}

    @keyframes proofGlowV15{0%,100%{filter:drop-shadow(0 10px 12px rgba(6,40,31,.14))}50%{filter:drop-shadow(0 13px 18px rgba(79,154,76,.38))}}
    @keyframes proofTickerV15{to{transform:translateX(-50%)}}

    @media(max-width:1100px){
      .recognition-section.proof-wall-v15{grid-template-columns:1fr!important}
      .proof-wall-v15 .recognition-copy{text-align:center}
      .proof-wall-v15 .recognition-copy h2{max-width:none!important}
      .proof-wall-v15 .recognition-copy>p:not(.kicker){margin-left:auto;margin-right:auto}
      .proof-wall-v15 .area-links{justify-content:center!important}
      .proof-stats-v15{max-width:640px;margin-left:auto;margin-right:auto}
      .proof-wall-v15 .recognition-grid{max-width:760px;width:100%;margin:auto}
    }
    @media(max-width:760px){
      .recognition-section.proof-wall-v15{margin:10px 12px 62px!important;padding:40px 18px 0!important;border-radius:30px!important;gap:28px!important}
      .proof-wall-v15 .recognition-copy h2{font-size:clamp(2.75rem,14vw,4rem)!important;line-height:.92!important}
      .proof-wall-v15 .recognition-copy>p:not(.kicker){font-size:.98rem!important}
      .proof-stats-v15{grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;margin-top:22px}
      .proof-stats-v15>div{padding:11px 5px;border-radius:13px}
      .proof-stats-v15 strong{font-size:1.45rem}
      .proof-stats-v15 span{font-size:.56rem;letter-spacing:.035em}
      .proof-wall-v15 .area-links{display:none!important}
      .proof-wall-v15 .recognition-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:11px!important}
      .proof-wall-v15 .proof-card-v15{aspect-ratio:auto!important;min-height:152px!important;padding:13px 10px!important;border-radius:21px!important;gap:7px!important}
      .proof-wall-v15 .favorite-2025{grid-column:1/-1;min-height:204px!important;display:grid!important;grid-template-columns:42% 1fr!important;text-align:left!important;padding:18px!important}
      .proof-wall-v15 .favorite-2025 .proof-art-v15{width:100%!important}
      .proof-wall-v15 .favorite-2025 .proof-copy-v15{justify-items:start!important;text-align:left!important}
      .proof-wall-v15 .favorite-2025 .proof-copy-v15 strong{font-size:1.5rem!important}
      .proof-wall-v15 .favorite-2024{grid-column:1/-1;min-height:145px!important;display:grid!important;grid-template-columns:35% 1fr!important;text-align:left!important;padding:15px 18px!important}
      .proof-wall-v15 .favorite-2024 .proof-art-v15{width:100%!important}
      .proof-wall-v15 .favorite-2024 .proof-copy-v15{justify-items:start!important;text-align:left!important}
      .proof-wall-v15 .proof-art-v15{width:min(72%,105px)}
      .proof-wall-v15 .proof-copy-v15 strong{font-size:.83rem!important}
      .proof-wall-v15 .proof-copy-v15 span{font-size:.61rem!important}
      .proof-ribbon-v15{top:10px;right:-5px;font-size:.52rem;padding:5px 8px}
      .proof-wall-v15.proof-live-v15 .favorite-2025{transform:translateY(-4px) rotate(-.7deg)}
      .proof-wall-v15.proof-live-v15 .favorite-2024{transform:translateY(3px) rotate(.6deg)}
      .proof-wall-v15.proof-live-v15 .chamber-van{transform:translateY(0) rotate(.7deg)}
      .proof-wall-v15.proof-live-v15 .chamber-farmersville{transform:translateY(4px) rotate(-.7deg)}
      .proof-ticker-v15{margin:6px -18px 0!important;padding:11px 0!important;border-radius:0 0 30px 30px}
    }
    @media(prefers-reduced-motion:reduce){
      .proof-wall-v15 .proof-card-v15{opacity:1!important;transform:none!important;transition:none!important}
      .proof-wall-v15 .favorite-2025 .proof-art-v15,.proof-ticker-v15>div{animation:none!important}
    }
  `;
  document.head.appendChild(style);

  requestAnimationFrame(() => {
    if (!('IntersectionObserver' in window)) {
      section.classList.add('proof-live-v15');
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          section.classList.add('proof-live-v15');
          observer.disconnect();
        }
      });
    }, { threshold: 0.18 });
    observer.observe(section);
  });
})();