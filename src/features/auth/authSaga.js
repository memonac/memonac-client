import { put, call, takeLatest, all, fork } from "redux-saga/effects";

import userApi from "../../utils/api/user";
import { authenication } from "../../configs/firebase";
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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

function* userLogin({ payload }) {
  try {
    if (payload) {
      const { email, name, password } = payload;
      const firebaseResponse = yield signInWithEmailAndPassword(
        authenication,
        email,
        password
      );
      const { accessToken: token } = firebaseResponse.user;

      const serverResponse = yield call(userApi.getlogin, token);

      if (serverResponse.result === "success") {
        yield put(
          loginSuccess({
            email,
            name: name ? name : serverResponse.data.name,
            id: serverResponse.data.userId,
          })
        );
      } else {
        yield put(loginFailure(serverResponse.error));
      }
    } else {
      const provider = new GoogleAuthProvider();
      const firebaseResponse = yield signInWithPopup(authenication, provider);
      const { accessToken: token } = firebaseResponse.user;

      const serverResponse = yield call(userApi.getlogin, token);

      if (serverResponse.result === "success") {
        yield put(
          loginSuccess({
            email: firebaseResponse.user.email,
            name: firebaseResponse.user.displayName,
            id: serverResponse.data.userId,
          })
        );
      } else {
        yield put(loginFailure(serverResponse.error));
      }
    }
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* userSignup(action) {
  const { email, name, password } = action.payload;

  try {
    const firebaseResponse = yield createUserWithEmailAndPassword(
      authenication,
      email,
      password
    );

    const { accessToken: token } = firebaseResponse.user;
    const serverResponse = yield call(userApi.postsignup, {
      token,
      email,
      name,
    });

    if (serverResponse.result === "success") {
      yield put(
        loginSuccess({
          email,
          name,
        })
      );
    } else {
      yield put(loginFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(loginFailure(err));
  }
}

function* userLogout() {
  try {
    yield signOut(authenication);

    const serverResponse = yield call(userApi.getlogout);

    if (serverResponse.result === "success") {
      yield put(logoutSuccess());
    } else {
      yield put(logoutFailure(serverResponse));
    }
  } catch (err) {
    yield put(logoutFailure(err));
  }
}

function* watchUserLogin() {
  yield takeLatest(loginRequest, userLogin);
  yield takeLatest(signupRequest, userSignup);
}

function* watchUserLogout() {
  yield takeLatest(logoutRequest, userLogout);
}

export function* userSaga() {
  yield all([fork(watchUserLogin), fork(watchUserLogout)]);
}
