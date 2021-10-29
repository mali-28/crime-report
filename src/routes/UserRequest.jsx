import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Alert } from '@mui/material';
import { getDatabase, ref, set} from "firebase/database";
import { toast } from "react-toastify";
import UserRequestRow from "../components/UserRequestRow";
import "../css/userRequest.css";
import { IndexContext } from "../context/Index";
import DropDown from "../components/DropDown";


const UserRequest = () => {
    const param = useParams();
    const db = getDatabase();

    const { appsData } = useContext(IndexContext);
    const [userRequest, setUserRequest] = useState(null);
    const [cond, setCond] = useState(false);
    const states = ["pending", "progress", "rejected", "success"];
    const [appStatus, setAppStatus] = useState("pending")
    const { id } = param;

    // console.log({ userRequest })
    useEffect(() => {
        if (appsData) {
            const data = appsData.find((val) => {
                return val.appId === id
            })
            if (data) {
                setAppStatus(data.status)
                setUserRequest(data)

            }
        }
    }, [appsData])

    const update = () => {
        if (cond) {
            const { cnic, city, des, file, res, status } = userRequest;
            set(ref(db, `application/${id}`), {
                cnic, city, des, file, res, status, status: appStatus
            }).then(() => {
                toast.success(`Updated Succesfully!`);
            }).catch((error) => {
                toast.error(error.message);

            });

        }
        setCond(pre => !pre)
    }

    console.log({ id })
    return <>

        <div className="container bootstrap snippets bootdey font-013 mb-5">
            <div className="row">
               
                <div className="profile-info bg-default col-md-9 p-5 mx-auto">
                    {userRequest ?
                        <div className="panel shadow ">

                            <div className="panel-body bio-graph-info p-5 ">
                                <div className="row">
                                    <UserRequestRow title="First Name" value={userRequest.fname} />
                                    <UserRequestRow title="Last Name" value={userRequest.lname} />
                                    <UserRequestRow title="City" value={userRequest.city} />
                                    <UserRequestRow title="UserId" value={userRequest.id} />
                                    <UserRequestRow title="Email" value={userRequest.email} />
                                    <UserRequestRow title="Phone" value={userRequest.phone} />
                                    <UserRequestRow title="Case" value={userRequest.file} />
                                    <UserRequestRow title="ApplicationId" value={userRequest.appId} />
                                    <UserRequestRow title="Time" value={userRequest.time} />
                                    <UserRequestRow title="Date" value={userRequest.date} />
                                    <UserRequestRow title="Description" value={userRequest.des} />
                                    <div className="bio-row">
                                        <p><span>Status </span>:
                                            {!cond ? <> <span> {userRequest.status} </span> <i onClick={update} className="fa  fa-edit text-primary p-2" /></> :
                                                <> <DropDown arr={states} style={{ minWidth: 100 }} label="Report" value={appStatus} onChange={setAppStatus} />
                                                    <i onClick={update} className="fa fa-check text-success   p-2" />  <i onClick={() => { setCond(pre => !pre) }} className="text-danger fa fa-times p-2" /></>}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : <Alert severity="error">No data found</Alert>
                    }
                    <div>
                    </div>
                </div>
            </div>


        </div>
    </>

}

export default UserRequest;