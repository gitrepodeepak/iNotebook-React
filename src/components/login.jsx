import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/Auth";
import Spinner from './spinner';

export default function login() {
  const username = useRef();
  const password = useRef();
  let navigate = useNavigate();

  const {login, isAuthenticated, handleReload } = useAuth();

  const [loading, setLoading] = useState(false);

  const handleLogin =  async (event) => {
    setLoading(true);
    event.preventDefault();
    const myUsername = username.current.value;
    const myPassword = password.current.value;
    try {
      const result = await login(myUsername, myPassword);
      // console.log(result)
      if (result === null) {
        navigate("/");
        handleReload();
      }else {
        console.log("Error Status: " + result);
      }
    } catch (error) {
      console.log(error.message);
    }
    setLoading(false);
  };
  
  if(isAuthenticated()){
    return(
      <>
        <h1>User is Already Authenticated</h1>
      </>
    )
  }else{
      if (loading) {
        return(
          <div className="container d-flex align-middle justify-content-center mt-5">
            <Spinner/>
          </div>
        )
        
      }else{
        return(
          <div className="container-sm mt-4 d-flex align-middle justify-content-center ">
            <form onSubmit={handleLogin}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="Username" ref={username}/>
                <label htmlFor="floatingInput">Username</label>
              </div>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" ref={password}/>
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-primary mt-4">Submit</button>
            </form>
          </div>
        )
      }
    }
}
