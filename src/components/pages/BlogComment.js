import React, { useState, useEffect } from 'react';
import './Appointment.css';
import { getComments } from '../../actions/blogs';
import propTypes from 'prop-types';
import { connect } from 'react-redux';


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const BlogComment = (props) => {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (props.blogId)
      props.getComments(props.blogId)
  }, [])
  useEffect(() => {
    if (props.comments.length > 0) {
      setComments(props.comments)
    }
  }, [props.comments])


  return (
    <div className="comment">
      <div className="comment-image-container">
        <img src="/user-icon.png" />
      </div>
      <div className="comment-right-part">
        <div className="comment-content">
          <div className='author-date'>
            <div className="comment-author">James</div>
            <div>Date Created</div>
          </div>
          <div className='body__comment'>
            <div className="comment-text">Comment Body</div>
          </div>

        </div>
      </div>
    </div>
  );
};


BlogComment.propTypes = {
  getComments: propTypes.func.isRequired,
};

const mapStateToProps = state => ({
  comments: state.blogs.comments,
});

export default connect(mapStateToProps, { getComments })(BlogComment);