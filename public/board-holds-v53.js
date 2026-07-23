'use strict';
(() => {
  const STORAGE_KEY = 'arborwise-live-board-v24';
  const correctedAt = '2026-07-23T18:21:53-05:00';
  const correctedRecords = [
    {
      id:'2011',
      type:'job',
      name:'Sicily Laguna Azure',
      address:'2902 Cremini Falls, Princeton, TX',
      phone:'972-707-4862',
      service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',
      amount:866,
      category:'SBB',
      who:'Unassigned',
      status:'Hold',
      workDate:'',
      workTime:'',
      notes:'Hold — no tree is present now, but the prior tree location is visible. Typical scope is remove and replace. Verify before scheduling. Operations oversight: Greg.',
      closed:false,
      completionType:null,
      laborCost:null,
      oversight:'Greg'
    },
    {
      id:'2013',
      type:'job',
      name:'Sicily Laguna Azure',
      address:'3016 Isla Terrace, Princeton, TX',
      phone:'972-707-4862',
      service:'Remove and replace tree; secure replacement tree and install mulch; haul off debris.',
      amount:866,
      category:'SBB',
      who:'Unassigned',
      status:'Hold',
      workDate:'',
      workTime:'',
      notes:'Hold — homeowner replacement is unconfirmed. Do not schedule or count as completed until verified. Tree and material allocation remains pending final reconciliation. Operations oversight: Greg.',
      closed:false,
      completionType:null,
      laborCost:null,
      otherCost:280.13,
      oversight:'Greg'
    }
  ];

  const normalizeId = value => {
    const text = String(value || '').trim();
    const workOrder = text.match(/^WO-(\d+)$/i);
    return workOrder ? workOrder[1] : text;
  };

  let state = {};
  try { state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {}; } catch { state = {}; }
  const records = Array.isArray(state.records) ? [...state.records] : [];
  const byId = new Map(records.map(record => [normalizeId(record?.id), record]));
  for (const correctedRecord of correctedRecords) {
    byId.set(normalizeId(correctedRecord.id), {...byId.get(normalizeId(correctedRecord.id)), ...correctedRecord});
  }
  state = {...state, records:[...byId.values()], currentOperationsUpdatedAt:correctedAt, currentSnapshotVersion:53, lastSync:correctedAt};
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch {}

  if (window.ARBORWISE_CURRENT_OPERATIONS && Array.isArray(window.ARBORWISE_CURRENT_OPERATIONS.records)) {
    const current = window.ARBORWISE_CURRENT_OPERATIONS.records;
    for (const correctedRecord of correctedRecords) {
      const currentIndex = current.findIndex(record => normalizeId(record?.id) === normalizeId(correctedRecord.id));
      if (currentIndex >= 0) current[currentIndex] = {...current[currentIndex], ...correctedRecord};
      else current.push(correctedRecord);
    }
    window.ARBORWISE_CURRENT_OPERATIONS.updatedAt = correctedAt;
  }

  window.ARBORWISE_HOLD_CORRECTION_VERSION = '53';
})();