import { all, put, call, takeEvery } from "redux-saga/effects";
import { getMemoRoomListRequest, getMemoRoomListSuccess, getMemoRoomListFailure } from "./mainSlice";
import mainApi from "../../utils/api/main";

function* getMemoRoomList(action) {
  const { userId } = action.payload;

  try {
    const memoRoomList = yield call(mainApi.getMemoRoomList, userId);

    yield put(getMemoRoomListSuccess(memoRoomList));
  } catch (err) {
    yield put(getMemoRoomListFailure());
  }
}

function* watchGetMemoList() {
  yield takeEvery(getMemoRoomListRequest, getMemoRoomList);
}

export default function* memoListSaga() {
  yield all([fork(watchGetMemoList)]);
}
