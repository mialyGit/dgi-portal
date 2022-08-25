import React from "react";
import PropTypes from "prop-types";

const AuthContext = React.createContext(null);

export const AuthProvider = ({ userData ,children }) => {
  let [userSession, setUserSession] = React.useState(userData);
  // let value = React.useMemo(() => ({ user, setUser }), [user,setUser])
  userSession = typeof userSession === "string" ? JSON.parse(userSession) : userSession;

  return <AuthContext.Provider value={{ userSession, setUserSession }}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  userData: PropTypes.any,
  children: PropTypes.any,
};

export const useAuth = () => React.useContext(AuthContext);
