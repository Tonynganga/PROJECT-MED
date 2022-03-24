import React, { useEffect, useState } from 'react';
import './PatientHomePage.css';
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../../components/PatientNavBar';
import DoctorCard from '../DoctorCard';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { getAvailableAppointments } from '../../actions/appointments';
import ReviewModal from '../ReviewModal';




const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1
  }
  
  const OTHER_CONTENT_STYLES = {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'red',
    padding: '10px'
  }



function PatientHomePage(props) {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        props.getAvailableAppointments()
    }, [])
    return (
        <div>

            <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            <div className='patienthome__page'>
                <div className='patient__dashboard'>
                    <h5>Home  /  Dashboard</h5>
                    <h5>Dashboard</h5>
                    <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
                        <button onClick={() => setIsOpen(true)}>Open Modal</button>

                        <ReviewModal open={isOpen} onClose={() => setIsOpen(false)}>
                            Fancy Modal
                        </ReviewModal>
                    </div>
                </div>

                <div className="patienthome__container">

                    <div className="patient__sidebar">
                        <SideBar />
                    </div>

                    <div className='doctorcard__holder'>
                        {props.appointments.map(appointment => (
                            <DoctorCard appointment={appointment} />
                        ))}
                    </div>

                </div>
                <Footer />
            </div>
        </div>

    );
}

PatientHomePage.propTypes = {
    appointments: propTypes.array.isRequired,
    getAvailableAppointments: propTypes.func.isRequired
};
const mapStateToProps = state => ({
    appointments: state.appointments
});

export default connect(mapStateToProps, { getAvailableAppointments })(PatientHomePage)
