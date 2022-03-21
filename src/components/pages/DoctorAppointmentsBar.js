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
                    <h4 className="today__app_title">Today Appointments</h4>
                </div>
                <div className="Pending__app">
                    <h4 className="pending__app_title">Pending Appointments</h4>
                </div>
                <div className="Total__app">
                    <h4 className="total__app_title">Total Appointments</h4>
                </div>
            </div>
            <div className='each__appointment'>
                <div className='appointment'>
                    <div className='appt__details'>
                        <h4>Patient Appointment</h4>
                        <div className='appt__btns'>
                            <button className='btn__upcoming' >Upcoming</button>
                            <button className='btn__today' >Today</button>
                        </div>
                        <div className='appt__headlines'>
                            <p className="">Patient Name</p>
                            <p className="">Appt Date</p>
                            <p className="">Purpose</p>
                            <p className="">Amount</p>
                            <p className="">Paid</p>
                            <p className="">Status</p>
                            <p className="">Medicine</p>
                        </div>
                    </div>
                    <AppointmentCard />
                    <AppointmentCard />
                </div>
            </div>
        </div>
    )

}

export default DoctorAppiontmentsBar;