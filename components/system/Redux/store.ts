//@ts-nocheck

import { createStore, Store } from "redux";
import Reducer from "./userReducer";

let store: Store;

if (typeof window !== "undefined") {
  store = createStore(
    Reducer,
    window?.__REDUX_DEVTOOLS_EXTENSION__ &&
      window?.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(Reducer);
}

export default store;
