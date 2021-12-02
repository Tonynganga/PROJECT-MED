import {
    LOGIN_SUCCCES,
    LOGIN_FAIL,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    LOGOUT,
  } from './types';
  import axios from 'axios';
  import {getErrors} from './errors';
  import {notify} from 'reapop'

  export const LoginAction = (username, password) => dispatch => {
    const body = {
      username,
      password,
    };
  
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post ('http://localhost:8000/api/auth/login', JSON.stringify (body), config)
      .then (res => {
        dispatch ({type: LOGIN_SUCCCES, payload: res.data});
        dispatch(notify("login successfull","success"))
        // setTimeout(() => { dismissNotifications(); }, 2000);
      })
      .catch (err => {
        dispatch (getErrors (err, err.status));
        dispatch(notify("login unsuccessfull","error"))
        // setTimeout(() => { dismissNotifications(); }, 2000);
        dispatch ({type: LOGIN_FAIL});
      });
  };
  
  export const RegisterAction = data => dispatch => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .post ('http://localhost:8000/api/auth/register', data, config)
      .then (res => {
        dispatch ({type: REGISTER_SUCCESS, payload: res.data});
        dispatch(notify("registeration successfull","success"))
      })
      .catch (err => {
        dispatch (getErrors (err.data, err.status));
        dispatch(notify("registration unsuccessfull","error"))
        dispatch ({type: REGISTER_FAIL});
      });
  };

  export const LogoutAction = () => (dispatch, getState) => {
    axios
      .post ('http://localhost:8000/api/auth/logout', null, tokenConfig (getState))
      .then (res => {
        dispatch ({type: LOGOUT});
      })
      .catch (err => {
        dispatch ({type: LOGOUT});
        dispatch (getErrors (err.data, err.status));
      });
  };

  export const tokenConfig = getState => {
    //Get token from state
    const token = getState ().auth.token;
  
    //Headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (token) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  };