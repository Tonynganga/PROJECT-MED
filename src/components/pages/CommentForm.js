import React,{ useState } from "react";
import './Appointment.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment,getComments } from '../../actions/blogs';

const CommentForm = (props) => {
  const [message, setMessage] = useState("");
  

  const onSubmit=(e)=>{
    e.preventDefault()
    const body={
      blog:props.blogId,
      comment:message
    }
    props.addComment(body)
  }
  
  return (
    <form className='comment-form'onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button className="comment-form-button" disabled={0}>
        Submit
      </button>
      
    </form>
  );
};
CommentForm.propTypes = {
  addComment: propTypes.func.isRequired,
};

export default connect(null,{addComment,getComments})(CommentForm);