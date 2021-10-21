import { useContext, useEffect, useState } from "react";
import { IndexContext } from "../context/Index";
import { AuthContext } from "../context/Auth";
import { Alert } from "@mui/material";
const MyApplication = () => {
    const { appsData } = useContext(IndexContext);
    const { user } = useContext(AuthContext);
    const [myApplication, setMyApplication] = useState([]);

    console.log({ myApplication })
    useEffect(() => {
        if (user && appsData) {
            const { id } = user;
            console.log({ id })
            let myArr = [];
            appsData.forEach((val) => {
                console.log({ val })
                const userId = val.appId.split("_")[1]
                console.log({ userId })
                if (userId === id) {
                    myArr.unshift({ ...val })
                }
            })

            setMyApplication(myArr)


        }
    }, [user, appsData])
    return <>
        {/* <div className="container bootstrap snippets bootdey font-013">
            <div className="row mb-5">
                <div className="row my-5 d-flex justify-content-evenly mx-auto ">

                    {myApplication?.map((val) => {
                        return <div key={val.appId} className="col-md-6 col-10 mt-5 col-10 ">
                            <div className="row">
                                <div className="col-md-10 col-12  bg-light br-015 p-3 mx-auto">
                                    <div className="panel ">
                                        <div className="panel-body">
                                            <div className="bio-chart">
                                                <div><input className="knob side-title" /></div>
                                            </div>
                                            <div className="bio-desk">
                                            <h4 className="red text-capitalize">Name : {val.fname} {val.lname}</h4>
                                                <h4 className="red text-capitalize">Type : {val.file}</h4>
                                                <p>Date : {val.date}</p>
                                                <p> Time : {val.time}</p>
                                                <p> Description : {val.des}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    })}


                </div>
            </div>
        </div> */}


        <div className="container ">
            <div className="row">
                {(myApplication != 0) ? myApplication.map((val) => {
                    return <div className="col-md-6  my-5">
                        <div className="col-md-11  shadow mx-auto p-3">
                            <div className="d-flex justify-content-between">
                                <div className="d-flex flex-row align-items-center">
                                    <div className="card-icon"> <i className="bx bxl-mailchimp" /> </div>
                                    <div className="ms-2 c-details">
                                        <h6 className="mb-0 text-info">{val.fname} {val.lname}</h6> <span>1 days ago</span>
                                    </div>
                                </div>
                                <div className="badge"> <span>status : {val.status}</span> </div>
                            </div>
                            <div className="mt-5 font-013">
                               <p>{val.date}</p>
                               <p>{val.time}</p>
                               <p>{val.file}</p>
                                <p>{val.des}</p>
                                </div>
                                <div className="mt-5">
                                    <div className="progress">
                                        <div className="progress-bar" role="progressbar" style={{ width: '50%' }} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                    </div>
                                    <div className="mt-3"> <span className="text1">32 Applied <span className="text2">of 50 capacity</span></span> </div>
                                </div>
                        

                        </div>
                    </div> 

                }): <Alert severity="error">No Application found</Alert>
                }
            </div>
        </div>
    </>
}

export default MyApplication;