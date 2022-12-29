import React, { useEffect, useState } from "react";
import './PatientHomePage.css';
import SideBar2 from "./SideBar2";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkIfAppointmentSettingSet } from '../../actions/docAppointments';
import DoctorAppiontmentsBar from "./DoctorAppointmentsBar";
import DoctorAppiontmentSettingBar from "./DoctorAppointmentSettingBar";
import DoctorBars from "../DoctorBars";
import Footer from "../Footer";





function DoctorHomePage(props) {


    useEffect(() => {
        props.checkIfAppointmentSettingSet()
    }, []);



    return (
        <div>
            <div className="doctorhomepage">
               
                <div className='doctorhome__container'>
                    <DoctorBars/>
                    <div className='doctorpage__holder'>
                        {props.appointmentSettingSet ? (<DoctorAppiontmentsBar />) : (<DoctorAppiontmentSettingBar />)}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

DoctorHomePage.propTypes = {
    appointmentSettingSet: propTypes.bool.isRequired,
    checkIfAppointmentSettingSet: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    appointmentSettingSet: state.docAppointments.appointmentSettingSet,
});

export default connect(mapStateToProps, { checkIfAppointmentSettingSet })(DoctorHomePage)
