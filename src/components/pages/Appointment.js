import React, { useEffect, useState } from 'react';
import './CssMain.css';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../PatientNavBar';
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
import { connect } from 'react-redux';
import { errorMessage } from '../../actions/notifyPopUp';
import { setAppointment,getAppointmentTimePerDate } from '../../actions/appointments';
import propTypes from 'prop-types';

const hoursData = [
    { isChecked: false, name: "7 AM - 9 AM", value: "07:00:00" },
    { isChecked: false, name: "9 AM - 11 AM", value: "09:00:00" },
    { isChecked: false, name: "11 AM - 1 PM", value: "11:00:00" },
    { isChecked: false, name: "1 PM - 3 PM", value: "13:00:00" },
    { isChecked: false, name: "3 PM - 5 PM", value: "15:00:00" }
];

function Appointment(props) {
    const [hours, setHours] = useState([]);
    const [appointmentDate, setAppointmentDate] = useState("");
    useEffect(() => {
        let resultArray=[]
        if(props.availableAppointmentTime.length>0){
            props.availableAppointmentTime.forEach(elem=>{
                let tempArr=hoursData.filter(data=>data.value==elem)
                resultArray=[...resultArray,...tempArr]
            })  

        }else
        resultArray=hoursData
        setHours(resultArray);
    }, [props.availableAppointmentTime]);

    
   

    const handleChange = (e) => {
        const { name, checked } = e.target;
            let tempHour = hours.map((hour) =>
                hour.name === name ? { ...hour, isChecked: checked } : { ...hour, isChecked: false }
            );
            setHours(tempHour);
        
    }

    const handleDateChange=(e)=>{
        setAppointmentDate(e.value)
        props.getAppointmentTimePerDate({
            appiontmentID:props.location.state.appointmentId,
            appiontmentDate:e.value.toISOString().substring(0, 10)
        })        
    }

    const onSubmit=(e)=>{
        e.preventDefault()
        let appointmentTime
        hours.forEach((hour) => {
            if (hour.isChecked)
            appointmentTime = [hour.value]
        })
        if(appointmentDate==""){
            props.errorMessage('please select appointment date')
            return
        }

        if (appointmentTime.length < 1) {
            props.errorMessage('please select appointment time')
            return
        }
      const data = {
        appointment_id:props.location.state.appointmentId,
        appointment_time:appointmentTime[0],
        appointment_date:appointmentDate.toISOString().substring(0, 10),
      }
      props.setAppointment(data)

    }

    

    return (
        <div>
            <div className="Bapp__page">
                <div className='Bappnav__bar'>
                    <PatientNavBar />
                </div>
                <div className='Bapp__dashboard'>
                    <h4>Home  /  Dashboard</h4>
                    <p>Dashboard</p>
                </div>
                <div className="Bapp__container">
                    <div className="Bapp__sidebar">
                        <SideBar/>
                    </div>
                    <div className='Bapp__wrapper'>
                        <div className='Bapp__header'>
                            <h2>Book Appointment</h2>
                        </div>
                        <form onSubmit={onSubmit} className='Bapp_form'>

                            <div className='Bapp__appdate'>
                                <div className='Bapp__label'>
                                    <label>Enter Appointment Date</label>
                                </div>
                                <div className='Bapp__appdate__edt'>

                                    <DatePickerComponent
                                        id="datepicker"
                                        placeholder='Enter Date...'
                                        fullWidth
                                        color='#00000'
                                        variant='none'
                                        format="dd-MMM-yy" 
                                        allowEdit={false}
                                        value={appointmentDate}
                                        onChange={handleDateChange}
                                        min={new Date()}
                                    >

                                    </DatePickerComponent>

                                </div>
                            </div>
                            <div className="appoint-checkbox">
                                <div className='label'>
                                    <label>Pick Time Duration :</label>
                                </div>
                                <div className="checkbox-form">
                                    {hours.map((hour, index) => (
                                        <div className="form-check" key={index}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                name={hour.name}
                                                checked={hour.isChecked || false}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label">{hour.name}</label>

                                        </div>
                                    ))}
                                </div>


                            </div>
                            <div className='submit'>
                                <input type="submit" value="Proceed to Pay" />
                            </div>

                        </form>
                        <div className='Bapp__personalinfo'>
                            <div className='Bapp__personalinf__edt'>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='First Name'
                                    name='firstname'

                                />
                            </div>
                            <div className='Bapp__personalinf__edt'>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Last Name'
                                    name='lastname'

                                />
                            </div>

                        </div>
                        <div className='Bapp__personalinfo'>
                            <div className='Bapp__personalinf__edt'>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Email'
                                    name='email'

                                />
                            </div>
                            <div className='Bapp__personalinf__edt'>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Phone'
                                    name='phone'

                                />
                            </div>

                        </div>
                        <div className='Bapp__personalinfo'>
                            <div className='Bapp__personalinf__edt'>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Location'
                                    name='location'

                                />
                            </div>
                            <div className='Bapp__personalinf__edt'>
                                <TextField
                                    fullWidth
                                    autoFocus
                                    color='primary'
                                    margin='normal'
                                    variant='outlined'
                                    label='Phone'
                                    name='phone'

                                />
                            </div>

                        </div>



                        <div className='payment__div'>
                            <div className='payment__div__header'>
                                <h3>Payment Method</h3>
                            </div>
                            <RadioGroup
                                className="payment__radiogroup"
                                aria-label="payment"
                                name="payment"
                                style={{ display: "initial" }}
                            >
                                <FormControlLabel
                                    value="creditcard"
                                    control={<Radio />}
                                    label="Credit Card"
                                />
                            </RadioGroup>
                            <div className='Bapp__paymentinfo'>

                                <div className='Bapp__paymentinf__edt'>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Name'
                                        name='name'

                                    />
                                </div>
                                <div className='Bapp__paymentinf__edt'>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Card Number'
                                        name='cardnumber'

                                    />
                                </div>

                            </div>
                            <div className='Bapp__paymentinfo'>
                                <div className='Bapp__paymentinf__edt2'>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Expiry Month'
                                        name='expirymonth'

                                    />
                                </div>
                                <div className='Bapp__paymentinf__edt2'>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='Expiry Year'
                                        name='expiryyear'

                                    />
                                </div>
                                <div className='Bapp__paymentinf__edt2'>
                                    <TextField
                                        fullWidth
                                        autoFocus
                                        color='primary'
                                        margin='normal'
                                        variant='outlined'
                                        label='CVV'
                                        name='cvv'

                                    />
                                </div>



                            </div>
                            <RadioGroup
                                className="payment__radiogroup"
                                aria-label="payment"
                                name="payment"
                                style={{ display: "initial" }}
                            >
                                <FormControlLabel
                                    value="paypal"
                                    control={<Radio />}
                                    label="Paypal"
                                />
                            </RadioGroup>
                            <div className='Bapp__terms'>
                                <FormControlLabel
                                    control={<Checkbox name="checkedA" />}
                                    label="I accept the terms and conditions."
                                />
                            </div>
                            <input type="submit" value="Confirm and Pay" />

                        </div>
                    </div>

                </div>



                <Footer />
            </div>
        </div>
    );
}



Appointment.prototype = {
    setAppointment: propTypes.func.isRequired,
    errorMessage: propTypes.func.isRequired,
    getAppointmentTimePerDate:propTypes.func.isRequired
}

const mapStateToProps = state => ({
    availableAppointmentTime: state.appointments.availableAppointmentTime,
});

export default connect(mapStateToProps, {setAppointment,getAppointmentTimePerDate,  errorMessage })(Appointment)
