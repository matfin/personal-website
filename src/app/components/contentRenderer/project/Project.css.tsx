import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colours } from '@styles/vars';
import { subHeadingTypography, textTypography } from '@styles/typography';

export const Container = styled(Link)`
  position: relative;
  display: block;
  color: ${colours.primary};
`;

export const Title = styled.h3`
  margin: 0 0 0.5rem;
  ${subHeadingTypography}
`;

export const Description = styled.p`
  ${textTypography}
`;
