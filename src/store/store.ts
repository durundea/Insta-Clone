import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./slices/currentUserSlice";
import postsReducer from "./slices/postsSlice";
import uiReducer from "./slices/uiSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    posts: postsReducer,
    currentUser: currentUserReducer,
    ui: uiReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;