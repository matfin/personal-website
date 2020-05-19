import React from 'react';

export interface IProps {
  className?: string,
  text: string,
  title?: string,
  url: string,
};

export const InlineLink = ({ className, text, title, url }: IProps): JSX.Element => (
  <a className={className} href={url} title={title}>
    {text}
  </a>
);
