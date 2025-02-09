import { getCanonicalUrl } from '@config';
import { colours } from '@styles/vars';

export interface Props {
  description?: string;
  title?: string;
  slug?: string;
}

const canonicalSlug = (slug: string): string => {
  const canonicalUrl: string = getCanonicalUrl();

  return `${canonicalUrl}/${slug === 'index' ? '' : slug}`;
};

const Meta = ({ description, title, slug = '' }: Props): React.ReactNode => (
  <>
    <title>{title}</title>
    <meta name="theme-color" content={colours.secondary} />
    <meta name="description" content={description} />
    <meta property="og:url" content={canonicalSlug(slug)} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <link rel="canonical" href={canonicalSlug(slug)} />
  </>
);

export default Meta;
