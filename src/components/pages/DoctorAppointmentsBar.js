import React, { useState } from "react";
import AppointmentCard from '../AppointmentCard';
import PatientNavBar from "../PatientNavBar";
import './PatientHomePage.css';

function DoctorAppiontmentsBar() {
    return (
        <div>
            <div className='patientnav__bar'>

            </div>
            <AppointmentCard />

        </div>
    )

}

export default DoctorAppiontmentsBar;