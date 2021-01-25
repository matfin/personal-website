import { call, cancel, delay, fork, put, takeLatest } from 'redux-saga/effects';
import { PageProps } from 'models';
import ActionTypes from './types';
import {
  fetchPageStart,
  fetchPageFailure,
  fetchPageSuccess,
  FetchPageRequest,
} from './actions';

export function* fetchPage({
  payload: slug,
}: FetchPageRequest): Generator<unknown> {
  const url = `/pages/${slug === '/' ? 'index' : slug}.json`;
  const loadingTask = yield fork(loading);

  try {
    const result = yield call(fetch, url);
    const page = yield (result as Response).json();

    yield put(fetchPageSuccess(page as PageProps));
  } catch (error) {
    yield put(fetchPageFailure(error));
  } finally {
    yield cancel(loadingTask);
  }
}

export function* loading(): Generator<unknown> {
  yield delay(200);
  yield put(fetchPageStart());
}

function* watchPageSagas(): Generator<unknown> {
  yield takeLatest(ActionTypes.FETCH_PAGE_REQUEST, fetchPage);
}

export default watchPageSagas;
