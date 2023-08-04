import { configureStore } from "@reduxjs/toolkit";
import blogSlice from "./reducers/blogsReducer";
import notificationSlice from "./reducers/notificationReducer";
import userSlice from "./reducers/userReducer";
import usersSlice from "./reducers/usersReducer";

const rootReducer = {
  user: userSlice,
  notification: notificationSlice,
  blogs: blogSlice,
  users: usersSlice,
};

const store = configureStore({
  reducer: rootReducer,
  // preloadedState: {
  //   blogs: [],
  //   user: null,
  //   notification: {
  //     message: null,
  //     success: null,
  //   },
  // },
});

export default store;
