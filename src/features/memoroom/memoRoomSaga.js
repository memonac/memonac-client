import {
  all,
  call,
  put,
  takeEvery,
  fork,
  takeLatest,
} from "redux-saga/effects";
import {
  getMemoRoomSuccess,
  getMemoRoomFailure,
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
} from "./memoRoomSlice";
import nodemailerApi from "../../utils/api/nodemailer";

function* getMemoRoom() {
  try {
    const memoRoomData = yield call();
    yield put(getMemoRoomSuccess(memoRoomData));
  } catch (err) {
    yield put(getMemoRoomFailure(err.message));
  }
}

function* postSendMail({ payload }) {
  try {
    const serverResponse = yield call(nodemailerApi.postSendMail, payload);

    if (serverResponse.result === "success") {
      yield put(postSendMailSuccess());
    } else {
      yield put(postSendMailFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(postSendMailFailure(err));
  }
}

function* getMemoRoomWatcher() {
  yield takeEvery("memorooms/getMemoRoomFetch", getMemoRoom);
}

function* watchPostSendMail() {
  yield takeLatest(postSendMailRequest, postSendMail);
}

export function* memoRoomSaga() {
  yield all([fork(getMemoRoomWatcher), fork(watchPostSendMail)]);
}
