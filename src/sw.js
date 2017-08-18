require('babel-polyfill')

const url = require('url')

const handleInstallCacheFiles = (event) => async function () {
  const cache = await caches.open('static-v1')

  try {
    await cache.addAll([
      './index.html',
      './offline.html',
      './index.js'
    ])
  } catch (ex) {}

  console.log('app is cached')
}

self.addEventListener('install', function (event) {
  event.waitUntil(handleInstallCacheFiles(event))
})

self.addEventListener('activate', function (event) {
})

self.addEventListener('fetch', function (event) {
  const urlRequest = url.parse(event.request.url)

  switch (urlRequest.pathname) {
    case '/': {
      return event.respondWith(caches.match('./index.html'))
      break
    }
    case '/index.js': {
      return event.respondWith(caches.match('./index.js'))
      break
    }
  }
})
