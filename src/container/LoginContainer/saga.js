import { takeEvery, call, put } from 'redux-saga/effects';

// import 'react-toastify/dist/ReactToastify.css';

import commonApi from '../api';
import config from '../../config';
import { loginSuccess, loginFail, logoutSuccess, logoutFail } from './slice';
import { clearCourse } from 'container/branchContainer/slice';

function* login(action) {
    try {
        const { user_name, password, navigate } = action.payload;

        const data = JSON.stringify({ user_name, password });
        let params = {
            api: `${config.authIp}/login`,
            method: 'POST',
            successAction: loginSuccess(),
            failAction: loginFail(),
            body: data,
            authourization: null
        };

        let res = yield call(commonApi, params);
        if (res) {
            yield localStorage.setItem(import.meta.env.VITE_APP_TOKEN, res.token);
            yield localStorage.setItem('user', JSON.stringify(res));
            yield navigate('/dashboard');
        }
    } catch (error) {
        console.error('Fail to Login----', error);
    }
}

function* logout(action) {
    try {
        const { navigate } = action.payload;

        let params = {
            api: `${config.authIp}/logout`,
            method: 'POST',
            successAction: logoutSuccess(),
            failAction: logoutFail(),
            withCredentials: true
        };

        yield call(commonApi, params);

        localStorage.removeItem(import.meta.env.VITE_APP_TOKEN);
        localStorage.removeItem('user');

        yield put(clearUser());
        yield put(clearCourse());

        navigate('/dashboard');

    } catch (error) {
        console.error('Fail to Logout ----', error);
    }
}


// function* logout() {
//     try {
//         yield localStorage.removeItem(import.meta.env.VITE_APP_TOKEN);
//         yield put(clearCourse());
//         window.location.href = '/login';
//     } catch (error) {
//         console.error('Fail to LogOut----', error);
//     }
// }

export default function* LoginActionWatcher() {
    yield takeEvery('login/userLogin', login);
    yield takeEvery('login/userLogout', logout);
    // yield takeEvery('login/getLoginUser', getLoginUserDetail);
}
