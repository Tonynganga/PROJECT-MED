import React, { useEffect, useState } from "react";
import './PatientHomePage.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import AppointmentCard from '../AppointmentCard';
import Select from 'react-select';

const doct_type = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Do not disclose", value: "D" },

];

const hoursData = [
    { name: "7 AM - 9 AM" },
    { name: "9 AM - 11 AM" },
    { name: "11 AM - 1 PM" },
    { name: "1 PM - 3 PM" },
    { name: "3 PM - 5 PM" }
];




function DoctorHomePage() {

    const [hours, setHours] = useState([]);

    useEffect(() => {
        setHours(hoursData);
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempHour = hours.map((hour) => {
                return { ...hour, isChecked: checked };
            });
            setHours(tempHour);
        } else {
            let tempHour = hours.map((hour) =>
                hour.name === name ? { ...hour, isChecked: checked } : hour
            );
            setHours(tempHour);
        }
    };
    return (
        <div>
            <div className="doctorhomepage">
                <div className='doctor__dashboard'>
                    <h4>Home  /  Dashboard</h4>
                    <p>Dashboard</p>
                </div>
                <div className='doctorhome__container'>
                    <div className="doctorhome__sidebar">

                        <div className="doctor__sidebar">
                            <SideBar2 />
                        </div>
                    </div>
                    <div className='doctorpage__holder'>
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
                        {/* <div className='each__appointment'>
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

                        </div> */}
                        <div className='app__activate'>
                            <div className="act_dropdown">
                                <div className='label'>
                                    <label>Category :</label>
                                </div>
                                <Select
                                    options={doct_type}
                                />
                            </div>

                            <div className="checkbox">
                                <div className='label'>
                                    <label>Hours Per Appointment :</label>
                                </div>
                                <form className="form_checkbox">
                                    <div className="form_check">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            name="allSelect"
                                            checked={
                                                hours.filter((hour) => hour?.isChecked !== true).length < 1
                                            }
                                            checked={!hours.some((hour) => hour?.isChecked !== true)}
                                            onChange={handleChange}
                                        />
                                        <label className="form-check-label">All Select</label>
                                    </div>
                                    {hours.map((hour, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name={hour.name}
                                                checked={hour?.isChecked || false}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label ms-2">{hour.name}</label>

                                        </div>
                                    ))}
                                </form>

                            </div>

                            <div className='app-perhour'>
                                <div className='label'>
                                    <label>Appointments Per Two Hours :</label>
                                </div>
                                <input type="text" placeholder="Appointments..."
                                    required
                                    name="appointments"
                                /><br />
                            </div>
                            <input type="submit" value="Proceed" />

                        </div>


                    </div>

                </div>





            </div>
        </div>
    );
}

export default DoctorHomePage;