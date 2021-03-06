// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-weather-sample-cache1';
var urlsToCache = [
	'./index.html',
    './scripts/main.js',
    './scripts/webapi.js',
	'./styles/main.css',
    './images/computer_smartphone_connect.png',
    './images/app-icon-192.png'
];

// インストール処理
self.addEventListener('install', function(event) {
	console.log('[ServiceWorker] Install')
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				console.log('[ServiceWorker] Cache App Data')
				return cache.addAll(urlsToCache);
			})
	);
});

// ページ更新時の新キャッシュ取得と旧キャッシュの削除
self.addEventListener('activate', function(event) {
	console.log('[ServiceWorker] Activate')
	event.waitUntil(
		caches
			.keys().then(function(keyList) {
				return Promise.all(keyList.map(function(key) {
					console.log('[SerivceWorker] Removing old cache', key);
					if ( key !== CACHE_NAME){
						return caches.delete(key);
					}
				}));
			})
	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
	console.log('[ServiceWorker] Fetch', event.request.url);
	event.respondWith(
		caches.open(CACHE_NAME).then(function(cache){
			return cache.match(event.request).then(function(response) {
				var fetchPromise = fetch(event.request).then(function(networkResponse) {
					cache.put(event.request, networkResponse.clone());
					return networkResponse;
				})
				return response || fetchPromise;
			})
		})
	);
});
