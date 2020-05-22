import React from 'react';
import FooterSt from './Footer.css';
import closingtag from 'svg/closingtag.svg';

export interface IProps {
  className?: string
}

export const Footer = ({ className }: IProps) => (
  <FooterSt className={className}>
    <img src={closingtag} width="48" height="48" />
  </FooterSt>
);
