import React from 'react';
import { render } from '@testing-library/react';

import Footer from './Footer';

describe('Footer tests', (): void => {
  it('renders the component', (): void => {
    expect(render(<Footer />)).toBeTruthy();
  });
});
