import { createSlice } from '@reduxjs/toolkit';
// import toast from 'react-hot-toast';
import { toast } from 'react-toastify';

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        data: {},
        loading: false,
        error: null,
        themeMode: 'dark'
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
        userLogout: (state) => {
            state.loading = true;
            state.error = null;
        },

        logoutSuccess: (state) => {
            state.loading = false;
            state.user = null; // Clear user data
            toast.success('Logout successful');
        },

        logoutFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error('Logout failed');
        },
        toggleTheme(state) {
            state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
        }
    }
});

export const {
    userLogin,
    loginSuccess,
    loginFail,
    userLogout,
    toggleTheme,
    logoutSuccess,
    logoutFail,
    getLoginUser,
    getLoginUserSuccess,
    getLoginUserFail
} = loginSlice.actions;
export const selectError = (state) => state.login.error;

export default loginSlice.reducer;
