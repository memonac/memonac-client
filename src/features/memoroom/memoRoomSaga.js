import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import { getMemoRoomSuccess, getMemoRoomFailure } from "./memoRoomSlice";

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
  yield all([fork(getMemoRoomWatcher)]);
}
