import { IListState } from 'app/common/interfaces';
import {
  FETCH_STORIES_PENDING,
  FETCH_STORIES_SUCCESS,
  FETCH_STORIES_FAILURE,
} from './types';

export const defaultState: IListState = {
  error: null,
  pending: false,
  stories: [],
};

export const listState = (state = defaultState, action: any): IListState => {
  switch (action.type) {
    case FETCH_STORIES_PENDING: {
      return {
        ...state,
        error: null,
        pending: true,
        stories: [],
      };
    }
    case FETCH_STORIES_SUCCESS: {
      return {
        ...state,
        error: null,
        pending: false,
        stories: action.payload.stories,
      };
    }
    case FETCH_STORIES_FAILURE: {
      return {
        ...state,
        error: action.error,
        pending: false,
        stories: [],
      };
    }
    default: {
      return state;
    }
  }
};

export default listState;
