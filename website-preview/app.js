const localRecognition = [
  { mark: 'F', title: 'Farmersville Chamber of Commerce', detail: 'Member', kind: 'chamber' },
  { mark: 'VA', title: 'Van Alstyne Chamber of Commerce', detail: 'Member', kind: 'chamber' },
  { mark: 'N', title: 'Nextdoor Neighborhood Favorite', detail: '2024', kind: 'nextdoor' },
  { mark: 'N', title: 'Nextdoor Neighborhood Favorite', detail: '2025', kind: 'nextdoor' }
];

(function addLocalRecognition() {
  if (!document.querySelector('.local-trust')) {
    const answerStrip = document.querySelector('.answer-strip');
    const section = document.createElement('section');
    section.className = 'local-trust';
    section.setAttribute('aria-labelledby', 'local-trust-title');
    section.innerHTML = `
      <div class="local-trust-intro">
        <p class="eyebrow">Trusted in the communities we serve</p>
        <h2 id="local-trust-title">Local membership. Neighbor recognition. Real accountability.</h2>
      </div>
      <div class="recognition-grid" aria-label="Arborwise community memberships and awards">
        ${localRecognition.map(item => `
          <article class="recognition-card ${item.kind}-card">
            <span class="recognition-mark" aria-hidden="true">${item.mark}</span>
            <div><strong>${item.title}</strong><span>${item.detail}</span></div>
          </article>
        `).join('')}
      </div>`;
    answerStrip.insertAdjacentElement('afterend', section);
  }

  if (!document.getElementById('local-recognition-styles')) {
    const style = document.createElement('style');
    style.id = 'local-recognition-styles';
    style.textContent = `
      .local-trust{max-width:1376px;margin:0 auto;padding:34px 32px 10px;display:grid;grid-template-columns:.78fr 1.22fr;gap:34px;align-items:center}
      .local-trust-intro h2{font-size:clamp(1.85rem,3.2vw,3rem);margin-bottom:0}
      .recognition-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
      .recognition-card{min-height:104px;background:var(--paper);border:1px solid var(--line);border-radius:22px;padding:16px 18px;display:grid;grid-template-columns:56px 1fr;gap:14px;align-items:center;box-shadow:0 8px 24px rgba(18,63,47,.05)}
      .recognition-card strong{display:block;line-height:1.22;color:var(--forest)}
      .recognition-card div>span{display:block;margin-top:4px;color:var(--muted);font-size:.82rem;font-weight:850;text-transform:uppercase;letter-spacing:.1em}
      .recognition-mark{width:56px;height:56px;border-radius:17px;display:grid;place-items:center;background:#e8f1df;color:var(--forest);font-weight:950;font-size:1rem;border:1px solid #cfddc7}
      .nextdoor-card .recognition-mark{background:#fff1cf;border-color:#ead59d;color:#6b4b0c}
      @media (max-width:720px){
        .local-trust{padding:46px 14px 8px;grid-template-columns:1fr;gap:20px}
        .local-trust-intro h2{font-size:2.15rem}
        .recognition-grid{grid-template-columns:1fr}
        .recognition-card{min-height:92px}
      }`;
    document.head.appendChild(style);
  }

  const structuredData = document.querySelector('script[type="application/ld+json"]');
  if (structuredData) {
    try {
      const data = JSON.parse(structuredData.textContent);
      const business = data['@graph']?.find(item => item['@id'] === 'https://arborwisetreecare.com/#business');
      if (business) {
        business.memberOf = [
          {'@type': 'Organization', name: 'Farmersville Chamber of Commerce'},
          {'@type': 'Organization', name: 'Van Alstyne Chamber of Commerce'}
        ];
        business.award = [
          'Nextdoor Neighborhood Favorite 2024',
          'Nextdoor Neighborhood Favorite 2025'
        ];
        structuredData.textContent = JSON.stringify(data);
      }
    } catch (error) {
      console.warn('Could not update local recognition structured data.', error);
    }
  }
})();

const concernData = {
  leaves: {
    eyebrow: 'Leaves and seasonal symptoms',
    title: 'Leaf spots, browning, curling, or early leaf drop',
    intro: 'Leaves can show stress before the cause is obvious. The pattern across the canopy, recent weather, watering, roots, and tree species all help narrow the possibilities.',
    could: ['Heat or drought stress', 'Too much or too little water', 'Root injury or compacted soil', 'Insects or disease', 'Normal seasonal change'],
    urgent: ['A large part of the canopy wilts suddenly', 'Browning advances quickly in a few days', 'The trunk or roots also show damage', 'The tree recently experienced construction or trenching'],
    annie: 'Do not diagnose a whole tree from one leaf. Photograph the canopy pattern, the leaf, and the trunk base.'
  },
  canopy: {
    eyebrow: 'Branches and canopy',
    title: 'Dead branches or a thinning canopy',
    intro: 'A thin canopy can reflect drought, root stress, disease, age, storm injury, poor structure, or a combination of problems. Large dead limbs also create a separate risk even before the underlying cause is known.',
    could: ['Drought or chronic water stress', 'Root loss or soil disturbance', 'Canker or vascular problems', 'Storm damage or weak attachments', 'Long-term decline'],
    urgent: ['Large dead limbs hang over a roof, road, or play area', 'A branch has split or is suspended', 'Cracks appear where major limbs join', 'The canopy changed suddenly after wind or construction'],
    annie: 'Deadwood over a target is a safety question first and a tree-health question second.'
  },
  trunk: {
    eyebrow: 'Trunk and decay signs',
    title: 'Cracks, cavities, loose bark, or mushrooms',
    intro: 'These signs may reflect an old wound, active decay, included bark, root or trunk injury, or a defect that needs to be evaluated in context. A cavity alone does not automatically decide the tree’s future.',
    could: ['An old wound that has compartmentalized', 'Internal decay or fungal activity', 'A weak branch or trunk union', 'Impact, mower, or construction damage', 'Root or lower-trunk decay'],
    urgent: ['A crack is widening or moving', 'The trunk is splitting into two sections', 'Fresh mushrooms or conks appear at the base', 'The defect faces a house, driveway, road, or occupied area'],
    annie: 'No concrete in cavities, no random wound paint, and no guessing from one close-up.'
  },
  lean: {
    eyebrow: 'Roots, soil, and stability',
    title: 'A new lean, exposed roots, or soil moving at the base',
    intro: 'Some trees naturally lean. A new lean or active root-plate movement is different. Soil heaving, cracked ground, broken roots, saturated soil, or recent trenching can change the urgency quickly.',
    could: ['Root-plate movement', 'Storm or saturated-soil instability', 'Poor planting or establishment', 'Root cutting or construction injury', 'Erosion or grade changes'],
    urgent: ['The lean is new or increasing', 'Soil is lifting on one side', 'Roots are broken or pulling from the ground', 'The tree moved after a storm or heavy rain'],
    annie: 'Keep people and vehicles out of the fall zone while the tree is being evaluated.'
  }
};

const dialog = document.getElementById('concernDialog');
const title = document.getElementById('dialogTitle');
const eyebrow = document.getElementById('dialogEyebrow');
const intro = document.getElementById('dialogIntro');
const could = document.getElementById('dialogCould');
const urgent = document.getElementById('dialogUrgent');
const annie = document.getElementById('dialogAnnie');

document.querySelectorAll('.concern-card').forEach(card => {
  card.addEventListener('click', () => {
    const data = concernData[card.dataset.concern];
    eyebrow.textContent = data.eyebrow;
    title.textContent = data.title;
    intro.textContent = data.intro;
    could.innerHTML = data.could.map(item => `<li>${item}</li>`).join('');
    urgent.innerHTML = data.urgent.map(item => `<li>${item}</li>`).join('');
    annie.textContent = data.annie;
    dialog.showModal();
  });
});

document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  const outside = event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  if (outside) dialog.close();
});
document.getElementById('dialogEstimate').addEventListener('click', () => dialog.close());

const climberGame = document.getElementById('climberGame');
const findClimber = climberGame.querySelector('.find-climber');
findClimber.addEventListener('click', () => {
  const revealed = climberGame.classList.toggle('revealed');
  findClimber.setAttribute('aria-expanded', String(revealed));
  findClimber.textContent = revealed ? 'Found them. Hide answer' : 'Can you find the climber?';
});

const annieTips = [
  '“A cavity does not automatically mean a tree has to come down. Location, sound wood, species, movement, and what is nearby all matter.”',
  '“Photograph the whole tree, the concern, and the trunk base. Three useful photos beat twelve mystery close-ups.”',
  '“Topping is not pruning. Big random cuts create weak growth, decay, and future problems.”',
  '“A clean job site is part of the tree work, not an optional final favor.”',
  '“The biggest job is not always the right job. Good advice can include waiting and watching.”'
];
let tipIndex = 0;
document.getElementById('annieButton').addEventListener('click', () => {
  tipIndex = (tipIndex + 1) % annieTips.length;
  const quote = document.getElementById('annieQuote');
  quote.animate([{opacity:.15, transform:'translateY(5px)'},{opacity:1, transform:'translateY(0)'}], {duration:260});
  quote.textContent = annieTips[tipIndex];
});

document.getElementById('year').textContent = new Date().getFullYear();

const badgeUpgrade = document.createElement('script');
badgeUpgrade.src = 'badge-upgrade.js';
badgeUpgrade.defer = true;
document.body.appendChild(badgeUpgrade);
