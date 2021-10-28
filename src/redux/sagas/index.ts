import { all, fork } from 'redux-saga/effects';

import { dashboardSagaIterator } from './dashboard/dashboard';

export default function* rootSaga() {
  yield all([fork(dashboardSagaIterator)]);
}
