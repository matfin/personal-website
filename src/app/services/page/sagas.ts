import { StrictEffect, Task } from '@redux-saga/types';
import {
  call,
  cancel,
  cancelled,
  delay,
  fork,
  put,
  take,
} from 'redux-saga/effects';
import { query } from 'app/services/api';

import { Page } from 'models';
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
  const abortController: AbortController = new AbortController();
  const url = `/pages/${slug === '/' ? 'index' : slug}.json`;
  const loadingTask = yield fork(loading);

  try {
    const page = yield call(query, { url, signal: abortController.signal });

    yield put(fetchPageSuccess(page as Page));
  } catch (error) {
    yield put(fetchPageFailure(error as Error));
  } finally {
    yield cancel(loadingTask as Task);

    if (yield cancelled()) {
      abortController.abort();
    }
  }
}

export function* loading(): Generator<unknown> {
  yield delay(200);
  yield put(fetchPageStart());
}

function* rootSaga(): Generator<StrictEffect, number, Task> {
  let payload;

  while ((payload = yield take(ActionTypes.FETCH_PAGE_REQUEST))) {
    const fetchTask = yield fork(fetchPage, payload);

    yield take(ActionTypes.RESET_PAGE);
    yield cancel(fetchTask);
  }

  return 0;
}

export default rootSaga;
