import React, { useEffect, useState } from "react";
import './PatientHomePage.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import AppointmentCard from '../AppointmentCard';
import Select from 'react-select';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkIfAppointmentSettingSet } from '../../actions/doc_appointments';
import DoctorAppiontmentsBar from "./DoctorAppointmentsBar";
import DoctorAppiontmentSettingBar from "./DoctorAppointmentSettingBar";





function DoctorHomePage(props) {


    useEffect(() => {
        props.checkIfAppointmentSettingSet()
    }, []);
    

    
    return  (
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
                    {props.appointmentSettingSet?(<DoctorAppiontmentsBar/>):(<DoctorAppiontmentSettingBar/>)}
                    </div>
                </div>
            </div>
        </div>
    );
}

DoctorHomePage.propTypes = {
    appointmentSettingSet: propTypes.bool.isRequired,    
    checkIfAppointmentSettingSet: propTypes.func.isRequired,    
};
const mapStateToProps = state => ({
    appointmentSettingSet: state.doc_appointments.appointmentSettingSet,
});

export default connect(mapStateToProps, { checkIfAppointmentSettingSet })(DoctorHomePage)
