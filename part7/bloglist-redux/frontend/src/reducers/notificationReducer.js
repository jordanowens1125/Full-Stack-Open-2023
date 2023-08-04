import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, success: null },
  reducers: {
    setSuccess: (state, action) => {
      return {
        success: true,
        message: action.payload,
      };
    },
    setFailure: (state, action) => {
      return {
        success: false,
        message: action.payload,
      };
    },
    clearNotification: () => {
      return { message: null, success: null };
    },
  },
});

export const { setFailure, clearNotification, setSuccess } =
  notificationSlice.actions;
export default notificationSlice.reducer;

export const createError = (message) => {
  return async (dispatch) => {
    dispatch(setFailure(message));
  };
};

export const createSuccess = (message) => {
  return async (dispatch) => {
    dispatch(setSuccess(message));
  };
};