import { describe, expect, it } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWithTheme } from '@testutils';
import Text, { Props } from './Text';

const defaultProps: Props = {
  as: 'p',
  children: 'Some text',
};

describe('Text', (): void => {
  it('renders text in a main heading', (): void => {
    renderWithTheme(<Text {...defaultProps} as="h1" />);

    expect(screen.getByRole('heading')).not.toBeNull();
    expect(screen.getByText('Some text')).not.toBeNull();
  });

  it('renders text in a sub heading', (): void => {
    renderWithTheme(<Text {...defaultProps} as="h2" />);

    expect(screen.getByRole('heading')).not.toBeNull();
    expect(screen.getByText('Some text')).not.toBeNull();
  });

  it('renders text of any other type', (): void => {
    renderWithTheme(<Text {...defaultProps} as="p" />);

    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByText('Some text')).not.toBeNull();
  });
});
