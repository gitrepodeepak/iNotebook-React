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
      if (error.response) {
          console.log(error.response.status); // 401
          console.log(error.response.data); // 'Access Denied !! Full authentication is required to access this resource\r\n'
          return error.response.status;
      }else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error', error.message);
          return error;
      }
    }
  };

  const signup = async (myEmail, myUsername, myPassword) => {
    const url = "http://localhost:8080/signup";
    try {
      const response = await axios.post(url, {
        email: myEmail,
        username: myUsername,
        password: myPassword,
      });
      console.log(response)
      return response;

    } catch (error) {
      if (error.response) {
        console.log(error.response.status); // 401
        console.log(error.response.data); // 'Access Denied !! Full authentication is required to access this resource\r\n'
      }else if (error.request) {
          // The request was made but no response was received
          console.log(error.request);
      } else {
          // Something happened in setting up the request that triggered an error
          console.log('Error', error.message);
          return error;
      }
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

  const handleReload = () => {
    window.location.reload();
  };

  const auth = useMemo(() => ({
    token,
    username,
    login,
    signup,
    logout,
    isAuthenticated,
    handleReload
  }),[token]);

  return (
    <>
      <AuthContext.Provider value={auth}>
        {children}
      </AuthContext.Provider>
    </>
  );
};
