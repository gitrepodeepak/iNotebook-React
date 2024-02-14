import { useEffect, useState } from "react";
import { useAuth } from "../contexts/Auth";

export default function home(){
    const { username, isAuthenticated } = useAuth();

    if(isAuthenticated()){
        return(
            <>
                <div className="container">
                <h1>Welcome Home, {username}</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Porro recusandae, ut facere dolorem maxime provident eaque? Laborum earum repellat odit, est reprehenderit nesciunt modi mollitia quod perspiciatis voluptas recusandae debitis.</p>
                </div>
            </>
        )
    }else{
        return(
            <>
            <div className="container">
                <h1>You are not logged in yet!</h1>
            </div>
            </>
        )
    }
}