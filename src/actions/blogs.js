import { ADD_BLOG, ADD_BLOG_FAILED, ADD_COMMENTS, ADD_COMMENTS_FAILED, ADD_COMMENTS_FOR_COMMENTS, ADD_COMMENTS_FOR_COMMENTS_FAILED, CLEAR_COMMENTS, DELETE_BLOG, DELETE_BLOG_FAILED, DELETE_COMMENTS, DELETE_COMMENTS_FAILED, DELETE_COMMENT_FOR_COMMENT, DELETE_COMMENT_FOR_COMMENT_FAILED, GET_BLOGS, GET_BLOGS_FAILED, GET_COMMENTS, GET_COMMENTS_FAILED, GET_COMMENTS_FOR_COMMENTS, GET_COMMENTS_FOR_COMMENTS_FAILED, UPDATE_BLOG, UPDATE_BLOG_FAILED, UPDATE_COMMENTS, UPDATE_COMMENTS_FAILED, UPDATE_COMMENT_FOR_COMMENT, UPDATE_COMMENT_FOR_COMMENT_FAILED } from './types';
import axios from 'axios';
import { tokenConfig } from './auth';
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

export const updateBlog = (index,id,body) => (dispatch, getState) => {

  axios
    .put(`http://localhost:8000/api/blogs/update_blog/${id}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_BLOG, payload:{index,data:res.data} });
      dispatch(notify("updated blog successfuly", "success"))
      sessionStorage.setItem('title', "")
      sessionStorage.setItem('excrept', "")
      sessionStorage.setItem('content', "")
    })
    .catch(err => {
      dispatch({ type: UPDATE_BLOG_FAILED });
      dispatch(notify("Failed to update blog", "error"))
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
      dispatch({ type: ADD_COMMENTS, payload: res.data });
      dispatch(notify("Added Comment successfuly", "success"))
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
      let key
      if (fromOriginal)
        key = '0' + res.data.parent_comment
      else key = res.data.parent_comment
      dispatch({ type: ADD_COMMENTS_FOR_COMMENTS, payload: { key, data: res.data } });
      dispatch(notify("Added Comment successfuly", "success"))

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

export const updateComment = (index, Id, body) => (dispatch, getState) => {
  axios
    .put(`http://localhost:8000/api/blogs/update_comment/${Id}`, body, tokenConfig(getState))
    .then(res => {
      dispatch({ type: UPDATE_COMMENTS, payload: { index, data: res.data } });
      dispatch(notify("Update Comment successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: UPDATE_COMMENTS_FAILED });
      dispatch(notify("Failed to Update comment", "error"))
    });

}

export const updateCommentForComment = (index, Id, body, fromOriginal) => (dispatch, getState) => {

  axios
    .put(`http://localhost:8000/api/blogs/update_comment_for_comment/${Id}`, body, tokenConfig(getState))
    .then(res => {
      let key
      if (fromOriginal)
        key = '0' + res.data.parent_comment
      else key = res.data.parent_comment
      dispatch({ type: UPDATE_COMMENT_FOR_COMMENT, payload: { key, index, data: res.data } });
      dispatch(notify("Update Comment successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: UPDATE_COMMENT_FOR_COMMENT_FAILED });
      dispatch(notify("Failed to Update comment", "error"))
    });

}

export const deleteComment = (index, Id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/blogs/delete_comment/${Id}`, tokenConfig(getState))
    .then(() => {
      dispatch({ type: DELETE_COMMENTS, payload: index });
      dispatch(notify("Delete Comment successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: DELETE_COMMENTS_FAILED });
      dispatch(notify("Failed to Delete comment", "error"))
    });

}

export const deleteCommentForComment = (index, key, fromOriginal, Id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/blogs/delete_comment_for_comment/${Id}`, tokenConfig(getState))
    .then(() => {
      if (fromOriginal)
        key = '0' + key

      dispatch({ type: DELETE_COMMENT_FOR_COMMENT, payload: { index, key } });
      dispatch(notify("Delete Comment successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: DELETE_COMMENT_FOR_COMMENT_FAILED });
      dispatch(notify("Failed to Delete comment", "error"))
    });

}

export const deleteBlog = (index, Id) => (dispatch, getState) => {
  axios
    .delete(`http://localhost:8000/api/blogs/delete_blog/${Id}`, tokenConfig(getState))
    .then(() => {
      axios
      .get('http://localhost:8000/api/blogs/get_blogs', tokenConfig(getState))
      .then(res => {
        dispatch({ type: GET_BLOGS, payload: res.data });
      })
      .catch(err => {
        dispatch(notify("Failed to get blogs", "error"))
        dispatch({ type: GET_BLOGS_FAILED });
      });
      dispatch({ type: DELETE_BLOG, payload: index });
      dispatch(notify("Delete blog successfuly", "success"))
    })
    .catch(() => {
      dispatch({ type: DELETE_BLOG_FAILED });
      dispatch(notify("Failed to Delete blog", "error"))
    });

}