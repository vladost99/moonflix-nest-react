import { createSlice } from '@reduxjs/toolkit';
import { getUserFromCookie, removeUserInfoFromCookie, setUserInCookie } from 'utils/user.utils';

export const userSlice = createSlice({
  name: 'User',
  initialState: {
    user: getUserFromCookie(),
    listFavorites: [],
  },
  reducers: {
    setUser: (state, action) => {
      if (action.payload === null) {
        removeUserInfoFromCookie();
      }

      if (action.payload) {
        setUserInCookie(action.payload);
      }

      state.user = action.payload;
    },
    setListFavorites: (state, action) => {
      state.listFavorites = action.payload;
    },

    removeFavorite: (state, action) => {
      const { mediaId } = action.payload;

      state.listFavorites = [...state.listFavorites].filter((e) => e.mediaId.toString() !== mediaId.toString());
    },
    addFavorite: (state, action) => {
      state.listFavorites = [action.payload, ...state.listFavorites];
    },
  },
});

export const { setUser, setListFavorites, addFavorite, removeFavorite } = userSlice.actions;
export const userSelector = (state) => state.user;

export default userSlice.reducer;
