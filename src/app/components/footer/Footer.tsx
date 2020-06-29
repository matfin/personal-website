import React from 'react';
import FooterSt, { ClosingTagSt } from './Footer.css';

export interface IProps {
  className?: string;
}

export const Footer = ({ className }: IProps) => (
  <FooterSt className={className}>
    <ClosingTagSt />
  </FooterSt>
);
