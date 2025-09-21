import { describe, expect, it } from 'vitest';

import reducer, {
  fetchPageBySlug,
  initialState,
  resetPage,
  setPage,
} from './slice';

const page = {
  id: 'abcd-1234',
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
};

describe('page slice test', (): void => {
  it('should retrn the initial state', (): void => {
    const result = reducer(undefined, { type: 'unknown' });

    expect(result).toEqual(initialState);
  });

  it('should handle a page being set', (): void => {
    const result = reducer(initialState, setPage(page));

    expect(result).toEqual({ ...initialState, page });
  });

  it('should handle the state being reset', (): void => {
    const result = reducer({ ...initialState, page }, resetPage());

    expect(result).toEqual(initialState);
  });

  describe('extra reducers', (): void => {
    it('should handle the state when a call to fetch a page is pending', (): void => {
      const result = reducer(initialState, {
        type: fetchPageBySlug.pending.type,
      });

      expect(result).toEqual({ ...initialState, pending: true });
    });

    it('should handle the state when a call to fetch a page has been fulfilled', (): void => {
      const result = reducer(initialState, {
        type: fetchPageBySlug.fulfilled.type,
        payload: page,
      });

      expect(result).toEqual({ ...initialState, page });
    });

    it('should handle the state when a call to fetch a page has been rejected', (): void => {
      const error: Error = new Error('Test error');
      const result = reducer(initialState, {
        type: fetchPageBySlug.rejected.type,
        payload: { errorMessage: 'Test error' },
      });

      expect(result).toEqual({ ...initialState, error });
    });
  });
});
