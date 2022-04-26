import { Middleware } from "redux";
import { RootState } from "../store";

// currying - evaluating functions with multiple arguments and decomposing them into
// a sequence of functions with a single argument
// example
const curryFunc = (a: number) => (b: number, c: number) => a + b - c;
const with3 = curryFunc(3); // a = 3
with3(2, 4); // 3 + 2 - 4 = 1
// it's basically a function generator to create re-usable functions

// middlewares are currying functions
//example
export const loggerMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (!action.type) {
    return next(action);
  }

  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("current state: ", store.getState());

  next(action);

  console.log("next state: ", store.getState());
};
