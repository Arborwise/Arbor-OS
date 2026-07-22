const CACHE='arborwise-os-v20';
const CORE=['/','/index.html','/app.css?v=20','/app.js?v=20','/operational-overrides.js?v=20','/contact-actions.js?v=20','/runtime-fixes.js?v=20','/manifest.webmanifest','/assets/annie-icon-192.png','/assets/annie-icon-512.png','/assets/arborwise-logo.png?v=20','/assets/annie-main-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==location.origin||url.pathname.startsWith('/api/'))return;
  if(event.request.mode==='navigate'){
    event.respondWith(fetch(event.request,{cache:'no-store'}).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put('/',response.clone()));return response;}).catch(()=>caches.match('/').then(response=>response||caches.match('/index.html'))));
    return;
  }
  event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(event.request,response.clone()));return response;})));
});