import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "@redux-saga/core/effects";

import { watchUserLogin, watchUserLogout } from "../../features/auth/authSaga";
import {
  signupRequest,
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutFailure,
  logoutSuccess,
} from "../../features/auth/authSlice";
import userApi from "../../utils/api/user";

describe.only("authSaga test", () => {
  // it("should take success on the signupRequest", () => {
  //   const mockUser = {
  //     email: "test123123@gmail.com",
  //     name: "mock user",
  //     password: "12341234",
  //   };

  //   const mockSuccessResponse = {
  //     result: "success",
  //     data: {
  //       id: "mockId1234",
  //       email: "test123123@gmail.com",
  //       name: "mock user",
  //     },
  //   };

  //   return expectSaga(watchUserLogin)
  //     .provide([[matchers.call.fn(userApi.postSignup), mockSuccessResponse]])
  //     .put(loginSuccess(mockSuccessResponse.data))
  //     .dispatch(signupRequest(mockUser))
  //     .silentRun();
  // });
  
  // it("should take success on the loginRequest", () => {
  //   const mockSuccessResponse = {
  //     result: "success",
  //     data: {
  //       userId: "mockId1234",
  //       email: "test123123@gmail.com",
  //       name: "mock user",
  //     },
  //   };

  //   return expectSaga(watchUserLogin)
  //     .provide([[matchers.call.fn(userApi.getLogin), mockSuccessResponse]])
  //     .put(loginSuccess(mockSuccessResponse.data))
  //     .dispatch(loginRequest())
  //     .silentRun();
  // });

  // it("should take fail on the loginRequest", () => {
  //   const mockUser = {
  //     email: "test123123@gmail.com",
  //     name: "mock user",
  //     password: "12341234",
  //   };

  //   const mockfailureResponse = {
  //     response: {
  //       data: {
  //         error: {
  //           message: "test error",
  //         },
  //       },
  //     },
  //   };

  //   return expectSaga(watchUserLogin)
  //     .provide([[call(userApi.getLogin), throwError(mockfailureResponse)]])
  //     .put(loginFailure(mockfailureResponse))
  //     .dispatch(loginRequest(mockUser))
  //     .silentRun();
  // });

  it("should take success on the logoutRequest", () => {
    const mockSuccessResponse = {
      result: "success",
    };

    return expectSaga(watchUserLogout)
      .provide([[call(userApi.getLogout), mockSuccessResponse]])
      .put(logoutSuccess())
      .dispatch(logoutRequest())
      .silentRun();
  });

  it("should take fail on the logoutRequest", () => {
    const mockfailureResponse = {
      response: {
        data: {
          error: {
            message: "test error",
          },
        },
      },
    };

    return expectSaga(watchUserLogout)
      .provide([[call(userApi.getLogout), throwError(mockfailureResponse)]])
      .put(logoutFailure(mockfailureResponse))
      .dispatch(logoutRequest())
      .silentRun();
  });
});
