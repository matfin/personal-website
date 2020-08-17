import React from 'react';
import FooterSt, { ClosingTagSt } from './Footer.css';

export interface IProps {
  className?: string;
}

const Footer = ({ className }: IProps): JSX.Element => (
  <FooterSt className={className}>
    <ClosingTagSt />
  </FooterSt>
);

export default Footer;
