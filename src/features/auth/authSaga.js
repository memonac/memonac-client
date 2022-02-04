import { put, call, takeEvery, all } from "redux-saga/effects";
import axios from "axios";

import { login } from "./authSlice";

// import { authenication } from "../../configs/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

// 예시 추후엔 별도의 모듈로 관리...
const loginApi = ({ token }) => {
  axios.post("/login", { token: token }, { withCredentials: true });
};

function* userLogin() {
  const provider = new GoogleAuthProvider();

  try {
    const response = yield signInWithPopup("/*인증*/", provider);
    const { accessToken: token } = response.user;

    // const { result, user, error }  = yield axios.post("/login", { token: token }, { withCredentials: true });

    const { result, user } = yield call(loginApi, token);

    if (result === "ok") {
      yield put(login({ email: user.email, name: user.name }));
    }
  } catch (err) {
    // 에러 처리
  }
}

function* userSginup() {}

// react 컴포너트
// dipatch("USER_LOGIN")

function* watchUserLogin() {
  yield takeEvery("USER_LOGIN", userLogin);
}

function* watchUserSignup() {
  yield takeEvery("USER_SIGNUP", userSginup);
}

export default function* authSaga() {
  yield all([watchUserLogin(), watchUserSignup()]);
}

//https://react.vlpt.us/redux-middleware/11-redux-saga-with-promise.html 참고
