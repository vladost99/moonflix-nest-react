import { createSlice } from '@reduxjs/toolkit';
import { getLocalTheme, setLocalTheme } from 'utils/user.utils';

const localTheme = getLocalTheme();

const themeModeSlice = createSlice({
  name: 'ThemeMode',
  initialState: {
    themeMode: localTheme ? localTheme : 'dark',
  },
  reducers: {
    setThemeMode: (state, action) => {
      state.themeMode = action.payload;
      setLocalTheme(action.payload);
    },
  },
});

export const { setThemeMode } = themeModeSlice.actions;
export const themeModeSelector = (state) => state.themeMode;

export default themeModeSlice.reducer;
