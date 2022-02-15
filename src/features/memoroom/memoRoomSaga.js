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
  removeMemoRequest,
  removeMemoSuccess,
  removeMemoFailure,
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
  postVerifyTokenSuccess,
  postVerifyTokenFailure,
  postVerifyTokenRequest,
  getChatListRequest,
  getChatListSuccess,
  getChatListFailure,
  addAudioFileRequest,
  addAudioFileSuccess,
  addAudioFileFailure,
} from "./memoRoomSlice";
import memoApi from "../../utils/api/memo";
import nodemailerApi from "../../utils/api/nodemailer";
import chatApi from "../../utils/api/chat";
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

function* getChatList({ payload }) {
  try {
    const serverResponse = yield call(chatApi.getNextChatInfo, payload);

    if (serverResponse.result === "success") {
      yield put(getChatListSuccess(serverResponse.data));
    } else {
      yield put(getChatListFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(getChatListFailure(err));
  }
}

function* addAudioFile({ payload }) {
  try {
    const serverResponse = yield call(memoApi.addAudioFile, payload);

    if (serverResponse.result === "success") {
      yield put(addAudioFileSuccess(serverResponse.data));
      yield fork(memoRoomSocket.updateMemoAudio, serverResponse.data);
    } else {
      yield put(addAudioFileFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(addAudioFileFailure(err));
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

function* getChatWatcher() {
  yield takeLatest(getChatListRequest, getChatList);
}

function* watchAddAudioFile() {
  yield takeLatest(addAudioFileRequest, addAudioFile);
}

export function* memoRoomSaga() {
  yield all([
    fork(getMemoRoomWatcher),
    fork(addNewMemoWatcher),
    fork(watchPostSendMail),
    fork(watchPostVerifyToken),
    fork(getChatWatcher),
    fork(watchAddAudioFile),
  ]);
}
