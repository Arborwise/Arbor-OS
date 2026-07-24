'use strict';
(() => {
  const escapeAttr = value => String(value || '')
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');

  const cleanPhone = value => String(value || '').replace(/[^0-9+]/g, '');
  const icons = {
    call:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.7 15.7 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.24c1.1.36 2.27.55 3.46.55A1.14 1.14 0 0 1 21 16.65V20a1.14 1.14 0 0 1-1.14 1.14A17 17 0 0 1 2.86 4.14 1.14 1.14 0 0 1 4 3h3.35A1.14 1.14 0 0 1 8.5 4.14c0 1.2.19 2.36.55 3.46a1 1 0 0 1-.25 1z"/></svg>',
    text:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm3 5h10v2H7zm0 4h7v2H7z"/></svg>',
    email:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zm9 7 8-5H4z"/></svg>',
    map:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 1 7 7c0 5-7 13-7 13S5 14 5 9a7 7 0 0 1 7-7zm0 4.5A2.5 2.5 0 1 0 12 11a2.5 2.5 0 0 0 0-5z"/></svg>'
  };

  const action = (kind, href, label, extra='') => `<a class="customerAction ${kind}" href="${href}" aria-label="${escapeAttr(label)}" title="${escapeAttr(label)}" ${extra}>${icons[kind]}<span>${kind.toUpperCase()}</span></a>`;

  const buildActions = record => {
    const actions = [];
    const phone = cleanPhone(record.phone);
    const email = String(record.email || '').trim();
    const address = String(record.address || '').trim();
    const name = String(record.name || 'customer').trim();

    if (phone) {
      actions.push(action('call', `tel:${escapeAttr(phone)}`, `Call ${name}`));
      actions.push(action('text', `sms:${escapeAttr(phone)}`, `Text ${name}`));
    }
    if (email) actions.push(action('email', `mailto:${escapeAttr(email)}`, `Email ${name}`));
    if (address) actions.push(action('map', `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, `Map ${name}`, 'target="_blank" rel="noopener"'));

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
      if (name?.textContent?.trim() === 'Brandon' && detail) detail.textContent = 'Co-founder / owner / management • Arborwise';
      if (name?.textContent?.trim() === 'Greg' && detail) detail.textContent = 'Co-founder / owner / management • Arborwise';
    });
  };

  const style = document.createElement('style');
  style.textContent = `
    .customerActions{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin-top:12px;padding-top:11px;border-top:1px solid #e2e0d6}
    .customerAction{display:flex;align-items:center;justify-content:center;min-height:48px;border-radius:12px;text-decoration:none;border:1.5px solid #17402b;color:#17402b;background:#fff}
    .customerAction svg{width:25px;height:25px;fill:currentColor}
    .customerAction span{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}
    .customerAction:active{transform:scale(.96);background:#17402b;color:#fff}
    .customerAction.text{border-color:#e4590c;color:#b8490a}
    .customerAction.map{border-color:#f59f0a;color:#755000}
    .customerAction.email{background:#17402b;color:#fff}
    @media(max-width:380px){.customerActions{grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}.customerAction{min-height:44px}.customerAction svg{width:22px;height:22px}}
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