import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDatabase, ref, set, get, onChildAdded, child } from "firebase/database";
import { toast } from "react-toastify";
import{ AuthContext } from "../context/Auth";
import { localStorageKeys } from "../utils/constant";
import { getLocalStorage, setLocalStorage, validatePhone } from "../utils/utils";
import { confirmSignIn } from "../features/signin";
import DialogBox from "../components/DialogBox";


const auth = getAuth();
let recaptchaVerifier;

const SignUp = () => {
    const { token, setToken, setUser, user, preUser, setPreUser, } = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);
    const [errorTypePhone, setErrorTypePhone] = useState("");
    const [valid, setValid] = useState("");
    const history = useHistory();
    const dbRef = ref(getDatabase());

    useEffect(() => {
        getRecaptcha();

    }, [])

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    useEffect(() => {
        // setLocalStorage(localStorageKeys.preUser, { id: "id1", phone: "phone1", token: "token1" })
        const use = getLocalStorage(localStorageKeys.preUser)
        if (use) {
            setOpen(true);
        }
    }, []);

    const handle = () => {
        setOpen(pre => !pre)
    };

    const Event = (e) => {
        const { value } = e.target;
        setPhone(value)
        const error = validatePhone(value);


        if (error) {
            setErrorTypePhone(error);
            setValid("is-invalid")
        } else {
            setErrorTypePhone("");
            setValid("is-valid")
        }

    }

    const getRecaptcha = () => {
        try {
            recaptchaVerifier = new RecaptchaVerifier("recaptcha", {}, auth);
            recaptchaVerifier.render();
        } catch (e) {
            toast.error("Internal Server Error exist. Please SignIn later")
            // console.log("error", e)
        }
    }

    const click = () => {

        signInWithPhoneNumber(auth, "+" + phone, recaptchaVerifier).then(function (e) {

            var code = prompt('Enter OTP that you recieved ', '');


            if (code === null) return;


            e.confirm(code).then(function (result) {
                const { user } = result;

                confirmSignIn(user, handle, history, setToken, setPreUser, setUser)


            }).catch(function (error) {
                toast.error('error on msg confirmation!! ', error.message);

            });

        })
            .catch(function (error) {
                toast.error('error on sign in method fail!! ', error.message);

            });

    }
    return <>
        <div className="my-5 mx-auto" style={{ width: "450px" }}>
            <div className="form-row ">

                <div className="mb-3">
                    <label htmlFor="validationCustomPhone">Phone</label>
                    <input name="phone" onChange={Event} type="number" className={`form-control ${valid}`} id="validationCustomPhone" placeholder="923****" value={phone} />
                    <div className="invalid-feedback">{errorTypePhone}</div>
                </div>
            </div>
            <div id="recaptcha" ></div>

            <button id="btn1"
                disabled={!!errorTypePhone || !phone}
                onClick={click}
                className="btn btn-primary mt-2">Submit form</button>
        </div>

        <DialogBox handle={handle} open={open} />
    </>
}

export default SignUp;