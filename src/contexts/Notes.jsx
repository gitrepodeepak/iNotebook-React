import React, { useState, useMemo, createContext, useContext } from "react";
import { useAuth } from '../contexts/Auth';
import axios from 'axios';

const NoteContext = createContext();

export const useNote = () =>{
    return useContext(NoteContext);
}

export const Notes = ({children}) => {
    const [notes, setNotes] = useState([]);
    const { token, isAuthenticated } = useAuth();

    const getNotes = async () =>{
        try {
            if(isAuthenticated()){
                const apiUrl = 'http://localhost:8080/notes';
                const myToken = token;
                const response = await axios.get(apiUrl,{
                    headers: {
                        Authorization: `Bearer ${myToken}`
                    }
                })
                if (response.data!=null) {
                    setNotes(response.data);
                }else{
                    return "Not Notes Found";
                }
                return null;
            }
        } catch (error) {
            return error
        }
    }

    const note = useMemo(()=>({
        notes,
        getNotes
    }),[notes])

    return(
        <>
            <NoteContext.Provider value={ note }>
                {children}
            </NoteContext.Provider>
        </>
    )
}