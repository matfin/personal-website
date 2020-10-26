import { css, FlattenSimpleInterpolation } from 'styled-components';
import { orientations, sizes } from './vars';

export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (st: string): FlattenSimpleInterpolation => css`
      @media (min-width: ${sizes[label]}px) {
        ${st}
      }
    `;

    return acc;
  },
  {} as { [key in keyof typeof sizes]: unknown }
);

export const orientation = (Object.keys(
  orientations
) as (keyof typeof orientations)[]).reduce((acc, label) => {
  acc[label] = (st: string): FlattenSimpleInterpolation => css`
    @media (orientation: ${orientations[label]}) {
      ${st}
    }
  `;

  return acc;
}, {} as { [key in keyof typeof orientations]: unknown });

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
