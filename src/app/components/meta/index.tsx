import { getCanonicalUrl } from '@config';

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
    <meta charSet="UTF-8" />
    <title>{title}</title>
    <meta name="author" content="Matt Finucane" />
    <meta name="theme-color" content="#ecedef" />
    <meta name="description" content={description} />
    <meta property="og:site_name" content="mattfinucane.com" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en-IE" />
    <meta property="og:url" content={canonicalSlug(slug)} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <link rel="canonical" href={canonicalSlug(slug)} />
    <link rel="manifest" href="/manifest.json" />
    <meta
      name="apple-mobile-web-app-status-bar-style"
      content="black-translucent"
    />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, user-scalable=yes"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/images/icons/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      href="/images/icons/logo-32.png"
      sizes="16x16"
    />
    <link
      rel="icon"
      type="image/png"
      href="/images/icons/logo-32.png"
      sizes="32x32"
    />
    <link
      rel="icon"
      type="image/png"
      href="/images/icons/logo-128.png"
      sizes="128x128"
    />
    <link
      rel="icon"
      type="image/png"
      href="/images/icons/logo-192.png"
      sizes="192x192"
    />
    <link
      rel="icon"
      type="image/png"
      href="/images/icons/logo-196.png"
      sizes="196x196"
    />
  </>
);

export default Meta;
