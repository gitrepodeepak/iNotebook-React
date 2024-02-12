import React, { useContext, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
import {AuthContext} from '../contexts/Auth';

export default function notes(){
    let navigate = useNavigate();
    const auth = useContext(AuthContext);

    console.log(auth.authentication)

    useEffect(()=>{
        if(auth.authentication == false){
            navigate("/");
        }
    },[auth.authentication])

    return(
        <>
            <div className="container">
                <h1>Notes</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque eum beatae est quisquam labore maiores, quaerat nam excepturi debitis nihil consequatur. Iusto explicabo ad saepe, sapiente expedita dicta sequi laudantium!</p>
            </div>
        </>
    )
}