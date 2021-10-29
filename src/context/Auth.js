import React ,{createContext, useState}from "react";
import { localStorageKeys } from "../utils/constant";
import { getLocalStorage } from "../utils/utils";
const obj = {
    user : {},
    setUser : ()=>{},
    token : "",
    setToken : () =>{},
    preUser : {},
    setPreUser : () =>{}
}
const AuthContext = createContext(obj);
const Auth = (props) => {
    const [token, setToken] = useState(getLocalStorage(localStorageKeys.token) || "");
    const [user, setUser] = useState(getLocalStorage(localStorageKeys.user) || null);
    const [preUser, setPreUser] = useState(getLocalStorage(localStorageKeys.preUser) || null)


    return <><AuthContext.Provider value={{token, setToken,user, setUser,preUser, setPreUser}}>
        {props.children}
    </AuthContext.Provider></>

}

export default Auth;
export {AuthContext}

