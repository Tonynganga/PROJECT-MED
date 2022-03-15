import React, { useState } from "react";
import AppointmentCard from '../AppointmentCard';

function DoctorAppiontmentsBar() {
    return (
        <div>
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
            <div className='each__appointment'>
                <div className='appointment'>
                    <div className='appt__details'>
                        <h3>Patient Appointment</h3>
                        <div className='appt__btns'>
                            <button className='btn__upcoming' >Upcoming</button>
                            <button className='btn__today' >Today</button>
                        </div>
                        <div className='appt__headlines'>
                            <h3 className="">Patient Name</h3>
                            <h3 className="">Appt Date</h3>
                            <h3 className="">Purpose</h3>
                            <h3 className="">Amount</h3>
                            <h3 className="">Paid</h3>
                            <h3 className="">Status</h3>
                            <h3 className="">Medicine</h3>
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