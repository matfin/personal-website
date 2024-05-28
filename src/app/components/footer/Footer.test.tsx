import { describe, expect, it } from 'vitest';

import { renderWithTheme } from '@testutils';
import Footer from './index';

describe('Footer tests', (): void => {
  it('renders the component', (): void => {
    expect(renderWithTheme(<Footer />)).toBeTruthy();
  });
});
