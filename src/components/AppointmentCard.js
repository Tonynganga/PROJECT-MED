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
                            <h3>Tony Huu</h3>
                        </div>
                        <h3>Jan 18 2021</h3>
                        <h3>01:45</h3>
                        <h3 className=''>500</h3>
                        <button className='paid__amount' >Complete</button>
                        <button className='' >Confirmed</button>
                        <button className='' >View</button>

                       
                    </div>
                  

                </div>

            </div>

        </div>
    );
}

export default AppointmentCard;