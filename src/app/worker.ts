import { apiCall } from 'common/utils';
import Config from 'common/config';

declare const self: ServiceWorkerGlobalScope;

const { appIconSizes, cacheName } = Config;
const appIconPaths: string[] = appIconSizes.map((size: number) => `images/icons/logo-${size}.png`);
const urlsToCache = [
  '/',
  'meta/manifest.json',
  'main.bundle.js',
  'worker.bundle.js',
  ...appIconPaths,
];

const fetchStoryUrls = async (): Promise<string[]> => {
  try {
    const response = await apiCall('/content/stories');
    const data = await response.json();
    const urls = data.map(({ slug }: any): string => `/story/${slug}`);

    return Promise.resolve(urls);
  } catch (error) {
    return Promise.resolve([]);
  }
};

const onInstall = (event: ExtendableEvent): void => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);
    const storyUrls = await fetchStoryUrls();

    return cache.addAll(
      [...urlsToCache, ...storyUrls],
    );
  };

  event.waitUntil(preCache());
};

const onFetch = (event: FetchEvent): void => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response: any) => response ?? fetch(event.request)),
  );
};

const onActivate = (event: ExtendableEvent): void => {
  const cacheWhitelist = [cacheName];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames: any[]) => Promise.all(
        cacheNames.map((name: string): Promise<boolean> => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
          return Promise.resolve(false);
        }),
      )),
  );
};

self.addEventListener('install', onInstall);
self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
