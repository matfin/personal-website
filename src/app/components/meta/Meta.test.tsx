import { render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import Meta, { type Props } from './index';

vi.mock('@config', () => ({
  getCanonicalUrl: vi.fn().mockReturnValue('https://test.de'),
}));

const defaultProps: Props = {
  description: 'Test description',
  title: 'Test title',
};

describe('Meta tests', (): void => {
  it('renders the component with the correct details', (): void => {
    render(<Meta {...defaultProps} />);

    const titleTag = document.querySelector('title');
    const descriptionTag = document.querySelector('meta[name="description"]');
    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    const ogDescriptionTag = document.querySelector(
      'meta[property="og:description"]',
    );

    expect(titleTag?.textContent).toEqual('Test title');
    expect(descriptionTag?.getAttribute('content')).toEqual('Test description');
    expect(ogUrlTag?.getAttribute('content')).toEqual('https://test.de/');
    expect(ogTitleTag?.getAttribute('content')).toEqual('Test title');
    expect(ogDescriptionTag?.getAttribute('content')).toEqual(
      'Test description',
    );
  });

  it('renders with a title and a url', (): void => {
    render(
      <Meta
        {...defaultProps}
        description="A custom description"
        title="A custom title"
        slug="a-custom-slug"
      />,
    );

    const titleTag = document.querySelector('title');
    const descriptionTag = document.querySelector('meta[name="description"]');
    const ogUrlTag = document.querySelector('meta[property="og:url"]');
    const ogTitleTag = document.querySelector('meta[property="og:title"]');
    const ogDescriptionTag = document.querySelector(
      'meta[property="og:description"]',
    );

    expect(titleTag?.textContent).toEqual('A custom title');
    expect(descriptionTag?.getAttribute('content')).toEqual(
      'A custom description',
    );
    expect(ogUrlTag?.getAttribute('content')).toEqual(
      'https://test.de/a-custom-slug',
    );
    expect(ogTitleTag?.getAttribute('content')).toEqual('A custom title');
    expect(ogDescriptionTag?.getAttribute('content')).toEqual(
      'A custom description',
    );
  });

  it('omits the slug for the index page', (): void => {
    render(<Meta {...defaultProps} slug="index" />);

    const ogUrlTag = document.querySelector('meta[property="og:url"]');

    expect(ogUrlTag?.getAttribute('content')).toEqual('https://test.de/');
    expect(ogUrlTag?.getAttribute('content')).not.toEqual(
      'https://test.de/index',
    );
  });
});
