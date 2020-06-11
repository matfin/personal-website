import styled from 'styled-components';
import {
  subHeadingTypography,
  textTypography,
} from 'app/styles';

export const ProjectSt = styled.a`
  position: relative;
  display: block;
  margin: 1rem 0 2rem;
`;

export const TitleSt = styled.h3`
  margin: 0.5rem 0;
  ${subHeadingTypography}
`;

export const DescriptionSt = styled.p`
  ${textTypography}
`;
