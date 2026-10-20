const V='cmo-19c9d44ae3';
const FILES=['./','data.js','fonts.css','icon-180.png','icon-192.png','icon-512.png','icon-maskable-512.png','index.html','instrument-sans-latin-standard-normal.woff2','manifest.webmanifest','source-serif-4-latin-standard-italic.woff2','source-serif-4-latin-standard-normal.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const c=res.clone();caches.open(V).then(x=>x.put(e.request,c))}
    return res}).catch(()=>e.request.mode==='navigate'?caches.match('index.html'):undefined)));
});
