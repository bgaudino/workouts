import { useState, useEffect, useContext, createContext } from "react";
import { axiosInstance } from "../utils/axios";

const authContext = createContext();

export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const signIn = async () => {
    try {
      const res = await axiosInstance.get("/user/");
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (err) {
      console.log(err);
      signOut();
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsAuthenticated(false);
  };

  return {
    user,
    isAuthenticated,
    loading,
    signIn,
    signOut,
  };
}
