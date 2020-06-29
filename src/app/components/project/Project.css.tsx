import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colours, subHeadingTypography, textTypography } from 'app/styles';

export const ProjectSt = styled(Link)`
  position: relative;
  display: block;
  color: ${colours.primary};
`;

export const TitleSt = styled.h3`
  margin: 0 0 0.5rem;
  ${subHeadingTypography}
`;

export const DescriptionSt = styled.p`
  ${textTypography}
`;
