import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import CommentForm from './CommentForm';
import './Appointment.css'
import DisplayComment from './DisplayComment';

const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1,
    variant: 'contained'
}



function BlogDetails(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];



    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };




    if (props.location.state && props.location.state.blog) {
        const { blog } = props.location.state
        const datePosted = new Date(blog.date_posted)
        const createBlog = () => {
            return { __html: blog.blog_content }
        };
        return (

            <div className='container mt-3'>
                <h3 className='display-5'>{capitalizeFirstLetter(blog.blog_title)}</h3>
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
                    className="comment-action">
                    Delete
                  </div>
              </div>
                <hr />
                <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
                
                <div className='comment_bucket'>
                <div className="comment-form-title">Write comment</div>
                    <CommentForm blogId={blog.id} isEnclosed={false} />
                    <DisplayComment forBlogs={true} Id={blog.id}/>
                </div>
                
            </div>

        );
    } else {
        return <h2>404 Page not Found</h2>;
    }
}
export default BlogDetails;