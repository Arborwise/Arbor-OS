(() => {
  'use strict';

  const memberships = [
    {
      match: /farmersville/i,
      cardClass: 'chamber-membership-card--farmersville',
      name: 'Farmersville Chamber of Commerce',
      label: 'Proud Farmersville Chamber Member',
      link: 'https://cca.farmersvillechamber.com/arborwise-tree-care-_186_3_1_10008493_memberprofile2.aspx',
      logo: 'https://poolscouts.com/mckinney/wp-content/uploads/sites/16/2021/12/Farmersville-logo.jpeg'
    },
    {
      match: /van\s*alstyne/i,
      cardClass: 'chamber-membership-card--van-alstyne',
      name: 'Van Alstyne Chamber of Commerce',
      label: 'Proud Van Alstyne Chamber Member',
      link: 'https://www.vanalstynechamber.org/directory',
      logo: 'https://lirp.cdn-website.com/d362b084/dms3rep/multi/opt/VA%2BChamber%2BLARGE%2BLOGO_transparent-500w.png'
    }
  ];

  const installStyles = () => {
    if (document.getElementById('arborwise-chamber-memberships-v14')) return;
    const style = document.createElement('style');
    style.id = 'arborwise-chamber-memberships-v14';
    style.textContent = `
      .recognition-grid .chamber-membership-card{
        padding:0!important;
        overflow:hidden!important;
        min-height:210px!important;
        display:block!important;
      }
      .chamber-membership-link{
        width:100%;
        min-height:210px;
        padding:22px 24px;
        display:grid;
        grid-template-columns:minmax(138px,44%) minmax(0,1fr);
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
        min-height:142px;
        display:flex;
        align-items:center;
        justify-content:center;
        background:#fff;
        border-radius:14px;
      }
      .chamber-membership-link img{
        display:block!important;
        width:100%!important;
        max-width:290px!important;
        height:142px!important;
        object-fit:contain!important;
        margin:0!important;
        filter:none!important;
      }
      .chamber-membership-card--farmersville .chamber-membership-link img{
        max-width:320px!important;
        height:118px!important;
      }
      .chamber-membership-card--van-alstyne .chamber-membership-link img{
        max-width:215px!important;
        height:158px!important;
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
        .chamber-membership-logo-wrap{min-height:122px}
        .chamber-membership-card--van-alstyne .chamber-membership-link img{height:142px!important}
        .chamber-membership-copy{text-align:center}
      }
    `;
    document.head.appendChild(style);
  };

  const installMemberships = () => {
    installStyles();
    const cards = [...document.querySelectorAll('.recognition-grid article')];

    memberships.forEach(membership => {
      const card = cards.find(candidate => membership.match.test(candidate.textContent || '') || membership.match.test(candidate.querySelector('img')?.alt || ''));
      if (!card) return;

      card.classList.add('chamber-membership-card', membership.cardClass);
      card.innerHTML = '';

      const link = document.createElement('a');
      link.className = 'chamber-membership-link';
      link.href = membership.link;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.setAttribute('aria-label', `${membership.name}. Open Arborwise's Chamber listing.`);
      link.innerHTML = `
        <span class="chamber-membership-logo-wrap">
          <img src="${membership.logo}" alt="${membership.name} official logo">
        </span>
        <span class="chamber-membership-copy">
          <small>${membership.label}</small>
          <strong>${membership.name}</strong>
          <span>Local membership and community accountability.</span>
          <b>View Arborwise's Chamber listing</b>
        </span>`;

      const image = link.querySelector('img');
      image?.addEventListener('error', () => {
        const fallback = membership.match.test('Farmersville')
          ? 'assets/farmersville-chamber.svg'
          : 'assets/van-alstyne-chamber.svg';
        if (image.src.endsWith(fallback)) return;
        image.src = fallback;
      }, { once: true });

      card.appendChild(link);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', installMemberships, { once: true });
  } else {
    installMemberships();
  }
})();
