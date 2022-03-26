import React,{useState,useEffect} from "react";
import "./PatientNavBar.css";
import ReactDom from 'react-dom';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import propTypes from 'prop-types';
import { connect } from "react-redux";
import { addReview ,getUserReview,updateUserReview} from "../actions/reviews";

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

function ReviewModal(props) {

  const [value, setValue] = useState(2);
  const [message,setMessage]=useState("")
  useEffect(()=>{
    props.getUserReview()
  },[])
  useEffect(()=>{
    const{star,message}=props.review
    if(star){
      setValue(star)
      setMessage(message)
    }
  },[props.review])


  if (!props.open) return null

  
  

  
  

  const onSubmit=(e)=>{
    e.preventDefault()
    const body={
      star:value,
      message
    }
    if(props.review.id)
      props.updateUserReview(body)
    else
    props.addReview(body)
  }


  return ReactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <div className="modal-content-div">
          <div className="col-lg-9" >
            <form onSubmit={onSubmit}>
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
                <textarea 
                className="form-control" 
                name="message"
                rows="5" 
                cols="40"
                value={message}
                  onChange={(e) => 
                    setMessage(e.target.value)
                  }/>
              </div>
              <div className="review-buttons">
                <button className="review-form-submit btn btn-success" type="submit">Submit</button>
                <button className="btn btn-danger" onClick={props.onClose}>Close</button>
                </div>
            </form>
          </div>
         
        </div>


        

      </div>
    </>,
    document.getElementById('portal')
  )
}
ReviewModal.propTypes={
  addReview:propTypes.func.isRequired,
  review:propTypes.object.isRequired
}
const mapStateToProps=state=>({
  review:state.reviews.review
})
export default connect(mapStateToProps,{addReview,getUserReview,updateUserReview})(ReviewModal);
