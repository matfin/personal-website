import styled from 'styled-components';

import { ClosingTag as ClosingTagSVG } from '@components/svgicons';
import Text from '@components/text';

export const Container = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FooterText = styled(Text)`
  margin: 1rem 0;
`;

export const ClosingTag = styled(ClosingTagSVG)`
  width: 48px;
  height: 48px;
  fill: ${(props) => props.theme.colours.primary};
`;

export default Container;
