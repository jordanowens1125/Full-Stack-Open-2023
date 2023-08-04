import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: { message: null, success: null },
  reducers: {
    setSuccess: (state, notification) => {
      return notification;
    },
    setFailure: (state, notification) => {
      return notification;
    },

    clearNotification: () => {
      return { message: null, success: null };
    },
  },
});

export const { setFailure, clearNotification, setSuccess } =
  notificationSlice.actions;
export default notificationSlice.reducer;
