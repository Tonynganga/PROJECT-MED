import React from 'react';
import ReactDom  from 'react-dom';
import "./PatientNavBar.css";
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
  
  function BlogCommentModal({ open, children, onClose }) {
  
    const [value, setValue] = React.useState(2);
  
    if (!open) return null
  
  
  
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <div className="modal-content-div">
            <div className="col-lg-9" >
              <form>
              <h3 className="review__heading">Comment</h3>
  
                <div className="form-group-textarea">
                  <textarea className="form-control" name="message" placeholder='Write Your Comment' rows="5" cols="40"></textarea>
                </div>
                <div className="review-buttons">
                  <button className="review-form-submit btn btn-success" type="submit">Post</button>
                  <button className="btn btn-danger" onClick={onClose}>Close</button>
                  </div>
              </form>
            </div>
           
          </div>
  
  
          
  
        </div>
      </>,
      document.getElementById('commentportal')
    )
  }
  export default BlogCommentModal;