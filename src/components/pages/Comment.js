import React, { useEffect, useState } from "react";
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
    const [comment,setComment]=useState({})
    
    useEffect(()=>{
        if(props.comment)
        setComment(props.comment)
        else setComment(props.elem)
    },[props.comment])
    const handleViewReplies = (e) => {
        if (viewReplies) {
            props.clearComments(comment.id, comment.from_original == null)
        }
        setViewReplies(!viewReplies)
    }
    const datePosted = new Date(props.elem.date_posted);
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src={'http://localhost:8000' + comment.commentor_profile_pic} width="40px" height="40px" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    {edit ? <CommentForm index={props.index} elem={comment} isEnclosed={true} fromOriginal={comment.from_original == null} >
                        <button className="comment-form-button btn-danger" disabled={0}
                            onClick={() => setEdit(false)}>
                            Close
                        </button>
                    </CommentForm> : <div><div className='author-date'>
                        <div className="comment-author">{capitalizeFirstLetter(comment.commentor_first_name)} {capitalizeFirstLetter(comment.commentor_last_name)}</div>
                        <div>{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</div>
                    </div>
                        <div className='body__comment'>
                            <div className="comment-text">{comment.comment}</div>
                        </div>
                        {comment.commentor_username == props.user.username ?
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
                        commentId={comment.id}
                        fromOriginal={comment.from_original == null}
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
                    {viewReplies ? <DisplayComment fromOriginal={comment.from_original == null} Id={comment.id} /> : ""}
                </div>
            </div>
        </div>
    )
}


Comment.propTypes = {
    clearComments: propTypes.func.isRequired,
};
const mapStateToProps = (state, ownProps) => {
    let Id
    if (ownProps.elem.from_original == null) Id = 0
    else if (ownProps.elem.from_original != null&&ownProps.elem.from_original === true) Id = '0' + ownProps.elem.parent_comment
    else Id = ownProps.elem.parent_comment
    return {
        comment: state.blogs.comments[Id][ownProps.index],
    }
};

export default connect(mapStateToProps, { clearComments })(Comment);