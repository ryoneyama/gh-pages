// ServiceWorkerĺŚç https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js').then(function(registration) {
    console.log('ServiceWorker registration successful with scope: ', registration.scope);
  }).catch(function(err) {
    console.log('ServiceWorker registration failed: ', err);
  });
}
