const appIconSizes: number[] = [32, 48, 72, 96, 128, 144, 168, 192, 196, 512];
const cacheName: string = PWA_CACHE_NAME;
const appIconPaths: string[] = appIconSizes.map(
  (size: number) => `/images/icons/logo-${size}.png`,
);
const profilePicPaths: string[] = [
  '/images/profile-lg@1x.jpg',
  '/images/profile-lg@1x.webp',
  '/images/profile-lg@2x.jpg',
  '/images/profile-lg@2x.webp',
  '/images/profile-lg@3x.jpg',
  '/images/profile-lg@3x.webp',
  '/images/profile-sm@1x.jpg',
  '/images/profile-sm@1x.webp',
  '/images/profile-sm@2x.jpg',
  '/images/profile-sm@2x.webp',
  '/images/profile-sm@3x.jpg',
  '/images/profile-sm@3x.webp',
];
const assetUrls: string[] = [
  '/manifest.json',
  '/pwa.json',
  '/main.js',
  '/worker.js',
  '/swregister.js',
  ...appIconPaths,
  ...profilePicPaths,
];

const generatePaths = async (): Promise<string[]> => {
  const response: Response = await fetch('/pwa.json');
  const paths: string[] = await response.json();

  return paths;
};

const onActivate = (event: ExtendableEvent): void => {
  const cacheWhitelist = [cacheName];
  const clearCaches = (): Promise<undefined | boolean[]> =>
    caches.keys().then((cacheNames: string[]) =>
      Promise.all(
        cacheNames.map((name: string): Promise<boolean> => {
          if (!cacheWhitelist.includes(name)) {
            return caches.delete(name);
          }
          return Promise.resolve(false);
        }),
      ),
    );

  event.waitUntil([clearCaches()]);
};

const onInstall = (event: ExtendableEvent): void => {
  const preCache = async (): Promise<void> => {
    const cache: Cache = await caches.open(cacheName);
    const paths: string[] = await generatePaths();
    const items: string[] = [
      ...assetUrls,
      ...paths.map((path: string): string => `/pages/${path}.json`),
      ...paths.map(
        (path: string): string => `${path === 'index' ? '/' : `${path}/`}`,
      ),
    ];

    return cache.addAll(items);
  };

  event.waitUntil(preCache());
};

const onFetch = (event: FetchEvent): void => {
  event.respondWith(
    caches
      .match(event.request)
      .then(
        (response: Response | undefined) => response ?? fetch(event.request),
      ),
  );
};

self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('install', onInstall);
