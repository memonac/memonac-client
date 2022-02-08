import { all, put, call, takeLatest, fork } from "redux-saga/effects";
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
      const serverResponse = yield call(mainApi.postNewMemoRoom, payload);

      if (serverResponse.result === "success") {
        yield put(addNewMemoRoomSuccess(serverResponse.data));
      } else {
        yield put(addNewMemoRoomFailure(serverResponse.error));
      }
    }
  } catch (err) {
    yield put(addNewMemoRoomFailure(err));
  }
}

function* watchGetMemoList() {
  yield takeLatest(getMemoRoomListRequest, getMemoRoomList);
}

function* watchAddNewMemoRoom() {
  yield takeLatest(addNewMemoRoomRequest, addNewMemoRoom);
}

export function* memoListSaga() {
  yield all([fork(watchGetMemoList), fork(watchAddNewMemoRoom)]);
}
