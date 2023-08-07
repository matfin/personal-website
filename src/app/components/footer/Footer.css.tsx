import styled from 'styled-components';
import { ClosingTag } from 'app/components/svgicons';

export const FooterSt = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterTextSt = styled.p`
  margin: 1rem 0;
`;

export const ClosingTagSt = styled(ClosingTag)`
  width: 48px;
  height: 48px;
  fill: ${(props) => props?.theme?.colours?.primary};
`;

export default FooterSt;
