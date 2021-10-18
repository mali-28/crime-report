import { getDatabase, ref, set,get, onChildAdded,child, onChildChanged } from "firebase/database";
import { createContext, useContext } from "react";
import { AuthContext } from "./Auth";
import { toast } from "react-toastify";



const content = {
    writeData : () =>{},
}

const IndexContext = createContext(content);

const Index = (props) =>{
    const db = getDatabase();
    const {user}  = useContext(AuthContext);

    const writeData = (title, userId, data) => {

        set(ref(db, `${title}/` + "zbc"), {
          ...data, isAdmin : false, isSuperAdmin : false
        }).then(() => {
        //   const { token, ...remaining } = data;
        //   setLocalStorage(localStorageKeys.token, token)
        //   setToken(getLocalStorage(localStorageKeys.token));
        //   setLocalStorage(localStorageKeys.user, {...remaining, id : userId})
        //   toast.success(`Congratulations👋 ${remaining.fname} ${remaining.lname} Account Created Succesfully!`);
        })
        .catch((error) => {
          toast.danger(error.message);
    
        });
       
      }
    


    return <><IndexContext.Provider value={{writeData}}>
    {props.children}
  </IndexContext.Provider></>
}
export default Index;
export {IndexContext};
