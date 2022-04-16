import React, { useEffect, useState } from "react";
import './Appointment.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentForComment } from '../../actions/blogs';

const CommentForm = (props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (props.elem) {
      setMessage(props.elem.comment)
    }
  }, [])


  const onSubmit = (e) => {
    e.preventDefault()    
    if (props.elem) {

    } else if (props.commentId) {
      const body = {
        parent_comment: props.commentId,
        comment: message,
        from_original:props.fromOriginal
      }
      props.addCommentForComment(body,props.fromOriginal)
    } else {
      const body = {
        blog: props.blogId,
        comment: message
      }
      props.addComment(body)
    }
  }

  return (
    <form className='comment-form' onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <div className='appt__btns'>
        <button className="comment-form-button" disabled={0}>
          Submit
        </button>
        {props.isEnclosed ? props.children : ""}
      </div>
    </form>
  );
};
CommentForm.propTypes = {
  addComment: propTypes.func.isRequired,
};

export default connect(null, { addComment, addCommentForComment })(CommentForm);