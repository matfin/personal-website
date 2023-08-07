import { css, FlattenSimpleInterpolation } from 'styled-components';
import { Orientation } from 'models';
import { sizes } from './vars';

export const sizeQuery = (
  minWidth: number,
  css: FlattenSimpleInterpolation,
): string => `@media (min-width: ${minWidth}px){${css}}`;

export const orientationQuery = (
  orientation: Orientation,
  css: FlattenSimpleInterpolation,
): string => `@media (orientation: ${orientation}){${css}}`;

export const media = {
  sm: (css: FlattenSimpleInterpolation): string => sizeQuery(sizes.sm, css),
  md: (css: FlattenSimpleInterpolation): string => sizeQuery(sizes.md, css),
  lg: (css: FlattenSimpleInterpolation): string => sizeQuery(sizes.lg, css),
  xl: (css: FlattenSimpleInterpolation): string => sizeQuery(sizes.xl, css),
  xxl: (css: FlattenSimpleInterpolation): string => sizeQuery(sizes.xxl, css),
};

export const orientation = {
  landscape: (css: FlattenSimpleInterpolation): string =>
    orientationQuery(Orientation.LANDSCAPE, css),
  portrait: (css: FlattenSimpleInterpolation): string =>
    orientationQuery(Orientation.PORTRAIT, css),
};

export const blackEmoji = css`
  color: transparent;
  text-shadow: 0 0 0 ${(props) => props?.theme?.colours?.primary};
`;

export const listItemStyle = css`
  position: relative;
  padding-left: 1.5rem;
  margin: 0.5rem 0;

  &::before {
    position: absolute;
    ${blackEmoji}
    font-size: 0.75rem;
    left: 0;
    content: '⚡';
  }
`;

export default media;
