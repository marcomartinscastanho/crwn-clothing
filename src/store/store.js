import { compose, createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
// either you use sagas or thunks, their purpose is the same
// import thunk from "redux-thunk";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./root-saga";
import { rootReducer } from "./root-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
  // because we now have a spinner, we no longer need to keep the categories
  // since we're showing a spinner while we fetch the categories from the db
  // so basically all we want to keep in the LocalStorage is the cart
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const sagaMiddleware = createSagaMiddleware();

// middlewares are triggered before any action
const middleWares = [
  process.env.NODE_ENV !== "production" && logger,
  //  thunk,
  sagaMiddleware,
].filter(Boolean);
// thunks allow actions to be passed as functions
// what we want to use thunks to move asynchronous behaviours into action-driven flows

const composeEnhencer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;
const composedEnhancers = composeEnhencer(applyMiddleware(...middleWares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);
sagaMiddleware.run(rootSaga);
export const persistor = persistStore(store);
