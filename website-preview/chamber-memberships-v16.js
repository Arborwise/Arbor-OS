(() => {
  'use strict';

  const memberships = [
    {
      match: /farmersville/i,
      cardClass: 'chamber-membership-card--farmersville',
      name: 'Farmersville Chamber of Commerce',
      label: 'Proud Farmersville Chamber Member',
      linkLabel: "View Arborwise's Farmersville Chamber listing",
      link: 'https://cca.farmersvillechamber.com/arborwise-tree-care-_186_3_1_10008493_memberprofile2.aspx',
      logo: 'https://poolscouts.com/mckinney/wp-content/uploads/sites/16/2021/12/Farmersville-logo.jpeg',
      fallback: 'assets/farmersville-chamber.svg'
    },
    {
      match: /van\s*alstyne/i,
      cardClass: 'chamber-membership-card--van-alstyne',
      name: 'Van Alstyne Chamber of Commerce',
      label: 'Proud Van Alstyne Chamber Member',
      linkLabel: 'Open the Van Alstyne Chamber member directory',
      link: 'https://www.vanalstynechamber.org/directory',
      logo: 'https://lirp.cdn-website.com/d362b084/dms3rep/multi/opt/VA%2BChamber%2BLARGE%2BLOGO_transparent-500w.png',
      fallback: 'assets/van-alstyne-chamber.svg'
    }
  ];

  function installStyles() {
    if (document.getElementById('arborwise-chamber-memberships-v16')) return;
    const style = document.createElement('style');
    style.id = 'arborwise-chamber-memberships-v16';
    style.textContent = `
      .recognition-grid .chamber-membership-card{
        padding:0!important;
        overflow:hidden!important;
        min-height:214px!important;
        display:block!important;
      }
      .chamber-membership-link{
        width:100%;
        min-height:214px;
        padding:22px 24px;
        display:grid;
        grid-template-columns:minmax(148px,45%) minmax(0,1fr);
        align-items:center;
        gap:22px;
        color:inherit;
        text-decoration:none;
        background:#fff;
        border:2px solid transparent;
        transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease;
      }
      .chamber-membership-link:hover,
      .chamber-membership-link:focus-visible{
        transform:translateY(-3px);
        box-shadow:0 16px 34px rgba(4,37,28,.16);
        border-color:#c9972f;
        outline:none;
      }
      .chamber-membership-logo-wrap{
        min-height:146px;
        display:flex;
        align-items:center;
        justify-content:center;
        padding:8px;
        background:#fff;
        border-radius:14px;
      }
      .chamber-membership-link img{
        display:block!important;
        width:100%!important;
        max-width:310px!important;
        height:146px!important;
        object-fit:contain!important;
        margin:0!important;
        filter:none!important;
      }
      .chamber-membership-card--farmersville .chamber-membership-link img{
        max-width:330px!important;
        height:124px!important;
      }
      .chamber-membership-card--van-alstyne .chamber-membership-link img{
        max-width:230px!important;
        height:164px!important;
      }
      .chamber-membership-copy{
        display:grid;
        gap:7px;
        text-align:left;
      }
      .chamber-membership-copy small{
        color:#7b5b18;
        font-size:.72rem;
        font-weight:900;
        letter-spacing:.09em;
        text-transform:uppercase;
      }
      .chamber-membership-copy strong{
        color:#0b3f2f!important;
        font-size:1.08rem!important;
        line-height:1.18;
      }
      .chamber-membership-copy span{
        color:#3e554d!important;
        font-size:.85rem!important;
        line-height:1.35;
      }
      .chamber-membership-copy b{
        color:#0b3f2f;
        font-size:.78rem;
        text-decoration:underline;
        text-underline-offset:3px;
      }
      @media (max-width:720px){
        .chamber-membership-link{
          grid-template-columns:1fr;
          gap:10px;
          padding:18px 16px 20px;
          text-align:center;
        }
        .chamber-membership-logo-wrap{min-height:126px}
        .chamber-membership-card--van-alstyne .chamber-membership-link img{height:146px!important}
        .chamber-membership-copy{text-align:center}
      }
    `;
    document.head.appendChild(style);
  }

  function installMemberships() {
    installStyles();
    const cards = [...document.querySelectorAll('.recognition-grid article')];

    memberships.forEach(membership => {
      const card = cards.find(candidate =>
        membership.match.test(candidate.textContent || '') ||
        membership.match.test(candidate.querySelector('img')?.alt || '')
      );
      if (!card) return;

      card.classList.add('chamber-membership-card', membership.cardClass);
      card.innerHTML = '';

      const link = document.createElement('a');
      link.className = 'chamber-membership-link';
      link.href = membership.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${membership.name}. ${membership.linkLabel}.`);
      link.innerHTML = `
        <span class="chamber-membership-logo-wrap">
          <img src="${membership.logo}" alt="${membership.name} official logo" referrerpolicy="no-referrer">
        </span>
        <span class="chamber-membership-copy">
          <small>${membership.label}</small>
          <strong>${membership.name}</strong>
          <span>Local membership and community accountability.</span>
          <b>${membership.linkLabel}</b>
        </span>`;

      const image = link.querySelector('img');
      image?.addEventListener('error', () => {
        if (image.dataset.fallbackApplied === 'true') return;
        image.dataset.fallbackApplied = 'true';
        image.src = membership.fallback;
      });

      card.appendChild(link);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installMemberships, { once: true });
  } else {
    installMemberships();
  }
})();
