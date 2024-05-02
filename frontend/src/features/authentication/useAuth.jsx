import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./useUser";

// Create the AuthContext
const AuthContext = createContext();

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const { freshUser } = useUser();
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Effect to check if the user is authenticated when the  user changes
  useEffect(() => {
    // Check if the user is authenticated (e.g., by calling an API)
    const checkAuthentication = async () => {
      if (
        user?.role === "authenticated" ||
        freshUser?.role === "authenticated"
      ) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [user, freshUser]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
