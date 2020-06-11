import { IPage } from 'common/interfaces';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
  RESET_PAGE,
} from './types';
import { defaultState, pageState } from './reducer';

describe('page reducer tests', () => {
  const page: IPage = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };

  it('sets the state when the action type is fetch page request', () => {
    const state = pageState(undefined, {
      type: FETCH_PAGE_REQUEST,
    });
    const check = {
      ...defaultState,
      pending: true,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is fetch page success', () => {
    const state = pageState(undefined, {
      type: FETCH_PAGE_SUCCESS,
      payload: page,
    });
    const check = {
      ...defaultState,
      error: null,
      pending: false,
      page,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is fetch page failure', () => {
    const error = { dummy: 'error' };
    const state = pageState(undefined, {
      type: FETCH_PAGE_FAILURE,
      error,
    });
    const check = {
      ...defaultState,
      error,
      pending: false,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is reset page', () => {
    const state = pageState(undefined, {
      type: RESET_PAGE,
    });

    expect(state).toEqual(defaultState);
  });

  it('does not modify the state if there is no type match', () => {
    const state = pageState(undefined, {
      type: 'UNKNOWN',
    });

    expect(state).toEqual(defaultState);
  });
});
