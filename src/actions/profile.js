import {GET_PROFILE, UPDATE_PROFILE,USER_RELOAD} from './types';
import axios from 'axios';
import {tokenConfig} from './auth';
import {getErrors} from './auth';
import {notify} from 'reapop'

export const getProfile = () => (dispatch, getState) => {
  axios
    .get ('http://localhost:8000/api/auth/profile', tokenConfig (getState))
    .then (res => {
      dispatch ({type: GET_PROFILE, payload: res.data});
      
    })
    .catch (err => {
      dispatch (getErrors (err.response.data, err.response.status));
      
    });
};

export const updateProfile = body => (dispatch, getState) => {
  const token = getState ().auth.token;
  const config = {
    headers: {},
  };
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  axios
    .post ('http://localhost:8000/api/auth/profile', body, tokenConfig (getState))
    .then (res => {
      dispatch ({type: UPDATE_PROFILE, payload: res.data});
      dispatch ({type: USER_RELOAD, payload: res.data});
      dispatch(notify("profile update successfull","success"))
    })
    .catch (err => {
      dispatch (getErrors (err.response.data, err.response.status));
      dispatch(notify("profile update failed","error"))
    });
};
