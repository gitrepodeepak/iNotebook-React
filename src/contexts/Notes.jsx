import React, { useState, useMemo, createContext, useContext } from "react";
import { useAuth } from '../contexts/Auth';
import axios from 'axios';

const NoteContext = createContext();

export const useNote = () =>{
    return useContext(NoteContext);
}

export const Notes = ({children}) => {
    const [notes, setNotes] = useState([]);
    const { token, isAuthenticated, username } = useAuth();

    const getNotes = async () =>{
        try {
            if (isAuthenticated()) {
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
            return error;
        }
    }

    const delNote = async (note) =>{
        const apiUrl = "http://localhost:8080/delnote"

        if (isAuthenticated()) {
            try {
                const response = await axios.post(apiUrl,{
                    "username": username,
                    "note": note
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
                console.log(response)
                return response;
            } catch (error) {
                return error
            }
        }
    }

    const addNote = async (note) =>{
        const apiUrl = "http://localhost:8080/addnote"
        const notes = [note]
        if (isAuthenticated()) {
            try {
                const response = await axios.post(apiUrl,{
                    "username": username,
                    "notes": notes
                },{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
            })
                console.log(response)
                return response;
            } catch (error) {
                return error
            }
        }
    }

    const note = useMemo(()=>({
        notes,
        getNotes,
        addNote,
        delNote
    }),[notes])

    return(
        <>
            <NoteContext.Provider value={ note }>
                {children}
            </NoteContext.Provider>
        </>
    )
}