import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { Response } from 'node-fetch';
import { apiCall } from 'common/utils';
import { PageReducerState, PageProps } from 'common/models';
import ActionTypes from './types';

/**
 * Interface declarations for actions
 */
interface FetchPageRequest {
  type: ActionTypes.FETCH_PAGE_REQUEST;
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

/**
 * Exported as types
 */
export type PageActionTypes =
  | FetchPageRequest
  | FetchPageSuccess
  | FetchPageFailure
  | ResetPage;

export type FetchPageThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  PageReducerState,
  void,
  Action<string>
>;
export type FetchPageDispatch = ThunkDispatch<
  PageReducerState,
  void,
  Action<string>
>;

/**
 * Exported actions
 */
export const fetchPageRequest = (): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_REQUEST,
});

export const fetchPageSuccess = (page: PageProps): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_SUCCESS,
  payload: page,
});

export const fetchPageFailure = (error: Error): PageActionTypes => ({
  type: ActionTypes.FETCH_PAGE_FAILURE,
  error,
});

export const resetPage = (): PageActionTypes => ({
  type: ActionTypes.RESET_PAGE,
});

export const fetchPage = (slug: string): FetchPageThunk => async (
  dispatch: FetchPageDispatch
): Promise<void> => {
  const pageRequestTimeout: number = setTimeout(
    (): PageActionTypes => dispatch(fetchPageRequest()),
    200
  );
  const url = `/content/page/${slug}`;

  try {
    const response: Response = await apiCall(url);

    if (response.status !== 200) {
      clearTimeout(pageRequestTimeout);

      throw new Error(`Content for ${url} not found`);
    }

    const page = await response.json();
    clearTimeout(pageRequestTimeout);

    dispatch(fetchPageSuccess(page));
  } catch (error) {
    dispatch(fetchPageFailure(error));
  }
};
