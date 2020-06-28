import { createMockStore } from 'common/utils/testutils';
import * as api from 'common/utils/api';
import { IPage } from 'common/interfaces';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
  RESET_PAGE,
} from './types';
import {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  resetPage,
  fetchPage,
} from './actions';

describe('page actions tests', () => {
  const page: IPage = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };
  let store: any;

  beforeEach((): void => {
    store = createMockStore({
      pageState: {
        error: null,
        pending: false,
      },
    });
  });

  it('returns the correct type on fetch page request', () => {
    expect(fetchPageRequest()).toEqual({
      type: FETCH_PAGE_REQUEST,
    });
  });

  it('returns the correct type on fetch page success', () => {
    expect(fetchPageSuccess(page)).toEqual({
      type: FETCH_PAGE_SUCCESS,
      payload: page,
    });
  });

  it('returns the correct type on fetch page failure', () => {
    const error = { dummy: 'error' };

    expect(fetchPageFailure(error)).toEqual({
      type: FETCH_PAGE_FAILURE,
      error,
    });
  });

  it('returns the correct type on page reset', () => {
    expect(resetPage()).toEqual({
      type: RESET_PAGE,
    });
  });

  it('dispatches correctly when fetching a page with success (less than 200ms)', async () => {
    const expectedActions = [
      { type: FETCH_PAGE_SUCCESS, payload: page },
    ];
    const spyApiCall = jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: jest.fn().mockResolvedValue(page),
      status: 200,
    });

    await (store.dispatch(fetchPage('test')));
    await expect(store.getActions()).toEqual(expectedActions);

    spyApiCall.mockRestore();
  });

  it('dispatches correctly when fetching a page with success (more than 200ms)', async (done) => {
    const expectedActions = [
      { type: FETCH_PAGE_REQUEST },
      { type: FETCH_PAGE_SUCCESS, payload: page },
    ];
    const spyApiCall = jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: () => (
        new Promise((resolve: any): void => {
          setTimeout(() => resolve(page), 300);
        })
      ),
      status: 200,
    });

    await (store.dispatch(fetchPage('test')));

    setTimeout(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    }, 400);

    spyApiCall.mockRestore();
  });

  it('dispatches correctly when fetching a page failed', async () => {
    const error = new Error('Content for /content/page/test not found');
    const expectedActions = [
      { type: FETCH_PAGE_FAILURE, error },
    ];
    const spyApiCall = jest.spyOn(api, 'apiCall').mockResolvedValue({
      json: jest.fn().mockRejectedValue(error),
      status: 500,
    });

    await (store.dispatch(fetchPage('test')));
    expect(store.getActions()).toEqual(expectedActions);

    spyApiCall.mockRestore();
  });
});
