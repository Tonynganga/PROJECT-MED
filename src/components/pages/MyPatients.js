import React, { useEffect, useState, useContext } from 'react';
import { getPatientDetailsForDoctor } from '../../actions/docAppointments'
import MyPatientCard from '../MyPatientCard';
import PatientNavBar from '../PatientNavBar';
import './PatientHomePage.css';
import SideBar2 from './SideBar2';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { WebSocketService } from '../../websocket';
import DoctorBars from '../DoctorBars';
import Footer from '../Footer';



const MyPatients = (props) => {
    const ws = useContext(WebSocketService);
    const [details, setDetails] = useState([])
    useEffect(() => {
        ws.connectWsMyPatientsDetails()
        ws.sendMessage('get_my_patients_details', {})
        // props.getPatientDetailsForDoctor()
    }, [props.user])
    useEffect(() => {
        setDetails(props.patientDetails)
    }, [props.patientDetails])


    return (
        <div>
            <div class="mpatients__header">
                <h3>My Patients</h3>
            </div>
            <div className='mypatients_hpage'>
                <DoctorBars />

                <div className="mypatients__container">
                    {details.map(elem => <MyPatientCard details={elem} />)
                    }
                </div>

            </div>
            <Footer/>
        </div>
    )
}

MyPatients.propTypes = {
    patientDetails: propTypes.array.isRequired,
    getPatientDetailsForDoctor: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    patientDetails: state.docAppointments.patientDetailForDoc,
    user: state.auth.user
});

export default connect(mapStateToProps, { getPatientDetailsForDoctor })(MyPatients)