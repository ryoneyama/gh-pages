// ServiceWorker処理：https://developers.google.com/web/fundamentals/primers/service-workers/?hl=ja

// キャッシュ名とキャッシュファイルの指定
var CACHE_NAME = 'pwa-cache-sample';
var urlsToCache = [
	'./index.html',
	'./link.html',
	'./scripts/main.js',
	'./css/normalize.css',
	'./images/computer_smartphone_connect.png'
];

// インストール処理
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches
			.open(CACHE_NAME)
			.then(function(cache) {
				return cache.addAll(urlsToCache);
			})

	);
});

// リソースフェッチ時のキャッシュロード処理
self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches
			.match(event.request)
			.then(function(response) {
				if (response) {
					return response;
				}

				// 重要：リクエストを clone する。リクエストは Stream なので
				// 一度しか処理できない。ここではキャッシュ用、fetch 用と2回
				// 必要なので、リクエストは clone しないといけない
				let fetchRequest = event.request.clone();

				return fetch(fetchRequest)
					.then((response) => {
						if (!response || response.status !== 200 || response.type !== 'basic') {
							return response;
						}

						// 重要：レスポンスを clone する。レスポンスは Stream で
						// ブラウザ用とキャッシュ用の2回必要。なので clone して
						// 2つの Stream があるようにする
						let responseToCache = response.clone();

						caches.open(CACHE_NAME)
							  .then((cache) => {
								  cache.put(event.request, responseToCache);
							  });

						return response;
					});
			})
	);
});
