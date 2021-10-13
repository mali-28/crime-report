import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { validateName, validatePassword } from '../utils/utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogBox = (props) => {

    const [input, setInput] = useState({
        fname: "",
        lname: "",
        pass: "",
    });

    const [errorFirstName, setErrorFirstName] = useState("");
    const [errorLastName, setErrorLastName] = useState("");
    const [errorTypePass, setErrorTypePass] = useState("");
    const [valid, setValid] = useState(false);
    const [disable, setDisabe] = useState(true);

    const changeInput = ((e) => {
        const { name, value } = e.target;

        setInput((pre) => {
            return { ...pre, [name]: value }
        })
        setValid(true)
    });

    useEffect(() => {
        if (valid) {
            const firstNameError = validateName("First Name", input.fname);
        const lastNameError = validateName("Last Name", input.lname);
        const passError = validatePassword(input.pass);

        if (firstNameError) {
            setErrorFirstName(firstNameError)
            setErrorLastName("");
            setErrorTypePass("");


        } else if (lastNameError) {
            setErrorFirstName("")
            setErrorLastName(lastNameError);
            setErrorTypePass("");

        } else if (passError) {
            setErrorTypePass(passError);
            setErrorFirstName("")
            setErrorLastName("");
        } else {
            setDisabe(false)
            setErrorTypePass("");
            setErrorFirstName("")
            setErrorLastName("");
        }

        }
    }, [changeInput, valid])

    return <>

        <div>
            <Dialog
                open={props.open}
                TransitionComponent={Transition}
                keepMounted
                onClose={props.handle}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>Login Crendentials</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <div className="my-5 mx-auto" style={{ width: "450px" }}>
                            <div className="form-row ">
                                <div className="mb-3">
                                    <label htmlFor="validationfname">First name</label>
                                    <input name="fname" onChange={(changeInput)} type="text" className={`form-control ${!errorFirstName ? "is-valid" : "is-invalid"}`} id="validationfname" placeholder="First name" value={input.fname} required />
                                    <div className="invalid-feedback">{errorFirstName}</div>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationlname">Last name</label>
                                    <input name="lname" onChange={changeInput} type="text" className={`form-control ${!errorLastName ? "is-valid" : "is-invalid"}`} id="validationlname" placeholder="Last name" value={input.lname} required />
                                    <div className="invalid-feedback">{errorLastName}</div>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="validationCustomPass">Password</label>
                                    <input name="pass" onChange={changeInput} type="text" className={`form-control ${!errorTypePass ? "is-valid" : "is-invalid"}`} id="validationCustomPass" placeholder="password" value={input.pass} required />
                                    <div className="invalid-feedback">{errorTypePass}</div>

                                </div>
                            </div>
                            <div id="recaptcha" ></div>

                            <button id="btn1"
                                disabled={disable || !!errorFirstName || !!errorLastName || !!errorTypePass}
                                className="btn btn-primary mt-2">Submit form</button>

                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={props.handle}>Disagree</Button>
                    <Button onClick={props.handle}>Agree</Button>
                </DialogActions>
            </Dialog>
        </div>

    </>
}

export default DialogBox;