import React, { createContext, useState } from "react";

const AuthContext = createContext();

const Auth = ({children}) => {
    const [authentication, setAuthentication] = useState(false);

    const setAuth = () =>{
        setAuthentication(prevAuth => !prevAuth);
    }

    return(
        <>
            <AuthContext.Provider value={{authentication, setAuth}}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export {Auth, AuthContext}