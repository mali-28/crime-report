import React, { useState, useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import { Button} from "@mui/material";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { IndexContext } from "../context/Index";
import { NavLink } from "react-router-dom";

const Request = () => {
    const { appsData } = useContext(IndexContext);
    //     const [responsive, setResponsive] = useState("standard");
    //   const [tableBodyHeight, setTableBodyHeight] = useState("400px");
    //   const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [tableData, setTableData] = useState([]);

    //   const columns = ["id","First Name", "Last Title", "City", "Case", "Date"];

    //   const options = {
    //     filter: true,
    //     filterType: "dropdown",
    //     responsive,
    //     tableBodyHeight,
    //     tableBodyMaxHeight,
    //   };
    useEffect(() => {
        console.log({ appsData })
        const data = appsData?.map((val) => {
            console.log({val})
            return {appId : val.appId, fname : val.fname, lname : val.lname, city :val.city, file :val.file, date : val.date, status : val.status}
        })

        console.log(data)
        setTableData(data);


    }, [appsData])

    return <>

        {/* <div className="container  my-4 p-3">
    <FormControl>
        <InputLabel id="demo-simple-select-label">Responsive Option</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={responsive}
          style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
          onChange={(e) => setResponsive(e.target.value)}
        >
          <MenuItem value={"horizontal"}>horizontal</MenuItem>
          <MenuItem value={"vertical"}>vertical</MenuItem>
          <MenuItem value={"standard"}>standard</MenuItem>
          <MenuItem value={"simple"}>simple</MenuItem>

          <MenuItem value={"scroll"}>scroll (deprecated)</MenuItem>
          <MenuItem value={"scrollMaxHeight"}>
            scrollMaxHeight (deprecated)
          </MenuItem>
          <MenuItem value={"stacked"}>stacked (deprecated)</MenuItem>
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel id="demo-simple-select-label">Table Body Height</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={tableBodyHeight}
          style={{ width: "200px", marginBottom: "10px", marginRight: 10 }}
          onChange={(e) => setTableBodyHeight(e.target.value)}
        >
          <MenuItem value={""}>[blank]</MenuItem>
          <MenuItem value={"400px"}>400px</MenuItem>
          <MenuItem value={"800px"}>800px</MenuItem>
          <MenuItem value={"100%"}>100%</MenuItem>
        </Select>
      </FormControl>
      <MUIDataTable
        title={"Appliction List"}
        data={tableData}
        columns={columns}
        options={options}
      />
    </div> */}
        <div className="table-responsive container my-5">
            <table class="table table-bordered  border-primary">
                <thead>
                    <tr>
                        <th scope="col">#id</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">City</th>
                        <th scope="col">Case</th>
                        <th scope="col">Status</th>
                        <th scope="col">Date</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {/* val.appId ,val.fname, val.lname,val.city, val.file, val.date */}
                    {tableData.map((val) => {
                        
                            {console.log({val})}
                        return <tr key={val.appId}>
                            <td scope="row">{val.appId}</td>
                            <td>{val.fname}</td>
                            <td>{val.lname}</td>
                            <td>{val.city}</td>
                            <td>{val.file}</td>
                            <td>{val.status}</td>
                            <td >{val.date}</td>
                            <td ><NavLink  to={`request/${val.appId}`}><Button variant="outlined" >See Profile</Button></NavLink></td>
                        </tr>

                    })}


                </tbody>
            </table>
        </div>
    </>
}

export default Request;