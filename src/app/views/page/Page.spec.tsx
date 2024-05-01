import * as React from 'react';
import 'jest-styled-components';
import reactRouterDom from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import { renderWithRouter } from 'utils/testutils';
import { setBodyOverflow } from 'utils';
import { ContentItem, ThemeType } from 'models';
import Page, { Props } from './Page';

jest.mock('react-router-dom', (): any => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));

jest.mock('app/components/meta/Meta');

jest.mock('utils', () => ({
  ...jest.requireActual('utils'),
  setBodyOverflow: jest.fn(),
}));

const defaultProps: Props = {
  currentTheme: ThemeType.DAY,
  error: null,
  pending: false,
  page: {
    root: {
      id: '1',
      tagName: '',
      content: 'content',
    },
    description: 'Test page',
    slug: 'test-page',
    title: 'Test page',
  },
  fetchPageRequest: jest.fn(),
  resetPage: jest.fn(),
  switchTheme: jest.fn(),
};
const spyUseLocation = jest.spyOn(reactRouterDom, 'useLocation');

window.scrollTo = jest.fn();

describe('Page tests', (): void => {
  beforeEach((): void => {
    spyUseLocation.mockReturnValue({ pathname: '/test/nested' } as any);
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
    expect(() => renderWithRouter(<Page {...defaultProps} />)).not.toThrow();
  });

  it('fetches the page with "index" as the default slug', (): void => {
    const spyFetchPageRequest = jest.fn();

    spyUseLocation.mockReturnValue({ pathname: '' } as any);

    renderWithRouter(
      <Page {...defaultProps} fetchPageRequest={spyFetchPageRequest} />,
    );

    expect(spyFetchPageRequest).toHaveBeenCalledTimes(1);
    expect(spyFetchPageRequest).toHaveBeenCalledWith('index');
  });

  it('reveals and hides the side navigation menu', (): void => {
    const { container } = renderWithRouter(<Page {...defaultProps} />);
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
    const { container } = renderWithRouter(<Page {...defaultProps} />);
    const burger = container.getElementsByTagName('button')[0];

    // nav menu revealed
    fireEvent.click(burger);
    expect(setBodyOverflow).toHaveBeenLastCalledWith(false);

    // nav menu hidden again
    fireEvent.click(burger);
    expect(setBodyOverflow).toHaveBeenLastCalledWith(true);
  });

  it('renders the loading indicator', (): void => {
    const { container } = renderWithRouter(<Page {...defaultProps} pending />);

    expect(container).toBeTruthy();
    expect(container.getElementsByTagName('img')).toBeTruthy();
  });

  it('renders the back button when in a nested page view', (): void => {
    const container = renderWithRouter(<Page {...defaultProps} />);
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

    renderWithRouter(
      <Page
        {...defaultProps}
        page={{
          description: 'Test',
          slug: 'test',
          title: 'test',
          root,
        }}
      />,
    );

    expect(screen.getByText('Test heading')).toBeTruthy();
  });

  it('switches to the night theme', (): void => {
    const spySwitchTheme = jest.fn();
    const container = renderWithRouter(
      <Page {...defaultProps} switchTheme={spySwitchTheme} />,
    );
    const toggle = container.getByTestId('toggle');

    fireEvent.click(toggle);

    expect(spySwitchTheme).toHaveBeenCalledWith(ThemeType.NIGHT);
  });

  it('switches to the day theme', (): void => {
    const spySwitchTheme = jest.fn();
    const container = renderWithRouter(
      <Page
        {...defaultProps}
        currentTheme={ThemeType.NIGHT}
        switchTheme={spySwitchTheme}
      />,
    );
    const toggle = container.getByTestId('toggle');

    fireEvent.click(toggle);

    expect(spySwitchTheme).toHaveBeenCalledWith(ThemeType.DAY);
  });

  it('renders an error message', (): void => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} error={new Error('Test error')} />,
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Error: Test error')).toBeTruthy();
  });
});
