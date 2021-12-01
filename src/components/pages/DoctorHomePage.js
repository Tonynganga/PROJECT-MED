import React from 'react';
// import './PatientHomePage.css';
import './Main.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";
  


function DoctorHomePage() {
    return(
        <div>
        <div className="patienthomepage">
            <div className="patienthome">
                <h2>Home / Dashboard</h2>
                <p>Dashboard</p>
            </div>
            </div>
        <SideBar2/>
        
        
        <Footer/>
        </div>
    );
}

export default DoctorHomePage;