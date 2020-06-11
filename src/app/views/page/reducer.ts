import { IPageState, IAction } from 'common/interfaces';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
  RESET_PAGE,
} from './types';

export const defaultState: IPageState = {
  error: null,
  pending: false,
  page: undefined,
};

export const pageState = (
  state: IPageState = defaultState,
  action: IAction,
) : IPageState => {
  const { error, payload, type } = action;

  switch (type) {
    case FETCH_PAGE_REQUEST: {
      return {
        ...defaultState,
        error: null,
        pending: true,
      };
    }
    case FETCH_PAGE_SUCCESS: {
      return {
        ...defaultState,
        error: null,
        pending: false,
        page: payload,
      };
    }
    case FETCH_PAGE_FAILURE: {
      return {
        ...defaultState,
        error,
        pending: false,
      };
    }
    case RESET_PAGE: {
      return defaultState;
    }
    default: {
      return state;
    }
  }
};
