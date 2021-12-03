import React, { Component } from 'react';
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



export class DoctorProfile extends Component {
    state = {
        profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
    }
    imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.setState({ profileImg: reader.result })
            }
        }
        reader.readAsDataURL(e.target.files[0])
    };
    render() {
        const { profileImg } = this.state
        return (
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
                        <div className="uploadimage__form">
                            <img src={profileImg} id="img" alt="#" width="80px" height="80px" />
                            <input type="file" accept="image/*" name="image-upload" id="input" onChange={this.imageHandler} />
                            <div className="upload__btn">
                                <label className="image-upload" htmlFor="input">
                                    <i className="material-icons">add_photo_alternate</i>
                                    Choose your Photo
                                </label>
                            </div>
                        </div>
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

}

export default DoctorProfile;