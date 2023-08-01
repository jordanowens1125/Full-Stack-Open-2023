import { createSlice } from "@reduxjs/toolkit";
const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    showNotification(state, action) {
      const notification = action.payload;
      return notification;
    },
    clearNotification() {
      return null;
    },
  },
});

export default notificationSlice.reducer;
export const { clearNotification, showNotification } =
  notificationSlice.actions;

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(showNotification(text));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 1000*seconds);
  };
};
