import { all, call, put, takeEvery, fork } from "redux-saga/effects";
import {
  getMemoListRequest,
  getMemoListSuccess,
  getMemoListFailure,
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

function* getMemoRoomWatcher() {
  yield takeEvery(getMemoListRequest, getMemoList);
}

export function* memoRoomSaga() {
  yield all([fork(getMemoRoomWatcher)]);
}
