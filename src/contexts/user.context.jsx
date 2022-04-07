import { createContext, useState } from "react";

export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  // this provider is allowing any of its child components to have access to
  // currentUser and setCurrentUser()
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserProvider;
