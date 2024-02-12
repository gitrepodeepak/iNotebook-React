import React, { createContext, useState } from "react";

const AuthContext = createContext();

const Auth = ({children}) => {
    const [authenticated, setAuthentication] = useState(false);

    const setAuth = () =>{
        if(localStorage.getItem(username)!=null){
            setAuthentication(true);
        }else{
            setAuthentication(false)
        }
    }

    return(
        <>
            <AuthContext.Provider value={{authenticated, setAuth}}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export {Auth, AuthContext}