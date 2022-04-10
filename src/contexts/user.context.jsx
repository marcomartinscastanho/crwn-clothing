import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

/**
 * HOW REDUCERS WORK:
 * A reducer is a function that takes an initial state and an action
 * And returns a new object with the new values (next state) after the action
 */

// we keep the context
// the context is the values that we expose, and we want to keep that.
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

// What changes is how we store and update currentUser
// we're not using useState for that anymore, we're now using a Reducer
// Reducer is a function that takes the state and an action
// Actions are objects with 2 properties: type: string and payload: any
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return { ...state, currentUser: payload };
    default:
      // if we receive a action type that we don't recognize
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

/**
 * WHY adding all this when useState was working perfectly fine ???
 * This is a very simple example, doesn't seem like we're getting much of adding all of this code
 * And we aren't.
 * For simple/small examples like this UserContext, you don't want a reducer.
 * It's too much boilerplate. Stick with the useState.
 *
 * The value of using reducers will prove in more complex cases, like out CartContext.
 */

export const UserProvider = ({ children }) => {
  // dispatch is a function that receives an action and calls the reducer with that action
  const [state, dispatch] = useReducer(userReducer, INITIAL_STATE);
  const { currentUser } = state; // destructure state to get currentUser

  const setCurrentUser = (user) => dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    // when there's a change to auth, the Observer calls the callback function with user as a parameter
    // passing the setCurrentUser means we update the user
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }

      setCurrentUser(user);
    });

    // this runs when the component unmounts
    return unsubscribe;
  }, []);

  // this provider is allowing any of its child components to have access to
  // currentUser and setCurrentUser()
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
