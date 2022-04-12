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
            <div className="appointment__bar">
                <div className="Today__app">
                    <h5 className="today__app_title">Today Appointments</h5>
                </div>
                <div className="Pending__app">
                    <h5 className="pending__app_title">Pending Appointments</h5>
                </div>
                <div className="Total__app">
                    <h5 className="total__app_title">Total Appointments</h5>
                </div>
            </div>
            <div className='each__appointment'>
                <div className='appointment'>
                    <div className='appt__details'>
                        <h5>Patient Appointment</h5>
                        <div className='appt__btns'>
                            <button className='btn__upcoming' >Upcoming</button>
                            <button className='btn__today' >Today</button>
                        </div>
                    </div>
                    <AppointmentCard />
                </div>
            </div>
        </div>
    )

}

export default DoctorAppiontmentsBar;