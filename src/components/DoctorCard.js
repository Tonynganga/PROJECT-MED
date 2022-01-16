import { Component } from "react"
import './DoctorCard.css';

export class DoctorCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card__wrapper">
                    <div className="card__image">
                        <img src="/images/loginimage.jpg" alt="#" width="80px" height="80px" />
                    </div>
                    <div className='details__wrapper'>
                        <div className="card__details__wrapper">
                            <div className="card__details">
                                <h3>Name of the person</h3>
                            </div>
                            <div className="card__details">
                                <h3>Description</h3>
                            </div>
                            <div className="card__details">
                                <h3>Location</h3>
                            </div>
                            <div className="card__details">
                                <h3>Gender</h3>
                            </div>
                            <div className="card__details">
                                <h3>Phone</h3>
                            </div>
                        </div>
                        <div className="cardbook__details__wrapper">
                            <div className="card__details">
                                <h3>Age</h3>
                            </div>
                            <div className="card__details">
                                <h3>Day Opened</h3>
                            </div>
                            <div className="card__details">
                                <h3>Time Opened</h3>
                            </div>
                            <div className="card__details">
                                <h3>Date of Birth</h3>
                            </div>
                            <button className='book__btn' >BOOK APPOINTMENT</button>
                        </div>

                    </div>

                </div>

            </div>
        );
    }

}
export default DoctorCard;