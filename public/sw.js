const CACHE='arborwise-os-v21';
const CORE=['/','/index.html','/app.css?v=21','/app.js?v=21','/operational-overrides.js?v=21','/contact-actions.js?v=21','/runtime-fixes.js?v=21','/manifest.webmanifest','/assets/annie-icon-192.png','/assets/annie-icon-512.png','/assets/arborwise-logo.png?v=21','/assets/annie-main-icon.png'];

self.addEventListener('install',event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE);
  await Promise.all(CORE.map(async path=>{
    try{
      const response=await fetch(path,{cache:'reload'});
      if(response.ok)await cache.put(path,response.clone());
    }catch{}
  }));
  await self.skipWaiting();
})()));

self.addEventListener('activate',event=>event.waitUntil((async()=>{
  const keys=await caches.keys();
  await Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)));
  await self.clients.claim();
})()));

self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==location.origin||url.pathname.startsWith('/api/'))return;

  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{
      if(response.ok)caches.open(CACHE).then(cache=>Promise.all([
        cache.put('/',response.clone()),
        cache.put('/index.html',response.clone())
      ])).catch(()=>{});
      return response;
    }).catch(async()=>await caches.match('/')||await caches.match('/index.html')));
    return;
  }

  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{
    if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone())).catch(()=>{});
    return response;
  })));
});
