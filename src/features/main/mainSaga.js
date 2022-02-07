import { all, put, call, takeEvery } from "redux-saga/effects";
import { 
  getMemoRoomListRequest,
  getMemoRoomListSuccess,
  getMemoRoomListFailure,
  addNewMemoRoomRequest,
 } from "./mainSlice";
import mainApi from "../../utils/api/main";

function* getMemoRoomList(action) {
  const { userId } = action.payload;

  try {
    const memoRoomList = yield call(mainApi.getMemoRoomList, userId);
console.log(memoRoomList)
    yield put(getMemoRoomListSuccess(memoRoomList));
  } catch (err) {
    yield put(getMemoRoomListFailure());
  }
}

function* addNewMemoRoom({ payload }) {
  try {
    if (payload) {
      const { name } = payload;

      const serverResponse = yield call(mainApi.putMemoRoom, name);

      if (serverResponse.result === "success") {
        yield put(addNewMEmoRoomSuccess(name));
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

export default function* memoListSaga() {
  yield all([fork(watchGetMemoList), fork(watchAddNewMemoRoom)]);
}
