import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import CONFIG from '../global/CONFIG';

const CacheHelper = {
  async routeAPI() {
    registerRoute(
      ({ url }) => (
        url.href.includes(CONFIG.GRAPHQL_URL)
      ),
      new StaleWhileRevalidate({
        cacheName: CONFIG.CACHE_NAME.API,
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: CONFIG.CACHE_EXP,
          }),
        ],
      }),
    );
  },

  async routeImage() {
    registerRoute(
      ({ request }) => (
        request.destination === 'image'
      ),
      new CacheFirst({
        cacheName: CONFIG.CACHE_NAME.IMAGE,
        plugins: [
          new CacheableResponsePlugin({
            statuses: [0, 200],
          }),
          new ExpirationPlugin({
            maxAgeSeconds: CONFIG.CACHE_EXP,
          }),
        ],
      }),
    );
  },

  async deleteOldCache() {
    const cacheNames = await caches.keys();
    // eslint-disable-next-line consistent-return
    return cacheNames.forEach(async (cacheName) => {
      if (CONFIG.OLD_CACHE_NAME.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    });
  },
};

export default CacheHelper;
