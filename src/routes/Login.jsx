import React, {useState } from "react";

const Login = () => {
    const [input, setInput] = useState({
        fname: "m",
        lname: "ali",
        phone: null,
    })

    const Event = ((e) => {
        const { name, value } = e.target;

        setInput((pre) => {
            return { ...pre, [name]: value }
        })
    })

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

            <button id="btn1" className="btn btn-primary">Submit form</button>

        </div>
    </>
}

export default Login;