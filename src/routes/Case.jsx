import { useState } from "react";
import { cities, reports } from "../utils/constant";
import { InputLabel, TextField, FormControl, MenuItem, Select, Button } from '@mui/material';

const Case = () => {
    const [city, setCity] = useState(cities?.[0].value)
    const [file, setFile] = useState(reports?.[0].value)

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
        </div>


    </>
}
export default Case;