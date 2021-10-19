import React, { useEffect, useState } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const auth = getAuth();
let recaptchaVerifier;

const SignUp = () => {
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



    const getRecaptcha = () => {
        try {
            recaptchaVerifier = new RecaptchaVerifier("recaptcha", {}, auth);
            recaptchaVerifier.render();
        } catch (e) {
            alert("Internal Server Error exist. Please SignIn later")
        }
    }

    const click = () => {
        signInWithPhoneNumber(auth, "+" + input.phone, recaptchaVerifier).then(function (e) {
        


            var code = prompt('Enter code that you recieved ', '');


            if (code === null) return;


            e.confirm(code).then(function (result) {
                
                alert("Thanks for signin")

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
                    <label htmlFor="validationCustom01">First name</label>
                    <input name="fname" onChange={Event} type="text" className="form-control vw-90" id="validationCustom01" placeholder="First name" value={input.fname} required />

                </div>
                <div className="mb-3">
                    <label htmlFor="validationCustom02">Last name</label>
                    <input name="lname" onChange={Event} type="text" className="form-control" id="validationCustom02" placeholder="Last name" value={input.lname} required />

                </div>
                <div className=" mb-3">
                    <label htmlFor="validationCustomPhone">Phone</label>
                    <input name="phone" onChange={Event} type="number" className="form-control" id="validationCustomPhone" placeholder="923****" value={input.phone} required />

                </div>
            </div>
            <div id="recaptcha" ></div>

            <button id="btn1"
                onClick={click}
                className="btn btn-primary">Submit form</button>

        </div>
        <p></p>
    </>
}

export default SignUp;