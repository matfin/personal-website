import { renderWithRouter } from '@testutils';
import { describe, expect, it } from 'vitest';

import Nav from './index';

describe('Nav tests', (): void => {
  it('renders the component with children', (): void => {
    expect(renderWithRouter(<Nav />)).toBeTruthy();
  });
});
