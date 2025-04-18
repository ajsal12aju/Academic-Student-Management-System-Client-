import { delay, put } from 'redux-saga/effects';
import { Base64 } from 'js-base64';
import config from 'config';
import { toast } from 'react-toastify';
import { userLogout } from './LoginContainer/slice';

function* commonApi(value) {
    const token = yield localStorage.getItem(import.meta.env.VITE_APP_TOKEN);
    const testToken = config.testToken;
    let isTimeOut = false;

    let authorization = value.authourization
        ? value.authourization === 'Basic'
            ? 'Basic ' + Base64.btoa(value.body.email + ':' + value.body.password)
            : value.authourization === 'testToken'
              ? testToken
              : token
        : token;

        console.log(authorization, "==auth==")

    const authHeader = {
        Accept: 'application/json',
        Authorization: authorization,
        key: value.key
    };

    const noauthHeader = {
        Accept: 'application/json',
        key: value.key
    };

    const headers = value.authourization !== null ? authHeader : noauthHeader;

    console.log(headers, "==dee==")

    try {
        const isFormData = value.body instanceof FormData;
        const response = yield fetch(`${value.api}`, {
            method: `${value.method}`,
            headers: isFormData ? { ...headers } : { ...headers, 'Content-Type': 'application/json' },
            body: value.body || null
        });

        if (!response.ok) {
            if (response.status === 403) {
                isTimeOut = true;
                toast.warn('Session expired! Logging Out...', { autoClose: 1000 });
                yield delay(1100);
                yield put(userLogout({}));
            }

            if (isTimeOut) {
                return;
            }

            let errorMessage = 'Something went wrong';
            try {
                const errorJSON = yield response.json(); // ✅ Read JSON error response
                errorMessage = errorJSON.message || 'Something went wrong';
            } catch (e) {
                console.error('Error parsing response JSON:', e);
            }

            throw new Error(errorMessage); // ✅ Throw only the error message
        } else {
            if (response.status === 204) {
                yield put({
                    type: `${value.successAction.type}`,
                    payload: value.payload
                });
                return { status: response.status, payload: '' };
            } else {
                const resJSON = yield response.json();
                yield put({
                    type: `${value.successAction.type}`,
                    payload: resJSON
                });
                return resJSON;
            }
        }
    } catch (error) {
        console.error('API Request Failed:', error);

        // ✅ Dispatch failAction with the extracted error message
        yield put({
            type: `${value.failAction.type}`,
            payload: { message: error.message }
        });
    }
}

export default commonApi;
