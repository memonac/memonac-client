import { put, call, takeLatest } from "redux-saga/effects";

import { authenication } from "../../configs/firebase";
import { 
  signInWithPopup, 
  GoogleAuthProvider,
  getAuth, 
  createUserWithEmailAndPassword
} from "firebase/auth";

import { signupRequest, loginRequest, loginSuccess, loginFailure } from "./authSlice";
import userApi from "../../utils/api/user";

function* userLogin() {
  const provider = new GoogleAuthProvider();

  try {
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
  } catch (err) {
    yield put(loginFailure());
  }
}

function* userSignup(action) {
  const { email, name, password } = action.payload;
  const auth = getAuth();

  try {
    const response = yield createUserWithEmailAndPassword(auth, email, password);
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
  } catch (err) {
    yield put(loginFailure());
  }
}

export function* watchUserLogin() {
  yield takeLatest(loginRequest, userLogin);
  yield takeLatest(signupRequest, userSignup);
}
