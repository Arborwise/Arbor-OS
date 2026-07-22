'use strict';
(() => {
  if (typeof state === 'undefined' || !Array.isArray(state.records)) return;

  const verifiedContacts = {
    'GTC-0006': {address:'245 Austin Place, Van Alstyne, TX', phone:'(972) 342-2999', email:'ChristiMahon@yahoo.com'},
    'GTC-0002': {address:'4145 Red Spruce Way, McKinney, TX', phone:'(214) 578-9488'},
    '2002': {address:'407 Walnut Drive, Murphy, TX', phone:'214-779-7128', email:'jsloan@sbbmanagement.com'},
    '2004': {address:'236 Creekview Dr, Anna, TX 75409', phone:'(469) 767-6677', email:'fariasjess93@gmail.com'},
    '2010': {address:'3110 Giovanni Way, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2011': {address:'2902 Cremini Falls, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2012': {address:'3107 Lucia Way, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2013': {address:'3016 Isla Terrace, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2014': {address:'3116 Lucia Way, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2015': {address:'517 Parrino Parkway, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2016': {address:'1737 Barnwood, Celina, TX', email:'j.deguzman@sbbmanagement.com'},
    '2017': {address:'437 Hoot Owl, Celina, TX', email:'j.deguzman@sbbmanagement.com'},
    '2018': {address:'3007 Isla Terrace, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    '2019': {address:'3004 Cremini Falls, Princeton, TX', email:'j.deguzman@sbbmanagement.com'},
    'WO-GTC-0005': {address:'379 John Douglas Drive, Van Alstyne, TX', phone:'(214) 552-6125', email:'rlanicek@gmail.com'},
    'WO-GTC-0007': {address:'3517 Jersey Rd, Melissa, TX 75454', phone:'(254) 855-8842', email:'chefteddy@aol.com'},
    'WO-GTC-0009': {address:'1103 Hyde Park Dr, McKinney, TX 75069', phone:'512-585-8082', email:'jlfriedel@gmail.com'},
    'WO-1977': {address:'9905 County Road 626, Blue Ridge, TX 75424', phone:'214-901-5732'},
    'FU-1663': {address:'1136 Hester St, Nevada, TX 75173', phone:'469-338-9121', email:'Mje.lssbb@gmail.com'},
    'SV-0719-CARL': {address:'2111 Knobhill Rd, Van Alstyne, TX 75495', phone:'903-436-5483'},
    'WO-1978': {address:'1103 Hyde Park Dr, McKinney, TX 75069', phone:'512-585-8082', email:'jlfriedel@gmail.com'},
    'FU-1980': {address:'1272 Lester Burt Rd, Farmersville, TX 75442', phone:'972-814-0915'}
  };

  const applyVerifiedContacts = () => {
    for (const record of state.records) {
      const verified = verifiedContacts[String(record.id || '')];
      if (!verified) continue;
      if (verified.address) record.address = verified.address;
      if (verified.phone) record.phone = verified.phone;
      if (verified.email) record.email = verified.email;
    }
  };

  applyVerifiedContacts();

  if (typeof render === 'function' && !render.__verifiedContactsWrapped) {
    const baseRender = render;
    const wrappedRender = (...args) => {
      applyVerifiedContacts();
      if (typeof save === 'function') save();
      return baseRender(...args);
    };
    wrappedRender.__verifiedContactsWrapped = true;
    render = wrappedRender;
  }

  // Keep the broken QuickBooks OAuth flow from reopening inside the crew board.
  localStorage.setItem('arborwise-os-last-auto-sync', String(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000));

  const sync = document.getElementById('syncButton');
  if (sync) {
    sync.onclick = async () => {
      sync.disabled = true;
      sync.classList.add('spinning');
      try {
        if (typeof loadServer === 'function') await loadServer(false);
        applyVerifiedContacts();
        if (typeof save === 'function') save();
        if (typeof render === 'function') render();
        if (typeof toast === 'function') toast('Board refreshed — QuickBooks connection remains paused');
      } catch (error) {
        if (typeof toast === 'function') toast('Board refreshed from saved operations data');
      } finally {
        sync.disabled = false;
        sync.classList.remove('spinning');
      }
    };
  }

  const status = document.getElementById('statusButton');
  if (status) {
    status.textContent = 'OPERATIONS BOARD • QUICKBOOKS CONNECTION PAUSED';
    status.onclick = () => {
      if (typeof toast === 'function') toast('QuickBooks authorization is paused; the working board stays available');
    };
  }

  const correctFounderLabels = () => {
    document.querySelectorAll('.directoryCard').forEach(element => {
      const name = element.querySelector('strong')?.textContent?.trim();
      const detail = element.querySelector('small');
      if (detail && (name === 'Greg' || name === 'Brandon')) {
        detail.textContent = 'Co-founder / owner / management • Arborwise';
      }
    });
  };

  correctFounderLabels();
  new MutationObserver(correctFounderLabels).observe(document.body, {childList:true, subtree:true});

  if (typeof save === 'function') save();
  if (typeof render === 'function') render();
  setTimeout(() => { applyVerifiedContacts(); if (typeof save === 'function') save(); if (typeof render === 'function') render(); }, 1200);
})();