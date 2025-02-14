import { call, takeEvery } from 'redux-saga/effects';
import config from 'config';
import commonApi from 'container/api';
import { getDashBoardCountsFail, getDashBoardCountsSuccess } from './slice';

function* getDashBoardCountsFn() {
  try {
    let params = {
      api: `${config.ip}/dashboard/counts`,
      method: 'GET',
      successAction: getDashBoardCountsSuccess(),
      failAction: getDashBoardCountsFail(),
      authourization: 'token',
      key: config.apiKey
    };
    yield call(commonApi, params);
  } catch (error) {
    console.log(error);
  }
}

export default function* dashboardActionWatcher() {
  yield takeEvery('dashBoard/getDashBoardCounts', getDashBoardCountsFn);
}
