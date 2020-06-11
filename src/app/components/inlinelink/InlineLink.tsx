import React from 'react';
import { Link } from 'react-router-dom';
import { isExternalUrl } from 'common/utils';

export interface IProps {
  className?: string,
  text: string,
  title?: string,
  url: string,
}

const ExternalLink = ({
  className,
  text,
  title,
  url,
}: IProps): JSX.Element => (
  <a className={className} href={url} title={title} rel="external">
    {text}
  </a>
);

const InternalLink = ({
  className,
  text,
  title,
  url,
}: IProps): JSX.Element => (
  <Link className={className} title={title} to={url}>
    {text}
  </Link>
);

export const InlineLink = ({
  className,
  text,
  title,
  url,
}: IProps): JSX.Element => (
  isExternalUrl(url)
    ? (
      <ExternalLink
        className={className}
        text={text}
        title={title}
        url={url}
      />
    ) : (
      <InternalLink
        className={className}
        text={text}
        title={title}
        url={url}
      />
    )
);
