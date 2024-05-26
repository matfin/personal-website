import fs from 'node:fs/promises';
import path from 'node:path';
import { HelmetServerState } from 'react-helmet-async';

import { toAbsolute } from './utils';
import { render } from '../../dist/static/entry-static.js';

interface Content {
  helmetContext: { helmet?: HelmetServerState };
  html: string;
  preloadedStateJSON: string;
  styleTags: string;
}

class ContentRenderer {
  static generateHTMLFromSlug = async (
    slug: string,
    htmlTemplate: string,
  ): Promise<string | null> => {
    try {
      const {
        helmetContext: { helmet },
        html,
        preloadedStateJSON,
        styleTags,
      }: Content = await render(`/${slug}`);
      const title: string = helmet?.title.toString() ?? '';
      const metaTags: string = helmet?.meta.toString() ?? '';
      const linkTags: string = helmet?.link.toString() ?? '';
      const contents: string = htmlTemplate
        .replace(`<!--title-->`, title)
        .replace(`<!--metatags-->`, metaTags)
        .replace(`<!--linktags-->`, linkTags)
        .replace(`<!--styletags-->`, styleTags)
        .replace(`<!--root-content-->`, html)
        .replace(
          `<!--preloadedstate-->`,
          `<script>window.preloadedState=${preloadedStateJSON}</script>`,
        );

      return contents;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  static generateStaticHTML = async (slugs: string[]): Promise<void> => {
    const htmlTemplate: string | null = await fs.readFile(
      toAbsolute('./dist/index.html'),
      {
        encoding: 'utf-8',
      },
    );

    for (const slug of slugs) {
      const slugContent: string | null =
        await ContentRenderer.generateHTMLFromSlug(slug, htmlTemplate);
      const filePath: string = toAbsolute(
        slug === 'index' ? `./dist/index.html` : `./dist/${slug}/index.html`,
      );

      const fileDir: string = path.dirname(filePath);

      await fs.mkdir(fileDir, { recursive: true });
      await fs.writeFile(filePath, slugContent ?? '', 'utf-8');
    }
  };

  static generateXMLSitemap = async (
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

    await fs.writeFile(
      toAbsolute('./dist/sitemap.xml'),
      parts.join(''),
      'utf-8',
    );
  };

  static generatePwaContent = async (slugs: string[]): Promise<void> =>
    await fs.writeFile(
      toAbsolute(`./dist/pwa.json`),
      JSON.stringify(slugs),
      'utf-8',
    );
}

export default ContentRenderer;
