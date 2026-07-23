'use strict';
(() => {
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const correctedAt = '2026-07-23T18:04:00-05:00';
  const correctedRecord = {
    id:'2012',
    type:'job',
    name:'Sicily Laguna Azure',
    address:'3107 Lucia Way, Princeton, TX',
    phone:'972-707-4862',
    service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',
    amount:866,
    category:'SBB',
    who:'Toby Palmer; Hannah McElrae; Jonathan McElrae',
    status:'Completed',
    workDate:'2026-07-23',
    workTime:'8:30 AM–5:00 PM route',
    notes:'Completed by Arborwise crew today. Before and after photos required. Tree and material cost remains allocated. Operations oversight: Greg.',
    closed:true,
    completionType:'arborwise',
    laborCost:91.67,
    otherCost:280.13,
    oversight:'Greg'
  };

  const normalizeId = value => {
    const text = String(value || '').trim();
    const workOrder = text.match(/^WO-(\d+)$/i);
    return workOrder ? workOrder[1] : text;
  };

  let state = {};
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { state = {}; }
  const records = Array.isArray(state.records) ? [...state.records] : [];
  const index = records.findIndex(record => normalizeId(record?.id) === '2012');
  if (index >= 0) records[index] = {...records[index], ...correctedRecord};
  else records.push(correctedRecord);
  state = {...state, records, currentOperationsUpdatedAt:correctedAt, currentSnapshotVersion:52, lastSync:correctedAt};
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}

  if (window.ARBORWISE_CURRENT_OPERATIONS && Array.isArray(window.ARBORWISE_CURRENT_OPERATIONS.records)) {
    const current = window.ARBORWISE_CURRENT_OPERATIONS.records;
    const currentIndex = current.findIndex(record => normalizeId(record?.id) === '2012');
    if (currentIndex >= 0) current[currentIndex] = {...current[currentIndex], ...correctedRecord};
    else current.push(correctedRecord);
    window.ARBORWISE_CURRENT_OPERATIONS.updatedAt = correctedAt;
  }

  window.ARBORWISE_COMPLETION_CORRECTION_VERSION = '52';
})();