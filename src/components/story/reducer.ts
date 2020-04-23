import { IStoryState } from 'app/common/interfaces';
import {
  FETCH_STORY_PENDING,
  FETCH_STORY_SUCCESS,
  FETCH_STORY_FAILURE,
  RESET_STORY,
} from './types';

export const defaultState: IStoryState = {
  error: null,
  pending: false,
  story: undefined,
};

export const storyState = (state = defaultState, action: any): IStoryState => {
  switch (action.type) {
    case FETCH_STORY_PENDING: {
      return {
        ...state,
        error: null,
        pending: true,
        story: undefined,
      };
    }
    case FETCH_STORY_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
        story: action?.payload?.story,
      };
    }
    case FETCH_STORY_FAILURE: {
      return {
        ...state,
        error: action?.error,
        pending: false,
        story: undefined,
      };
    }
    case RESET_STORY: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};

export default storyState;
