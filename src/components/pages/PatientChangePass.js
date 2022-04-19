import React from 'react';
import './PatientChangePass.css';
import Footer from "../Footer";


function PatientChangePass() {
    return (
        <div className='patientchangepass__page'>
            <div className="patienthome__container">
                <div className='ChangePass__container'>
                    <div class="profile__header2">
                        <h2>Change Password</h2>
                    </div>
                    <div className='ChangePass__form'>
                        <div className='Changepassform__data'>
                            <div className='pass-label'>
                                <label>Old Password</label>
                            </div>
                            <input type="password" placeholder="Old Password..." /><br />
                        </div>
                        <div className='Changepassform__data'>
                            <div className='pass-label'>
                                <label>New Password</label>
                            </div>
                            <input type="password" placeholder="New Password..." /><br />
                        </div>
                        <div className='Changepassform__data'>
                            <div className='pass-label'>
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

export default PatientChangePass;