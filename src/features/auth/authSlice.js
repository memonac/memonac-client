import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    email: "",
    name: "",
  },
  reducers: {
    login: (state, action) => {
      const { email, name } = action.payload;
      state.isLogin = true;
      state.email = email;
      state.name = name;
    },
    logout: (state) => {
      state.isLogin = false;
      state.email = "";
      state.name = "";
    },
    signup: () => {},
    getAll: (state, action) => {
      const { memoRoom, tags } = action.payload;
      state.memoRoom = memoRoom;
      state.tags = tags;
    },
  },
});

export const { login, logout } = slice.actions;

export default slice.reducer;
