import React from 'react';

export interface IProps {
  className?: string;
  primaryFill?: string;
  secondaryFill?: string;
}

export const ClosingTag = ({ className }: IProps): JSX.Element => (
  <svg
    className={className}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 53 37"
    xmlSpace="preserve"
  >
    <g>
      <g>
        <path d="M0.8,19.5v-2.4l13.8-7v2.5L3.7,18.3l10.9,5.7v2.5L0.8,19.5z" />
      </g>
      <g>
        <path d="M52.2,19.5l-13.8,7.1v-2.5l10.9-5.7l-10.9-5.7v-2.5l13.8,7V19.5z" />
      </g>
      <g>
        <path d="M32,0h2.4L22.9,36.9h-2.5L32,0z" />
      </g>
    </g>
  </svg>
);
