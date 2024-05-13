import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Topic, { Props } from './Topic';

const defaultProps: Props = {
  category: 'Test category',
  description: 'Test description',
  slug: 'test-slug',
  title: 'Test title',
  deprecated: false,
};

describe('Topic tests', (): void => {
  it('renders the component', (): void => {
    const { container } = render(<Topic {...defaultProps} />);

    expect(container).toBeTruthy();
    expect(screen.getByText('Test title')).toBeTruthy();
  });
});
