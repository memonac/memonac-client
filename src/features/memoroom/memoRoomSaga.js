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
  updateMemoLocationRequest,
  updateMemoLocationSuccess,
  updateMemoLocationFailure,
} from "./memoRoomSlice";
import memoApi from "../../utils/api/memo";

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

function* removeMemo({ payload }) {
  const { memoId } = payload;

  try {
    const serverResponse = yield call(memoApi.removeNewMemo, payload);

    if (serverResponse.result === "success") {
      yield put(removeMemoSuccess(memoId));
    } else {
      yield put(removeMemoFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(removeMemoFailure(err));
  }
}

function* updateMemoLocation({ payload }) {
  const { memoId, left, top } = payload;

  try {
    const serverResponse = yield call(memoApi.updateMemoLocation, payload);

    if (serverResponse.result === "success") {
      yield put(updateMemoLocationSuccess({ memoId, left, top }));
    } else {
      yield put(updateMemoLocationFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(updateMemoLocationFailure(err));
  }
}

function* getMemoRoomWatcher() {
  yield takeEvery(getMemoListRequest, getMemoList);
}

function* addNewMemoWatcher() {
  yield takeLatest(addNewMemoRequest, addNewMemo);
}

function* removeMemoWatcher() {
  yield takeLatest(removeMemoRequest, removeMemo);
}

function* updateMemoLocationWatcher() {
  yield takeLatest(updateMemoLocationRequest, updateMemoLocation);
}

export function* memoRoomSaga() {
  yield all([
    fork(getMemoRoomWatcher),
    fork(addNewMemoWatcher),
    fork(removeMemoWatcher),
    fork(updateMemoLocationWatcher),
  ]);
}
