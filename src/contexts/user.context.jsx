import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener } from "../utils/firebase/firebase.utils";
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(setCurrentUser);

    // this runs when the component unmounts
    return unsubscribe;
  }, []);

  // this provider is allowing any of its child components to have access to
  // currentUser and setCurrentUser()
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
