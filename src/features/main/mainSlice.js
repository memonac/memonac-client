import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "memoRoomList",
  initialState: {
    isLoading: false,
    error: "",
    memoRooms: {},
    tags: [],
    displayedTags: [],
    tagInfo: {},
    newMemoRoomId: "",
  },
  reducers: {
    getMemoRoomListRequest: (state) => {
      console.log("here is action!");
      
      state.isLoading = true;
      state.newMemoRoomId = "";
    },
    getMemoRoomListSuccess: (state, action) => {
      const { memoRooms, tags } = action.payload;

      state.isLoading = false;
      state.memoRooms = memoRooms;
      state.tags = tags;
      state.displayedTags = tags;
      state.tags.forEach((value) => {
        state.tagInfo[value] = { isSelected: false };
      });
      state.newMemoRoomId = "";
    },
    getMemoRoomListFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
    setDisplayedTag: (state, action) => {
      const { searchedText } = action.payload;

      searchedText.replaceAll(" ", "");

      if (searchedText === "") {
        state.displayedTags = state.tags;
        return;
      }

      const result = state.tags.filter((value) => {
        return value.includes(searchedText);
      });

      state.displayedTags = result;
    },
    setTagInfo: (state, action) => {
      const { tag } = action.payload;

      state.tagInfo[tag].isSelected = !state.tagInfo[tag].isSelected;
    },
    addNewMemoRoomRequest: (state) => {
      state.isLoading = true;
    },
    addNewMemoRoomSuccess: (state, action) => {
      const { newMemoRoomId } = action.payload;

      state.isLoading = false;
      state.newMemoRoomId = newMemoRoomId;
    },
    addNewMemoRoomFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
      state.newMemoRoomId = "";
    },
    resetNewMemoRoomId: (state) => {
      state.newMemoRoomId = "";
    },
    resetMemoRoom: (state) => {
      state.isLoading = false;
      state.error = "";
      state.memoRooms = {};
      state.tags = [];
      state.displayedTags = [];
      state.tagInfo = {};
      state.newMemoRoomId = "";
    },
    editMemoRoomTitleRequest: (state) => {
      state.isLoading = true;
    },
    editMemoRoomTitleSuccess: (state, action) => {
      const { memoRoomId, name } = action.payload;

      state.isLoading = false;
      state.memoRooms[memoRoomId].name = name;
    },
    editMemoRoomTitleFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
    removeMemoRoomRequest: (state) => {
      state.isLoading = true;
    },
    removeMemoRoomSuccess: (state, action) => {
      const { memoRooms, tags } = action.payload;

      state.isLoading = false;
      state.memoRooms = memoRooms;
      state.tags = tags;
      state.displayedTags = tags;
      state.tags.forEach((value) => {
        state.tagInfo[value] = { isSelected: false };
      });
      state.newMemoRoomId = "";
    },
    removeMemoRoomFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
  },
});

export const {
  getMemoRoomListRequest,
  getMemoRoomListSuccess,
  getMemoRoomListFailure,
  setDisplayedTag,
  setTagInfo,
  addNewMemoRoomRequest,
  addNewMemoRoomSuccess,
  addNewMemoRoomFailure,
  resetNewMemoRoomId,
  resetMemoRoom,
  editMemoRoomTitleRequest,
  editMemoRoomTitleSuccess,
  editMemoRoomTitleFailure,
  removeMemoRoomRequest,
  removeMemoRoomSuccess,
  removeMemoRoomFailure,
} = slice.actions;

export default slice.reducer;
