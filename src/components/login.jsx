import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/Auth";
import axios from "axios";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  let auth = useContext(AuthContext);

  const handleLogin = async () => {
    console.log("Login Clicked")

    const apiUrl = "http://localhost:8080/auth/login";
  
    try {
      const response = await axios.post(apiUrl, {
        "username": username,
        "password": password,
      });
      
      const { receivedToken, receivedUsername } = response.data;
  
      localStorage.setItem("token", receivedToken);
      localStorage.setItem("username", receivedUsername);
      
      auth.setAuth();
  
      if (!auth.authentication) {
        throw new Error("Invalid username or password");
      } else {
        navigate("/notes");
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <div className="container-sm d-flex align-middle justify-content-center my-4 py-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
