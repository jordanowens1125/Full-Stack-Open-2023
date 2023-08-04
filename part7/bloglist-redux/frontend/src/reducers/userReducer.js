import { createSlice } from "@reduxjs/toolkit";
import loginApi from "../services/login";
import { createSuccess } from "./notificationReducer";

let initialState = null;

if (localStorage.getItem("loggedBlogappUser")) {
  initialState = JSON.parse(localStorage.getItem("loggedBlogappUser"));
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      window.localStorage.setItem(
        "loggedBlogappUser",
        JSON.stringify(action.payload)
      );
      return action.payload;
    },

    logOut: () => {
      window.localStorage.removeItem("loggedBlogappUser");
      return null;
    },
  },
});

export const { setUser, logOut } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginApi.login({ username, password });
      dispatch(setUser(user));
      dispatch(createSuccess(`Welcome ${username}`));
    } catch (error) {
      dispatch(logOut());
    }
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(logOut());
    dispatch(createSuccess(`You have logged out!`));
  };
};
