import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function login() {
  const username = useRef();
  const password = useRef();
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const {login, isAuthenticated, handleReload } = useAuth();

  const handleLogin =  async (event) => {
    event.preventDefault();
    const myUsername = username.current.value;
    const myPassword = password.current.value;
    try {
      const result = await login(myUsername, myPassword);
      if (result === null) {
        navigate("/");
        handleReload();
      } else {
        setError(result);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if(isAuthenticated()){
    return(
      <>
        <h1>User is Already Authenticated</h1>
      </>
    )
  }else{
    return (
          <>
          <div className="container-sm d-flex align-middle justify-content-center my-4 py-4">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  ref={username}
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
                  ref={password}
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
}
