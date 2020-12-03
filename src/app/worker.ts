import { getAppIconSizes, getCacheName } from 'common/config';

declare const self: ServiceWorkerGlobalScope;

const appIconSizes: number[] = getAppIconSizes();
const cacheName: string = getCacheName();
const appIconPaths: string[] = appIconSizes.map(
  (size: number) => `/images/icons/logo-${size}.png`
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
  '/scripts/main.bundle.js',
  ...appIconPaths,
  ...profilePicPaths,
];
const pageUrls: string[] = ['/', '/about', '/cv', '/projects', '/now'];
const projects: string[] = [
  'projects/time-complexity-analysis',
  'projects/react-performance-demo',
  'projects/web-components',
  'projects/cinematt-nextjs',
  'projects/personal-portfolio',
  'projects/heycar',
  'projects/cinematt',
  'projects/personal-portfolio-static',
  'projects/profitbricks-community',
  'projects/spc-community',
  'projects/meteor-contentful',
  'projects/slider',
  'projects/tunedin',
  'projects/guh-guidelines',
  'projects/ibox-tv',
  'projects/ero',
];
const pageSlugs: string[] = ['home', 'about', 'cv', 'projects', 'now'];

const onActivate = (event: ExtendableEvent): void => {
  const cacheWhitelist = [cacheName];
  const clearCaches = (): Promise<void | boolean[]> =>
    caches.keys().then((cacheNames: string[]) =>
      Promise.all(
        cacheNames.map(
          (name: string): Promise<boolean> => {
            if (!cacheWhitelist.includes(name)) {
              return caches.delete(name);
            }
            return Promise.resolve(false);
          }
        )
      )
    );

  event.waitUntil([clearCaches()]);
};

const onInstall = (event: ExtendableEvent): void => {
  const preCache = async () => {
    const cache = await caches.open(cacheName);

    return cache.addAll([
      ...assetUrls,
      ...pageUrls,
      ...projects,
      ...projects.map((slug: string) => `/content/page/${slug}`),
      ...pageSlugs.map((slug: string) => `/content/page/${slug}`),
    ]);
  };

  event.waitUntil(preCache());
};

const onFetch = (event: FetchEvent): void => {
  event.respondWith(
    caches
      .match(event.request)
      .then(
        (response: Response | undefined) => response ?? fetch(event.request)
      )
  );
};

self.addEventListener('activate', onActivate);
self.addEventListener('fetch', onFetch);
self.addEventListener('install', onInstall);
