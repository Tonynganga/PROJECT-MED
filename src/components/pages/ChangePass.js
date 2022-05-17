import React, { useState } from 'react';
import './PatientChangePass.css';
import Footer from "../Footer";
import { errorMessage } from '../../actions/notifyPopUp';
import { ForgotPassword,ChangePassword } from '../../actions/auth';
import { connect } from 'react-redux';
import propTypes from 'prop-types';


function ChangePass(props) {
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let token = ""
    if (props.token) {
        token = props.token
    } else if (urlParams.get('t')) {
        token = urlParams.get('t')
    }
    console.log('hello' + token)

    const formValidation = () => {
        if (password.length < 8) {
            props.errorMessage("passwords should be 8 digits long or more")
            return false
        }
        if (password !== password2) {
            props.errorMessage("password & confirm password do not match")
            return false
        }
        return true
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (formValidation()) {
            if(!props.token)
            props.ForgotPassword(password, token)
            else props.ChangePassword({old_password:oldPassword,new_password:password})
        }


    }

    return (
        <div className='patientchangepass__page'>
            <div className="patienthome__container">
                <div className='ChangePass__container'>
                    <div class="profile__header2">
                        <h2>Change Password</h2>
                    </div>
                    <form onSubmit={onSubmit} className='ChangePass__form'>
                        {props.token ? <div className='Changepassform__data'>
                            <div className='pass-label'>
                                <label>Old Password</label>
                            </div>
                            <input value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)} type="password" placeholder="Old Password..." /><br />
                        </div> : ""}
                        <div className='Changepassform__data'>
                            <div className='pass-label'>
                                <label>New Password</label>
                            </div>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="New Password..." /><br />
                        </div>
                        <div className='Changepassform__data'>
                            <div className='pass-label'>
                                <label>Confirm Password</label>
                            </div>
                            <input value={password2} onChange={(e) => setPassword2(e.target.value)} type="password" placeholder="Confirm Password..." /><br />
                        </div>

                        <input type="submit" value="Save Changes" className='save__changes' />



                    </form>
                </div>

            </div>



            <Footer />
        </div>
    );
}
ChangePass.propTypes = {
    errorMessage: propTypes.func.isRequired,
    ChangePassword: propTypes.func.isRequired,
};
const mapStateToProps = state => ({
    token: state.auth.token,
});

export default connect(mapStateToProps, { errorMessage, ForgotPassword ,ChangePassword})(ChangePass);
