import React from 'react';
import FooterSt, { ClosingTagSt } from './Footer.css';

export interface Props {
  className?: string;
}

const Footer = ({ className }: Props): JSX.Element => (
  <FooterSt className={className}>
    <ClosingTagSt />
  </FooterSt>
);

export default Footer;
