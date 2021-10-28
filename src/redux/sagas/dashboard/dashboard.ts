import { AnyAction } from 'redux';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as API from '@API';
import { TGetWeather } from '@API/types';
import * as ActionTypes from '@redux/action/types';

function* fetchAllWeather(action: AnyAction) {
  try {
    const response: TGetWeather = yield call(API.getWeather);
    yield put({ type: ActionTypes.RESOLVE_WEATHER, payload: response });
  } catch (e) {
    yield put({ type: ActionTypes.RESOLVE_WEATHER, payload: [] });
  } finally {
    if (action.callback) {
      action.callback();
    }
  }
}

export function* dashboardSagaIterator() {
  yield takeLatest(ActionTypes.FETCH_WEATHER, fetchAllWeather);
}
export default dashboardSagaIterator;
