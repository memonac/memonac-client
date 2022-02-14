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
    /* memoId: {
      formType: "text",
      content: "abcdefg",
      location: [x, y],
      size: [120, 100],
      color: "red",
      alarmDate: "2022-02-03 00:00",
      tags: ["good", "hello"]
    } */
    chats: [],
    slackToken: "",
  },
  reducers: {
    getMemoListRequest: (state) => {
      state.isLoading = true;
    },
    getMemoListSuccess: (state, action) => {
      const { participants, memos, slackToken, name, chats } = action.payload;

      state.name = name;
      state.participants = participants;
      state.memos = memos;
      state.slackToken = slackToken;
      state.chats = chats;
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
      const { memoId } = action.payload;

      state.isLoading = false;
      delete state.memos[memoId];
    },
    removeMemoFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemoStyleRequest: (state) => {
      state.isLoading = true;
    },
    updateMemoStyleSuccess: (state, action) => {
      const { memoId, memoColor, alarmDate, memoTags } = action.payload;

      state.memos[memoId].color = memoColor;
      state.memos[memoId].alarmDate = alarmDate;
      state.memos[memoId].tags = memoTags;
    },
    updateMemoStyleFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemoLocationRequest: (state) => {
      state.isLoading = true;
    },
    updateMemoLocationSuccess: (state, action) => {
      const { memoId, left, top } = action.payload;

      state.memos[memoId].location = [left, top];
    },
    updateMemoLocationFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemoSizeRequest: (state) => {
      state.isLoading = true;
    },
    updateMemoSizeSuccess: (state, action) => {
      const { memoId, width, height } = action.payload;

      state.memos[memoId].size = [width, height];
    },
    updateMemoSizeFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    updateMemoTextRequest: (state) => {
      state.isLoading = true;
    },
    updateMemoTextSuccess: (state, action) => {
      const { memoId, text } = action.payload;

      state.memos[memoId].content = text;
    },
    updateMemoTextFailure: (state, action) => {
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
    receiveMessage: (state, action) => {
      const { user, message, date } = action.payload;

      state.chats.push({
        user,
        message,
        sendDate: date,
      });
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
  updateMemoTextRequest,
  updateMemoTextSuccess,
  updateMemoTextFailure,
  updateMemoStyleRequest,
  updateMemoStyleSuccess,
  updateMemoStyleFailure,
  updateMemoLocationRequest,
  updateMemoLocationSuccess,
  updateMemoLocationFailure,
  updateMemoSizeRequest,
  updateMemoSizeSuccess,
  updateMemoSizeFailure,
  resetMemoList,
  receiveMessage,
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
  postVerifyTokenRequest,
  postVerifyTokenSuccess,
  postVerifyTokenFailure,
} = slice.actions;

export default slice.reducer;
