import { Page } from 'models';
import ActionTypes from './types';
import {
  fetchPageRequest,
  fetchPageSuccess,
  fetchPageFailure,
  fetchPageStart,
  resetPage,
} from './actions';

describe('page actions tests', (): void => {
  const page: Page = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };

  it('returns the correct type on fetch page request', (): void => {
    expect(fetchPageRequest('test')).toEqual({
      type: ActionTypes.FETCH_PAGE_REQUEST,
      payload: 'test',
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

  it('returns the correct type on fetch page start', (): void => {
    expect(fetchPageStart()).toEqual({
      type: ActionTypes.FETCH_PAGE_STARTED,
    });
  });

  it('returns the correct type on page reset', (): void => {
    expect(resetPage()).toEqual({
      type: ActionTypes.RESET_PAGE,
    });
  });
});
