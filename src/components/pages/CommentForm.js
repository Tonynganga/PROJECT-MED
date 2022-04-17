import React, { useEffect, useState } from "react";
import './Appointment.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentForComment, updateComment, updateCommentForComment } from '../../actions/blogs';

const CommentForm = (props) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    if (props.elem) {
      setMessage(props.elem.comment)
    }
  }, [])


  const onSubmit = (e) => {
    e.preventDefault()
    let body = {
      comment: message,
    }
    if (props.elem && props.elem.blog != null)
      props.updateComment(props.index,props.elem.id, body)
    else if (props.elem && props.elem.blog == null)
      props.updateCommentForComment(props.index,props.elem.id, body, props.fromOriginal)
    else if (props.commentId) {
      body = {
        parent_comment: props.commentId,
        from_original: props.fromOriginal,
        ...body
      }
      props.addCommentForComment(body, props.fromOriginal)
    } else {
      body = {
        blog: props.blogId,
        ...body
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

export default connect(null, { addComment, addCommentForComment, updateComment, updateCommentForComment })(CommentForm);