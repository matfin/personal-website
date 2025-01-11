import { describe, expect, it, vi, type MockInstance } from 'vitest';
import { screen } from '@testing-library/react';

import { renderWrapped } from '@testutils';
import type { ContentItem, Page as PageModel } from '@models/interfaces';
import usePage from '@hooks/usePage';
import Page from './index';

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

vi.mock('@components/meta', () => ({
  default: () => 'meta',
}));

vi.mock('@hooks/usePage', () => ({
  default: vi.fn().mockReturnValue({
    page: mocks.page,
    pending: false,
    error: null,
    isNested: false,
    parts: ['test-page'],
  }),
}));

describe('Page tests', (): void => {
  it('renders the component', async (): Promise<void> => {
    expect(() => renderWrapped(<Page />)).not.toThrow();
  });

  it('renders content when not pending', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({
      page,
      error: null,
      pending: false,
      isNested: false,
      parts: ['test-content'],
    });

    renderWrapped(<Page />);
    expect(screen.getByText(/Test content/)).not.toBe(null);
  });

  it('does not render content when pending', (): void => {
    (usePage as unknown as MockInstance).mockReturnValue({
      page: null,
      pending: true,
      isNested: false,
      parts: ['test-content'],
    });

    renderWrapped(<Page />);
    expect(screen.queryByText(/Test content/)).toBeNull();
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
    (usePage as unknown as MockInstance).mockReturnValue({
      page: null,
      pending: false,
      isNested: true,
      parts: ['test', 'nested'],
    });

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
      isNested: false,
      parts: ['test'],
    });

    renderWrapped(<Page />);

    expect(screen.getByText('Test heading')).toBeTruthy();
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
