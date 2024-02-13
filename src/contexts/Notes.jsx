import React, { useEffect, useState, useMemo } from "react";
import { useAuth } from '../contexts/Auth';
import axios from 'axios';


const fetchNotes = () => {
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
                    console.log(response)
                }
                return null;
            }
        } catch (error) {
            return error
        }
    }
}

export default fetchNotes;