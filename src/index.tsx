import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./ui/App";
import { createStore, compose } from "redux";
import rootReducer from "./redux/rootReducer";
import { Provider } from "react-redux";
import { setupCells, setupGame } from "./redux/setupGame/actions";

function createReduxStore() {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(rootReducer, composeEnhancers());
}

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export const store = createReduxStore();

store.dispatch(setupCells());
store.dispatch(setupGame());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
