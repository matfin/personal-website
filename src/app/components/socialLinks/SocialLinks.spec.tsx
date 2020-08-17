import React from 'react';
import { render } from '@testing-library/react';
import SocialLinks from './SocialLinks';

describe('SocialLinks tests', () => {
  it('renders the component', () => {
    expect(render(<SocialLinks />)).toBeTruthy();
  });
});
