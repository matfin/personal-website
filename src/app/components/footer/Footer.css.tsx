import styled from 'styled-components';
import { fontSize } from 'app/styles';

export const FooterSt = styled.footer`
  display: flex;
  align-items: center;
`;

export const FooterLink = styled.a`
  font-size: ${fontSize.small};
  padding-left: 1em;
`;

export default FooterSt;
