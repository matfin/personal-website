import { css, ThemedCssFunction } from 'styled-components';
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
  {} as { [key in keyof typeof sizes]: ThemedCssFunction<any> },
);

export default media;
