import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

describe('Footer tests', () => {
  it('renders the component', () => {
    expect(render(<Footer />)).toBeTruthy();
  });
});
