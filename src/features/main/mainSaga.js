import { all, put, call, takeLatest, fork } from "redux-saga/effects";
import {
  getMemoRoomListRequest,
  getMemoRoomListSuccess,
  getMemoRoomListFailure,
  addNewMemoRoomRequest,
  addNewMemoRoomSuccess,
  addNewMemoRoomFailure,
  editMemoRoomTitleRequest,
  editMemoRoomTitleSuccess,
  editMemoRoomTitleFailure,
  removeMemoRoomRequest,
  removeMemoRoomSuccess,
  removeMemoRoomFailure,
} from "./mainSlice";
import mainApi from "../../utils/api/main";

function* getMemoRoomList({ payload }) {
  const { userId } = payload;
  if (payload) {
    try {
      const memoRoomList = yield call(mainApi.getMemoRoomList, userId);

      yield put(getMemoRoomListSuccess(memoRoomList.data));
    } catch (err) {
      yield put(getMemoRoomListFailure(err));
    }
  }
}

function* addNewMemoRoom({ payload }) {
  try {
    const serverResponse = yield call(mainApi.postNewMemoRoom, payload);

    if (serverResponse.result === "success") {
      yield put(addNewMemoRoomSuccess(serverResponse.data));
    } else {
      yield put(addNewMemoRoomFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(addNewMemoRoomFailure(err));
  }
}

function* editMemoRoomTitle({ payload }) {
  try {
    const serverResponse = yield call(mainApi.putMemoRoomTitle, payload);

    if (serverResponse.result === "success") {
      yield put(editMemoRoomTitleSuccess(payload));
    } else {
      yield put(editMemoRoomTitleFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(editMemoRoomTitleFailure(err));
  }
}

function* removeMemoRoom({ payload }) {
  try {
    const serverResponse = yield call(mainApi.deleteMemoRoomTitle, payload);

    if (serverResponse.result === "success") {
      yield put(removeMemoRoomSuccess(serverResponse.data));
    } else {
      yield put(removeMemoRoomFailure(serverResponse.error));
    }
  } catch (err) {
    yield put(removeMemoRoomFailure(err));
  }
}

function* watchGetMemoList() {
  yield takeLatest(getMemoRoomListRequest, getMemoRoomList);
}

function* watchAddNewMemoRoom() {
  yield takeLatest(addNewMemoRoomRequest, addNewMemoRoom);
}

function* watchEditMemoRoomTitle() {
  yield takeLatest(editMemoRoomTitleRequest, editMemoRoomTitle);
}

function* watchRemoveMemoRoom() {
  yield takeLatest(removeMemoRoomRequest, removeMemoRoom);
}

export function* memoListSaga() {
  yield all([
    fork(watchGetMemoList),
    fork(watchAddNewMemoRoom),
    fork(watchEditMemoRoomTitle),
    fork(watchRemoveMemoRoom),
  ]);
}
