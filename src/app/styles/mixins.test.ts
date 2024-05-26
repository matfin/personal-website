import { describe, expect, it } from 'vitest';
import { css } from 'styled-components';

import { media, orientation } from './mixins';

const normalise = (str: string): string => str.replace(/\s+/g, ' ').trim();

describe('styled components mixins test', (): void => {
  const style = css`
    padding: 32px;
  `;

  it('should have the correct style for size media queries', (): void => {
    expect(normalise(media.sm(style))).toEqual(
      '@media (min-width: 320px){ padding: 32px; }',
    );
    expect(normalise(media.md(style))).toEqual(
      '@media (min-width: 768px){ padding: 32px; }',
    );
    expect(normalise(media.lg(style))).toEqual(
      '@media (min-width: 1024px){ padding: 32px; }',
    );
    expect(normalise(media.xl(style))).toEqual(
      '@media (min-width: 1280px){ padding: 32px; }',
    );
    expect(normalise(media.xxl(style))).toEqual(
      '@media (min-width: 1440px){ padding: 32px; }',
    );
  });

  it('should have the correct style for orientation media queries', (): void => {
    expect(normalise(orientation.landscape(style))).toEqual(
      '@media (orientation: landscape){ padding: 32px; }',
    );
    expect(normalise(orientation.portrait(style))).toEqual(
      '@media (orientation: portrait){ padding: 32px; }',
    );
  });
});
