import Navbar from 'react-bootstrap/Navbar';
import  "bootstrap/dist/css/bootstrap.min.css";
import  "bootstrap/dist/js/bootstrap.bundle.js";
import { useHistory } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import {Select, Button,Stack} from '@mui/material';

import { removeLocalStorage } from '../utils/utils';
import { localStorageKeys } from '../utils/constant';
import { useContext } from 'react';
import { AuthContext } from '../context/Auth';


const Topbar = () =>{
  const history = useHistory();

      function Logout(){
        removeLocalStorage(localStorageKeys.user);
        removeLocalStorage(localStorageKeys.token);
        history.replace('/');
      }
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
    <div className="container">
      <img className="logo" src="./images/logo1.jfif" alt="logo"/>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink exact to="/" activeClassName="active" className="nav-link"  aria-current="page">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin" activeClassName="active" className="nav-link">admin</NavLink>
          </li>
          <li className="nav-item">
            <NavLink  to="/signin" activeClassName="active" className="nav-link">SignIn</NavLink>
          </li>

          <li className="nav-item">
            <NavLink  to="/applicant" activeClassName="active" className="nav-link">Applicant</NavLink>
          </li>

          <li className="nav-item">
            <NavLink  to="/request" activeClassName="active" className="nav-link">Request</NavLink>
          </li>

          <li className="nav-item">
          <Button variant="text" onClick={()=>{Logout()}} color="success">Logout</Button>
          </li>
        </ul>
        <form className="d-flex">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
  </nav>
}

export default Topbar;