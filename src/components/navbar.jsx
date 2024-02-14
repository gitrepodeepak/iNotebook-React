import React from 'react';
import { Link, useNavigate, useLocation} from "react-router-dom";
import { useAuth } from '../contexts/Auth';

export default function navbar() {
  let location = useLocation();
  let navigate = useNavigate();

  const { logout,  isAuthenticated} = useAuth();

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light" >
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`}  aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/notes"?"active":""}`} to="/notes">Notes</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                </li>
            </ul>

            <div>
              {!isAuthenticated()?
                    (<div className="d-flex">
                      <Link to="/login"><button className="btn btn-outline-success">Login</button></Link>
                      <Link to="/signup"><button className="btn btn-outline-success ms-2">Signup</button></Link>
                    </div>): 
                    (<div className="d-flex">
                    <button className="btn btn-outline-success ms-2" onClick={()=>{logout(); navigate("/");}}>Logout</button>
                    </div>)}
            </div>
            
            </div>
          </div>
        </nav>
    </>
  );
}
