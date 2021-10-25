import React, { useContext, useState } from 'react';
import { getDatabase, ref, set } from "firebase/database";
import { Dialog, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { toast } from "react-toastify";
import { removeLocalStorage, setLocalStorage, getLocalStorage, validateInput } from '../utils/utils';
import Input from "./Input";
import { AuthContext } from '../context/Auth';
import { localStorageKeys } from '../utils/constant';
import { fNameSchema, lNameSchema, emailSchema } from '../utils/validation';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const DialogBox = (props) => {
    const { preUser, setToken, setUser } = useContext(AuthContext);
    const db = getDatabase();
    const [fname, setFName] = React.useState("")
    const [lname, setLName] = React.useState("");
    const [email, setEmail] = useState("");
    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [emailError, setEmailError] = useState("")


    const info = () => {
        if (preUser) {
            console.log({preUser})
            const { id, token, phone } = preUser;
            const data = { phone, token, fname, lname, email }

            set(ref(db, `users/` + id), {
                ...data, isAdmin: false, isSuperAdmin: false
            }).then(() => {

                const { token, ...remaining } = data;
                setLocalStorage(localStorageKeys.token, token)
                setToken(getLocalStorage(localStorageKeys.token));
                setLocalStorage(localStorageKeys.user, { ...remaining, id })
                setUser(getLocalStorage(localStorageKeys.user))
                toast.success(`Congratulations👋 ${remaining.fname} ${remaining.lname} Account Created Succesfully!`);
                removeLocalStorage(localStorageKeys.preUser);

            })
                .catch((error) => {
                    toast.danger(error.message);

                });

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
                                    onChange={(v) => {
                                        validateInput(fNameSchema, "firstName", v, setErrorFirstName)
                                        setFName(v);

                                    }} />

                                <Input title="Last Name"
                                    error={errorLastName}
                                    value={lname}
                                    placeholder="Last Name"
                                    id="lastName"
                                    onChange={(v) => {
                                        validateInput(lNameSchema, "lastName", v, setErrorLastName)
                                        setLName(v);

                                    }} />



                                <Input title="Email"
                                    type="email"
                                    error={emailError}
                                    value={email}
                                    placeholder="Email"
                                    id="email"
                                    onChange={(v) => {
                                        validateInput(emailSchema, "email", v, setEmailError)
                                        setEmail(v);

                                    }} />
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