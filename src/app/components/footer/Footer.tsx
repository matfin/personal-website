import React from 'react';

import Container, { ClosingTag, FooterText } from './Footer.css';

export interface Props {
  className?: string;
}

const Footer = ({ className }: Props): React.ReactNode => (
  <Container className={className}>
    <FooterText>Made by a human</FooterText>
    <ClosingTag />
  </Container>
);

export default Footer;
