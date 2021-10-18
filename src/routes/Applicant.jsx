import { useEffect, useState } from "react";
import Input from "../components/Input";
import { InputLabel, TextField, FormControl, MenuItem, Select, Button, Alert, FormHelperText } from '@mui/material';
import NumberFormat from 'react-number-format';
import { cities, reports } from "../utils/constant";
import { validateCnic, validateDes } from "../utils/utils";

// import TextField from 'material-ui/TextField';
const Applicant = () => {

    const [city, setCity] = useState(cities?.[0].value)
    const [file, setFile] = useState(reports?.[0].value)
    const [cnic, setCnic] = useState(null)
    const [des, setDes] = useState(null)
    const [cnicError, setCnicError] = useState("")
    const [desError, setDesError] = useState("")

    // console.log({cnic}, {"length": cnic?.length})
    console.log({ des })

    useEffect(() => {
        if (cnic !== null) {
            const error = validateCnic(cnic)
            setCnicError(error)
        }
    }, [cnic])

    useEffect(() => {
        if (des !== null) {
            const error = validateDes(des)
            setDesError(error)
        }
    }, [des])
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
                            <NumberFormat onChange={e => setCnic(e.target.value)} value={cnic} className="col-md-12 col-12 mx-auto"
                                error={!!cnicError}
                                helperText={cnicError}
                                id="cnic" customInput={TextField} variant="standard" label="CNIC" format="#####-#######-#" mask="_" required />
                        </div>
                    </div>
                    <div className="row">
                        <div className="mb-5 col-md-9 col-10 mx-auto">
                            <TextField
                                id="standard-multiline-flexible"
                                label="Your Report"
                                error={!!desError}
                                multiline
                                maxRows={5}
                                value={des}
                                onChange={e => setDes(e.target.value)}
                                variant="standard"
                                className="col-md-12 col-12 mx-auto "
                                helperText={desError}
                            />

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 mb-5 mx-auto">
                            <Button className="col-md-12 mx-auto" variant="contained" disabled={!cnic || !des || cnicError || desError} >
                               Send 
                            </Button>
                        </div>
                    </div>

                </div>

            </div>
        </div>

    </>
}

export default Applicant;