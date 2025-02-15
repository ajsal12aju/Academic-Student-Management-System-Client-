import { createSlice } from '@reduxjs/toolkit';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: {},
        loading: false,
        error: null
    },
    reducers: {
        userLogin: (state) => {
            state.loading = true;
            state.error = null;
        },
        loginSuccess: (state, action) => {
            toast.success('Login successfully', {
                autoClose: 3000
            });
            state.data = action.payload;
            state.loading = false;
        },

        loginFail: (state, action) => {
            toast.error('Login Failed', {
                autoClose: 3000
            });
            state.loading = false;
            state.error = action.payload;
        },
        getLoginUser: (state) => {
            state.loading = true;
            state.error = null;
        },
        getLoginUserSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        getLoginUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        userlogout: () => {}
    }
});

export const { userLogin, loginSuccess, loginFail, userlogout, getLoginUser, getLoginUserSuccess, getLoginUserFail } = loginSlice.actions;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
