import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import "react-toastify/dist/ReactToastify.css";
import { App } from "./components/App";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { reducers } from "./reducers";
import { Provider } from "react-redux";

const store = createStore(reducers, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,

  document.getElementById("root")
);
