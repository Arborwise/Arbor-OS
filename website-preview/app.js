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
