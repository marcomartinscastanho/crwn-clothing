import { AnyAction } from "redux";

// AC = ActionCreator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>["type"];
  match(action: AnyAction): action is ReturnType<AC>;
};

export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>;
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type;
    },
  });
}

export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

export type Action<T> = {
  type: T;
};

/**
 * Function Overloading
 * In order to use function overloading we need the classic function declaration, not arrow functions
 * Overloadings are only function signatures, not the actual function
 * Overloadings must have the same number of parameters
 */
// overloadings
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;
export function createAction<T extends string>(type: T, payload: void): Action<T>;
// actual implementation of the function
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}
