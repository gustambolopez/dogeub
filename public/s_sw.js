// dumb hack to allow firefox to work (please dont do this in prod) 
// don't worry i will
if (navigator.userAgent.includes("Firefox")) {
  Object.defineProperty(globalThis, "crossOriginIsolated", {
    value: true,
    writable: false,
  });
}

importScripts("/scram/scramjet.all.js");

const { ScramjetServiceWorker } = $scramjetLoadWorker();
const sj = new ScramjetServiceWorker();

self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    await sj.loadConfig();

    if (sj.route(event)) {
      return sj.fetch(event);
    }

    return fetch(event.request);
  })());
});
