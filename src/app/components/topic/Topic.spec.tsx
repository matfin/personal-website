import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { Topic, IProps } from './Topic';

const defaultProps: IProps = {
  title: 'Test title'
};

describe('Topic tests', () => {
  it('renders the component', () => {
    const { container } = render(
      <Topic {...defaultProps} />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test title')).toBeTruthy();
  });
});
