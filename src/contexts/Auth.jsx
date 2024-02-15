import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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

      // console.log("token: " + token);                           //Debugging
      // console.log("token evaluation: " + token!=null);          //Debugging
      // console.log("isAuthenticated: " + isAuthenticated());    //Debugging

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

  const handleReload = () => {
    window.location.reload();
  };

  // const authorization = async () =>{
  //   const apiUrl = 'http://localhost:8080/notes';
  //   const myToken = token;
  //   try{
  //     const response = await axios.get(apiUrl,{
  //         headers: {
  //             Authorization: `Bearer ${myToken}`
  //         }
  //     })
  //     if (response.status==200) {
  //       return true;
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       console.log(error.response.status); // 401
  //       console.log(error.response.data); // 'Access Denied !! Full authentication is required to access this resource\r\n'
  //       return error.response.status!=401;
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an error
  //       console.log('Error', error.message);
  //     }
  //   }
  // }

  const auth = useMemo(() => ({
    token,
    username,
    login,
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
