import React from 'react';
import FooterSt, { ClosingTagSt, FooterTextSt } from './Footer.css';

export interface Props {
  className?: string;
}

const Footer = ({ className }: Props): React.ReactNode => (
  <FooterSt className={className}>
    <FooterTextSt>Made by a human</FooterTextSt>
    <ClosingTagSt />
  </FooterSt>
);

export default Footer;
