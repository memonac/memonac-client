import { all, put, call, takeEvery } from "redux-saga/effects";
import { getAll } from "./mainSlice";

function* getAllMemoList() {
  try {
    const memoList = yield call();
    yield put(getAll(memoList));
  } catch (err) {
    yield put();
  }
}

function* watchGetMemoList() {
  yield takeEvery(getAll, getAllMemoList);
}

export default function* memoListSaga() {
  yield all([watchGetMemoList()]);
}
