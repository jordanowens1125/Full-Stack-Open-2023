import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";

import App from "./App";
import noteReducer from "./reducers/noteReducer";
const preloadedState = {
  notes: [
    {
      content: "the app state is in redux store",
      important: true,
      id: 1,
    },
    {
      content: "state changes are made with actions",
      important: false,
      id: 2,
    },
  ],
};
const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
  preloadedState
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
