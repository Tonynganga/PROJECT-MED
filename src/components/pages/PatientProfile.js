import React, { useEffect, useState } from 'react';
import './PatientProfile.css';
import Footer from "../Footer";
import SideBar from './SideBar';
import PatientNavBar from '../../components/PatientNavBar';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfile, updateProfile } from '../../actions/profile';
import { errorMessage } from '../../actions/errors';
import Select from 'react-select';

const genders = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Do not disclose", value: "D" },

];

const bloodgroups = [
    { label: "A-Positive(A+)", value: "A+" },
    { label: "A-Positive(A+)", value: "A+" },
    { label: "A-Negative(A-)", value: "A-" },
    { label: "B-Positive(B+)", value: "B+" },
    { label: "B-Negative(B-)", value: "B-" },
    { label: "AB-Positive(AB+)", value: "AB+" },
    { label: "AB-Negative(AB-)", value: "AB-" },
    { label: "O-Positive(O+)", value: "O+" },
    { label: "O-Negative(O-)", value: "0-" },

];

const PatientProfile = props => {
    const [usernameState, setUsername] = useState("");
    const [firstnameState, setFirstname] = useState("");
    const [lastnameState, setLastname] = useState("");
    const [phonenumberState, setPhonenumber] = useState("");
    const [addressState, setAddress] = useState("");
    const [bloodgroupState, setBloodgroup] = useState({});
    const [emailState, setEmail] = useState("");
    const [image, setImage] = useState(null);
   
    useEffect(
        () => {
            props.getProfile()
            if (props.user) {
                const { user } = props
                setUsername(user.username)
                setEmail(user.email)
                setFirstname(user.first_name)
                setLastname(user.last_name)
                setBloodgroup(bloodgroups.filter(bloodgroup=>bloodgroup.value===user.blood_group)[0])
                setPhonenumber(user.phone_number?user.phone_number:"")
                // setDateofbirth(user.date_of_birth)
                setAddress(user.address?user.address:"")
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
        if(formValidation){
            const formData = new FormData();

            formData.append('username', usernameState);
            formData.append('email', emailState);
            formData.append('first_name', firstnameState);
            if(bloodgroupState){
                formData.append('blood_group', bloodgroupState.value);
            }            
            formData.append('phone_number', phonenumberState);
            formData.append('last_name', lastnameState);
            //   formData.append ('date_of_birth', dateofbirthState);
            formData.append('image', image)
            setImage(null);
            props.updateProfile(formData);
        }
    };
    return (
        // const { profileImg } = this.state

        <div className="profilemain__container">
            <PatientNavBar />
            <div className="patprof__dash">
                <h5>Home / Dashboard</h5>
                <h5>Dashboard</h5>
            </div>
            <div class="profile__header">
                <h2>Profile</h2>
            </div>
            <div className='profile__container'>
                <div className='profile__sidebar'>
                    <SideBar />
                </div>
                <form
                onSubmit={onSubmit} className='profile__form'>
                {/* <div className='profile__form'> */}
                    <div className="uploadimage__form">
                        <img src={'http://localhost:8000' + props.imageUrl} id="img" alt="#" width="100px" height="100px" />
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
                            <input type="text" placeholder="FirstName..."
                                name="username"
                                required
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
                                required
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

                    <div className="dropdown">
                            <div className='label'>
                                <label>Blood Group :</label>
                            </div>
                            <Select
                            onChange={e => {
                                setBloodgroup(e);
                            }}
                            value={bloodgroupState} 
                             options={bloodgroups} />
                        </div>
                       
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

                        <div className="dropdown">
                            <div className='label'>
                                <label>Gender :</label>
                            </div>
                            <Select
                            options={genders} 
                            />
                        </div>

                    </div>
                    <input  type="submit" value="Save Changes" />
                {/* </div> */}
                </form>
            </div>
            <Footer />
        </div>

    )
};


PatientProfile.propTypes = {
    imageUrl: propTypes.string.isRequired,
    user: propTypes.object.isRequired,
    getProfile: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    imageUrl: state.profile.image,
    user: state.auth.user
});

export default connect(mapStateToProps, { getProfile, updateProfile,errorMessage })(PatientProfile)
