import React from 'react';
import { screen } from '@testing-library/react';

import { renderWithTheme } from '@testutils';
import { ContentItem, Position } from '@models';
import ContentWrapper, { Props } from './ContentWrapper';

jest.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const defaultProps: Props = {
  tagName: 'section',
  children: <></>,
};

describe('ContentWrapper', (): void => {
  it('renders container elements', (): void => {
    expect(() =>
      renderWithTheme(<ContentWrapper {...defaultProps} />),
    ).not.toThrow();
    expect(() =>
      renderWithTheme(<ContentWrapper {...defaultProps} tagName="jobs" />),
    ).not.toThrow();
    expect(() =>
      renderWithTheme(<ContentWrapper {...defaultProps} tagName="ul" />),
    ).not.toThrow();
    expect(() =>
      renderWithTheme(<ContentWrapper {...defaultProps} tagName="topics" />),
    ).not.toThrow();
    expect(() =>
      renderWithTheme(<ContentWrapper {...defaultProps} tagName="projects" />),
    ).not.toThrow();
  });

  it('renders text content', (): void => {
    const content: ContentItem = {
      tagName: 'h1',
      id: '1',
      content: 'A heading',
    };

    renderWithTheme(<ContentWrapper {...(content as Props)} />);

    expect(screen.getByText('A heading')).not.toBeNull();
  });

  it('renders text content with an embedded link', (): void => {
    const content: ContentItem = {
      tagName: 'p',
      id: '1',
      content: 'This has an [embedded link](https://nowhere.com).',
    };

    renderWithTheme(<ContentWrapper {...(content as Props)} />);
    const link = screen.getByRole('link');

    expect(link).not.toBeNull();
    expect(link.getAttribute('href')).toEqual('https://nowhere.com');
    expect(screen.getByText('This has an', { exact: false })).not.toBeNull();
    expect(screen.getByText('embedded link', { exact: false })).not.toBeNull();
  });

  it('renders a list item', (): void => {
    const content: ContentItem = {
      tagName: 'li',
      id: '1',
      content: 'A list item',
    };

    renderWithTheme(<ContentWrapper {...(content as Props)} />);

    expect(screen.getByText('A list item')).not.toBeNull();
  });

  it('renders a job', (): void => {
    const content: ContentItem = {
      tagName: 'job',
      id: '1',
      content: {
        company: 'Test company',
        endDate: '2024-01-31',
        location: 'Test location',
        role: 'Engineer',
        startDate: '2020-08-31',
        tasks: ['First task', 'Second task'],
        topics: [],
      } as unknown as Position,
    };

    renderWithTheme(<ContentWrapper {...(content as Props)} />);

    expect(screen.getByText('August 2020')).not.toBeNull();
    expect(screen.getByText('to January 2024')).not.toBeNull();
    expect(screen.getByText('Test company')).not.toBeNull();
    expect(screen.getByText('Engineer / Test location')).not.toBeNull();
    expect(screen.getByText('First task')).not.toBeNull();
    expect(screen.getByText('Second task')).not.toBeNull();
  });

  it('renders a topic item', (): void => {
    const content: ContentItem = {
      tagName: 'topic',
      id: '1',
      content: {
        category: 'Test category',
        deprecated: true,
        description: 'Test description',
        slug: 'test-category',
        title: 'Test Title',
      },
    };

    renderWithTheme(<ContentWrapper {...(content as Props)} />);

    expect(screen.getByText('Test Title')).not.toBeNull();
  });

  it('renders an image', (): void => {
    const content: ContentItem = {
      tagName: 'img',
      id: '1',
      content: {
        name: 'test-image-name',
        fileType: 'jpg',
        title: 'Test image title',
      },
    };

    const { getByAltText } = renderWithTheme(
      <ContentWrapper {...(content as Props)} />,
    );
    const image = getByAltText('Test image title');

    expect(image).not.toBeNull();
  });

  it('renders a project tile', (): void => {
    const content: ContentItem = {
      tagName: 'project',
      id: '1',
      content: {
        description: 'Project description',
        releaseDate: '1982-04-26',
        slug: 'test-project',
        title: 'Test Project',
        topics: [],
      },
    };

    renderWithTheme(<ContentWrapper {...(content as Props)} />);

    expect(screen.getByText('Test Project')).not.toBeNull();
    expect(screen.getByText('Project description')).not.toBeNull();
  });
});
