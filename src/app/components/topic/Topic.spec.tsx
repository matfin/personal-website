import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Topic, { Props } from './Topic';

const defaultProps: Props = {
  category: 'Test category',
  description: 'Test description',
  slug: 'test-slug',
  title: 'Test title',
};

describe('Topic tests', () => {
  it('renders the component', () => {
    const { container } = render(<Topic {...defaultProps} />);

    expect(container).toBeTruthy();
    expect(screen.getByText('Test title')).toBeTruthy();
  });
});
