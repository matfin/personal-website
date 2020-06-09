import styled, { css } from 'styled-components';
import {
  blackEmoji,
  subHeadingTypography,
  textTypography,
} from 'app/styles';

export const ProjectSt = styled.a`
  position: relative;
  display: block;
  margin: 1rem 0;
  padding: 0 0.5rem;

  &::after {
    display: flex;
    justify-content: center;
    margin: 1rem 0;
    ${blackEmoji};
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


