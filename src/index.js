import  ReactDom from "react-dom";
import  * as React from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import RootRouter from "./router";

// import './assets/main.scss';

import stock from "./stores/stock";
import schoolFilterRequests from "./stores/schoolFilterRequests";

let reducer = combineReducers({
  stock,
  schoolFilterRequests  
});
const store = createStore(reducer);

ReactDom.render(<RootRouter store={store} />,document.getElementById("root"));