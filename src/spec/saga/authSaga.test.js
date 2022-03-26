import { expectSaga } from "redux-saga-test-plan";
import { throwError } from "redux-saga-test-plan/providers";
import { call } from "@redux-saga/core/effects";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

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
import { authentication } from "../../configs/firebase";
import userApi from "../../utils/api/user";

describe("authSaga test", () => {
  it("should take success on the signupRequest", () => {
    const mockUser = {
      email: "test123123@gmail.com",
      name: "mock user",
      password: "12341234",
    };

    const mockSuccessResponse = {
      result: "success",
      data: {
        email: "test123123@gmail.com",
        name: "mock user",
        userId: "mockId1234",
      },
    };

    const mockFirebaseResponse = {
      user: {
        accessToken: "accessToken",
      },
    };

    return expectSaga(watchUserLogin)
      .provide([
        [
          call(
            createUserWithEmailAndPassword,
            authentication,
            mockUser.email,
            mockUser.password
          ),
          mockFirebaseResponse,
        ],
        [
          call(userApi.postSignup, {
            token: mockFirebaseResponse.user.accessToken,
            email: mockUser.email,
            name: mockUser.name,
          }),
          mockSuccessResponse,
        ],
      ])
      .put(
        loginSuccess({
          email: mockUser.email,
          name: mockUser.name,
          id: mockSuccessResponse.data.userId,
        })
      )
      .dispatch(signupRequest(mockUser))
      .silentRun();
  });

  it("should take success on the loginRequest", () => {
    const mockSuccessResponse = {
      result: "success",
      data: {
        userId: "mockId1234",
        email: "test123123@gmail.com",
        name: "mock user",
      },
    };

    const mockFirebaseResponse = {
      user: {
        email: "test123123@gmail.com",
        displayName: "mock user",
        accessToken: "accessToken",
      },
    };

    const provider = new GoogleAuthProvider();

    return expectSaga(watchUserLogin)
      .provide([
        [call(signInWithPopup, authentication, provider), mockFirebaseResponse],
        [
          call(userApi.getLogin, mockFirebaseResponse.user.accessToken),
          mockSuccessResponse,
        ],
      ])
      .put(
        loginSuccess({
          email: mockSuccessResponse.data.email,
          name: mockSuccessResponse.data.name,
          id: mockSuccessResponse.data.userId,
        })
      )
      .dispatch(loginRequest())
      .silentRun();
  });

  it("should take fail on the loginRequest", () => {
    const mockfailureResponse = {
      response: {
        data: {
          error: {
            message: "test error",
          },
        },
      },
    };

    const mockFirebaseResponse = {
      user: {
        email: "test123123@gmail.com",
        displayName: "mock user",
        accessToken: "accessToken",
      },
    };

    const provider = new GoogleAuthProvider();

    return expectSaga(watchUserLogin)
      .provide([
        [call(signInWithPopup, authentication, provider), mockFirebaseResponse],
        [
          call(userApi.getLogin, mockFirebaseResponse.user.accessToken),
          throwError(mockfailureResponse),
        ],
      ])
      .put(loginFailure(mockfailureResponse))
      .dispatch(loginRequest())
      .silentRun();
  });

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
