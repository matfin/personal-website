import { toAbsolute } from '@ssg/utils';
import ContentLoader from '@ssg/ContentLoader';
import ContentRenderer from '@ssg/ContentRenderer';

(async (): Promise<void> => {
  const config: Record<string, string | undefined> = {
    contentBase: process.env.CONTENT_BASE,
    canonicalUrl: process.env.CANONICAL_URL,
    enableCache: process.env.ENABLE_CACHE,
  };
  const slugs: string[] | null = await ContentLoader.generateSlugs(
    toAbsolute(config.contentBase ?? './public/pages'),
  );

  await ContentRenderer.generateStaticHTML(
    slugs ?? [],
    config.enableCache === 'true',
  );
  await ContentRenderer.generateXMLSitemap(
    slugs ?? [],
    config.canonicalUrl ?? '',
  );
  await ContentRenderer.generatePwaContent(slugs ?? []);
})();
