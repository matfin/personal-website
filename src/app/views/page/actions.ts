import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { PageProps, PageReducerState } from 'models';
import ActionTypes from './types';

/**
 * Interface declarations for actions
 */
export interface FetchPageRequest {
  type: ActionTypes.FETCH_PAGE_REQUEST;
  payload: string;
}

interface FetchPageSuccess {
  type: ActionTypes.FETCH_PAGE_SUCCESS;
  payload: PageProps;
}

interface FetchPageFailure {
  type: ActionTypes.FETCH_PAGE_FAILURE;
  error: Error;
}

interface ResetPage {
  type: ActionTypes.RESET_PAGE;
}

interface FetchPageStart {
  type: ActionTypes.FETCH_PAGE_STARTED;
}

/**
 * Exported as types
 */
export type PageActionTypes =
  | FetchPageRequest
  | FetchPageSuccess
  | FetchPageFailure
  | FetchPageStart
  | ResetPage;

export type FetchPageDispatch = ThunkDispatch<
  PageReducerState,
  void,
  Action<string>
>;

/**
 * Exported actions
 */
export const fetchPageRequest = (slug: string): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_REQUEST,
  payload: slug,
});

export const fetchPageSuccess = (page: PageProps): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_SUCCESS,
  payload: page,
});

export const fetchPageFailure = (error: Error): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_FAILURE,
  error,
});

export const fetchPageStart = (): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_STARTED,
});

export const resetPage = (): PageActionTypes => ({
  type: ActionTypes.RESET_PAGE,
});
