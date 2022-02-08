import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
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
  },
});

export const { getMemoRoomRequest, getMemoRoomSuccess, getMemoRoomFailure } =
  slice.actions;

export default slice.reducer;
