(() => {
  'use strict';

  const loadBase64Asset = async (selector, paths, fallback, mime = 'image/webp') => {
    const images = [...document.querySelectorAll(selector)];
    if (!images.length) return;

    try {
      const parts = await Promise.all(paths.map(async path => {
        const response = await fetch(path, { cache: 'force-cache' });
        if (!response.ok) throw new Error(`Unable to load ${path}`);
        return (await response.text()).replace(/\s+/g, '');
      }));

      const source = `data:${mime};base64,${parts.join('')}`;
      images.forEach(image => {
        image.onerror = () => {
          image.onerror = null;
          image.src = fallback;
        };
        image.src = source;
      });
    } catch (error) {
      images.forEach(image => {
        image.onerror = null;
        image.src = fallback;
      });
      console.error('Arborwise asset fallback used.', error);
    }
  };

  const whyLabel = document.querySelector('.intro-section .section-label');
  if (whyLabel) whyLabel.textContent = 'Why Arborwise?';

  const concerns = {
    leaves: {
      title: 'Leaf spots, browning, curling, or early leaf drop',
      text: 'Water stress, root problems, insects, disease, heat, and seasonal change can create similar symptoms. The pattern across the whole canopy matters more than one damaged leaf.'
    },
    canopy: {
      title: 'Dead branches or a thinning canopy',
      text: 'Drought, root damage, disease, storm injury, structural problems, and long-term decline can all appear in the canopy. Arborwise looks at where the thinning begins and how quickly it changed.'
    },
    trunk: {
      title: 'Cracks, cavities, loose bark, or mushrooms',
      text: 'A defect does not automatically mean removal. Location, sound wood, species, nearby targets, movement, and the surrounding root zone all affect the recommendation.'
    },
    lean: {
      title: 'A new lean, exposed roots, or moving soil',
      text: 'A new lean or soil movement after wind or rain deserves prompt attention. Photograph the whole tree, the trunk base, and the ground on both sides of the lean.'
    }
  };

  const dialog = document.getElementById('concernDialog');
  const dialogTitle = document.getElementById('dialogTitle');
  const dialogText = document.getElementById('dialogText');
  let lastTrigger = null;

  document.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => {
      const concern = concerns[card.dataset.concern];
      if (!concern || !dialog || !dialogTitle || !dialogText) return;
      lastTrigger = card;
      dialogTitle.textContent = concern.title;
      dialogText.textContent = concern.text;
      dialog.showModal();
    });
  });

  const closeDialog = () => {
    if (dialog?.open) dialog.close();
  };

  document.querySelector('.dialog-close')?.addEventListener('click', closeDialog);
  document.querySelector('[data-close-dialog]')?.addEventListener('click', closeDialog);
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) closeDialog();
  });
  dialog?.addEventListener('close', () => lastTrigger?.focus());

  const tips = [
    'Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.',
    'Send one photo of the whole tree, one close-up of the concern, and one photo of the trunk base.',
    'A sudden change matters more than a condition that has looked the same for years.',
    'Do not stand under a cracked limb to take a picture. Step back and use your camera zoom.',
    'Watering changes, construction, storms, soil disturbance, and recent pruning can all help explain what a tree is doing.'
  ];

  const tip = document.getElementById('annieTip');
  const tipButton = document.getElementById('annieButton');
  let tipIndex = 0;

  tipButton?.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    if (tip) tip.textContent = tips[tipIndex];
  });

  const year = document.getElementById('year');
  if (year) year.textContent = String(new Date().getFullYear());

  loadBase64Asset(
    '[data-brand-logo]',
    Array.from({ length: 8 }, (_, index) => `assets/logo-final-${String(index).padStart(2, '0')}.b64`),
    'assets/logo.webp',
    'image/webp'
  );

  // Annie is AVIF data. Using the correct MIME type prevents the broken-image icon on mobile.
  loadBase64Asset(
    '[data-annie]',
    ['assets/annie-correct.b64'],
    'assets/annie.webp',
    'image/avif'
  );

  loadBase64Asset(
    '[data-after-photo]',
    ['assets/anacapri-after.b64'],
    'assets/healthy-tree.webp',
    'image/webp'
  );
})();
