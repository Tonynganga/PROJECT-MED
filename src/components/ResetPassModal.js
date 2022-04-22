import React, { useState, useEffect } from "react";
import "./PatientNavBar.css";
import '././pages/PatientHomePage.css';
import ReactDom from "react-dom";



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

function ResetPassModal({ open, children, onClose }) {
    if (!open) return null
    return ReactDom.createPortal(
        <>
            <div style={OVERLAY_STYLES1} className="overlaystyles">
                <div style={MODAL_STYLES1} className="overlaystyles">
                    <div className="r-modal-content-div>">
                        <div className="col-lg-9">
                            <form className="reset-form">
                                <h3 className="review__heading">Reset Password</h3>
                                <div>


                                    <div className='form__data__two'>

                                        <input type="text" placeholder="Enter Your Email.........."
                                            name="email"
                                            // required
                                        /><br />
                                    </div>
                                    <div className="review-buttons">
                                        <button className="review-form-submit btn btn-success" type="submit">Submit</button>
                                        <button className="btn btn-danger" >Close</button>
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
export default ResetPassModal;