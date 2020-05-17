import React from 'react';
import { colours } from 'app/styles';
import { Helmet } from 'react-helmet';
import config from 'common/config';

export interface IProps {
  description: string,
  title: string,
  slug?: string,
}

export const Meta = ({ description, title, slug = '' }: IProps): JSX.Element => (
  <Helmet>
    <title>{title}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes" />
    <meta name="theme-color" content={colours.secondary} />
    <meta name="description" content={description} />
    <meta name="author" content="Matt Finucane" />
    <link rel="canonical" href={`${config.baseUrl}/${slug}`} />

    <meta property="og:url" content={`${config.baseUrl}/${slug}`} />
    <meta property="og:site_name" content="mattfinucane.com" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en-IE" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />

    <meta name="twitter:site" content="@matfinucane" />
    <meta name="twitter:creator" content="@matfinucane" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:url" content={`${config.baseUrl}/${slug}`} />
    <meta name="twitter:description" content={description} />
  </Helmet>
);
