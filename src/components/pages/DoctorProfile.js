import React, { Component, useEffect, useState } from 'react';
// import './PatientHomePage.css';
import './Main.css';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import './PatientProfile.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, updateProfile } from '../../actions/profile';
import Select from 'react-select';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//     faSignOutAlt,
//     faFileMedical,
//     faLock,
//     faUserCog,
//     faColumns
//   } from "@fortawesome/free-solid-svg-icons";

const gender = [
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" },
    { label: "Others/Do not disclose", value: "Others" },

];

function DoctorProfile(props) {
    const [usernameState, setUsername] = useState("");
    const [firstnameState, setFirstname] = useState("");
    const [lastnameState, setLastname] = useState("");
    const [genderState, setGender] = useState("");
    const [phonenumberState, setPhonenumber] = useState("");
    const [dateofbirthState, setDateofbirth] = useState("");
    const [addressState, setAddress] = useState("");
    const [bloodgroupState, setBloodgroup] = useState("");
    const [emailState, setEmail] = useState("");
    const [image, setImage] = useState(null);
    useEffect(() => {
        props.getProfile();
    }, []);
    useEffect(
        () => {
            if (props.user) {
                const { user } = props
                setUsername(user.username)
                setEmail(user.email)
                setFirstname(user.first_name)
                setLastname(user.last_name)
                setGender(user.gender)
                setPhonenumber(user.phone_number)
                // setDateofbirth(user.date_of_birth)
                setAddress(user.address)
                setBloodgroup(user.blood_group)
            }
        },
        [props.user]
    );
    // useEffect (() => {
    //     if(props.imageUrl){
    //       setImage('http://localhost:8000'+props.imageUrl)
    //     }

    // }, [props.imageUrl]);


    const onChangePicture = e => {
        setImage(e.target.files[0]);
    };
    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('username', usernameState);
        formData.append('email', emailState);
        formData.append('first_name', firstnameState);
        formData.append('blood_group', bloodgroupState);
        formData.append('phone_number', phonenumberState);
        formData.append('gender', genderState);
        formData.append('last_name', lastnameState);
        //   formData.append ('date_of_birth', dateofbirthState);
        formData.append('image', image)
        setImage(null);
        props.updateProfile(formData);
    };
    return (
        // const { profileImg } = this.state
        // return (
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
                        <img src={'http://localhost:8000' + props.imageUrl} id="img" alt="" width="100px" height="100px" />
                        <input type="file" accept="image/*" name="image-upload" id="input" onChange={onChangePicture} />
                        <div className="upload__btn">
                            <label className="image-upload" htmlFor="input">
                                <i className="material-icons">add_photo_alternate</i>
                                {image ? image.name : 'Choose file'}
                            </label>
                        </div>
                    </div>
                    <h5 className='jpg'>Allowed JPG and PNG, Max size 2MB</h5>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Username :</label>
                            </div>
                            <input type="text" placeholder="Username..."
                                name="username"
                                onChange={e => {
                                    setUsername(e.target.value);
                                }}
                                value={usernameState} /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Email :</label>
                            </div>
                            <input type="text" placeholder="EmailID..."
                                name="email"
                                onChange={e => {
                                    setEmail(e.target.value);
                                }}
                                value={emailState} /><br />
                        </div>
                    </div>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>FirstName :</label>
                            </div>
                            <input
                                type="text" placeholder="FirstName..."
                                name="firstname"
                                onChange={e => {
                                    setFirstname(e.target.value);
                                }}
                                value={firstnameState}
                            /><br />
                        </div>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>LastName :</label>
                            </div>
                            <input type="text" placeholder="LastName..."
                                name="lastname"
                                onChange={e => {
                                    setLastname(e.target.value);
                                }}
                                value={lastnameState} /><br />
                        </div>
                    </div>
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Mobile :</label>
                            </div>
                            <input type="text" placeholder="Mobile..."
                                name="phonenumber"
                                onChange={e => {
                                    setPhonenumber(e.target.value);
                                }}
                                value={phonenumberState} /><br />
                        </div>

                        <div className="dropdown">
                            <div className='label'>
                                <label>Gender :</label>
                            </div>
                            <Select options={gender} />
                        </div>
                       
                    </div>
                    
                    <div className='form__data'>
                        <div className='form__data__two'>
                            <div className='label'>
                                <label>Address :</label>
                            </div>
                            <input type="text" placeholder="Address..."
                                name="address"
                                onChange={e => {
                                    setAddress(e.target.value);
                                }}
                                value={addressState} /><br />
                        </div>


                    </div>

                    <input onClick={onSubmit} type="submit" value="Save Changes" />



                </div>



            </div>





            <Footer />
        </div>
    );
}

DoctorProfile.propTypes = {
    imageUrl: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    getProfile: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    imageUrl: state.profile.image,
    user: state.auth.user
});

export default connect(mapStateToProps, { getProfile, updateProfile })(DoctorProfile)
