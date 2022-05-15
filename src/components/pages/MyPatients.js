import React, { useEffect, useState,useContext } from 'react';
import {getPatientDetailsForDoctor} from '../../actions/docAppointments'
import MyPatientCard from '../MyPatientCard';
import PatientNavBar from '../PatientNavBar';
import './PatientHomePage.css';
import SideBar2 from './SideBar2';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { WebSocketService } from '../../websocket';



const MyPatients=(props)=>{
    const ws = useContext(WebSocketService);
    const[details,setDetails]=useState([])
    useEffect(() => {
        ws.connectWsMyPatientsDetails()
        ws.sendMessage('get_my_patients_details',{})
        // props.getPatientDetailsForDoctor()
    }, [props.user])
    useEffect(() => {
            setDetails(props.patientDetails)
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

                <div className="mypatients__container">

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
    user:state.auth.user
});

export default connect(mapStateToProps, { getPatientDetailsForDoctor })(MyPatients)