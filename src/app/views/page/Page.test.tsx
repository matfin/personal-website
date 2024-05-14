import {
  afterEach,
  afterAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
  MockInstance,
} from 'vitest';
import { useLocation, Location } from 'react-router-dom';
import { fireEvent, screen } from '@testing-library/react';

import { renderWrapped } from '@testutils';
import { setBodyOverflow } from '@utils';
import { ContentItem, Page as PageModel } from '@models';
import { usePage, useApp } from '@hooks';
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

const mocks = vi.hoisted(() => {
  return {
    page: {
      root: {
        id: '1',
        tagName: 'p',
        content: 'Test content',
      },
      description: 'Test page',
      slug: 'test-page',
      title: 'Test page',
    },
  };
});

vi.mock('react-router-dom', async (importOriginal) => {
  const mod = await importOriginal<typeof import('react-router-dom')>();

  return {
    ...mod,
    useLocation: vi.fn().mockReturnValue({ pathname: 'test' }),
  };
});

vi.mock('@components/meta', () => ({
  default: () => 'meta',
}));

vi.mock('@utils', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@utils')>();

  return {
    ...mod,
    setBodyOverflow: vi.fn(),
  };
});

vi.mock('@hooks', () => ({
  usePage: vi
    .fn()
    .mockReturnValue({ page: mocks.page, pending: false, error: null }),
  useApp: vi.fn().mockReturnValue({
    currentTheme: 'day',
    toggleTheme: vi.fn(),
  }),
}));

describe('Page tests', (): void => {
  beforeEach((): void => {
    (useLocation as unknown as MockInstance).mockReturnValue({
      pathname: '/test/nested',
    } as Location);
  });

  afterEach((): void => {
    (useLocation as unknown as MockInstance).mockClear();
    (setBodyOverflow as unknown as MockInstance).mockClear();
  });

  afterAll((): void => {
    (useLocation as unknown as MockInstance).mockReset();
    (setBodyOverflow as unknown as MockInstance).mockReset();
  });

  it('renders the component', async (): Promise<void> => {
    expect(() => renderWrapped(<Page />)).not.toThrow();
  });

  it('sets the body overflow on navigation menu button tap', (): void => {
    const { getByTestId } = renderWrapped(<Page />);
    const button = getByTestId('menubutton');

    fireEvent.touchStart(button);

    expect(setBodyOverflow).toHaveBeenCalledTimes(1);
    expect(setBodyOverflow).toHaveBeenCalledWith(false);
  });

  it('renders content when not pending', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({
      page,
      pending: false,
    });

    renderWrapped(<Page />);
    expect(screen.getByText('Test content')).not.toBeNull();
  });

  it('does not render content when pending', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({
      page,
      pending: true,
    });

    renderWrapped(<Page />);
    expect(screen.queryByText('Test content')).toBeNull();
  });

  it('does not render content when there is an error', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({
      page,
      error: new Error('oops'),
    });

    renderWrapped(<Page />);
    expect(screen.queryByText('Test content')).toBeNull();
  });

  it('renders the back button when in a nested page view', (): void => {
    const container = renderWrapped(<Page />);
    const backButton = container.getByTestId('backbutton') as HTMLLinkElement;

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

    (usePage as unknown as MockInstance).mockReturnValue({
      page,
      pending: false,
    });

    renderWrapped(<Page />);

    expect(screen.getByText('Test heading')).toBeTruthy();
  });

  it('toggles the theme', (): void => {
    const spyToggleTheme = vi.fn();

    (useApp as unknown as MockInstance).mockReturnValue({
      toggleTheme: spyToggleTheme,
    });

    const container = renderWrapped(<Page />);
    const toggle = container.getByTestId('toggle');

    fireEvent.click(toggle);

    expect(spyToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('renders an error message', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({
      page: null,
      pending: false,
      error: new Error('Test Error'),
    });

    renderWrapped(<Page />);

    expect(screen.getByText('Error: Test Error')).not.toBeNull();
  });
});
