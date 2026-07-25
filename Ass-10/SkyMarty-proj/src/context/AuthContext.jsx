import { createContext, useState } from "react";

export const Auth =createContext();


export const AuthProvider = ({children})=>{

    const [registeredUsers, setRegisteredUsers] = useState([localStorage.getItem("registeredUsers") || []]);
    
        const [loggedInUser, setLoggedInUser] = useState(JSON.parse(localStorage.getItem("loggedInUser")) || null);



    return <Auth.Provider value={{ registeredUsers, setRegisteredUsers, loggedInUser, setLoggedInUser }}>{children}</Auth.Provider>
}
