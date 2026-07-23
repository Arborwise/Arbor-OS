const CACHE='arborwise-os-v22';
const CORE=['/','/index.html','/boot-repair.js?v=22','/app.css?v=22','/app.js?v=22','/operational-overrides.js?v=22','/contact-actions.js?v=22','/runtime-fixes.js?v=22','/manifest.webmanifest?v=22','/assets/annie-icon-192.png','/assets/annie-icon-512.png','/assets/arborwise-logo.png?v=22','/assets/annie-main-icon.png?v=22'];

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

const networkWithTimeout=async(request,timeoutMs=3500)=>{
  const timeout=new Promise(resolve=>setTimeout(()=>resolve(null),timeoutMs));
  const network=fetch(request,{cache:'no-store'}).then(response=>response.ok?response:null).catch(()=>null);
  return Promise.race([network,timeout]);
};

self.addEventListener('fetch',event=>{
  const url=new URL(event.request.url);
  if(event.request.method!=='GET'||url.origin!==location.origin||url.pathname.startsWith('/api/'))return;

  if(event.request.mode==='navigate'){
    event.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const cached=await cache.match('/index.html')||await cache.match('/');
      const networkPromise=networkWithTimeout(event.request).then(async response=>{
        if(response){
          await Promise.all([cache.put('/',response.clone()),cache.put('/index.html',response.clone())]);
        }
        return response;
      });

      if(cached){
        event.waitUntil(networkPromise.catch(()=>{}));
        return cached;
      }

      const network=await networkPromise;
      if(network)return network;
      return new Response('<!doctype html><meta name="viewport" content="width=device-width,initial-scale=1"><title>Arborwise OS</title><body style="font-family:Arial;padding:24px;background:#f6f5f0;color:#17402b"><h1>Arborwise OS</h1><p>The board could not reach the server. Close and reopen it once.</p></body>',{headers:{'Content-Type':'text/html; charset=utf-8'}});
    })());
    return;
  }

  event.respondWith((async()=>{
    const cached=await caches.match(event.request);
    if(cached)return cached;
    const response=await fetch(event.request);
    if(response.ok){
      const cache=await caches.open(CACHE);
      await cache.put(event.request,response.clone());
    }
    return response;
  })());
});
