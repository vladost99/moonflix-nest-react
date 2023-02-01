import { createSlice } from '@reduxjs/toolkit';

const authModalSlice = createSlice({
  name: 'AuthModal',
  initialState: {
    authModalOpen: false,
  },
  reducers: {
    setAuthModalOpen: (state, action) => {
      state.authModalOpen = action.payload;
    },
  },
});

export const { setAuthModalOpen } = authModalSlice.actions;

export const authModalSelector = (state) => state.authModal;

export default authModalSlice.reducer;
