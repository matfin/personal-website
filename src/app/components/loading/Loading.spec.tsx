import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

describe('Loading tests', () => {
  it('renders the component', () => {
    expect(render(<Loading />)).toBeTruthy();
  });
});
