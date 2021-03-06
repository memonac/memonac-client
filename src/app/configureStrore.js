import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import logger from "redux-logger";

import authReducer from "../features/auth/authSlice";
import mainReducer from "../features/main/mainSlice";
import memoRoomReducer from "../features/memoroom/memoRoomSlice";

import { userSaga } from "../features/auth/authSaga";
import { memoListSaga } from "../features/main/mainSaga";
import { memoRoomSaga } from "../features/memoroom/memoRoomSaga";
import { chatSocketSaga, memoSocketSaga } from "./socketSaga";

const reducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  memoRoom: memoRoomReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    userSaga(),
    memoListSaga(),
    memoRoomSaga(),
    chatSocketSaga(),
    memoSocketSaga(),
  ]);
}

const middleware = [sagaMiddleware];

if (process.env.NODE_ENV !== "production") {
  middleware.push(logger);
}

const createStore = () => {
  const store = configureStore({
    reducer: reducer,
    middleware,
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
