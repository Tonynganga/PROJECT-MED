import React, { useState, useEffect } from 'react';

import './Appointment.css';
import { getComments, getCommentsForComments } from '../../actions/blogs';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Comment from './Comment';


const DisplayComment = (props) => {

  const [comments, setComments] = useState([]);
  useEffect(() => {
    if (props.Id) {
      if (props.forBlogs)
        props.getComments(props.Id)
      else props.getCommentsForComments(props.Id, props.fromOriginal)
    }
  }, [])
  useEffect(() => {
    if (props.comments) {
      setComments(props.comments)
    }
  }, [props.comments])

  const dispComments = () => {
    return comments.map(elem => {
      return (<Comment key={elem.id} elem={elem} user={props.user} />)
    })
  }


  return (
    <div>
      {dispComments()}
    </div>
  );
};


DisplayComment.propTypes = {
  getComments: propTypes.func.isRequired,
  getCommentsForComments: propTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => {
  let Id
  if (ownProps.forBlogs) Id = 0
  else if (ownProps.fromOriginal) Id = '0' + ownProps.Id
  else Id = ownProps.Id
  return {
    comments: state.blogs.comments[Id],
    user: state.auth.user
  }
};

export default connect(mapStateToProps, { getComments, getCommentsForComments })(DisplayComment);