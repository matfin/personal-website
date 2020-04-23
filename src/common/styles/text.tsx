import styled from 'styled-components';
import { fontSizes, letterSpacing, lineHeight } from './vars';

export const Heading = styled.h1`
  font-size: ${fontSizes.heading};
`;

export const SubHeading = styled.h2`
  font-size: ${fontSizes.subheading};
  letter-spacing: ${letterSpacing.subheading};
`;

export const Text = styled.p`
  font-size: ${fontSizes.text};
  letter-spacing: ${letterSpacing.text};
  line-height: ${lineHeight.text};
`;
