import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    error: "",
    id: "",
    email: "",
    name: "",
  },
  reducers: {
    initiateErrorState: (state) => {
      state.error = "";
    },
    signupRequest: (state) => {
      state.isLogin = false;
    },
    loginRequest: (state) => {
      state.isLogin = false;
    },
    loginSuccess: (state, action) => {
      const { email, name, userId } = action.payload;

      state.isLogin = true;
      state.error = "";
      state.id = userId;
      state.email = email;
      state.name = name;
    },
    loginFailure: (state, action) => {
      const { message } = action.payload;

      state.isLogin = false;
      state.error = message;
      state.id = "";
      state.email = "";
      state.name = "";
    },
    logoutRequest: (state) => {
      state.error = "";
    },
    logoutFailure: (state, action) => {
      const { message } = action.payload;

      state.isLogin = true;
      state.error = message;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      state.error = "";
      state.id = "";
      state.email = "";
      state.name = "";
    },
  },
});

export const {
  initiateErrorState,
  signupRequest,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutFailure,
  logoutSuccess,
} = slice.actions;

export default slice.reducer;
