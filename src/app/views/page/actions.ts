import { apiCall } from 'common/utils';
import { AppThunk, IPage } from 'common/interfaces';
import {
  FETCH_PAGE_REQUEST,
  FETCH_PAGE_SUCCESS,
  FETCH_PAGE_FAILURE,
  RESET_PAGE,
} from './types';

/**
 * Interface declarations for actions
 */
interface IFetchPageRequest {
  type: typeof FETCH_PAGE_REQUEST,
}

interface IFetchPageSuccess {
  type: typeof FETCH_PAGE_SUCCESS,
  payload: IPage,
}

interface IFetchPageFailure {
  type: typeof FETCH_PAGE_FAILURE,
  error: any,
}

interface IResetPage {
  type: typeof RESET_PAGE,
}

/**
 * Exported as types
 */
export type PageActionTypes =
  IFetchPageRequest | IFetchPageSuccess | IFetchPageFailure | IResetPage;

/**
 * Exported actions
 */
export const fetchPageRequest = (): PageActionTypes => ({
  type: FETCH_PAGE_REQUEST
});

export const fetchPageSuccess = (page: IPage): PageActionTypes => ({
  type: FETCH_PAGE_SUCCESS,
  payload: page
});

export const fetchPageFailure = (error: any): PageActionTypes => ({
  type: FETCH_PAGE_FAILURE,
  error,
});

export const resetPage = (): PageActionTypes => ({
  type: RESET_PAGE
});

export const fetchPage = (slug: string): AppThunk => async dispatch => {
  dispatch(fetchPageRequest());

  try {
    const response: Response = await apiCall(`/content/page/${slug}`);
    const page: IPage = await response.json();

    dispatch(fetchPageSuccess(page));
  } catch (error) {
    dispatch(fetchPageFailure(error));
  }
};