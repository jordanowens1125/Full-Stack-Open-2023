import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload;
      return notification
    },
    clearNotification(state) {
      return null
    },
  },
});

export default notificationSlice.reducer;
export const { setNotification, clearNotification } = notificationSlice.actions;
