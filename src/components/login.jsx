import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();

  console.log(isAuthenticated())
  
  const handleLogin = async () => {login(username, password)}

  // const result = login(username, password);
  // console.log(result);

  // const handleLogin =  login(username, password);
  // {
  //   try {
  //     const result = await login(username, password);
  //     console.log(result)
  //     if (result === null) {
  //       navigate("/");
  //     } else {
  //       setError(result);
  //     }
  //   } catch (error) {
  //     setError(error.message);
  //   }
  // };

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
            <form onSubmit={handleLogin()}>
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
}
