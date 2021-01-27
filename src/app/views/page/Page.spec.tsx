import * as React from 'react';
import 'jest-styled-components';
import reactRouterDom from 'react-router-dom';
import { act, fireEvent, screen } from '@testing-library/react';
import { renderWithRouter } from 'utils/testutils';
import * as utils from 'utils/utils';
import { ThemeType } from 'models';
import Page, { Props } from './Page';

jest.mock('react-router-dom', (): any => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
}));
// eslint-disable-next-line react/display-name
jest.mock('app/components/meta/Meta', () => (): JSX.Element => <div></div>);

const defaultProps: Props = {
  currentTheme: ThemeType.DAY,
  error: null,
  pending: false,
  page: {
    contents: [],
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

describe('Page tests', () => {
  beforeEach((): void => {
    spyUseLocation.mockReturnValue({ pathname: '/test/nested' } as any);
  });

  afterEach((): void => {
    spyUseLocation.mockReset();
  });

  it('renders the component', () => {
    const { container } = renderWithRouter(<Page {...defaultProps} />);

    expect(container).toBeTruthy();
  });

  it('fetches the page with "index" as the default slug', () => {
    const spyFetchPageRequest = jest.fn();

    spyUseLocation.mockReturnValue({ pathname: '' } as any);
    renderWithRouter(
      <Page {...defaultProps} fetchPageRequest={spyFetchPageRequest} />
    );

    expect(spyFetchPageRequest).toHaveBeenCalled();
    expect(spyFetchPageRequest).toHaveBeenCalledWith('index');
  });

  it('reveals and hides the side navigation menu', async () => {
    const { container } = renderWithRouter(<Page {...defaultProps} />);
    const burger = container.getElementsByTagName('button')[0];
    const main = container.getElementsByTagName('main')[0];

    expect(container.getElementsByTagName('aside')[0]).toHaveStyleRule(
      'transform',
      'translate3d(100vw,0,0)'
    );

    act((): void => {
      fireEvent.click(burger);
    });

    await expect(container.getElementsByTagName('aside')[0]).toHaveStyleRule(
      'transform',
      'translate3d(0,0,0)'
    );

    act((): void => {
      fireEvent.click(main);
    });

    await expect(container.getElementsByTagName('aside')[0]).toHaveStyleRule(
      'transform',
      'translate3d(100vw,0,0)'
    );
  });

  it('prevents body scroll when nav menu is open', async (): Promise<any> => {
    const spySetBodyOverflow = jest.spyOn(utils, 'setBodyOverflow');
    const { container } = renderWithRouter(<Page {...defaultProps} />);
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

  it('renders page content', () => {
    const { container } = renderWithRouter(
      <Page
        {...defaultProps}
        page={{
          description: 'Test',
          slug: 'test',
          title: 'test',
          contents: [
            {
              tagName: 'h1',
              content: 'Test heading',
              id: 'test-h1',
            },
          ],
        }}
      />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Test heading')).toBeTruthy();
  });

  it('switches to the night theme', async (): Promise<void> => {
    const spySwitchTheme = jest.fn();
    const container = renderWithRouter(
      <Page {...defaultProps} switchTheme={spySwitchTheme} />
    );
    const toggle = container.getByTestId('toggle');

    act((): void => {
      fireEvent.click(toggle);
    });
    await expect(spySwitchTheme).toHaveBeenCalledWith(ThemeType.NIGHT);
  });

  it('switches to the day theme', async (): Promise<void> => {
    const spySwitchTheme = jest.fn();
    const container = renderWithRouter(
      <Page
        {...defaultProps}
        currentTheme={ThemeType.NIGHT}
        switchTheme={spySwitchTheme}
      />
    );
    const toggle = container.getByTestId('toggle');

    act((): void => {
      fireEvent.click(toggle);
    });
    await expect(spySwitchTheme).toHaveBeenCalledWith(ThemeType.DAY);
  });

  it('renders an error message', (): void => {
    const { container } = renderWithRouter(
      <Page {...defaultProps} error={new Error('Test error')} />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('Error: Test error')).toBeTruthy();
  });
});
