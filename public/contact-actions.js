'use strict';
(() => {
  const escapeAttr = value => String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  const cleanPhone = value => String(value || '').replace(/[^0-9+]/g, '');

  const buildActions = record => {
    const actions = [];
    const phone = cleanPhone(record.phone);
    const email = String(record.email || '').trim();
    const address = String(record.address || '').trim();

    if (phone) {
      actions.push(`<a class="customerAction call" href="tel:${escapeAttr(phone)}" aria-label="Call ${escapeAttr(record.name)}">CALL</a>`);
      actions.push(`<a class="customerAction text" href="sms:${escapeAttr(phone)}" aria-label="Text ${escapeAttr(record.name)}">TEXT</a>`);
    }
    if (address) {
      actions.push(`<a class="customerAction map" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}" target="_blank" rel="noopener" aria-label="Map ${escapeAttr(record.name)}">MAP</a>`);
    }
    if (email) {
      actions.push(`<a class="customerAction email" href="mailto:${escapeAttr(email)}" aria-label="Email ${escapeAttr(record.name)}">EMAIL</a>`);
    }

    return actions.length ? `<div class="customerActions">${actions.join('')}</div>` : '';
  };

  const installCardActions = () => {
    if (typeof card !== 'function' || card.__contactActionsInstalled) return;
    const baseCard = card;
    const wrapped = record => {
      const html = baseCard(record);
      const actions = buildActions(record);
      return actions ? html.replace('</article>', `${actions}</article>`) : html;
    };
    wrapped.__contactActionsInstalled = true;
    card = wrapped;
  };

  const correctPeopleLabels = () => {
    document.querySelectorAll('.directoryCard').forEach(cardElement => {
      const name = cardElement.querySelector('strong');
      const detail = cardElement.querySelector('small');
      if (name?.textContent?.trim() === 'Brandon' && detail) {
        detail.textContent = 'Co-founder / owner / management • Arborwise';
      }
      if (name?.textContent?.trim() === 'Greg' && detail) {
        detail.textContent = 'Co-founder / owner / management • Arborwise';
      }
    });
  };

  const style = document.createElement('style');
  style.textContent = `
    .customerActions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px;padding-top:11px;border-top:1px solid #e2e0d6}
    .customerAction{display:flex;align-items:center;justify-content:center;min-height:42px;border-radius:10px;text-decoration:none;font-family:'Barlow Condensed','Barlow',sans-serif;font-weight:800;font-size:14px;letter-spacing:.8px;border:1.5px solid #17402b;color:#17402b;background:#fff}
    .customerAction:active{transform:scale(.98);background:#17402b;color:#fff}
    .customerAction.text{border-color:#e4590c;color:#b8490a}
    .customerAction.map{border-color:#f59f0a;color:#755000}
    .customerAction.email{background:#17402b;color:#fff}
    @media(max-width:380px){.customerActions{grid-template-columns:repeat(2,minmax(0,1fr))}}
  `;
  document.head.appendChild(style);

  document.addEventListener('click', event => {
    if (event.target.closest('.customerAction')) event.stopPropagation();
  }, true);

  installCardActions();
  correctPeopleLabels();

  const observer = new MutationObserver(() => {
    installCardActions();
    correctPeopleLabels();
  });
  observer.observe(document.body, {childList:true, subtree:true});

  if (typeof render === 'function') render();
})();