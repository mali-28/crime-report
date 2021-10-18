import React, { useContext, useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { getDatabase, ref, set, get, onChildAdded, child } from "firebase/database";
import DialogBox from "../components/DialogBox";
import { getLocalStorage, setLocalStorage, validatePhone } from "../utils/utils";
import { localStorageKeys } from "../utils/constant";
import Auth, { AuthContext } from "../context/Auth";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";


const auth = getAuth();
let recaptchaVerifier;

const SignUp = () => {
    const { token,setToken,setUser, user, preUser, setPreUser, } = useContext(AuthContext);
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
            console.log("error", e)
        }
    }

    const click = () => {

        signInWithPhoneNumber(auth, "+" + phone, recaptchaVerifier).then(function (e) {


            var code = prompt('shi shi', '');


            if (code === null) return;


            e.confirm(code).then(function (result) {
                const { user } = result
                console.log({ result, user });
                get(child(dbRef, `users/${user.uid}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                     console.log("realsnap", snapshot.key, snapshot.val())
                     const snap = snapshot.val();
                        setLocalStorage(localStorageKeys.token, snap.token)
                        setLocalStorage(localStorageKeys.user, { id: snapshot.key, phone: snap.phone, fname: snap.fname, lname: snap.lname, email : snap.email})
                        history.replace("/")
                        toast.success(`Login successfully!! `);

                    //  { id: user.uid, phone: user.phoneNumber, token: user.stsTokenManager.accessToken }
                //         const { isAdmin } = snapshot.val();
                //         setLocalStorage(localStorageKeys.token, user.token)
                //         setLocalStorage(localStorageKeys.user, { id: user.uid, phone: user.phoneNumber, name: user.name })

                //         // if (isAdmin) {
                //         //     setLocalStorage(localStorageKeys.token, user.token)
                //         //     setLocalStorage(localStorageKeys.user, { id: user.uid, email: user.email, name: user.name })

                //         //     history.replace("/admin");
                //         // } else {
                //         //     alert("Please Wait untill admin approve your requests")
                //         //     removeLocalStorageKey(localStorageKeys.token)
                //         //     removeLocalStorageKey(localStorageKeys.user)
                        // }
                    } else {
                //         // writeUserData("users",user.uid, { id: user.uid, name: user.displayName, email: user.email, photoUrl: user.photoURL, token: user.accessToken, superAdmin: false, isVerify: false, })
                //         // alert("Please Wait untill admin approve your requests");

                        setLocalStorage(localStorageKeys.preUser, { id: user.uid, phone: user.phoneNumber, token: user.stsTokenManager.accessToken })
                        setPreUser(getLocalStorage(localStorageKeys.preUser))
                        handle();
                    }
                    setToken(getLocalStorage(localStorageKeys.token))
                    setUser(getLocalStorage(localStorageKeys.user))
                }).catch((error) => {
                    alert(error);
                });

            }).catch(function (error) {
                console.error('error on msg confirmation', error);

            });

        })
            .catch(function (error) {
                console.error('error on sign in method fail', error);

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