import React, { useContext, useState, useEffect } from "react"
import { getDatabase, ref, set, get, child } from "firebase/database";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { Select, Alert } from '@mui/material';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import AdminTable from "../components/AdminTable";


const Admin = () => {

  const { user, token, userData } = useContext(AuthContext);
  const history = useHistory();
  const db = getDatabase();
  const dbRef = ref(getDatabase());
  const [value, setValue] = useState(true);
  let isData = false;


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
          ...user, isAdmin: !(user.isAdmin)
        })
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error.message);
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
                return <AdminTable key={val.id} color="error" val={val} title="Make User" onClick={() => { handleVerification(val.id) }} />

              } else if (!val.isAdmin && !value) {
                isData = true;
                return <AdminTable key={val.id} color="success" val={val} title="Make Admin" onClick={() => { handleVerification(val.id) }} />
              }

            })
            }
            {isData ? <></> : <tr><td colSpan="6"> <Alert severity="error">No data found</Alert> </td></tr>}

          </tbody>
        </table>
      </div>
    </div>

  </>
}
export default Admin;