import React from 'react';
import { Link } from 'react-router-dom';
import { isExternalUrl } from 'utils';

export interface Props {
  className?: string;
  text: string;
  title?: string;
  url: string;
}

const ExternalLink = ({
  className,
  text,
  title,
  url,
}: Props): React.ReactNode => (
  <a className={className} href={url} title={title} rel="external">
    {text}
  </a>
);

const InternalLink = ({
  className,
  text,
  title,
  url,
}: Props): React.ReactNode => (
  <Link className={className} title={title} to={url}>
    {text}
  </Link>
);

const InlineLink = ({ className, text, title, url }: Props): React.ReactNode =>
  isExternalUrl(url) ? (
    <ExternalLink className={className} text={text} title={title} url={url} />
  ) : (
    <InternalLink className={className} text={text} title={title} url={url} />
  );

export default InlineLink;
