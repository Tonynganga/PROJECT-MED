import React from "react"
import './DoctorCard.css';
import {capitalizeFirstLetter} from '../utils'
import { Link } from 'react-router-dom';


const DoctorCard=(props)=> {
    
        return (
            <div key={props.appointment.id} className="card">
                <div className="card__wrapper">
                    <div className="card__image">
                        <img src={'http://localhost:8000' + props.appointment.doctor_profile_pic} id="img" alt="#" width="80px" height="80px" />
                    </div>
                    <div className='details__wrapper'>
                        <div className="card__details__wrapper">
                            <div className="card__details">
                                <h5>{capitalizeFirstLetter(props.appointment.doctor_first_name)+" "+capitalizeFirstLetter(props.appointment.doctor_last_name)}</h5>
                            </div>
                            <div className="card__details">
                                <h5>{capitalizeFirstLetter(props.appointment.appointment_type)}</h5>
                            </div>
                           
                        </div>
                        <div className="cardbook__details__wrapper">
                        <div className="card__details">
                                <h5>{props.appointment.doctor_address}</h5> 
                            </div>
                            
                            <div className="card__details">
                                <h5>{props.appointment.doctor_phone_no}</h5>
                            </div>
                            <Link to={{
                            pathname: '/appointment',
                            state: {
                                appointmentId: props.appointment.id,
                            },
                        }} className="book__btn">BOOK APPOINTMENT</Link>
                        </div>

                    </div>

                </div>

            </div>
        );
    }



export default DoctorCard