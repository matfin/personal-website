import fs from 'node:fs/promises';
import path from 'node:path';
import type { HelmetServerState } from 'react-helmet-async';

import { toAbsolute } from './utils';
import { render } from '../../dist/static/entry-static.js';

interface Content {
  helmetContext: { helmet?: HelmetServerState };
  html: string;
  preloadedStateJSON: string;
  styleTags: string;
}

export const generateHTMLFromSlug = async (
  slug: string,
  htmlTemplate: string,
  withServiceWorker = false,
): Promise<string | null> => {
  try {
    const {
      helmetContext: { helmet },
      html,
      preloadedStateJSON,
      styleTags,
    }: Content = await render(`/${slug}`);
    const cspNonce: string = crypto.randomUUID();
    const cspTag: string = `
      <meta
        http-equiv="Content-Security-Policy"
        content="default-src 'self'; img-src 'self'; style-src 'unsafe-inline'; script-src 'self' 'nonce-${cspNonce}'; child-src 'self';"
      />
    `;
    const title: string = helmet?.title.toString() ?? '';
    const metaTags: string = helmet?.meta.toString() ?? '';
    const linkTags: string = helmet?.link.toString() ?? '';
    const contents: string = htmlTemplate
      .replace('<!--contentsecurity-->', cspTag)
      .replaceAll('%NONCE%', cspNonce)
      .replace('<!--title-->', title)
      .replace('<!--metatags-->', metaTags)
      .replace('<!--linktags-->', linkTags)
      .replace('<!--styletags-->', styleTags)
      .replace('<!--root-content-->', html)
      .replace(
        '<!--swregister-->',
        withServiceWorker ? `<script src="/swregister.js"></script>` : '',
      )
      .replace(
        '<!--preloadedstate-->',
        `<script nonce="${cspNonce}">window.preloadedState=${preloadedStateJSON}</script>`,
      );

    return contents;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const generateStaticHTML = async (
  slugs: string[],
  withServiceWorker = false,
): Promise<void> => {
  const htmlTemplate: string | null = await fs.readFile(
    toAbsolute('./dist/index.html'),
    {
      encoding: 'utf-8',
    },
  );

  for (const slug of slugs) {
    const slugContent: string | null = await generateHTMLFromSlug(
      slug,
      htmlTemplate,
      withServiceWorker,
    );
    const filePath: string = toAbsolute(
      slug === 'index' ? './dist/index.html' : `./dist/${slug}/index.html`,
    );

    const fileDir: string = path.dirname(filePath);

    await fs.mkdir(fileDir, { recursive: true });
    await fs.writeFile(filePath, slugContent ?? '', 'utf-8');
  }
};

export const generateXMLSitemap = async (
  slugs: string[],
  canonicalUrl: string,
): Promise<void> => {
  const parts: string[] = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
  ];

  parts.push(
    ...slugs.map((slug: string): string =>
      `
    <url>
      <loc>${canonicalUrl}/${slug === 'index' ? '' : slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>
  `.trim(),
    ),
  );
  parts.push('</urlset>');

  await fs.writeFile(toAbsolute('./dist/sitemap.xml'), parts.join(''), 'utf-8');
};

export const generatePwaContent = async (slugs: string[]): Promise<void> =>
  await fs.writeFile(
    toAbsolute('./dist/pwa.json'),
    JSON.stringify(slugs),
    'utf-8',
  );
