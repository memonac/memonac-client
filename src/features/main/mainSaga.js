import { all, put, call, takeEvery, fork } from "redux-saga/effects";
import {
  getMemoRoomListRequest,
  getMemoRoomListSuccess,
  getMemoRoomListFailure,
  addNewMemoRoomRequest,
  addNewMemoRoomSuccess,
  addNewMemoRoomFailure,
} from "./mainSlice";
import mainApi from "../../utils/api/main";

function* getMemoRoomList({ payload }) {
  const { userId } = payload;

  try {
    const memoRoomList = yield call(mainApi.getMemoRoomList, userId);
    yield put(getMemoRoomListSuccess(memoRoomList.data));
  } catch (err) {
    yield put(getMemoRoomListFailure(err));
  }
}

function* addNewMemoRoom({ payload }) {
  try {
    if (payload) {
      const { name } = payload;
      const serverResponse = yield call(mainApi.postNewMemoRoom, payload);

      if (serverResponse.result === "success") {
        yield put(addNewMemoRoomSuccess(name));
      } else {
        yield put(addNewMemoRoomFailure(serverResponse.error));
      }
    }
  } catch (err) {
    yield put(addNewMemoRoomFailure(err));
  }
}

function* watchGetMemoList() {
  yield takeEvery(getMemoRoomListRequest, getMemoRoomList);
}

function* watchAddNewMemoRoom() {
  yield takeEvery(addNewMemoRoomRequest, addNewMemoRoom);
}

export function* memoListSaga() {
  yield all([fork(watchGetMemoList), fork(watchAddNewMemoRoom)]);
}
