import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { fireEvent, screen } from '@testing-library/react';
import 'jest-styled-components';
import { renderWithRouter } from 'common/utils/testutils';
import * as utils from 'common/utils/utils';
import { ThemeType } from 'common/interfaces';
import Page, { IProps } from './Page';

const noop = (): void => {};
const defaultProps: IProps = {
  currentTheme: ThemeType.DAY,
  error: null,
  pending: false,
  page: {
    contents: [],
    description: 'Test page',
    slug: 'test-page',
    title: 'Test page',
  },
  fetchPage: noop,
  resetPage: noop,
  switchTheme: noop,
};

window.scrollTo = jest.fn();

describe('Page tests', () => {
  it('renders the component', () => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} />,
    );

    expect(container).toBeTruthy();
  });

  it('fetches the page with "home" as the default slug', () => {
    const spyFetchPage = jest.fn();

    renderWithRouter(
      <Page
        {...defaultProps}
        fetchPage={spyFetchPage}
      />,
    );

    expect(spyFetchPage).toHaveBeenCalled();
    expect(spyFetchPage).toHaveBeenCalledWith('home');
  });

  it('reveals and hides the side navigation menu', async () => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} />,
    );
    const burger = container.getElementsByTagName('button')[0];
    const main = container.getElementsByTagName('main')[0];

    expect(container.getElementsByTagName('aside')[0])
      .toHaveStyleRule('transform', 'translate3d(100vw,0,0)');

    act((): void => {
      fireEvent.click(burger);
    });

    await expect(container.getElementsByTagName('aside')[0])
      .toHaveStyleRule('transform', 'translate3d(0,0,0)');

    act((): void => {
      fireEvent.click(main);
    });

    await expect(container.getElementsByTagName('aside')[0])
      .toHaveStyleRule('transform', 'translate3d(100vw,0,0)');
  });

  it('prevents body scroll when nav menu is open', async () => {
    const spySetBodyOverflow = jest.spyOn(utils, 'setBodyOverflow');
    const { container } = renderWithRouter(
      <Page {...defaultProps} />,
    );
    const burger = container.getElementsByTagName('button')[0];

    // nav menu revealed
    act((): void => {
      fireEvent.click(burger);
    });
    await expect(spySetBodyOverflow).toHaveBeenCalledWith(false);

    // nav menu hidden again
    act((): void => {
      fireEvent.click(burger);
    });
    await expect(spySetBodyOverflow).toHaveBeenCalledWith(true);

    spySetBodyOverflow.mockReset();
  });

  it('renders the loading indicator', () => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} pending />,
    );

    expect(container).toBeTruthy();
    expect(container.getElementsByTagName('img')).toBeTruthy();
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
              content: 'Test heading',
              id: 'test-h1',
            },
          ],
        }}
      />,
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test heading')).toBeTruthy();
  });

  it('switches to the night theme', async () => {
    const spySwitchTheme = jest.fn();
    const container = renderWithRouter(
      <Page {...defaultProps} switchTheme={spySwitchTheme} />,
    );
    const toggle = container.getByTestId('toggle');

    act((): void => {
      fireEvent.click(toggle);
    });
    await expect(spySwitchTheme).toHaveBeenCalledWith(ThemeType.NIGHT);
  });

  it('switches to the day theme', async () => {
    const spySwitchTheme = jest.fn();
    const container = renderWithRouter(
      <Page
        {...defaultProps}
        currentTheme={ThemeType.NIGHT}
        switchTheme={spySwitchTheme}
      />,
    );
    const toggle = container.getByTestId('toggle');

    act((): void => {
      fireEvent.click(toggle);
    });
    await expect(spySwitchTheme).toHaveBeenCalledWith(ThemeType.DAY);
  });

  it('renders an error message', () => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} error="Test error" />,
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test error')).toBeTruthy();
  });
});
