import React from 'react';
import { HelmetServerState } from 'react-helmet-async';

import { renderWithHelmetProvider } from '@testutils';

import * as config from '../../../config';
import Meta, { Props } from './Meta';

const defaultProps: Props = {
  description: 'Test description',
  title: 'Test title',
};

describe('Meta tests', (): void => {
  const spyGetCanonicalUrl = jest
    .spyOn(config, 'getCanonicalUrl')
    .mockReturnValue('https://test.de');

  afterAll((): void => {
    spyGetCanonicalUrl.mockRestore();
  });

  it('renders the component with the correct details', (): void => {
    const helmetContext: { helmet?: HelmetServerState } = {};

    renderWithHelmetProvider({
      children: <Meta {...defaultProps} />,
      helmetContext,
    });

    const { helmet } = helmetContext;
    const title = helmet?.title.toString();
    const meta = helmet?.meta.toString();

    expect(title).toContain('Test title');
    expect(meta).toContain('Test title');
    expect(meta).toContain('Test description');
    expect(meta).toContain('@matfinucane');
    expect(meta).toContain('https://test.de');
  });

  it('renders with a title and a url', (): void => {
    const helmetContext: { helmet?: HelmetServerState } = {};

    renderWithHelmetProvider({
      children: (
        <Meta
          {...defaultProps}
          description="A custom description"
          title="A custom title"
          slug="a-custom-slug"
        />
      ),
      helmetContext,
    });

    const { helmet } = helmetContext;
    const title = helmet?.title.toString();
    const meta = helmet?.meta.toString();

    expect(title).toContain('A custom title');
    expect(meta).toContain('A custom title');
    expect(meta).toContain('A custom description');
    expect(meta).toContain('@matfinucane');
    expect(meta).toContain('https://test.de/a-custom-slug');
  });

  it('omits the slug for the home page', (): void => {
    const helmetContext: { helmet?: HelmetServerState } = {};

    renderWithHelmetProvider({
      children: <Meta {...defaultProps} slug="index" />,
      helmetContext,
    });

    const { helmet } = helmetContext;
    const meta = helmet?.meta.toString();

    expect(meta).toContain('https://test.de/');
    expect(meta).not.toContain('https://test.de/index');
  });
});
