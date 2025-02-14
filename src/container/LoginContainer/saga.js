import { takeEvery, call, put } from 'redux-saga/effects';

// import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import config from '../../config';
import { loginSuccess, loginFail } from './slice';
import { clearCourse } from 'container/branchContainer/slice';

function* login(action) {
  try {
    const data = {
      email: action.payload.email,
      password: action.payload.password
    };
    const datas = JSON.stringify(data);
    let params = {
      api: `${config.authIp}/login`,
      method: 'POST',
      successAction: loginSuccess(),
      failAction: loginFail(),
      body: datas,
      authourization: null
    };

    let res = yield call(commonApi, params);
    if (res) {
      yield localStorage.setItem(import.meta.env.VITE_APP_TOKEN, res.token);
      yield localStorage.setItem('user', JSON.stringify(res));
      yield action.payload.navigate('/dashboard');
    }
  } catch (error) {
    console.error('Fail to Login----', error);
  }
}
function* logout() {
  try {
    yield localStorage.removeItem(import.meta.env.VITE_APP_TOKEN);
    yield put(clearCourse());
    window.location.href = '/login';
  } catch (error) {
    console.error('Fail to LogOut----', error);
  }
}

export default function* LoginActionWatcher() {
  yield takeEvery('login/userLogin', login);
  yield takeEvery('login/userlogout', logout);
  // yield takeEvery('login/getLoginUser', getLoginUserDetail);
}
