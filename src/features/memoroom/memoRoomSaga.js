import { all, call, put, takeEvery } from "redux-saga/effects";
import { getMemoRoomSuccess, getMemoRoomFailure, getMemoRoomFetch } from "./memoRoomSlice"

function* getMemoRoom() {
  try {
    const memoRoomData = yield call();
    yield put(getMemoRoomSuccess(memoRoomData));
  } catch (err) {
    yield put(getMemoRoomFailure(err.message));
  }
}

function* getMemoRoomWatcher() {
  yield takeEvery("memorooms/getMemoRoomFetch", getMemoRoom);
}

export default function* memoRoomSaga() {
  yield all([getMemoRoomWatcher()]);
}
