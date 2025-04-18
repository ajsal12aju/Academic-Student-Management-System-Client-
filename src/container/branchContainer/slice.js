import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const branchSlice = createSlice({
    name: 'branch',
    initialState: {
        loading: false,
        error: null,
        branchList: null
    },
    reducers: {
        getBranches: (state) => {
            state.loading = true;
            state.error = null;
        },
        getBranchesSuccess: (state, action) => {
            state.loading = false;
            state.error = null;
            state.branchList = action.payload;
        },
        getBranchesFail: (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to fetch branches';
            toast.error('Failed to fetch branches');
        },
        clearBranches: (state) => {
            state.loading = false;
            state.error = null;
            state.branchList = null;
        }
    }
});

export const { getBranches, getBranchesSuccess, getBranchesFail, clearBranches } = branchSlice.actions;

export default branchSlice.reducer;
