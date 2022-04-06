import React, { useState, useEffect } from "react";
import Select from 'react-select';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { errorMessage } from '../../actions/errors';
import { setAppointmentSetting } from '../../actions/docAppointments';

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

const hoursData = [
    { isChecked: false, name: "7 AM - 9 AM", value: "07:00" },
    { isChecked: false, name: "9 AM - 11 AM", value: "09:00" },
    { isChecked: false, name: "11 AM - 1 PM", value: "11:00" },
    { isChecked: false, name: "1 PM - 3 PM", value: "13:00" },
    { isChecked: false, name: "3 PM - 5 PM", value: "15:00" }
];


function DoctorAppiontmentSettingBar(props) {
    const [hours, setHours] = useState([]);
    const [category, setCategory] = useState("");
    const [phonenumber, setPhoneNo] = useState("");
    const [location, setLocation] = useState("");
    const [appointmentPer2hr, setAppointmentPer2hr] = useState("");

    useEffect(() => {
        setHours(hoursData);
    }, []);

    const handleChange = (e) => {
        const { name, checked } = e.target;
        if (name === "allSelect") {
            let tempHour = hours.map((hour) => {
                return { ...hour, isChecked: checked };
            });
            setHours(tempHour);
        } else {
            let tempHour = hours.map((hour) =>
                hour.name === name ? { ...hour, isChecked: checked } : hour
            );
            setHours(tempHour);
        }
    };
    const onSubmit = e => {
        e.preventDefault();
        let timeList = []
        hours.forEach((hour) => {
            if (hour.isChecked)
                timeList = [...timeList, hour.value]
        })
        if (timeList.length < 1) {
            props.errorMessage('please select appointment time')
            return
        }
        props.setAppointmentSetting({
            appointment_type: category.value,
            frequency_of_AP_per_2hours: appointmentPer2hr,
            available_appointment_time: timeList,
            address:location,
            phone_number:phonenumber
        })

    }
    return (

        <form
            onSubmit={onSubmit}>
            <div className='app__activate'>
                <div className="act_dropdown">
                    <div className='label'>
                        <label>Category :</label>
                    </div>
                    <Select
                        required
                        options={doct_type}
                        onChange={e => {
                            setCategory(e);
                        }}
                        value={category}
                    />
                    <input
                        tabIndex={-1}
                        autoComplete="off"
                        style={{ opacity: 0, height: 0, margin: 0, padding: 0 }}
                        value={category}
                        required
                    />
                </div>
                <div className="checkbox"
                    style={{ margin: 0 }}>
                    <div className='label'>
                        <label>Hours Per Appointment :</label>
                    </div>
                    <form className="form_checkbox">
                        <div className="form_check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                name="allSelect"
                                checked={
                                    hours.filter((hour) => hour?.isChecked !== true).length < 1
                                }
                                // checked={!hours.some((hour) => hour?.isChecked !== true)}
                                onChange={handleChange}
                            />
                            <label className="form-check-label">All Select</label>
                        </div>
                        {hours.map((hour, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={hour.name}
                                    checked={hour?.isChecked || false}
                                    onChange={handleChange}
                                />
                                <label className="form-check-label ms-2">{hour.name}</label>

                            </div>
                        ))}
                    </form>
                </div>
                <div className='app-perhour'>
                    <div className='label'>
                        <label> No of Appointments Per Two Hours :</label>
                    </div>
                    <input type="text" placeholder="Appointments..."
                        required
                        name="appointmentPer2hr"
                        onChange={e => {
                            setAppointmentPer2hr(e.target.value);
                        }}
                        value={appointmentPer2hr}
                    /><br />
                </div>
                <div className='app-perhour'>
                    <div className='label'>
                        <label> Phone Number :</label>
                    </div>
                    <input type="text" placeholder="Phone Number..."
                        required
                        name="phonenumber"
                        onChange={e => {
                            setPhoneNo(e.target.value);
                        }}
                        value={phonenumber}
                       
                    /><br />
                </div>
                <div className='app-perhour'>
                    <div className='label'>
                        <label> Location :</label>
                    </div>
                    <input type="text" placeholder="Location..."
                        required
                        name="location"
                        onChange={e => {
                            setLocation(e.target.value);
                        }}
                        value={location}
                        
                    /><br />
                </div>
                <input type="submit" value="Proceed" />
            </div>
        </form>
    )

}

DoctorAppiontmentSettingBar.prototype = {
    setAppointmentSetting: propTypes.func.required,
    errorMessage: propTypes.func.required,
}

export default connect(null, { setAppointmentSetting, errorMessage })(DoctorAppiontmentSettingBar)
