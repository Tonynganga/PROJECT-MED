import React, { useState } from "react";
import CommentForm from './CommentForm';
import { capitalizeFirstLetter } from '../../utils'
import DisplayComment from "./DisplayComment";
import { connect } from 'react-redux';
import { clearComments } from '../../actions/blogs';
import propTypes from 'prop-types';

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const Comment = (props) => {
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const [viewReplies, setViewReplies] = useState(false)
    const datePosted = new Date(props.elem.date_posted);
    const handleViewReplies=(e)=>{
        if(viewReplies){
            props.clearComments(props.elem.id,props.elem.from_original==null)
        }
        setViewReplies(!viewReplies)
    }
    return (
        <div  className="comment">
            <div className="comment-image-container">
                <img src={'http://localhost:8000' + props.elem.commentor_profile_pic} width="40px" height="40px" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    {edit ? <CommentForm elem={props.elem} isEnclosed={true} >
                        <button className="comment-form-button btn-danger" disabled={0}
                            onClick={() => setEdit(false)}>
                            Close
                        </button>
                    </CommentForm> : <div><div className='author-date'>
                        <div className="comment-author">{capitalizeFirstLetter(props.elem.commentor_first_name)} {capitalizeFirstLetter(props.elem.commentor_last_name)}</div>
                        <div>{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</div>
                    </div>
                        <div className='body__comment'>
                            <div className="comment-text">{props.elem.comment}</div>
                        </div>
                        {props.elem.commentor_username == props.user.username ?
                            <div className="comment-actions">
                                <div
                                    className="comment-action"
                                    onClick={() => setEdit(true)}
                                >
                                    Edit
                                </div>
                                <div
                                    className="comment-action"
                                >
                                    Delete
                                </div>
                            </div>
                            : ""
                        }
                    </div>
                    }
                    <div className="comment-actions">
                        <div
                            className="comment-action"
                            onClick={() => setReply(true)}
                        >
                            Reply
                        </div>
                    </div>
                    {reply ? <CommentForm
                        isEnclosed={true}
                        commentId={props.elem.id}
                        fromOriginal={props.elem.from_original==null}
                    > <button className="comment-form-button btn-danger" disabled={0}
                        onClick={() => setReply(false)}>
                            Close
                        </button></CommentForm> : ''}
                    <div className="comment-actions">
                        <div
                            className="comment-action"
                            onClick={handleViewReplies}
                        >
                            {viewReplies ? "Hide Replies" : "View Replies"}
                        </div>
                    </div>
                    {viewReplies ? <DisplayComment fromOriginal={props.elem.from_original==null} Id={props.elem.id}/> : ""}
                </div>
            </div>
        </div>
    )
}


Comment.propTypes = {
    addComment: propTypes.func.isRequired,
  };
export default connect(null, { clearComments })(Comment);