import { useState } from "react";
import Input from "../components/Input";
import { InputLabel, TextField, FormControl, MenuItem, Select, Alert } from '@mui/material';
import NumberFormat from 'react-number-format';
import { cities, reports } from "../utils/constant";
// import TextField from 'material-ui/TextField';
const Applicant = () => {

    const [city, setCity] = useState(cities?.[0].value)
    const [file, setFile] = useState(reports?.[0].value)


    return <>
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-6 col-md-12 col-12 my-4 mx-auto shadow  bg-white rounded">
                    <div className="row">
                        <div className="col-md-12 col-12 mx-auto d-flex justify-content-around mt-5 mb-4">
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
                    <div className="row">
                        <div className="mb-3  col-md-9 col-10 mx-auto">
                            <NumberFormat className="col-md-12 col-12 mx-auto" helperText="Please enter your cnic number"  id="cnic" customInput={TextField} variant="standard" label="CNIC" format="#####-#######-#" mask="_" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-5 col-md-9 col-10 mx-auto">
                            <TextField
                                id="standard-multiline-flexible"
                                label="Your Report"
                                multiline
                                maxRows={5}
                                //   value={value}
                                //   onChange={handleChange}
                                variant="standard"
                                className="col-md-12 col-12 mx-auto "
                                helperText="Enter your report description"
                            />

                        </div>
                    </div>


                </div>
            </div>
        </div>

    </>
}

export default Applicant;