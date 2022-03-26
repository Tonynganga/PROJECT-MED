import {GET_REVIEWS, GET_REVIEWS_FAILED, POST_REVIEWS, POST_REVIEWS_FAILED} from './types';
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
        dispatch ({type: POST_REVIEWS});
        dispatch(notify("Added review successfuly","success"))
       
      })
      .catch (err => {
        dispatch ({type: POST_REVIEWS_FAILED});
        dispatch(notify("Failed to add review","error"))
      });
  };