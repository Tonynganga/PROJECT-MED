import React from 'react';
import ReactDom  from 'react-dom';
import "./PatientNavBar.css";
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { addComment } from '../actions/blogs';



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
  
  function BlogCommentModal(props) {
  
    const [message, setMessage] = React.useState("");
  
    if (!props.open) return null

    const onSubmit=(e)=>{
      e.preventDefault()
      const body={
        blog:props.blogId,
        comment:message
      }
      props.addComment(body)
    }
    
    return ReactDom.createPortal(
      <>
        <div style={OVERLAY_STYLES} />
        <div style={MODAL_STYLES}>
          <div className="modal-content-div">
            <div className="col-lg-9" >
              <form onSubmit={onSubmit}>
              <h3 className="review__heading">Comment</h3>
  
                <div className="form-group-textarea">
                  <textarea 
                  className="form-control" 
                  name="message" 
                  placeholder='Write Your Comment' 
                  rows="5" 
                  cols="40"
                  onChange={(e)=>setMessage(e.target.value)}></textarea>
                </div>
                <div className="review-buttons">
                  <button className="review-form-submit btn btn-success" type="submit">Post</button>
                  <button className="btn btn-danger" onClick={props.onClose}>Close</button>
                  </div>
              </form>
            </div>
           
          </div>
  
  
          
  
        </div>
      </>,
      document.getElementById('commentportal')
    )
  }
  export default connect(null,{addComment})(BlogCommentModal);