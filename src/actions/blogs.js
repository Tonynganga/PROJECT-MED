import {ADD_BLOG,ADD_BLOG_FAILED,GET_BLOGS,GET_BLOGS_FAILED} from './types';
import axios from 'axios';
import {tokenConfig} from './auth';
import {getErrors} from './errors';
import {notify} from 'reapop'

export const getBlogs = () => dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  axios
    .get ('http://localhost:8000/api/blogs/get_blogs', config)
    .then (res => {
      dispatch ({type: GET_BLOGS, payload: res.data});
    })
    .catch (err => {
      dispatch(notify("Failed to get blogs","error"))
      dispatch ({type: GET_BLOGS_FAILED});
    });
};

export const addBlog = body => (dispatch,getState) => {
 
  axios
    .post ('http://localhost:8000/api/blogs/post_blog', body, tokenConfig (getState))
    .then (res => {
      dispatch ({type: ADD_BLOG});
      dispatch(notify("Added blog successfuly","success"))
      sessionStorage.setItem('title',"")
      sessionStorage.setItem('excrept',"")
      sessionStorage.setItem('content',"")
    })
    .catch (err => {
      dispatch ({type: ADD_BLOG_FAILED});
      dispatch(notify("Failed to add blog","error"))
    });
};
