import React, { Component } from 'react';
import './Appointment.css';
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// import './Main.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import PatientNavBar from '../PatientNavBar';
import { Grid, Container, Paper, Avatar, Typography, TextField, Button, CssBaseline } from '@material-ui/core'
import { DatePickerComponent } from "@syncfusion/ej2-react-calendars";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";


export class Appointment extends Component {
    render() {
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
                            <SideBar2 />
                        </div>
                        <div className='Bapp__wrapper'>
                            <div className='Bapp__header'>
                                <h2>Book Appointment</h2>
                            </div>
                            <div className='Bapp_form'>
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
                                            variant='outlined'
                                            format="dd-MMM-yy"
                                        >

                                        </DatePickerComponent>

                                    </div>
                                </div>
                                <div className='submit'>
                                    <input type="submit" value="Proceed to Pay" />
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
}


export default Appointment;