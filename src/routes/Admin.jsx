import React, { useContext, useState, useEffect } from "react"
import { getDatabase, ref, set, get, child } from "firebase/database";
import { InputLabel, MenuItem, FormControl, Select, Alert } from '@mui/material';
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import Table from "../tables/AdminTable";
import "../css/admin.css";

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
          ...user, isAdmin: !(user.isAdmin)
        })
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

      <div className="row mt-4">
        <div className="col-lg-12">
          <div className="main-box clearfix">
            <div className="table-responsive">
              <table className="table admin-table  user-list">
                <thead>
                  <tr>
                    <th><span>Phone</span></th>
                    <th><span>Created</span></th>
                    <th className="text-center"><span>Status</span></th>
                    <th><span>Email</span></th>
                    <th>&nbsp;</th>
                  </tr>
                </thead>
                <tbody>

                  {userData?.map((val) => {
                    if (val.isAdmin && value) {
                      isData = true;
                      return <Table key={val.id} color="error" val={val} title="Make User" onClick={handleVerification} />

                    } else if (!val.isAdmin && !value) {
                      isData = true;
                      return <Table key={val.id} color="success" val={val} title="Make Admin" onClick={handleVerification} />
                    }

                  })
                  }
                  {isData ? <></> : <tr><td colSpan="6"> <Alert severity="error">No data found</Alert> </td></tr>}


                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

  </>
}
export default Admin;