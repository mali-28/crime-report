import React, { useState, useContext, useEffect } from "react";
import MUIDataTable from "mui-datatables";
import { Button } from "@mui/material";
import { IndexContext } from "../context/Index";
import { NavLink } from "react-router-dom";

const Request = () => {
  const { appsData } = useContext(IndexContext);
  const [responsive, setResponsive] = useState("standard");
  const [tableBodyHeight, setTableBodyHeight] = useState("400px");
  const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
  const [tableData, setTableData] = useState([]);

  const columns = [
    { name: "id" },
    "First Name",
    "Last Title",
    "City",
    "Case",
    "Status",
    {
      name: "Actions",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          const btnId = tableMeta?.rowData[0];
          return (
            <NavLink style={{textDecoration : "none",}} to={`request/${btnId}`}> <Button  variant="outlined" color="secondary">
              {`Review`}
            </Button>
            </NavLink>
          );
        }
      }
    }
  ];
  useEffect(() => {
    const data = appsData?.map((val) => {
      return [val.appId, val.fname, val.lname, val.city, val.file, val.status]
    })
    setTableData(data);


  }, [appsData])

  const options = {
    filter: true,
    filterType: "dropdown",
    responsive,
    tableBodyHeight,
    tableBodyMaxHeight,
    selectableRows: "none",

  };

  return <>

    <div className="container  my-4 p-3">

      <MUIDataTable
        title={"Appliction List"}
        data={tableData}
        columns={columns}
        options={options}

      />

    </div>

  </>
}

export default Request;