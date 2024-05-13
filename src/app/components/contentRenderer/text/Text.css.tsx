import styled from 'styled-components';

import {
  headingTypography,
  subHeadingTypography,
  textTypography,
} from '@styles';

export const MainHeading = styled.h1`
  ${headingTypography}

  padding-right: 3rem;
`;

export const SubHeading = styled.h2`
  ${subHeadingTypography}

  padding: 1rem 0;
`;

export const NormalText = styled.span`
  ${textTypography}

  margin: 1rem 0;
`;
