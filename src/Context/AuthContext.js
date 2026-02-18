import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

/**
 * AuthProvider component that wraps children components with an
 * AuthContext.Provider, providing `isAuthenticated`, `loginUser`, and
 * `logoutUser` values to its children.
 *
 * `isAuthenticated` is a boolean indicating whether or not the user is
 * authenticated.
 *
 * `loginUser` is a function that sets `isAuthenticated` to true.
 *
 * `logoutUser` is a function that sets `isAuthenticated` to false and
 * clears the local storage.
 */

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      setIsAuthenticated(!!token);
      console.log("AuthContext init, token:", token, "isAuthenticated:", !!token);
    } catch (error) {
      console.error("Error in AuthContext useEffect:", error);
    }
  }, []);

  const loginUser = () => setIsAuthenticated(true);

  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("roles");
    localStorage.removeItem("username");
    localStorage.removeItem("workerID");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
