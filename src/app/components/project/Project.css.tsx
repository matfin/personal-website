import styled, { css } from 'styled-components';
import {
  animationCurve,
  colours,
  media,
  subHeadingTypography,
  textTypography,
} from 'app/styles';

export const ProjectSt = styled.a`
  position: relative;
  display: block;
  margin: 1rem 0;
  padding: 0 0.5rem;
  transition: all 200ms ${animationCurve};
  transition-property: background-color colour;

  &:hover {
    background-color: ${colours.primary};
    color: ${colours.secondary};
  }

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


