import React, { useState } from "react";
import { useAuth } from '../contexts/Auth';
import axios from 'axios';

const notes = () =>{
    const [notes, setNotes] = useState([]);
    const { token, isAuthenticated } = useAuth();

    const getNotes = async() =>{
        try {
            if(isAuthenticated()){
                const apiUrl = 'http://localhost:8080/notes';
                const myToken = token;
                const response = await axios.get(apiUrl,{
                    headers: {
                        Authorization: `Bearer ${myToken}`
                    }
                })
                if (response.data==null) {
                    return "Not Notes Found";
                }else{
                    setNotes(response.data);
                }
                return null;
            }
        } catch (error) {
            
        }
    }

    if (isAuthenticated()) {
        return(
            <>
                <div className="container">
                    <h1>Notes</h1>
                    <button onClick={getNotes}>GetNotes</button>
                    <ul>
                        {notes}
                        {/* {notes.map((note, index) => (
                            <li key={index}>{note}</li>
                        ))} */}
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

export default notes;