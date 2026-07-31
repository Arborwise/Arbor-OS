(() => {
  const assetJobs = [
    {
      selector: '[data-brand-logo]',
      encodedPath: 'assets/logo-correct.b64',
      fallbackPath: 'assets/logo.webp',
      mimeType: 'image/webp'
    },
    {
      selector: '[data-annie]',
      encodedPath: 'assets/annie-correct.b64',
      fallbackPath: 'assets/annie.webp',
      mimeType: 'image/webp'
    }
  ];

  const loadEncodedAsset = async ({ selector, encodedPath, fallbackPath, mimeType }) => {
    const images = [...document.querySelectorAll(selector)];
    if (!images.length) return;

    images.forEach(image => {
      image.removeAttribute('src');
      image.style.visibility = 'hidden';
    });

    try {
      const response = await fetch(encodedPath, { cache: 'no-store' });
      if (!response.ok) throw new Error(`Could not load ${encodedPath}`);
      const encoded = (await response.text()).replace(/\s+/g, '');
      const source = `data:${mimeType};base64,${encoded}`;

      images.forEach(image => {
        image.onload = () => {
          image.style.visibility = 'visible';
        };
        image.onerror = () => {
          image.removeAttribute('src');
          image.style.display = 'none';
        };
        image.src = source;
      });
    } catch (error) {
      images.forEach(image => {
        image.onload = () => {
          image.style.visibility = 'visible';
        };
        image.onerror = () => {
          image.removeAttribute('src');
          image.style.display = 'none';
        };
        image.src = fallbackPath;
      });
      console.error(`Using fallback asset for ${selector}.`, error);
    }
  };

  Promise.allSettled(assetJobs.map(loadEncodedAsset));

  const heroLead = document.querySelector('.hero-lead');
  if (heroLead) {
    heroLead.textContent = 'Greg, Brandon, and the Arborwise team help you understand what is wrong with your trees, what actually needs attention, and how to protect your property without pressure or guesswork. And sometimes there is nothing wrong with the tree—it is just a tree being a tree.';
  }

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
      text: 'A visible defect does not automatically mean removal. Location, sound wood, species, nearby targets, movement, and the surrounding root zone all affect the recommendation.'
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

  document.querySelector('.dialog-close')?.addEventListener('click', () => dialog?.close());

  dialog?.addEventListener('click', event => {
    if (event.target === dialog) dialog.close();
  });

  dialog?.addEventListener('close', () => {
    lastTrigger?.focus();
  });

  const tips = [
    'Show us what changed, where it changed, and how quickly. The pattern tells us where to look next.',
    'Roots usually extend well beyond the trunk. What happens to the soil can affect the entire tree.',
    'A proper pruning cut protects the branch collar. Flush cuts and long stubs both create avoidable problems.',
    'A cavity does not automatically mean a tree must come down. Location, sound wood, movement, species, and nearby targets all matter.',
    'Photograph the whole tree before taking close-ups. The canopy pattern often tells more than one damaged spot.',
    'New trees should not be buried like fence posts. The root flare should be visible at the finished grade.',
    'Mulch should protect the root zone, not pile against the trunk. Mulch volcanoes hold moisture where the bark needs air.',
    'A fast-growing tree is not automatically the right tree. Mature size, structure, roots, utilities, and available space matter.'
  ];

  const tip = document.getElementById('annieTip');
  const tipButton = document.getElementById('annieButton');
  let tipIndex = 0;

  tipButton?.addEventListener('click', () => {
    tipIndex = (tipIndex + 1) % tips.length;
    if (tip) tip.textContent = tips[tipIndex];
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
