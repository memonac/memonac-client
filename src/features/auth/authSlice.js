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
    loginRequest: (state) => {
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
    logout: (state) => {
      state.isLogin = false;
      state.email = "";
      state.name = "";
    },
    signup: () => {

    }
  }
});

export const { 
  initiateErrorState,
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  signup,
} = slice.actions;

export default slice.reducer;
