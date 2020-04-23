import { IStory, IStoryState } from 'app/common/interfaces';
import storyState, { defaultState } from './reducer';
import {
  FETCH_STORY_PENDING,
  FETCH_STORY_SUCCESS,
  FETCH_STORY_FAILURE,
  RESET_STORY,
} from './types';

describe('story reducer', () => {
  it('returns the state for FETCH_STORY_PENDING', () => {
    const state: IStoryState = storyState(undefined, {
      type: FETCH_STORY_PENDING,
    });
    const check = {
      ...defaultState,
      error: null,
      pending: true,
      story: undefined,
    };

    expect(state).toEqual(check);
  });

  it('returns the state for FETCH_STORY_SUCCESS', () => {
    const story: IStory = {
      id: '1', slug: 'story-one', title: 'One', content: ['Story one'],
    };
    const state: IStoryState = storyState(undefined, {
      type: FETCH_STORY_SUCCESS,
      payload: { story },
    });
    const check = {
      ...defaultState,
      error: null,
      pending: false,
      story,
    };

    expect(state).toEqual(check);
  });

  it('returns the state for FETCH_STORY_FAILURE', () => {
    const error: any = { dummy: 'error' };
    const state: IStoryState = storyState(undefined, {
      type: FETCH_STORY_FAILURE,
      error,
    });
    const check = {
      ...defaultState,
      error,
      pending: false,
      story: undefined,
    };

    expect(state).toEqual(check);
  });

  it('returns the state for RESET_STORY', () => {
    const state: IStoryState = storyState(undefined, {
      type: RESET_STORY,
    });

    expect(state).toEqual(defaultState);
  });

  it('returns the default state', () => {
    const state: IStoryState = storyState(undefined, {});

    expect(state).toEqual(defaultState);
  });
});
