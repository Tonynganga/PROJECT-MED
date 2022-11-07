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
import FormLabel from '@mui/material/FormLabel'
import PatientBars from '../PatientBars';


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
    const genders = [
        { label: "Male", value: "M" },
        { label: "Female", value: "F" },
        { label: "Do not disclose", value: "D" },

    ];
    const [category, setCategory] = useState("");
    

    useEffect(() => {
        props.getAvailableAppointments()
    }, [])
    const [filteredAppointments, setFilteredAppointments] = useState([])
    useEffect(() => {
        if (props.appointments.length > 0) {
            setFilteredAppointments(props.appointments)
        }
    }, [props.appointments])
    const onSearch = () => {
        let tempList
        if (props.appointments.length > 0) {
            tempList = props.appointments.filter(appointment => appointment.doctor_gender === gender)
            if (location.length > 1)
                tempList = tempList.filter(appointment => appointment.doctor_address.toLowerCase() === location.toLowerCase())
            if (category.value.length > 1)
                tempList = tempList.filter(appointment => appointment.appointment_type === category.value)
            setFilteredAppointments(tempList)
        }
    }



    const [gender, setGender] = React.useState('F');
    const [location, setLocation] = React.useState("");


    return (
        <div>
            

            <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            <div className='patienthome__page'>
               

                <div className="patienthome__container">
                <PatientBars/>

                    <div className='doctorcard__holder'>
                        {filteredAppointments.map(appointment => (
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
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
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
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}>
                                            <FormControlLabel value='M' control={<Radio />} label='Male' />
                                            <FormControlLabel value='F' control={<Radio />} label='Female' />
                                            <FormControlLabel value='D' control={<Radio />} label='Other' />
                                        </RadioGroup>
                                    </FormControl>
                                </div>

                                <div className="ds-dropdown">
                                    <div className='ds-label'>
                                        <label>Select Specialist :</label>
                                    </div>
                                    <Select
                                        options={doct_type}
                                        onChange={e => {
                                            setCategory(e);
                                        }}
                                        value={category}
                                    />
                                </div>
                                <div className='ds-search-btn'>
                                    <a href="#" onClick={onSearch} className='ds-book__btn' >Search</a>
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
    appointments: state.appointments.appointmentList
});

export default connect(mapStateToProps, { getAvailableAppointments })(PatientHomePage)
