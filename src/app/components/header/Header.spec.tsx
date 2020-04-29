import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header tests', () => {
  it('renders the component with children', () => {
    expect(
      render(
        <Header>
          <p data-testid="test">Test!</p>
        </Header>
      )
    ).toBeTruthy();

    expect(screen.getByTestId('test')).toBeTruthy();
  });
});
