'use strict';

// Arborwise OS is a live operations board. Offline application-shell caching was
// serving obsolete code and stale records, so this worker now removes itself.
self.addEventListener('install',event=>{
  self.skipWaiting();
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    try{
      const keys=await caches.keys();
      await Promise.all(keys.map(key=>caches.delete(key)));
    }catch{}
    try{await self.registration.unregister();}catch{}
    try{
      const clients=await self.clients.matchAll({type:'window',includeUncontrolled:true});
      for(const client of clients)client.postMessage({type:'ARBORWISE_SERVICE_WORKER_RETIRED'});
    }catch{}
  })());
});

// Deliberately do not intercept fetches. Every board page and data request must
// reach Vercel or explicitly use the board's last-good data cache.
