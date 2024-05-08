import * as React from 'react';
import 'jest-styled-components';
import reactRouterDom, { Location } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import { renderWrapped } from 'utils/testutils';
import { setBodyOverflow } from 'utils';
import { ContentItem, Page as PageModel } from 'models';
import { usePage, useApp } from 'app/hooks';
import Page from './Page';

const page: PageModel = {
  root: {
    id: '1',
    tagName: 'p',
    content: 'Test content',
  },
  description: 'Test page',
  slug: 'test-page',
  title: 'Test page',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('app/components/meta/Meta');

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  setBodyOverflow: jest.fn(),
}));

jest.mock('app/hooks', () => ({
  usePage: jest.fn().mockReturnValue({ page, pending: false, error: null }),
  useApp: jest.fn().mockReturnValue({
    currentTheme: 'day',
    toggleTheme: jest.fn(),
  }),
}));

const spyUseLocation = jest.spyOn(reactRouterDom, 'useLocation');

window.scrollTo = jest.fn();

describe('Page tests', (): void => {
  beforeEach((): void => {
    spyUseLocation.mockReturnValue({ pathname: '/test/nested' } as Location);
  });

  afterEach((): void => {
    spyUseLocation.mockClear();
    (setBodyOverflow as jest.Mock).mockClear();
  });

  afterAll((): void => {
    spyUseLocation.mockReset();
    (setBodyOverflow as jest.Mock).mockReset();
  });

  it('renders the component', (): void => {
    expect(() => renderWrapped(<Page />)).not.toThrow();
  });

  it('reveals and hides the side navigation menu', (): void => {
    const { container } = renderWrapped(<Page />);
    const burger = container.getElementsByTagName('button')[0];
    const main = container.getElementsByTagName('main')[0];

    expect(container.getElementsByTagName('aside')[0]).toHaveStyleRule(
      'transform',
      'translate3d(100vw,0,0)',
    );

    fireEvent.click(burger);

    expect(container.getElementsByTagName('aside')[0]).toHaveStyleRule(
      'transform',
      'translate3d(0,0,0)',
    );

    fireEvent.click(main);

    expect(container.getElementsByTagName('aside')[0]).toHaveStyleRule(
      'transform',
      'translate3d(100vw,0,0)',
    );
  });

  it('prevents body scroll when nav menu is open', (): void => {
    const { container } = renderWrapped(<Page />);
    const burger = container.getElementsByTagName('button')[0];

    // nav menu revealed
    fireEvent.click(burger);
    expect(setBodyOverflow).toHaveBeenLastCalledWith(false);

    // nav menu hidden again
    fireEvent.click(burger);
    expect(setBodyOverflow).toHaveBeenLastCalledWith(true);
  });

  it('renders content when not pending', (): void => {
    (usePage as jest.Mock).mockReturnValue({ page, pending: false });

    renderWrapped(<Page />);
    expect(screen.getByText('Test content')).not.toBeNull();
  });

  it('does not render content when pending', (): void => {
    (usePage as jest.Mock).mockReturnValue({ page, pending: true });

    renderWrapped(<Page />);
    expect(screen.queryByText('Test content')).toBeNull();
  });

  it('does not render content when there is an error', (): void => {
    (usePage as jest.Mock).mockReturnValue({ page, error: new Error('oops') });

    renderWrapped(<Page />);
    expect(screen.queryByText('Test content')).toBeNull();
  });

  it('renders the back button when in a nested page view', (): void => {
    const container = renderWrapped(<Page />);
    const backButton = container.getByTestId('backbutton');

    expect(backButton).toBeTruthy();
    expect(backButton.href).toContain('/test');
  });

  it('renders page content', (): void => {
    const root: ContentItem = {
      id: '1',
      tagName: 'section',
      content: [
        {
          tagName: 'h1',
          content: 'Test heading',
          id: 'test-h1',
        },
      ],
    };
    const page: PageModel = {
      description: 'Test',
      slug: 'test',
      title: 'test',
      root,
    };

    (usePage as jest.Mock).mockReturnValue({ page, pending: false });

    renderWrapped(<Page />);

    expect(screen.getByText('Test heading')).toBeTruthy();
  });

  it('toggles the theme', (): void => {
    const spyToggleTheme = jest.fn();

    (useApp as jest.Mock).mockReturnValue({
      toggleTheme: spyToggleTheme,
    });

    const container = renderWrapped(<Page />);
    const toggle = container.getByTestId('toggle');

    fireEvent.click(toggle);

    expect(spyToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('renders an error message', (): void => {
    (usePage as jest.Mock).mockReturnValue({
      page: null,
      pending: false,
      error: new Error('Test Error'),
    });

    renderWrapped(<Page />);

    expect(screen.getByText('Error: Test Error')).not.toBeNull();
  });
});
