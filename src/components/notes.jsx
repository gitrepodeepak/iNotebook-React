import React, { useContext, useState , useEffect} from "react";
import {AuthContext} from '../contexts/Auth';
import axios from 'axios';

export default function notes(){
    const auth = useContext(AuthContext);
    const [notes, setNotes] = useState("");

    useEffect(() => {
        if (auth.authenticated) {
            const apiUrl = 'http://localhost:8080/notes';
            const token = localStorage.getItem('token');
            getNotes(apiUrl, token);
        }
    }, [auth.authenticated]);

    const getNotes = async (apiUrl, token) =>{
        await axios.get(apiUrl,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response )=>{
            setNotes(response);
        }).catch(function (error) {
            console.log(error);
        })
    }

    if (auth.authenticated) {
        <>
            <div className="container">
                <h1>Notes</h1>
                <p>{notes}</p>
            </div>
        </>
    }else{
        return(
                <>
                    <div className="container">
                        <h1>Sign In</h1>
                        <p>User is not authenticated.</p>
                    </div>
                </>
            )
    }
}