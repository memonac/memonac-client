import { configureStore, createSlice } from "@reduxjs/toolkit";

const memoRoomList = createSlice({
  name: "memoRoomList",
  initialState: {
    isLoading: false,
    error: "",
    memoRooms: {},

    // memoRooms: {
    //   "61fd36ea8d8b208a2f9c4d5e": { name: "room name1", tags: ["123", "788"] },
    //   "61fd36ea8d8b208a2f9c4d5f": { name: "room name2", tags: ["123", "788"] },
    // },
    // 리덕스 상태 예시
    // tags: ["1yu", "2yu", "3yu", "09", "4$1", "124", "090", "4$", "1245", "a", "b", "c", "aa", "vv", "cc", "dd", "a1", "b2", "c4", "aa3", "vv5", "cc6", "dd7"],
    // displayedTags: [],
    // tagInfo: { "1yu": { isSelected: false }, "2yu": { isSelected: false }, "3yu": { isSelected: false }, "09": { isSelected: false }, "4$1": { isSelected: false }, "124": { isSelected: true }, "090": { isSelected: false }, "4$": { isSelected: false }, "1245": { isSelected: false }, "a": { isSelected: false }, "b": { isSelected: false }, "c": { isSelected: false }, "aa": { isSelected: false }, "vv": { isSelected: false }, "cc": { isSelected: false }, "dd": { isSelected: false }, "a1": { isSelected: false }, "b2": { isSelected: false }, "c4": { isSelected: false }, "aa3": { isSelected: false }, "vv5": { isSelected: false }, "cc6": { isSelected: false }, "dd7": { isSelected: false } },
    tags: [],
    displayedTags: [],
    tagInfo: {},
    name: "",
  },
  reducers: {
    getMemoRoomListRequest: (state) => {
      state.isLoading = true;
    },
    getMemoRoomListSuccess: (state, action) => {
      const { memoRooms, tags } = action.payload;

      state.isLoading = false;
      state.memoRooms = memoRooms;
      state.tags = tags;
      state.tags.forEach((value) => {
        state.tagInfo[value] = { isSelected: false };
      });
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
      const { name } = action.payload;

      state.isLoading = false;
      state.name = name;
    },
    addNewMemoRoomFailure: (state, action) => {
      const { message } = action.payload;

      state.isLoading = false;
      state.error = message;
    },
  },
});

export const {
  getMemoRoomListRequest,
  setDisplayedTag,
  setTagInfo,
  addNewMemoRoomRequest,
  addNewMemoRoomSuccess,
  addNewMemoRoomFailure,
} = memoRoomList.actions;

export default memoRoomList.reducer;
