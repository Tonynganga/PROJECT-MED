import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import './CssMain.css'
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

const BlogDetails=(props)=> {
    const { blog,index } = props.location.state
    const [blogPost,setBlogPost]= useState(blog)    
        useEffect(()=>{          
            if(props.stateBlogPost)
            setBlogPost(props.stateBlogPost)
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
                        <Link to={{
                            pathname: '/newpost',
                            state: {
                                blog: blogPost,
                                index
                            },
                        }} className="stretched-link">Edit</Link>
                    
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
    stateBlogPost:propTypes.object.isRequired
    
};
const mapStateToProps = (state, ownProps) => {    
    return {
        stateBlogPost: state.blogs.blogs[ownProps.location.state.index],
    }
};

export default connect(mapStateToProps, { deleteBlog})(BlogDetails);