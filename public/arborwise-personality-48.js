'use strict';
(() => {
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const voice = document.getElementById('operationsVoice');
  const main = document.getElementById('main');
  const status = document.getElementById('statusButton');
  if (!voice || !main) return;

  function localIsoDate(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function getRecords() {
    if (Array.isArray(window.ARBORWISE_CURRENT_OPERATIONS?.records)) {
      return window.ARBORWISE_CURRENT_OPERATIONS.records;
    }
    try {
      const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return Array.isArray(state.records) ? state.records : [];
    } catch {
      return [];
    }
  }

  function isClosed(record) {
    return Boolean(record.closed) || /complete|closed|paid/i.test(String(record.status || ''));
  }

  function getCounts() {
    const today = localIsoDate();
    const records = getRecords().filter(record => !isClosed(record));
    const todayCount = records.filter(record => record.workDate === today).length;
    const acceptedUnscheduled = records.filter(record => !record.workDate && /accepted|approved/i.test(String(record.status || ''))).length;
    const overdue = records.filter(record => record.workDate && record.workDate < today && !/accepted|approved/i.test(String(record.status || ''))).length;
    return {todayCount, acceptedUnscheduled, overdue};
  }

  function plural(count, singular, pluralWord = `${singular}s`) {
    return count === 1 ? singular : pluralWord;
  }

  function updateVoice() {
    const {todayCount, acceptedUnscheduled, overdue} = getCounts();
    const weekday = new Date().toLocaleDateString('en-US', {weekday: 'long'});
    const parts = [];

    if (todayCount) parts.push(`${weekday} is loaded with ${todayCount} ${plural(todayCount, 'stop')}.`);
    if (acceptedUnscheduled) parts.push(`${acceptedUnscheduled} accepted ${plural(acceptedUnscheduled, 'job')} still ${acceptedUnscheduled === 1 ? 'needs' : 'need'} a date.`);
    if (overdue) parts.push(`${overdue} older ${plural(overdue, 'job')} still ${overdue === 1 ? 'needs' : 'need'} a completion check.`);
    if (!parts.length) parts.push('The board is quiet. Nothing needs immediate attention.');

    voice.textContent = parts.join(' ');
    voice.dataset.tone = acceptedUnscheduled || overdue ? 'attention' : 'clear';
  }

  function classifyCards() {
    main.querySelectorAll('.card').forEach(card => {
      const statusText = card.querySelector('.pill')?.textContent?.trim() || '';
      card.classList.toggle('isScheduled', /scheduled|today.?s route/i.test(statusText));
      card.classList.toggle('isAttention', /accepted|approved|needs a date|scheduling/i.test(statusText));
      card.classList.toggle('isFollowUp', /follow|verify|progress/i.test(statusText));
      card.classList.toggle('isComplete', /complete|closed|paid/i.test(statusText));
      card.classList.toggle('isDanger', /failed|error|cancelled|canceled/i.test(statusText));
    });
  }

  function refreshPersonality() {
    updateVoice();
    classifyCards();
  }

  const mainObserver = new MutationObserver(refreshPersonality);
  mainObserver.observe(main, {childList: true, subtree: true});
  if (status) new MutationObserver(updateVoice).observe(status, {childList: true, characterData: true, subtree: true});
  window.addEventListener('arborwise:weather', updateVoice);
  window.addEventListener('storage', refreshPersonality);
  setInterval(updateVoice, 60000);
  refreshPersonality();
  window.ARBORWISE_PERSONALITY_VERSION = '48';
})();
