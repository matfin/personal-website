import fs from 'node:fs/promises';
import path from 'node:path';
import { render } from '@ssg/entry-static';
import { toAbsolute } from './utils';

export const generateStaticHTML = async (
  slugs: string[],
  withServiceWorker = false,
): Promise<void> => {
  for (const slug of slugs) {
    try {
      const slugContent: string = await render(slug, withServiceWorker);
      const filePath: string = toAbsolute(
        slug === 'index' ? './dist/index.html' : `./dist/${slug}/index.html`,
      );

      const fileDir: string = path.dirname(filePath);

      await fs.mkdir(fileDir, { recursive: true });
      await fs.writeFile(filePath, slugContent ?? '', 'utf-8');
    } catch (e) {
      console.error({
        error: e,
        message: `Unable to generate static content for: ${slug}`,
      });
    }
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
