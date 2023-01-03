import React, { useEffect, useState,useContext } from "react";
import './CssMain.css';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment, addCommentForComment, updateComment, updateCommentForComment } from '../../actions/blogs';
import { WebSocketService } from '../../websocket';

const CommentForm = (props) => {
  const ws = useContext(WebSocketService);
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
    if (props.elem && props.elem.blog != null){
      body['id']=props.elem.id
      ws.sendMessage('update_comment', body, 'comments')
      // props.updateComment(props.index,props.elem.id, body)
    }
    else if (props.elem && props.elem.blog == null){
      body['id']=props.elem.id
      if(props.fromOriginal)
      ws.sendMessage('update_comment_for_comment', body, '0'+props.elem.parent_comment)
      else
      ws.sendMessage('update_comment_for_comment', body, ''+props.elem.parent_comment)
      // props.updateCommentForComment(props.index,props.elem.id, body, props.fromOriginal)
      }
    else if (props.commentId) {
      body = {
        parent_comment: props.commentId,
        from_original: props.fromOriginal,
        ...body
      }
      // props.addCommentForComment(body, props.fromOriginal)
      if(props.fromOriginal)
      ws.sendMessage('add_comment_for_comment', body,  '0' + props.commentId)
      else
      ws.sendMessage('add_comment_for_comment', body,  '' + props.commentId)
    } else {
      body = {
        blog: props.blogId,
        ...body
      }
      ws.sendMessage('add_comment', body, 'comments')
      // props.addComment(body)
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