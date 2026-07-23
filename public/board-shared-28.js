'use strict';
(() => {
  const VERSION = 28;
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const PENDING_KEY = `arborwise-shared-pending-v${VERSION}`;
  const POLL_MS = 15000;
  const LEGACY_DUPLICATE_IDS = [
    '2007',
    '2008',
    'TASK-20260722-REVIEW',
    'TASK-20260723-REVIEW',
    'TASK-20260724-REVIEW'
  ];

  const $ = id => document.getElementById(id);
  const veil = $('veil');
  const sheet = $('sheet');
  const statusButton = $('statusButton');
  const refreshButton = $('syncButton');
  const toastElement = $('toast');
  if (!veil || !sheet || !statusButton || !refreshButton) return;

  let connected = false;
  let busy = false;
  let loginOpen = false;
  let deferredData = null;

  function parseJson(value, fallback) {
    try { return JSON.parse(value); } catch { return fallback; }
  }

  function readLocalState() {
    const state = parseJson(localStorage.getItem(STORAGE_KEY), null);
    return state && Array.isArray(state.records) ? state : null;
  }

  function writeLocalState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function readPending() {
    const actions = parseJson(localStorage.getItem(PENDING_KEY), []);
    return Array.isArray(actions) ? actions : [];
  }

  function writePending(actions) {
    localStorage.setItem(PENDING_KEY, JSON.stringify(actions));
  }

  function showToast(message) {
    if (!toastElement) return;
    toastElement.textContent = message;
    toastElement.hidden = false;
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => { toastElement.hidden = true; }, 3000);
  }

  function setStatus(message) {
    statusButton.textContent = message;
  }

  async function api(path, options = {}) {
    const response = await fetch(path, {
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json', ...(options.headers || {})},
      ...options
    });
    let data = {};
    try { data = await response.json(); } catch {}
    if (!response.ok) {
      const error = new Error(data.error || `Request failed ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return data;
  }

  function closeSheet() {
    veil.hidden = true;
    sheet.innerHTML = '';
    loginOpen = false;
  }

  function showLogin() {
    if (loginOpen) return;
    loginOpen = true;
    connected = false;
    setStatus('SHARED BOARD • LOGIN REQUIRED');
    sheet.innerHTML = `
      <h2>Open shared Arborwise board</h2>
      <p style="line-height:1.45;margin:0 0 14px">Enter the Arborwise shared PIN once on this phone. Do not send the PIN in a text message or put it in a job note.</p>
      <div class="field">
        <label for="sharedPin">Shared PIN</label>
        <input id="sharedPin" type="password" inputmode="numeric" autocomplete="current-password">
      </div>
      <div class="buttons">
        <button class="secondary" id="sharedCancel" type="button">CANCEL</button>
        <button class="primary" id="sharedLogin" type="button">OPEN SHARED BOARD</button>
      </div>`;
    veil.hidden = false;

    const pin = $('sharedPin');
    const submit = async () => {
      const value = String(pin?.value || '');
      if (!value) {
        showToast('Enter the Arborwise PIN');
        return;
      }
      const button = $('sharedLogin');
      button.disabled = true;
      try {
        await api('/api/login', {method:'POST', body:JSON.stringify({pin:value})});
        closeSheet();
        await synchronize({allowLogin:false, bootstrap:true, forceReload:true});
      } catch (error) {
        showToast(error.message || 'Login failed');
        button.disabled = false;
        pin?.focus();
        pin?.select();
      }
    };

    $('sharedCancel').onclick = () => {
      closeSheet();
      setStatus('THIS PHONE ONLY • TAP STATUS TO CONNECT');
    };
    $('sharedLogin').onclick = submit;
    pin.onkeydown = event => {
      if (event.key === 'Enter') {
        event.preventDefault();
        submit();
      }
    };
    setTimeout(() => pin?.focus(), 50);
  }

  function amountNumber(value) {
    return Number(String(value ?? '').replace(/[$,]/g, '')) || 0;
  }

  function toServerPayload(record, sharedVersion = VERSION) {
    return {
      id: String(record.id || ''),
      type: record.type || 'est',
      category: record.category || 'RESIDENTIAL',
      name: record.name || '',
      phone: record.phone || '',
      email: record.email || '',
      addr: record.address || '',
      service: record.service || '',
      desc: record.description || record.service || '',
      money: amountNumber(record.amount),
      status: record.status || '',
      who: record.who || '',
      date: record.workDate || null,
      time: record.workTime || '',
      fuDate: record.followUp || null,
      notes: record.notes || '',
      closed: Boolean(record.closed),
      sentDate: record.sentDate || '',
      secondFollowUp: record.secondFollowUp || '',
      sharedVersion,
      raw: {
        sentDate: record.sentDate || '',
        secondFollowUp: record.secondFollowUp || '',
        sharedVersion
      }
    };
  }

  function fromServerItem(item) {
    return {
      id: String(item.id || ''),
      type: item.type || 'est',
      name: item.name || '',
      address: item.addr || '',
      phone: item.phone || '',
      email: item.email || '',
      service: item.service || item.desc || '',
      amount: amountNumber(item.money),
      category: item.category || 'RESIDENTIAL',
      who: item.who || '',
      status: item.status || '',
      workDate: item.date || '',
      workTime: item.time || '',
      followUp: item.fuDate || '',
      notes: item.notes || '',
      closed: Boolean(item.closed),
      sentDate: item.sentDate || '',
      secondFollowUp: item.secondFollowUp || '',
      sharedVersion: Number(item.sharedVersion || 0) || 0,
      updatedAt: item.updatedAt || ''
    };
  }

  function noteFromServer(row) {
    return {
      serverId: row.id,
      body: row.body || '',
      author: row.author || '',
      time: row.created_at ? new Date(row.created_at).toLocaleString() : ''
    };
  }

  function hoursFromServer(row) {
    return {
      serverId: row.id,
      date: String(row.work_date || '').slice(0, 10),
      employee: row.employee || '',
      job: row.job_ref || '',
      start: String(row.start_time || '').slice(0, 5),
      end: String(row.end_time || '').slice(0, 5),
      breakMinutes: Number(row.break_minutes || 0),
      hours: Number(row.hours_worked || 0),
      notes: row.notes || '',
      status: row.status || 'Submitted'
    };
  }

  function mileageFromServer(row) {
    return {
      serverId: row.id,
      date: String(row.trip_date || '').slice(0, 10),
      from: row.origin || '',
      to: row.destination || '',
      miles: Number(row.miles || 0),
      why: row.purpose || ''
    };
  }

  function stableState(state) {
    const records = [...(state.records || [])]
      .map(record => ({
        id:String(record.id || ''),
        type:record.type || '',
        name:record.name || '',
        address:record.address || '',
        phone:record.phone || '',
        email:record.email || '',
        service:record.service || '',
        amount:amountNumber(record.amount),
        category:record.category || '',
        who:record.who || '',
        status:record.status || '',
        workDate:record.workDate || '',
        workTime:record.workTime || '',
        followUp:record.followUp || '',
        notes:record.notes || '',
        closed:Boolean(record.closed),
        sentDate:record.sentDate || '',
        secondFollowUp:record.secondFollowUp || ''
      }))
      .sort((a,b) => a.id.localeCompare(b.id));
    const notes = (state.notes || []).map(item => ({
      id:item.serverId || '',
      body:item.body || '',
      author:item.author || '',
      time:item.time || ''
    }));
    const hours = (state.hours || []).map(item => ({
      id:item.serverId || '',
      date:item.date || '',
      employee:item.employee || '',
      job:item.job || '',
      start:item.start || '',
      end:item.end || '',
      breakMinutes:Number(item.breakMinutes || 0),
      hours:Number(item.hours || 0),
      notes:item.notes || ''
    }));
    const mileage = (state.mileage || []).map(item => ({
      id:item.serverId || '',
      date:item.date || '',
      from:item.from || '',
      to:item.to || '',
      miles:Number(item.miles || 0),
      why:item.why || ''
    }));
    return JSON.stringify({records,notes,hours,mileage});
  }

  function serverReady(data) {
    return Array.isArray(data.items) && data.items.some(item => Number(item.sharedVersion || 0) >= VERSION);
  }

  function fingerprintNote(item) {
    return `${String(item.author || '').trim().toLowerCase()}|${String(item.body || '').trim().toLowerCase()}`;
  }

  function fingerprintHours(item) {
    return [
      item.date || item.work_date || '',
      String(item.employee || '').trim().toLowerCase(),
      String(item.job || item.job_ref || '').trim().toLowerCase(),
      String(item.start || item.start_time || '').slice(0,5),
      String(item.end || item.end_time || '').slice(0,5),
      Number(item.hours || item.hours_worked || 0).toFixed(2),
      String(item.notes || '').trim().toLowerCase()
    ].join('|');
  }

  function fingerprintMileage(item) {
    return [
      item.date || item.trip_date || '',
      String(item.from || item.origin || '').trim().toLowerCase(),
      String(item.to || item.destination || '').trim().toLowerCase(),
      Number(item.miles || 0).toFixed(2),
      String(item.why || item.purpose || '').trim().toLowerCase()
    ].join('|');
  }

  async function bootstrapSharedBoard(local, serverData) {
    if (!local || !Array.isArray(local.records) || !local.records.length) {
      throw new Error('This phone does not have a board to share');
    }

    setStatus('SHARED BOARD • PREPARING FIRST COPY');

    for (const record of local.records) {
      await api('/api/records', {
        method:'POST',
        body:JSON.stringify(toServerPayload(record, 0))
      });
    }

    for (const id of LEGACY_DUPLICATE_IDS) {
      try {
        await api('/api/records', {
          method:'DELETE',
          body:JSON.stringify({id})
        });
      } catch {}
    }

    const existingNotes = new Set((serverData.notes || []).map(fingerprintNote));
    for (const note of local.notes || []) {
      if (!note?.body || existingNotes.has(fingerprintNote(note))) continue;
      await api('/api/state', {
        method:'POST',
        body:JSON.stringify({
          action:'note',
          lane:'general',
          body:note.body,
          author:note.author || ''
        })
      });
    }

    const existingHours = new Set((serverData.hours || []).map(fingerprintHours));
    for (const entry of local.hours || []) {
      if (!entry?.date || existingHours.has(fingerprintHours(entry))) continue;
      await api('/api/state', {
        method:'POST',
        body:JSON.stringify({
          action:'hours',
          date:entry.date,
          employee:entry.employee || '',
          job:entry.job || '',
          start:entry.start || '',
          end:entry.end || '',
          breakMinutes:Number(entry.breakMinutes || 0),
          hours:Number(entry.hours || 0),
          notes:entry.notes || '',
          status:entry.status || 'Submitted'
        })
      });
    }

    const existingMileage = new Set((serverData.mileage || []).map(fingerprintMileage));
    for (const entry of local.mileage || []) {
      if (!entry?.date || existingMileage.has(fingerprintMileage(entry))) continue;
      await api('/api/state', {
        method:'POST',
        body:JSON.stringify({
          action:'mileage',
          date:entry.date,
          from:entry.from || '',
          to:entry.to || '',
          miles:Number(entry.miles || 0),
          why:entry.why || ''
        })
      });
    }

    const marker = local.records[0];
    await api('/api/records', {
      method:'PATCH',
      body:JSON.stringify(toServerPayload(marker, VERSION))
    });
  }

  function makeAction(type, payload, key = '') {
    return {
      id:`${Date.now()}-${Math.random().toString(36).slice(2)}`,
      key:key || `${type}:${Date.now()}:${Math.random().toString(36).slice(2)}`,
      type,
      payload,
      createdAt:new Date().toISOString()
    };
  }

  function enqueue(action) {
    const pending = readPending();
    const filtered = action.key
      ? pending.filter(item => item.key !== action.key)
      : pending;
    filtered.push(action);
    writePending(filtered);
  }

  async function sendAction(action) {
    if (action.type === 'record-upsert') {
      return api('/api/records', {
        method:'POST',
        body:JSON.stringify(action.payload)
      });
    }
    if (action.type === 'record-delete') {
      return api('/api/records', {
        method:'DELETE',
        body:JSON.stringify(action.payload)
      });
    }
    if (action.type === 'state') {
      return api('/api/state', {
        method:'POST',
        body:JSON.stringify(action.payload)
      });
    }
    throw new Error('Unknown shared action');
  }

  async function flushPending() {
    const pending = readPending();
    if (!pending.length) return;
    const remaining = [];
    for (let index = 0; index < pending.length; index += 1) {
      const action = pending[index];
      try {
        await sendAction(action);
      } catch (error) {
        remaining.push(action, ...pending.slice(index + 1));
        writePending(remaining);
        throw error;
      }
    }
    writePending([]);
  }

  async function queueAndSend(action) {
    enqueue(action);
    try {
      await flushPending();
      connected = true;
      setStatus(`SHARED BOARD • SAVED ${new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}`);
    } catch (error) {
      if (error.status === 401) {
        showLogin();
      } else {
        setStatus('SHARED BOARD • CHANGE QUEUED OFFLINE');
        showToast('Saved on this phone; shared upload will retry');
      }
    }
  }

  function buildSharedState(current, data) {
    return {
      ...(current || {}),
      records:(data.items || []).map(fromServerItem),
      notes:(data.notes || []).map(noteFromServer),
      hours:(data.hours || []).map(hoursFromServer),
      mileage:(data.mileage || []).map(mileageFromServer),
      filter:current?.filter || 'ALL',
      groupFilter:current?.groupFilter || 'ALL',
      tab:current?.tab || 'TODAY',
      shared:true,
      sharedVersion:VERSION,
      lastSharedRefresh:new Date().toISOString()
    };
  }

  function reloadWithSharedVersion() {
    const url = new URL(location.href);
    url.searchParams.set('shared', String(VERSION));
    url.searchParams.set('updated', String(Date.now()));
    location.replace(`${url.pathname}${url.search}${url.hash}`);
  }

  function applyServerData(data, forceReload = false) {
    if (!veil.hidden && !loginOpen) {
      deferredData = data;
      return;
    }

    const current = readLocalState();
    const next = buildSharedState(current, data);
    const changed = !current || stableState(current) !== stableState(next);
    writeLocalState(next);
    deferredData = null;

    if (changed || forceReload) {
      setTimeout(reloadWithSharedVersion, 80);
    }
  }

  async function synchronize({allowLogin = true, bootstrap = true, forceReload = false} = {}) {
    if (busy) return;
    busy = true;
    refreshButton.disabled = true;
    refreshButton.classList.add('spinning');
    try {
      await flushPending();
      let data = await api('/api/data');
      if (data.localMode) throw new Error('Shared database is not configured');

      if (bootstrap && !serverReady(data)) {
        await bootstrapSharedBoard(readLocalState(), data);
        data = await api('/api/data');
      }

      connected = true;
      setStatus(`SHARED BOARD • LIVE • ${new Date().toLocaleTimeString([], {hour:'numeric',minute:'2-digit'})}`);
      applyServerData(data, forceReload);
    } catch (error) {
      connected = false;
      if (error.status === 401 && allowLogin) {
        showLogin();
      } else if (error.status !== 401) {
        setStatus('SHARED BOARD • RETRY NEEDED');
        showToast(error.message || 'Shared board could not refresh');
      }
    } finally {
      busy = false;
      refreshButton.disabled = false;
      refreshButton.classList.remove('spinning');
    }
  }

  function findSavedRecord(captured) {
    const state = readLocalState();
    if (!state) return null;
    if (captured.id) {
      const exact = state.records.find(record => String(record.id || '') === captured.id);
      if (exact) return exact;
    }
    if (captured.name) {
      return [...state.records].reverse().find(record => String(record.name || '').trim() === captured.name) || null;
    }
    return state.records[state.records.length - 1] || null;
  }

  document.addEventListener('click', event => {
    const button = event.target.closest?.('button');
    if (!button) return;

    if (button.id === 'saveRecord' || button.id === 'toggleComplete') {
      const captured = {
        id:String($('r-id')?.value || '').trim(),
        name:String($('r-name')?.value || '').trim()
      };
      setTimeout(() => {
        const record = findSavedRecord(captured);
        if (!record?.id) return;
        queueAndSend(makeAction(
          'record-upsert',
          toServerPayload(record, VERSION),
          `record:${record.id}`
        ));
      }, 180);
      return;
    }

    if (button.id === 'delete') {
      const id = String($('r-id')?.value || '').trim();
      if (!id) return;
      setTimeout(() => {
        queueAndSend(makeAction('record-delete', {id}, `record:${id}`));
      }, 100);
      return;
    }

    if (button.id === 'saveNote') {
      const before = (readLocalState()?.notes || []).length;
      setTimeout(() => {
        const state = readLocalState();
        if (!state || state.notes.length <= before) return;
        const note = state.notes[state.notes.length - 1];
        queueAndSend(makeAction('state', {
          action:'note',
          lane:'general',
          body:note.body || '',
          author:note.author || ''
        }));
      }, 180);
      return;
    }

    if (button.id === 'saveHours') {
      const before = (readLocalState()?.hours || []).length;
      setTimeout(() => {
        const state = readLocalState();
        if (!state || state.hours.length <= before) return;
        const entry = state.hours[state.hours.length - 1];
        queueAndSend(makeAction('state', {
          action:'hours',
          date:entry.date,
          employee:entry.employee || '',
          job:entry.job || '',
          start:entry.start || '',
          end:entry.end || '',
          breakMinutes:Number(entry.breakMinutes || 0),
          hours:Number(entry.hours || 0),
          notes:entry.notes || '',
          status:entry.status || 'Submitted'
        }));
      }, 180);
      return;
    }

    if (button.id === 'saveMileage') {
      const before = (readLocalState()?.mileage || []).length;
      setTimeout(() => {
        const state = readLocalState();
        if (!state || state.mileage.length <= before) return;
        const entry = state.mileage[state.mileage.length - 1];
        queueAndSend(makeAction('state', {
          action:'mileage',
          date:entry.date,
          from:entry.from || '',
          to:entry.to || '',
          miles:Number(entry.miles || 0),
          why:entry.why || ''
        }));
      }, 180);
    }
  }, true);

  refreshButton.onclick = async () => {
    await synchronize({allowLogin:true, bootstrap:true, forceReload:false});
    if (connected) showToast('Shared board refreshed');
  };

  statusButton.onclick = () => {
    if (!connected) {
      showLogin();
      return;
    }
    showToast('Shared board is live. Other phones update after refresh or within about 15 seconds.');
  };

  veil.addEventListener('click', event => {
    if (event.target !== veil || !deferredData) return;
    setTimeout(() => {
      if (veil.hidden && deferredData) applyServerData(deferredData);
    }, 120);
  });

  setInterval(() => {
    if (document.visibilityState !== 'visible' || !veil.hidden || !navigator.onLine) return;
    synchronize({allowLogin:false, bootstrap:false});
  }, POLL_MS);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible' && veil.hidden && navigator.onLine) {
      synchronize({allowLogin:false, bootstrap:false});
    }
  });

  window.addEventListener('online', () => {
    synchronize({allowLogin:false, bootstrap:false});
  });

  setTimeout(() => {
    synchronize({allowLogin:true, bootstrap:true});
  }, 350);
})();
