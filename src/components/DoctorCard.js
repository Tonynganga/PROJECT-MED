import { Component } from "react"
import React from "react";
import './DoctorCard.css';

export class DoctorCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card__wrapper">
                    <div className="card__image">
                        <img src={'http://localhost:8000' + this.props.appointment.doctor_profile_pic} id="img" alt="#" width="80px" height="80px" />
                    </div>
                    <div className='details__wrapper'>
                        <div className="card__details__wrapper">
                            <div className="card__details">
                                <h5>{this.props.appointment.doctor_first_name+" "+this.props.appointment.doctor_last_name}</h5>
                            </div>
                            <div className="card__details">
                                <h5>{this.props.appointment.appointment_type}</h5>
                            </div>
                           
                        </div>
                        <div className="cardbook__details__wrapper">
                        <div className="card__details">
                                <h5>Location</h5>
                            </div>
                            
                            <div className="card__details">
                                <h5>Phone</h5>
                            </div>
                            <a href="/appointment" className='book__btn' >BOOK APPOINTMENT</a>
                        </div>

                    </div>

                </div>

            </div>
        );
    }

}
export default DoctorCard;