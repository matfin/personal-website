import { IListState, IStory } from 'app/common/interfaces';
import {
  FETCH_STORIES_PENDING,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
} from './types';
import listState, { defaultState } from './reducer';

describe('list reducer', () => {
  it('returns the state for FETCH_STORIES_PENDING', () => {
    const state: IListState = listState(undefined, {
      type: FETCH_STORIES_PENDING,
    });
    const check = {
      ...defaultState,
      error: null,
      pending: true,
      stories: [],
    };

    expect(state).toEqual(check);
  });

  it('returns the state for FETCH_STORIES_SUCCESS', () => {
    const stories: IStory[] = [
      {
        id: '1', slug: 'story-one', title: 'One', content: ['Story one'],
      },
      {
        id: '2', slug: 'story-two', title: 'Two', content: ['Story two'],
      },
    ];
    const state: IListState = listState(undefined, {
      type: FETCH_STORIES_SUCCESS,
      payload: { stories },
    });
    const check = {
      ...defaultState,
      error: null,
      pending: false,
      stories,
    };

    expect(state).toEqual(check);
  });

  it('returns the state for FETCH_STORIES_FAILURE', () => {
    const error: any = { dummy: 'error' };
    const state: IListState = listState(undefined, {
      type: FETCH_STORIES_FAILURE,
      error,
    });
    const check = {
      ...defaultState,
      error,
      pending: false,
      stories: [],
    };

    expect(state).toEqual(check);
  });

  it('returns the default state', () => {
    const state: IListState = listState(undefined, {});

    expect(state).toEqual(defaultState);
  });
});
