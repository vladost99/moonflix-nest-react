import { createSlice } from '@reduxjs/toolkit';

const globalLoadingSlice = createSlice({
  name: 'GlobalLoading',
  initialState: {
    globalLoading: false,
  },
  reducers: {
    setGlobalLoading: (state, action) => {
      state.globalLoading = action.payload;
    },
  },
});

export const { setGlobalLoading } = globalLoadingSlice.actions;
export const globalLoadingSelector = (state) => state.globalLoading;

export default globalLoadingSlice.reducer;
