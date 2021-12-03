import React from 'react';
import './PatientHomePage.css';
// import './Main.css';
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
    return (
        <div>
            <div className="doctorhomepage">
                <div className='doctor__dashboard'>
                    <h4>Home  /  Dashboard</h4>
                    <p>Dashboard</p>
                </div>
                <div className="doctorhome__container">

                    <div className="doctor__sidebar">
                        <SideBar2 />
                    </div>
                    <div className="appointment__bar">
                        <div className="Today__app">
                            <h2 className="today__app_title">Today Appointments</h2>
                        </div>
                        <div className="Pending__app">
                            <h2 className="pending__app_title">Pending Appointments</h2>
                        </div>
                        <div className="Total__app">
                            <h2 className="total__app_title">Total Appointments</h2>
                        </div>
                    </div>
                </div>



                <Footer />
            </div>
        </div>
    );
}

export default DoctorHomePage;