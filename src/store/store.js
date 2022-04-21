import { compose, createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// currying - evaluating functions with multiple arguments and decomposing them into
// a sequence of functions with a single argument
// example
const curryFunc = (a) => (b, c) => a + b - c;
const with3 = curryFunc(3); // a = 3
const res = with3(2, 4); // 3 + 2 - 4 = 1
// it's basically a function generator to create re-usable functions

// middlewares are currying functions
//example
const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};

// middlewares are triggered before any action
const middleWares = [loggerMiddleware];
const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
