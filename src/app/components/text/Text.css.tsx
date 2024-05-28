import styled from 'styled-components';

import {
  headingTypography,
  subHeadingTypography,
  thirdHeadingTypography,
  textTypography,
} from '@styles/typography';

export const MainHeading = styled.h1`
  ${headingTypography}

  padding-right: 3rem;
`;

export const SubHeading = styled.h2`
  ${subHeadingTypography}

  padding: 1rem 0;
`;

export const ThirdHeading = styled.h4`
  ${thirdHeadingTypography}
`;

export const NormalText = styled.span`
  ${textTypography}

  margin: 1rem 0;
`;
