import styled from 'styled-components';
import { fontSizes } from 'app/styles';

export const FooterSt = styled.footer`
  display: flex;
  align-items: center;
  padding: 0 30px;
`;

export const FooterLink = styled.a`
  font-size: ${fontSizes.small};
`;

export default FooterSt;
