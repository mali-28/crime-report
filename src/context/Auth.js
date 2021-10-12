import React ,{createContext, useState}from "react";
import { localStorageKeys } from "../utils/constant";
const obj = {
    user : {},
    setUser : ()=>{},
    token : "",
    setToken : () =>{}
}
const AuthContext = createContext(obj);
const Auth = (props) => {
    const [token, setToken] = useState(localStorageKeys.token || "");
    const [user, setUser] = useState(localStorageKeys.user || null);


    return <><AuthContext.Provider value={{token, setToken,user, setUser}}>
        {props.children}
    </AuthContext.Provider></>

}

export default Auth;
export {AuthContext}

