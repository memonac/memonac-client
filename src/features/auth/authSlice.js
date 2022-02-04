import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    hasError: false,
    email: "",
    name: "",
  },
  reducers: {
    initiateErrorState: (state) => {
      state.hasError = false;
    },
    signupRequest: (state, action) => {
      state.isLogin = false;
    },
    loginRequest: (state, action) => {
      state.isLogin = false;
    },
    loginSuccess: (state, action) => {
      const { email, name } = action.payload;

      state.isLogin = true;
      state.hasError = false;
      state.email = email;
      state.name = name;
    },
    loginFailure: (state) => {
      state.isLogin = false;
      state.hasError = true;
      state.email = "";
      state.name = "";
    },
    logoutRequest: (state) => {
      state.isLogin = true;
    },
    logoutFailure: (state) => {
      state.isLogin = true;
      state.hasError = true;
    },
    logoutSuccess: (state) => {
      state.isLogin = false;
      state.email = "";
      state.name = "";
    },
  }
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
