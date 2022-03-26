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

function BlogDetails() {

    const [isOpen, setIsOpen] = useState(false);


    const capitalizeFirstLetter = (word) => {
        if (word)
            return word.charAt(0).toUpperCase() + word.slice(1);
        return '';
    };

    return (

        
        <div>
            <div className='container mt-3'>
                <h3 className='display-5'>Blog Title</h3>
                <h3 className='text-muted mt-3'>Category: {capitalizeFirstLetter("new")}</h3>
                <h4>Blog Date</h4>
                {/* use the below div to retrieve the blog content */}
                {/* <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} /> */}
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
        </div>
    );
}
export default BlogDetails;