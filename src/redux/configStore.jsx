import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer.jsx";

export const store = configureStore({
  reducer: {
    userReducer,
  },
});
