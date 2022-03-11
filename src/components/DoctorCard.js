import { Component } from "react"
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
                                <h4>{this.props.appointment.doctor_first_name+" "+this.props.appointment.doctor_last_name}</h4>
                            </div>
                            <div className="card__details">
                                <h4>{this.props.appointment.appointment_type}</h4>
                            </div>
                           
                        </div>
                        <div className="cardbook__details__wrapper">
                        <div className="card__details">
                                <h4>Location</h4>
                            </div>
                            
                            <div className="card__details">
                                <h4>Phone</h4>
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