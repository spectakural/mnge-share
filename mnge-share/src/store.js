import { configureStore } from "@reduxjs/toolkit";
import roomSlice from "./redux/roomSlice";

export const store = configureStore({
  reducer: {
    // reducer
    room: roomSlice,
  },
});
