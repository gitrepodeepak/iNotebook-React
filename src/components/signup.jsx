import { useRef, useState } from 'react';
import {useAuth} from '../contexts/Auth'
import { useNavigate } from 'react-router-dom';
import Spinner from './spinner'
import Alert from './alert';

export default function signup(){
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const confirmPassword = useRef();
    let navigate = useNavigate();

    const {signup, isAuthenticated} = useAuth();

    const [loading, setLoading] = useState(false);

    const[showAlert, setShowAlert] = useState(false);
    const[alert, setAlert] = useState({
        type: "",
        message: ""
    })

    const displayAlert = (type, message) =>{
        setAlert({type: type, message: message})
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }

    const handleSignup = async (event) => {
        setLoading(true);
        try{
            event.preventDefault();
            const myUsername = username.current.value;
            const myEmail = email.current.value;
            const myPassword = password.current.value;
            const myConfirmPassword = confirmPassword.current.value;

            if (myPassword!=myConfirmPassword) {
                displayAlert("danger", "Password doesn't match.");
            }else if(myUsername=="" || myEmail==""){
                displayAlert("danger", "Credentials cann't be empty.")
            }else{
                const response = await signup(myUsername, myEmail,  myPassword)
                displayAlert("success", response.data);
                setTimeout(() => {
                    navigate("/login");
                }, 1500);
            }
        }catch(error){
            console.log(error)
        }
        setLoading(false);
    }
    
    if (isAuthenticated()) {
        <>
            <h1>User is already Athenticated!</h1>
        </>
    }else{
        if (loading) {
            return(
                <div className="container d-flex align-middle justify-content-center mt-5">
                    <Spinner/>
                </div>
            )
        }else{
            return(
                <>
                { showAlert && <div className='container d-flex justify-content-center' style={{zIndex:10}}>
                    <Alert alert={alert} />
                    </div> }
                    
                <div className="container-md d-flex align-middle justify-content-center my-4 py-4">
                    <form onSubmit={handleSignup}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUser1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputUser1" aria-describedby="usernameHelp" ref={email}/>
                        {/* <div id="usernameHelp" className="form-text">This will be used for Login.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputUsername1" className="form-label">Email</label>
                        <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="userHelp" ref={username}/>
                        {/* <div id="userHelp" className="form-text">Enter your Email.</div> */}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputConfirmPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" id="exampleInputConfirmPassword1" ref={confirmPassword}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" ref={password}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
                </>
            )
        }
    }
}