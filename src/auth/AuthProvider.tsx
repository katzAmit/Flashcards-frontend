import axios from "axios";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// Create the authentication context
export const AuthContext = createContext({
  token: "",
  setToken: (data: string) => { },
});

interface AuthProviderProps {
  children?: React.ReactNode;
}
const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token") || "");

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    if (newToken === 'delete') {
      setToken_('');
    } else {
      setToken_(newToken);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const state = useContext(AuthContext);
  if (state === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return { ...state };
};

export default AuthProvider;
