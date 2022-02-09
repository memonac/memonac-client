import {
  all,
  call,
  put,
  takeEvery,
  takeLatest,
  fork,
} from "redux-saga/effects";
import memoApi from "../../utils/api/memo";
import {
  getMemoRoomSuccess,
  getMemoRoomFailure,
  addNewMemoRequest,
  addNewMemoSuccess,
  addNewMemoFailure,
} from "./memoRoomSlice";

function* getMemoRoom() {
  try {
    const memoRoomData = yield call();
    yield put(getMemoRoomSuccess(memoRoomData));
  } catch (err) {
    yield put(getMemoRoomFailure(err.message));
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

function* getMemoRoomWatcher() {
  yield takeEvery("memorooms/getMemoRoomFetch", getMemoRoom);
}

function* addNewMemoWatcher() {
  yield takeLatest(addNewMemoRequest, addNewMemo);
}

export function* memoRoomSaga() {
  yield all([fork(getMemoRoomWatcher), fork(addNewMemoWatcher)]);
}
