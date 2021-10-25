import { useContext, useEffect, useState } from "react";
import { InputLabel, TextField, FormControl, MenuItem, Select, Button } from '@mui/material';
import { getDatabase, ref, set, } from "firebase/database";
import NumberFormat from 'react-number-format';
import { cities, reports } from "../utils/constant";
import { toCapitalize, validateInput } from "../utils/utils";
import { AuthContext } from "../context/Auth";
import { toast } from "react-toastify";
import { cnicSchema, desSchema } from "../utils/validation";


const Applicant = () => {
    const db = getDatabase();
    const { user, token } = useContext(AuthContext)
    const [city, setCity] = useState(cities?.[0].value)
    const [file, setFile] = useState(reports?.[0].value)
    const [cnic, setCnic] = useState("")
    const [des, setDes] = useState("")
    const [image, setImage] = useState("")
    const [cnicError, setCnicError] = useState("")
    const [desError, setDesError] = useState("")



    const applicantSubmit = () => {
        if (user && token) {
            const id = `${new Date().getTime()}_${user.id}`;
            set(ref(db, `application/${id}`), {
                cnic, des, city, file, status: "pending", res: ""
            }).then(() => {
                setCnic("");
                setDes("");
                setCnicError("")
                setDesError("")
                toast.success(`${toCapitalize(user.fname)} ${toCapitalize(user.lname)} your request has been submitted!`);
            })
                .catch((error) => {
                    // console.log({error})
                    toast.warning("Server Error! Please try Again Later");

                });
        }


    }

    // console.log({ image : URL?.createObjectURL(image) })

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
                            <NumberFormat onChange={(e) => {
                                validateInput(cnicSchema, "cnic", e.target.value, setCnicError)
                                setCnic(e.target.value)
                            }} value={cnic} className="col-md-12 col-12 mx-auto"
                                error={!!cnicError}
                                helperText={cnicError}
                                id="cnic" customInput={TextField} variant="standard" label="CNIC" format="#####-#######-#" mask="_" />
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
                                onChange={(e) => {
                                    validateInput(desSchema, "description", e.target.value, setDesError)

                                    setDes(e.target.value)
                                }}
                                variant="standard"
                                className="col-md-12 col-12 mx-auto "
                                helperText={desError}
                            />

                        </div>
                    </div>
                    {/* <input type="file" accept="image/*"
                     onChange={(e)=>{
                         setImage(e.target.files[0])
                         console.log(e.target.files)
                     }
                     } />
                     {image? 
                     <img src={URL.createObjectURL(image)} alt="" width="138" /> : 
                     <></>
                     
                    } */}

                    <div className="row">
                        <div className="col-md-6 col-6 mb-5 mx-auto">
                            <Button onClick={applicantSubmit} className="col-md-12 col-12 mx-auto" variant="contained" disabled={!cnic || !des || cnicError || desError} >
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