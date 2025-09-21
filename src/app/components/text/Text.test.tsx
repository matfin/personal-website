import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Text, { type Props } from './index';

const defaultProps: Props = {
  type: 'p',
  children: 'Some text',
};

describe('Text', (): void => {
  it('renders text in a main heading', (): void => {
    render(<Text {...defaultProps} type="h1" />);

    expect(screen.getByRole('heading')).not.toBeNull();
    expect(screen.getByText('Some text')).not.toBeNull();
  });

  it('renders text in a sub heading', (): void => {
    render(<Text {...defaultProps} type="h2" />);

    expect(screen.getByRole('heading')).not.toBeNull();
    expect(screen.getByText('Some text')).not.toBeNull();
  });

  it('renders text of any other type', (): void => {
    render(<Text {...defaultProps} type="p" />);

    expect(screen.queryByRole('heading')).toBeNull();
    expect(screen.getByText('Some text')).not.toBeNull();
  });
});
