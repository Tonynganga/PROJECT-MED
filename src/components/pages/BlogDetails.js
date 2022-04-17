import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CommentForm from './CommentForm';
import './Appointment.css'
import DisplayComment from './DisplayComment';
import { connect } from 'react-redux';
import { deleteBlog } from '../../actions/blogs';
import propTypes from 'prop-types';
import {capitalizeFirstLetter} from '../../utils'


const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1,
    variant: 'contained'
}

const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

function BlogDetails(props) {
    const [blogPost,setBlogPost]= useState({})
    const { blog,index } = props.location.state
        useEffect(()=>{
            if(props.stateBlogPost)
            setBlogPost(props.stateBlogPost)
            else setBlogPost(blog)
        },[props.stateBlogPost])        
        
        const datePosted = new Date(blogPost.date_posted)
        const createBlog = () => {
            return { __html: blogPost.blog_content }
        };
        return (

            <div className='container mt-3'>
                <h3 className='display-5'>{capitalizeFirstLetter(blogPost.blog_title)}</h3>
                <h4>{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</h4>
                {/* use the below div to retrieve the blog content */}
                <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
                <div className="mainblog-comment-actions">
                {/* {canReply && ( */}
                {/* Main blog actions --edit & delete */}
                  <div
                    className="main-comment-action">
                    Edit
                  </div>
                  <div
                    className="comment-action"
                    onClick={()=>{props.deleteBlog(index,blogPost.id);props.history.goBack()}}>
                    Delete
                  </div>
              </div>
                <hr />
                <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
                
                <div className='comment_bucket'>
                <div className="comment-form-title">Write comment</div>
                    <CommentForm blogId={blogPost.id} isEnclosed={false} />
                    <DisplayComment forBlogs={true} Id={blogPost.id}/>
                </div>
                
            </div>

        );
   
}

BlogDetails.propTypes = {
    deleteBlog: propTypes.func.isRequired,
    
};
const mapStateToProps = (state, ownProps) => {
    
    return {
        stateBlogPost: state.blogs.blogs[ownProps.index],
    }
};

export default connect(mapStateToProps, { deleteBlog})(BlogDetails);