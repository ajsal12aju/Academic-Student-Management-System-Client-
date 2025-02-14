import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const commonMenuSlice = createSlice({
    name: 'commonMenu',
    initialState: {
        commonMenuData: [],
        menuDataCount: 0,
        loading: false,
        error: null,
    },
    reducers: {
        getMenuData: (state) => {
            state.loading = true;
            state.error = null;
        },
        getMenuDataSuccess: (state, action) => {
            state.loading = false;
            state.commonMenuData = action.payload.data
            state.menuDataCount = action.payload.total
        },
        getMenuDataFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error('menu data fetching failed', {
                autoClose: 2000
            });
        },

        getMenuDataCount: (state) => {
            state.loading = true;
            state.error = null;
        },
        getMenuDataCountSuccess: (state, action) => {
            toast.success('Data count fetched successfully', { autoClose: 2000 });
            state.loading = false;
            state.menuDataCount = action.payload.message
        },
        getMenuDataCountFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error('menu data count fetching failed', {
                autoClose: 2000
            });
        },
    }
});

export const { getMenuData, getMenuDataSuccess, getMenuDataFail, getMenuDataCount, getMenuDataCountSuccess, getMenuDataCountFail } =
    commonMenuSlice.actions;

export default commonMenuSlice.reducer;
