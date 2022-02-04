import React from "react";
import ReactDOM from "react-dom";
import App from "./app/App";

import store from "./app/configureStrore";
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
