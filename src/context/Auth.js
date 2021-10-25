import React, { createContext, useEffect, useState } from "react";
import { localStorageKeys } from "../utils/constant";
import { getLocalStorage, setLocalStorage } from "../utils/utils";
import { getDatabase, ref, set,get, onChildAdded,child, onChildChanged } from "firebase/database";
import { toast } from "react-toastify";

const obj = {
  user: {},
  setUser: () => { },
  token: "",
  setToken: () => { },
  preUser: {},
  setPreUser: () => { },
  userData: [],
  setUserData: () => { },
}


const AuthContext = createContext(obj);
const Auth = (props) => {
  const db = getDatabase();
  const [token, setToken] = useState(getLocalStorage(localStorageKeys.token) || "");
  const [user, setUser] = useState(getLocalStorage(localStorageKeys.user) || null);
  const [preUser, setPreUser] = useState(getLocalStorage(localStorageKeys.preUser) || null)
  const [userData, setUserData] = useState([]);




  const database =  () =>{
    const dbRef = ref(getDatabase());
    get(child(dbRef, `users`)).then((snapshot) => {
      let object = [];
        if (snapshot.exists()) {
            const snaps = snapshot.val();
            object = Object.keys(snaps).map((id)=>{
              const data = {...snaps[id], id}
              return data;
            })
            setUserData(object)
            
        } else {
          setUserData({})
        }
    }).catch((error) => {
      toast.error("Please Check your Connection");
    })

}

  useEffect(() => {
    
    database();

    onChildAdded(ref(db, '/users'), (snapshot) => {
      if (snapshot.exists()) {
        const newData = snapshot.val();
        setUserData((pre) => {
          return [ ...pre, {...newData, id : snapshot.key}]
        })

      } else {
        toast.error("Some server problem exists.Please try again later");
      }
    });

    onChildChanged(ref(db, '/users'), (snapshot) => {
      if (snapshot.exists()) {
          const {key} = snapshot;
          const updatedData =  snapshot.val();
          setUserData((pre)=> {
            return pre.map((val)=>{
              if(val.id === key){
               return  {...updatedData, id : key}
              }
              return val
            })
          })

      } else {
        toast.danger("No data available. Please try again later");
      }
  });

  }, [])

  return <><AuthContext.Provider value={{token, setToken, user, setUser, preUser, setPreUser,userData }}>
    {props.children}
  </AuthContext.Provider></>

}

export default Auth;
export { AuthContext }

