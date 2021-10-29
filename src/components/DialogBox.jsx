import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { validateName, validatePassword ,validateInput} from '../utils/utils';
import Input from "./Input";

import { fNameSchema, lNameSchema, passwordSchema } from '../utils/validation';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogBox = (props) => {

    const [fname, setFName] = React.useState("")
    const [lname, setLName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorTypePass, setErrorTypePass] = useState("");

    // useEffect(() => {
    //     if (fname !== null) {
    //         const error = validateName("First Name", fname);
    //        setErrorFirstName(error)
    //     }
    // }, [fname])

    // useEffect(() => {
    //     if (lname !== null) {

    //         const error = validateName("Last Name", lname);
    //         setErrorLastName(error)

    //     }
    // }, [lname])

    // useEffect(() => {
    //     if (password !== null) {
    //         const error = validatePassword(password);
    //          setErrorTypePass(error)

    //     }
    // }, [password])

    return <>

        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                // onClose={props.handle}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle className="mt-2 mx-auto text-success">Personal Info</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="my-1 mx-auto" style={{ width: "450px" }}>
                            <div className="form-row ">
                                <Input title="First Name"
                                    error={errorFirstName}
                                    value={fname}
                                    placeholder="First Name"
                                    id="firstName"
                                    onChange={(e) => {
                                        validateInput(fNameSchema, "firstName", e, setErrorFirstName)
                                        return setFName(e)
                                    }}
                                />

                                <Input title="Last Name"
                                    error={errorLastName}
                                    value={lname}
                                    placeholder="Last Name"
                                    id="lastName"
                                    onChange={(e) => {
                                        validateInput(lNameSchema, "lastName", e, setErrorLastName)
                                        return setLName(e)
                                    }}
                                />

                                <Input title="Password"
                                    error={errorTypePass}
                                    value={password}
                                    placeholder="Password"
                                    id="password"
                                    onChange={(e) => {
                                        validateInput(passwordSchema, "password", e, setErrorTypePass)
                                        return setPassword(e)
                                    }}
                                />
                            </div>

                            <button id="btn1"
                                disabled={!!errorFirstName || !!errorLastName || !!errorTypePass || !fname || !lname || !password}
                                onClick={props.handle}
                                className="btn btn-success mt-2">Submit form</button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>

    </>
}

export default DialogBox;