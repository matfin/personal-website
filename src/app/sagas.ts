import { all } from 'redux-saga/effects';
import watchPageSagas from 'app/services/page/sagas';

export default function* rootSaga(): Generator<unknown> {
  yield all([watchPageSagas()]);
}
