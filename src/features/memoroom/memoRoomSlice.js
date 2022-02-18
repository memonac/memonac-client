import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "memoRoom",
  initialState: {
    isLoading: false,
    sendMailError: "",
    sendMailSuccess: false,
    error: "",
    owner: {},
    name: "",
    participants: {},
    memos: {},
    chats: [],
    isChatLoading: false,
    chatLastIndex: null,
    chatError: "",
  },
  reducers: {
    memoInitializeState: (state) => {
      state.isLoading = false;
      state.error = "";
      state.owner = "";
      state.sendMailError = "";
      state.sendMailSuccess = false;
      state.name = "";
      state.participants = {};
      state.memos = {};
      state.chats = [];
      state.isChatLoading = false;
      state.chatLastIndex = null;
      state.chatError = "";
    },
    getMemoListRequest: (state) => {
      state.isLoading = true;
    },
    getMemoListSuccess: (state, action) => {
      const { participants, memos, name, chats, chatLastIndex, owner } =
        action.payload;

      state.name = name;
      state.owner = owner;
      state.participants = participants;
      state.memos = memos;
      state.chats = chats;
      state.isLoading = false;
      state.chatLastIndex = chatLastIndex;
    },
    getMemoListFailure: (state, action) => {
      const { message } = action.payload;

      state.isChatLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
    updateMemoLocationRequest: (state) => {
      state.isLoading = true;
    },
    updateMemoLocationSuccess: (state, action) => {
      const { memoId, left, top } = action.payload;

      state.memos[memoId].location = [left, top];
    },
    updateMemoLocationFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
    postSendMailRequest: (state) => {
      state.isLoading = true;
      state.sendMailSuccess = false;
    },
    postSendMailSuccess: (state) => {
      state.isLoading = false;
      state.sendMailSuccess = true;
      state.sendMailError = "";
    },
    postSendMailFailure: (state, action) => {
      const { response } = action.payload;

      state.isLoading = false;
      state.sendMailError = response.data.error.message;
    },
    postVerifyTokenRequest: (state) => {
      state.isLoading = true;
    },
    postVerifyTokenSuccess: (state, action) => {
      const { participants } = action.payload;

      state.isLoading = false;
      state.participants = participants;
    },
    postVerifyTokenFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isChatLoading = false;
      state.chatError = message;
    },
    leaveMemoRoomRequest: (state) => {
      state.isLoading = true;
    },
    leaveMemoRoomSuccess: (state, action) => {
      const { userId } = action.payload;

      state.isLoading = false;
      delete state.participants[userId];
    },
    leaveMemoRoomFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
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
  leaveMemoRoomRequest,
  leaveMemoRoomSuccess,
  leaveMemoRoomFailure,
  memoInitializeState,
  addAudioFileRequest,
  addAudioFileSuccess,
  addAudioFileFailure,
} = slice.actions;

export default slice.reducer;
