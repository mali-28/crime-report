import React, { createContext, useEffect, useState } from "react";
import { localStorageKeys } from "../utils/constant";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "../utils/utils";
import { getDatabase, ref, set,get, onChildAdded,child } from "firebase/database";
const obj = {
  user: {},
  setUser: () => { },
  token: "",
  setToken: () => { },
  preUser: {},
  setPreUser: () => { },
  userData: [],
  setUserData: () => { },
  writeUserData: () => { },
}


const AuthContext = createContext(obj);
const Auth = (props) => {
  const db = getDatabase();
  const [token, setToken] = useState(getLocalStorage(localStorageKeys.token) || "");
  const [user, setUser] = useState(getLocalStorage(localStorageKeys.user) || null);
  const [preUser, setPreUser] = useState(getLocalStorage(localStorageKeys.preUser) || null)
  const [userData, setUserData] = useState([]);

  console.log("userData",userData)
  const writeUserData = (title, userId, data) => {
    set(ref(db, `${title}/` + userId), {
      ...data
    });
    const { token, password, ...remaining } = data;
    setLocalStorage(localStorageKeys.token, token)
    setToken(getLocalStorage(localStorageKeys.token));
    setLocalStorage(localStorageKeys.user, remaining)
  }

  const database =  () =>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      let object = [];
        if (snapshot.exists()) {
            const snaps = snapshot.val();
            object  = Object.keys(snaps).map((id)=>{
              // console.log("val",id, snaps)
              const data = {...snaps[id], id}
              return data;
            })
            // console.log("snaps",snaps,snapshot.key)
            setUserData(object)
            
        } else {
          setUserData({})
        }
    }).catch((error) => {
        console.error(error);
    })

}

  useEffect(() => {
    database();


    onChildAdded(ref(db, '/users'), (snapshot) => {
      if (snapshot.exists()) {
        const newData = snapshot.val();
        // console.log("Object.keys(snapshot)",Object.keys(snapshot))
        // console.log("@snapshot@", snapshot.key ,{newData})
        setUserData((pre) => {
          return [ ...pre, {...newData, id : snapshot.key}]
        })

      } else {
        console.log("No data available");

      }
    });
  }, [])


  return <><AuthContext.Provider value={{ token, setToken, user, setUser, preUser, setPreUser, writeUserData }}>
    {props.children}
  </AuthContext.Provider></>

}

export default Auth;
export { AuthContext }

