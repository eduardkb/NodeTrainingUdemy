import { createContext } from "react";
import useAuth from "../hooks/useAuth";

const UserContext = createContext();

function UserProvider({ children }) {
  const { authenticated, register, logout } = useAuth();

  return (
    <UserContext.Provider value={{ authenticated, register, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
