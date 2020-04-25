import { css, ThemedCssFunction, FlattenSimpleInterpolation } from 'styled-components';
import { media } from './mixins';

describe('styled components mixins test', () => {
  it ('should have the correct style', () => {
    const style: FlattenSimpleInterpolation = css`
      padding: 32px;
    `;

    expect(
      media.sm(style as any)
    ).toEqual([
      '@media (min-width:',
      '320',
      'px){',
      'padding:32px;',
      '}'
    ]);
  });
});
