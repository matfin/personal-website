import React from 'react';

export interface Props {
  className?: string;
  primaryFill?: string;
  secondaryFill?: string;
}

export const LoadingSpinner = ({ className }: Props): React.ReactNode => (
  <svg
    className={className}
    version="1.1"
    id="Layer_2"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    viewBox="0 0 64 64"
    xmlSpace="preserve"
  >
    <g>
      <path d="M32 0c-17.673 0-32 14.327-32 32s14.327 32 32 32 32-14.327 32-32-14.327-32-32-32zM32 16c8.837 0 16 7.163 16 16s-7.163 16-16 16-16-7.163-16-16 7.163-16 16-16zM51.092 51.092c-5.1 5.1-11.88 7.908-19.092 7.908s-13.992-2.809-19.092-7.908-7.908-11.88-7.908-19.092c0-7.212 2.809-13.992 7.908-19.092l4.243 4.243c0 0 0 0 0 0-8.188 8.188-8.188 21.511 0 29.698 3.966 3.966 9.24 6.151 14.849 6.151s10.883-2.184 14.849-6.151c8.188-8.188 8.188-21.511 0-29.698l4.243-4.243c5.1 5.1 7.908 11.88 7.908 19.092s-2.809 13.992-7.908 19.092z" />
    </g>
  </svg>
);

export const ClosingTag = ({ className }: Props): React.ReactNode => (
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
