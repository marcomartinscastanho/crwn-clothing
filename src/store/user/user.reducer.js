export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const INITIAL_STATE = {
  currentUser: null,
};

// Because we're no longer using useReducer - where we can specify the inital state
// we need to tell the function here what is the default value of state.
export const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      // In Redux all actions are dispatched to all reducers, so all reducers receive all actions
      // If we don't want this reducer to change the state after some action that we don't care about
      // just return the state without changing it
      return state;
  }
};
