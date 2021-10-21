import { remove } from "@firebase/database";
import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { InputLabel, TextField, FormControl, MenuItem, Select, Button, Alert } from '@mui/material';
import { getDatabase, ref, set, get, onChildAdded, child, onChildChanged } from "firebase/database";
import { toast } from "react-toastify";
import UserRequestRow from "../components/UserRequestRow";
import "../css/userRequest.css";
import { IndexContext } from "../context/Index";
import DropDown from "../components/DropDown";
import { minWidth } from "@mui/system";
const UserRequest = () => {
    const param = useParams();
    const db = getDatabase();
    const { appsData } = useContext(IndexContext);
    const [userRequest, setUserRequest] = useState(null);
    const [cond, setCond] = useState(false);
    const states = ["pending", "progress", "rejected", "success"];
    const [appStatus, setAppStatus] = useState("pending")
    const { id } = param;
    console.log({ userRequest })
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
            set(ref(db, `application/${id}`), {
                ...userRequest, status: appStatus
            }).then(() => {
                toast.success(`Updated Succesfully!`);
            }).catch((error) => {
                toast.warning(error.message);

            });

        }
        setCond(pre => !pre)
    }

    console.log({ id })
    return <>


        <div className="container bootstrap snippets bootdey font-013">
            <div className="row">
                {/* <div className="profile-nav col-md-3">
                        <div className="panel">
                            <div className="user-heading round">
                                <a href="#">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="" />
                                </a>
                                <h1>Camila Smith</h1>
                                <p>deydey@theEmail.com</p>
                            </div>
                            <ul className="nav nav-pills nav-stacked">
                                <li className="active"><a href="#"> <i className="fa fa-user" /> Profile</a></li>
                                <li><a href="#"> <i className="fa fa-calendar" /> Recent Activity <span className="label label-warning pull-right r-activity">9</span></a></li>
                                <li><a href="#"> <i className="fa fa-edit" /> Edit profile</a></li>
                            </ul>
                        </div>
                    </div> */}
                <div className="profile-info col-md-9 p-5 mx-auto">
                    {userRequest ?
                        <div className="panel shadow mb-4">

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
                        <div className="row my-5">
                            <div className="col-md-6 shadow p-3">
                                <div className="panel">
                                    <div className="panel-body">
                                        <div className="bio-chart">
                                            <div style={{ display: 'inline', width: '100px', height: '100px' }}><canvas width={100} height="100px" /><input className="knob" data-width={100} data-height={100} data-displayprevious="true" data-thickness=".2" defaultValue={35} data-fgcolor="#e06b7d" data-bgcolor="#e8e8e8" style={{ width: '54px', height: '33px', position: 'absolute', verticalAlign: 'middle', marginTop: '33px', marginLeft: '-77px', border: '0px', fontWeight: 'bold', fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal', fontSize: '20px', lineHeight: 'normal', fontFamily: 'Arial', textAlign: 'center', color: 'rgb(224, 107, 125)', padding: '0px', WebkitAppearance: 'none', background: 'none' }} /></div>
                                        </div>
                                        <div className="bio-desk">
                                            <h4 className="red">Envato Website</h4>
                                            <p>Started : 15 July</p>
                                            <p>Deadline : 15 August</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="panel">
                                    <div className="panel-body">
                                        <div className="bio-chart">
                                            <div style={{ display: 'inline', width: '100px', height: '100px' }}><canvas width={100} height="100px" /><input className="knob" data-width={100} data-height={100} data-displayprevious="true" data-thickness=".2" defaultValue={63} data-fgcolor="#4CC5CD" data-bgcolor="#e8e8e8" style={{ width: '54px', height: '33px', position: 'absolute', verticalAlign: 'middle', marginTop: '33px', marginLeft: '-77px', border: '0px', fontWeight: 'bold', fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal', fontSize: '20px', lineHeight: 'normal', fontFamily: 'Arial', textAlign: 'center', color: 'rgb(76, 197, 205)', padding: '0px', WebkitAppearance: 'none', background: 'none' }} /></div>
                                        </div>
                                        <div className="bio-desk">
                                            <h4 className="terques">ThemeForest CMS </h4>
                                            <p>Started : 15 July</p>
                                            <p>Deadline : 15 August</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="panel">
                                    <div className="panel-body">
                                        <div className="bio-chart">
                                            <div style={{ display: 'inline', width: '100px', height: '100px' }}><canvas width={100} height="100px" /><input className="knob" data-width={100} data-height={100} data-displayprevious="true" data-thickness=".2" defaultValue={75} data-fgcolor="#96be4b" data-bgcolor="#e8e8e8" style={{ width: '54px', height: '33px', position: 'absolute', verticalAlign: 'middle', marginTop: '33px', marginLeft: '-77px', border: '0px', fontWeight: 'bold', fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal', fontSize: '20px', lineHeight: 'normal', fontFamily: 'Arial', textAlign: 'center', color: 'rgb(150, 190, 75)', padding: '0px', WebkitAppearance: 'none', background: 'none' }} /></div>
                                        </div>
                                        <div className="bio-desk">
                                            <h4 className="green">VectorLab Portfolio</h4>
                                            <p>Started : 15 July</p>
                                            <p>Deadline : 15 August</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="panel">
                                    <div className="panel-body">
                                        <div className="bio-chart">
                                            <div style={{ display: 'inline', width: '100px', height: '100px' }}><canvas width={100} height="100px" /><input className="knob" data-width={100} data-height={100} data-displayprevious="true" data-thickness=".2" defaultValue={50} data-fgcolor="#cba4db" data-bgcolor="#e8e8e8" style={{ width: '54px', height: '33px', position: 'absolute', verticalAlign: 'middle', marginTop: '33px', marginLeft: '-77px', border: '0px', fontWeight: 'bold', fontStyle: 'normal', fontVariant: 'normal', fontStretch: 'normal', fontSize: '20px', lineHeight: 'normal', fontFamily: 'Arial', textAlign: 'center', color: 'rgb(203, 164, 219)', padding: '0px', WebkitAppearance: 'none', background: 'none' }} /></div>
                                        </div>
                                        <div className="bio-desk">
                                            <h4 className="purple">Adobe Muse Template</h4>
                                            <p>Started : 15 July</p>
                                            <p>Deadline : 15 August</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    </>

}

export default UserRequest;