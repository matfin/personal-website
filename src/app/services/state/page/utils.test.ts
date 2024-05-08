import { PayloadAction } from '@reduxjs/toolkit';

import { Page } from 'models';
import { normalisePageContent } from './utils';

const page = {
  title: 'Test title',
  description: 'Test description',
  slug: 'test-page',
  root: {
    tagName: 'section',
    content: [
      {
        tagName: 'h1',
        content: 'A heading',
      },
    ],
  },
};

describe('page state utils', (): void => {
  it('normalises root content for a page', (): void => {
    expect(
      normalisePageContent({ payload: page as Page, type: 'test' }),
    ).toEqual({
      title: 'Test title',
      description: 'Test description',
      slug: 'test-page',
      root: {
        id: 'abcd-1234',
        tagName: 'section',
        content: [
          {
            id: 'abcd-1234',
            tagName: 'h1',
            content: 'A heading',
          },
        ],
      },
    });
  });

  it('does not normalise root content if its null', (): void => {
    expect(
      normalisePageContent({
        payload: { ...page, root: null },
        type: 'test',
      }),
    ).toEqual({
      title: 'Test title',
      description: 'Test description',
      slug: 'test-page',
      root: null,
    });
  });

  it('returns null if the payload is undefined', (): void => {
    expect(
      normalisePageContent({
        type: 'test',
      } as PayloadAction<Page>),
    ).toBeNull();
  });
});
