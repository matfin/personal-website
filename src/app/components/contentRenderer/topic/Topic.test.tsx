import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Topic, { type Props } from './index';

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
