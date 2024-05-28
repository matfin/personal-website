import { describe, expect, it } from 'vitest';
import { renderWithRouter } from '@testutils';

import Nav from './index';

describe('Nav tests', (): void => {
  it('renders the component with children', (): void => {
    expect(renderWithRouter(<Nav />)).toBeTruthy();
  });
});
