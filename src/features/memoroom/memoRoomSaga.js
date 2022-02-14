import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  fork,
} from "redux-saga/effects";
import {
  getMemoListRequest,
  getMemoListSuccess,
  getMemoListFailure,
  addNewMemoRequest,
  addNewMemoSuccess,
  addNewMemoFailure,
  updateMemoStyleRequest,
  updateMemoStyleSuccess,
  updateMemoStyleFailure,
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
  postVerifyTokenSuccess,
  postVerifyTokenFailure,
  postVerifyTokenRequest,
} from "./memoRoomSlice";
import memoApi from "../../utils/api/memo";
import nodemailerApi from "../../utils/api/nodemailer";
import { memoRoomSocket } from "../../app/socketSaga";

function* getMemoList({ payload }) {
  try {
    const memoRoomData = yield call(memoApi.getMemoList, payload);

    yield put(getMemoListSuccess(memoRoomData.data));
  } catch (err) {
    yield put(getMemoListFailure(err.message));
  }
}

function* addNewMemo({ payload }) {
  try {
    const serverResponse = yield call(memoApi.addNewMemo, payload);

    if (serverResponse.result === "success") {
      yield put(addNewMemoSuccess(serverResponse.data));
    } else {
      yield put(addNewMemoFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(addNewMemoFailure(err));
  }
}

function* postSendMail({ payload }) {
  try {
    const serverResponse = yield call(nodemailerApi.postSendMail, payload);

    if (serverResponse.result === "success") {
      yield put(postSendMailSuccess(serverResponse.result));
    } else {
      yield put(postSendMailFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(postSendMailFailure(err));
  }
}

function* postVerifyToken({ payload }) {
  try {
    const serverResponse = yield call(nodemailerApi.postVerifyToken, payload);

    if (serverResponse.result === "success") {
      yield put(postVerifyTokenSuccess(serverResponse.data));
    } else {
      yield put(postVerifyTokenFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(postVerifyTokenFailure(err));
  }
}

function* updateMemoStyle({ payload }) {
  try {
    const serverResponse = yield call(memoApi.updateMemoStyle, payload);

    // console.log("여기 사가... 서버로 대답왔으", serverResponse);

    if (serverResponse.result === "success") {
      yield put(updateMemoStyleSuccess(serverResponse.data));
      yield fork(memoRoomSocket.updateMemoStyle, serverResponse.data);
    } else {
      yield put(updateMemoStyleFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(updateMemoStyleFailure(err));
  }
}

function* getMemoRoomWatcher() {
  yield takeEvery(getMemoListRequest, getMemoList);
}

function* addNewMemoWatcher() {
  yield takeLatest(addNewMemoRequest, addNewMemo);
}

function* watchPostSendMail() {
  yield takeLatest(postSendMailRequest, postSendMail);
}

function* watchPostVerifyToken() {
  yield takeLatest(postVerifyTokenRequest, postVerifyToken);
}

function* updateMemoStyleWatcher() {
  yield takeLatest(updateMemoStyleRequest, updateMemoStyle);
}

export function* memoRoomSaga() {
  yield all([
    fork(getMemoRoomWatcher),
    fork(addNewMemoWatcher),
    fork(watchPostSendMail),
    fork(watchPostVerifyToken),
    fork(updateMemoStyleWatcher),
  ]);
}
