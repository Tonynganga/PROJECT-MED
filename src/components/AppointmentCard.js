import React from 'react';
import './AppointmentCard.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";



function AppointmentCard() {
    return (
        <div className="app__card">
            <div className="appcard__wrapper">

                <div className='details__wrapper'>
                    <div className="appcard__details__wrapper">
                        <div className="card__imagename">
                            <img src="/images/loginimage.jpg" alt="#" width="40px" height="40px" />
                            <h5>Tony Huu</h5>
                        </div>
                        <h5>Jan 18 2021</h5>
                        <h5>01:45</h5>
                        <h5 className=''>500</h5>
                        <button type='button' className='btn btn-success' >Complete</button>
                        <button className='btn btn-danger' >Confirmed</button>
                        <button className='btn btn-primary' >View</button>


                    </div>


                </div>

            </div>

        </div>
    );
}

export default AppointmentCard;