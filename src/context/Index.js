import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, ref, set, get, onChildAdded, child, onChildChanged } from "firebase/database";
import { AuthContext } from "./Auth";
import { toast } from "react-toastify";



const content = {

}

const IndexContext = createContext(content);

const Index = (props) => {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {

    get(child(dbRef, "application")).then((snapshot) => {
      if (snapshot.exists()) {
        const snap = snapshot.val();
        console.log(snap);
        console.log(Object.values(snap));
      } else {
        toast.error("No data available");
      }
    }).catch((error) => {
      toast.error(error.message);
    });
  }, [])




  return <><IndexContext.Provider value={{}}>
    {props.children}
  </IndexContext.Provider></>
}
export default Index;
export { IndexContext };
