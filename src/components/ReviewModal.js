import React from "react";
import "./PatientNavBar.css";
import ReactDom from 'react-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';


const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#FFF',
  padding: '50px',
  border: '10px',
  zIndex: 1000
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, .7)',
  border: '10px',
  zIndex: 1000,
}

function ReviewModal({ open, children, onClose }) {

  const [value, setValue] = React.useState(2);

  if (!open) return null



  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="modal-content-div">
          <div className="col-lg-9" >
            <form>
            <h3 className="review__heading">REVIEW</h3>
              
              <div>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </div>

              <div className="form-group-textarea">
                <textarea className="form-control" name="message" rows="5" cols="40"></textarea>
              </div>
              <div className="review-buttons">
                <button className="review-form-submit btn btn-success" type="submit">Submit</button>
                <button className="btn btn-danger" onClick={onClose}>Close</button>
                </div>
            </form>
          </div>
         
        </div>


        

      </div>
    </>,
    document.getElementById('portal')
  )
}
export default ReviewModal;
