import React, { useContext, useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import DialogBox from "../components/DialogBox";
import { getLocalStorage, setLocalStorage, validatePhone, confirmSignIn } from "../utils/utils";
import { localStorageKeys } from "../utils/constant";
import Auth, { AuthContext } from "../context/Auth";
import Input from "../components/Input";

const auth = getAuth();
let recaptchaVerifier;

const SignUp = () => {
    const {token,user,preUser,setPreUser} = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [open, setOpen] = useState(false);
    const [errorTypePhone, setErrorTypePhone] = useState("");
    const [valid, setValid] = useState("");
    const [input, setInput] = useState({
        fname: "",
        lname: "",
        phone: null,
    })

    const Event = ((e) => {
        const { name, value } = e.target;

        setInput((pre) => {
            return { ...pre, [name]: value }
        })
    })


    

    useEffect(() => {
        getRecaptcha();
        
    }, [])

    // Example starter JavaScript for disabling form submissions if there are invalid fields
    useEffect(()=>{
        // setLocalStorage(localStorageKeys.preUser, {id: "id", phone : "phone", token : "token"})
        const use = getLocalStorage(localStorageKeys.preUser)
         if(use){
             setOpen(true);
         }
    },[]);

    const handle = () => {
        setOpen(pre => !pre)
    };

    const Event = (e) => {
        const { value } = e.target;
        setPhone(value)
        const passError = validatePhone(value);

        if (passError) {
            setErrorTypePhone(passError);
            setValid("is-invalid")
        } else {
            setErrorTypePhone("");
            setValid("is-valid");
        }
    }

    const getRecaptcha = () => {
        try {
            recaptchaVerifier = new RecaptchaVerifier("recaptcha", {}, auth);
            recaptchaVerifier.render();
        } catch (e) {
            alert("Internal Server Error exist. Please SignIn later")
        }
    }

    const click = () => {

        signInWithPhoneNumber(auth, "+" + phone, recaptchaVerifier).then(function (e) {

            var code = prompt('Enter code that you recieved ', '');

            if (code === null) return;
 
            confirmSignIn(e,code, handle, setLocalStorage, localStorageKeys);

            

            e.confirm(code).then(function (result) {
                handle();
               const res = result.user
                setLocalStorage(localStorageKeys.preUser, {id : res.id, phone : res.phone, token : res.accessToken })
                setPreUser(getLocalStorage(localStorageKeys.preUser))
                
                alert("Thanks for signin")

            }).catch(function (error) {
                console.error('error on msg confirmation', error);

            });

        })
            .catch(function (error) {
                alert(error.message);
            });

    }


return <>
    <div className="my-5 mx-auto" style={{ width: "450px" }}>
        <div className="form-row">
            <Input name="fname" onChange={Event} title="First Name" value={input.fname}/>
            <Input name="lname" onChange={Event} title="Last Name" value={input.lname}/>
            <Input name="phone" onChange={Event} type="tel" title="Phone" value={input.phone}/>
            <div className="mb-3">
                <label htmlFor="validationCustom01">First name</label>
                <input name="fname" onChange={Event} type="text" className="form-control vw-90" id="validationCustom01" placeholder="First name" value={input.fname} required />

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
    </div>
    <button onClick={handle}>handle</button>
    <DialogBox handle={handle} open={open} />
</>
   
}

export default SignUp;