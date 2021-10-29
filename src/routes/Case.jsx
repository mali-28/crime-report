import { useContext, useEffect, useState } from "react";
import { cities, reports } from "../utils/constant";
import { InputLabel, TextField, FormControl, MenuItem, Select, Button, Alert } from '@mui/material';
import { IndexContext } from "../context/Index";

const Case = () => {
    const { appsData } = useContext(IndexContext);
    const [city, setCity] = useState(cities?.[0].value)
    const [file, setFile] = useState(reports?.[0].value)
    const [caseData, setCaseData] = useState([]);
    console.log({ appsData });
    console.log({ caseData });

    useEffect(() => {
        if (appsData) {
            let data = []
            appsData.forEach((val) => {
                if (val.city === city && val.file === file) {
                    data.unshift({ date: val.date, des: val.des, appId: val.appId })
                }
            })

            setCaseData(data)
        }

    }, [appsData, file, city])
    return <>
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-12 my-4 mx-auto shadow  bg-white rounded">
                    <div className="text-center mt-5 text-capitalize text-danger">Check {file} in {city} </div>
                    <div className="row mb-5">
                        <div className="col-md-12 col-12 mx-auto d-flex justify-content-around mt-4 ">
                            <FormControl variant="standard" sx={{ minWidth: 100 }}>
                                <InputLabel id="city-label">City</InputLabel>
                                <Select
                                    sx={{ color: "#000", textAlign: "center" }}
                                    labelId="city-label"
                                    id="city"
                                    value={city}
                                    onChange={e => setCity(e.target.value)}
                                    label="City"

                                >
                                    {cities?.map((val, id) => {
                                        return <MenuItem key={id} value={val.value} className="text-capitalize">{val.value}</MenuItem>

                                    })}
                                </Select>
                            </FormControl>


                            <FormControl variant="standard" sx={{ minWidth: 130 }}>
                                <InputLabel id="file-label">Report</InputLabel>
                                <Select
                                    labelId="file-label"
                                    id="file"
                                    value={file}
                                    onChange={e => setFile(e.target.value)}
                                    label="Report"
                                >
                                    {reports?.map((val, id) => {
                                        return <MenuItem key={id} value={val.value} className="text-capitalize">{val.value}</MenuItem>

                                    })}

                                </Select>
                            </FormControl>
                        </div>

                    </div>
                </div>
            </div>

            <div className="row my-4">
                {caseData != 0 ? caseData.map((val) => {

                    return <> 
                    <div key={val.appId} className="col-md-4 p-4 ">

                        <div className="card p-3 text-right height-25  border-0 shadow">
                            <header className="blockquote-header mt-2">
                                <small>
                                    <Alert>{val.date}</Alert>
                                </small>
                            </header>
                            <div className="mt-4 p-3  case-content">

                                <p className="text-muted font-014 ">{val.des}</p>
                            </div>
                        </div>
                    </div>

                   
                    </>
                })
                    : <Alert>No Case Found</Alert>
                }
            </div>
        </div>


    </>
}
export default Case;