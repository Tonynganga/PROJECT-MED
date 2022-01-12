import React from 'react';
import './PatientHomePage.css';
//import './Main.css'
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../../components/PatientNavBar';
import DoctorCard from '../DoctorCard';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";



function PatientHomePage() {
    return (
        <div className='patienthome__page'>
            <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            <div className='patient__dashboard'>
                <h4>Home  /  Dashboard</h4>
                <p>Dashboard</p>
            </div>

            <div className="patienthome__container">

                <div className="patient__sidebar">
                    <SideBar />
                </div>
                <div className='doctorcard__holder'>
                    <DoctorCard />
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default PatientHomePage;