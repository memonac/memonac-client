import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";

import {
  watchGetMemoList,
  watchAddNewMemoRoom,
  watchEditMemoRoomTitle,
  watchRemoveMemoRoom,
} from "../../features/main/mainSaga";
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
} from "../../features/main/mainSlice";
import mainApi from "../../utils/api/main";

describe.skip("mainSaga test", () => {
  it("should take success on the getMemoRoomListRequest action", () => {
    const fakeMemoRoomList = {
      data: {
        memoRooms: {
          roomObjectId: {
            name: "test",
            owner: "userObejectId",
          },
          participants: ["공"],
          tags: ["testTag"],
        },
        tags: ["testTag"],
      },
    };

    return expectSaga(watchGetMemoList, mainApi)
      .provide([[matchers.call.fn(mainApi.getMemoRoomList), fakeMemoRoomList]])
      .put(getMemoRoomListSuccess(fakeMemoRoomList.data))
      .dispatch(getMemoRoomListRequest("test"))
      .silentRun();
  });

  it("should take fail on the getMemoRoomListRequest action", () => {
    const error = {
      response: {
        data: {
          error: {
            message: "err",
          },
        },
      },
    };

    return expectSaga(watchGetMemoList, mainApi)
      .provide([[matchers.call.fn(mainApi.getMemoRoomList), throwError(error)]])
      .put(getMemoRoomListFailure(error))
      .dispatch(getMemoRoomListRequest("test"))
      .silentRun();
  });

  it("should take success on the watchAddNewMemoRoom action", () => {
    const fakeResponse = {
      result: "success",
      data: {
        newMemoRoomId: "abcd1234",
      },
    };

    return expectSaga(watchAddNewMemoRoom, mainApi)
      .provide([[matchers.call.fn(mainApi.postNewMemoRoom), fakeResponse]])
      .put(addNewMemoRoomSuccess(fakeResponse.data))
      .dispatch(addNewMemoRoomRequest("test"))
      .silentRun();
  });

  it("should take fail on the watchAddNewMemoRoom action", () => {
    const error = {
      response: {
        data: {
          error: {
            message: "err",
          },
        },
      },
    };

    return expectSaga(watchAddNewMemoRoom, mainApi)
      .provide([[matchers.call.fn(mainApi.postNewMemoRoom), throwError(error)]])
      .put(addNewMemoRoomFailure(error))
      .dispatch(addNewMemoRoomRequest("test"))
      .silentRun();
  });

  it("should take success on the watchEditMemoRoomTitle action", () => {
    const fakeResponse = {
      result: "success",
    };

    return expectSaga(watchEditMemoRoomTitle, mainApi)
      .provide([[matchers.call.fn(mainApi.putMemoRoomTitle), fakeResponse]])
      .put(editMemoRoomTitleSuccess("test"))
      .dispatch(editMemoRoomTitleRequest("test"))
      .silentRun();
  });

  it("should take fail on the watchEditMemoRoomTitle action", () => {
    const error = {
      response: {
        data: {
          error: {
            message: "err",
          },
        },
      },
    };

    return expectSaga(watchEditMemoRoomTitle, mainApi)
      .provide([
        [matchers.call.fn(mainApi.putMemoRoomTitle), throwError(error)],
      ])
      .put(editMemoRoomTitleFailure(error))
      .dispatch(editMemoRoomTitleRequest("test"))
      .silentRun();
  });

  it("should take success on the watchRemoveMemoRoom action", () => {
    const fakeResponse = {
      data: {
        memoRooms: {
          roomObjectId: {
            name: "test",
            owner: "userObejectId",
          },
          participants: ["공"],
          tags: ["testTag"],
        },
        tags: ["testTag"],
      },
      result: "success",
    };

    return expectSaga(watchRemoveMemoRoom, mainApi)
      .provide([[matchers.call.fn(mainApi.deleteMemoRoomTitle), fakeResponse]])
      .put(removeMemoRoomSuccess(fakeResponse.data))
      .dispatch(removeMemoRoomRequest("test"))
      .silentRun();
  });

  it("should take fail on the watchRemoveMemoRoom action", () => {
    const error = {
      response: {
        data: {
          error: {
            message: "err",
          },
        },
      },
    };

    return expectSaga(watchRemoveMemoRoom, mainApi)
      .provide([
        [matchers.call.fn(mainApi.deleteMemoRoomTitle), throwError(error)],
      ])
      .put(removeMemoRoomFailure(error))
      .dispatch(removeMemoRoomRequest("test"))
      .silentRun();
  });
});
