import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

const Auth = ({children}) => {
    const [authenticated, setAuthentication] = useState(false);
    const token = localStorage.token;

    useEffect(()=>{
        if(token!=null){
            setAuthentication(true)
        }else(
            setAuthentication(false)
        )
    },[token])

    return(
        <>
            <AuthContext.Provider value={{authenticated}}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export {Auth, AuthContext}