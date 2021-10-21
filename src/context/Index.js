import { createContext, useContext, useEffect, useState } from "react";
import { getDatabase, ref, set, get, onChildAdded, child, onChildChanged } from "firebase/database";
import { AuthContext } from "./Auth";
import { toast } from "react-toastify";



const content = {
  appsData: [],
  setAppsData: () => { },

}

const IndexContext = createContext(content);

const Index = (props) => {
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const { userData } = useContext(AuthContext);
  const [appsData, setAppsData] = useState([]);


  console.log({ appsData })
  useEffect(() => {

    get(child(dbRef, "application")).then((snapshot) => {
      if (snapshot.exists()) {
        const snap = snapshot.val();
        // console.log({snap});
        const appObj = Object.keys(snap).map((key) => {
          const dateObj = new Date(Number(key?.split("_")[0]));
          const time = dateObj.toLocaleTimeString();
          const date = dateObj.toDateString();

          console.log({ data_Time: [time, date] })
          const userId = key?.split("_")[1]
          const applicant = userData?.find((val) => {
            return val.id === userId
          })
          //  console.log({userData, applicant })
          const appData = { ...snap[key], appId: key, ...applicant, date, time }
          return appData;
        });
        // console.log({appObj})
        setAppsData(appObj)
      } else {
        toast.error("No data available");
      }
    }).catch((error) => {
      toast.error(error.message);
    });
  }, [userData])

  useEffect(()=>{
    onChildChanged(ref(db, '/application'), (snapshot) => {
      console.log("ye chal raha he")
      if (snapshot.exists()) {
          const {key} = snapshot;
          const updatedData =  snapshot.val();
          console.log({updatedData,key})
          setAppsData((pre)=> {
            return pre.map((val)=>{
              if(val.appId === key){
                console.log({val, status : updatedData.status})
               return  {...val, status : updatedData.status}
              }
              return val
            })
          })

      } else {
        toast.danger("No data available. Please try again later");
      }
  });
  },[])



  return <><IndexContext.Provider value={{ appsData, setAppsData }}>
    {props.children}
  </IndexContext.Provider></>
}
export default Index;
export { IndexContext };
