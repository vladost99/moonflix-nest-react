import { createSlice } from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'AppState',
  initialState: {
    appState: '',
  },

  reducers: {
    setAppState: (state, action) => {
      state.appState = action.payload;
    },
  },
});

export const { setAppState } = appStateSlice.actions;
export const appStateSelector = (state) => state.appState;

export default appStateSlice.reducer;
