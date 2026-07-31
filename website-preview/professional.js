(() => {
  'use strict';

  const styles = document.createElement('style');
  styles.textContent = `
    body{padding-bottom:96px}
    img[data-brand-logo]{visibility:hidden!important}
    img[data-brand-logo].aw-logo-ready{visibility:visible!important}
    .site-header{padding:8px 8px 0!important}
    .aw-header{max-width:1360px;margin:auto;overflow:hidden;color:#fff;background:#020403;border:1px solid rgba(215,165,66,.62);border-radius:26px;box-shadow:0 18px 45px rgba(0,0,0,.32)}
    .aw-brand-row{display:flex;min-height:116px;align-items:center;justify-content:center;padding:10px 14px;text-align:center}
    .aw-logo-link{display:flex;align-items:center;justify-content:center;width:100%;text-decoration:none}
    .aw-logo{display:block;width:min(96%,350px);height:auto;max-height:142px;object-fit:contain;filter:drop-shadow(0 10px 22px rgba(0,0,0,.58))}
    .aw-logo-fallback{display:block;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:2.45rem;font-weight:900;line-height:.82;letter-spacing:-.04em;text-align:center}
    .aw-logo-fallback b{color:#d9f378}.aw-logo-fallback small{display:block;margin-top:12px;color:#e3b655;font:900 .62rem/1 Inter,system-ui,sans-serif;letter-spacing:.25em;text-transform:uppercase}
    .aw-nav{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.025)}
    .aw-nav a{min-width:0;padding:12px 3px 13px;color:#f5f3ea;text-align:center;text-decoration:none;font-size:.69rem;font-weight:900;line-height:1.15}
    .aw-nav a:last-child{color:#d9f378}

    .hero.aw-hero{position:relative!important;display:block!important;max-width:1336px!important;min-height:740px!important;margin:10px 8px 0!important;padding:0!important;overflow:hidden!important;border-radius:28px!important;box-shadow:0 24px 65px rgba(0,0,0,.29)!important;background:#061f18!important}
    .aw-hero-photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:61% center}
    .aw-hero-shade{position:absolute;inset:0;background:linear-gradient(0deg,rgba(2,8,6,.985),rgba(2,8,6,.84) 54%,rgba(2,8,6,.17) 84%,rgba(2,8,6,.03))}
    .aw-hero-content{position:relative;z-index:1;min-height:740px;padding:28px 20px 24px;display:flex;flex-direction:column;justify-content:flex-end;align-items:center;color:#fff;text-align:center}
    .aw-kicker{margin:0 0 10px;color:#e7bd59;font-size:.66rem;font-weight:950;letter-spacing:.13em;text-transform:uppercase}
    .aw-hero h1{margin:0;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:3.25rem;line-height:.9;letter-spacing:-.045em;text-shadow:0 7px 26px rgba(0,0,0,.68)}
    .aw-hero h1 span{display:block;color:#d9f378}
    .aw-hero h1 sup{font-size:.38em;vertical-align:super;margin-left:.1em;color:#fff;font-family:Inter,system-ui,sans-serif;font-weight:800;letter-spacing:0;text-shadow:0 2px 8px rgba(0,0,0,.8)}
    .aw-slogan{margin:14px 0 8px;color:#f1c66b;font-family:Georgia,'Times New Roman',serif;font-size:1.42rem;font-weight:900;font-style:italic;letter-spacing:.025em;text-shadow:0 3px 15px rgba(0,0,0,.72)}
    .aw-hero-lead{max-width:610px;margin:0;color:#fff;font-size:1rem;font-weight:850;line-height:1.34;text-shadow:0 3px 16px rgba(0,0,0,.78)}
    .aw-honesty{max-width:600px;margin:13px 0 0;padding:11px 13px;color:#e7ece9;border-top:2px solid #d7a542;border-bottom:2px solid #d7a542;font-size:.87rem;line-height:1.42}
    .aw-actions{display:grid;grid-template-columns:1fr;width:100%;gap:8px;margin-top:18px}
    .aw-primary,.aw-secondary{display:flex;min-height:50px;align-items:center;justify-content:center;padding:11px 16px;border-radius:999px;text-decoration:none;text-align:center;font-size:.9rem;font-weight:950}
    .aw-primary{background:#d9f378;color:#061f18;box-shadow:0 10px 24px rgba(0,0,0,.32)}
    .aw-secondary{color:#fff;border:1px solid rgba(255,255,255,.82);background:rgba(0,0,0,.3)}

    .aw-video-card{display:grid;grid-template-columns:116px minmax(0,1fr);gap:12px;align-items:center;width:100%;margin-top:14px;padding:8px;color:#fff;background:rgba(1,6,4,.78);border:1px solid rgba(241,198,107,.62);border-radius:17px;text-align:left;text-decoration:none;box-shadow:0 10px 26px rgba(0,0,0,.3);backdrop-filter:blur(7px)}
    .aw-video-thumb{position:relative;display:block;overflow:hidden;aspect-ratio:16/9;border-radius:11px;background:#10261e}
    .aw-video-thumb img{width:100%;height:100%;object-fit:cover}
    .aw-video-play{position:absolute;left:50%;top:50%;display:grid;place-items:center;width:38px;height:38px;transform:translate(-50%,-50%);border:2px solid rgba(255,255,255,.9);border-radius:50%;color:#061f18;background:#d9f378;font-size:.92rem;font-weight:1000;box-shadow:0 6px 18px rgba(0,0,0,.4)}
    .aw-video-copy{display:flex;min-width:0;flex-direction:column;line-height:1.18}
    .aw-video-copy small{color:#f1c66b;font-size:.6rem;font-weight:950;letter-spacing:.12em;text-transform:uppercase}
    .aw-video-copy strong{margin-top:4px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:1.02rem;line-height:1.08}
    .aw-video-copy span{margin-top:5px;color:#dce7e1;font-size:.69rem;line-height:1.3}

    .trust-band.aw-proof-rail{display:grid!important;grid-template-columns:1fr 1fr!important;gap:9px!important;max-width:1336px!important;margin:10px auto 38px!important;padding:0 8px!important}
    .aw-proof-rail article{--accent:#d9f378;--panel:#0b3125;display:flex!important;min-height:116px!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;padding:14px 10px!important;background:linear-gradient(145deg,var(--panel),#071b15)!important;border:1px solid rgba(255,255,255,.16)!important;border-top:5px solid var(--accent)!important;border-radius:18px!important;box-shadow:0 11px 25px rgba(5,30,23,.14)!important;text-align:center!important}
    .proof-farmersville{--accent:#f0bf58!important;--panel:#17472f!important}
    .proof-vanalstyne{--accent:#83c9dc!important;--panel:#163e4c!important}
    .proof-nextdoor{--accent:#d9f378!important;--panel:#35431b!important}
    .proof-isa{--accent:#d8a7ed!important;--panel:#3d2746!important}
    .aw-proof-rail small{display:grid;place-items:center;width:34px;height:34px;margin-bottom:8px;border:2px solid rgba(255,255,255,.3);border-radius:50%;background:var(--accent);color:#061f18;font-size:.82rem;font-weight:1000;box-shadow:0 5px 13px rgba(0,0,0,.2)}
    .aw-proof-rail strong{display:block;color:var(--accent)!important;font-size:.84rem!important;line-height:1.18}
    .aw-proof-rail span{display:block;margin-top:5px;color:#f0f4f1!important;font-size:.7rem!important;line-height:1.32}

    .annie-callout{grid-template-columns:1fr!important;gap:16px!important;padding:28px 20px 30px!important;margin:0 8px 40px!important;text-align:center!important;background:linear-gradient(145deg,#fff5d5,#fffdf7 58%,#e4f1dc)!important}
    .annie-badge{display:grid;place-items:center;width:188px!important;height:188px!important;min-width:188px;min-height:188px;margin:0 auto 2px!important;aspect-ratio:1;border-radius:50%!important;background:radial-gradient(circle at 42% 34%,#174c37,#082c22 67%,#041611);border:4px solid #d7a542;box-shadow:0 0 0 7px rgba(217,243,120,.22),0 18px 34px rgba(5,30,23,.23)}
    .annie-badge img{display:block!important;visibility:visible!important;width:158px!important;height:158px!important;margin:0!important;object-fit:contain!important;filter:drop-shadow(0 13px 13px rgba(0,0,0,.28))}
    .annie-callout>div{min-width:0!important;width:100%!important}.annie-callout .section-label{margin-left:auto!important;margin-right:auto!important}.annie-callout h2{font-size:2.1rem!important;line-height:1.02!important;margin-bottom:13px!important}.annie-callout p:not(.section-label){font-size:.98rem!important;line-height:1.48!important}.plain-button{display:inline-block;margin-top:4px}

    .section-head,.way-intro,.rooted-copy{text-align:center!important;margin-left:auto!important;margin-right:auto!important}
    .section-head>* , .way-intro>* , .rooted-copy>*{margin-left:auto!important;margin-right:auto!important}
    .section-label{display:inline-block!important;position:relative!important;margin-bottom:22px!important;text-align:center!important;font-size:.78rem!important;font-weight:950!important;letter-spacing:.16em!important}
    .section-label::after{content:'';position:absolute;left:50%;bottom:-10px;width:76px;height:3px;transform:translateX(-50%);border-radius:99px;background:#d7a542}
    .intro-section .section-head h2,.concern-section .section-head h2,.services-section .section-head h2{font-size:clamp(1.9rem,8vw,2.65rem)!important;line-height:1.05!important}
    .section-head>p:last-child,.way-intro>p:last-child,.rooted-copy>p{max-width:760px}
    .process,.service-grid,.recognition-grid,.faq-list{text-align:left}
    .service-card>div{align-items:flex-start}
    .concern-section{display:none!important}

    .site-footer{text-align:center!important}.site-footer img[data-brand-logo]{width:min(88%,430px)!important;height:auto!important;max-height:190px!important;margin:0 auto 18px!important;object-fit:contain!important}
    .footer-logo-fallback{display:block;margin:0 auto 22px;color:#fff;font-family:Georgia,'Times New Roman',serif;font-size:2.7rem;font-weight:900;line-height:.85}.footer-logo-fallback b{color:#d9f378}.footer-logo-fallback small{display:block;margin-top:12px;color:#e3b655;font:900 .65rem/1 Inter,system-ui,sans-serif;letter-spacing:.24em;text-transform:uppercase}
    .mobile-bar{z-index:1000!important;max-height:72px!important}.mobile-bar a{min-width:0!important}
    footer{padding-bottom:120px!important}

    @media(min-width:701px){
      body{padding-bottom:0}.site-header{padding:14px 14px 0!important}.aw-header{border-radius:30px}.aw-brand-row{min-height:150px;padding:12px 34px}.aw-logo{width:min(75%,520px);max-height:190px}.aw-nav{display:flex;justify-content:center;gap:30px}.aw-nav a{padding:13px 16px 15px;font-size:.86rem}
      .hero.aw-hero{min-height:720px!important;margin:14px auto 0!important;border-radius:34px!important}.aw-hero-photo{object-position:58% center}.aw-hero-shade{background:linear-gradient(90deg,rgba(2,8,6,.94),rgba(2,8,6,.72) 47%,rgba(2,8,6,.16) 79%,rgba(2,8,6,.03)),linear-gradient(0deg,rgba(2,8,6,.72),transparent 48%)}.aw-hero-content{min-height:720px;max-width:790px;padding:clamp(44px,6vw,84px);align-items:flex-start;justify-content:center;text-align:left}.aw-kicker{font-size:.82rem}.aw-hero h1{font-size:clamp(3.8rem,7vw,6.5rem)}.aw-slogan{font-size:1.85rem}.aw-hero-lead{font-size:clamp(1.18rem,2vw,1.5rem)}.aw-honesty{text-align:left}.aw-actions{display:flex;width:auto;gap:12px}.aw-primary,.aw-secondary{min-height:54px;padding:13px 22px;font-size:1rem}.aw-video-card{max-width:520px;grid-template-columns:160px 1fr}.aw-video-copy strong{font-size:1.22rem}.aw-video-copy span{font-size:.8rem}
      .trust-band.aw-proof-rail{grid-template-columns:repeat(4,1fr)!important;gap:12px!important;padding:0 14px!important}.aw-proof-rail article{min-height:148px!important}.aw-proof-rail strong{font-size:1rem!important}.aw-proof-rail span{font-size:.8rem!important}
      .annie-callout{grid-template-columns:250px 1fr!important;gap:44px!important;padding:38px 50px!important;margin:0 auto 52px!important;text-align:left!important}.annie-badge{width:230px!important;height:230px!important;min-width:230px;min-height:230px;margin:0!important}.annie-badge img{width:198px!important;height:198px!important}.annie-callout .section-label{margin-left:0!important}.annie-callout .section-label::after{left:0;transform:none}.annie-callout h2{font-size:clamp(2rem,3.2vw,3.35rem)!important}
      footer{padding-bottom:40px!important}
    }
    @media(max-width:430px){
      .aw-brand-row{min-height:108px;padding:9px 11px}.aw-logo{width:min(98%,340px);max-height:132px}.aw-logo-fallback{font-size:2.25rem}.aw-nav a{font-size:.64rem;padding-left:2px;padding-right:2px}.aw-hero h1{font-size:3.08rem}.aw-hero h1 sup{font-size:.39em}.aw-slogan{font-size:1.35rem}.aw-video-card{grid-template-columns:108px minmax(0,1fr);gap:10px}.aw-video-copy strong{font-size:.96rem}.aw-video-copy span{font-size:.65rem}.aw-proof-rail article{min-height:120px!important;padding:13px 8px!important}.aw-proof-rail strong{font-size:.8rem!important}.aw-proof-rail span{font-size:.67rem!important}
    }
  `;
  document.head.appendChild(styles);

  const header = document.querySelector('.site-header');
  if (header) {
    header.innerHTML = `
      <div class="aw-header">
        <div class="aw-brand-row">
          <a class="aw-logo-link" href="#top" aria-label="Arborwise Tree Care home">
            <span class="aw-logo-fallback">Arbor<b>wise</b><small>Tree Care</small></span>
            <img class="aw-logo" data-brand-logo alt="Arborwise Tree Care. Nurture Your Nature.">
          </a>
        </div>
        <nav class="aw-nav" aria-label="Main navigation">
          <a href="#services">Services</a><a href="#way">Why Arborwise</a><a href="#planting">Tree Planting</a><a href="#estimate">Free Estimate</a>
        </nav>
      </div>`;
  }

  const hero = document.querySelector('.hero');
  if (hero) {
    hero.classList.add('aw-hero');
    hero.innerHTML = `
      <img class="aw-hero-photo" src="assets/hero-climber.webp" alt="An Arborwise climber working high in a mature North Texas tree">
      <div class="aw-hero-shade" aria-hidden="true"></div>
      <div class="aw-hero-content">
        <p class="aw-kicker">Professional North Texas Tree Care</p>
        <h1>Welcome to <span>Arborwise<sup>™</sup></span></h1>
        <p class="aw-slogan">Nurture Your Nature</p>
        <p class="aw-hero-lead">Honest answers. Skilled work. Every recommendation has a reason.</p>
        <p class="aw-honesty">Sometimes there is a real concern. Sometimes it can wait. And sometimes it is simply a tree being a tree.</p>
        <div class="aw-actions"><a class="aw-primary" href="#estimate">Get a Free Estimate</a><a class="aw-secondary" href="sms:+19724308330?body=Hi%20Arborwise%2C%20I%20have%20photos%20of%20a%20tree%20concern.">Text Photos</a></div>
        <a class="aw-video-card" href="https://www.youtube.com/watch?v=Mr4wQ1d3RAA" target="_blank" rel="noopener noreferrer" aria-label="Watch the full Arborwise job on YouTube">
          <span class="aw-video-thumb"><img src="https://i.ytimg.com/vi/Mr4wQ1d3RAA/hqdefault.jpg" alt="Preview of the full Arborwise tree job video"><span class="aw-video-play" aria-hidden="true">▶</span></span>
          <span class="aw-video-copy"><small>Real Arborwise work</small><strong>Watch the full job</strong><span>See the climber, ground crew, and controlled work on YouTube.</span></span>
        </a>
      </div>`;
    const videoImage = hero.querySelector('.aw-video-thumb img');
    videoImage?.addEventListener('error', () => { videoImage.src = 'assets/hero-climber.webp'; }, { once:true });
  }

  const trustBand = document.querySelector('.trust-band');
  if (trustBand) {
    trustBand.className = 'trust-band aw-proof-rail';
    trustBand.setAttribute('aria-label','Arborwise local credentials and recognition');
    trustBand.innerHTML = `
      <article class="proof-farmersville"><small>F</small><strong>Farmersville Chamber</strong><span>Local member serving the community where Greg lives.</span></article>
      <article class="proof-vanalstyne"><small>VA</small><strong>Van Alstyne Chamber</strong><span>Local member serving the community Brandon calls home.</span></article>
      <article class="proof-nextdoor"><small>★</small><strong>Nextdoor Fave 2024 &amp; 2025</strong><span>Chosen by North Texas neighbors two years in a row.</span></article>
      <article class="proof-isa"><small>ISA</small><strong>Certified Arborist on Staff</strong><span>Knowledge and reasoning behind the recommendation.</span></article>`;
  }

  const annieSection = document.querySelector('.annie-callout');
  const annieImage = annieSection?.querySelector('[data-annie]');
  if (annieSection && annieImage && !annieImage.parentElement?.classList.contains('annie-badge')) {
    const badge = document.createElement('div');
    badge.className = 'annie-badge';
    annieImage.before(badge);
    badge.appendChild(annieImage);
  }

  const installFallback = image => {
    const parent = image.parentElement;
    if (!parent || parent.querySelector('.aw-logo-fallback,.footer-logo-fallback')) return;
    const fallback = document.createElement('span');
    fallback.className = parent.closest('.site-footer') ? 'footer-logo-fallback' : 'aw-logo-fallback';
    fallback.innerHTML = 'Arbor<b>wise</b><small>Tree Care</small>';
    image.insertAdjacentElement('afterend',fallback);
  };

  const loadBrandLogos = async () => {
    const logos = [...document.querySelectorAll('[data-brand-logo]')];
    logos.forEach(installFallback);
    try {
      const response = await fetch('assets/logo-correct.b64?rev=real-logo-5',{cache:'no-store'});
      if(!response.ok) throw new Error('Logo asset could not be loaded.');
      const encoded = (await response.text()).replace(/\s+/g,'');
      if(!encoded.startsWith('UklG')) throw new Error('Unexpected logo data.');
      const source = `data:image/webp;base64,${encoded}`;
      await Promise.all(logos.map(image => new Promise((resolve,reject) => {
        image.onload = () => {
          image.classList.add('aw-logo-ready');
          image.parentElement?.querySelector('.aw-logo-fallback,.footer-logo-fallback')?.remove();
          resolve();
        };
        image.onerror = reject;
        image.src = source;
      })));
    } catch(error) {
      console.error(error);
      logos.forEach(image => { image.style.display='none'; installFallback(image); });
    }
  };
  loadBrandLogos();

  const concerns = {
    leaves:{title:'Leaf spots, browning, curling, or early leaf drop',text:'Water stress, root problems, insects, disease, heat, and seasonal change can create similar symptoms. The pattern across the whole canopy matters more than one damaged leaf.'},
    canopy:{title:'Dead branches or a thinning canopy',text:'Drought, root damage, disease, storm injury, structural problems, and long-term decline can all appear in the canopy. Arborwise looks at where the thinning begins and how quickly it changed.'},
    trunk:{title:'Cracks, cavities, loose bark, or mushrooms',text:'A visible defect does not automatically mean removal. Location, sound wood, species, nearby targets, movement, and the surrounding root zone all affect the recommendation.'},
    lean:{title:'A new lean, exposed roots, or moving soil',text:'A new lean or soil movement after wind or rain deserves prompt attention. Photograph the whole tree, the trunk base, and the ground on both sides of the lean.'}
  };
  const dialog=document.getElementById('concernDialog'),dialogTitle=document.getElementById('dialogTitle'),dialogText=document.getElementById('dialogText');
  let lastTrigger=null;
  document.querySelectorAll('.concern-card').forEach(card=>card.addEventListener('click',()=>{
    const concern=concerns[card.dataset.concern];
    if(!concern||!dialog||!dialogTitle||!dialogText)return;
    lastTrigger=card;dialogTitle.textContent=concern.title;dialogText.textContent=concern.text;dialog.showModal();
  }));
  document.querySelector('.dialog-close')?.addEventListener('click',()=>dialog?.close());
  dialog?.addEventListener('click',event=>{if(event.target===dialog)dialog.close();});
  dialog?.addEventListener('close',()=>lastTrigger?.focus());

  const tips=[
    'Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.',
    'Send one whole-tree photo, one close-up, and one photo of the trunk base.',
    'Roots usually extend well beyond the trunk. What happens to the soil can affect the entire tree.',
    'A proper pruning cut protects the branch collar. Flush cuts and long stubs both create avoidable problems.',
    'A cavity does not automatically mean a tree must come down. Location, sound wood, movement, species, and nearby targets all matter.',
    'New trees should not be buried like fence posts. The root flare should be visible at the finished grade.',
    'Mulch should protect the root zone, not pile against the trunk.'
  ];
  const tip=document.getElementById('annieTip'),tipButton=document.getElementById('annieButton');let tipIndex=0;
  tipButton?.addEventListener('click',()=>{tipIndex=(tipIndex+1)%tips.length;if(tip)tip.textContent=tips[tipIndex];});
  const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
})();