import { createSlice } from "@reduxjs/toolkit";
import loginApi from "../services/login";

let initialState = null;

if (localStorage.getItem("loggedBlogappUser")) {
  // initialState = JSON.parse(localStorage.getItem("loggedBlogappUser"));
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
    const user = await loginApi.login({ username, password });
    dispatch(setUser(user));
  };
};

export const logOutUser = () => {
  return async (dispatch) => {
    dispatch(logOut());
  };
};
