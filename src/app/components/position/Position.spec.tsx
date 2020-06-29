import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Position, IProps } from './Position';

const defaultProps: IProps = {
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
    },
    {
      category: 'tools',
      description: 'Test description',
      slug: 'test-tool',
      title: 'TestTool',
    },
  ],
};

describe('Position tests', () => {
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

  it('renders the end date', () => {
    const { container } = render(
      <Position {...defaultProps} endDate="2020-04-26" />
    );

    expect(container).toBeTruthy();
    expect(screen.queryByText('to present')).toBeFalsy();
    expect(screen.getByText('to April 2020')).toBeTruthy();
  });
});
