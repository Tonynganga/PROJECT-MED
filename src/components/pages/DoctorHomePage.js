import React, { useEffect, useState } from "react";
import './PatientHomePage.css';
import SideBar2 from "./SideBar2";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkIfAppointmentSettingSet } from '../../actions/docAppointments';
import DoctorAppiontmentsBar from "./DoctorAppointmentsBar";
import DoctorAppiontmentSettingBar from "./DoctorAppointmentSettingBar";
import DoctorBars from "../DoctorBars";
import Footer from "../Footer";





function DoctorHomePage(props) {

    if(!props.isAuthenticated){
        return <Redirect to="/" />;
    }


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
    isAuthenticated:propTypes.bool.isRequired,
    checkIfAppointmentSettingSet: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    appointmentSettingSet: state.docAppointments.appointmentSettingSet,
    isAuthenticated:state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { checkIfAppointmentSettingSet })(DoctorHomePage)
