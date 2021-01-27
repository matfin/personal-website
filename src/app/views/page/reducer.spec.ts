import { PageProps } from 'models';
import ActionTypes from './types';
import { defaultState, pageState } from './reducer';

describe('page reducer tests', () => {
  const page: PageProps = {
    contents: [],
    description: 'Test description',
    slug: 'test-slug',
    title: 'Test',
  };

  it('should set the state when the action type is fetch page started', (): void => {
    const state = pageState(undefined, {
      type: ActionTypes.FETCH_PAGE_STARTED,
    });
    const check = {
      ...defaultState,
      pending: true,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is fetch page request', (): void => {
    const state = pageState(undefined, {
      type: ActionTypes.FETCH_PAGE_REQUEST,
    });
    const check = {
      ...defaultState,
      error: null,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is fetch page success', (): void => {
    const state = pageState(undefined, {
      type: ActionTypes.FETCH_PAGE_SUCCESS,
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

  it('sets the state when the action type is fetch page success but the payload is undefined', (): void => {
    const state = pageState(undefined, {
      type: ActionTypes.FETCH_PAGE_SUCCESS,
    });
    const check = {
      ...defaultState,
      error: null,
      pending: false,
      page: null,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is fetch page failure', (): void => {
    const error = new Error('Error');
    const state = pageState(undefined, {
      type: ActionTypes.FETCH_PAGE_FAILURE,
      error,
    });
    const check = {
      ...defaultState,
      error,
      pending: false,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is fetch page failure and no error was defined', (): void => {
    const state = pageState(undefined, {
      type: ActionTypes.FETCH_PAGE_FAILURE,
    });
    const check = {
      ...defaultState,
      error: new Error('The page could not be loaded'),
      pending: false,
    };

    expect(state).toEqual(check);
  });

  it('sets the state when the action type is reset page', (): void => {
    const state = pageState(undefined, {
      type: ActionTypes.RESET_PAGE,
    });

    expect(state).toEqual(defaultState);
  });

  it('does not modify the state if there is no type match', (): void => {
    const state = pageState(undefined, {} as any);

    expect(state).toEqual(defaultState);
  });
});
