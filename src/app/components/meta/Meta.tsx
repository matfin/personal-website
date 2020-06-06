import React from 'react';
import { Helmet } from 'react-helmet';
import config from 'common/config';
import { colours } from 'app/styles/vars';

export interface IProps {
  description: string,
  title: string,
  slug?: string,
}

export const Meta = ({ description, title, slug = '' }: IProps): JSX.Element => (
  <Helmet>
    <title>{title}</title>
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
    <meta name="theme-color" content={colours.secondary} />
    <meta name="description" content={description} />
    <meta name="author" content="Matt Finucane" />
    <link rel="canonical" href={`${config.canonicalUrl}/${slug}`} />
    <link rel="manifest" href="/manifest.json" />

    <meta property="og:url" content={`${config.canonicalUrl}/${slug}`} />
    <meta property="og:site_name" content="mattfinucane.com" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en-IE" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />

    <meta name="twitter:site" content="@matfinucane" />
    <meta name="twitter:creator" content="@matfinucane" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:url" content={`${config.canonicalUrl}/${slug}`} />
    <meta name="twitter:description" content={description} />

    <link rel="apple-touch-icon" sizes="180x180" href="/images/icons/apple-touch-icon.png" />
    <link rel="icon" type="image/png" href="/images/icons/logo-32.png" sizes="16x16" />
    <link rel="icon" type="image/png" href="/images/icons/logo-32.png" sizes="32x32" />
    <link rel="icon" type="image/png" href="/images/icons/logo-128.png" sizes="128x128" />
    <link rel="icon" type="image/png" href="/images/icons/logo-192.png" sizes="192x192" />
    <link rel="icon" type="image/png" href="/images/icons/logo-196.png" sizes="196x196" />
  </Helmet>
);
