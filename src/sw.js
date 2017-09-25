require('babel-polyfill')

const debug = require('debug')

if (process.env.NODE_ENV !== 'production') {
  debug.enable('*')
  self.skipWaiting()
}

const log = debug('sw')

// const url = require('url')

const currentCacheVersion = `${process.env.npm_package_name}-${process.env.npm_package_version}-2`
const filesOnCache = [
  '/Colorized/',
  '/Colorized/index.js'
]

log('Current Cache key %s', currentCacheVersion)

const fnRun = (fn, ...args) => fn(...args)

self.addEventListener('install', function (event) {
  const log = debug('sw:install')

  event.waitUntil(fnRun(async () => {
    const cache = await caches.open(currentCacheVersion)

    await cache.addAll(filesOnCache)

    log(await cache.keys())
  }))
})

self.addEventListener('activate', function (event) {
  const log = debug('sw:activate')

  event.waitUntil(fnRun(async () => {
    log('remove obsolte cache')

    const cachesNames = (await caches.keys())
      .filter(cacheName =>
        cacheName.indexOf(process.env.npm_package_name) === 0 &&
        cacheName !== currentCacheVersion
      )

    for (const cacheName of cachesNames) {
      log(`delete ${cacheName} cache`)

      await caches.delete(cacheName)
    }
  }))
})

self.addEventListener('fetch', function (event) {
  event.respondWith(fnRun(async () => {
    // const urlRequest = url.parse(event.request.url)
    const request = event.request
    const response = await caches.match(request)

    if (response) {
      return response
    } else {
      return fetch(request)
    }
  }))
})
