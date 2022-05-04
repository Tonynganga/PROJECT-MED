import React, {  useEffect, useState } from 'react';
import Footer from "../Footer";
import SideBar2 from "./SideBar2";
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, updateProfile } from '../../actions/profile';
import { errorMessage } from '../../actions/notifyPopUp';
import Select from 'react-select';
import PatientNavBar from '../PatientNavBar';
import './PatientProfile.css'
import {HTTP_API_PATH} from '../../utils'


const genders = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Do not disclose", value: "D" },

];

function DoctorProfile(props) {
    const [usernameState, setUsername] = useState("");
    const [firstnameState, setFirstname] = useState("");
    const [lastnameState, setLastname] = useState("");
    const [genderState, setGender] = useState({});
    const [phonenumberState, setPhonenumber] = useState("");
    const [addressState, setAddress] = useState("");
    const [emailState, setEmail] = useState("");
    const [image, setImage] = useState(null);
    
    useEffect(
        () => {
            props.getProfile()
            if (props.user) {
                const { username,email,first_name,last_name,phone_number,address } = props.user
                setUsername(username)
                setEmail(email)
                setFirstname(first_name)
                setLastname(last_name)
                setGender(genders.filter(gender=>gender.value===props.user.gender)[0])
                setPhonenumber(phone_number?phone_number:"")
                // setDateofbirth(user.date_of_birth)
                setAddress(address?address:"")
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

    const formValidation=()=>{
        const containUsernameInvalidChar=/^[\w.@+-]+$/

        if(!containUsernameInvalidChar.test(usernameState)){
            props.errorMessage("invalid characters used in username")
            return false
        }
        return true
    }
    const onSubmit = e => {
        e.preventDefault();
        if(formValidation()){
            const formData = new FormData();

            formData.append('username', usernameState);
            formData.append('email', emailState);
            formData.append('first_name', firstnameState);
            formData.append('phone_number', phonenumberState);
            formData.append('address', addressState);
            formData.append('last_name', lastnameState);
            formData.append ('gender', genderState.value);
            formData.append('image', image)
            setImage(null);
            props.updateProfile(formData);
        }
    };
    return (
        // const { profileImg } = this.state
        // return (
            <div>
                <div className='patientnav__bar'>
                <PatientNavBar />
            </div>
            <div className="profilemain__container">
            <div class="profile__header">
                <h2>Profile</h2>
            </div>
            <div className='profile__container'>
                <div className='profile__sidebar'>
                    <SideBar2 />
                </div>
                <form
                onSubmit={onSubmit} className='profile__form'>

                    <div className="uploadimage__form">
                        <img src={HTTP_API_PATH + props.imageUrl} id="img" alt="" width="100px" height="100px" />
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
                                required
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
                                required
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
                            <Select 
                            onChange={e => {
                                setGender(e);
                            }}
                            value={genderState} 
                            options={genders} 
                            />
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

                    <input  type="submit" value="Save Changes" />

            </form>

            </div>





            <Footer />
        </div>
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

export default connect(mapStateToProps, { getProfile, updateProfile,errorMessage })(DoctorProfile)
