'use strict';
(() => {
  const VERSION = '36';
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const $ = id => document.getElementById(id);
  const addButton = $('addButton');
  const veil = $('veil');
  const sheet = $('sheet');
  const main = $('main');
  const toastEl = $('toast');
  if (!addButton || !veil || !sheet || !main) return;

  const originalAddHandler = typeof addButton.onclick === 'function' ? addButton.onclick.bind(addButton) : null;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  let recognition = null;
  let listening = false;
  let finalTranscript = '';
  let interimTranscript = '';

  const micSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 14a3 3 0 0 0 3-3V5a3 3 0 1 0-6 0v6a3 3 0 0 0 3 3Zm5-3a1 1 0 1 0-2 0 3 3 0 0 1-6 0 1 1 0 1 0-2 0 5 5 0 0 0 4 4.9V19H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-3v-3.1A5 5 0 0 0 17 11Z"/></svg>';
  addButton.innerHTML = micSvg;
  addButton.classList.add('micEstimateButton');
  addButton.setAttribute('aria-label', 'Dictate a new estimate');
  addButton.setAttribute('title', 'Dictate a new estimate');

  function toast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.hidden = false;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toastEl.hidden = true; }, 3000);
  }

  function escapeHtml(value = '') {
    return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  }

  function stopRecognition() {
    if (recognition && listening) {
      try { recognition.stop(); } catch {}
    }
    listening = false;
    addButton.classList.remove('listening');
  }

  function closeVoiceSheet() {
    stopRecognition();
    veil.hidden = true;
    sheet.innerHTML = '';
  }

  function extractBetween(text, start, stops) {
    const match = text.match(new RegExp(`\\b(?:${start})\\b(?:\\s+(?:is|for))?\\s+(.+?)(?=\\s+\\b(?:${stops})\\b|$)`, 'i'));
    return match ? match[1].trim().replace(/[,.]+$/, '') : '';
  }

  function parseAmount(text) {
    const dollar = text.match(/\$\s*([\d,]+(?:\.\d{1,2})?)/i);
    if (dollar) return Number(dollar[1].replace(/,/g, '')) || 0;
    const words = text.match(/\b(?:price|amount|total|estimate)\b(?:\s+(?:is|for))?\s+([\d,]+(?:\.\d{1,2})?)\s*(?:dollars?)?/i);
    return words ? Number(words[1].replace(/,/g, '')) || 0 : 0;
  }

  function parseEstimate(text) {
    const transcript = String(text || '').trim().replace(/\s+/g, ' ');
    const stops = 'at|address|phone|email|scope|service|work|price|amount|total|estimate|notes?|exclusions?|exclude';
    let name = extractBetween(transcript, 'customer(?: name)?|client(?: name)?', stops);
    if (!name) name = extractBetween(transcript, 'for', stops);

    const address = extractBetween(transcript, 'address|at', 'phone|email|scope|service|work|price|amount|total|notes?|exclusions?|exclude');
    const scope = extractBetween(transcript, 'scope|service|work', 'price|amount|total|notes?|exclusions?|exclude');
    const spokenNotes = extractBetween(transcript, 'notes?', 'exclusions?|exclude|price|amount|total');
    const exclusions = extractBetween(transcript, 'exclusions?|exclude', 'notes?|price|amount|total');
    const phoneMatch = transcript.match(/\b(?:phone(?: number)?(?: is)?\s*)?(\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4})\b/i);
    const emailMatch = transcript.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
    const amount = parseAmount(transcript);
    const category = /\bSBB\b/i.test(transcript) ? 'SBB' : /\bGoodwin\b/i.test(transcript) ? 'GOODWIN' : /\bKanam\b/i.test(transcript) ? 'KANAM' : /\bKW\b/i.test(transcript) ? 'KW' : 'RESIDENTIAL';

    const notes = [
      spokenNotes,
      exclusions ? `Exclusions: ${exclusions}` : '',
      'Created from voice dictation. Review before QuickBooks.',
      `Original dictation: ${transcript}`
    ].filter(Boolean).join('\n');

    return {
      name,
      address,
      phone: phoneMatch ? phoneMatch[1] : '',
      email: emailMatch ? emailMatch[0] : '',
      service: scope || transcript,
      amount,
      category,
      who: 'Brandon',
      status: 'Draft — Review Required',
      notes
    };
  }

  function setField(id, value) {
    const field = $(id);
    if (!field) return;
    field.value = value == null ? '' : String(value);
    field.dispatchEvent(new Event('input', {bubbles:true}));
    field.dispatchEvent(new Event('change', {bubbles:true}));
  }

  function openReviewForm(draft) {
    const estimateTab = [...document.querySelectorAll('#tabs button')].find(button => String(button.dataset.tab || button.textContent).trim().toUpperCase() === 'ESTIMATES');
    if (estimateTab && !estimateTab.classList.contains('on')) estimateTab.click();
    if (!originalAddHandler) {
      toast('The estimate form is not available on this board version.');
      return;
    }
    originalAddHandler();
    setTimeout(() => {
      const heading = sheet.querySelector('h2');
      if (heading) heading.textContent = 'Review dictated estimate';
      setField('r-type', 'est');
      setField('r-name', draft.name);
      setField('r-address', draft.address);
      setField('r-phone', draft.phone);
      setField('r-email', draft.email);
      setField('r-service', draft.service);
      setField('r-amount', draft.amount || '');
      setField('r-category', draft.category);
      setField('r-who', draft.who);
      setField('r-status', draft.status);
      setField('r-notes', draft.notes);
      const saveButton = $('saveRecord');
      if (saveButton) saveButton.textContent = 'SAVE ESTIMATE DRAFT';
      const notice = document.createElement('div');
      notice.className = 'voiceReviewNotice';
      notice.textContent = 'Check the customer, address, scope, price, exclusions, and notes. Saving keeps this as a review-required draft; it does not send anything or create a QuickBooks estimate automatically.';
      if (heading) heading.insertAdjacentElement('afterend', notice);
    }, 0);
  }

  function reviewTranscript() {
    const transcriptBox = $('voiceTranscript');
    const transcript = String(transcriptBox?.value || finalTranscript || interimTranscript).trim();
    if (!transcript) {
      toast('Dictate or type the estimate details first.');
      return;
    }
    const draft = parseEstimate(transcript);
    closeVoiceSheet();
    openReviewForm(draft);
  }

  function openVoiceEstimate() {
    stopRecognition();
    finalTranscript = '';
    interimTranscript = '';
    sheet.innerHTML = `
      <h2>Create estimate</h2>
      <div class="voiceIntro">Dictate the customer, address, phone, scope, price, exclusions, and notes. Annie will organize it into the normal estimate form for review.</div>
      <div id="voiceStatus" class="voiceStatus">${SpeechRecognition ? 'Ready to listen.' : 'Use the microphone on your phone keyboard, or type the estimate below.'}</div>
      <textarea id="voiceTranscript" class="voiceTranscript" aria-label="Estimate dictation" placeholder="Example: Customer John Smith at 123 Oak Street. Scope remove one dead oak and grind the stump. Price 1800 dollars. Exclude fence repair."></textarea>
      <div class="buttons voiceButtons">
        <button class="secondary" id="cancelVoice">CANCEL</button>
        ${SpeechRecognition ? '<button class="secondary" id="startVoice">START DICTATION</button>' : ''}
        <button class="primary" id="reviewVoice">REVIEW ESTIMATE</button>
      </div>`;
    veil.hidden = false;

    const transcriptBox = $('voiceTranscript');
    const status = $('voiceStatus');
    const start = $('startVoice');
    $('cancelVoice').onclick = closeVoiceSheet;
    $('reviewVoice').onclick = reviewTranscript;

    if (!SpeechRecognition || !start) {
      transcriptBox.focus();
      return;
    }

    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onstart = () => {
      listening = true;
      addButton.classList.add('listening');
      start.textContent = 'STOP DICTATION';
      start.classList.add('listening');
      status.textContent = 'Listening… speak naturally.';
    };

    recognition.onresult = event => {
      interimTranscript = '';
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        const result = event.results[index];
        const words = result[0]?.transcript || '';
        if (result.isFinal) finalTranscript += `${words} `;
        else interimTranscript += words;
      }
      transcriptBox.value = `${finalTranscript}${interimTranscript}`.trim();
    };

    recognition.onerror = event => {
      listening = false;
      addButton.classList.remove('listening');
      start.textContent = 'START DICTATION';
      start.classList.remove('listening');
      status.textContent = event.error === 'not-allowed' ? 'Microphone permission was blocked. Use the phone keyboard microphone or type the estimate.' : 'Dictation stopped. You can edit the text and continue.';
    };

    recognition.onend = () => {
      listening = false;
      addButton.classList.remove('listening');
      start.textContent = 'START DICTATION';
      start.classList.remove('listening');
      status.textContent = transcriptBox.value.trim() ? 'Dictation captured. Edit it or review the estimate.' : 'Ready to listen.';
    };

    start.onclick = () => {
      if (listening) stopRecognition();
      else {
        try { recognition.start(); }
        catch { status.textContent = 'Dictation is already starting. Speak when the microphone activates.'; }
      }
    };
  }

  addButton.onclick = event => {
    event.preventDefault();
    event.stopPropagation();
    openVoiceEstimate();
  };

  veil.addEventListener('click', event => {
    if (event.target === veil) stopRecognition();
  }, true);

  function ensureHannah() {
    const title = String(main.querySelector('.title span')?.textContent || '');
    if (!/People/i.test(title)) return;

    const cards = [...main.querySelectorAll('.directoryCard')];
    const tobyCard = cards.find(card => String(card.querySelector('strong')?.textContent || '').trim() === 'Toby Palmer');
    if (!tobyCard) return;

    const tobyDetail = tobyCard.querySelector('small');
    if (tobyDetail && tobyDetail.textContent !== 'Estimator / crew • Arborwise') tobyDetail.textContent = 'Estimator / crew • Arborwise';

    if (!main.querySelector('[data-person="hannah-mcelrae"]')) {
      const hannahCard = document.createElement('div');
      hannahCard.className = 'directoryCard';
      hannahCard.dataset.person = 'hannah-mcelrae';
      hannahCard.innerHTML = '<strong>Hannah McElrae</strong><small>Crew • Arborwise</small>';
      tobyCard.insertAdjacentElement('afterend', hannahCard);
    }

    const count = main.querySelector('.title .count');
    const total = String(main.querySelectorAll('.directoryCard').length);
    if (count && count.textContent !== total) count.textContent = total;
  }

  let peopleTimer = 0;
  const observer = new MutationObserver(() => {
    clearTimeout(peopleTimer);
    peopleTimer = setTimeout(ensureHannah, 0);
  });
  observer.observe(main, {childList:true, subtree:true});
  ensureHannah();
})();
