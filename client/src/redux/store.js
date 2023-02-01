import { configureStore } from "@reduxjs/toolkit";
import user from "./features/user.slice";
import themeMode from "./features/theme-mode.slice";
import appState from "./features/app-state.slice";
import authModal from "./features/auth-modal.slice";
import globalLoading from "./features/global-loading.slice";

const store = configureStore({
  reducer: {
    user,
    themeMode,
    appState,
    authModal,
    globalLoading,
  },
});

export default store;
