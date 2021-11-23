
import React from 'react';
import './PatientProfile.css';
// import './todo.css';
import Footer from "../Footer";
import SideBar from './SideBar';
import PatientNavBar from '../../components/PatientNavBar';



function PatientProfile() {
    return (
        <div className="profilemain__container">
            <PatientNavBar/>
            <div className="profile__home">
                <h4>Home / Dashboard</h4>
                <p>Dashboard</p>
            </div>
            <div class="profile__header">
                <h2>Profile</h2>
            </div>
            <div className='profile__container'>
                <div className='profile__sidebar'>
                    <SideBar />
                </div>
                
                <div className='profile__form'>
                <button className='upload__btn'>Upload Photo</button>
                <h5 className='jpg'>Allowed JPG and PNG, Max size 2MB</h5>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>FirstName :</label>
                            </div>
                            <input type="text" placeholder="FirstName..." /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>LastName :</label>
                            </div>
                            <input type="text" placeholder="LastName..." /><br />
                        </div>
                    </div>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Date of Birth :</label>
                            </div>
                            <input type="text" placeholder="DateofBirth..." /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Blood Group :</label>
                            </div>
                            <input type="text" placeholder="BloodGroup..." /><br />
                        </div>
                    </div>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Email ID :</label>
                            </div>
                            <input type="text" placeholder="EmailID..." /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Mobile :</label>
                            </div>
                            <input type="text" placeholder="Mobile..." /><br />
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

export default PatientProfile;
