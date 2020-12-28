import { Store } from 'redux';
import { createMockStore } from 'utils/testutils';
import { PageProps } from 'models';
import ActionTypes from './types';
import {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  resetPage,
  fetchPage,
} from './actions';

describe('page actions tests', (): void => {
  const page: PageProps = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };
  let store: Store;

  beforeEach((): void => {
    store = createMockStore();
  });

  it('returns the correct type on fetch page request', (): void => {
    expect(fetchPageRequest()).toEqual({
      type: ActionTypes.FETCH_PAGE_REQUEST,
    });
  });

  it('returns the correct type on fetch page success', (): void => {
    expect(fetchPageSuccess(page)).toEqual({
      type: ActionTypes.FETCH_PAGE_SUCCESS,
      payload: page,
    });
  });

  it('returns the correct type on fetch page failure', (): void => {
    const error = new Error('error');

    expect(fetchPageFailure(error)).toEqual({
      type: ActionTypes.FETCH_PAGE_FAILURE,
      error,
    });
  });

  it('returns the correct type on page reset', (): void => {
    expect(resetPage()).toEqual({
      type: ActionTypes.RESET_PAGE,
    });
  });

  it('dispatches correctly when fetching a page with success (less than 200ms)', async (): Promise<
    void
  > => {
    const expectedActions = [
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ];

    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(page),
      status: 200,
    } as any);

    await store.dispatch(fetchPage('test'));
    await expect(store.getActions()).toEqual(expectedActions);

    spyFetch.mockReset();
  });

  it('dispatches correctly when fetching a page with success (more than 200ms)', async (done): Promise<
    void
  > => {
    const expectedActions = [
      { type: ActionTypes.FETCH_PAGE_REQUEST },
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ];
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: () =>
        new Promise((resolve: any): void => {
          setTimeout((): void => resolve(page), 300);
        }),
      status: 200,
    } as any);

    await store.dispatch(fetchPage('test'));

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 400);

    spyFetch.mockRestore();
  });

  it('dispatches correctly when fetching a page failed', async (): Promise<
    void
  > => {
    const error = new Error('Content for /pages/test.json not found');
    const expectedActions = [{ type: ActionTypes.FETCH_PAGE_FAILURE, error }];
    const spyFetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockRejectedValue(error),
      status: 500,
    } as any);

    await store.dispatch(fetchPage('test'));
    expect(store.getActions()).toEqual(expectedActions);

    spyFetch.mockRestore();
  });
});
