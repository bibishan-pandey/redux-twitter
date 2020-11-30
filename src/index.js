import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";

import App from "./components/App";

import middleware from "./middleware";
import reducer from "./reducers";

const store = createStore(reducer, composeWithDevTools(middleware));

const Root = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
