(() => {
  'use strict';

  const STYLE_ID = 'arborwise-local-proof-v23';

  function installStyles() {
    document.getElementById('arborwise-local-proof-v22')?.remove();
    document.getElementById(STYLE_ID)?.remove();

    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      html body .site-header{
        position:relative!important;
        top:auto!important;
      }

      html body .trust-band,
      html body .trust-band.aw-proof{
        display:none!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23{
        display:grid!important;
        grid-template-columns:repeat(2,minmax(0,1fr))!important;
        gap:18px!important;
        width:100%!important;
        max-width:1040px!important;
        margin:30px auto 0!important;
        padding:0!important;
        perspective:none!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card,
      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(1),
      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(2),
      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(3),
      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(4){
        box-sizing:border-box!important;
        position:relative!important;
        display:block!important;
        grid-column:auto!important;
        order:initial!important;
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
        text-align:left!important;
        transform:none!important;
        animation:none!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card::before,
      html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card::after{
        display:none!important;
        content:none!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__link,
      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__body{
        box-sizing:border-box!important;
        display:grid!important;
        grid-template-columns:152px minmax(0,1fr)!important;
        gap:20px!important;
        width:100%!important;
        min-width:0!important;
        min-height:210px!important;
        margin:0!important;
        padding:24px!important;
        align-items:center!important;
        color:#0b3f2f!important;
        text-decoration:none!important;
        background:transparent!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__visual{
        box-sizing:border-box!important;
        position:relative!important;
        display:flex!important;
        width:100%!important;
        min-width:0!important;
        min-height:148px!important;
        margin:0!important;
        padding:12px!important;
        align-items:center!important;
        justify-content:center!important;
        overflow:hidden!important;
        border:1px solid rgba(15,68,50,.18)!important;
        border-radius:20px!important;
        background:#fff!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__visual img{
        position:static!important;
        display:block!important;
        width:100%!important;
        max-width:142px!important;
        height:126px!important;
        margin:0!important;
        padding:0!important;
        border:0!important;
        border-radius:0!important;
        object-fit:contain!important;
        filter:none!important;
        transform:none!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy{
        box-sizing:border-box!important;
        display:grid!important;
        width:100%!important;
        min-width:0!important;
        gap:8px!important;
        margin:0!important;
        padding:0!important;
        text-align:left!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__eyebrow{
        box-sizing:border-box!important;
        display:inline-flex!important;
        width:max-content!important;
        max-width:100%!important;
        margin:0!important;
        padding:7px 11px!important;
        border-radius:999px!important;
        background:#efd06f!important;
        color:#17291f!important;
        font:950 .68rem/1 Arial,sans-serif!important;
        letter-spacing:.1em!important;
        text-transform:uppercase!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy strong{
        position:static!important;
        display:block!important;
        width:100%!important;
        min-width:0!important;
        max-width:100%!important;
        margin:0!important;
        color:#0b3f2f!important;
        font:900 clamp(1.28rem,2.5vw,1.7rem)/1.08 Georgia,serif!important;
        letter-spacing:normal!important;
        overflow-wrap:break-word!important;
        text-shadow:none!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy > span{
        position:static!important;
        display:block!important;
        width:100%!important;
        min-width:0!important;
        max-width:100%!important;
        margin:0!important;
        color:#304b40!important;
        font:750 .92rem/1.42 Arial,sans-serif!important;
        letter-spacing:normal!important;
        overflow-wrap:break-word!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy b{
        box-sizing:border-box!important;
        position:static!important;
        display:flex!important;
        width:100%!important;
        max-width:310px!important;
        min-width:0!important;
        margin:2px 0 0!important;
        padding:9px 12px!important;
        align-items:center!important;
        justify-content:center!important;
        border-radius:999px!important;
        background:#0b3f2f!important;
        color:#fff!important;
        font:950 .72rem/1.2 Arial,sans-serif!important;
        letter-spacing:.04em!important;
        text-align:center!important;
        text-transform:uppercase!important;
        white-space:normal!important;
        overflow-wrap:anywhere!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-nextdoor-pair{
        display:flex!important;
        width:100%!important;
        align-items:center!important;
        justify-content:center!important;
        gap:10px!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-nextdoor-pair img{
        width:62px!important;
        max-width:62px!important;
        height:62px!important;
        flex:0 0 62px!important;
      }

      html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-isa-mark{
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
        html body .rooted-section .recognition-grid.aw-recognition-v23{
          grid-template-columns:minmax(0,1fr)!important;
          gap:15px!important;
          margin-top:22px!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card,
        html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(1),
        html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(2),
        html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(3),
        html body .rooted-section .recognition-grid.aw-recognition-v23 > article.aw-proof-card:nth-child(4){
          grid-column:1!important;
          min-height:0!important;
          padding:0!important;
          border-radius:22px!important;
          background:linear-gradient(145deg,#fffdf7,#eef5e9)!important;
          text-align:center!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__link,
        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__body{
          display:flex!important;
          min-height:0!important;
          padding:20px 18px 22px!important;
          flex-direction:column!important;
          align-items:center!important;
          gap:13px!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__visual{
          width:min(100%,250px)!important;
          min-height:132px!important;
          padding:10px!important;
          border-radius:18px!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__visual img{
          max-width:190px!important;
          height:116px!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy{
          width:100%!important;
          gap:8px!important;
          text-align:center!important;
          justify-items:center!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy strong{
          font-size:clamp(1.35rem,7vw,1.8rem)!important;
          line-height:1.08!important;
          text-align:center!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy > span{
          max-width:31ch!important;
          font-size:.9rem!important;
          line-height:1.38!important;
          text-align:center!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-proof-card__copy b{
          width:100%!important;
          max-width:300px!important;
          margin-inline:auto!important;
          font-size:.7rem!important;
        }

        html body .rooted-section .recognition-grid.aw-recognition-v23 .aw-nextdoor-pair img{
          width:70px!important;
          max-width:70px!important;
          height:70px!important;
          flex-basis:70px!important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function installCards() {
    document.querySelector('.trust-band')?.remove();
    const grid = document.querySelector('.recognition-grid');
    if (!grid) return;

    grid.className = 'recognition-grid aw-recognition-v23';
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
        <a class="aw-proof-card__link" href="https://cca.farmersvillechamber.com/arborwise-tree-care-_186_3_1_10008493_memberprofile2.aspx" target="_blank" rel="noopener noreferrer">
          <span class="aw-proof-card__visual">
            <img src="assets/farmersville-chamber.svg" alt="Farmersville Chamber of Commerce">
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
        <a class="aw-proof-card__link" href="https://www.vanalstynechamber.org/directory" target="_blank" rel="noopener noreferrer">
          <span class="aw-proof-card__visual">
            <img src="assets/van-alstyne-chamber.svg" alt="Van Alstyne Chamber of Commerce">
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
  }

  function install() {
    installStyles();
    installCards();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
