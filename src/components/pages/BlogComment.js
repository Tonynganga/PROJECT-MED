import React, { useState, useEffect } from 'react';
import './Appointment.css';
import { getComments } from '../../actions/blogs';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import {capitalizeFirstLetter} from '../../utils'

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

  const dispComments=()=>{
   return comments.map(elem=>{const datePosted = new Date(elem.date_posted);return(<div className="comment">
      <div className="comment-image-container">
        <img src={'http://localhost:8000' + elem.commentor_profile_pic} width="40px" height="40px" />
      </div>
      <div className="comment-right-part">
       <div className="comment-content">
          <div className='author-date'>
            <div className="comment-author">{capitalizeFirstLetter(elem.commentor_first_name)} {capitalizeFirstLetter(elem.commentor_last_name)}</div>
            <div>{monthNames[datePosted.getMonth()]} {datePosted.getDate()}</div>
          </div>
          <div className='body__comment'>
            <div className="comment-text">{elem.comment}</div>
          </div>

        </div>
      </div>
    </div>)})
  }


  return (
  <div>
    {dispComments()}
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