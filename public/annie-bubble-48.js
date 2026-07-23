'use strict';
(() => {
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const annie = document.getElementById('annieButton');
  const bubble = document.getElementById('annieBubble');
  if (!annie || !bubble) return;

  const SVG_NS = 'http://www.w3.org/2000/svg';
  const CLOUD_PATH = 'M37 94 C22 98 10 88 15 74 C3 66 6 49 22 44 C17 29 29 16 45 21 C52 7 71 8 79 21 C89 7 108 7 116 20 C129 7 148 12 152 26 C167 15 185 23 185 39 C201 38 211 51 205 65 C217 76 208 92 193 92 C186 105 168 106 158 97 C146 108 128 108 118 97 C106 108 88 107 79 97 C69 105 53 103 47 94 L57 112 L36 97 C36 96 36 95 37 94 Z';
  let messageIndex = 0;

  function localIsoDate(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function getRecords() {
    if (Array.isArray(window.ARBORWISE_CURRENT_OPERATIONS?.records)) return window.ARBORWISE_CURRENT_OPERATIONS.records;
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

  function buildMessages() {
    const today = localIsoDate();
    const records = getRecords().filter(record => !isClosed(record));
    const todayCount = records.filter(record => record.workDate === today).length;
    const accepted = records.filter(record => !record.workDate && /accepted|approved/i.test(String(record.status || ''))).length;
    const overdue = records.filter(record => record.workDate && record.workDate < today && !/accepted|approved/i.test(String(record.status || ''))).length;
    const messages = [];

    if (todayCount) messages.push(`${todayCount} ${todayCount === 1 ? 'stop is' : 'stops are'} on the board today.`);
    if (accepted) messages.push(`${accepted} accepted ${accepted === 1 ? 'job still needs' : 'jobs still need'} a date.`);
    if (overdue) messages.push(`${overdue} older ${overdue === 1 ? 'job needs' : 'jobs need'} a completion check.`);
    if (window.ARBORWISE_WEATHER?.description) {
      const weather = window.ARBORWISE_WEATHER;
      messages.push(`Van Alstyne is ${Math.round(Number(weather.temperature))}° with ${Math.round(Number(weather.rainChance || 0))}% rain chance.`);
    }
    messages.push('Tap a job for scope, crew, route, and contact details.');
    messages.push('Refresh checks for a newer finished board without blinking when nothing changed.');
    messages.push('Operations oversight stays with Greg. Crew assignments stay separate.');
    if (!todayCount && !accepted && !overdue) messages.unshift('Nothing needs immediate attention right now.');

    annie.classList.toggle('hasAttention', Boolean(accepted || overdue));
    return messages;
  }

  bubble.setAttribute('role', 'status');
  bubble.setAttribute('aria-live', 'polite');
  bubble.dataset.cloudStyle = 'scalloped-48';
  annie.setAttribute('aria-controls', 'annieBubble');
  annie.setAttribute('aria-expanded', 'false');

  function hide() {
    bubble.hidden = true;
    annie.setAttribute('aria-expanded', 'false');
    clearTimeout(window.annieTimer);
  }

  function buildCloud(message) {
    bubble.replaceChildren();
    const art = document.createElementNS(SVG_NS, 'svg');
    art.classList.add('annieCloudArt');
    art.setAttribute('viewBox', '0 0 220 116');
    art.setAttribute('preserveAspectRatio', 'none');
    art.setAttribute('aria-hidden', 'true');
    art.setAttribute('focusable', 'false');

    const shape = document.createElementNS(SVG_NS, 'path');
    shape.classList.add('annieCloudShape');
    shape.setAttribute('d', CLOUD_PATH);
    art.appendChild(shape);

    const cloudText = document.createElement('span');
    cloudText.className = 'annieCloudText';
    if (message.length > 64) cloudText.classList.add('isExtraLong');
    else if (message.length > 52) cloudText.classList.add('isLong');
    cloudText.textContent = message;
    bubble.append(art, cloudText);
  }

  function show(next = true) {
    const messages = buildMessages();
    if (!messages.length) return;
    if (next) messageIndex = messageIndex % messages.length;
    buildCloud(messages[messageIndex]);
    messageIndex = (messageIndex + 1) % messages.length;
    bubble.hidden = false;
    annie.setAttribute('aria-expanded', 'true');
    clearTimeout(window.annieTimer);
    window.annieTimer = setTimeout(hide, 8000);
  }

  annie.onclick = event => {
    event.preventDefault();
    event.stopPropagation();
    if (bubble.hidden) show(true);
    else hide();
  };
  bubble.onclick = event => { event.stopPropagation(); hide(); };
  document.addEventListener('click', event => {
    if (!bubble.hidden && !bubble.contains(event.target) && !annie.contains(event.target)) hide();
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') hide(); });
  window.addEventListener('arborwise:weather', buildMessages);
  window.addEventListener('storage', buildMessages);

  buildMessages();
  if (!sessionStorage.getItem('arborwise-annie-greeted-v48')) {
    sessionStorage.setItem('arborwise-annie-greeted-v48', '1');
    setTimeout(() => show(false), 1300);
  }
  window.ARBORWISE_ANNIE_VERSION = '48';
})();
