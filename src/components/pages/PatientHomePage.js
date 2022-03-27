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
import Select from 'react-select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'


const doct_type = [
    { label: "General Practitioner", value: "general practitioner" },
    { label: "Podiatrist", value: "podiatrist" },
    { label: "Peditrician", value: "peditrician" },
    { label: "Endocrinologist", value: "endocrinologist" },
    { label: "Neurologist", value: "neurologist" },
    { label: "Rheumatologist", value: "rheumatologist" },
    { label: "Allergist", value: "allergist" },
    { label: "Psychiatrist", value: "psychiatrist" },
    { label: "Nephrologist", value: "nephrologist" },
    { label: "Surgeon", value: "surgeon" },
    { label: "Oncologist", value: "oncologist" },
    { label: "Dermatologist", value: "dermatologist" },
    { label: "Radiologist", value: "radiologist" },
    { label: "Cardiologist", value: "cardiologist" },
    { label: "Dentist", value: "dentist" },

];

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


    const [value, setValue] = React.useState('female');

    const handleChange = (event) => {
        setValue(event.target.value);
    };
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

                    <div className='doctor_search_box'>
                        <div align='right' className="doctor_search">
                            <div align='left' className='d-search-form'>
                                <p className='filter-h'>Search Filter</p>
                                <div className='ds-form__data__two'>
                                    <div className='ds-label'>
                                        <label>Location :</label>
                                    </div>
                                    <input type="text" placeholder="Enter Location..."
                                        name="username"
                                        required
                                    /><br />
                                </div>
                                <div className='ds-form__data__two'>
                                    <FormControl>
                                        <div className='ds-label'>
                                            <label>Gender :</label>
                                        </div>
                                        <RadioGroup
                                            aria-labelledby='demo-radio-buttons-groub-label'
                                            defaultValue="male"
                                            name="radio-buttons-group"
                                            value={value}
                                            onChange={handleChange}>
                                            <FormControlLabel value='male' control={<Radio />} label='Male' />
                                            <FormControlLabel value='female' control={<Radio />} label='Female' />
                                            <FormControlLabel value='other' control={<Radio />} label='Other' />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className="ds-dropdown">
                                    <div className='ds-label'>
                                        <label>Select Specialist :</label>
                                    </div>
                                    <Select
                                    options={doct_type}/>
                                </div>
                                <div className='ds-search-btn'>
                                    <a href="/appointment" className='ds-book__btn' >Search</a>
                                </div>

                            </div>

                        </div>

                    </div>


                </div>

            </div>
            <Footer />
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
