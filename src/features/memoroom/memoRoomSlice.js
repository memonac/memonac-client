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
    memos: {
      "1": {
        formType: "text",
        content: "abcdefg",
        location: [300, 110],
        size: [120, 100],
        color: "red",
        alarmDate: "2022-02-03",
        tags: ["good", "hello"],
      },
      "2": {
        formType: "text",
        content: "abcdefg",
        location: [40, 50],
        size: [200, 400],
        color: "blue",
        alarmDate: "2022-02-03",
        tags: ["good", "hello"],
      },
      "3": {
        formType: "text",
        content: "abcdefg",
        location: [200, 90],
        size: [300, 350],
        color: "green",
        alarmDate: "2022-02-03",
        tags: ["good", "hello"],
      },
      "4": {
        formType: "text",
        content: "abcdefg",
        location: [700, 200],
        size: [500, 200],
        color: "white",
        alarmDate: "2022-02-03",
        tags: ["good", "hello"],
      },
      "5": {
        formType: "image",
        content: "abcdefg",
        location: [0, 10],
        size: [200, 200],
        color: "red",
        alarmDate: "2022-02-03",
        tags: ["good", "hello"],
      },
    },
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
