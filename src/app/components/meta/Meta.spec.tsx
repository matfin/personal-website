import React from 'react';
import { render } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import { Meta, IProps } from './Meta';

const defaultProps: IProps = {
  description: 'Test description',
  title: 'Test title'
};

describe('Meta tests', () => {
  it('renders the component', () => {
    const wrapper = render(<Meta {...defaultProps} />);
    const helmet = Helmet.peek();
    const expectedMetaTags = [
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=yes'
      },
      { name: 'theme-color', content: '#ecedef' },
      { name: 'description', content: 'Test description' },
      { name: 'author', content: 'Matt Finucane' },
      { property: 'og:url', content: 'http://localhost/' },
      { property: 'og:site_name', content: 'mattfinucane.com' },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en-IE' },
      { property: 'og:title', content: 'Test title' },
      { property: 'og:description', content: 'Test description' },
      { name: 'twitter:site', content: '@matfinucane' },
      { name: 'twitter:creator', content: '@matfinucane' },
      { name: 'twitter:title', content: 'Test title' },
      { name: 'twitter:url', content: 'http://localhost/' },
      { name: 'twitter:description', content: 'Test description' }
    ];

    expect(wrapper).toBeTruthy();
    expect(helmet.title).toEqual('Test title');
    expect(helmet.metaTags).toEqual(expectedMetaTags);
  });

  it('renders with a set url', () => {
    const wrapper = render(<Meta {...defaultProps} slug="test-slug" />);
    const helmet = Helmet.peek();

    expect(wrapper).toBeTruthy();
    expect(helmet.metaTags[4]).toEqual({
      property: 'og:url',
      content: 'http://localhost/test-slug'
    });
  });
});
