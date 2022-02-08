import { createSlice } from "@reduxjs/toolkit";

export const memoRoomSlice = createSlice({
  name: "memoRoom",
  initialState: {
    isLoading: false,
    error: "",
    name: "",
    participants: {},
    /*
    id: { 
      userName: "userUser",
      email: "rhrnakajrw@gmail.com",
      isPending: true,
    }
    */
    memos: {},
    /* memoId: {
      formType: "text",
      content: "abcdefg",
      location: [x, y],
      size: [120, 100],
      color: "red",
      alarmDate: "2022-02-03",
      tags: ["good", "hello"]
    } */
    slackToken: "",
  },
  reducers: {
    getMemoRoomRequest: (state) => {
      state.isLoading = true;
    },
    getMemoRoomSuccess: (state, action) => {
      const { participants, memos, slackToken, name } = action.payload;

      state.name = name;
      state.participants = participants;
      state.memos = memos;
      state.slackToken = slackToken;
      state.isLoading = false;
    },
    getMemoRoomFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    joinRoom: (state, action) => {
      // 유저가 방에 참가 했을때
      // 해당 상태로 관리
    },
  },
});

export const { getMemoRoomFetch, getMemoRoomSuccess, getMemoRoomFailure } =
  memoRoomSlice.actions;

export default memoRoomSlice.reducer;
