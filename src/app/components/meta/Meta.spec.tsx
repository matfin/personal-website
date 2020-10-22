import React from 'react';
import { render } from '@testing-library/react';
import { Helmet, HelmetData } from 'react-helmet';
import * as config from 'common/config';
import Meta, { Props } from './Meta';

const defaultProps: Props = {
  description: 'Test description',
  title: 'Test title',
};

describe('Meta tests', () => {
  const spyGetCanonicalUrl = jest
    .spyOn(config, 'getCanonicalUrl')
    .mockReturnValue('https://test.de');

  afterAll((): void => {
    spyGetCanonicalUrl.mockRestore();
  });

  it('renders the component', () => {
    const wrapper = render(<Meta {...defaultProps} />);
    const helmet: HelmetData = Helmet.peek();
    const expectedMetaTags = [
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=yes',
      },
      { name: 'theme-color', content: '#ecedef' },
      { name: 'description', content: 'Test description' },
      { name: 'author', content: 'Matt Finucane' },
      { property: 'og:url', content: 'https://test.de/' },
      { property: 'og:site_name', content: 'mattfinucane.com' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en-IE' },
      { property: 'og:title', content: 'Test title' },
      { property: 'og:description', content: 'Test description' },
      { name: 'twitter:site', content: '@matfinucane' },
      { name: 'twitter:creator', content: '@matfinucane' },
      { name: 'twitter:title', content: 'Test title' },
      { name: 'twitter:url', content: 'https://test.de/' },
      { name: 'twitter:description', content: 'Test description' },
    ];

    expect(wrapper).toBeTruthy();
    expect(helmet.title).toEqual('Test title');
    expect(helmet.metaTags).toEqual(expectedMetaTags);
  });

  it('renders with a set url', () => {
    const wrapper = render(<Meta {...defaultProps} slug="test-slug" />);
    const helmet = Helmet.peek();

    expect(wrapper).toBeTruthy();
    expect(helmet.metaTags[5]).toEqual({
      property: 'og:url',
      content: 'https://test.de/test-slug',
    });
  });

  it('omits the slug for the home page', () => {
    const wrapper = render(<Meta {...defaultProps} slug="home" />);
    const helmet = Helmet.peek();

    expect(wrapper).toBeTruthy();
    expect(helmet.metaTags[5]).toEqual({
      property: 'og:url',
      content: 'https://test.de/',
    });
  });
});
