import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "memoRoom",
  initialState: {
    isLoading: false,
    error: "",
    name: "",
    participants: [],
    memos: {},
    /*
    id: {
      userName: "userUser",
      email: "rhrnakajrw@gmail.com",
      isPending: true,
    }
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
    getMemoListRequest: (state) => {
      state.isLoading = true;
    },
    getMemoListSuccess: (state, action) => {
      const { participants, memos, slackToken, name } = action.payload;

      state.name = name;
      state.participants = participants;
      state.memos = memos;
      state.slackToken = slackToken;
      state.isLoading = false;
    },
    getMemoListFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetMemoList: (state) => {
      state.error = "";
      state.name = "";
      state.participants = [];
      state.memos = {};
    },
    joinRoom: (state, action) => {
      // 유저가 방에 참가 했을때
      // 해당 상태로 관리
    },
  },
});

export const {
  getMemoListRequest,
  getMemoListSuccess,
  getMemoListFailure,
  resetMemoList,
} = slice.actions;

export default slice.reducer;
