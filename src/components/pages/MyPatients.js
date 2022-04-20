import React, { useEffect, useState } from 'react';
import {getPatientDetailsForDoctor} from '../../actions/docAppointments'
import MyPatientCard from '../MyPatientCard';
import PatientNavBar from '../PatientNavBar';
import './PatientHomePage.css';
import SideBar2 from './SideBar2';
import propTypes from 'prop-types';
import { connect } from 'react-redux';



const MyPatients=(props)=>{
    const[details,setDetails]=useState([])
    useEffect(() => {
        props.getPatientDetailsForDoctor()
    }, [])
    useEffect(() => {
        if (props.patientDetails.length > 0) {
            setDetails(props.patientDetails)
        }
    }, [props.patientDetails])
    
    
    return (
        <div>
            <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            <div class="mpatients__header">
                <h2>My Patients</h2>
            </div>
            <div className='mypatients_hpage'>
            
                <div className="doctorhome__sidebar">

                    <div className="doctor__sidebar">
                        <SideBar2 />
                    </div>{details.map(elem=><MyPatientCard details={elem}/>)
                    }
                </div>

            </div>
        </div>
    )
}

MyPatients.propTypes = {
    patientDetails: propTypes.array.isRequired,
    getPatientDetailsForDoctor: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    patientDetails: state.docAppointments.patientDetailForDoc,
});

export default connect(mapStateToProps, { getPatientDetailsForDoctor })(MyPatients)