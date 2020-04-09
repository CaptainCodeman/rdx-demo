import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { createHandlerBoundToURL, cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
// import { initialize as initializeOfflineAnalytics } from 'workbox-google-analytics';
import { NavigationRoute, registerRoute } from 'workbox-routing';
import { setCacheNameDetails, skipWaiting } from 'workbox-core';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

declare global {
  interface Window {
    __WB_MANIFEST: any
  }
  interface Element { }
}

setCacheNameDetails({
  prefix: 'rdx-demo',
  suffix: 'v1',
  precache: 'rdx-demo-precache',
  runtime: 'rdx-demo-runtime',
  googleAnalytics: 'rdx-demo-ga',
});

precacheAndRoute(self.__WB_MANIFEST);

const handler = createHandlerBoundToURL('/index.html');
const navigationRoute = new NavigationRoute(handler, {
  allowlist: [],
  denylist: [/^\/__\//, /^\/api\//],
});
registerRoute(navigationRoute);

cleanupOutdatedCaches();

registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  new StaleWhileRevalidate({
    cacheName: 'font-stylesheets',
  })
);

registerRoute(
  /^https:\/\/\w+\.gstatic\.com/,
  new CacheFirst({
    cacheName: 'gstatic',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
      }),
    ],
  })
);

registerRoute(
  /\.(?:png|gif|jpg|jpeg|webp|svg)$/,
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  })
);

// setCatchHandler(new NetworkOnly());

// initializeOfflineAnalytics();

skipWaiting();