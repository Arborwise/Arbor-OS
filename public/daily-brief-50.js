'use strict';
(() => {
  const VERSION = '50';
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const TODAY_TAB = 'TODAY';

  const parseState = () => {
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return state && Array.isArray(state.records) ? state : null;
    } catch {
      return null;
    }
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

  const formatDate = iso => new Date(`${iso}T12:00:00`).toLocaleDateString('en-US', {month:'short', day:'numeric'});
  const escapeHtml = value => String(value || '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const currentTab = () => String(document.querySelector('#tabs button.on')?.dataset?.tab || document.querySelector('#tabs button.on')?.textContent || '').trim().toUpperCase();
  const isCompleted = record => Boolean(record?.closed) || /\bcomplete(?:d)?\b|\bdone\b/i.test(String(record?.status || ''));

  const timeMinutes = value => {
    const match = String(value || '').match(/(\d{1,2})(?::(\d{2}))?\s*(AM|PM)/i);
    if (!match) return 24 * 60;
    let hour = Number(match[1]) % 12;
    const minute = Number(match[2] || 0);
    if (match[3].toUpperCase() === 'PM') hour += 12;
    return hour * 60 + minute;
  };

  function dailyActions(state) {
    const today = isoToday();
    const actions = [];

    for (const record of state.records) {
      if (!record) continue;
      const name = String(record.name || 'Unnamed item');
      const who = String(record.who || 'Unassigned');
      const completed = isCompleted(record);

      if (completed) {
        if (record.workDate === today) {
          actions.push({rank:90, time:timeMinutes(record.workTime), label:'COMPLETED', title:name, detail:`Finished today • ${who}`, id:String(record.id || ''), completed:true});
        }
        continue;
      }

      if (record.workDate === today) {
        actions.push({rank:10, time:timeMinutes(record.workTime), label:record.workTime || 'TODAY', title:name, detail:`${record.type === 'job' ? 'Job' : 'Work'} • ${who}`, id:String(record.id || ''), completed:false});
        continue;
      }
      if (record.workDate && record.workDate < today) {
        actions.push({rank:20, time:0, label:'OVERDUE', title:name, detail:`Verify or reopen incomplete work • ${who}`, id:String(record.id || ''), completed:false});
        continue;
      }
      if (record.followUp === today) {
        actions.push({rank:30, time:0, label:'3-DAY', title:name, detail:`Follow up on sent estimate • ${who}`, id:String(record.id || ''), completed:false});
        continue;
      }
      if (record.secondFollowUp === today) {
        actions.push({rank:31, time:0, label:'7-DAY', title:name, detail:`Second estimate follow-up • ${who}`, id:String(record.id || ''), completed:false});
      }
    }

    return actions.sort((a, b) => a.rank - b.rank || a.time - b.time || a.title.localeCompare(b.title));
  }

  function ensureStyle() {
    if (document.getElementById('dailyBriefStyle50')) return;
    const style = document.createElement('style');
    style.id = 'dailyBriefStyle50';
    style.textContent = `
      #dailyBrief{display:none!important}
      #dailyBrief50{background:#fff8e6;border-bottom:1px solid #e0d4b5;padding:12px 14px 10px}
      #dailyBrief50[hidden]{display:none!important}
      #dailyBrief50 .briefHead{display:flex;align-items:center;justify-content:space-between;gap:10px;color:#17402b;font-weight:900;font-size:18px;margin-bottom:3px}
      #dailyBrief50 .briefCount{background:#17402b;color:#fff;border-radius:999px;padding:3px 9px;font-size:13px;min-width:24px;text-align:center}
      #dailyBrief50 .briefProgress{font-size:12px;color:#687068;font-weight:800;margin-bottom:7px}
      #dailyBrief50 .briefItem{display:grid;grid-template-columns:76px minmax(0,1fr);gap:9px;align-items:start;padding:8px 0;border-top:1px solid #eadfca}
      #dailyBrief50 .briefItem:first-of-type{border-top:0}
      #dailyBrief50 .briefLabel{font-size:12px;font-weight:900;color:#9b4d00;letter-spacing:.03em}
      #dailyBrief50 .briefTitle{font-weight:900;color:#173c2b;line-height:1.2}
      #dailyBrief50 .briefDetail{font-size:13px;color:#626962;margin-top:2px;line-height:1.25}
      #dailyBrief50 .briefEmpty{color:#687068;font-weight:700;padding:4px 0}
      #dailyBrief50 .briefItem[data-record]{cursor:pointer}
      #dailyBrief50 .briefItem.isCompleted{opacity:.58;filter:grayscale(.9);background:#ecece8;margin:0 -8px;padding:8px;border-radius:8px}
      #dailyBrief50 .briefItem.isCompleted .briefLabel{color:#4f5651}
      #dailyBrief50 .briefItem.isCompleted .briefTitle{text-decoration:line-through;text-decoration-thickness:1.5px}
    `;
    document.head.appendChild(style);
  }

  function openRecord(id, completed) {
    const visibleCard = [...document.querySelectorAll('#main [data-record]')].find(element => String(element.dataset.record) === String(id));
    if (visibleCard) { visibleCard.click(); return; }
    const targetName = completed ? 'COMPLETED' : 'JOBS';
    const targetTab = [...document.querySelectorAll('#tabs button')].find(button => String(button.dataset.tab || button.textContent).trim().toUpperCase() === targetName);
    if (!targetTab) return;
    targetTab.click();
    setTimeout(() => {
      const target = [...document.querySelectorAll('#main [data-record]')].find(element => String(element.dataset.record) === String(id));
      if (target) target.click();
    }, 80);
  }

  function updateRangeHeading() {
    if (currentTab() !== TODAY_TAB) return;
    const title = document.querySelector('#main .title span:first-child');
    if (!title) return;
    const start = isoToday();
    const end = addDays(start, 7);
    const text = `TODAY + 7 DAYS • ${formatDate(start)}–${formatDate(end)} + UNSCHEDULED`;
    if (title.textContent !== text) title.textContent = text;
  }

  function render() {
    ensureStyle();
    const legacy = document.getElementById('dailyBrief');
    if (legacy) legacy.hidden = true;

    let brief = document.getElementById('dailyBrief50');
    if (!brief) {
      brief = document.createElement('section');
      brief.id = 'dailyBrief50';
      document.querySelector('header')?.insertAdjacentElement('afterend', brief);
    }

    const tab = currentTab();
    brief.hidden = Boolean(tab && tab !== TODAY_TAB);
    if (brief.hidden) return;

    const state = parseState();
    if (!state) return;
    const actions = dailyActions(state);
    const remaining = actions.filter(action => !action.completed).length;
    const completed = actions.length - remaining;
    const progress = completed ? `${remaining} remaining • ${completed} completed` : `${remaining} remaining`;
    const html = `<div class="briefHead"><span>WHAT HAS TO HAPPEN TODAY</span><span class="briefCount">${actions.length}</span></div><div class="briefProgress">${escapeHtml(progress)}</div>${actions.length ? actions.map(action => `<div class="briefItem${action.completed ? ' isCompleted' : ''}" data-record="${escapeHtml(action.id)}" data-completed="${action.completed ? 'true' : 'false'}"><div class="briefLabel">${escapeHtml(action.label)}</div><div><div class="briefTitle">${escapeHtml(action.title)}</div><div class="briefDetail">${escapeHtml(action.detail)}</div></div></div>`).join('') : '<div class="briefEmpty">No scheduled work or follow-ups are due today.</div>'}`;
    if (brief.innerHTML !== html) brief.innerHTML = html;
    brief.querySelectorAll('[data-record]').forEach(item => item.onclick = () => openRecord(item.dataset.record, item.dataset.completed === 'true'));
    updateRangeHeading();
  }

  let refreshTimer = 0;
  const observer = new MutationObserver(() => {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(render, 35);
  });
  observer.observe(document.body, {childList:true, subtree:true});

  let renderedDay = isoToday();
  setInterval(() => {
    const currentDay = isoToday();
    if (currentDay === renderedDay) return;
    renderedDay = currentDay;
    const todayTab = [...document.querySelectorAll('#tabs button')].find(button => String(button.dataset.tab || button.textContent).trim().toUpperCase() === TODAY_TAB);
    if (todayTab) todayTab.click();
    setTimeout(render, 80);
  }, 60000);

  window.ARBORWISE_DAILY_BRIEF_VERSION = VERSION;
  setTimeout(render, 0);
  setTimeout(render, 250);
})();