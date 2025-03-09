import { describe, expect, it } from 'vitest';

import type { ContentItem } from '@models/types';
import { normaliseContent } from './mappers';

const content: unknown = {
  tagName: 'section',
  content: [
    {
      tagName: 'h1',
      content: 'A level one heading',
    },
    {
      tagName: 'ul',
      content: [
        {
          tagName: 'li',
          content: 'First list item',
        },
        {
          tagName: 'li',
          content: 'Second list item',
        },
      ],
    },
    {
      tagName: 'p',
      content: 'A paragraph.',
    },
  ],
};

describe('mappers', (): void => {
  it('should render a content tree with ids', (): void => {
    const expected: ContentItem = {
      tagName: 'section',
      id: 'abcd-1234',
      content: [
        {
          tagName: 'h1',
          id: 'abcd-1234',
          content: 'A level one heading',
        },
        {
          tagName: 'ul',
          id: 'abcd-1234',
          content: [
            {
              tagName: 'li',
              id: 'abcd-1234',
              content: 'First list item',
            },
            {
              tagName: 'li',
              id: 'abcd-1234',
              content: 'Second list item',
            },
          ],
        },
        {
          tagName: 'p',
          id: 'abcd-1234',
          content: 'A paragraph.',
        },
      ],
    };

    expect(normaliseContent(content as ContentItem)).toEqual(expected);

    expect(
      normaliseContent({ tagName: 'li', content: 'Test' } as ContentItem),
    ).toEqual({
      tagName: 'li',
      id: 'abcd-1234',
      content: 'Test',
    });

    expect(normaliseContent({} as ContentItem)).toEqual({ id: 'abcd-1234' });
    expect(normaliseContent()).toBeNull();
  });
});
