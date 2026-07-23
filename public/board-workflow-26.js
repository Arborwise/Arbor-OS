'use strict';
(() => {
  const VERSION = '26';
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const PATCH_KEY = `arborwise-workflow-patch-v${VERSION}`;
  const RELOAD_KEY = `arborwise-workflow-reload-v${VERSION}`;
  const TODAY_TAB = 'TODAY';

  const parseState = () => {
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return state && Array.isArray(state.records) ? state : null;
    } catch {
      return null;
    }
  };

  const saveState = state => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}
  };

  const isoToday = () => {
    const date = new Date();
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const addDays = (iso, days) => {
    const date = new Date(`${iso}T12:00:00`);
    date.setDate(date.getDate() + days);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const subtractDays = (iso, days) => addDays(iso, -days);
  const isApproved = record => /\bapproved\b/i.test(String(record?.status || ''));
  const isEstimateSent = record => /estimate\s*sent|sent\s*estimate/i.test(String(record?.status || ''));

  function applyWorkflowRules(state) {
    if (!state || !Array.isArray(state.records)) return state;
    let changed = false;
    for (const record of state.records) {
      if (!record || record.closed) continue;

      if (String(record.id || '') === 'WO-1977') {
        if (record.status !== 'Scheduled' || record.workDate !== '2026-07-25' || record.workTime !== 'Saturday — time not entered') {
          record.status = 'Scheduled';
          record.workDate = '2026-07-25';
          record.workTime = 'Saturday — time not entered';
          const note = 'Scheduled for Saturday, July 25. Start time has not been entered.';
          if (!String(record.notes || '').includes(note)) record.notes = `${String(record.notes || '').trim()} ${note}`.trim();
          changed = true;
        }
      }

      if (record.type === 'est' && isApproved(record)) {
        record.type = 'job';
        if (record.workDate && !/scheduled/i.test(String(record.status || ''))) record.status = 'Scheduled';
        else if (!record.workDate && String(record.status || '').trim().toLowerCase() === 'approved') record.status = 'Approved - Scheduling Needed';
        changed = true;
      }

      if (record.type === 'est' && isEstimateSent(record)) {
        if (!record.sentDate) {
          record.sentDate = record.followUp ? subtractDays(record.followUp, 3) : isoToday();
          changed = true;
        }
        const first = addDays(record.sentDate, 3);
        const second = addDays(record.sentDate, 7);
        if (!record.followUp) { record.followUp = first; changed = true; }
        if (!record.secondFollowUp) { record.secondFollowUp = second; changed = true; }
      }
    }
    if (changed) saveState(state);
    return state;
  }

  function timeMinutes(value = '') {
    const match = String(value).match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!match) return 24 * 60;
    let hour = Number(match[1]) % 12;
    const minute = Number(match[2] || 0);
    if (match[3].toUpperCase() === 'PM') hour += 12;
    return hour * 60 + minute;
  }

  function dailyActions(state) {
    const today = isoToday();
    const actions = [];

    for (const record of state.records) {
      if (!record || record.closed) continue;
      const name = String(record.name || 'Unnamed item');
      const who = String(record.who || 'Unassigned');

      if (record.workDate === today) {
        actions.push({rank: 10, time: timeMinutes(record.workTime), label: record.workTime || 'Today', title: name, detail: `${record.type === 'job' ? 'Job' : 'Work'} • ${who}`, id: String(record.id || '')});
        continue;
      }
      if (record.workDate && record.workDate < today) {
        actions.push({rank: 20, time: 0, label: 'OVERDUE', title: name, detail: `Verify or reopen incomplete work • ${who}`, id: String(record.id || '')});
        continue;
      }
      if (record.followUp === today) {
        actions.push({rank: 30, time: 0, label: '3-DAY', title: name, detail: `Follow up on sent estimate • ${who}`, id: String(record.id || '')});
        continue;
      }
      if (record.secondFollowUp === today) {
        actions.push({rank: 31, time: 0, label: '7-DAY', title: name, detail: `Second estimate follow-up • ${who}`, id: String(record.id || '')});
        continue;
      }
      if (record.type === 'job' && isApproved(record) && !record.workDate) {
        actions.push({rank: 40, time: 0, label: 'SCHEDULE', title: name, detail: `Approved job needs a date • ${who}`, id: String(record.id || '')});
      }
    }

    return actions.sort((a, b) => a.rank - b.rank || a.time - b.time || a.title.localeCompare(b.title));
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function ensureBriefStyle() {
    if (document.getElementById('workflowStyle26')) return;
    const style = document.createElement('style');
    style.id = 'workflowStyle26';
    style.textContent = `
      #dailyBrief{background:#fff8e6;border-bottom:1px solid #e0d4b5;padding:12px 14px 10px}
      #dailyBrief .briefHead{display:flex;align-items:center;justify-content:space-between;color:#17402b;font-weight:900;font-size:18px;margin-bottom:7px}
      #dailyBrief .briefCount{background:#17402b;color:#fff;border-radius:999px;padding:3px 9px;font-size:13px}
      #dailyBrief .briefItem{display:grid;grid-template-columns:76px minmax(0,1fr);gap:9px;align-items:start;padding:8px 0;border-top:1px solid #eadfca}
      #dailyBrief .briefItem:first-of-type{border-top:0}
      #dailyBrief .briefLabel{font-size:12px;font-weight:900;color:#9b4d00;letter-spacing:.03em}
      #dailyBrief .briefTitle{font-weight:900;color:#173c2b;line-height:1.2}
      #dailyBrief .briefDetail{font-size:13px;color:#626962;margin-top:2px;line-height:1.25}
      #dailyBrief .briefEmpty{color:#687068;font-weight:700;padding:4px 0}
      #dailyBrief .briefItem[data-record]{cursor:pointer}
      .recordActions,.contactRow{display:flex;gap:9px;align-items:center;flex-wrap:wrap;margin-top:10px}
      .recordActions a.iconAction,.contactRow a.iconAction{width:42px;height:42px;min-width:42px;padding:0!important;border:1.5px solid #17402b;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#17402b;background:#fff;text-decoration:none;box-shadow:0 1px 3px rgba(0,0,0,.08);font-size:0}
      .recordActions a.iconAction:active,.contactRow a.iconAction:active{background:#17402b;color:#fff;transform:scale(.96)}
      .iconAction svg{width:21px;height:21px;fill:currentColor;display:block;pointer-events:none}
    `;
    document.head.appendChild(style);
  }

  function currentTab() {
    const active = document.querySelector('#tabs button.on');
    return String(active?.dataset?.tab || active?.textContent || '').trim().toUpperCase();
  }

  function openRecordFromBrief(id) {
    const card = [...document.querySelectorAll('#main [data-record]')].find(element => String(element.dataset.record) === String(id));
    if (card) { card.click(); return; }
    const jobsTab = [...document.querySelectorAll('#tabs button')].find(button => String(button.dataset.tab || button.textContent).trim().toUpperCase() === 'JOBS');
    if (jobsTab) {
      jobsTab.click();
      setTimeout(() => {
        const target = [...document.querySelectorAll('#main [data-record]')].find(element => String(element.dataset.record) === String(id));
        if (target) target.click();
      }, 80);
    }
  }

  function renderDailyBrief() {
    ensureBriefStyle();
    let brief = document.getElementById('dailyBrief');
    if (!brief) {
      brief = document.createElement('section');
      brief.id = 'dailyBrief';
      const header = document.querySelector('header');
      if (header) header.insertAdjacentElement('afterend', brief);
    }

    const tab = currentTab();
    brief.hidden = tab && tab !== TODAY_TAB;
    if (brief.hidden) return;

    const state = applyWorkflowRules(parseState());
    if (!state) return;
    const actions = dailyActions(state);
    const visible = actions.slice(0, 8);
    const more = actions.length - visible.length;
    const html = `<div class="briefHead"><span>WHAT HAS TO HAPPEN TODAY</span><span class="briefCount">${actions.length}</span></div>${visible.length ? visible.map(action => `<div class="briefItem" data-record="${escapeHtml(action.id)}"><div class="briefLabel">${escapeHtml(action.label)}</div><div><div class="briefTitle">${escapeHtml(action.title)}</div><div class="briefDetail">${escapeHtml(action.detail)}</div></div></div>`).join('') + (more > 0 ? `<div class="briefEmpty">+ ${more} more item${more === 1 ? '' : 's'} in Jobs</div>` : '') : '<div class="briefEmpty">No scheduled work or follow-ups are due today.</div>'}`;
    if (brief.innerHTML !== html) brief.innerHTML = html;
    brief.querySelectorAll('[data-record]').forEach(item => item.onclick = () => openRecordFromBrief(item.dataset.record));
  }

  function sortEstimateSentCardsLast() {
    const state = parseState();
    const main = document.getElementById('main');
    if (!state || !main) return;
    const byId = new Map(state.records.map(record => [String(record.id || ''), record]));
    const cards = [...main.querySelectorAll(':scope > [data-record]')];
    if (cards.length < 2) return;
    const sorted = [...cards].sort((a, b) => {
      const aRecord = byId.get(String(a.dataset.record));
      const bRecord = byId.get(String(b.dataset.record));
      const aSent = aRecord?.type === 'est' && isEstimateSent(aRecord) ? 1 : 0;
      const bSent = bRecord?.type === 'est' && isEstimateSent(bRecord) ? 1 : 0;
      return aSent - bSent;
    });
    const before = cards.map(card => card.dataset.record).join('|');
    const after = sorted.map(card => card.dataset.record).join('|');
    if (before !== after) sorted.forEach(card => main.appendChild(card));
  }

  let pendingSave = null;
  document.addEventListener('click', event => {
    const saveButton = event.target.closest?.('#saveRecord');
    if (!saveButton) return;
    const idInput = document.getElementById('r-id');
    const typeInput = document.getElementById('r-type');
    const statusInput = document.getElementById('r-status');
    const followInput = document.getElementById('r-follow');
    if (!typeInput || !statusInput) return;

    const status = String(statusInput.value || '').trim();
    const id = String(idInput?.value || '').trim();
    const name = String(document.getElementById('r-name')?.value || '').trim();
    const sent = /estimate\s*sent|sent\s*estimate/i.test(status);
    const approved = /\bapproved\b/i.test(status);
    let sentDate = '';
    let secondFollowUp = '';

    if (approved) typeInput.value = 'job';
    if (sent) {
      typeInput.value = 'est';
      sentDate = isoToday();
      const first = addDays(sentDate, 3);
      secondFollowUp = addDays(sentDate, 7);
      if (followInput) followInput.value = first;
    }
    pendingSave = {id, name, approved, sent, sentDate, secondFollowUp};

    setTimeout(() => {
      const state = parseState();
      if (!state || !pendingSave) return;
      const target = state.records.find(record => String(record.id || '') === String(pendingSave.id)) || [...state.records].reverse().find(record => pendingSave.name && String(record.name || '') === pendingSave.name);
      if (target) {
        if (pendingSave.approved) {
          target.type = 'job';
          if (!target.workDate && String(target.status || '').trim().toLowerCase() === 'approved') target.status = 'Approved - Scheduling Needed';
        }
        if (pendingSave.sent) {
          target.type = 'est';
          target.sentDate = pendingSave.sentDate;
          target.followUp = addDays(pendingSave.sentDate, 3);
          target.secondFollowUp = pendingSave.secondFollowUp;
        }
        saveState(state);
      }
      pendingSave = null;
      renderDailyBrief();
      sortEstimateSentCardsLast();
    }, 120);
  }, true);

  const icons = {
    call: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
    text: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 2H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h4l4 3 4-3h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-2 11H6v-2h12zm0-4H6V7h12z"/></svg>',
    email: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    map: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'
  };

  function iconify() {
    document.querySelectorAll('.recordActions a, .contactRow a').forEach(link => {
      if (link.dataset.iconified === VERSION) return;
      const href = String(link.getAttribute('href') || '').toLowerCase();
      let kind = '';
      if (href.startsWith('tel:')) kind = 'call';
      else if (href.startsWith('sms:')) kind = 'text';
      else if (href.startsWith('mailto:')) kind = 'email';
      else if (href.includes('maps.google') || href.includes('google.com/maps')) kind = 'map';
      if (!kind) return;
      const label = kind === 'call' ? 'Call customer' : kind === 'text' ? 'Text customer' : kind === 'email' ? 'Email customer' : 'Open map';
      link.classList.add('iconAction');
      link.dataset.iconified = VERSION;
      link.setAttribute('aria-label', label);
      link.setAttribute('title', label);
      link.innerHTML = icons[kind];
    });
  }

  function refreshEnhancements() {
    const state = parseState();
    if (state) applyWorkflowRules(state);
    renderDailyBrief();
    sortEstimateSentCardsLast();
    iconify();
  }

  let refreshTimer = 0;
  const observer = new MutationObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refreshEnhancements, 30);
  });
  observer.observe(document.body, {childList:true, subtree:true});

  let migrated = false;
  try {
    const state = parseState();
    if (state) {
      applyWorkflowRules(state);
      localStorage.setItem(PATCH_KEY, 'applied');
      migrated = true;
    }
  } catch {}

  try {
    if (migrated && sessionStorage.getItem(RELOAD_KEY) !== '1') {
      sessionStorage.setItem(RELOAD_KEY, '1');
      const url = new URL(location.href);
      url.searchParams.set('board', VERSION);
      location.replace(`${url.pathname}${url.search}${url.hash}`);
      return;
    }
  } catch {}

  setTimeout(refreshEnhancements, 0);
  setTimeout(refreshEnhancements, 250);
})();
