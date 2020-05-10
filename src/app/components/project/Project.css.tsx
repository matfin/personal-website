import styled, { css } from 'styled-components';
import {
  colours,
  media,
  subHeadingTypography,
  textTypography,
} from 'app/styles';

export const ProjectSt = styled.a`
  position: relative;
  display: block;
  margin: 1rem 0;
  transition-property: transform;
  transition-duration: 100ms;

  &:hover {
    transform: scale3d(1.03, 1.03, 1.0);
  }

  ${media.md(css`
    &:hover {
      transform: scale3d(1.01, 1.01, 1.0);
    }
  `)};

  &::after {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    content: "⚡";
  }
`;

export const TitleSt = styled.h3`
  margin: 0.5rem 0;
  ${subHeadingTypography};
`;

export const DescriptionSt = styled.p`
  ${textTypography};
`;


