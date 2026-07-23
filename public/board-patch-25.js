'use strict';
(() => {
  const PATCH_VERSION = '25';
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const RELOAD_KEY = `arborwise-board-patch-${PATCH_VERSION}-loaded`;

  // Correct the operating snapshot without inventing a start time.
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && Array.isArray(saved.records)) {
      const record = saved.records.find(item => String(item?.id || '') === 'WO-1977');
      if (record) {
        record.status = 'Scheduled';
        record.workDate = '2026-07-25';
        record.workTime = 'Saturday — time not entered';
        record.closed = false;
        const note = 'Scheduled for Saturday, July 25. Start time has not been entered.';
        if (!String(record.notes || '').includes(note)) record.notes = `${String(record.notes || '').trim()} ${note}`.trim();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
      }
    }
  } catch {}

  const style = document.createElement('style');
  style.textContent = `
    .recordActions,.contactRow{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin-top:10px}
    .recordActions a.iconAction,.contactRow a.iconAction{
      width:42px;height:42px;min-width:42px;padding:0!important;border:1.5px solid #17402b;
      border-radius:50%;display:inline-flex;align-items:center;justify-content:center;
      color:#17402b;background:#fff;text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,.08)
    }
    .recordActions a.iconAction:active,.contactRow a.iconAction:active{background:#17402b;color:#fff;transform:scale(.96)}
    .iconAction svg{width:21px;height:21px;fill:currentColor;display:block;pointer-events:none}
  `;
  document.head.appendChild(style);

  const icons = {
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
    text: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l4 3 4-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 11H6v-2h12zm0-4H6V7h12z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'
  };

  function iconify() {
    document.querySelectorAll('.recordActions a, .contactRow a').forEach(link => {
      if (link.dataset.iconified === PATCH_VERSION) return;
      const href = String(link.getAttribute('href') || '').toLowerCase();
      let kind = '';
      if (href.startsWith('tel:')) kind = 'call';
      else if (href.startsWith('sms:')) kind = 'text';
      else if (href.startsWith('mailto:')) kind = 'email';
      else if (href.includes('maps.google') || href.includes('google.com/maps')) kind = 'map';
      if (!kind) return;
      const label = kind === 'call' ? 'Call customer' : kind === 'text' ? 'Text customer' : kind === 'email' ? 'Email customer' : 'Open map';
      link.classList.add('iconAction');
      link.dataset.iconified = PATCH_VERSION;
      link.setAttribute('aria-label', label);
      link.setAttribute('title', label);
      link.innerHTML = icons[kind];
    });
  }

  iconify();
  new MutationObserver(iconify).observe(document.body, {childList:true, subtree:true});

  // Reload once so the in-memory board reads the corrected Saturday schedule.
  try {
    if (sessionStorage.getItem(RELOAD_KEY) !== '1') {
      sessionStorage.setItem(RELOAD_KEY, '1');
      const url = new URL(location.href);
      url.searchParams.set('board', PATCH_VERSION);
      location.replace(`${url.pathname}${url.search}${url.hash}`);
    }
  } catch {}
})();
