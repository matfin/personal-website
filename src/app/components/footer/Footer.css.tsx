import styled from 'styled-components';
import { ClosingTag } from 'app/components/svgicons';

export const FooterSt = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ClosingTagSt = styled(ClosingTag)`
  width: 48px;
  height: 48px;
  fill: ${(props) => props?.theme?.colours?.primary};
`;

export default FooterSt;
