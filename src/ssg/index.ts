import { promises as fs } from 'fs';
import { getCanonicalUrl, getContentBase, getOutputDir } from '../config';
import { Page } from '@models';
import SSGController from './SSGController';

const generateSlugs = async (base: string): Promise<string[]> => {
  let gathered: string[] = [];
  const files: string[] = await fs.readdir(base);

  await Promise.all(
    files.map(async (file: string): Promise<void> => {
      const isDir: boolean = (await fs.stat(`${base}/${file}`)).isDirectory();

      if (isDir) {
        const curr: string[] = await generateSlugs(`${base}/${file}`);

        gathered = [...gathered, ...curr];
      } else {
        const path = `${base}/${file}`;
        const contents: string = (await fs.readFile(path)).toString();
        const { slug }: Page = JSON.parse(contents);

        gathered.push(slug);
      }
    }),
  );

  return gathered;
};

const generateStaticContent = async (
  path: string,
  slugs: string[],
): Promise<void> => {
  const generator: SSGController = new SSGController();
  // recreate
  await fs.mkdir(path, { recursive: true });

  // generate HTML from slugs
  slugs.forEach(async (slug: string): Promise<void> => {
    const staticHtml: string | null = await generator.generate(`/${slug}`);

    if (slug === 'index') {
      await fs.writeFile(`${path}/index.html`, staticHtml ?? '', 'utf-8');
    } else {
      await fs.mkdir(`${path}/${slug}`, { recursive: true });
      await fs.writeFile(
        `${path}/${slug}/index.html`,
        staticHtml ?? '',
        'utf-8',
      );
    }
  });
};

const generateSitemap = async (
  path: string,
  slugs: string[],
): Promise<void> => {
  const canonicalUrl: string = getCanonicalUrl();
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

  return await fs.writeFile(`${path}/sitemap.xml`, parts.join(''), 'utf-8');
};

const generatePwaContent = async (
  path: string,
  slugs: string[],
): Promise<void> =>
  await fs.writeFile(`${path}/pwa.json`, JSON.stringify(slugs), 'utf-8');

const run = async (): Promise<void> => {
  const contentBase: string = getContentBase();
  const outputDir: string = getOutputDir();
  const slugs = await generateSlugs(contentBase);

  try {
    await generateStaticContent(outputDir, slugs);
    await generatePwaContent(outputDir, slugs);
    await generateSitemap(outputDir, slugs);

    console.info(
      `Regenerated static content from: ${contentBase} to: ${outputDir}`,
    );
  } catch (error) {
    console.error(error);
  }
};

run();
