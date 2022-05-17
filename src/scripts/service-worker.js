/* eslint-disable no-restricted-globals */
import 'regenerator-runtime';
import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';
import CacheHelper from './utils/CacheHelper';

self.skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

CacheHelper.routeAPI();
CacheHelper.routeImage();

self.addEventListener('activate', (event) => {
  event.waitUntil(CacheHelper.deleteOldCache());
});
