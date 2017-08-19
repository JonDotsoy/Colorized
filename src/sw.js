require('babel-polyfill')

const url = require('url')

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open('static-files-v2')
    .then(c => c.addAll([
      './index.html',
      './index.js'
    ]))
  )
})

self.addEventListener('activate', async function (event) {

  const cache = await caches.open('static-files-v2')

  console.log(await caches.keys())
  console.log(await cache.keys())

})

self.addEventListener('fetch', function (event) {
  const urlRequest = url.parse(event.request.url)

  console.log(urlRequest.pathname)

  switch (urlRequest.pathname) {
    case '/Colorized/':
    case '/Colorized/index.html': {
      return event.respondWith(caches.match('/Colorized/index.html')
        .then(res => {
          if (res) {
            return res
          }

          return fetch(event.request)
        })
      )
      break
    }
    case '/Colorized/index.js': {
      return event.respondWith(caches.match('/Colorized/index.js')
        .then(res => {
          if (res) {
            return res
          }

          return fetch(event.request)
        })
      )
      break
    }
  }

})
