import React from 'react';
import MyPatientCard from '../MyPatientCard';
import PatientNavBar from '../PatientNavBar';
import './PatientHomePage.css';
import SideBar2 from './SideBar2';



function MyPatients() {
    return (
        <div>
            <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            <div class="mpatients__header">
                <h2>My Patients</h2>
            </div>
            <div className='mypatients_hpage'>

                <div className="mypatients__container">

                    <div className="doctor__sidebar">
                        <SideBar2 />
                    </div>
                    <div className='patientcard'>
                        <MyPatientCard />
                        <MyPatientCard />
                        <MyPatientCard />
                        <MyPatientCard />
                        <MyPatientCard />
                    </div>

                </div>

            </div>
        </div>
    )
}

export default MyPatients;