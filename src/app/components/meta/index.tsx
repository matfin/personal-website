import { Helmet } from 'react-helmet-async';

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
  <Helmet>
    <title>{title}</title>
    <meta name="theme-color" content={colours.secondary} />
    <meta name="description" content={description} />
    <meta property="og:url" content={canonicalSlug(slug)} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:url" content={canonicalSlug(slug)} />
    <meta name="twitter:description" content={description} />
    <link rel="canonical" href={canonicalSlug(slug)} />
  </Helmet>
);

export default Meta;
