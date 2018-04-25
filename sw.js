// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-cache-sample1';
var urlsToCache = [
	'/',
	'/index.html',
	'/link.html',
	'/link2.html',
	'/scripts/main.js',
	'/css/normalize.css',
	'/images/computer_smartphone_connect.png'
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
		caches
			.match(event.request)
			.then(function(response) {
				return response || fetch(event.request);
			})
	);
});
