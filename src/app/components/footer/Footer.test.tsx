import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';

import Footer from './index';

describe('Footer tests', (): void => {
  it('renders the component', (): void => {
    expect(render(<Footer />)).toBeTruthy();
  });
});
