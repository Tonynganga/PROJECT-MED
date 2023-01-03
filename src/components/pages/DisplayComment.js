import React, { useState, useEffect,useContext } from 'react';
import './CssMain.css';
import { getComments, getCommentsForComments } from '../../actions/blogs';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Comment from './Comment';
import { WebSocketService } from '../../websocket';

const DisplayComment = (props) => {
  const ws = useContext(WebSocketService);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    ws.connectWsComments()
    if (props.Id) {
      if (props.forBlogs)
        ws.sendMessage('get_comments', {'blog_id': props.Id}, 'comments')
      // props.getComments(props.Id)
      else {
        if (props.fromOriginal)
          ws.sendMessage('get_comments_for_comments', {
            'comment_id': props.Id,
            'from_original': true,
          }, '0' + props.Id)
        else
          ws.sendMessage('get_comments_for_comments', {
            'comment_id': props.Id,
            'from_original': false
          }, ''+props.Id)
      }
    }
  }, [])
  useEffect(() => {
    if (props.comments) {
      setComments(props.comments)
    }
  }, [props.comments])

  const dispComments = () => {
    
    return comments.map((elem, index) => {
      let Id
  if (elem.blog!=null) Id = 0
  else if (elem.from_original) Id = '0' + elem.parent_comment
  else Id = elem.parent_comment;
      return (<Comment key={elem.id} Id={Id}  index={index} elem={elem} user={props.user} />)
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