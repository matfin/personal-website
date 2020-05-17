import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { IContentItem } from 'common/interfaces';
import { ContentItem, IProps } from './ContentItem';
import { ProjectSt } from '../project/Project.css';

describe('ContentItem tests', () => {
  it('renders the component', () => {
    const { container } = render(
      <ContentItem
        tagName="p"
        content="This is a test"
      />
    );

    expect(container).toBeTruthy();
    expect(screen.getByText('This is a test')).toBeTruthy();
  });

  describe('rendering standard html tags', () => {
    it('renders a section', () => {
      const { container } = render(
        <ContentItem
          tagName="section"
          content="This is a section"
        />
      );

      expect(container.querySelector('section')).toBeTruthy();
      expect(screen.getByText('This is a section')).toBeTruthy();
    });

    it('renders a heading', () => {
      const { container } = render(
        <ContentItem
          tagName="h1"
          content="This is a heading"
        />
      );

      expect(container.querySelector('h1')).toBeTruthy();
      expect(screen.getByText('This is a heading')).toBeTruthy();
    });

    it('renders a subheading', () => {
      const { container } = render(
        <ContentItem
          tagName="h2"
          content="This is a subheading"
        />
      );

      expect(container.querySelector('h2')).toBeTruthy();
      expect(screen.getByText('This is a subheading')).toBeTruthy();
    });

    it('renders a paragraph', () => {
      const { container } = render(
        <ContentItem
          tagName="p"
          content="This is a paragraph"
        />
      );

      expect(container.querySelector('p')).toBeTruthy();
      expect(screen.getByText('This is a paragraph')).toBeTruthy();
    });

    it('renders a list with items', () => {
      const props: IContentItem = {
        tagName: 'ul',
        content: [
          { tagName: 'li', content: 'First' },
          { tagName: 'li', content: 'Second' },
          { tagName: 'li', content: 'Third' },
        ] as any
      };
      const { container } = render(
        <ContentItem {...props} />
      );

      expect(container.querySelector('ul')).toBeTruthy();
      expect(container.querySelectorAll('li')).toHaveLength(3);
      expect(screen.getByText('First')).toBeTruthy();
      expect(screen.getByText('Second')).toBeTruthy();
      expect(screen.getByText('Third')).toBeTruthy();
    });

    it('renders a span the tag is not recognised', () => {
      const props: IContentItem = {
        tagName: 'unknown',
        content: 'Test content'
      };
      const { container } = render(
        <ContentItem {...props} />
      );

      expect(container.querySelector('span')).toBeTruthy();
      expect(screen.getByText('Test content')).toBeTruthy();
    });
  });

  it('renders a list of topics', () => {
    const props: IContentItem = {
      tagName: 'topics',
      content: [
        {
          category: "test",
          description: "Test description",
          slug: "test",
          title: "Test"
        },
        {
          category: "test",
          description: "Another test description",
          slug: "another-test",
          title: "Another test"
        }
      ] as any
    };
    const { container } = render(
      <ContentItem {...props} />
    );

    expect(container.querySelector('ul')).toBeTruthy();
    expect(container.querySelectorAll('li')).toHaveLength(2);
    expect(screen.getByText('Test')).toBeTruthy();
    expect(screen.getByText('Another test')).toBeTruthy();
  });

  it('renders a job position', () => {
    const props: IContentItem = {
      tagName: 'jobs',
      content: [
        {
          company: 'Test Company',
          location: 'Test, Location',
          role: 'Test role',
          startDate: "2020-01-06",
          tasks: [
            'Task one',
            'Task two',
          ],
          topics: []
        }
      ] as any
    };
    const { container } = render(
      <ContentItem {...props} />
    );

    expect(container.querySelector('section')).toBeTruthy();
    expect(container.querySelectorAll('div')).toHaveLength(1);
    expect(screen.getByText('Test Company')).toBeTruthy();
    expect(screen.getByText('Test role / Test, Location')).toBeTruthy();
  });

  it('renders a project', () => {
    const props: IContentItem = {
      tagName: 'projects',
      content: [
        {
          description: 'Test description',
          releaseDate: '2020-04-05',
          slug: 'test-project',
          title: 'Test Project',
          topics: [
            'test topic one',
            'test topic two'
          ]
        }
      ] as any
    };
    const { container } = render(
      <ContentItem {...props} />
    );

    expect(container.querySelector('section')).toBeTruthy();
    expect(container.querySelectorAll('a')).toHaveLength(1);
    expect(screen.getByText('Test Project')).toBeTruthy();
    expect(screen.getByText('Test description')).toBeTruthy();
  });

  it('renders a warning if the element is unknown', () => {
    const props: IContentItem = {} as any;
    const { container } = render(
      <ContentItem {...props} />
    );

    expect(container.querySelector('span')).toBeTruthy();
    expect(screen.getByText('Unknown element')).toBeTruthy();
  })
});