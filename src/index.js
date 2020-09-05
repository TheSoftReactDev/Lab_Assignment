import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App";
import { render } from "react-dom";
import configureStore from "./Store";
import { Provider } from "react-redux";

const cofigStore = configureStore();
ReactDOM.render(
  <Provider store={cofigStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note t
