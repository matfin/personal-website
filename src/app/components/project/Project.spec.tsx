import * as React from 'react';
import { screen } from '@testing-library/react';
import { renderWithRouter } from 'common/utils/testutils';
import Project, { Props } from './Project';

const defaultProps: Props = {
  description: 'Test project description',
  releaseDate: '2020-05-04',
  slug: 'test-slug',
  title: 'Test project title',
  topics: ['test-topic-1', 'test-topic-2'],
};

describe('Project tests', () => {
  it('renders the component with the correct content', () => {
    const { container } = renderWithRouter(<Project {...defaultProps} />);

    expect(container).toBeTruthy();
    expect(screen.getByText('Test project title')).toBeTruthy();
    expect(screen.getByText('Test project description')).toBeTruthy();
    expect(container.getElementsByTagName('a')[0].href).toEqual(
      'http://test-slug/'
    );
  });
});
