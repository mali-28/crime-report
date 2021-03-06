import React, { useContext, useState } from 'react';
import { removeLocalStorage, validateInput} from '../utils/utils';
import {Dialog,DialogContent,DialogContentText,DialogTitle,Slide} from '@mui/material';
import Input from "./Input";
import { AuthContext } from '../context/Auth';
import { localStorageKeys } from '../utils/constant';
import Input from "./Input";
import { fNameSchema, lNameSchema, passwordSchema } from '../utils/validation';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogBox = (props) => {
    const { writeUserData, preUser,setToken,setUser } = useContext(AuthContext);

    const [fname, setFName] = React.useState("")
    const [lname, setLName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [emailError, setEmailError] = useState("")

    

    const info = () => {
        if (preUser) {
            const { id, token, phone } = preUser
            writeUserData("users", id, { phone, token, fname, lname, email })
            removeLocalStorage(localStorageKeys.preUser);
        }
        props.handle();
    }

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
                                disabled={!!errorFirstName || !!errorLastName || !!emailError || !fname || !lname || !email}
                                onClick={info}
                                className="btn btn-success mt-2">Submit form</button>
                        </div>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>

    </>
}

export default DialogBox;