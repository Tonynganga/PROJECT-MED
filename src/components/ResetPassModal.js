import React, { useState, useEffect, useRef } from "react";
import "./PatientNavBar.css";
import '././pages/PatientHomePage.css';
import ReactDom from "react-dom";
import { HTTP_API_PATH } from '../utils'
import { PasswordRecovery } from '../actions/auth';
import { errorMessage } from '../actions/notifyPopUp';
import propTypes from 'prop-types';
import { connect } from 'react-redux';




const MODAL_STYLES1 = {
    position: 'fixed',
    top: '50%',
    left: '70%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#1aa7ec",
    padding: '40px',
    border: '10px',
    zIndex: 1000
}

const OVERLAY_STYLES1 = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    balckgroundColor: '#000',
    border: '100px',
    zIndex: 1000,
}

function ResetPassModal(props) {
    const mailFormat =/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    // const [open,setOpen]=useState(false)
    // useEffect(()=>{
    //     setOpen(props.open)
    // },[props.open])
    
    const [email, setEmail] = useState("")
    const form = useRef()

    const formValidation=()=>{
        if(!mailFormat.test(email)){
            props.errorMessage("Email format incorrect")
            return false
          }
        return true
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(formValidation()){
            props.PasswordRecovery({email},form)
        }
        
        console.log(form)
    }

        if (!props.open) return null
        return ReactDom.createPortal(
            <>
                <div style={OVERLAY_STYLES1} className="overlaystyles">
                    <div style={MODAL_STYLES1} className="overlaystyles">
                        <div className="r-modal-content-div>">
                            <div className="col-lg-9">
                                <form ref={form} onSubmit={onSubmit} className="reset-form">
                                    <h3 className="review__heading">Reset Password</h3>
                                    <div>


                                        <div className='form__data__two'>

                                            <input type="text" placeholder="Enter Your Email.........."
                                                name="reply_email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            // required
                                            /><br />
                                        </div>
                                        <input type="hidden" id="token" name="token" value=""/>
                                        <div className="review-buttons">
                                            <button className="review-form-submit btn btn-success" type="submit">Submit</button>
                                            <button onClick={()=>props.onClose()} className="btn btn-danger" type="button" >Close</button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>,
            document.getElementById('portal')
        )

    }

    ResetPassModal.propTypes = {        
        PasswordRecovery: propTypes.func.isRequired,
        errorMessage: propTypes.func.isRequired,
    };
   
    
    export default connect(null, { PasswordRecovery,errorMessage })(ResetPassModal)
    