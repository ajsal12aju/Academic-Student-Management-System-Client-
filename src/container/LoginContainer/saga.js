import { takeEvery, call, put } from 'redux-saga/effects';

// import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import config from '../../config';
import { loginSuccess, loginFail } from './slice';
import { clearCourse } from 'container/branchContainer/slice';

function* login(action) {
  console.log(action.payload)
    try {
        const data = {
            user_name: action.payload.user_name,
            password: action.payload.password
        };
        const datas = JSON.stringify(data);
        let params = {
            api: `${config.authIp}/login-tantadmin`,
            method: 'POST',
            successAction: loginSuccess(),
            failAction: loginFail(),
            body: datas,
            authourization: null
        };

        let res = yield call(commonApi, params);
        console.log(res, "==res==")
        if (res) {
          alert(action.payload.navigate)
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
