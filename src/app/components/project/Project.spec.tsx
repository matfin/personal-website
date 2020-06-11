import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Project, IProps } from './Project';

const defaultProps: IProps = {
  description: 'Test project description',
  url: 'https://test.dev',
  releaseDate: '2020-05-04',
  slug: 'test-slug',
  title: 'Test project title',
  topics: [
    'test-topic-1',
    'test-topic-2',
  ],
};

describe('Project tests', () => {
  it('renders the component with the correct content', () => {
    const { container } = render(
      <Project {...defaultProps} />,
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test project title')).toBeTruthy();
    expect(screen.getByText('Test project description')).toBeTruthy();
    expect(container.getElementsByTagName('a')[0].href).toEqual('https://test.dev/');
  });
});
