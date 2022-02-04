import { put, call, takeLatest } from "redux-saga/effects";

import { authenication } from "../../configs/firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  signupRequest,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "./authSlice";
import userApi from "../../utils/api/user";

function* userLogin({ payload }) {
  try {
    if (payload) {
      const { email, password } = payload;
      const response = yield signInWithEmailAndPassword(authenication, email, password);
      const { accessToken: token } = response.user;

      const { result } = yield call(userApi.getlogin, token);

      if (result === "success") {
        yield put(
          loginSuccess({
            email: response.user.email,
            name: response.user.displayName,
          })
        );
      } else {
        yield put(loginFailure());
      }
    } else {
      const provider = new GoogleAuthProvider();
      const response = yield signInWithPopup(authenication, provider);
      const { accessToken: token } = response.user;

      const { result } = yield call(userApi.getlogin, token);

      if (result === "success") {
        yield put(
          loginSuccess({
            email: response.user.email,
            name: response.user.displayName,
          })
        );
      } else {
        yield put(loginFailure());
      }
    }
  } catch (err) {
    yield put(loginFailure());
  }
}

function* userSignup(action) {
  const { email, name, password } = action.payload;

  try {
    const response = yield createUserWithEmailAndPassword(
      authenication,
      email,
      password
    );
    yield updateProfile(authenication.currentUser, { displayName: name });
    
    const { accessToken: token } = response.user;
    const { result } = yield call(userApi.getlogin, token);

    if (result === "success") {
      yield put(
        loginSuccess({
          email,
          name,
        })
      );
    } else {
      yield put(loginFailure());
    }
  } catch (err) {
    yield put(loginFailure());
  }
}

function* userLogout() {
  try {
    yield signOut(authenication);

    const { result } = yield call(userApi.getlogout);

    if (result === "success") {
      yield put(logoutSuccess());
    } else {
      yield put(logoutFailure());
    }
  } catch (err) {
    yield put(logoutFailure());
  }
}

export function* watchUserLoginStatus() {
  yield takeLatest(loginRequest, userLogin);
  yield takeLatest(signupRequest, userSignup);
  yield takeLatest(logoutRequest, userLogout);
}
