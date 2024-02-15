import { useRef } from 'react';
import {useAuth} from '../contexts/Auth'

export default function signup(){
    const email = useRef();
    const username = useRef();
    const password = useRef();
    const confirmPassword = useRef();

    const {signup, isAuthenticated} = useAuth();

    const handleSignup = async (event) => {
        try{
            event.preventDefault();
            const myUsername = username.current.value;
            const myEmail = email.current.value;
            const myPassword = password.current.value;
            const myConfirmPassword = confirmPassword.current.value;
            console.log(myEmail, myUsername, myPassword)
            if (myPassword!=myConfirmPassword) {
                console.log("Password Does Not Match.")
            }else{
                const response = await signup(myUsername, myEmail,  myPassword)
                console.log(response);
            }
        }catch(error){
            console.log(error)
        }
    }

    if (isAuthenticated()) {
        <>
            <h1>User is already Athenticated!</h1>
        </>
    }else{
        return(
            <>
            <div className="container-sm d-flex align-middle justify-content-center my-4 py-4">
                <form onSubmit={handleSignup}>
                <div className="mb-3">
                    <label htmlFor="exampleInputUser1" className="form-label">Username</label>
                    <input type="text" className="form-control" id="exampleInputUser1" aria-describedby="usernameHelp" ref={email}/>
                    <div id="usernameHelp" className="form-text">This will be used for Login.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputUsername1" className="form-label">Email</label>
                    <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="userHelp" ref={username}/>
                    <div id="userHelp" className="form-text">Enter your Email.</div>
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