import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  roomId: null,
  roomCode: null,
  nickName: null,
};

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setRoomCode: (state, action) => {
      state.roomCode = action.payload;
    },
    setNickName: (state, action) => {
      state.nickName = action.payload;
    },
  },
});

export const { setRoomId, setRoomCode, setNickName } = roomSlice.actions;
export default roomSlice.reducer;
