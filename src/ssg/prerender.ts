import { generateSlugs } from '@ssg/content_loader';
import {
  generatePwaContent,
  generateStaticHTML,
  generateXMLSitemap,
} from '@ssg/content_renderer';
import { toAbsolute } from '@ssg/utils';

(async (): Promise<void> => {
  const config: Record<string, string | undefined> = {
    contentBase: process.env.CONTENT_BASE,
    canonicalUrl: process.env.CANONICAL_URL,
    enableCache: process.env.ENABLE_CACHE,
  };
  const slugs: string[] | null = await generateSlugs(
    toAbsolute(config.contentBase ?? './public/pages'),
  );

  await generateStaticHTML(slugs ?? [], config.enableCache === 'true');
  await generateXMLSitemap(slugs ?? [], config.canonicalUrl ?? '');
  await generatePwaContent(slugs ?? []);
})();
