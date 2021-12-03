import React from 'react';
import './PatientChangePass.css';
//import './Main.css'
import Footer from "../Footer";
import SideBar from "./SideBar";
import PatientNavBar from '../../components/PatientNavBar';



function PatientHomePage() {
    return (
        <div className='patienthome__page'>
            <div className='patientnav__bar'>
                <PatientNavBar />
                <div className='patient__dashboard'>
                    <h4>Home  /  Dashboard</h4>
                    <p>Dashboard</p>
                </div>
            </div>
            <div className="patienthome__container">
                <div className="patient__sidebar">
                    <SideBar />
                </div>
                <div className='ChangePass__container'>
                    <div class="profile__header2">
                        <h2>Change Password</h2>
                    </div>
                    <div className='ChangePass__form'>
                        <div className='Changepassform__data'>
                            <div className='label'>
                                <label>Old Password</label>
                            </div>
                            <input type="password" placeholder="Old Password..." /><br />
                        </div>
                        <div className='Changepassform__data'>
                            <div className='label'>
                                <label>New Password</label>
                            </div>
                            <input type="password" placeholder="New Password..." /><br />
                        </div>
                        <div className='Changepassform__data'>
                            <div className='label'>
                                <label>Confirm Password</label>
                            </div>
                            <input type="password" placeholder="Confirm Password..." /><br />
                        </div>
                        
                    <input type="submit" value="Save Changes" className='save__changes'/>

                    

                    </div>
                </div>

            </div>



            <Footer />
        </div>
    );
}

export default PatientHomePage;