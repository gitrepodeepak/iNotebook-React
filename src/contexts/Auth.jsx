import React, { createContext, useContext, useMemo, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const Auth = ({ children }) => {
  const [token, setToken] = useState(localStorage.token);
  const [username, setUsername] = useState(localStorage.username);

  const login = async (myUsername, myPassword) => {
    const url = "http://localhost:8080/auth/login";

    try {
      const response = await axios.post(url, {
        username: myUsername,
        password: myPassword,
      });
      const { token, username } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      setToken(token);
      setUsername(username);

      return null;

    } catch (error) {
        return error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setToken(null);
    setUsername(null);
  };

  const isAuthenticated = () => {
    return token!=null;
  };

  const auth = useMemo(() => ({
    token,
    username,
    login,
    logout,
    isAuthenticated
  }),[token]);

  return (
    <>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
