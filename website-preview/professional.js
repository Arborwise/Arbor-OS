(() => {
  const loadBrandAssets = async () => {
    try {
      const load = async path => {
        const response = await fetch(path, { cache: 'no-store' });
        if (!response.ok) throw new Error(`Could not load ${path}`);
        return (await response.text()).trim();
      };
      const [logo, annie] = await Promise.all([
        load('assets/logo-correct.b64'),
        load('assets/annie-correct.b64')
      ]);
      document.querySelectorAll('[data-brand-logo]').forEach(img => {
        img.src = `data:image/webp;base64,${logo}`;
      });
      document.querySelectorAll('[data-annie]').forEach(img => {
        img.src = `data:image/webp;base64,${annie}`;
      });
    } catch (error) {
      console.error('Could not load Arborwise brand assets.', error);
    }
  };

  loadBrandAssets();

  const concerns = {
    leaves: {
      title: 'Leaf spots, browning, curling, or early leaf drop',
      text: 'Water stress, root problems, insects, disease, heat, and seasonal change can create similar symptoms. The pattern across the whole canopy matters more than one damaged leaf.'
    },
    canopy: {
      title: 'Dead branches or a thinning canopy',
      text: 'Drought, root damage, disease, storm injury, structural problems, and long-term decline can all show up in the canopy. Arborwise looks at where the thinning begins and how quickly it changed.'
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
  const title = document.getElementById('dialogTitle');
  const text = document.getElementById('dialogText');
  let lastTrigger = null;

  document.querySelectorAll('.concern-card').forEach(card => {
    card.addEventListener('click', () => {
      const item = concerns[card.dataset.concern];
      if (!item || !dialog) return;
      lastTrigger = card;
      title.textContent = item.title;
      text.textContent = item.text;
      dialog.showModal();
    });
  });

  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });
  dialog?.addEventListener('close', () => lastTrigger?.focus());

  const tips = [
    'Roots usually extend well beyond the trunk and often beyond the drip line. What happens to the soil matters to the whole tree.',
    'A proper pruning cut protects the branch collar. Flush cuts and long stubs both create avoidable problems.',
    'A cavity does not automatically mean a tree must come down. Location, sound wood, movement, species, and nearby targets all matter.',
    'Photograph the entire tree before taking close-ups. The pattern across the canopy often tells more than one damaged spot.'
  ];
  let tipIndex = 0;
  const tip = document.getElementById('annieTip');
  document.getElementById('annieButton')?.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    if (tip) tip.textContent = tips[tipIndex];
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
