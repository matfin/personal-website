import { css } from 'styled-components';
import { sizes } from './vars';

export const media = (Object.keys(sizes) as (keyof typeof sizes)[]).reduce(
  (acc, label) => {
    acc[label] = (st: any): any => css`
      @media (min-width: ${sizes[label]}px) {
        ${st}
      }
    `;

    return acc;
  },
  {} as { [key in keyof typeof sizes]: any },
);

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
    content: "⚡";
  }
`;

export default media;
