import React, { useState } from "react";
import AppointmentCard from '../AppointmentCard';
import PatientNavBar from "../PatientNavBar";
import './PatientHomePage.css';

function DoctorAppiontmentsBar() {
    return (
        <div>
            <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            
            <div className='each__appointment'>
                <div className='appointment'>
                    <div className='appt__details'>
                        <h4>Patient Appointment</h4>
                        <div className='appt__btns'>
                            <button className='btn__upcoming' >Pending</button>
                            <button className='btn__today' >Completed</button>
                        </div>
                    </div>
                    <AppointmentCard />
                </div>
            </div>
        </div>
    )

}

export default DoctorAppiontmentsBar;