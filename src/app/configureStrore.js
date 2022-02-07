import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import logger from "redux-logger";

import authReducer from "../features/auth/authSlice";
import mainReducer from "../features/main/mainSlice";
import memoroomReducer from "../features/memoroom/memoRoomSlice";
import { userSaga } from "../features/auth/authSaga";
import { memoListSaga } from "../features/main/mainSaga";

const reducer = combineReducers({
  auth: authReducer,
  main: mainReducer,
  memoroom: memoroomReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([userSaga(), memoListSaga()]);
}

const createStore = () => {
  const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware, logger],
  });

  sagaMiddleware.run(rootSaga);

  return store;
};

export default createStore;
