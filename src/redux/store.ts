import { createStore, applyMiddleware } from "redux";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import {  configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";

export const store = configureStore({
  reducer: {
    user: userReducer
  },
  // preloadedState: loadState(),
  middleware: [thunk]
})

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
const makeStore = () => store;

export const wrapper = createWrapper(makeStore);