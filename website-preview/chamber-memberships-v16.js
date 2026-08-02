(() => {
  'use strict';

  const FACEBOOK_URL = 'https://facebook.com/Arborwise';

  function installStyles() {
    document.getElementById('arborwise-local-proof-v18')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-local-proof-v18';
    style.textContent = `
      .trust-band.aw-proof,
      .trust-band{
        display:none!important;
      }
      .aw-facebook-top{
        display:flex;
        width:max-content;
        max-width:calc(100% - 24px);
        margin:10px auto 12px;
        padding:10px 16px;
        align-items:center;
        justify-content:center;
        gap:9px;
        border:1px solid rgba(255,255,255,.28);
        border-radius:999px;
        background:#1877f2;
        color:#fff!important;
        box-shadow:0 8px 22px rgba(0,0,0,.24);
        font-size:.82rem;
        font-weight:900;
        line-height:1.1;
        text-decoration:none!important;
        letter-spacing:.01em;
      }
      .aw-facebook-top:hover,
      .aw-facebook-top:focus-visible{
        transform:translateY(-1px);
        box-shadow:0 12px 28px rgba(0,0,0,.3);
        outline:3px solid #d9f378;
        outline-offset:3px;
      }
      .aw-facebook-top__icon{
        display:grid;
        place-items:center;
        width:25px;
        height:25px;
        border-radius:50%;
        background:#fff;
        color:#1877f2;
        font:900 1.05rem/1 Arial,sans-serif;
      }
      .recognition-grid.aw-recognition-v18{
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        width:100%!important;
        max-width:980px!important;
        margin:28px auto 0!important;
        padding:0!important;
      }
      .recognition-grid.aw-recognition-v18 .aw-proof-card{
        min-width:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        overflow:hidden!important;
        border:2px solid #d2ad55!important;
        border-radius:24px!important;
        background:linear-gradient(145deg,#fffdf7,#eef5e9)!important;
        box-shadow:0 14px 30px rgba(12,54,39,.12)!important;
        color:#0b3f2f!important;
      }
      .aw-proof-card__link,
      .aw-proof-card__body{
        box-sizing:border-box!important;
        display:grid!important;
        grid-template-columns:132px minmax(0,1fr)!important;
        gap:18px!important;
        width:100%!important;
        min-width:0!important;
        min-height:190px!important;
        padding:22px!important;
        align-items:center!important;
        color:inherit!important;
        text-decoration:none!important;
        background:transparent!important;
      }
      .aw-proof-card__link:hover,
      .aw-proof-card__link:focus-visible{
        background:#fffaf0!important;
        outline:4px solid #d9f378!important;
        outline-offset:-4px!important;
      }
      .aw-proof-card__visual{
        display:flex!important;
        min-width:0!important;
        min-height:132px!important;
        align-items:center!important;
        justify-content:center!important;
        padding:10px!important;
        overflow:hidden!important;
        border:1px solid rgba(15,68,50,.18)!important;
        border-radius:20px!important;
        background:#fffdf8!important;
      }
      .aw-proof-card__visual img{
        display:block!important;
        width:100%!important;
        max-width:124px!important;
        height:112px!important;
        margin:0!important;
        object-fit:contain!important;
        filter:none!important;
      }
      .aw-proof-card--farmersville .aw-proof-card__visual img{
        max-width:128px!important;
        height:104px!important;
      }
      .aw-proof-card--van-alstyne .aw-proof-card__visual img{
        max-width:122px!important;
        height:114px!important;
      }
      .aw-proof-card__copy{
        display:grid!important;
        min-width:0!important;
        gap:7px!important;
        text-align:left!important;
      }
      .aw-proof-card__eyebrow{
        display:inline-flex!important;
        width:max-content!important;
        max-width:100%!important;
        padding:7px 11px!important;
        border-radius:999px!important;
        background:#efd06f!important;
        color:#17291f!important;
        font-size:.68rem!important;
        font-weight:950!important;
        line-height:1!important;
        letter-spacing:.1em!important;
        text-transform:uppercase!important;
      }
      .aw-proof-card__copy strong{
        min-width:0!important;
        color:#0b3f2f!important;
        font:900 clamp(1.12rem,2.6vw,1.55rem)/1.08 Georgia,serif!important;
        overflow-wrap:anywhere!important;
      }
      .aw-proof-card__copy span{
        min-width:0!important;
        color:#304b40!important;
        font-size:.88rem!important;
        font-weight:700!important;
        line-height:1.4!important;
        overflow-wrap:anywhere!important;
      }
      .aw-proof-card__copy b{
        min-width:0!important;
        color:#0b3f2f!important;
        font-size:.78rem!important;
        font-weight:950!important;
        line-height:1.35!important;
        text-decoration:underline!important;
        text-decoration-thickness:2px!important;
        text-underline-offset:4px!important;
        overflow-wrap:anywhere!important;
      }
      .aw-nextdoor-pair{
        display:flex!important;
        width:100%!important;
        align-items:center!important;
        justify-content:center!important;
        gap:8px!important;
      }
      .aw-nextdoor-pair img{
        width:58px!important;
        max-width:58px!important;
        height:58px!important;
        flex:0 0 58px!important;
      }
      .aw-isa-mark{
        display:grid!important;
        place-items:center!important;
        width:104px!important;
        height:104px!important;
        border:8px solid #d2ad55!important;
        border-radius:50%!important;
        background:#0b3f2f!important;
        color:#fff!important;
        font:900 1.7rem/1 Arial,sans-serif!important;
        letter-spacing:.04em!important;
        box-shadow:0 0 0 8px rgba(11,63,47,.1)!important;
      }
      @media(max-width:760px){
        .aw-facebook-top{
          margin-top:8px;
          font-size:.78rem;
        }
        .recognition-grid.aw-recognition-v18{
          grid-template-columns:minmax(0,1fr)!important;
          gap:14px!important;
          margin-top:22px!important;
        }
        .recognition-grid.aw-recognition-v18 .aw-proof-card{
          border-radius:20px!important;
        }
        .aw-proof-card__link,
        .aw-proof-card__body{
          grid-template-columns:102px minmax(0,1fr)!important;
          gap:14px!important;
          min-height:150px!important;
          padding:16px!important;
        }
        .aw-proof-card__visual{
          min-height:104px!important;
          padding:7px!important;
          border-radius:16px!important;
        }
        .aw-proof-card__visual img{
          max-width:94px!important;
          height:86px!important;
        }
        .aw-proof-card--farmersville .aw-proof-card__visual img{
          max-width:96px!important;
          height:82px!important;
        }
        .aw-proof-card--van-alstyne .aw-proof-card__visual img{
          max-width:92px!important;
          height:88px!important;
        }
        .aw-proof-card__copy{
          gap:5px!important;
        }
        .aw-proof-card__eyebrow{
          padding:6px 9px!important;
          font-size:.6rem!important;
          letter-spacing:.08em!important;
        }
        .aw-proof-card__copy strong{
          font-size:clamp(1rem,5.2vw,1.25rem)!important;
          line-height:1.06!important;
        }
        .aw-proof-card__copy span{
          font-size:.78rem!important;
          line-height:1.32!important;
        }
        .aw-proof-card__copy b{
          font-size:.72rem!important;
          line-height:1.25!important;
        }
        .aw-nextdoor-pair{
          gap:5px!important;
        }
        .aw-nextdoor-pair img{
          width:43px!important;
          max-width:43px!important;
          height:43px!important;
          flex-basis:43px!important;
        }
        .aw-isa-mark{
          width:78px!important;
          height:78px!important;
          border-width:6px!important;
          font-size:1.25rem!important;
          box-shadow:0 0 0 5px rgba(11,63,47,.1)!important;
        }
      }
      @media(max-width:390px){
        .aw-proof-card__link,
        .aw-proof-card__body{
          grid-template-columns:88px minmax(0,1fr)!important;
          gap:11px!important;
          padding:14px 12px!important;
        }
        .aw-proof-card__visual{
          min-height:92px!important;
        }
        .aw-proof-card__copy strong{
          font-size:1rem!important;
        }
        .aw-proof-card__copy span{
          font-size:.74rem!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function installFacebookLink() {
    if (document.querySelector('.aw-facebook-top')) return;
    const header = document.querySelector('.aw-head') || document.querySelector('.site-header');
    if (!header) return;
    const link = document.createElement('a');
    link.className = 'aw-facebook-top';
    link.href = FACEBOOK_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Find Arborwise Tree Care on Facebook');
    link.innerHTML = '<span class="aw-facebook-top__icon" aria-hidden="true">f</span><span>Find Arborwise on Facebook</span>';
    const nav = header.querySelector('.aw-nav,.main-nav');
    if (nav) nav.insertAdjacentElement('afterend', link);
    else header.appendChild(link);
  }

  function applyImageFallback(image, fallback) {
    image?.addEventListener('error', () => {
      if (image.dataset.fallbackApplied === 'true') return;
      image.dataset.fallbackApplied = 'true';
      image.src = fallback;
    });
  }

  function installUnifiedProof() {
    document.querySelector('.trust-band')?.remove();
    const grid = document.querySelector('.recognition-grid');
    if (!grid) return;

    grid.className = 'recognition-grid aw-recognition-v18';
    grid.setAttribute('aria-label', 'Arborwise memberships, awards, and professional credentials');
    grid.innerHTML = `
      <article class="aw-proof-card aw-proof-card--farmersville">
        <a class="aw-proof-card__link" href="https://cca.farmersvillechamber.com/arborwise-tree-care-_186_3_1_10008493_memberprofile2.aspx" target="_blank" rel="noopener noreferrer" aria-label="Open Arborwise's Farmersville Chamber of Commerce member listing">
          <span class="aw-proof-card__visual">
            <img data-chamber-logo="farmersville" src="https://poolscouts.com/mckinney/wp-content/uploads/sites/16/2021/12/Farmersville-logo.jpeg" alt="Farmersville Chamber of Commerce logo" referrerpolicy="no-referrer">
          </span>
          <span class="aw-proof-card__copy">
            <small class="aw-proof-card__eyebrow">Local member</small>
            <strong>Farmersville Chamber of Commerce</strong>
            <span>Serving the community where Mac lives and Arborwise is rooted.</span>
            <b>View Arborwise's member listing</b>
          </span>
        </a>
      </article>
      <article class="aw-proof-card aw-proof-card--van-alstyne">
        <a class="aw-proof-card__link" href="https://www.vanalstynechamber.org/directory" target="_blank" rel="noopener noreferrer" aria-label="Open the Van Alstyne Chamber of Commerce member directory">
          <span class="aw-proof-card__visual">
            <img data-chamber-logo="van-alstyne" src="https://lirp.cdn-website.com/d362b084/dms3rep/multi/opt/VA%2BChamber%2BLARGE%2BLOGO_transparent-500w.png" alt="Van Alstyne Chamber of Commerce logo" referrerpolicy="no-referrer">
          </span>
          <span class="aw-proof-card__copy">
            <small class="aw-proof-card__eyebrow">Local member</small>
            <strong>Van Alstyne Chamber of Commerce</strong>
            <span>Local membership and accountability in the community Brandon calls home.</span>
            <b>Open the Chamber member directory</b>
          </span>
        </a>
      </article>
      <article class="aw-proof-card aw-proof-card--nextdoor">
        <div class="aw-proof-card__body">
          <span class="aw-proof-card__visual">
            <span class="aw-nextdoor-pair" aria-hidden="true">
              <img src="assets/nextdoor-favorite-2024.svg" alt="">
              <img src="assets/nextdoor-favorite-2025.svg" alt="">
            </span>
          </span>
          <span class="aw-proof-card__copy">
            <small class="aw-proof-card__eyebrow">Neighbor voted</small>
            <strong>Nextdoor Neighborhood Fave</strong>
            <span>Chosen by North Texas neighbors in both 2024 and 2025.</span>
            <b>Two years running</b>
          </span>
        </div>
      </article>
      <article class="aw-proof-card aw-proof-card--isa">
        <div class="aw-proof-card__body">
          <span class="aw-proof-card__visual">
            <span class="aw-isa-mark" aria-hidden="true">ISA</span>
          </span>
          <span class="aw-proof-card__copy">
            <small class="aw-proof-card__eyebrow">Professional knowledge</small>
            <strong>ISA Certified Arborist on Staff</strong>
            <span>Training and reasoning behind every recommendation.</span>
            <b>Tree care explained in plain language</b>
          </span>
        </div>
      </article>`;

    applyImageFallback(grid.querySelector('[data-chamber-logo="farmersville"]'), 'assets/farmersville-chamber.svg');
    applyImageFallback(grid.querySelector('[data-chamber-logo="van-alstyne"]'), 'assets/van-alstyne-chamber.svg');
  }

  function install() {
    installStyles();
    installFacebookLink();
    installUnifiedProof();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
