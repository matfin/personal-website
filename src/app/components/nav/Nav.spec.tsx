import React from 'react';
import { renderWithRouter } from 'common/utils/testutils';
import { Nav } from './Nav';

describe('Nav tests', () => {
  it('renders the component with children', () => {
    expect(
      renderWithRouter(
        <Nav />,
      ),
    ).toBeTruthy();
  });
});
