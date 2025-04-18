import { call, takeEvery } from 'redux-saga/effects';
import config from 'config';
import commonApi from 'container/api';
import { getBranchesSuccess, getBranchesFail } from './slice';

function* getBranchesFn() {
    try {
        const params = {
            api: `${config.ip}/api/admin/get-branches`,
            method: 'GET',
            successAction: getBranchesSuccess(),
            failAction: getBranchesFail(),
            authourization: 'token', // Ensure this key matches your backend expectations
            key: config.apiKey
        };

        yield call(commonApi, params);
    } catch (error) {
        console.error('Error fetching branches:', error);
    }
}

export default function* branchActionWatcher() {
    yield takeEvery('branch/getBranches', getBranchesFn);
}
