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
  updateMemoTextRequest,
  updateMemoTextSuccess,
  updateMemoTextFailure,
  updateMemoStyleRequest,
  updateMemoStyleSuccess,
  updateMemoStyleFailure,
  updateMemoLocationRequest,
  updateMemoLocationSuccess,
  updateMemoLocationFailure,
  updateMemoSizeRequest,
  updateMemoSizeSuccess,
  updateMemoSizeFailure,
  postSendMailRequest,
  postSendMailSuccess,
  postSendMailFailure,
  postVerifyTokenSuccess,
  postVerifyTokenFailure,
  postVerifyTokenRequest,
  getChatListRequest,
  getChatListSuccess,
  getChatListFailure,
  leaveMemoRoomRequest,
  leaveMemoRoomSuccess,
  leaveMemoRoomFailure,
} from "./memoRoomSlice";

import { logoutRequest } from "../auth/authSlice";

import { memoRoomSocket } from "../../app/socketSaga";
import memoApi from "../../utils/api/memo";
import nodemailerApi from "../../utils/api/nodemailer";
import chatApi from "../../utils/api/chat";

function* getMemoList({ payload }) {
  try {
    const memoRoomData = yield call(memoApi.getMemoList, payload);

    yield put(getMemoListSuccess(memoRoomData.data));
  } catch (err) {
    if (err.response.data.error.message === "Expired Token") {
      yield put(logoutRequest());
    } else {
      yield put(getMemoListFailure(err.message));
    }
  }
}

function* addNewMemo({ payload }) {
  try {
    const serverResponse = yield call(memoApi.addNewMemo, payload);

    if (serverResponse.result === "success") {
      yield put(addNewMemoSuccess(serverResponse.data));
      yield fork(memoRoomSocket.addMemo, serverResponse.data);
    } else {
      yield put(addNewMemoFailure(serverResponse.error));
    }
  } catch (err) {
    if (err.response.data.error.message === "Expired Token") {
      yield put(logoutRequest());
    } else {
      yield put(addNewMemoFailure(err));
    }
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
    if (err.response.data.error.message === "Expired Token") {
      yield put(logoutRequest());
    } else {
      yield put(postSendMailFailure(err));
    }
  }
}

function* postVerifyToken({ payload }) {
  try {
    const serverResponse = yield call(nodemailerApi.postVerifyToken, payload);

    if (serverResponse.result === "success") {
      yield put(postVerifyTokenSuccess(serverResponse.data));
      yield fork(
        memoRoomSocket.updateParticipants,
        serverResponse.data.participants,
        payload.memoroomId
      );
    } else {
      yield put(postVerifyTokenFailure(serverResponse.error));
    }
  } catch (err) {
    if (err.response.data.error.message === "Expired Token") {
      yield put(logoutRequest());
    } else {
      yield put(postVerifyTokenFailure(err));
    }
  }
}

function* updateMemoStyle({ payload }) {
  try {
    const serverResponse = yield call(memoApi.updateMemoStyle, payload);

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

function* removeMemo({ payload }) {
  try {
    const serverResponse = yield call(memoApi.removeMemo, payload);

    if (serverResponse.result === "success") {
      yield put(removeMemoSuccess(payload));
      yield fork(memoRoomSocket.deleteMemo, payload.memoId);
    } else {
      yield put(removeMemoFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(removeMemoFailure(err));
  }
}

function* updateMemoText({ payload }) {
  try {
    const serverResponse = yield call(memoApi.updateMemoText, payload);

    if (serverResponse.result === "success") {
      yield put(updateMemoTextSuccess(payload));
      yield fork(memoRoomSocket.updateMemoText, payload.memoId, payload.text);
    } else {
      yield put(updateMemoTextFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(updateMemoTextFailure(err));
  }
}

function* updateMemoSize({ payload }) {
  try {
    const serverResponse = yield call(memoApi.updateMemoSize, payload);

    if (serverResponse.result === "success") {
      yield put(updateMemoSizeSuccess(payload));
      yield fork(
        memoRoomSocket.updateMemoSize,
        payload.memoId,
        payload.width,
        payload.height
      );
    } else {
      yield put(updateMemoSizeFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(updateMemoSizeFailure(err));
  }
}

function* updateMemoLocation({ payload }) {
  try {
    const serverResponse = yield call(memoApi.updateMemoLocation, payload);

    if (serverResponse.result === "success") {
      yield put(updateMemoLocationSuccess(payload));
      yield fork(
        memoRoomSocket.updateMemoLocation,
        payload.memoId,
        payload.left,
        payload.top
      );
    } else {
      yield put(updateMemoLocationFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(updateMemoLocationFailure(err));
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
    if (err.response.data.error.message === "Expired Token") {
      yield put(logoutRequest());
    } else {
      yield put(getChatListFailure(err));
    }
  }
}

function* leaveMemoRoom({ payload }) {
  try {
    const serverResponse = yield call(memoApi.leaveMemoRoom, payload);

    if (serverResponse.result === "success") {
      yield put(leaveMemoRoomSuccess(payload));
      yield fork(memoRoomSocket.withdrawRoom, payload.userId);
    } else {
      yield put(leaveMemoRoomFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(leaveMemoRoomFailure(err));
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

function* removeMemoWatcher() {
  yield takeLatest(removeMemoRequest, removeMemo);
}

function* updateMemoTextWatcher() {
  yield takeLatest(updateMemoTextRequest, updateMemoText);
}

function* updateMemoSizeWatcher() {
  yield takeLatest(updateMemoSizeRequest, updateMemoSize);
}

function* updateMemoLocationWatcher() {
  yield takeLatest(updateMemoLocationRequest, updateMemoLocation);
}

function* getChatWatcher() {
  yield takeLatest(getChatListRequest, getChatList);
}

function* leaveMemoRoomWatcher() {
  yield takeLatest(leaveMemoRoomRequest, leaveMemoRoom);
}

export function* memoRoomSaga() {
  yield all([
    fork(getMemoRoomWatcher),
    fork(addNewMemoWatcher),
    fork(watchPostSendMail),
    fork(watchPostVerifyToken),
    fork(updateMemoStyleWatcher),
    fork(removeMemoWatcher),
    fork(updateMemoTextWatcher),
    fork(updateMemoSizeWatcher),
    fork(updateMemoLocationWatcher),
    fork(getChatWatcher),
    fork(leaveMemoRoomWatcher),
  ]);
}
