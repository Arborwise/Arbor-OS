(() => {
  'use strict';

  const FACEBOOK_URL = 'https://facebook.com/Arborwise';

  function installStyles() {
    document.getElementById('arborwise-local-proof-v22')?.remove();
    const style = document.createElement('style');
    style.id = 'arborwise-local-proof-v22';
    style.textContent = `
      .trust-band,
      .trust-band.aw-proof{display:none!important}

      .aw-facebook-top{
        display:flex!important;
        width:max-content!important;
        max-width:calc(100% - 24px)!important;
        margin:10px auto 14px!important;
        padding:10px 17px!important;
        align-items:center!important;
        justify-content:center!important;
        gap:9px!important;
        border:1px solid rgba(255,255,255,.28)!important;
        border-radius:999px!important;
        background:#1877f2!important;
        color:#fff!important;
        box-shadow:0 8px 22px rgba(0,0,0,.24)!important;
        font-size:.82rem!important;
        font-weight:900!important;
        line-height:1.1!important;
        text-decoration:none!important;
      }
      .aw-facebook-top__icon{
        display:grid!important;
        place-items:center!important;
        width:26px!important;
        height:26px!important;
        flex:0 0 26px!important;
        border-radius:50%!important;
        background:#fff!important;
        color:#1877f2!important;
        font:900 1.08rem/1 Arial,sans-serif!important;
      }
      .aw-facebook-top:hover,
      .aw-facebook-top:focus-visible{
        transform:translateY(-1px)!important;
        outline:3px solid #d9f378!important;
        outline-offset:3px!important;
      }

      .recognition-grid.aw-recognition-v22{
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        width:100%!important;
        max-width:1040px!important;
        margin:30px auto 0!important;
        padding:0!important;
      }
      .recognition-grid.aw-recognition-v22 .aw-proof-card{
        display:block!important;
        width:100%!important;
        min-width:0!important;
        min-height:0!important;
        margin:0!important;
        padding:0!important;
        overflow:hidden!important;
        border:2px solid #d4af58!important;
        border-radius:24px!important;
        background:linear-gradient(145deg,#fffdf7,#edf4e8)!important;
        box-shadow:0 14px 30px rgba(12,54,39,.12)!important;
        color:#0b3f2f!important;
      }
      .aw-proof-card__link,
      .aw-proof-card__body{
        box-sizing:border-box!important;
        display:grid!important;
        grid-template-columns:152px minmax(0,1fr)!important;
        gap:20px!important;
        width:100%!important;
        min-width:0!important;
        min-height:210px!important;
        padding:24px!important;
        align-items:center!important;
        color:#0b3f2f!important;
        text-decoration:none!important;
        background:transparent!important;
      }
      .aw-proof-card__link:hover,
      .aw-proof-card__link:focus-visible{
        background:#fff9e9!important;
        outline:4px solid #d9f378!important;
        outline-offset:-4px!important;
      }
      .aw-proof-card__visual{
        box-sizing:border-box!important;
        display:flex!important;
        width:100%!important;
        min-width:0!important;
        min-height:148px!important;
        align-items:center!important;
        justify-content:center!important;
        padding:12px!important;
        overflow:hidden!important;
        border:1px solid rgba(15,68,50,.18)!important;
        border-radius:20px!important;
        background:#fff!important;
      }
      .aw-proof-card__visual img{
        display:block!important;
        width:100%!important;
        max-width:142px!important;
        height:126px!important;
        margin:0!important;
        object-fit:contain!important;
        filter:none!important;
      }
      .aw-proof-card__copy{
        display:grid!important;
        width:100%!important;
        min-width:0!important;
        gap:8px!important;
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
      .aw-proof-card__copy strong,
      .aw-proof-card__copy span,
      .aw-proof-card__copy b{
        width:100%!important;
        min-width:0!important;
        max-width:100%!important;
        word-break:normal!important;
        overflow-wrap:normal!important;
        hyphens:none!important;
        white-space:normal!important;
      }
      .aw-proof-card__copy strong{
        color:#0b3f2f!important;
        font:900 clamp(1.28rem,2.5vw,1.7rem)/1.08 Georgia,serif!important;
      }
      .aw-proof-card__copy span{
        color:#304b40!important;
        font-size:.92rem!important;
        font-weight:750!important;
        line-height:1.42!important;
      }
      .aw-proof-card__copy b{
        display:inline-flex!important;
        width:max-content!important;
        max-width:100%!important;
        padding:8px 11px!important;
        border-radius:999px!important;
        background:#0b3f2f!important;
        color:#fff!important;
        font-size:.72rem!important;
        font-weight:950!important;
        line-height:1.15!important;
        text-decoration:none!important;
      }
      .aw-nextdoor-pair{
        display:flex!important;
        width:100%!important;
        align-items:center!important;
        justify-content:center!important;
        gap:10px!important;
      }
      .aw-nextdoor-pair img{
        width:62px!important;
        max-width:62px!important;
        height:62px!important;
        flex:0 0 62px!important;
      }
      .aw-isa-mark{
        display:grid!important;
        place-items:center!important;
        width:112px!important;
        height:112px!important;
        border:8px solid #d2ad55!important;
        border-radius:50%!important;
        background:#0b3f2f!important;
        color:#fff!important;
        font:900 1.8rem/1 Arial,sans-serif!important;
        letter-spacing:.04em!important;
        box-shadow:0 0 0 8px rgba(11,63,47,.1)!important;
      }

      @media(max-width:760px){
        .recognition-grid.aw-recognition-v22{
          grid-template-columns:minmax(0,1fr)!important;
          gap:15px!important;
          margin-top:22px!important;
        }
        .recognition-grid.aw-recognition-v22 .aw-proof-card{
          border-radius:22px!important;
          background:linear-gradient(145deg,#fffdf7,#eef5e9)!important;
        }
        .aw-proof-card__link,
        .aw-proof-card__body{
          display:flex!important;
          min-height:0!important;
          padding:20px 18px 22px!important;
          flex-direction:column!important;
          align-items:center!important;
          gap:13px!important;
        }
        .aw-proof-card__visual{
          width:min(100%,250px)!important;
          min-height:132px!important;
          padding:10px!important;
          border-radius:18px!important;
        }
        .aw-proof-card__visual img{
          max-width:180px!important;
          height:116px!important;
        }
        .aw-proof-card__copy{
          width:100%!important;
          gap:7px!important;
          text-align:center!important;
          justify-items:center!important;
        }
        .aw-proof-card__copy strong{
          font-size:clamp(1.35rem,7vw,1.8rem)!important;
          line-height:1.08!important;
        }
        .aw-proof-card__copy span{
          max-width:31ch!important;
          font-size:.9rem!important;
          line-height:1.38!important;
        }
        .aw-proof-card__copy b{
          justify-content:center!important;
          font-size:.72rem!important;
        }
        .aw-nextdoor-pair img{
          width:70px!important;
          max-width:70px!important;
          height:70px!important;
          flex-basis:70px!important;
        }
        .aw-isa-mark{
          width:104px!important;
          height:104px!important;
          font-size:1.65rem!important;
        }
      }

      @media(max-width:390px){
        .aw-proof-card__link,
        .aw-proof-card__body{padding:18px 14px 20px!important}
        .aw-proof-card__copy strong{font-size:1.32rem!important}
        .aw-proof-card__copy span{font-size:.84rem!important}
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

    grid.className = 'recognition-grid aw-recognition-v22';
    grid.setAttribute('aria-label', 'Arborwise memberships, awards, and professional credentials');
    grid.innerHTML = `
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
            <span>Chosen by North Texas neighbors in 2024 and 2025.</span>
            <b>Two years running</b>
          </span>
        </div>
      </article>

      <article class="aw-proof-card aw-proof-card--farmersville">
        <a class="aw-proof-card__link" href="https://cca.farmersvillechamber.com/arborwise-tree-care-_186_3_1_10008493_memberprofile2.aspx" target="_blank" rel="noopener noreferrer" aria-label="Open Arborwise's Farmersville Chamber of Commerce member listing">
          <span class="aw-proof-card__visual">
            <img data-chamber-logo="farmersville" src="https://poolscouts.com/mckinney/wp-content/uploads/sites/16/2021/12/Farmersville-logo.jpeg" alt="Farmersville Chamber of Commerce logo" referrerpolicy="no-referrer">
          </span>
          <span class="aw-proof-card__copy">
            <small class="aw-proof-card__eyebrow">Local member</small>
            <strong>Farmersville Chamber of Commerce</strong>
            <span>Serving the community where Greg lives and Arborwise is rooted.</span>
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
            <span>Proud member serving the community Brandon calls home.</span>
            <b>Open the Chamber directory</b>
          </span>
        </a>
      </article>

      <article class="aw-proof-card aw-proof-card--isa">
        <div class="aw-proof-card__body">
          <span class="aw-proof-card__visual"><span class="aw-isa-mark" aria-hidden="true">ISA</span></span>
          <span class="aw-proof-card__copy">
            <small class="aw-proof-card__eyebrow">Professional knowledge</small>
            <strong>ISA Certified Arborist on Staff</strong>
            <span>Training and reasoning behind every recommendation.</span>
            <b>Tree care explained clearly</b>
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

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();
