import React from 'react';
// import './PatientHomePage.css';
import './Main.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import './PatientProfile.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";
  


function DoctorProfile() {
    return(
        <div className="profilemain__container">
            
            <div className="profile__home">
                <h4>Home / Dashboard</h4>
                <p>Dashboard</p>
            </div>
            <div class="profile__header">
                <h2>Profile</h2>
            </div>
            <div className='profile__container'>
                <div className='profile__sidebar'>
                    <SideBar2 />
                </div>
                
                <div className='profile__form'>
                <button className='upload__btn'>Upload Photo</button>
                <h5 className='jpg'>Allowed JPG and PNG, Max size 2MB</h5>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Username :</label>
                            </div>
                            <input type="text" placeholder="Username..." /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Email :</label>
                            </div>
                            <input type="text" placeholder="Email..." /><br />
                        </div>
                    </div>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>First Name :</label>
                            </div>
                            <input type="text" placeholder="First Name..." /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Last Name :</label>
                            </div>
                            <input type="text" placeholder="Last Name..." /><br />
                        </div>
                    </div>
                    <div className='form__data'>
                    <div className='form__data__two'>
                            <div className='label'>
                                <label>Phone Number :</label>
                            </div>
                            <input type="text" placeholder="Phone Number..." /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Gender :</label>
                            </div>
                            <input type="text" placeholder="Gender..." /><br />
                        </div>
                        
                    </div>
                    <div className='form__data'>
                    <div className='form__data__two'>
                            <div className='label'>
                                <label>Date of Birth :</label>
                            </div>
                            <input type="text" placeholder="DOB..." /><br />
                        </div>
                       

                    </div>
                    <div className='form__data'>
                    <div className='form__data__two'>
                            <div className='label'>
                                <label>Address :</label>
                            </div>
                            <input type="text" placeholder="Address..." /><br />
                        </div>
                       

                    </div>
                    
                    <input type="submit" value="Save Changes" />



                </div>



            </div>





            <Footer />
        </div>
    );
}

export default DoctorProfile;