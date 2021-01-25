import { all } from 'redux-saga/effects';
import watchPageSagas from 'app/views/page/sagas';

export default function* rootSaga(): Generator<unknown> {
  yield all([watchPageSagas()]);
}
