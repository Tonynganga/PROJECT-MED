import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import BlogCommentModal from '../BlogCommentModal';

const BUTTON_WRAPPER_STYLES = {
    position: 'relative',
    zIndex: 1,
    variant: 'contained'
}

const OTHER_CONTENT_STYLES = {
    position: 'relative',
    zIndex: 2,
    backgroundColor: 'red',
    padding: '10px'
}

function BlogDetails(props) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    const [isOpen, setIsOpen] = useState(false);


    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };


    

    if (props.location.state&&props.location.state.post) {
        const { post } = props.location.state        
        const datePosted = new Date(post.date_posted)
        const createBlog = () => {
            return { __html: post.blog_content }
        };
        return (
            
                <div className='container mt-3'>
                    <h3 className='display-5'>{capitalizeFirstLetter(post.blog_title)}</h3>
                    <h4>{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</h4>
                    {/* use the below div to retrieve the blog content */}
                    <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
                    <hr />
                    <p className='lead mb-5'><Link to='/blog' className='font-weight-bold'>Back to Blogs</Link></p>
                    {/* <Button component={Link} variant="contained" color="primary" cursor="pointer"
                    onClick={() => setIsOpen(true)}>
                    Comment
                </Button> */}
                    <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')}>
                        <button onClick={() => setIsOpen(true)} className='b-savecoment' cursor='pointer'>Comment</button>

                        <BlogCommentModal open={isOpen} onClose={() => setIsOpen(false)}>
                            Fancy Modal

                        </BlogCommentModal>
                    </div>
                </div>
            
        );
    } else {
        return <h2>404 Page not Found</h2>;
    }
}
export default BlogDetails;