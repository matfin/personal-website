import { css } from 'styled-components';
import { media } from './mixins';
import {
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
} from './vars';

export const headingTypography = css`
  font-size: ${fontSize.heading}rem;
  font-weight: ${fontWeight.light};
  line-height: ${lineHeight.heading}rem;
  letter-spacing: ${letterSpacing.heading}rem;

  ${media.md(css`
    font-size: ${fontSize.heading * 1.5}rem;
    letter-spacing: ${letterSpacing.heading * 4}rem;
  `)}
`;

export const subHeadingTypography = css`
  font-size: ${fontSize.subheading}rem;
  font-weight: ${fontWeight.light};
  line-height: ${lineHeight.subheading}rem;
  letter-spacing: ${letterSpacing.subheading}rem;

  ${media.md(css`
    font-size: ${fontSize.subheading * 1.5}rem;
    line-height: ${lineHeight.subheading * 1.5}rem;
  `)}
`;

export const thirdHeadingTypography = css`
  font-size: ${fontSize.thirdHeading}rem;
  font-weight: ${fontWeight.normal};
  letter-spacing: ${letterSpacing.thirdHeading}rem;
  line-height: ${lineHeight.thirdHeading}rem;
`;

export const textTypography = css`
  font-size: ${fontSize.text}rem;
  font-weight: ${fontWeight.light};
  letter-spacing: ${letterSpacing.text}rem;
  line-height: ${lineHeight.text}rem;
`;
