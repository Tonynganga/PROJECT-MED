import React, { useEffect, useState,useContext } from "react";
import CommentForm from './CommentForm';
import { capitalizeFirstLetter } from '../../utils'
import DisplayComment from "./DisplayComment";
import { connect } from 'react-redux';
import { clearComments, deleteComment, deleteCommentForComment } from '../../actions/blogs';
import propTypes from 'prop-types';
import './CssMain.css';
import { WebSocketService } from '../../websocket';
import {monthNames,HTTP_API_PATH} from '../../utils'



const Comment = (props) => {
    const ws = useContext(WebSocketService);
    const [reply, setReply] = useState(false)
    const [edit, setEdit] = useState(false)
    const [viewReplies, setViewReplies] = useState(false)
    const [comment, setComment] = useState({})

    useEffect(() => {
        setComment(props.elem)
    }, [props.elem])
    const handleViewReplies = () => {
        if (viewReplies) {
            console.log(comment.from_original)
            props.clearComments(comment.id, comment.from_original==null)
            // comments from blog have no attribute from_original
            if( comment.from_original==null)
            ws.sendMessage('remove_from_group', {}, '0'+comment.id)
            else
            ws.sendMessage('remove_from_group', {}, ''+comment.id)
        }
        setViewReplies(!viewReplies)
    }
    const handelDelete = () => {
        if (comment.blog != null)
            // props.deleteComment(props.index, comment.id)
            ws.sendMessage('delete_comment', {id:comment.id}, 'comments')
        else {
            if( comment.from_original)
            ws.sendMessage('delete_comment_for_comment', {id:comment.id}, '0'+comment.parent_comment)
            else
            ws.sendMessage('delete_comment_for_comment', {id:comment.id}, ''+comment.parent_comment)
            // props.deleteCommentForComment(props.index, comment.parent_comment, comment.from_original, comment.id)
        }
    }
    const datePosted = new Date(props.elem.date_posted);
    return (
        <div className="comment">
            <div className="comment-image-container">
                <img src={HTTP_API_PATH + comment.commentor_profile_pic} width="40px" height="40px" />
            </div>
            <div className="comment-right-part">
                <div className="comment-content">
                    {edit ? <CommentForm  elem={comment} isEnclosed={true} fromOriginal={comment.from_original} >
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
                                    onClick={handelDelete}
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
    deleteComment: propTypes.func.isRequired,
    deleteCommentForComment: propTypes.func.isRequired,
};


const mapStateToProps = (state, ownProps) => {
    return {
        comment: state.blogs.comments[''+ownProps.Id][ownProps.index],
    }
};

export default connect(null, { clearComments, deleteComment, deleteCommentForComment })(Comment);