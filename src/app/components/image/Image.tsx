import React from 'react';
import { sizes } from 'app/styles';

export interface IProps {
  className?: string,
  fileType: string,
  name: string,
  title: string,
}

export const Image = ({
  className,
  fileType,
  name,
  title,
}: IProps) => {
  const imgSrcset: string = `
    /images/${name}-sm.${fileType} 640w,
    /images/${name}-lg.${fileType} 1280w
  `;
  const imgSizes: string = `
    (max-width: ${sizes.md}px) 240px, 320px
  `;

  return (
    <img
      alt={title}
      className={className}
      data-testid="img"
      sizes={imgSizes}
      srcSet={imgSrcset}
      src={`/images/${name}-lg.${fileType}`}
    />
  );
};
