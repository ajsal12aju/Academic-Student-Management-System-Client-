import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const dashBoardSlice = createSlice({
  name: 'dashBoard',
  initialState: {
    loading: false,
    error: null,
    counts: null
  },
  reducers: {
    getDashBoardCounts: (state) => {
      state.loading = true;
      state.error = null;
    },
    getDashBoardCountsSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
      state.counts = action.payload.data;
    },
    getDashBoardCountsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Failed to fetch courses';
      toast.error('failed to fetch courses');
    }
  }
});

export const { getDashBoardCounts, getDashBoardCountsSuccess, getDashBoardCountsFail } = dashBoardSlice.actions;
export default dashBoardSlice.reducer;
