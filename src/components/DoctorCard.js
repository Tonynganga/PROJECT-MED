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
                                <h4>Name</h4>
                            </div>
                            <div className="card__details">
                                <h4>Description</h4>
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