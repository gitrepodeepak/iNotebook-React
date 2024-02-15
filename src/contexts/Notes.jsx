import React, { useState, useMemo, createContext, useContext } from "react";
import { useAuth } from '../contexts/Auth';
import axios from 'axios';

const NoteContext = createContext();

export const useNote = () =>{
    return useContext(NoteContext);
}

export const Notes = ({children}) => {
    const [notes, setNotes] = useState([]);
    const { token, isAuthenticated, username, logout } = useAuth();

    // const checkAuth = async () =>{
    //     const result = await isAuthenticated()
    //     return result;
    //   }

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
            if (error.response.status==401) {
                console.log(error.response.status); // 401
                console.log(error.response.data); // 'Access Denied !! Full authentication is required to access this resource\r\n'
                logout();
            }else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error', error.message);
                return error;
            }
        }
    }
    
    const addNote = async (note) =>{
        const apiUrl = "http://localhost:8080/addnote"
        const notes = [note]
        try {
            if(isAuthenticated()){
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
            }
        } catch (error) {
            if (error.response.status==401) {
                console.log(error.response.status); // 401
                console.log(error.response.data); // 'Access Denied !! Full authentication is required to access this resource\r\n'
                logout();
            }else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error', error.message);
                return error;
            }
        }
    }

    const delNote = async (note) =>{
        const apiUrl = "http://localhost:8080/delnote"
        try {
            if(isAuthenticated()){
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
            }
        } catch (error) {
            if (error.response.status==401) {
                console.log(error.response.status); // 401
                console.log(error.response.data); // 'Access Denied !! Full authentication is required to access this resource\r\n'
                logout();
            }else if (error.request) {
                // The request was made but no response was received
                console.log(error.request);
            } else {
                // Something happened in setting up the request that triggered an error
                console.log('Error', error.message);
                return error;
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