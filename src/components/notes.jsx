import React, { useContext, useState , useEffect, useMemo} from "react";
import {AuthContext} from '../contexts/Auth';
import axios from 'axios';

export default function notes(){
    const auth = useContext(AuthContext);
    const [notes, setNotes] = useState([]);

    const getNotes = async() =>{
        if(auth.authenticated){
            const apiUrl = 'http://localhost:8080/notes';
            const token = localStorage.token;
            const response = await axios.get(apiUrl,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setNotes(response.data);
        }
    }

    useEffect(()=>{
        getNotes();
    },[auth.authenticated])

    if (localStorage.token!=null) {
        return(
            <>
                <div className="container">
                    <h1>Notes</h1>
                    <ul>
                        {notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))}
                    </ul>
                </div>
            </>
        )
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