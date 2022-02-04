import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import logger from "redux-logger";

import authReducer from "../features/auth/authSlice";
import { watchUserLoginStatus } from "../features/auth/authSaga";

const reducer = combineReducers({
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

function* rootSaga() {
  yield all([
    watchUserLoginStatus(),
  ]);
}

const createStore = () => {
  const store = configureStore({
    reducer: reducer,
    middleware: [sagaMiddleware, logger]
  });

  sagaMiddleware.run(rootSaga);

  return store;
}

export default createStore;
