import React, { useContext, useState, useEffect } from "react"
import { getDatabase, ref,set, get, child } from "firebase/database";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import {Select, Button, Alert} from '@mui/material';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/Auth";
const Admin = () => {
  const { user, token, userData } = useContext(AuthContext);
  const [value, setValue] = useState(true);
  let isData = false;
  const history = useHistory();
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  useEffect(() => {
    if (!user || !token) {
      history.replace("/signin");
    }
  }, [user, token])

  const handleVerification = (id) => {
    get(child(dbRef, `users/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const user = snapshot.val();
        set(ref(db, `users/${id}`), {
          ...user, isAdmin : !(user.isAdmin)
        })
        // writeUserData("users", id, { ...user, isAdmin: !(user.isAdmin) })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }


  return <>
    <div className="container my-4">
      <FormControl variant="standard" sx={{ m: "10 auto", minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Admin</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={value}
          onChange={e => setValue(e.target.value)}
          label="Admin"
        >
          <MenuItem value={true}>Approved</MenuItem>
          <MenuItem value={false}>Pending </MenuItem>
        </Select>
      </FormControl>
<div className="table-responsive ">
      <table className="table ">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone Number</th>
            <th scope="col">Status</th>
            <th scope="col">Manage Status</th>
          </tr>
        </thead>
        <tbody>

        {userData?.map((val) => {
      if (val.isAdmin && value) {
        isData = true;
        return <tr key={val.id}>
            <td >{val.id}</td>
            <td className="text-capitalize">{val.fname + " " + val.lname}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td>{val.isAdmin ? "admin" : "user"}</td>
            <td><Button variant="outlined"  color="error" onClick={() => { handleVerification(val.id)}}>Make User</Button></td>
          </tr>
      } else if(!val.isAdmin && !value){
       isData = true;
        return <tr key={val.id}>
            <td>{val.id}</td>
            <td className="text-capitalize">{val.fname + " " + val.lname}</td>
            <td>{val.email}</td>
            <td>{val.phone}</td>
            <td>{val.isAdmin ? "admin" : "user"}</td>
            <td><Button variant="outlined"  color="success" onClick={() => { handleVerification(val.id) }}>Make Admin</Button></td>
        </tr>
      }

      
    }) 
}
    {isData? <></> : <tr><td colSpan="6"> <Alert severity="error">No data found</Alert> </td></tr>}

        </tbody>
      </table>
      </div>
    </div>
 
    </>
}
export default Admin;