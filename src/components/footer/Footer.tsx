import React from 'react';
import FooterSt, { FooterLink } from './Footer.css';

export interface IProps {
  className?: string
}

const Footer = ({ className }: IProps) => (
  <FooterSt className={className}>
    <FooterLink href="https://mattfinucane.com">
      Little stories by Matt Finucane
    </FooterLink>
  </FooterSt>
);

export default Footer;
