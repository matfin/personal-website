import * as React from 'react';
import { render, screen } from '@testing-library/react';
import Page, { IProps } from './Page';

const noop = (): void => {};
const defaultProps = {
  error: null,
  pending: false,
  page: {
    contents: [],
    description: 'Test page',
    slug: 'test-page',
    title: 'Test page'
  },
  slug: 'test-page',
  fetchPage: noop,
  resetPage: noop,
};

describe('Page tests', () => {
  it('renders the component', () => {
    const { container } = render(
      <Page {...defaultProps} />
    );

    expect(container).toBeTruthy();
  });

  it('fetches the page given a change in the slug', () => {
    const spyFetchPage = jest.fn();

    render(
      <Page
        {...defaultProps}
        fetchPage={spyFetchPage}
        slug="new-test-slug"
      />
    );

    expect(spyFetchPage).toHaveBeenCalled();
    expect(spyFetchPage).toHaveBeenCalledWith('new-test-slug');
  });

  it('renders the loading indicator', () => {
    const { container } = render(
      <Page {...defaultProps} pending />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Loading!')).toBeTruthy();
  });

  it('renders page content', () => {
    const { container } = render(
      <Page
        {...defaultProps}
        page={{
          ...defaultProps.page,
          contents: [
            {
              tagName: 'h1',
              content: 'Test heading'
            }
          ]
        }}
      />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test heading')).toBeTruthy();
  });

  it('renders an error message', () => {
    const { container } = render(
      <Page {...defaultProps} error="Test error" />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test error')).toBeTruthy();
  });
});
