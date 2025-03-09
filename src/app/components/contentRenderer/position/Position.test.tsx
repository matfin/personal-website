import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Position, { type Props } from './index';

const defaultProps: Props = {
  company: 'Test company',
  location: 'Test location',
  role: 'Test role',
  startDate: '2020-01-01',
  tasks: ['Task one', 'Task two'],
  topics: [
    {
      category: 'languages',
      description: 'Test description',
      slug: 'test-language',
      title: 'TestLanguage',
      deprecated: false,
    },
    {
      category: 'tools',
      description: 'Test description',
      slug: 'test-tool',
      title: 'TestTool',
      deprecated: false,
    },
  ],
};

describe('Position tests', (): void => {
  it('renders the component with the correct content', () => {
    const { container } = render(<Position {...defaultProps} />);

    expect(container).toBeTruthy();
    expect(screen.getByText('January 2020')).toBeTruthy();
    expect(screen.getByText('to present')).toBeTruthy();
    expect(screen.getByText('Test company')).toBeTruthy();
    expect(screen.getByText('Test role / Test location')).toBeTruthy();
    expect(screen.getByText('Task one')).toBeTruthy();
    expect(screen.getByText('Task two')).toBeTruthy();
  });

  it('renders the end date', (): void => {
    const { container } = render(
      <Position {...defaultProps} endDate="2020-04-26" />,
    );

    expect(container).toBeTruthy();
    expect(screen.queryByText('to present')).toBeFalsy();
    expect(screen.getByText('April 2020')).toBeTruthy();
  });
});
