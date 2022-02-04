import { configureStore, createSlice } from "@reduxjs/toolkit";

const memoRoomList = createSlice({
  name: "memoRoomList",
  initialState: {
    memoRoomId: {},
    /*{
    memoRoom : {
      "Objectid": { title: "123", tags: ["123", "788"] } 
    }
     */
    tags: [],
  },
  reducers: {
    getAll: (state, action) => {
      const { memoRoom, tags } = action.payload;
      state.memoRoom = memoRoom;
      state.tags = tags;
    },
  },
});

export const { getAll } = memoRoomList.actions;
export default configureStore({ reducer: memoRoomList.reducer });