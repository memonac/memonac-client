<<<<<<< HEAD
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
=======
import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  getMemoListRequest,
  getMemoListSuccess,
  getMemoListFailure,
} from "./memoRoomSlice";
import memoApi from "../../utils/api/memo";
>>>>>>> 778567cd3ae6c4a34c6e7b88b2ca67a08c375857

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

function* getMemoRoomWatcher() {
  yield takeEvery(getMemoListRequest, getMemoList);
}

<<<<<<< HEAD
function* addNewMemoWatcher() {
  yield takeLatest(addNewMemoRequest, addNewMemo);
}

export function* memoRoomSaga() {
  yield all([fork(getMemoRoomWatcher), fork(addNewMemoWatcher)]);
=======
export function* memoRoomSaga() {
  yield all([fork(getMemoRoomWatcher)]);
>>>>>>> 778567cd3ae6c4a34c6e7b88b2ca67a08c375857
}
