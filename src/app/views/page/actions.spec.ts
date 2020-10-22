import { Store } from 'redux';
import { createMockStore } from 'common/utils/testutils';
import * as api from 'common/utils/api';
import { PageProps } from 'common/models';
import ActionTypes from './types';
import {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  resetPage,
  fetchPage,
} from './actions';

describe('page actions tests', () => {
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

  it('returns the correct type on fetch page request', () => {
    expect(fetchPageRequest()).toEqual({
      type: ActionTypes.FETCH_PAGE_REQUEST,
    });
  });

  it('returns the correct type on fetch page success', () => {
    expect(fetchPageSuccess(page)).toEqual({
      type: ActionTypes.FETCH_PAGE_SUCCESS,
      payload: page,
    });
  });

  it('returns the correct type on fetch page failure', () => {
    const error = { dummy: 'error' };

    expect(fetchPageFailure(error)).toEqual({
      type: ActionTypes.FETCH_PAGE_FAILURE,
      error,
    });
  });

  it('returns the correct type on page reset', () => {
    expect(resetPage()).toEqual({
      type: ActionTypes.RESET_PAGE,
    });
  });

  it('dispatches correctly when fetching a page with success (less than 200ms)', async () => {
    const expectedActions = [
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ];
    const spyApiCall = jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: jest.fn().mockResolvedValue(page),
      status: 200,
    } as any);

    await store.dispatch(fetchPage('test'));
    await expect(store.getActions()).toEqual(expectedActions);

    spyApiCall.mockRestore();
  });

  it('dispatches correctly when fetching a page with success (more than 200ms)', async (done) => {
    const expectedActions = [
      { type: ActionTypes.FETCH_PAGE_REQUEST },
      { type: ActionTypes.FETCH_PAGE_SUCCESS, payload: page },
    ];
    const spyApiCall = jest.spyOn(api, 'apiCall').mockResolvedValue({
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

    spyApiCall.mockRestore();
  });

  it('dispatches correctly when fetching a page failed', async () => {
    const error = new Error('Content for /content/page/test not found');
    const expectedActions = [{ type: ActionTypes.FETCH_PAGE_FAILURE, error }];
    const spyApiCall = jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: jest.fn().mockRejectedValue(error),
      status: 500,
    } as any);

    await store.dispatch(fetchPage('test'));
    expect(store.getActions()).toEqual(expectedActions);

    spyApiCall.mockRestore();
  });
});
