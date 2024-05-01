import { normaliseContent } from 'utils';
import { ContentItem, Page, PageReducerState, PageReduxAction } from 'models';

import ActionTypes from './types';

export const defaultState: PageReducerState = {
  error: null,
  pending: false,
  page: null,
};

export const pageState = (
  state: PageReducerState = defaultState,
  action: PageReduxAction,
): PageReducerState => {
  const { error, payload, type } = action;

  switch (type) {
    case ActionTypes.FETCH_PAGE_STARTED: {
      return {
        ...state,
        pending: true,
      };
    }
    case ActionTypes.FETCH_PAGE_REQUEST: {
      return {
        ...state,
        error: null,
      };
    }
    case ActionTypes.FETCH_PAGE_SUCCESS: {
      const root: ContentItem | null = payload?.root
        ? normaliseContent(payload.root)
        : null;
      const page: Page | null = payload
        ? {
            ...(payload as Page),
            root,
          }
        : null;

      return {
        ...state,
        error: null,
        pending: false,
        page,
      };
    }
    case ActionTypes.FETCH_PAGE_FAILURE: {
      return {
        ...state,
        error: error ?? new Error('The page could not be loaded'),
        pending: false,
      };
    }
    case ActionTypes.RESET_PAGE: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
