import React from 'react';
import './PatientHomePage.css';
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../../components/PatientNavBar';
import DoctorCard from '../DoctorCard';



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
                    <DoctorCard />
                </div>

            </div>
            <Footer />
        </div>
    );
}

export default PatientHomePage;