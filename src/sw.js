require('babel-polyfill')

const debug = require('debug')

if (process.env.NODE_ENV !== 'production') {
  debug.enable('*')
  self.skipWaiting()
}

const log = debug('sw')

// const url = require('url')

const currentCacheVersion = `${process.env.npm_package_name}-${process.env.npm_package_version}-3`
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

    log('Files cached %o', await cache.keys())
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

    const removeCacheFile = async cacheName => {
      if (await caches.has(cacheName)) {
        log(`delete ${cacheName} cache`)
        return await caches.delete(cacheName)
      }
    }

    for (const cacheName of cachesNames) {
      await removeCacheFile(cacheName)
    }

    // Other caches
    await removeCacheFile('static-files-v2')
    await removeCacheFile('static-v1')
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
