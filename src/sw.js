require('babel-polyfill')

const url = require('url')

const handleInstallCacheFiles = (event) => async function () {
  const cache = await caches.open('static-v1')

  try {
    await cache.addAll([
      '/Colorized/index.html',
      '/Colorized/offline.html',
      '/Colorized/index.js'
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

  console.log(urlRequest)

  switch (urlRequest.pathname) {
    case '/Colorized/':
    case '/Colorized/index.html': {
      return event.respondWith(caches.match('/Colorized/index.html'))
      break
    }
    case '/Colorized/index.js': {
      return event.respondWith(caches.match('/Colorized/index.js'))
      break
    }
  }
})
