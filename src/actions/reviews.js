import {GET_REVIEWS, GET_REVIEWS_FAILED, GET_USER_REVIEW, POST_REVIEW, POST_REVIEW_FAILED, UPDATE_REVIEW, UPDATE_REVIEW_FAILED} from './types';
import axios from 'axios';
import {tokenConfig} from './auth';
import {notify} from 'reapop'

export const getReviews = () => dispatch => {
    const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
  axios
    .get ('http://localhost:8000/api/reviews/get_reviews', config)
    .then (res => {
      dispatch ({type: GET_REVIEWS, payload: res.data});
    })
    .catch (err => {
      dispatch(notify("Failed to get reviews","error"))
      dispatch ({type: GET_REVIEWS_FAILED});
    });
};

export const addReview = body => (dispatch,getState) => {
 
    axios
      .post ('http://localhost:8000/api/reviews/post_review', body, tokenConfig (getState))
      .then (res => {
        dispatch ({type: POST_REVIEW});
        dispatch(notify("Added review successfuly","success"))
       
      })
      .catch (err => {
        dispatch ({type: POST_REVIEW_FAILED});
        dispatch(notify("Failed to add review","error"))
      });
  };
  export const updateUserReview = body => (dispatch,getState) => {
 
    axios
      .put ('http://localhost:8000/api/reviews/update_review', body, tokenConfig (getState))
      .then (res => {
        dispatch ({type: UPDATE_REVIEW, payload: res.data});
        dispatch(notify("update review successfuly","success"))
       
      })
      .catch (err => {
        dispatch ({type: UPDATE_REVIEW_FAILED});
        dispatch(notify("Failed to update review","error"))
      });
  };


  export const getUserReview = () => (dispatch,getState) => {
     axios
      .get ('http://localhost:8000/api/reviews/get_review', tokenConfig (getState))
      .then (res => {
        dispatch ({type: GET_USER_REVIEW, payload: res.data});       
      })
      .catch (err => {
        dispatch ({type: GET_REVIEWS_FAILED});
      });
  };