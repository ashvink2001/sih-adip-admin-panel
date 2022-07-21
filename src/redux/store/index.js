import { createStore, applyMiddleware, compose } from "redux";
import reducers from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";
//import createSagaMiddleware from "redux-saga";
// import rootSaga from "../sagas/index";

// const sagaMiddleware = createSagaMiddleware();

// const middlewares = [sagaMiddleware];

function configureStore(preloadedState) {
  // const composeEnhancers =
  //   (typeof window != "undefined" &&
  //     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  //   compose;
  const store = createStore(
    reducers,
    composeWithDevTools(),
    preloadedState

    // composeEnhancers(applyMiddleware(...middlewares))
  );

  // sagaMiddleware.run(rootSaga);

  // if (module.hot) {
  //   module.hot.accept("../reducers/index", () => {
  //     const nextRootReducer = require("../reducers/index");
  //     store.replaceReducer(nextRootReducer);
  //   });
  // }

  return store;
}

const store = configureStore();

export default store;
