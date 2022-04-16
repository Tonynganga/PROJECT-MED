import { ADD_BLOG, ADD_BLOG_FAILED, ADD_COMMENTS, ADD_COMMENTS_FAILED, ADD_COMMENTS_FOR_COMMENTS, ADD_COMMENTS_FOR_COMMENTS_FAILED, CLEAR_COMMENTS, GET_BLOGS, GET_BLOGS_FAILED, GET_COMMENTS, GET_COMMENTS_FAILED, GET_COMMENTS_FOR_COMMENTS, GET_COMMENTS_FOR_COMMENTS_FAILED, UPDATE_COMMENTS, UPDATE_COMMENTS_FAILED, UPDATE_COMMENT_FOR_COMMENT, UPDATE_COMMENT_FOR_COMMENT_FAILED } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';
import { getErrors } from './auth';
import { notify } from 'reapop'

export const getBlogs = () => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .get('http://localhost:8000/api/blogs/get_blogs', config)
    .then(res => {
      dispatch({ type: GET_BLOGS, payload: res.data });
    })
    .catch(err => {
      dispatch(notify("Failed to get blogs", "error"))
      dispatch({ type: GET_BLOGS_FAILED });
    });
};

export const addBlog = body => (dispatch, getState) => {

  axios
    .post('http://localhost:8000/api/blogs/post_blog', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_BLOG });
      dispatch(notify("Added blog successfuly", "success"))
      sessionStorage.setItem('title', "")
      sessionStorage.setItem('excrept', "")
      sessionStorage.setItem('content', "")
    })
    .catch(err => {
      dispatch({ type: ADD_BLOG_FAILED });
      dispatch(notify("Failed to add blog", "error"))
    });
};

export const getComments = (blogId) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  axios
    .get(`http://localhost:8000/api/blogs/get_comments/${blogId}`, config)
    .then(res => {
      dispatch({ type: GET_COMMENTS, payload: { 0: res.data } });
    })
    .catch(err => {
      dispatch(notify("Failed to get comments", "error"))
      dispatch({ type: GET_COMMENTS_FAILED, payload: { 0: [] } });
    });
};

export const getCommentsForComments = (commentId, fromOriginal) => dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  if (fromOriginal === true) {
    axios
      .get(`http://localhost:8000/api/blogs/get_comments_for_original_comment/${commentId}`, config)
      .then(res => {
        dispatch({ type: GET_COMMENTS_FOR_COMMENTS, payload: { ['0' + commentId]: res.data } });
      })
      .catch(err => {
        dispatch(notify("Failed to get comments", "error"))
        dispatch({ type: GET_COMMENTS_FOR_COMMENTS_FAILED, payload: { ['0' + commentId]: [] } });
      });

  } else {

    axios
      .get(`http://localhost:8000/api/blogs/get_comments_for_comment/${commentId}`, config)
      .then(res => {
        dispatch({ type: GET_COMMENTS_FOR_COMMENTS, payload: { [commentId]: res.data } });
      })
      .catch(err => {
        dispatch(notify("Failed to get comments", "error"))
        dispatch({ type: GET_COMMENTS_FOR_COMMENTS_FAILED, payload: { [commentId]: [] } });
      });
  }
};

export const addComment = body => (dispatch, getState) => {

  axios
    .post('http://localhost:8000/api/blogs/add_comment', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_COMMENTS });
      dispatch(notify("Added Comment successfuly", "success"))
      axios
        .get(`http://localhost:8000/api/blogs/get_comments/${body.blog}`, tokenConfig(getState))
        .then(res => {
          dispatch({ type: GET_COMMENTS, payload: { 0: res.data } });
        })
        .catch(err => {
          dispatch(notify("Failed to get comments", "error"))
          dispatch({ type: GET_COMMENTS_FAILED, payload: { 0: [] } });
        });

    })
    .catch(err => {
      dispatch({ type: ADD_COMMENTS_FAILED });
      dispatch(notify("Failed to add comment", "error"))
    });
};

export const addCommentForComment = (body, fromOriginal) => (dispatch, getState) => {

  axios
    .post('http://localhost:8000/api/blogs/add_comment_for_comment', body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: ADD_COMMENTS_FOR_COMMENTS });
      dispatch(notify("Added Comment successfuly", "success"))

      if (fromOriginal === true) {
        axios
          .get(`http://localhost:8000/api/blogs/get_comments_for_original_comment/${body.parent_comment}`, tokenConfig(getState))
          .then(res => {
            dispatch({ type: GET_COMMENTS_FOR_COMMENTS, payload: { ['0' + body.parent_comment]: res.data } });
          })
          .catch(() => {
            dispatch(notify("Failed to get comments", "error"))
            dispatch({ type: GET_COMMENTS_FOR_COMMENTS_FAILED, payload: { ['0' + body.parent_comment]: [] } });
          });

      } else {

        axios
          .get(`http://localhost:8000/api/blogs/get_comments_for_comment/${body.parent_comment}`, tokenConfig(getState))
          .then(res => {
            dispatch({ type: GET_COMMENTS_FOR_COMMENTS, payload: { [body.parent_comment]: res.data } });
          })
          .catch(err => {
            dispatch(notify("Failed to get comments", "error"))
            dispatch({ type: GET_COMMENTS_FOR_COMMENTS_FAILED, payload: { [body.parent_comment]: [] } });
          });
      }

    })
    .catch(() => {
      dispatch({ type: ADD_COMMENTS_FOR_COMMENTS_FAILED });
      dispatch(notify("Failed to add comment", "error"))
    });
};

export const clearComments = (Id, fromOriginal) => dispatch => {
  if (fromOriginal === true)
    dispatch({ type: CLEAR_COMMENTS, payload: '0' + Id });
  else dispatch({ type: CLEAR_COMMENTS, payload: Id });

}

export const updateComment = (body) => (dispatch, getState) => {
  axios
    .put(`http://localhost:8000/api/blogs/update_comment/${body.id}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_COMMENTS, payload: res.data });
      dispatch(notify("Update Comment successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: UPDATE_COMMENTS_FAILED });
      dispatch(notify("Failed to Update comment", "error"))
    });

}

export const updateCommentForComment = (body, fromOriginal) => (dispatch, getState) => {

  axios
    .put('http://localhost:8000/api/blogs/update_comment_for_comment', body, tokenConfig(getState))
    .then(res => {
      let key
      if (fromOriginal) 
        key='0'+res.data.parent_comment
      else key=res.data.parent_comment
      dispatch({ type: UPDATE_COMMENT_FOR_COMMENT, payload: {key,data:res.data} });
      dispatch(notify("Update Comment successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: UPDATE_COMMENT_FOR_COMMENT_FAILED });
      dispatch(notify("Failed to Update comment", "error"))
    });

}