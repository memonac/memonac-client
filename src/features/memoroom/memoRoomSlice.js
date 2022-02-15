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
    isChatLoading: false,
    chatLastIndex: null,
    chatError: "",
    slackToken: "",
  },
  reducers: {
    memoInitializeState: (state) => {
      state.isLoading = false;
      state.error = "";
      state.success = "";
      state.name = "";
      state.participants = {};
      state.memos = {};
      state.chats = [];
      state.isChatLoading = false;
      state.chatLastIndex = null;
      state.chatError = "";
      state.slackToken = "";
    },
    getMemoListRequest: (state) => {
      state.isLoading = true;
    },
    getMemoListSuccess: (state, action) => {
      const { participants, memos, slackToken, name, chats, chatLastIndex } =
        action.payload;

      state.name = name;
      state.participants = participants;
      state.memos = memos;
      state.slackToken = slackToken;
      state.chats = chats;
      state.isLoading = false;
      state.chatLastIndex = chatLastIndex;
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

      state.isLoading = false;
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

      state.isLoading = false;
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

      state.isLoading = false;
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

      state.isLoading = false;
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
    getChatListRequest: (state) => {
      state.isChatLoading = true;
    },
    getChatListSuccess: (state, action) => {
      const { chats, lastIndex } = action.payload;

      state.isChatLoading = false;
      state.chats = chats.concat(state.chats);
      state.chatLastIndex = lastIndex;
    },
    getChatListFailure: (state, action) => {
      const { response } = action.payload;

      state.isChatLoading = false;
      state.chatError = response.data.error.message;
    },
    receiveMessage: (state, action) => {
      const { user, message, date, id } = action.payload;

      state.chats.push({
        user,
        message,
        sendDate: date,
        _id: id,
      });
    },
    addAudioFileRequest: (state) => {
      state.isLoading = true;
    },
    addAudioFileSuccess: (state, action) => {
      const { memoId, audioUrl } = action.payload;

      state.isLoading = false;
      state.memos[memoId].content = audioUrl;
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
  getChatListRequest,
  getChatListSuccess,
  getChatListFailure,
  memoInitializeState,
  addAudioFileRequest,
  addAudioFileSuccess,
  addAudioFileFailure,
} = slice.actions;

export default slice.reducer;
