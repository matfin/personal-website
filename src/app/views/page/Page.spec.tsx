import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import { renderWithRouter } from 'common/utils/testutils';
import Page, { IProps } from './Page';

const noop = (): void => {};
const defaultProps: IProps = {
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
    const { container } = renderWithRouter(
      <Page {...defaultProps} />
    );

    expect(container).toBeTruthy();
  });

  it('fetches the page given a change in the slug', () => {
    const spyFetchPage = jest.fn();

    renderWithRouter(
      <Page
        {...defaultProps}
        fetchPage={spyFetchPage}
        slug="new-test-slug"
      />
    );

    expect(spyFetchPage).toHaveBeenCalled();
    expect(spyFetchPage).toHaveBeenCalledWith('new-test-slug');
  });

  it('reveals and hides the side navigation menu', async () => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} />
    );
    const burger = container.getElementsByTagName('button')[0];
    const main = container.getElementsByTagName('main')[0];

    expect(container.getElementsByTagName('aside')[0])
      .toHaveStyleRule('transform', 'translate3d(60vw,0,0)');

    act((): void => {
      fireEvent.click(burger);
    });

    await expect(container.getElementsByTagName('aside')[0])
      .toHaveStyleRule('transform', 'translate3d(0,0,0)');

    act((): void => {
      fireEvent.click(main);
    });

    expect(container.getElementsByTagName('aside')[0])
      .toHaveStyleRule('transform', 'translate3d(60vw,0,0)');
  });

  it('renders the loading indicator', () => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} pending />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Loading!')).toBeTruthy();
  });

  it('renders page content', () => {
    const { container } = renderWithRouter(
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
    const { container } = renderWithRouter(
      <Page {...defaultProps} error="Test error" />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test error')).toBeTruthy();
  });
});
