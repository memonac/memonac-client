import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "memoRoom",
  initialState: {
    isLoading: false,
    error: "",
    success: "",
    name: "",
    participants: {},
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
    postSendMailRequest: (state) => {
      state.isLoading = true;
    },
    postSendMailSuccess: (state, action) => {
      state.isLoading = false;
      state.success = action.payload;
    },
    postSendMailFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
    postVerifyTokenRequest: (state) => {
      state.isLoading = true;
    },
    postVerifyTokenSuccess: (state, action) => {
      const { userInfo } = action.payload;

      state.isLoading = false;
      state.participants.push(userInfo);
    },
    postVerifyTokenFailure: (state, action) => {
      const { response } = action.payload;

      state.isLoading = false;
      state.error = response.data.error.message;
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
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
  postVerifyTokenRequest,
  postVerifyTokenSuccess,
  postVerifyTokenFailure,
} = slice.actions;

export default slice.reducer;
