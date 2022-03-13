import React, { useEffect, useState } from 'react';
import './PatientHomePage.css';
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../../components/PatientNavBar';
import DoctorCard from '../DoctorCard';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getAvailableAppointments } from '../../actions/appointments';



function PatientHomePage(props) {
    useEffect(()=>{
        props.getAvailableAppointments()
    },[])
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
                    {props.appointments.map(appointment=>(
                        <DoctorCard appointment={appointment} />
                    ))}                    
                </div>

            </div>
            <Footer />
        </div>
    );
}

PatientHomePage.propTypes = {
    appointments: propTypes.array.isRequired,
    getAvailableAppointments:propTypes.func.isRequired
};
const mapStateToProps = state => ({
    appointments: state.appointments
});

export default connect(mapStateToProps, {getAvailableAppointments })(PatientHomePage)
