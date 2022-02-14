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
      alarmDate: "2022-02-03 00:00",
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
    addNewMemoRequest: (state) => {
      state.isLoading = true;
    },
    addNewMemoSuccess: (state, action) => {
      const { newMemo } = action.payload;

      state.memos[newMemo._id] = {
        formType: newMemo.formType,
        content: newMemo.content,
        location: newMemo.location,
        size: newMemo.size,
        color: newMemo.color,
        alarmDate: newMemo.alarmDate,
        tags: newMemo.tags,
      };
      state.isLoading = false;
    },
    addNewMemoFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    resetMemoList: (state) => {
      state.error = "";
      state.name = "";
      state.participants = [];
      state.memos = {};
    },
    removeMemoRequest: (state) => {
      state.isLoading = true;
    },
    removeMemoSuccess: (state, action) => {
      state.isLoading = false;
      delete state.memos[action.payload];
    },
    removeMemoFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    joinRoom: (state, action) => {
      // 유저가 방에 참가 했을때
      // 해당 상태로 관리
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
      state.participants = userInfo;
    },
    postVerifyTokenFailure: (state, action) => {
      const { response } = action.payload;

      state.isLoading = false;
      state.error = response.data.error.message;
    },
    addAudioFileRequest: (state) => {
      state.isLoading = true;
    },
    addAudioFileSuccess: (state, action) => {
      const { userId, memoroomId, memoId, audioUrl } = action.payload;

      state.memos[memoId].content = audioUrl;
      state.isLoading = false;
    },
    addAudioFileFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getMemoListRequest,
  getMemoListSuccess,
  getMemoListFailure,
  addNewMemoRequest,
  addNewMemoSuccess,
  addNewMemoFailure,
  removeMemoRequest,
  removeMemoSuccess,
  removeMemoFailure,
  resetMemoList,
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
  postVerifyTokenRequest,
  postVerifyTokenSuccess,
  postVerifyTokenFailure,
  addAudioFileRequest,
  addAudioFileSuccess,
  addAudioFileFailure,
} = slice.actions;

export default slice.reducer;
