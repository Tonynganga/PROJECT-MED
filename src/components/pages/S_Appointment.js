import React, { useEffect, useState } from 'react';
import './PatientHomePage.css';
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../../components/PatientNavBar';
import DoctorCard from '../DoctorCard';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getAvailableAppointments } from '../../actions/appointments';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import DoctorBars from '../DoctorBars';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';


function S_Appointment(){
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    if(!isAuthenticated){
        return <Redirect to="/" />;
    }

    return (
        <div>
            <div className='s_appointment_page'>
                <div className="s_appointment_container">
                <DoctorBars/>            
                    <div className='s_appointment_holder'>
                        
                    </div>


                </div>

            </div>
            <Footer />
        </div>
    );
}

export default S_Appointment
