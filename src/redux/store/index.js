import { createStore } from "redux";
import reducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

function configureStore(preloadedState) {
  const store = createStore(reducers, composeWithDevTools(), preloadedState);

  return store;
}

const store = configureStore();

export default store;
