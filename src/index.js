import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { composeWithDevTools } from "redux-devtools-extension";

import "./index.css";

import App from "./components/App";

import middleware from "./middleware";
import reducer from "./reducers";

const store = createStore(reducer, composeWithDevTools(middleware));

const Root = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<Root />, document.getElementById("root"));
