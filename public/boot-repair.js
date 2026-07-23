'use strict';
(() => {
  const VERSION = '22';
  const STATE_KEY = 'arborwise-os-v12';
  const CACHE_REPAIR_KEY = `arborwise-cache-repair-v${VERSION}`;
  const RUNTIME_REPAIR_KEY = `arborwise-runtime-repair-v${VERSION}`;
  const main = document.getElementById('main');

  if (main && !main.innerHTML.trim()) {
    main.innerHTML = '<div class="title"><span>Opening operations board</span></div><div class="empty">Loading current jobs, estimates, people, equipment, and schedule...</div>';
  }

  // Repair incompatible or damaged data left by older board versions.
  try {
    const raw = localStorage.getItem(STATE_KEY);
    if (raw) {
      const saved = JSON.parse(raw);
      if (!saved || typeof saved !== 'object' || !Array.isArray(saved.records)) {
        localStorage.removeItem(STATE_KEY);
      } else {
        saved.records = saved.records.filter(record => record && typeof record === 'object');
        saved.hours = Array.isArray(saved.hours) ? saved.hours : [];
        saved.mileage = Array.isArray(saved.mileage) ? saved.mileage : [];
        saved.notes = Array.isArray(saved.notes) ? saved.notes : [];
        saved.filter = typeof saved.filter === 'string' ? saved.filter : 'ALL';
        saved.tab = typeof saved.tab === 'string' ? saved.tab : 'TODAY';
        localStorage.setItem(STATE_KEY, JSON.stringify(saved));
      }
    }
  } catch {
    try { localStorage.removeItem(STATE_KEY); } catch {}
  }

  // Remove the legacy installed-app worker and its stale files exactly once.
  const clearLegacyAppCache = async () => {
    try {
      if (localStorage.getItem(CACHE_REPAIR_KEY) === 'done') return;
      localStorage.setItem(CACHE_REPAIR_KEY, 'done');
    } catch {}

    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map(key => caches.delete(key)));
      }
    } catch {}

    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(registration => registration.unregister()));
      }
    } catch {}

    try {
      const url = new URL(location.href);
      if (url.searchParams.get('boot') !== VERSION) {
        url.searchParams.set('boot', VERSION);
        location.replace(`${url.pathname}${url.search}${url.hash}`);
      }
    } catch {}
  };

  clearLegacyAppCache();

  const boardRendered = () => {
    const hasTabs = Boolean(document.querySelector('#tabs button'));
    const hasContent = Boolean(document.querySelector('#main .card, #main .empty, #main .directoryCard, #main .equipmentCard, #main .hoursCard, #main .noteCard'));
    return hasTabs && hasContent;
  };

  const recoverRuntime = () => {
    if (boardRendered()) return;

    try {
      if (sessionStorage.getItem(RUNTIME_REPAIR_KEY) !== 'attempted') {
        sessionStorage.setItem(RUNTIME_REPAIR_KEY, 'attempted');
        localStorage.removeItem(STATE_KEY);
        const url = new URL(location.href);
        url.searchParams.set('recovered', VERSION);
        location.replace(`${url.pathname}${url.search}${url.hash}`);
        return;
      }
    } catch {}

    if (main) {
      main.innerHTML = '<div class="title"><span>Operations board recovery</span></div><article class="card job"><div class="name">The board did not finish loading</div><div class="service">Tap the orange button below to reload the repaired version. Your shared server records are not deleted.</div><div class="buttons"><button class="primary" id="repairReload" type="button">RELOAD BOARD</button></div></article>';
      const button = document.getElementById('repairReload');
      if (button) button.onclick = () => location.replace(`/?recovered=${VERSION}&t=${Date.now()}`);
    }
  };

  window.addEventListener('error', () => setTimeout(recoverRuntime, 50));
  window.addEventListener('unhandledrejection', () => setTimeout(recoverRuntime, 50));
  setTimeout(recoverRuntime, 3500);
})();
