import React, { useContext, useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import DialogBox from "../components/DialogBox";
import { getLocalStorage, setLocalStorage, validatePhone } from "../utils/utils";
import { localStorageKeys } from "../utils/constant";
import Auth, { AuthContext } from "../context/Auth";


const auth = getAuth();
let recaptchaVerifier;

const SignUp = () => {
    const {token,user,preUser, setPreUser} = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);
    const [errorTypePhone, setErrorTypePhone] = useState("");
    const [valid, setValid] = useState("");
  
    useEffect(() => {
        getRecaptcha();
    }, [])

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    useEffect(()=>{
        
         if(preUser){
             setOpen(true);
         }
        
    },[preUser])

    const handle = () => {
        setOpen(pre=> !pre)
      };

    const Event = (e) =>{
        const {value} = e.target;
        setPhone(value)
        const passError = validatePhone(value);

        if(passError){
            setErrorTypePhone(passError);
            setValid("is-invalid")
        }else{
            setErrorTypePhone("");
            setValid("is-valid");
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
        
        signInWithPhoneNumber(auth, "+" +phone, recaptchaVerifier).then(function (e) {

            var code = prompt('shi shi', '');

            if (code === null) return;


            e.confirm(code).then(function (result) {
                handle();
               const res = result.user
                setLocalStorage(localStorageKeys.preUser, {id : res.id, phone : res.phone, token : res.accessToken })
            }).catch(function (error) {
                alert(error.message);
            });

        })
            .catch(function (error) {
                alert(error.message);
            });

    }
    return <>
        <div className="my-5 mx-auto" style={{ width: "450px" }}>
            <div className="form-row ">
                
                <div className="mb-3">
                    <label htmlFor="validationCustomPhone">Phone</label>
                    <input name="phone" onChange={Event} type="number" className={`form-control ${valid}`} id="validationCustomPhone" placeholder="923****" value={phone}/>
                    <div className="invalid-feedback">{errorTypePhone}</div>
                </div>
            </div>
            <div id="recaptcha" ></div>

            <button id="btn1"
            disabled={!!errorTypePhone || !phone}
                onClick={click}
                className="btn btn-primary mt-2">Submit form</button>
        </div>
        
<button onClick={handle}>handle</button>
        <DialogBox handle={handle} open={open}/>
    </>
}

export default SignUp;